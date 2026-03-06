import { LoginCheckHoc } from "@/shared/ui/hocs/logincheck";
import MyPage from '@/features/mypage/ui/mypage/mypage.index';

function LoginSuccessPage(): JSX.Element {
  return <MyPage />;
}

export default LoginCheckHoc(LoginSuccessPage);
