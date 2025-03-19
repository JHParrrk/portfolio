import { IQuery } from "@/src/commons/types/generated/types";

export interface ILayoutHeaderProps {
  onClickLogo: () => void;
  onClickMoveToLogin: () => void;
  onClickMoveToMyPage: () => void;
  onClickLogout: () => void; // 로그아웃 핸들러 추가
  token: string | ""; // 토큰은 문자열 또는 ""
  data?: Pick<IQuery, "fetchUserLoggedIn">; // GraphQL 데이터를 전달
}
