import styled from "@emotion/styled";

export const PF = {
  // PostForm
  Custombody: styled.div`
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
  `,
  Wrapper: styled.div`
    width: 1200px;
    /* height: 1847px; */
    border: 1px solid black;
    margin: 100px;
    padding-top: 80px;
    padding-bottom: 100px;
    padding-left: 102px;
    padding-right: 102px;
    display: flex;
    flex-direction: column;
    align-items: center;
    border: none;
    box-shadow: 0px 0px 10px gray;
  `,
  Title: styled.div`
    font-family: Arial, Helvetica, sans-serif;
    font-size: 36px;
    font-weight: bold;
  `,
  WriterWrapper: styled.div`
    width: 100%;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    padding-top: 40px;
  `,
  Writer: styled.input`
    width: 486px;
    height: 52px;
    padding-left: 16px;
    border: 1px solid #bdbdbd;
  `,
  Password: styled.input`
    width: 486px;
    height: 52px;
    padding-left: 16px;
    border: 1px solid #bdbdbd;
  `,
  Label: styled.div`
    padding-bottom: 16px;
    font-size: 16px;
    font-weight: 500;
  `,
  InputWrapper: styled.div`
    padding-top: 40px;
  `,
  Subject: styled.input`
    width: 996px;
    height: 52px;
    padding-left: 16px;
    border: 1px solid #bdbdbd;
  `,
  Contents: styled.textarea`
    width: 996px;
    height: 480px;
    padding-left: 16px;
    padding: 14px;
    border: 1px solid #bdbdbd;
  `,
  ZipcodeWrapper: styled.div`
    display: flex;
    flex-direction: row;
  `,
  Zipcode: styled.input`
    width: 77px;
    height: 52px;
    padding-left: 16px;
    border: 1px solid #bdbdbd;
  `,
  SearchButton: styled.button`
    width: 124px;
    height: 52px;
    margin-left: 16px;
    background-color: black;
    cursor: pointer;
    color: white;
  `,
  Address: styled.input`
    width: 996px;
    height: 52px;
    margin-top: 16px;
    padding-left: 16px;
    border: 1px solid #bdbdbd;
  `,
  Youtube: styled.input`
    width: 996px;
    height: 52px;
    padding-left: 16px;
    border: 1px solid #bdbdbd;
  `,
  ImageWrapper: styled.div`
    width: 996px;
    padding-top: 40px;
  `,
  UploadButton: styled.button`
    width: 78px;
    height: 78px;
    background-color: #bdbdbd;
    margin-right: 24px;
    outline: none;
    border: none;
    cursor: pointer;
  `,
  OptionWrapper: styled.div`
    width: 996px;
    padding-top: 40px;
  `,
  RadioButton: styled.input`
    cursor: pointer;
  `,
  RadioLabel: styled.label`
    margin-left: 8px;
    margin-right: 20px;
    font-weight: 500;
    cursor: pointer;
  `,
  ButtonWrapper: styled.div`
    display: flex;
    flex-direction: row;
    justify-content: center;
    padding-top: 80px;
  `,
  CancelButton: styled.button`
    width: 179px;
    height: 52px;
    background-color: #bdbdbd;
    border: none;
    font-size: 16px;
    font-weight: 500;
    margin-left: 12px;
    margin-right: 12px;
    cursor: pointer;
  `,
  SubmitButton: styled.button`
    width: 179px;
    height: 52px;
    border: 1px solid rgba(0, 0, 0, 0.3);
    font-size: 16px;
    font-weight: 500;
    margin-left: 12px;
    margin-right: 12px;
    cursor: pointer;

    background-color: yellow;

    &:active {
      background-color: white; /* 클릭했을 때 배경색을 흰색으로 변경 */
      color: black; /* 텍스트 색상 변경 */
    }
  `,
  Error: styled.div`
    padding-top: 10px;
    font-size: 14px;
    color: red;
  `,
};
