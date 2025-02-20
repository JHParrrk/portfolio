// BoardWrite.tsx

import { useMutation } from "@apollo/client";
import { useRouter } from "next/router";
import BoardWriteUI from "./BoardWrite.presenter";
import { CREATE_BOARD, UPDATE_BOARD } from "./BoardWrite.queries";
import {
  IMutation,
  IMutationCreateBoardArgs,
  IMutationUpdateBoardArgs,
  IUpdateBoardInput,
  IBoardAddressInput,
} from "../../../../commons/types/generated/types";
import { IBoardWriteProps, IFormData } from "./BoardWrite.types";
import { useForm } from "react-hook-form";
import type { Address } from "react-daum-postcode";
import { ChangeEvent, useState, useEffect } from "react";

export default function BoardWrite(props: IBoardWriteProps) {
  const router = useRouter();

  const [isOpen, setIsOpen] = useState(false);

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
      images: ["", "", ""], // images를 길이 3의 배열로 초기화
    },
  });

  useEffect(() => {
    if (props.data?.fetchBoard) {
      reset({
        writer: props.data.fetchBoard.writer ?? "",
        title: props.data.fetchBoard.title ?? "",
        contents: props.data.fetchBoard.contents ?? "",
        zipcode: props.data.fetchBoard.boardAddress?.zipcode ?? "",
        address: props.data.fetchBoard.boardAddress?.address ?? "",
        addressDetail: props.data.fetchBoard.boardAddress?.addressDetail ?? "",
        youtubeUrl: props.data.fetchBoard.youtubeUrl ?? "",
        images:
          props.data.fetchBoard.images &&
          props.data.fetchBoard.images.length > 0
            ? props.data.fetchBoard.images
            : ["", "", ""], // images 필드를 설정
      });
    }
  }, [props.data, reset]);

  // 뮤테이션 훅 설정
  const [createBoard] = useMutation<
    Pick<IMutation, "createBoard">,
    IMutationCreateBoardArgs
  >(CREATE_BOARD);

  const [updateBoard] = useMutation<
    Pick<IMutation, "updateBoard">,
    IMutationUpdateBoardArgs
  >(UPDATE_BOARD);

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
      void router.push(`/boards/${result.data.createBoard._id}`);
      alert("게시글이 등록되었습니다.");
    } catch (error: any) {
      if (error instanceof Error) alert(error.message);
    }
  };

  const onUpdate = async (formData: IFormData) => {
    const updateBoardInput: IUpdateBoardInput = {};
    const boardAddressInput: IBoardAddressInput = {};

    if (formData.title && formData.title !== props.data?.fetchBoard.title)
      updateBoardInput.title = formData.title;
    if (
      formData.contents &&
      formData.contents !== props.data?.fetchBoard.contents
    )
      updateBoardInput.contents = formData.contents;
    if (
      formData.youtubeUrl &&
      formData.youtubeUrl !== props.data?.fetchBoard.youtubeUrl
    )
      updateBoardInput.youtubeUrl = formData.youtubeUrl;

    if (
      JSON.stringify(formData.images) !==
      JSON.stringify(props.data?.fetchBoard.images)
      // 그냥 비교하면 주소를 비교하기때문에 문자열로 비교하기 위하여
    ) {
      updateBoardInput.images = formData.images;
    }

    if (
      formData.zipcode !== props.data?.fetchBoard.boardAddress?.zipcode ||
      formData.address !== props.data?.fetchBoard.boardAddress?.address ||
      formData.addressDetail !==
        props.data?.fetchBoard.boardAddress?.addressDetail
    ) {
      if (formData.zipcode) boardAddressInput.zipcode = formData.zipcode;
      if (formData.address) boardAddressInput.address = formData.address;
      if (formData.addressDetail)
        boardAddressInput.addressDetail = formData.addressDetail;

      if (Object.keys(boardAddressInput).length > 0) {
        updateBoardInput.boardAddress = boardAddressInput;
      }
    }

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
      router.push(`/boards/${result.data.updateBoard._id}`);
    } catch (error: any) {
      if (error instanceof Error) alert(error.message);
    }
  };

  const onChangeAddressDetail = (
    event: ChangeEvent<HTMLInputElement>
  ): void => {
    setValue("addressDetail", event.target.value);
  };

  const onClickAddressSearch = (): void => {
    setIsOpen((prev) => !prev);
  };

  const onCompleteAddressSearch = (data: Address): void => {
    setValue("zipcode", data.zonecode);
    setValue("address", data.address);
    setIsOpen(false);
  };

  const onChangeFileUrls = (fileUrl: string, index: number): void => {
    const images = getValues("images") || ["", "", ""];
    const newImages = [...images];
    newImages[index] = fileUrl;
    setValue("images", newImages);
  };

  const fileUrls = watch("images") || ["", "", ""];

  const extendedProps = {
    ...props,
    register,
    watch,
    formState: { errors, isValid },
    isOpen,
    onChangeAddressDetail,
    onClickAddressSearch,
    onCompleteAddressSearch,
    onChangeFileUrls,
    onClickSubmit: handleSubmit(onSubmit),
    onClickUpdate: handleSubmit(onUpdate),
    fileUrls,
  };

  return <BoardWriteUI {...extendedProps} />;
}
