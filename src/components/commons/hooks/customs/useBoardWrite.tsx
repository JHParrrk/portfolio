// useBoardWrite.tsx
import { useRouter } from "next/router";
import { useMutationCreateBoard } from "@/src/components/commons/hooks/mutations/useMutationCreateBoard";
import { useMutationUpdateBoard } from "@/src/components/commons/hooks/mutations/useMutationUpdateBoard";
import {
  IUpdateBoardInput,
  IBoardAddressInput,
  IQuery,
} from "@/src/commons/types/generated/types";
import { useForm } from "react-hook-form";
import type { Address } from "react-daum-postcode";
import { ChangeEvent, useState, useEffect } from "react";

export interface IBoardWriteDataProps {
  data?: Pick<IQuery, "fetchBoard">;
}

interface IFormData {
  writer: string;
  password: string;
  title: string;
  contents: string;
  zipcode: string;
  address: string;
  addressDetail: string;
  youtubeUrl: string;
  images: string[]; // 이미지 URL 배열
}

export const useBoardWrite = (props: IBoardWriteDataProps) => {
  const { data } = props;
  const router = useRouter();

  // 주소 검색 모달 열림 상태 (여기서 상태를 관리)
  const [isOpen, setIsOpen] = useState(false);

  // 토글 함수 추가
  const toggleModal = () => setIsOpen((prev) => !prev);

  // react-hook-form 설정 (기본 값과 유효성 검사 등)
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
    setValue,
    getValues,
    watch,
    reset,
  } = useForm<IFormData>({
    mode: "onChange",
    defaultValues: {
      writer: "",
      password: "",
      title: "",
      contents: "",
      zipcode: "",
      address: "",
      addressDetail: "",
      youtubeUrl: "",
      images: ["", "", ""],
    },
  });

  // 수정모드일 경우 기존 데이터를 form에 세팅
  useEffect(() => {
    if (data?.fetchBoard) {
      reset({
        writer: data.fetchBoard.writer ?? "",
        title: data.fetchBoard.title ?? "",
        contents: data.fetchBoard.contents ?? "",
        zipcode: data.fetchBoard.boardAddress?.zipcode ?? "",
        address: data.fetchBoard.boardAddress?.address ?? "",
        addressDetail: data.fetchBoard.boardAddress?.addressDetail ?? "",
        youtubeUrl: data.fetchBoard.youtubeUrl ?? "",
        images:
          data.fetchBoard.images && data.fetchBoard.images.length > 0
            ? data.fetchBoard.images
            : ["", "", ""],
      });
    }
  }, [data, reset]);

  // 게시글 생성 뮤테이션
  const [createBoard] = useMutationCreateBoard();
  // 게시글 수정 뮤테이션
  const [updateBoard] = useMutationUpdateBoard();

  // 게시글 생성 처리 함수
  const onSubmit = async (formData: IFormData) => {
    try {
      const result = await createBoard({
        variables: {
          createBoardInput: {
            writer: formData.writer,
            password: formData.password,
            title: formData.title,
            contents: formData.contents,
            youtubeUrl: formData.youtubeUrl,
            images: formData.images,
            boardAddress:
              formData.address || formData.zipcode || formData.addressDetail
                ? {
                    zipcode: formData.zipcode,
                    address: formData.address,
                    addressDetail: formData.addressDetail,
                  }
                : undefined,
          },
        },
      });
      if (!result.data?.createBoard) {
        throw new Error("게시글 생성에 실패했습니다.");
      }
      alert("게시글이 등록되었습니다.");
      void router.push(`/boards/${result.data.createBoard._id}`);
    } catch (error: any) {
      if (error instanceof Error) alert(error.message);
    }
  };

  // 게시글 수정 처리 함수
  const onUpdate = async (formData: IFormData) => {
    const updateBoardInput: IUpdateBoardInput = {};
    const boardAddressInput: IBoardAddressInput = {};

    // 변경된 필드만 업데이트
    if (formData.title && formData.title !== data?.fetchBoard.title)
      updateBoardInput.title = formData.title;
    if (formData.contents && formData.contents !== data?.fetchBoard.contents)
      updateBoardInput.contents = formData.contents;
    if (
      formData.youtubeUrl &&
      formData.youtubeUrl !== data?.fetchBoard.youtubeUrl
    )
      updateBoardInput.youtubeUrl = formData.youtubeUrl;

    if (
      JSON.stringify(formData.images) !==
      JSON.stringify(data?.fetchBoard.images)
    ) {
      updateBoardInput.images = formData.images;
    }

    // 주소 변경 확인
    if (
      formData.zipcode !== data?.fetchBoard.boardAddress?.zipcode ||
      formData.address !== data?.fetchBoard.boardAddress?.address ||
      formData.addressDetail !== data?.fetchBoard.boardAddress?.addressDetail
    ) {
      if (formData.zipcode) boardAddressInput.zipcode = formData.zipcode;
      if (formData.address) boardAddressInput.address = formData.address;
      if (formData.addressDetail)
        boardAddressInput.addressDetail = formData.addressDetail;

      if (Object.keys(boardAddressInput).length > 0) {
        updateBoardInput.boardAddress = boardAddressInput;
      }
    }

    // 변경된 내용이 없으면 함수 종료
    if (Object.keys(updateBoardInput).length === 0) {
      alert("수정사항이 없습니다.");
      return;
    }

    const myVariables = {
      boardId: router.query.boardId as string,
      password: formData.password,
      updateBoardInput,
    };

    try {
      const result = await updateBoard({
        variables: myVariables,
      });
      if (!result.data?.updateBoard) {
        throw new Error("게시글 업데이트에 실패했습니다.");
      }
      void router.push(`/boards/${result.data.updateBoard._id}`);
    } catch (error: any) {
      if (error instanceof Error) alert(error.message);
    }
  };

  // 입력 핸들러들
  const onChangeAddressDetail = (
    event: ChangeEvent<HTMLInputElement>
  ): void => {
    setValue("addressDetail", event.target.value);
  };

  // 주소 검색 완료 시 (모달을 닫기 위해 훅 내부의 상태를 사용)
  const onCompleteAddressSearch = (data: Address): void => {
    setValue("zipcode", data.zonecode);
    setValue("address", data.address);
    setIsOpen(false); // → 여기서 모달이 닫힘
  };

  const onChangeFileUrls = (fileUrl: string, index: number): void => {
    const images = getValues("images") || ["", "", ""];
    const newImages = [...images];
    newImages[index] = fileUrl;
    setValue("images", newImages);
  };

  // 감시하는 이미지 상태값
  const fileUrls = watch("images") || ["", "", ""];

  return {
    register,
    handleSubmit,
    errors,
    isValid,
    onSubmit,
    onUpdate,
    onChangeAddressDetail,
    onCompleteAddressSearch,
    onChangeFileUrls,
    isOpen,
    fileUrls,
    toggleModal, // 토글 함수 반환
  };
};
