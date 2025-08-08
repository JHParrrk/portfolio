// C:\portfolio\firstapp\src\components\commons\hooks\customs\useBoardWrite.ts
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
import { ChangeEvent, useState, useEffect, useMemo } from "react";
import { yupResolver } from "@hookform/resolvers/yup";
import { boardSchema, IFormData } from "@/src/commons/validations/boardSchema";
import { Modal } from "antd";

export interface IBoardWriteDataProps {
  data?: Pick<IQuery, "fetchBoard">;
}

export const useBoardWrite = (props: IBoardWriteDataProps) => {
  const { data } = props;
  const router = useRouter();
  const isEdit = router.pathname.includes("edit");

  const [isOpen, setIsOpen] = useState(false);
  const toggleModal = () => setIsOpen((prev) => !prev);

  const {
    register,
    handleSubmit,
    control,
    formState: { errors, isValid, dirtyFields, isDirty },
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
    context: { isEdit },
  });

  useEffect(() => {
    if (data?.fetchBoard) {
      // 1. 기존 이미지 배열의 길이를 가져옵니다.
      const fetchedImages = data.fetchBoard.images ?? [];
      // 2. 이미지 배열의 길이가 3보다 작으면 빈 문자열을 추가하여 길이를 3으로 만듭니다.
      const imagesToReset = [
        ...fetchedImages,
        ...Array(3 - fetchedImages.length).fill(""),
      ];

      reset({
        writer: data.fetchBoard.writer ?? "",
        title: data.fetchBoard.title ?? "",
        contents: data.fetchBoard.contents ?? "",
        zipcode: data.fetchBoard.boardAddress?.zipcode ?? "",
        address: data.fetchBoard.boardAddress?.address ?? "",
        addressDetail: data.fetchBoard.boardAddress?.addressDetail ?? "",
        youtubeUrl: data.fetchBoard.youtubeUrl ?? "",
        images: imagesToReset,
      });
      const initialFileList = Array(3).fill(null);
      setFileList(initialFileList);
      // 게시글 수정일때
    } else {
      reset({
        writer: "",
        password: "",
        title: "",
        contents: "",
        zipcode: "",
        address: "",
        addressDetail: "",
        youtubeUrl: "",
        images: ["", "", ""],
      });
      setFileList([null, null, null]);
      // 게시글 최초 등록일때
    }
  }, [data, reset]);

  const [createBoard] = useMutationCreateBoard();
  const [updateBoard] = useMutationUpdateBoard();
  const [uploadFile] = useMutationUploadFile();

  const [fileList, setFileList] = useState<(File | null)[]>([null, null, null]);

  // 기존 fileList 상태와 form의 images 값을 동기화하도록 수정
  const onFileSelect = (file: File | undefined, index: number) => {
    // fileList 업데이트
    const newFileList = [...fileList];
    newFileList[index] = file || null;
    setFileList(newFileList);
    if (file) {
      setValue(`images.${index}`, "", { shouldDirty: true });
      // react-hook-form의 setValue를 사용하여 images 배열의 해당 값들을 빈 문자열로 초기화
    }
  };

  const onSubmit = async (formData: IFormData) => {
    // 1. 파일 업로드
    const uploadedUrls = await Promise.all(
      fileList.map(async (file, idx) => {
        if (file) {
          const result = await uploadFile({ variables: { file } });
          return result.data?.uploadFile.url ?? "";
        }
        // 기존 서버 URL 유지
        return formData.images?.[idx] || "";
      })
    );

    // 업로드 후, 빈 문자열은 제외하고 서버에 보낼 배열을 만듭니다.
    const finalImages = uploadedUrls.filter((url) => url !== "");
    // 2. 서버에 등록
    try {
      const result = await createBoard({
        variables: {
          createBoardInput: {
            writer: formData.writer,
            password: formData.password,
            title: formData.title,
            contents: formData.contents,
            youtubeUrl: formData.youtubeUrl,
            boardAddress:
              formData.address || formData.zipcode || formData.addressDetail
                ? {
                    zipcode: formData.zipcode,
                    address: formData.address,
                    addressDetail: formData.addressDetail,
                  }
                : undefined,
            images: finalImages,
          },
        },
      });
      if (!result.data?.createBoard) {
        throw new Error("게시글 생성에 실패했습니다.");
      }
      Modal.success({ content: "게시글이 등록되었습니다." });
      void router.push(`/boards/${result.data.createBoard._id}`);
    } catch (error: any) {
      if (error instanceof Error) Modal.error({ content: error.message });
    }
  };

  const onUpdate = async (formData: IFormData) => {
    // 변경 사항이 없는 경우 경고 메시지 표시
    // if (
    //   Object.keys(dirtyFields).length === 0 &&
    //   fileList.every((file) => !file)
    // ) {
    //   Modal.warning({ content: "수정된 내용이 없습니다." });
    //   return;
    // }

    // 1. 파일 업로드
    const uploadedUrls = await Promise.all(
      fileList.map(async (file, idx) => {
        if (file) {
          // 새 파일이 있으면 업로드
          const result = await uploadFile({ variables: { file } });
          return result.data?.uploadFile.url ?? "";
        } else {
          // 파일이 없으면 기존 images 배열의 값을 사용 (이 값은 삭제 버튼이나 새 파일 업로드로 인해 ""가 될 수 있음)
          return formData.images?.[idx] || "";
        }
      })
    );

    // 업로드 후, 서버에 보낼 배열을 만듭니다.
    const finalImages = uploadedUrls;

    // 2. 서버에 수정 요청
    const updateBoardInput: IUpdateBoardInput = {};

    if (dirtyFields.title) updateBoardInput.title = formData.title;
    if (dirtyFields.contents) updateBoardInput.contents = formData.contents;
    if (dirtyFields.youtubeUrl)
      updateBoardInput.youtubeUrl = formData.youtubeUrl;

    updateBoardInput.images = finalImages;

    // 주소 정보 변경 여부 확인 및 추가
    if (
      dirtyFields.zipcode ||
      dirtyFields.address ||
      dirtyFields.addressDetail
    ) {
      updateBoardInput.boardAddress = {
        zipcode: formData.zipcode,
        address: formData.address,
        addressDetail: formData.addressDetail,
      };
    }

    try {
      const result = await updateBoard({
        variables: {
          boardId: router.query.boardId as string,
          password: formData.password,
          updateBoardInput,
        },
      });

      if (!result.data?.updateBoard) {
        throw new Error("게시글 업데이트에 실패했습니다.");
      }
      Modal.success({ content: "게시글이 수정되었습니다." });
      void router.push(`/boards/${result.data.updateBoard._id}`);
    } catch (error: any) {
      Modal.error({ content: error.message });
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

  const fileUrls = watch("images") || ["", "", ""];
  const isChanged = isDirty || fileList.some((file) => file !== null);
  console.log("isDirty:", isDirty);
  console.log("fileList:", fileList);
  console.log("isChanged:", isChanged);

  return {
    register,
    handleSubmit,
    control,
    errors,
    isValid,
    isChanged,
    onSubmit,
    onUpdate,
    onChangeAddressDetail,
    onCompleteAddressSearch,
    onFileSelect,
    isOpen,
    fileUrls,
    toggleModal,
    setValue,
  };
};
