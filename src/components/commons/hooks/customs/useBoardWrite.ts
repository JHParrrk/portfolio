import { useRouter } from "next/router";
import { useMutationCreateBoard } from "@/src/components/commons/hooks/mutations/useMutationCreateBoard";
import { useMutationUpdateBoard } from "@/src/components/commons/hooks/mutations/useMutationUpdateBoard";
import { useMutationUploadFile } from "@/src/components/commons/hooks/mutations/useMutationUploadFile";
import {
  IUpdateBoardInput,
  IBoardAddressInput,
  IQuery,
} from "@/src/commons/types/generated/types";
import { useForm } from "react-hook-form";
import type { Address } from "react-daum-postcode";
import { ChangeEvent, useState, useEffect } from "react";
import { yupResolver } from "@hookform/resolvers/yup";
import { boardSchema, IFormData } from "@/src/commons/validations/boardSchema";

export interface IBoardWriteDataProps {
  data?: Pick<IQuery, "fetchBoard">;
}


export const useBoardWrite = (props: IBoardWriteDataProps) => {
  const { data } = props;
  const router = useRouter();

  const [isOpen, setIsOpen] = useState(false);
  const toggleModal = () => setIsOpen((prev) => !prev);

  const {
    register,
    handleSubmit,
    control,
    formState: { errors, isValid },
    setValue,
    getValues,
    watch,
    reset,
  } = useForm<IFormData>({
    resolver: yupResolver(boardSchema),
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

  const [createBoard] = useMutationCreateBoard();
  const [updateBoard] = useMutationUpdateBoard();
  const [uploadFile] = useMutationUploadFile();

  // dataURL을 File 객체로 변환하는 함수
  function dataURLtoFile(dataurl: string, filename = "image.png") {
    const arr = dataurl.split(",");
    const mime = arr[0].match(/:(.*?);/)?.[1] || "";
    const bstr = atob(arr[1]);
    let n = bstr.length;
    const u8arr = new Uint8Array(n);
    while (n--) {
      u8arr[n] = bstr.charCodeAt(n);
    }
    return new File([u8arr], filename, { type: mime });
  }

  // 게시글 등록
  const onSubmit = async (formData: IFormData) => {
    try {
      // 1. dataURL인 경우 서버 업로드 후 URL로 변환
      const images = await Promise.all(
        (formData.images || ["", "", ""]).map(async (img) => {
          if (img && img.startsWith("data:")) {
            const file = dataURLtoFile(img);
            const res = await uploadFile({ variables: { file } });
            return res.data?.uploadFile.url ?? "";
          }
          return img;
        })
      );

      const result = await createBoard({
        variables: {
          createBoardInput: {
            writer: formData.writer,
            password: formData.password,
            title: formData.title,
            contents: formData.contents,
            youtubeUrl: formData.youtubeUrl,
            images,
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

  // 게시글 수정
  const onUpdate = async (formData: IFormData) => {
    const updateBoardInput: IUpdateBoardInput = {};
    const boardAddressInput: IBoardAddressInput = {};

    if (formData.title && formData.title !== data?.fetchBoard.title)
      updateBoardInput.title = formData.title;
    if (formData.contents && formData.contents !== data?.fetchBoard.contents)
      updateBoardInput.contents = formData.contents;
    if (
      formData.youtubeUrl &&
      formData.youtubeUrl !== data?.fetchBoard.youtubeUrl
    )
      updateBoardInput.youtubeUrl = formData.youtubeUrl;

    // 이미지 변경 시 dataURL 업로드 처리
    let images = formData.images;
    if (
      JSON.stringify(formData.images) !==
      JSON.stringify(data?.fetchBoard.images)
    ) {
      images = await Promise.all(
        (formData.images || ["", "", ""]).map(async (img) => {
          if (img && img.startsWith("data:")) {
            const file = dataURLtoFile(img);
            const res = await uploadFile({ variables: { file } });
            return res.data?.uploadFile.url ?? "";
          }
          return img;
        })
      );
      updateBoardInput.images = images;
    }

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

  const onChangeAddressDetail = (
    event: ChangeEvent<HTMLInputElement>
  ): void => {
    setValue("addressDetail", event.target.value);
  };

  const onCompleteAddressSearch = (data: Address): void => {
    setValue("zipcode", data.zonecode);
    setValue("address", data.address);
    setIsOpen(false);
  };

  // 이미지 미리보기/업로드용 URL 관리
  const onChangeFileUrls = (fileUrl: string, index: number): void => {
    const images = getValues("images") || ["", "", ""];
    const newImages = [...images];
    newImages[index] = fileUrl;
    setValue("images", newImages);
  };

  const fileUrls = watch("images") || ["", "", ""];

  return {
    register,
    handleSubmit,
    control,
    errors,
    isValid,
    onSubmit,
    onUpdate,
    onChangeAddressDetail,
    onCompleteAddressSearch,
    onChangeFileUrls,
    isOpen,
    fileUrls,
    toggleModal,
  };
};
