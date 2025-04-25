import LayoutBanner from "./banner/LayoutBanner.index";
import LayoutHeader from "./header/LayoutHeader.index";
import LayoutNavigation from "./navigation/LayoutNavigation.index";
import styled from "@emotion/styled";
import { useRouter } from "next/router";

const HIDDEN_HEADERS: Record<string, boolean> = {
  "/login": true,
};

const Body = styled.div`
  height: 500px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

interface ILayoutProps {
  children: JSX.Element;
}

export default function Layout(props: ILayoutProps): JSX.Element {
  const router = useRouter();
  const isHiddenHeader = /^\/(login|signup)/.test(router.asPath);
  // 로그인 사인업 페이지에서 숨기기 정규표현식

  return (
    <>
      {!isHiddenHeader && <LayoutHeader />}
      {!isHiddenHeader && <LayoutBanner />}
      {!isHiddenHeader && <LayoutNavigation />}
      {/* <LayoutHeader />
      <LayoutBanner />
      <LayoutNavigation /> */}

      <Body>{props.children}</Body>
    </>
  );
}
