import { useMutation } from "@apollo/client";
import RegistrationPageUI from "./registration.presenter";
import { CREATE_USER } from "./registration.queries";
import {
  IMutation,
  IMutationCreateUserArgs,
} from "@/src/commons/types/generated/types";
import { useRouter } from "next/router";
import { useForm, SubmitHandler } from "react-hook-form";
import { IFormInput } from "./registration.types";
import { Modal } from "antd";

export default function RegistrationPage(): JSX.Element {
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
    watch,
  } = useForm<IFormInput>({ mode: "onChange" });

  const [createUser] = useMutation<
    Pick<IMutation, "createUser">,
    IMutationCreateUserArgs
  >(CREATE_USER);

  const handleRegistrationSubmit: SubmitHandler<IFormInput> = async (data) => {
    // 디버깅: React Hook Form에서 수집된 데이터 확인
    // console.log("Submitted Data:", data);

    if (data.password !== data.confirmPassword) {
      Modal.error({
        title: "회원가입 실패",
        content: "비밀번호와 비밀번호 확인이 일치하지 않습니다.",
      });
      return;
    }

    try {
      const result = await createUser({
        variables: {
          createUserInput: {
            email: data.email,
            password: data.password,
            name: data.name,
          },
        },
      });

      // 디버깅: GraphQL 서버 응답 확인
      // console.log("Mutation Result:", result);

      if (!result.data?.createUser) {
        throw new Error("회원가입에 실패했습니다. 다시 시도해주세요.");
      }

      Modal.success({
        title: "회원가입 성공",
        content: "회원가입을 축하합니다! 로그인 페이지로 이동합니다.",
      });

      router.push("/login");
    } catch (error) {
      if (error instanceof Error) {
        Modal.error({
          title: "회원가입 실패",
          content: `회원가입 중 문제가 발생했습니다: ${error.message}`,
        });
      } else {
        Modal.error({
          title: "회원가입 실패",
          content: "알 수 없는 문제가 발생했습니다. 잠시 후 다시 시도해주세요.",
        });
      }
    }
  };

  const props = {
    register,
    watch,
    onSubmit: handleSubmit(handleRegistrationSubmit),
    errors,
    isValid,
  };

  return <RegistrationPageUI {...props} />;
}
