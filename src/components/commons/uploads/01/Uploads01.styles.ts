import styled from "@emotion/styled";
import { Spin } from "antd";

export const ULD = {
  Wrapper: styled.div`
    position: relative;
    display: inline-block;
    margin-right: 24px;
  `,

  UploadImage: styled.img`
    width: 78px;
    height: 78px;
    cursor: pointer;
  `,

  UploadButton: styled.button`
    width: 78px;
    height: 78px;
    background-color: #bdbdbd;
    outline: none;
    border: none;
    cursor: pointer;
  `,

  UploadFileHidden: styled.input`
    display: none;
  `,

  DeleteButton: styled.button`
    position: absolute;
    top: 2px;
    right: 2px;
    background: rgba(0, 0, 0, 0.6);
    color: #fff;
    border: none;
    border-radius: 50%;
    width: 20px;
    height: 20px;
    font-size: 14px;
    cursor: pointer;
    line-height: 16px;
    text-align: center;
  `,
  SpinnerOverlay: styled(Spin)`
    && {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
    }
  `,
};
