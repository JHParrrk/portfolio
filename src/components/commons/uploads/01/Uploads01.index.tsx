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
    });
  // UpLoads01로 온 onFileSelect함수를 useUploadImage로 전달 index도

  // 로컬 미리보기 URL이 있으면 그것을 사용
  // 그렇지 않으면 부모로부터 받은 URL을 사용
  const imageUrl = localFileUrl || props.fileUrl;

  // 💡 수정된 로직: 기본 이미지 경로를 조건에 추가합니다.
  const isDefaultImage = imageUrl === "/images/avatar.png";
  const imageSrc = isDefaultImage
    ? imageUrl
    : imageUrl.startsWith("data:")
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
