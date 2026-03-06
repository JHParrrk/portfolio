import {
  UploadButton,
  UploadFileHidden,
  UploadImage,
  DeleteButton,
} from "./Uploads01.css";
import { useUploadImage } from "@/shared/hooks/customs/useUploadImage";
import type { IUploads01Props } from "./Uploads01.types";

export default function Uploads01(props: IUploads01Props): JSX.Element {        
  const { fileRef, onClickUpload, onChangeFile, onClickDelete, localFileUrl } = 
    useUploadImage({
      onFileSelect: props.onFileSelect,
      index: props.index,
    });

  const imageUrl = localFileUrl || props.fileUrl;

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
          <img className={UploadImage} onClick={onClickUpload} src={imageSrc} />
          <button className={DeleteButton} type="button" onClick={onClickDelete}>
            
          </button>
        </div>
      ) : (
        <button className={UploadButton} type="button" onClick={onClickUpload}>
          <>+</>
          <>Upload</>
        </button>
      )}
      <input
        className={UploadFileHidden}
        type="file"
        ref={fileRef}
        onChange={onChangeFile}
        accept="image/*"
      />
    </>
  );
}
