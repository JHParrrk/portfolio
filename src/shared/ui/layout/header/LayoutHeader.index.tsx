import { LH } from './LayoutHeader.css';
import { useQueryFetchUserLoggedIn } from '@/shared/hooks/queries/useQueryFetchUserLoggedIn';
import { useLogout } from '@/shared/hooks/customs/useLogout';
import { useMoveToPage } from '@/shared/hooks/customs/useMoveToPage';

import { useGlobalStore } from '@/shared/models/stores';

export default function LayoutHeader(): JSX.Element {
  const { onLogout } = useLogout();
  const { onClickMoveToPage } = useMoveToPage();
  const accessToken = useGlobalStore((state) => state.accessToken);

  // useQueryFetchUserLoggedIn 훅을 사용하여 데이터 가져오기
  const { data } = useQueryFetchUserLoggedIn();

  return (
    <div className={LH.Wrapper}>
      <div className={LH.InnerWrapper}>
        <div
          className={LH.InnerLogo}
          onClick={onClickMoveToPage('/boards')}
          style={{ textDecoration: 'none', cursor: 'pointer' }}
        >
          💎 LIVE
        </div>
        <div>
          {accessToken ? (
            <>
              <div
                className={LH.InnerButton}
                onClick={onClickMoveToPage('/mypages')}
                style={{
                  textDecoration: 'none',
                  cursor: 'pointer',
                  display: 'inline-block',
                }}
              >
                {data?.fetchUserLoggedIn?.name ?? '사용자'}님 환영합니다.
              </div>
              <span
                className={LH.InnerButton}
                onClick={onLogout}
                style={{ cursor: 'pointer' }}
              >
                로그아웃
              </span>
            </>
          ) : (
            <>
              <div
                className={LH.InnerButton}
                onClick={onClickMoveToPage('/login')}
                style={{
                  textDecoration: 'none',
                  marginRight: '10px',
                  cursor: 'pointer',
                  display: 'inline-block',
                }}
              >
                로그인
              </div>
              <div
                className={LH.InnerButton}
                onClick={onClickMoveToPage('/login/registration')}
                style={{
                  textDecoration: 'none',
                  cursor: 'pointer',
                  display: 'inline-block',
                }}
              >
                회원가입
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
