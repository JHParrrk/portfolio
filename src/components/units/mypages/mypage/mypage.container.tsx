import { FETCH_USER_LOGGED_IN } from "@/src/components/commons/hooks/queries/useQueryFetchUserLoggedIn";
import MyPageUI from "./mypage.presenter";
import { useQuery } from "@apollo/client";
import { IQuery } from "@/src/commons/types/generated/types";
import { LoginCheckHoc } from "@/src/components/commons/hocs/logincheck";

function MyPage() {
  const { data } =
    useQuery<Pick<IQuery, "fetchUserLoggedIn">>(FETCH_USER_LOGGED_IN);

  const props = {
    data: data ?? undefined,
  };
  return <MyPageUI {...props} />;
}

export default LoginCheckHoc(MyPage);
