import { useEffect, useState } from "react";
import { Modal } from "antd";
import { useMutationUpdateUser } from "@/shared/hooks/mutations/useMutationUpdateUser";
import { useMutationUploadFile } from "@/shared/hooks/mutations/useMutationUploadFile";
import { useQueryFetchUserLoggedIn } from "@/shared/hooks/queries/useQueryFetchUserLoggedIn";

export const useUpdateUser = () => {
  const { data: userData, refetch: refetchUser } = useQueryFetchUserLoggedIn();
  const { mutation: updateUser } = useMutationUpdateUser();
  const [uploadFile] = useMutationUploadFile();

  const [file, setFile] = useState<File | null>(null);
  const [isDeleted, setIsDeleted] = useState(false);

  // 로컬 미리보기 URL을 관리하는 상태
  const [localPreviewUrl, setLocalPreviewUrl] = useState<string | null>(null);

  // 🚨 userData가 로드되면 초기 사진 URL을 설정
  useEffect(() => {
    if (userData) {
      setLocalPreviewUrl(userData.fetchUserLoggedIn.picture ?? null);
    }
  }, [userData]);

  const onFileSelect = (selectedFile: File | undefined) => {
    setFile(selectedFile || null);
    if (selectedFile) {
      setIsDeleted(false);
      // 로컬 파일 미리보기 URL 생성
      const reader = new FileReader();
      reader.onload = (e) => setLocalPreviewUrl(e.target?.result as string);
      reader.readAsDataURL(selectedFile);
    } else {
      setIsDeleted(true);
      setLocalPreviewUrl("/images/avatar.png"); // 미리보기 URL을 기본 이미지로 변경
    }
  };

  const onSubmitUpdateUser = async () => {
    if (!file && !isDeleted) {
      Modal.warning({ content: "변경할 프로필 사진을 선택해 주세요." });
      return;
    }

    try {
      let newPictureUrl = userData?.fetchUserLoggedIn.picture ?? "";

      if (file) {
        const uploadResult = await uploadFile({ variables: { file } });
        newPictureUrl = uploadResult.data?.uploadFile.url ?? "";
        if (!newPictureUrl) {
          throw new Error("파일 업로드에 실패했습니다.");
        }
      } else if (isDeleted) {
        newPictureUrl = ""; // 서버에서 null로 처리하도록 빈 문자열 전송
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
      setIsDeleted(false);
    } catch (error) {
      if (error instanceof Error) {
        Modal.error({ content: `프로필 사진 변경 실패: ${error.message}` });
      }
    }
  };

  // 최종적으로 반환할 URL (로컬 미리보기 -> 서버 URL -> 기본 이미지 순)
  const finalPictureUrl = isDeleted
    ? "/images/avatar.png"
    : localPreviewUrl ||
      userData?.fetchUserLoggedIn.picture ||
      "/images/avatar.png";

  return {
    pictureUrl: finalPictureUrl,
    onFileSelect,
    onSubmitUpdateUser,
  };
};
