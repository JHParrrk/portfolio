import { useForm, SubmitHandler } from "react-hook-form";
import { Modal } from "antd";
import { useMutationCreateUser } from "@/src/components/commons/hooks/mutations/useMutationCreateUser";
import { useMoveToPage } from "@/src/components/commons/hooks/customs/useMoveToPage";
import { yupResolver } from "@hookform/resolvers/yup";
import {
  IFormInput,
  registrationSchema,
} from "@/src/components/units/login/registration/registration.types";

/**
 * @description 회원가입 페이지의 로직을 담당하는 커스텀 훅
 * - react-hook-form을 사용한 폼 상태 관리
 * - Yup을 이용한 스키마 기반 유효성 검증
 * - createUser GraphQL 뮤테이션을 통한 서버 통신
 * - Ant Design의 Modal을 이용한 사용자 피드백 처리
 */

export const useRegistration = () => {
  const { onClickMoveToPage } = useMoveToPage();
  const [createUser] = useMutationCreateUser();

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
    watch, // watch는 Yup 스키마 내부에서 사용되므로 여기서는 직접 필요하지 않을 수 있으나, 필요한 경우를 위해 유지합니다.
  } = useForm<IFormInput>({
    // mode: "onChange"는 실시간으로 유효성 검사를 수행하여 사용자 경험을 향상시킵니다.
    mode: "onChange",
    // Yup 스키마를 react-hook-form에 연결하여 보다 선언적이고 강력한 유효성 검사를 수행합니다.
    resolver: yupResolver(registrationSchema),
    // Yup 스키마를 사용하면 각 필드의 기본값을 명시적으로 설정할 수 있습니다.
    defaultValues: {
      email: "",
      name: "",
      password: "",
      confirmPassword: "",
    },
  });

  /**
   * @description 폼 제출 시 실행되는 핸들러 함수
   * - react-hook-form의 handleSubmit이 유효성 검사를 통과한 데이터(data)를 인자로 전달합니다.
   */
  const handleRegistrationSubmit: SubmitHandler<IFormInput> = async (data) => {
    // [리팩토링] 비밀번호 일치 여부 확인 로직 제거
    // Yup 스키마의 .oneOf([yup.ref('password')]) 규칙이 이미 이 검증을 처리하므로,
    // 폼 제출(handleSubmit)이 성공했다면 비밀번호는 항상 일치하는 상태입니다.
    // 이로 인해 코드가 더 간결해지고 유효성 검증 로직이 한곳(schema)으로 집중됩니다.

    try {
      // GraphQL 뮤테이션을 호출하여 사용자 생성을 요청합니다.
      const result = await createUser({
        variables: {
          createUserInput: {
            email: data.email,
            password: data.password,
            name: data.name,
          },
        },
      });

      // 뮤테이션 실행 후 반환된 데이터가 없는 경우를 대비한 예외 처리
      if (!result.data?.createUser) {
        throw new Error("서버로부터 응답을 받지 못했습니다.");
      }

      // 회원가입 성공 시 사용자에게 긍정적인 피드백을 주고 로그인 페이지로 이동시킵니다.
      Modal.success({
        title: "회원가입 성공",
        content: "회원가입을 축하합니다! 로그인 페이지로 이동합니다.",
        onOk: () => onClickMoveToPage("/login"), // 모달의 OK 버튼 클릭 시 페이지 이동
      });
    } catch (error) {
      // 네트워크 오류, GraphQL 오류 등 비동기 요청 중 발생한 모든 에러를 처리합니다.
      const errorMessage =
        error instanceof Error
          ? error.message
          : "알 수 없는 에러가 발생했습니다.";

      Modal.error({
        title: "회원가입 실패",
        // 사용자에게는 서버에서 받은 에러 메시지(예: "이미 존재하는 이메일입니다.") 또는 일반적인 실패 메시지를 보여줍니다.
        content: errorMessage,
      });
    }
  };

  return {
    register,
    // handleSubmit으로 폼 제출 로직을 감싸서 반환합니다.
    onSubmit: handleSubmit(handleRegistrationSubmit),
    errors,
    isValid,
    watch, // UI에서 watch가 필요한 경우를 위해 반환합니다. (예: 특정 값에 따라 다른 UI를 보여줄 때)
  };
};
