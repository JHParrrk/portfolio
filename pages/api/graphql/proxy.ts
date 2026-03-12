import type { NextApiRequest, NextApiResponse } from 'next';

/**
 * BFF - GraphQL Proxy
 *
 * 모든 GraphQL 요청을 클라이언트가 직접 백엔드로 보내지 않고,
 * 이 프록시 API를 거쳐서 보내도록 하여 엔드포인트를 숨기고 보안을 강화합니다.
 */

const BACKEND_GRAPHQL_URL = process.env.BACKEND_GRAPHQL_URL || '';

// 파일 업로드와 같은 multiform-data 요청 시 body 파싱 방지를 위한 설정 (Apollo Upload Client 호환)
export const config = {
  api: {
    bodyParser: false,
  },
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const headers: Record<string, string> = {};

    // authorization 토큰이나 기타 헤더들을 고스란히 백엔드로 전달
    if (req.headers.authorization)
      headers.authorization = req.headers.authorization as string;
    if (req.headers['content-type'])
      headers['content-type'] = req.headers['content-type'] as string;
    if (req.headers.cookie) {
      // 프론트의 쿠키(refreshToken)를 백엔드로 전달해야 restore가 동작함
      headers.cookie = req.headers.cookie;
    }

    // 스트림 기반 버퍼 읽기
    const chunks = [];
    for await (const chunk of req) {
      chunks.push(typeof chunk === 'string' ? Buffer.from(chunk) : chunk);
    }
    const body = Buffer.concat(chunks).toString();

    // 타임아웃 컨트롤러 추가
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 10000); // 10초 타임아웃

    const response = await fetch(BACKEND_GRAPHQL_URL, {
      method: req.method,
      headers,
      body,
      signal: controller.signal, // 타임아웃 컨트롤러 추가
    }).finally(() => clearTimeout(timeout));

    // 백엔드에서 전달받은 쿠키(refreshToken)를 클라이언트로 포워딩
    const setCookieHeaders = response.headers.getSetCookie
      ? response.headers.getSetCookie()
      : response.headers.get('set-cookie');

    if (setCookieHeaders) {
      // 프록시 도메인과 백엔드 도메인 불일치로 인한 브라우저 쿠키 차단을 막기 위해 Domain 속성을 제거
      let cookiesArray = Array.isArray(setCookieHeaders)
        ? setCookieHeaders
        : [setCookieHeaders];
      cookiesArray = cookiesArray.map(
        (cookie) =>
          cookie
            .replace(/Domain=[^;]+;?\s*/gi, '') // Domain 속성 제거
            .replace(/SameSite=None;?\s*/gi, 'SameSite=Lax; ') // 로컬 개발(http)을 위해 SameSite 속성 조정
      );
      res.setHeader('Set-Cookie', cookiesArray);
    }

    const responseData = await response.text();

    res.status(response.status).send(responseData);
  } catch (error) {
    console.error('GraphQL Proxy Error:', error);

    // 에러 메시지 개선
    res.status(500).json({
      message: 'Internal Server Error in BFF Proxy',
      error: error instanceof Error ? error.message : 'Unknown error',
    });
  }
}
