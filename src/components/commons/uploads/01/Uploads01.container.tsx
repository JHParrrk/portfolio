import type { IUploads01Props } from "./Uploads01.types";
import { ULD } from "./Uploads01.styles";
import { useUploadImage } from "@/src/components/commons/hooks/customs/useUploadImage";
import { ChangeEvent, useState } from "react";

export default function Uploads01(props: IUploads01Props): JSX.Element {
  const [isUploading, setIsUploading] = useState(false);

  const { fileRef, onClickUpload, onChangeFile } = useUploadImage({
    onChangeFileUrls: (url, index) => {
      props.onChangeFileUrls(url, index);
      setIsUploading(false); // 업로드 끝난 후 로딩 종료
    },
    index: props.index,
  });

  // 업로드 시작 전에 로딩 켜기
  const handleChangeFile = (e: ChangeEvent<HTMLInputElement>) => {
    setIsUploading(true);
    onChangeFile(e); // 기존 훅 함수 호출
  };

  // fileUrl이 data:로 시작하면 미리보기, 아니면 서버 이미지
  const getImageSrc = (fileUrl: string) => {
    if (!fileUrl) return "";
    if (fileUrl.startsWith("data:")) return fileUrl;
    return `https://storage.googleapis.com/${fileUrl}`;
  };

  return (
    <ULD.Wrapper>
      {props.fileUrl !== "" ? (
        <ULD.UploadImage
          onClick={onClickUpload}
          src={getImageSrc(props.fileUrl)}
        />
      ) : (
        <ULD.UploadButton type="button" onClick={onClickUpload}>
          + Upload
        </ULD.UploadButton>
      )}

      {isUploading && <ULD.SpinnerOverlay size="large" />}

      <ULD.UploadFileHidden
        type="file"
        accept="image/*"
        ref={fileRef}
        onChange={handleChangeFile}
      />
    </ULD.Wrapper>
  );
}

// import type { IUploads01Props } from "./Uploads01.types";
// import { ULD } from "./Uploads01.styles";
// import { useUploadImage } from "@/src/components/commons/hooks/customs/useUploadImage";
// import { ChangeEvent, useState } from "react";

// export default function Uploads01(props: IUploads01Props): JSX.Element {
//   const [isUploading, setIsUploading] = useState(false);

//   const { fileRef, onClickUpload, onChangeFile } = useUploadImage({
//     onChangeFileUrls: async (url, index) => {
//       props.onChangeFileUrls(url, index);
//       setIsUploading(false); // 업로드 끝난 후 로딩 종료
//     },
//     index: props.index,
//   });

//   // 업로드 시작 전에 로딩 켜기
//   const handleChangeFile = (e: ChangeEvent<HTMLInputElement>) => {
//     setIsUploading(true);
//     onChangeFile(e); // 기존 훅 함수 호출
//   };

//   return (
//     <ULD.Wrapper>
//       {props.fileUrl !== "" ? (
//         <ULD.UploadImage
//           onClick={onClickUpload}
//           src={`https://storage.googleapis.com/${props.fileUrl}`}
//         />
//       ) : (
//         <ULD.UploadButton type="button" onClick={onClickUpload}>
//           + Upload
//         </ULD.UploadButton>
//       )}

//       {isUploading && <ULD.SpinnerOverlay size="large" />}

//       <ULD.UploadFileHidden
//         type="file"
//         accept="image/*"
//         ref={fileRef}
//         onChange={handleChangeFile}
//       />
//     </ULD.Wrapper>
//   );
// }
