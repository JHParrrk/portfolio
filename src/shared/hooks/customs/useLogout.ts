import { useGlobalStore } from '@/shared/models/stores';
import { useMoveToPage } from '@/shared/hooks/customs/useMoveToPage';
import { Modal } from 'antd';
import { useMutationLogoutUser } from '@/shared/hooks/mutations/useMutationLogoutUser';
import { useApolloClient } from '@apollo/client';

export const useLogout = () => {
  const { onClickMoveToPage } = useMoveToPage();
  const setToken = useGlobalStore((state) => state.setAccessToken);
  const [logoutUser] = useMutationLogoutUser();
  const client = useApolloClient();

  const onLogout = async (): Promise<void> => {
    try {
      // 1. 서버 로그아웃 (HttpOnly 쿠키 제거)
      await logoutUser();

      // 2. Global State 초기화
      setToken('');

      // 3. Apollo Cache 초기화
      await client.resetStore();

      // 4. 알림 및 페이지 이동
      Modal.success({
        content: '로그아웃되었습니다.',
        onOk: () => {
          onClickMoveToPage('/')();
        },
      });
    } catch (error) {
      if (error instanceof Error) Modal.error({ content: error.message });
    }
  };

  return { onLogout };
};
