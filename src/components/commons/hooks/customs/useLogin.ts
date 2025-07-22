// react-hook-form에서 폼 관리를 위한 훅과 타입을 가져옴
import { useForm, SubmitHandler } from "react-hook-form";
// 로그인 요청을 위한 GraphQL mutation 커스텀 훅
import { useMutationLoginUser } from "@/src/components/commons/hooks/mutations/useMutationLoginUser";
// 전역 상태 관리용 Recoil 훅
import { useRecoilState } from "recoil";
import { accessTokenState } from "@/src/commons/stores"; // accessToken을 저장하는 atom
// 에러 메시지를 모달로 보여주기 위한 Ant Design 컴포넌트
import { Modal } from "antd";
// 페이지 이동을 추상화한 커스텀 훅
import { useMoveToPage } from "@/src/components/commons/hooks/customs/useMoveToPage";

// 폼 입력값 타입 정의
interface IFormInput {
  email: string;
  password: string;
  keepLoggedIn: boolean; // 로그인 상태 유지 체크박스
}

// 로그인 로직을 담당하는 커스텀 훅
export const useLogin = () => {
  // 로그인 mutation 실행 함수 가져오기
  const [loginUser] = useMutationLoginUser();

  // accessToken 상태와 setter 함수 가져오기
  const [accessToken, setAccessToken] = useRecoilState(accessTokenState);

  // 페이지 이동 함수 가져오기
  const { onClickMoveToPage } = useMoveToPage();

  // react-hook-form의 useForm 훅 사용
  const {
    register, // 입력 필드 등록 함수
    handleSubmit, // 제출 핸들러 래퍼
    formState: { errors, isValid }, // 에러 객체와 폼 유효성 상태
  } = useForm<IFormInput>({ mode: "onChange" }); // 입력값 변경 시마다 유효성 검사

  // 폼 제출 시 실행되는 함수 (유효성 검사 통과 후 실행됨)
  const handleLoginSubmit: SubmitHandler<IFormInput> = async (data) => {
    try {
      // 로그인 mutation 실행
      const result = await loginUser({
        variables: {
          email: data.email,
          password: data.password,
        },
      });

      // 응답에서 accessToken 추출
      const token = result.data?.loginUser.accessToken;

      // accessToken을 recoil 상태와 localStorage에 저장
      setAccessToken(token || "");
      localStorage.setItem("accessToken", token || "");

      // 로그인 성공 알림
      alert("환영합니다!");

      // 마이페이지로 이동
      onClickMoveToPage("/mypages");
    } catch (error) {
      // 에러 발생 시 모달로 메시지 출력
      if (error instanceof Error) {
        Modal.error({ content: error.message });
      }
    }
  };

  // 훅에서 필요한 값들을 반환
  return {
    register, // 입력 필드 등록
    onSubmit: handleSubmit(handleLoginSubmit), // react-hook-form 대응
    handleSignUpClick: onClickMoveToPage("login/registration"), // 회원가입 페이지 이동 함수
    errors, // 유효성 검사 에러 객체
    isValid, // 전체 폼 유효성 상태
  };
};
