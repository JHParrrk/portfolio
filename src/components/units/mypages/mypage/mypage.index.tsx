// src/components/units/mypage/index.tsx

import { LoginCheckHoc } from "@/src/components/commons/hocs/logincheck";
import { useUpdateUser } from "@/src/components/commons/hooks/customs/useUpdateUser";
import Uploads01 from "@/src/components/commons/uploads/01/Uploads01.index";
import { MYP } from "./mypage.styles";
import dayjs from "dayjs";
import { useQueryFetchUserLoggedIn } from "@/src/components/commons/hooks/queries/useQueryFetchUserLoggedIn";

function MyPage() {
  const { data: userData, loading: isUserDataLoading } =
    useQueryFetchUserLoggedIn();

  const { pictureUrl, onFileSelect, onSubmitUpdateUser } = useUpdateUser();

  if (isUserDataLoading || !userData) {
    return (
      <MYP.Container>
        <MYP.LoadingMessage>로그인 정보를 가져오는 중...</MYP.LoadingMessage>
      </MYP.Container>
    );
  }

  const formattedDate = dayjs(userData.fetchUserLoggedIn.createdAt).format(
    "YYYY년 MM월 DD일"
  );

  return (
    <MYP.Container>
      <MYP.Wrapper>
        <MYP.Title>{userData.fetchUserLoggedIn.name}님 환영합니다.</MYP.Title>
        <MYP.ProfileSection>
          <Uploads01
            index={0}
            fileUrl={pictureUrl || "/images/avatar.png"}
            onFileSelect={onFileSelect}
          />
          <MYP.UpdateButton onClick={onSubmitUpdateUser}>
            프로필 사진 업데이트
          </MYP.UpdateButton>
        </MYP.ProfileSection>

        <MYP.InfoList>
          <MYP.InfoItem>회원 ID: {userData.fetchUserLoggedIn._id}</MYP.InfoItem>
          <MYP.InfoItem>
            이메일: {userData.fetchUserLoggedIn.email}
          </MYP.InfoItem>
          <MYP.InfoItem>
            포인트: {userData.fetchUserLoggedIn.userPoint?.amount || 0} p
          </MYP.InfoItem>
          <MYP.InfoItem>가입일: {formattedDate}</MYP.InfoItem>
        </MYP.InfoList>
      </MYP.Wrapper>
    </MYP.Container>
  );
}

export default LoginCheckHoc(MyPage);
