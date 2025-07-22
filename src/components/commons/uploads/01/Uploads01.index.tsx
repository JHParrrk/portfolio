import {
  UploadButton,
  UploadFileHidden,
  UploadImage,
} from "./Uploads01.styles";
import { useUploadImage } from "@/src/components/commons/hooks/customs/useUploadImage";
import type { IUploads01Props } from "./Uploads01.types";

export default function Uploads01(props: IUploads01Props): JSX.Element {
  const { fileRef, onClickUpload, onChangeFile } = useUploadImage({
    onChangeFileUrls: props.onChangeFileUrls,
    index: props.index,
  });

  // fileUrl이 data:로 시작하면 미리보기, 아니면 서버 이미지
  const getImageSrc = (fileUrl: string) => {
    if (!fileUrl) return "";
    if (fileUrl.startsWith("data:")) return fileUrl;
    return `https://storage.googleapis.com/${fileUrl}`;
  };

  return (
    <>
      {props.fileUrl !== "" ? (
        <UploadImage onClick={onClickUpload} src={getImageSrc(props.fileUrl)} />
      ) : (
        <UploadButton onClick={onClickUpload}>
          <>+</>
          <>Upload</>
        </UploadButton>
      )}
      <UploadFileHidden
        type="file"
        ref={fileRef}
        onChange={onChangeFile}
        accept="image/*"
      />
    </>
  );
}
