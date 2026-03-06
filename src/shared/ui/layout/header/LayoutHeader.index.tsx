import { LH } from "./LayoutHeader.css";
import { useMoveToPage } from "@/shared/hooks/customs/useMoveToPage";
import { useQueryFetchUserLoggedIn } from "@/shared/hooks/queries/useQueryFetchUserLoggedIn";                                                                   
import { useLogout } from "@/shared/hooks/customs/useLogout";

import { useGlobalStore } from '@/shared/models/stores';

export default function LayoutHeader(): JSX.Element {
  const { onClickMoveToPage } = useMoveToPage();
  const { onLogout } = useLogout();
  const accessToken = useGlobalStore((state) => state.accessToken);
  
  // useQueryFetchUserLoggedIn 훅을 사용하여 데이터 가져오기
  const { data } = useQueryFetchUserLoggedIn();

  return (
    <div className={LH.Wrapper}>
      <div className={LH.InnerWrapper}>
        <div className={LH.InnerLogo} onClick={onClickMoveToPage("/boards")}>
          💎 LIVE
        </div>
        <div>
          {accessToken ? (
            <>
              <span className={LH.InnerButton} onClick={onClickMoveToPage("/mypages")}>
                {data?.fetchUserLoggedIn?.name ?? "사용자"}님 환영합니다.       
              </span>
              <span className={LH.InnerButton} onClick={onLogout}>로그아웃</span>      
            </>
          ) : (
            <>
              <span className={LH.InnerButton} onClick={onClickMoveToPage("/login")}>
                로그인
              </span>
              <span className={LH.InnerButton} onClick={onClickMoveToPage("/login/registration")}>
                회원가입
              </span>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
