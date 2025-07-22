import LayoutBanner from "./banner/LayoutBanner.index"; // 상단 배너
import LayoutHeader from "./header/LayoutHeader.index"; // 헤더
import LayoutNavigation from "./navigation/LayoutNavigation.index"; // 네비게이션
import styled from "@emotion/styled"; // Emotion 스타일링
import { useRouter } from "next/router"; // 현재 경로 확인

// Body 컴포넌트에 조건부 스타일을 적용하기 위한 props 타입
interface IBodyProps {
  fullHeight?: boolean; // true면 height: 100vh, false면 height: 500px
}

// // 특정 경로에서 헤더/배너/네비게이션을 숨기기 위한 설정 객체
// const HIDDEN_HEADERS: Record<string, boolean> = {
//   "/login": true,
//   "/signup": true,
//   "/error": true,
//   "/reset-password": true,
// };

// 조건부 스타일이 적용된 Body 컴포넌트
const Body = styled.div<IBodyProps>`
  height: ${(props) => (props.fullHeight ? "100vh" : "500px")};
  display: flex;
  flex-direction: column;
  align-items: center;
`;

// Layout 컴포넌트의 props 타입 정의
interface ILayoutProps {
  children: JSX.Element;
}

// Layout 컴포넌트 정의
export default function Layout(props: ILayoutProps): JSX.Element {
  const router = useRouter();

  // 로그인 또는 회원가입 페이지일 경우 헤더/배너/네비게이션 숨김
  const isHiddenHeader = /^\/(login|signup)/.test(router.asPath);
  // // 현재 경로가 HIDDEN_HEADERS에 포함되어 있으면 true
  // const isHiddenHeader = HIDDEN_HEADERS[router.pathname] === true;

  return (
    <>
      {/* 조건부 렌더링: 로그인/회원가입 페이지가 아니면 보여줌 */}
      {!isHiddenHeader && <LayoutHeader />}
      {!isHiddenHeader && <LayoutBanner />}
      {!isHiddenHeader && <LayoutNavigation />}

      {/* Body에 fullHeight props 전달하여 조건부 height 적용 */}
      <Body fullHeight={isHiddenHeader}>{props.children}</Body>
    </>
  );
}
