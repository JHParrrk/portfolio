// src/components/units/mypage/index.tsx

import { LoginCheckHoc } from "@/src/components/commons/hocs/logincheck";
import { useUpdateUser } from "@/src/components/commons/hooks/customs/useUpdateUser";
import Uploads01 from "@/src/components/commons/uploads/01/Uploads01.index";
import { MYP } from "./mypage.styles";
import dayjs from "dayjs";
import { useQueryFetchUserLoggedIn } from "@/src/components/commons/hooks/queries/useQueryFetchUserLoggedIn";
import { useMoveToPage } from "@/src/components/commons/hooks/customs/useMoveToPage";
import { useRouter } from "next/router";
import { useEffect } from "react";

// src/components/units/mypage/index.tsx

// ...기존 코드

function MyPage() {
  const { onClickMoveToPage } = useMoveToPage();
  const router = useRouter();
  const { data: userData, loading: isUserDataLoading } =
    useQueryFetchUserLoggedIn();

  const { pictureUrl, onFileSelect, onSubmitUpdateUser } = useUpdateUser();

  useEffect(() => {
    if (!isUserDataLoading && !userData) {
      if (typeof window !== "undefined") {
        const shouldLogin = window.confirm("로그인 페이지로 이동하시겠습니까?");
        if (shouldLogin) {
          onClickMoveToPage("/login")();
        } else {
          router.back();
        }
      }
    }
  }, [isUserDataLoading, userData, onClickMoveToPage, router]);

  if (isUserDataLoading) {
    return (
      <MYP.Container>
        <MYP.LoadingMessage>로그인 정보를 가져오는 중...</MYP.LoadingMessage>
      </MYP.Container>
    );
  }

  if (!userData) {
    return null;
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
            showDeleteButton={false} // 👈 이 부분을 추가합니다.
          />
          <MYP.UpdateButton onClick={onSubmitUpdateUser}>
            사진 변경
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
