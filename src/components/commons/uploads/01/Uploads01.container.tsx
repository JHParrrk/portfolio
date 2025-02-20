import { useMutation } from "@apollo/client";
import { useRef } from "react";
import type { ChangeEvent } from "react";
import { checkValidationImage } from "./Uploads01.validation";
import Uploads01UI from "./Uploads01.presenter";
import type { IUploads01Props } from "./Uploads01.types";
import { UPLOAD_FILE } from "./Uploads01.queries";
import { Modal } from "antd";

export default function Uploads01(props: IUploads01Props): JSX.Element {
  const fileRef = useRef<HTMLInputElement>(null);
  // fileRef를 초기화하여 파일 입력 요소의 참조를 저장합니다.
  const [uploadFile] = useMutation(UPLOAD_FILE);

  const onClickUpload = (): void => {
    fileRef.current?.click();
    // 클릭 시, 클릭한 인풋 태그 정보를 fileRef에 할당합니다.
  };

  const onChangeFile = async (
    event: ChangeEvent<HTMLInputElement>
  ): Promise<void> => {
    const file = event.target.files?.[0];
    const isValid = checkValidationImage(file);
    if (!isValid) return;

    try {
      const result = await uploadFile({ variables: { file } });
      const url = result.data.uploadFile.url; // 서버에서 받은 이미지 URL

      // BoardWrite.tsx의 함수
      props.onChangeFileUrls(url, props.index);
      // onChangeFileUrls를 받을 수 있도록 타입 정의
      // BoardWrite.presenter에 import하고 설정
      // BoardWrite.presenter에서 onChangeFileUrls를 받음
      // 정의된 타입으로 전달합니다
    } catch (error) {
      if (error instanceof Error) Modal.error({ content: error.message });
    }
  };

  return (
    <Uploads01UI
      fileRef={fileRef}
      fileUrl={props.fileUrl}
      defaultFileUrl={props.defaultFileUrl}
      onClickUpload={onClickUpload}
      onChangeFile={onChangeFile}
    />
  );
}
