import type { NextApiRequest, NextApiResponse } from 'next';

/**
 * BFF - Data Aggregation Example
 *
 * [성능 최적화: Aggregation]
 * 클라이언트가 '상품 정보'와 '판매자 정보'를 얻기 위해 각각 별도의 API를 호출하는 대신,
 * BFF 계층에서 두 데이터를 한 번에 조회하여 결합된 형태의 결과를 반환합니다.
 *
 * 효과: 클라이언트의 HTTP 요청 횟수 감소 (2 -> 1), 네트워크 오버헤드 절감.
 */

const GRAPHQL_ENDPOINT = process.env.BACKEND_GRAPHQL_URL || '';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { useditemId } = req.query;

  if (!useditemId) {
    return res.status(400).json({ message: 'useditemId is required' });
  }

  try {
    // 1. 서버 측에서 병렬(Promise.all)로 여러 데이터를 한꺼번에 요청
    // (예시를 위해 하나의 GraphQL 쿼리 안에 묶는 방식 대신, 별도의 로직이 필요한 상황을 가정)
    const [itemResponse, userResponse] = await Promise.all([
      // A. 상품 상세 정보 조회
      fetch(GRAPHQL_ENDPOINT, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          query: `
            query fetchUseditem($useditemId: ID!) {
              fetchUseditem(useditemId: $useditemId) {
                _id
                name
                contents
                price
                seller {
                  _id
                  name
                }
              }
            }
          `,
          variables: { useditemId },
        }),
      }),
      // B. (가상 시나리오) 판매자의 추가 등급/평점 정보 등을 다른 엔드포인트나 다른 쿼리로 조회한다고 가정
      // 여기서는 예시를 위해 동일한 ENDPOINT에 다른 요청을 보냅니다.
      fetch(GRAPHQL_ENDPOINT, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          query: `
            query fetchUserLoggedIn {
              fetchUserLoggedIn {
                _id
                email
                name
              }
            }
          `,
        }),
      }),
    ]);

    const itemResult = await itemResponse.json();
    const userResult = await userResponse.json();

    // 2. 서버에서 데이터 결합 (Aggregation)
    // 클라이언트는 이 복잡한 과정을 알 필요 없이, 가공된 '하나의 객체'만 받습니다.
    const aggregatedData = {
      product: {
        id: itemResult.data?.fetchUseditem?._id,
        name: itemResult.data?.fetchUseditem?.name,
        price: itemResult.data?.fetchUseditem?.price,
      },
      sellerInfo: {
        name: itemResult.data?.fetchUseditem?.seller?.name,
        // 서버 측에서만 알 수 있는 로직이나 결합된 데이터를 추가
        isMe:
          itemResult.data?.fetchUseditem?.seller?._id ===
          userResult.data?.fetchUserLoggedIn?._id,
        viewerEmail: userResult.data?.fetchUserLoggedIn?.email,
      },
    };

    // 3. 응답 (클라이언트는 단 1번의 요청으로 모든 정보를 받음)
    res.status(200).json(aggregatedData);
  } catch (error) {
    console.error('Aggregation Error:', error);
    res
      .status(500)
      .json({ message: 'Internal Server Error during aggregation' });
  }
}
