import {
  UploadButton,
  UploadFileHidden,
  UploadImage,
} from "./Uploads01.styles";
import type { IUploads01UIProps } from "./Uploads01.types";

export default function Uploads01UI(props: IUploads01UIProps): JSX.Element {
  return (
    <>
      {/* fileUrls 배열에서 해당 인덱스 위치에 값이 있다면 이미지를 보여주고
      없다면 추가 버튼을 보여줍니다. */}
      {props.fileUrl !== "" ? (
        <UploadImage
          onClick={props.onClickUpload}
          // useRef를 통해 연결된 onClickUpload 함수
          src={`https://storage.googleapis.com/${props.fileUrl}`}
        />
      ) : (
        <UploadButton type="button" onClick={props.onClickUpload}>
          {/* useRef를 통해 연결된 onClickUpload 함수 */}
          <>+</>
          <>Upload</>
        </UploadButton>
      )}
      <UploadFileHidden
        type="file"
        ref={props.fileRef}
        // fileRef와 연결하여 실질적인 기능을 수행하는 인풋 태그
        onChange={props.onChangeFile}
      />
    </>
  );
}
