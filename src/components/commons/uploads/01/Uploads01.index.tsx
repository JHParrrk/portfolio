import {
  UploadButton,
  UploadFileHidden,
  UploadImage,
  DeleteButton,
} from "./Uploads01.styles";
import { useUploadImage } from "@/src/components/commons/hooks/customs/useUploadImage";
import type { IUploads01Props } from "./Uploads01.types";

export default function Uploads01(props: IUploads01Props): JSX.Element {
  const { fileRef, onClickUpload, onChangeFile, onClickDelete, localFileUrl } =
    useUploadImage({
      onFileSelect: props.onFileSelect,
      index: props.index,
      setValue: props.setValue,
    });
  // UpLoads01로 온 onFileSelect함수를 useUploadImage로 전달 index도

  // 로컬에 미리보기 Data URL이 있으면 그것을, 없으면 부모로부터 받은 URL을 사용
  const imageUrl = localFileUrl || props.fileUrl;
  const imageSrc = imageUrl.startsWith("data:")
    ? imageUrl
    : `https://storage.googleapis.com/${imageUrl}`;

  return (
    <>
      {imageUrl !== "" ? (
        <div style={{ position: "relative" }}>
          <UploadImage onClick={onClickUpload} src={imageSrc} />
          <DeleteButton type="button" onClick={onClickDelete}>
            ×
          </DeleteButton>
        </div>
      ) : (
        <UploadButton type="button" onClick={onClickUpload}>
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
