import { LoginCheckHoc } from "@/src/components/commons/hocs/logincheck";
import MyPage from "@/src/components/units/mypages/mypage/mypage.index";

function LoginSuccessPage(): JSX.Element {
  return <MyPage />;
}

export default LoginCheckHoc(LoginSuccessPage);
