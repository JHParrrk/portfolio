This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/pages/api-reference/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `pages/index.js`. The page auto-updates as you edit the file.

[API routes](https://nextjs.org/docs/pages/building-your-application/routing/api-routes) can be accessed on [http://localhost:3000/api/hello](http://localhost:3000/api/hello). This endpoint can be edited in `pages/api/hello.js`.

The `pages/api` directory is mapped to `/api/*`. Files in this directory are treated as [API routes](https://nextjs.org/docs/pages/building-your-application/routing/api-routes) instead of React pages.

This project uses [`next/font`](https://nextjs.org/docs/pages/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn-pages-router) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/pages/building-your-application/deploying) for more details.


# Portfolio Project

**Portfolio Project**는 Next.js와 TypeScript를 기반으로 한 포트폴리오 웹 애플리케이션으로, React와 Apollo Client를 활용하여 클라이언트 측 상태 관리 및 GraphQL API 통신을 처리합니다.

## 주요 기능

- **Next.js 기반 프레임워크**:
  - 프로젝트는 `create-next-app`으로 생성되었으며 React와 TypeScript를 활용합니다.
  - 서버 사이드 렌더링(SSR) 및 정적 사이트 생성(SSG)을 지원합니다.

- **GraphQL 연동**:
  - Apollo Client를 통해 GraphQL API와 통신하며, 사용자 인증 및 데이터 관리를 처리합니다.
  - 예제 쿼리 및 뮤테이션 로직이 포함되어 있습니다.

- **Recoil 상태 관리**:
  - Recoil을 사용하여 클라이언트 전역 상태를 관리합니다.

- **글로벌 스타일링**:
  - Emotion을 활용한 글로벌 스타일링 적용.
  - 다크 모드와 라이트 모드 지원. 

- **컴포넌트 기반 구조**:
  - 재사용 가능한 컴포넌트 기반으로 설계되어 유지보수성과 확장성을 높였습니다.

## 디렉토리 구조

```
portfolio/
├── pages/                            # Next.js의 페이지 라우터 디렉토리
│   ├── _app.tsx                      # 전역 설정 파일
│   ├── index.tsx                     # 메인 페이지
├── src/                              # 소스 코드 디렉토리
│   ├── commons/                      # 공통 컴포넌트 및 스타일
│   ├── components/                   # 화면 단위별 컴포넌트
│   └── styles/                       # Emotion 및 CSS 스타일 파일
├── styles/                           # 전역 스타일 파일
│   ├── globals.css                   # 글로벌 CSS
│   └── Home.module.css               # 홈 페이지 스타일
├── public/                           # 정적 리소스(이미지, 아이콘 등)
├── next.config.mjs                   # Next.js 설정 파일
├── README.md                         # 프로젝트 소개 파일
└── memo.txt                          # GraphQL에 대한 메모
```

## 설치 및 실행

1. **저장소 클론**:
   ```bash
   git clone https://github.com/JHParrrk/portfolio.git
   cd portfolio
   ```

2. **의존성 설치**:
   ```bash
   npm install
   ```

3. **개발 서버 실행**:
   ```bash
   npm run dev
   ```

4. **브라우저에서 확인**:
   - 기본적으로 [http://localhost:3000](http://localhost:3000)에서 애플리케이션에 접근할 수 있습니다.

## 주요 코드 설명

### **GraphQL 통신**
- `memo.txt`:
  - GraphQL 쿼리 작성법 및 서버와 클라이언트 간의 데이터 매핑에 대한 설명이 포함되어 있습니다.

### **전역 상태 관리**
- `pages/_app.tsx`:
  - Recoil을 활용하여 애플리케이션의 전역 상태를 관리합니다.

### **글로벌 스타일링**
- `styles/globals.css`:
  - 글로벌 CSS 파일로, 다크 모드 및 반응형 디자인을 지원합니다.
- `styles/Home.module.css`:
  - 메인 페이지의 스타일을 정의합니다.

### **Apollo Client**
- `ApolloSettings` 컴포넌트를 통해 GraphQL API와의 통신을 설정합니다.

## 참고 사항

- 이 프로젝트는 학습 및 포트폴리오용으로 제작되었습니다.
- 기여 및 피드백은 언제나 환영합니다!

## 라이선스

이 프로젝트는 개인 학습 목적으로 제작되었으며, 별도의 라이선스가 제공되지 않습니다.