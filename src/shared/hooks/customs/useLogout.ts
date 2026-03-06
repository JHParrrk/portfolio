import { useGlobalStore } from '@/shared/models/stores';
import { useMoveToPage } from '@/shared/hooks/customs/useMoveToPage';
import { Modal } from 'antd';

export const useLogout = () => {
  const { onClickMoveToPage } = useMoveToPage();
  const setToken = useGlobalStore((state) => state.setAccessToken);

  const onLogout = (): void => {
    // 1. Recoil 상태 초기화
    setToken('');

    // ⭐ `localStorage` 삭제 로직 제거 ⭐
    // localStorage.removeItem("accessToken");

    // 2. Ant Design Modal로 알림창 표시
    Modal.success({
      content: '로그아웃되었습니다.',
      // 3. "확인" 버튼을 눌렀을 때 페이지 이동 함수 실행
      onOk: () => {
        onClickMoveToPage('/')();
      },
    });
  };

  return { onLogout };
};
