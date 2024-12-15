import { PF } from "../../../styles/PostEditForm";

import { useState } from "react";

const PostEditForm = () => {
  const [writer, setWriter] = useState("");
  const [password, setPassword] = useState("");
  const [title, setTitle] = useState("");
  const [contents, setContents] = useState("");

  const [writerError, setWriterError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [titleError, setTitleError] = useState("");
  const [contentsError, setContentsError] = useState("");

  const onChangeWriter = (event) => {
    setWriter(event.target.value);
    if (event.target.value !== "") {
      setWriterError("");
    }
  };

  const onChangePassword = (event) => {
    setPassword(event.target.value);
    if (event.target.value !== "") {
      setPasswordError("");
    }
  };

  const onChangeTitle = (event) => {
    setTitle(event.target.value);
    if (event.target.value !== "") {
      setTitleError("");
    }
  };

  const onChangeContents = (event) => {
    setContents(event.target.value);
    if (event.target.value !== "") {
      setContentsError("");
    }
  };

  const onClickSubmit = () => {
    if (!writer) {
      setWriterError("작성자를 입력해주세요.");
    }
    if (!password) {
      setPasswordError("비밀번호를 입력해주세요.");
    }
    if (!title) {
      setTitleError("제목을 입력해주세요.");
    }
    if (!contents) {
      setContentsError("내용을 입력해주세요.");
    }
    if (writer && password && title && contents) {
      alert("게시글이 등록되었습니다.");
    }
  };
  return (
    <PF.Custombody>
      <PF.Wrapper>
        <PF.Title>게시글 등록</PF.Title>
        <PF.WriterWrapper>
          <PF.InputWrapper>
            <PF.Label>작성자</PF.Label>
            <PF.Writer
              type="text"
              placeholder="이름을 적어주세요."
              onChange={onChangeWriter}
            />
            <PF.Error>{writerError}</PF.Error>
          </PF.InputWrapper>
          <PF.InputWrapper>
            <PF.Label>비밀번호</PF.Label>
            <PF.Password
              type="password"
              placeholder="비밀번호를 작성해주세요."
              onChange={onChangePassword}
            />
            <PF.Error>{passwordError}</PF.Error>
          </PF.InputWrapper>
        </PF.WriterWrapper>
        <PF.InputWrapper>
          <PF.Label>제목</PF.Label>
          <PF.Subject
            type="text"
            placeholder="제목을 작성해주세요."
            onChange={onChangeTitle}
          />
          <PF.Error>{titleError}</PF.Error>
        </PF.InputWrapper>
        <PF.InputWrapper>
          <PF.Label>내용</PF.Label>
          <PF.Contents
            placeholder="내용을 작성해주세요."
            onChange={onChangeContents}
          />
          <PF.Error>{contentsError}</PF.Error>
        </PF.InputWrapper>
        <PF.InputWrapper>
          <PF.Label>주소</PF.Label>
          <PF.ZipcodeWrapper>
            <PF.Zipcode placeholder="07250" />
            <PF.SearchButton>우편번호 검색</PF.SearchButton>
          </PF.ZipcodeWrapper>
          <PF.Address />
          <PF.Address />
        </PF.InputWrapper>
        <PF.InputWrapper>
          <PF.Label>유튜브</PF.Label>
          <PF.Youtube placeholder="링크를 복사해주세요." />
        </PF.InputWrapper>
        <PF.ImageWrapper>
          <PF.Label>사진첨부</PF.Label>
          <PF.UploadButton>+</PF.UploadButton>
          <PF.UploadButton>+</PF.UploadButton>
          <PF.UploadButton>+</PF.UploadButton>
        </PF.ImageWrapper>
        <PF.OptionWrapper>
          <PF.Label>메인설정</PF.Label>
          <PF.RadioButton type="radio" id="youtube" name="radio-button" />
          <PF.RadioLabel htmlFor="youtube">유튜브</PF.RadioLabel>
          <PF.RadioButton type="radio" id="image" name="radio-button" />
          <PF.RadioLabel htmlFor="image">사진</PF.RadioLabel>
        </PF.OptionWrapper>
        <PF.ButtonWrapper>
          <PF.SubmitButton onClick={onClickSubmit}>등록하기</PF.SubmitButton>
        </PF.ButtonWrapper>
      </PF.Wrapper>
    </PF.Custombody>
  );
};

export default PostEditForm;
