
# 🎓 Next.js 중고장터 서비스 (Market Archive)
### **Next.js와 GraphQL 기반의 대규모 B2C 서비스 웹 Front-End 아키텍처 설계**

<div align="center">
  <img src="https://img.shields.io/badge/Next.js-000000?style=for-the-badge&logo=nextdotjs&logoColor=white" />
  <img src="https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white" />
  <img src="https://img.shields.io/badge/GraphQL-E10098?style=for-the-badge&logo=graphql&logoColor=white" />
  <img src="https://img.shields.io/badge/Apollo%20Client-311C87?style=for-the-badge&logo=apollographql&logoColor=white" />
</div>

<br />

"복잡한 비즈니스 로직을 견고한 엔지니어링으로 구조화합니다."
단순한 쇼핑몰을 넘어, **BFF(Backend For Frontend) 패턴**과 **FSD 아키텍처**를 통해 대규모 서비스의 확장성과 성능 최전선을 검증한 프로젝트입니다.

---

## 🔗 Quick Links
- **🌐 Live Demo (Frontend):** [준비 중]
- **📑 Architecture Documentation:** [README_ARCHITECTURE.md](README_ARCHITECTURE.md)
- **🖥️ BFF/Proxy API Documentation:** [README_BFF.md](README_BFF.md)

---

## 🏗️ 프로젝트 개요 (Project Overview)
본 프로젝트는 **실제 상용 서비스 수준의 성능과 보안**을 목표로 설계되었습니다. 대중을 대상으로 하는 B2C 중고장터 서비스 특성에 맞추어 **SEO 최적화**, **성능(Performance)**, 그리고 **안정적인 데이터 가공(BFF)**을 최우선으로 구현했습니다.

---

## 🎯 주요 목표 (Main Goals)
- **SEO & 성능 우위 확보:** 검색 엔진 최적화와 초기 로딩 속도 극대화를 통해 비즈니스 가치를 높입니다.
- **아키텍처 확장성:** FSD(Feature-Sliced Design)를 도입하여 대규모 팀 프로젝트에서도 유지보수가 용이한 구조를 지향합니다.
- **데이터 무결성 & 보안:** BFF 레이어를 통한 민감 데이터 보호 및 클라이언트 최적화 가공 파이프라인을 구축합니다.

---

## ✨ 핵심 기능 (Key Features)

### 🧠 1. 지능형 렌더링 파이프라인
- **하이브리드 렌더링 전략:** 게시글 목록 등은 **SSG/ISR**로, 마이페이지 등은 **SSR**로 처리하여 응답 속도와 서버 성능의 균형을 맞추었습니다.
- **Next.js Optimization:** `<Image />` 컴포넌트 자동 리사이징, `next/font`, `next/script` 최적화 지원으로 Lighthouse 성능 점수를 극대화했습니다.
- **다크 모드 시스템:** Zustand와 CSS Variables를 연동하여 시스템 테마에 반응하는 유연한 UI 환경을 제공합니다.

### 📋 2. 스마트 데이터 매니지먼트 (BFF & GraphQL)
- **GraphQL Proxy 계층:** Next.js API Routes를 활용하여 외부 API 키 노출을 차단하고, 효율적인 **BFF(Backend For Frontend)** 역할을 수행합니다.
- **Apollo Client State:** InMemoryCache를 활용한 정규화된 캐싱 전략으로 불필요한 네트워크 요청을 줄였습니다.
- **UI 맞춤형 가공:** 백엔드의 거대한 JSON 응답을 UI 렌더링에 최적화된 최소 단위로 변환하여 전달합니다.

### 📊 3. 도메인 기반 기능 모듈 (Features)
- **중고 거래 워크플로우:** 상품 등록/상세/수정, 검색 엔진 최적화된 URL 구조, 무한 스크롤 기반의 리스트를 제공합니다.
- **인증 및 권한 시스템:** JWT 기반의 로그인을 처리하며, HOC(Higher-Order Component)를 통해 접근 권한을 체계적으로 관리합니다.
- **게시판 & 댓글 시스템:** 계층형 데이터 구조를 안정적으로 렌더링하고 유저 인터랙션을 처리합니다.

---

## 🛠 기술 스택 (Tech Stack)

### ⚙️ Frontend & Infrastructure
- **Framework:** Next.js (Pages Router), TypeScript
- **State Management:** Apollo Client (Server State), Zustand (Client State)
- **Styling:** Emotion.js (CSS-in-JS), Vanilla Extract, CSS Variables
- **API Strategy:** GraphQL, BFF Pattern (Next.js API Routes)

---

## 📂 프로젝트 구조 (Project Structure)
```
src/
├── app/                  # 애플리케이션 루트 설정 (Providers, Global Styles)
├── features/             # 비즈니스 도메인 모듈 (Feature-Sliced Design)
│   ├── auth/ui           # 인증 관련 독립 UI 및 로직
│   ├── boards/ui         # 커뮤니티(게시판) 모듈
│   └── market/ui         # 중고마켓(상품/거래) 핵심 로듈
├── shared/               # 공통 유틸리티 및 UI 컴포넌트
│   ├── api/              # 공용 API 호출 함수 및 BFF 프록시
│   ├── hooks/            # 커스텀 훅 (useAuth, useMarket 등)
│   └── ui/               # 공용 UI 컴포넌트 (Layout, Upload, Search)
└── pages/                # 파일 시스템 라우팅 및 렌더링 진입점
    ├── api/              # BFF/Proxy API 엔드포인트
    └── feature-tests/    # 엔지니어링 검증용 테스트 페이지 (SSG, ISR 등)
```

---

## ⚙️ 시작하기 (Getting Started)

1. **환경 변수 설정**
   루트 위치에 `.env` 파일을 생성하고 아래 항목을 설정합니다.
   ```env
   BACKEND_GRAPHQL_URL=https://backendonline.codebootcamp.co.kr/graphql
   ```

2. **설치 및 실행**
   ```bash
   # 의존성 설치
   $ npm install

   # 개발 서버 실행
   $ npm run dev

   # 프로덕션 빌드 및 실행
   $ npm run build
   $ npm run start
   ```

---

## 📄 라이선스 (License)
본 프로젝트는 개인 학습 및 포트폴리오 목적으로 제작되었으며, MIT License를 준수합니다.

---
*이 프로젝트는 대규모 서비스 환경의 요구사항을 프론트엔드 엔지니어의 관점에서 구조화하고 성능을 극대화한 결과물입니다.*
