// src/components/units/mypage/index.tsx

import { LoginCheckHoc } from '@/shared/ui/hocs/logincheck';
import { useUpdateUser } from '@/shared/hooks/customs/useUpdateUser';
import Uploads01 from '@/shared/ui/upload/01/Uploads01.index';
import { MYP } from './mypage.styles';
import dayjs from 'dayjs';
import { useQueryFetchUserLoggedIn } from '@/shared/hooks/queries/useQueryFetchUserLoggedIn';
import { useMoveToPage } from '@/shared/hooks/customs/useMoveToPage';
import { useRouter } from 'next/router';
import { useEffect } from 'react';

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
      if (typeof window !== 'undefined') {
        const shouldLogin = window.confirm('로그인 페이지로 이동하시겠습니까?');
        if (shouldLogin) {
          onClickMoveToPage('/login')();
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
    'YYYY년 MM월 DD일'
  );

  return (
    <MYP.Container>
      <MYP.Wrapper>
        <MYP.Title>{userData.fetchUserLoggedIn.name}님 환영합니다</MYP.Title>
        <MYP.ProfileSection>
          <Uploads01
            index={0}
            fileUrl={pictureUrl || '/images/avatar.png'}
            onFileSelect={onFileSelect}
            showDeleteButton={false}
          />
          <MYP.UpdateButton onClick={onSubmitUpdateUser}>
            프로필 사진 저장
          </MYP.UpdateButton>
        </MYP.ProfileSection>

        <MYP.InfoList>
          <MYP.InfoItem>
            <span style={{ fontWeight: 700, width: '100px' }}>회원 ID</span>
            <span>{userData.fetchUserLoggedIn._id}</span>
          </MYP.InfoItem>
          <MYP.InfoItem>
            <span style={{ fontWeight: 700, width: '100px' }}>이메일</span>
            <span>{userData.fetchUserLoggedIn.email}</span>
          </MYP.InfoItem>
          <MYP.InfoItem>
            <span style={{ fontWeight: 700, width: '100px' }}>보유 포인트</span>
            <span style={{ color: '#5729ff', fontWeight: 700 }}>
              {userData.fetchUserLoggedIn.userPoint?.amount?.toLocaleString() ||
                0}{' '}
              P
            </span>
          </MYP.InfoItem>
          <MYP.InfoItem>
            <span style={{ fontWeight: 700, width: '100px' }}>가입 일자</span>
            <span>{formattedDate}</span>
          </MYP.InfoItem>
        </MYP.InfoList>
      </MYP.Wrapper>
    </MYP.Container>
  );
}

export default LoginCheckHoc(MyPage);
