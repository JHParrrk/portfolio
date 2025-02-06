import { Fragment } from "react";
import { LN } from "./LayoutNavigation.styles";
import type { ILayoutNavigationUIProps } from "./LayoutNavigation.types";

const NAVIGATION_MENUS = [
  { name: "나의파이어베이스", page: "/myfirebase" },
  { name: "라이브강아지", page: "/openapis" },
  { name: "라이브게시판", page: "/boards" },
  { name: "라이브상품", page: "/markets" },
  { name: "마이페이지", page: "/mypages" },
  { name: "결제페이지", page: "/payments" },
];

export default function LayoutNavigationUI(
  props: ILayoutNavigationUIProps
): JSX.Element {
  return (
    <LN.Wrapper>
      {NAVIGATION_MENUS.map((el) => (
        <Fragment key={el.page}>
          <LN.MenuItem id={el.page} onClick={props.onClickMenu}>
            {el.name}
          </LN.MenuItem>
        </Fragment>
      ))}
    </LN.Wrapper>
  );
}
