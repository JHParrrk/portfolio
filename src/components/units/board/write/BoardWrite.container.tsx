import { useMutation } from "@apollo/client"; // Apollo Client의 useMutation 훅을 임포트하여 GraphQL 뮤테이션을 실행할 수 있게 합니다.
import { useRouter } from "next/router"; // Next.js의 useRouter 훅을 임포트하여 라우팅 기능을 사용합니다.
import BoardWriteUI from "./BoardWrite.presenter"; // BoardWriteUI 컴포넌트를 임포트합니다.
import { CREATE_BOARD, UPDATE_BOARD } from "./BoardWrite.queries"; // GraphQL 쿼리를 임포트합니다.
import {
  IMutation,
  IMutationCreateBoardArgs,
  IMutationUpdateBoardArgs,
  IUpdateBoardInput,
  IBoardAddressInput,
} from "../../../../commons/types/generated/types"; // GraphQL 타입을 임포트합니다.
import { IBoardWriteProps, IFormData } from "./BoardWrite.types"; // 컴포넌트에서 사용할 타입을 임포트합니다.
import { useForm } from "react-hook-form"; // react-hook-form의 useForm 훅을 임포트하여 폼 관리를 합니다.
import type { Address } from "react-daum-postcode"; // react-daum-postcode에서 Address 타입을 임포트합니다.
import { ChangeEvent, useState, useEffect } from "react"; // React 훅을 임포트합니다.

export default function BoardWrite(props: IBoardWriteProps) {
  const router = useRouter(); // useRouter 훅을 사용하여 라우터 객체를 가져옵니다.

  const [isOpen, setIsOpen] = useState(false); // 모달 열림 상태를 관리하는 useState 훅을 정의합니다.
  const [youtubeUrl, setYoutubeUrl] = useState(""); // 유튜브 URL 상태를 관리하는 useState 훅을 정의합니다.

  const {
    register, // 폼 필드를 등록하는 함수
    handleSubmit, // 폼 제출을 핸들링하는 함수
    formState: { errors, isValid }, // 폼 필드의 오류 상태와 폼의 유효성 상태
    setValue, // 폼 필드의 값을 설정하는 함수
    watch, // 폼 필드의 값을 관찰하는 함수
    reset, // 폼을 초기화하는 함수
  } = useForm<IFormData>({
    mode: "onChange", // 폼 모드를 "onChange"로 설정합니다.
    defaultValues: {
      // 초기값을 설정합니다.
      writer: "",
      password: "",
      title: "",
      contents: "",
      zipcode: "",
      address: "",
      addressDetail: "",
      youtubeUrl: "",
    },
  });

  useEffect(() => {
    if (props.data) {
      reset({
        writer: props.data.fetchBoard.writer ?? "",
        title: props.data.fetchBoard.title,
        contents: props.data.fetchBoard.contents,
        zipcode: props.data.fetchBoard.boardAddress?.zipcode ?? "",
        address: props.data.fetchBoard.boardAddress?.address ?? "",
        addressDetail: props.data.fetchBoard.boardAddress?.addressDetail ?? "",
        youtubeUrl: props.data.fetchBoard.youtubeUrl ?? "",
      }); // props.data가 변경될 때마다 폼 값을 초기화합니다.
    }
  }, [props.data, reset]); // props.data 또는 reset 함수가 변경될 때마다 실행
  // props.data가 존재할 경우, reset 함수를 사용하여 기존 데이터를 폼 필드에 설정합니다.

  const [createBoard] = useMutation<
    Pick<IMutation, "createBoard">,
    IMutationCreateBoardArgs
  >(CREATE_BOARD); // CREATE_BOARD 뮤테이션을 생성합니다.
  const [updateBoard] = useMutation<
    Pick<IMutation, "updateBoard">,
    IMutationUpdateBoardArgs
  >(UPDATE_BOARD); // UPDATE_BOARD 뮤테이션을 생성합니다.

  const onSubmit = async (formData: IFormData) => {
    // 폼 제출 핸들러 정의
    try {
      const result = await createBoard({
        variables: {
          createBoardInput: {
            writer: formData.writer,
            password: formData.password,
            title: formData.title,
            contents: formData.contents,
            boardAddress: {
              zipcode: formData.zipcode,
              address: formData.address,
              addressDetail: formData.addressDetail,
            },
            youtubeUrl: formData.youtubeUrl,
          },
        },
      });
      if (!result.data) {
        throw new Error("게시글 생성에 실패했습니다."); // 게시글 생성 실패 시 오류 처리
      }
      void router.push(`/boards/${result.data.createBoard._id}`); // 게시글 상세 페이지로 리다이렉트
      alert("게시글이 등록되었습니다."); // 성공 메시지 표시
    } catch (error: any) {
      console.error(error); // 오류 콘솔에 출력
    }
  };

  const onUpdate = async (formData: IFormData) => {
    // 폼 업데이트 핸들러 정의
    const updateBoardInput: IUpdateBoardInput = {};
    const boardAddressInput: IBoardAddressInput = {};

    if (formData.title) updateBoardInput.title = formData.title; // 제목 업데이트
    if (formData.contents) updateBoardInput.contents = formData.contents; // 내용 업데이트

    if (
      formData.zipcode !== props.data?.fetchBoard.boardAddress?.zipcode ||
      formData.address !== props.data?.fetchBoard.boardAddress?.address ||
      formData.addressDetail !==
        props.data?.fetchBoard.boardAddress?.addressDetail
    ) {
      boardAddressInput.zipcode = formData.zipcode; // 우편번호 업데이트
      boardAddressInput.address = formData.address; // 주소 업데이트
      boardAddressInput.addressDetail = formData.addressDetail; // 상세 주소 업데이트
    }

    const myVariables = {
      boardId: router.query.boardId as string, // 라우터 쿼리에서 boardId를 가져옵니다.
      password: formData.password,
      updateBoardInput: {
        ...updateBoardInput,
        boardAddress:
          Object.keys(boardAddressInput).length > 0
            ? boardAddressInput
            : undefined, // 주소 정보가 있을 때만 업데이트
        youtubeUrl: formData.youtubeUrl,
      },
    };

    try {
      const result = await updateBoard({
        variables: myVariables,
      });
      if (!result.data) {
        throw new Error("게시글 업데이트에 실패했습니다."); // 게시글 업데이트 실패 시 오류 처리
      }
      router.push(`/boards/${result.data.updateBoard._id}`); // 게시글 상세 페이지로 리다이렉트
    } catch (error: any) {
      alert(error.message); // 오류 메시지 표시
    }
  };

  const onChangeAddressDetail = (
    event: ChangeEvent<HTMLInputElement>
  ): void => {
    setValue("addressDetail", event.target.value); // 폼 상태 업데이트
  };

  const onClickAddressSearch = (): void => {
    setIsOpen((prev) => !prev); // 모달 열림/닫힘 토글
  };

  const onCompleteAddressSearch = (data: Address): void => {
    setValue("zipcode", data.zonecode); // 우편번호 설정
    setValue("address", data.address); // 주소 설정
    setIsOpen((prev) => !prev); // 모달 닫기
  };

  const extendedProps = {
    ...props,
    register,
    handleSubmit,
    errors,
    watch,
    isValid,
    isOpen,
    onChangeAddressDetail,
    onClickAddressSearch,
    onCompleteAddressSearch,
    setValue,
    onClickSubmit: handleSubmit(onSubmit), // 폼 제출 핸들러 연결
    onClickUpdate: handleSubmit(onUpdate), // 폼 업데이트 핸들러 연결
  };

  return <BoardWriteUI {...extendedProps} />; // BoardWriteUI 컴포넌트를 렌더링하면서 extendedProps를 전달합니다.
}
