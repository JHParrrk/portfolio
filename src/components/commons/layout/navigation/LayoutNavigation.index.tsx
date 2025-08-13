// LayoutNavigation.index.tsx
import { Fragment } from "react";
import { LN } from "./LayoutNavigation.styles";
import { useMoveToPage } from "../../hooks/customs/useMoveToPage";

const NAVIGATION_MENUS = [
  { name: "나의파이어베이스", page: "/myfirebase" },
  { name: "라이브강아지", page: "/openapis" },
  { name: "라이브게시판", page: "/boards" },
  { name: "라이브상품", page: "/markets" },
  { name: "마이페이지", page: "/mypages" },
  { name: "결제페이지", page: "/payments" },
];

export default function LayoutNavigation(): JSX.Element {
  const { onClickMoveToPage } = useMoveToPage();
  return (
    <LN.Wrapper>
      {NAVIGATION_MENUS.map((el) => (
        <Fragment key={el.page}>
          <LN.MenuItem onClick={onClickMoveToPage(el.page)}>
            {el.name}
          </LN.MenuItem>
        </Fragment>
      ))}
    </LN.Wrapper>
  );
}
