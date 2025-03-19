import { IMyPageUIProps } from "./mypage.types";

export default function MyPageUI(props: IMyPageUIProps) {
  const { data } = props;

  if (!data || !data.fetchUserLoggedIn) {
    return <h1>로그인 정보를 가져오는 중...</h1>;
  }

  return (
    <>
      <h1>{data?.fetchUserLoggedIn.name}님 환영합니다. 로그인 성공</h1>
    </>
  );
}
