// src/components/commons/hooks/customs/useUpdateUser.ts

import { useState } from "react";
import { Modal } from "antd";
import { useMutationUpdateUser } from "@/src/components/commons/hooks/mutations/useMutationUpdateUser";
import { useMutationUploadFile } from "@/src/components/commons/hooks/mutations/useMutationUploadFile";
import { useQueryFetchUserLoggedIn } from "@/src/components/commons/hooks/queries/useQueryFetchUserLoggedIn";

export const useUpdateUser = () => {
  const { data: userData, refetch: refetchUser } = useQueryFetchUserLoggedIn();
  const { mutation: updateUser } = useMutationUpdateUser();
  const [uploadFile] = useMutationUploadFile();

  const [file, setFile] = useState<File | null>(null);

  const pictureUrl = userData?.fetchUserLoggedIn.picture ?? "";

  const onFileSelect = (selectedFile: File | undefined) => {
    setFile(selectedFile || null);
  };

  const onSubmitUpdateUser = async () => {
    if (!file) {
      Modal.warning({ content: "변경할 프로필 사진을 선택해 주세요." });
      return;
    }

    try {
      const uploadResult = await uploadFile({ variables: { file } });
      const newPictureUrl = uploadResult.data?.uploadFile.url;

      if (!newPictureUrl) {
        throw new Error("파일 업로드에 실패했습니다.");
      }

      await updateUser({
        variables: {
          updateUserInput: {
            picture: newPictureUrl,
          },
        },
      });

      Modal.success({ content: "프로필 사진이 성공적으로 변경되었습니다." });
      void refetchUser();
      setFile(null);
    } catch (error) {
      if (error instanceof Error) {
        Modal.error({ content: `프로필 사진 변경 실패: ${error.message}` });
      }
    }
  };

  return {
    pictureUrl,
    onFileSelect,
    onSubmitUpdateUser,
  };
};
