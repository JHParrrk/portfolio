import { useEffect } from "react";
import { IBoardWriteUIProps } from "./BoardWrite.types";
import { PF } from "./BoardWrite.styles";

export default function BoardWriteUI(props: IBoardWriteUIProps) {
  const {
    register,
    handleSubmit,
    errors,
    isValid,
    setValue,
    onClickSubmit,
    onClickUpdate,
    isEdit,
    data,
  } = props;

  useEffect(() => {
    if (data) {
      setValue("writer", data.fetchBoard?.writer);
      setValue("title", data.fetchBoard?.title);
      setValue("contents", data.fetchBoard?.contents);
    }
  }, [data, setValue]);

  return (
    <PF.Custombody>
      <PF.Wrapper>
        <PF.Title>{isEdit ? "게시글 수정" : "게시글 등록"}</PF.Title>
        <form onSubmit={handleSubmit(isEdit ? onClickUpdate : onClickSubmit)}>
          <PF.WriterWrapper>
            <PF.InputWrapper>
              <PF.Label>작성자</PF.Label>
              <PF.Writer
                type="text"
                placeholder="이름을 적어주세요."
                defaultValue={data?.fetchBoard.writer}
                readOnly={isEdit}
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
              defaultValue={data?.fetchBoard.title}
              {...register("title", { required: "제목을 입력해주세요." })}
            />
            <PF.Error>{errors.title?.message}</PF.Error>
          </PF.InputWrapper>
          <PF.InputWrapper>
            <PF.Label>내용</PF.Label>
            <PF.Contents
              placeholder="내용을 작성해주세요."
              defaultValue={data?.fetchBoard.contents}
              {...register("contents", { required: "내용을 입력해주세요." })}
            />
            <PF.Error>{errors.contents?.message}</PF.Error>
          </PF.InputWrapper>
          <PF.ButtonWrapper>
            <PF.SubmitButton type="submit" isActive={isEdit || isValid}>
              {isEdit ? "수정하기" : "등록하기"}
            </PF.SubmitButton>
          </PF.ButtonWrapper>
        </form>
      </PF.Wrapper>
    </PF.Custombody>
  );
}
