# Next.js 렌더링 전략 및 최적화 가이드

이 문서는 Next.js에서 제공하는 다양한 렌더링 전략(SSG, ISR)의 혼합 사용법과 폰트/스크립트 최적화 방법에 대해 상세히 설명합니다.

---

## 1. 렌더링 전략: SSG vs ISR

### SSG (Static Site Generation)

- **개념**: 빌드 시점에 HTML을 미리 생성하여 모든 요청에 동일한 파일을 제공합니다.
- **장점**: 응답 속도가 매우 빠르고 SEO에 유리하며 테크니컬 SEO 최적화가 쉽습니다.
- **단점**: 데이터가 변경되면 전체 사이트를 다시 빌드해야 합니다.

### ISR (Incremental Static Regeneration)

- **개념**: SSG의 장점을 유지하면서, 전체 빌드 없이 **특정 주기마다** 정적 페이지를 백그라운드에서 재생성합니다.
- **핵심 옵션**: `revalidate: 10` (10초마다 갱신 트리거 설정)
- **동작 방식**:
  1. 10초 이내 요청: 캐시된 기존 정적 페이지 반환.
  2. 10초 이후 첫 번째 요청: 기존 페이지를 즉시 보여주되, 백그라운드에서 조용히 재생성 시작.
  3. 재생성 완료 후 요청: 새로 생성된 갱신된 페이지 반환.

### 혼합 사용 패턴

- **메인/목록 페이지 (ISR)**: 자주 변하는 상품 목록이나 게시글 목록은 ISR을 적용하여 최신 상태를 유지합니다.
- **상세 페이지 (SSG + `fallback`)**: 수천 개의 페이지를 빌드 시 다 만들지 않고, `getStaticPaths`에서 `fallback: 'blocking'`을 설정하여 첫 방문 시점에 생성하고 이후는 캐싱합니다.

#### 💡 현재 프로젝트 적용 사례 (`pages/feature-tests/rendering/isr.tsx`)

```tsx
// 📌 핵심: getStaticProps 호출 시 `revalidate` 옵션을 추가하여 ISR을 활성화합니다.
export async function getStaticProps() {
  return {
    props: {
      generatedTime: new Date().toISOString(),
    },
    // 10초마다 들어오는 새로운 요청이 있을 경우, 백그라운드에서 페이지를 정적으로 재생성 (ISR)
    revalidate: 10,
  };
}
```

---

## 2. 폰트 최적화 (next/font)

Next.js(`next/font`)는 별도의 외부 요청 없이 빌드 시 폰트를 다운로드하여 자체 호스팅합니다.

### 특징

- **Zero Layout Shift**: 폰트 로딩 중 발생하는 레이아웃 흔들림(CLS)을 자동으로 방지합니다.
- **Privacy & Performance**: Google Fonts 사용 시 브라우저가 Google 서버로 요청을 보내지 않아 개인정보 보호 및 속도가 향상됩니다.
- **자동 Subset**: 필요한 글자만 포함하는 서브셋 기능을 제공합니다.

### 사용 예시 (Google Fonts)

```tsx
import { Inter } from 'next/font/google';

const inter = Inter({ subsets: ['latin'] });

export default function Layout({ children }) {
  return (
    <html lang="en" className={inter.className}>
      <body>{children}</body>
    </html>
  );
}
```

#### 💡 현재 프로젝트 적용 사례 (`pages/_app.tsx`)

```tsx
import { Noto_Sans_KR } from 'next/font/google';

// [폰트 최적화] Noto Sans KR 적용 (CLS 방지 및 로딩 속도 최적화)
const notoSansKr = Noto_Sans_KR({
  subsets: ['latin'],
  weight: ['400', '500', '700'],
  variable: '--font-noto-sans-kr',
});

export default function App({ Component, pageProps }: AppProps) {
  return (
    <div className={`${notoSansKr.variable} global-theme-wrapper`}>
      <Component {...pageProps} />
    </div>
  );
}
```

---

## 3. 스크립트 최적화 (next/script)

외부 스크립트(GTM, 카카오맵 등)를 로드할 때 실행 시점을 제어하여 성능을 최적화합니다.

### 전략(Strategy) 옵션

1. **`beforeInteractive`**: 페이지가 상호작용하기 전(하이드레이션 전)에 실행되어야 하는 필수 스크립트.
2. **`afterInteractive` (기본값)**: 페이지 로드 직후, 사용자 인터랙션이 가능해진 시점에 실행 (예: 분석 툴).
3. **`lazyOnload`**: 브라우저가 한가할 때 로드 (예: 채팅 위젯).
4. **`worker` (experimental)**: 웹 워커에서 스크립트를 실행하여 메인 스레드 부하를 줄임.

### 사용 예시

```tsx
import Script from 'next/script';

export default function Page() {
  return (
    <>
      <Script
        src="https://example.com/script.js"
        strategy="lazyOnload"
        onLoad={() => console.log('스크립트 로드 완료')}
      />
    </>
  );
}
```

#### 💡 현재 프로젝트 적용 사례 (`pages/_app.tsx`)

```tsx
import Script from 'next/script';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      {/* [스크립트 최적화] 메인 렌더링 블로킹을 막기 위한 Lazy Onload 전략 적용 (구글 애널리틱스 모의) */}
      <Script
        src="https://www.googletagmanager.com/gtag/js?id=DEMO-GA-ID"
        strategy="lazyOnload"
      />
      <Component {...pageProps} />
    </>
  );
}
```

---

## 4. 요약 및 권장사항

| 구분       | 추천 상황                        | 최적화 팁                                           |
| :--------- | :------------------------------- | :-------------------------------------------------- |
| **SSG**    | 변하지 않는 안내 페이지, 약관 등 | 빌드 타임 최소화에 집중                             |
| **ISR**    | 블로그, 커머스 상품 상세, 뉴스   | `revalidate` 시간을 데이터 중요도에 따라 설정       |
| **Font**   | 모든 텍스트                      | `next/font`를 사용하여 외부 도메인 호출 제거        |
| **Script** | 광고, 분석, 외부 API 라이브러리  | `strategy`를 활용하여 TBT(Total Blocking Time) 단축 |
