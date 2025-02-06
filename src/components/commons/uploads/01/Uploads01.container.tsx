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
  const [uploadFile] = useMutation(UPLOAD_FILE);

  const onClickUpload = (): void => {
    fileRef.current?.click();
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

      console.log("업로드01에서받는 URL", url);
      props.onChangeFileUrls(url, props.index);
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
