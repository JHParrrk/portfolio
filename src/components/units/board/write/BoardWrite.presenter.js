import { PF } from "./BoardWrite.styles.js";

export default function BoardWriteUI(props) {
  const { register, handleSubmit, errors, isValid, onSubmit } = props;
  return (
    <PF.Custombody>
      <PF.Wrapper>
        <PF.Title>게시글 등록</PF.Title>
        <form onSubmit={handleSubmit(onSubmit)}>
          <PF.WriterWrapper>
            <PF.InputWrapper>
              <PF.Label>작성자</PF.Label>
              <PF.Writer
                type="text"
                placeholder="이름을 적어주세요."
                {...register("writer", { required: "작성자를 입력해주세요." })}
              />
              <PF.Error>{errors.writer?.message}</PF.Error>
            </PF.InputWrapper>
            <PF.InputWrapper>
              <PF.Label>비밀번호</PF.Label>
              <PF.Password
                type="password"
                placeholder="비밀번호를 작성해주세요."
                {...register("password", {
                  required: "비밀번호를 입력해주세요.",
                })}
              />
              <PF.Error>{errors.password?.message}</PF.Error>
            </PF.InputWrapper>
          </PF.WriterWrapper>
          <PF.InputWrapper>
            <PF.Label>제목</PF.Label>
            <PF.Subject
              type="text"
              placeholder="제목을 작성해주세요."
              {...register("title", { required: "제목을 입력해주세요." })}
            />
            <PF.Error>{errors.title?.message}</PF.Error>
          </PF.InputWrapper>
          <PF.InputWrapper>
            <PF.Label>내용</PF.Label>
            <PF.Contents
              placeholder="내용을 작성해주세요."
              {...register("contents", { required: "내용을 입력해주세요." })}
            />
            <PF.Error>{errors.contents?.message}</PF.Error>
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
            <PF.SubmitButton
              type="submit"
              style={{ backgroundColor: isValid ? "yellow" : "grey" }}
              disabled={!isValid}
            >
              등록하기
            </PF.SubmitButton>
          </PF.ButtonWrapper>
        </form>
      </PF.Wrapper>
    </PF.Custombody>
  );
}
