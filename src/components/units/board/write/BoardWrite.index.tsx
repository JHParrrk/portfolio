import { v4 as uuidv4 } from "uuid";
import { PF } from "./BoardWrite.styles";
import Uploads01 from "../../../commons/uploads/01/Uploads01.container";
import { useBoardWrite } from "@/src/components/commons/hooks/customs/useBoardWrite";
import { IQuery } from "@/src/commons/types/generated/types";

interface IBoardWriteProps {
  isEdit: boolean;
  data?: Pick<IQuery, "fetchBoard">;
}

export default function BoardWrite(props: IBoardWriteProps) {
  const {
    // 폼 관련
    register,
    handleSubmit,
    errors,
    isValid,

    // 상태 관련
    isOpen,
    fileUrls,

    // 이벤트 핸들러
    onSubmit,
    onUpdate,
    onChangeAddressDetail,
    onCompleteAddressSearch,
    onChangeFileUrls,
    toggleModal,
  } = useBoardWrite({ data: props.data });

  return (
    <PF.CustomBody>
      {isOpen && (
        // onCancel에 toggleModal 연결 – 모달 종료 시 동일 상태 변경
        <PF.AddressModal open={isOpen} onCancel={toggleModal}>
          <PF.AddressSearchInput onComplete={onCompleteAddressSearch} />
        </PF.AddressModal>
      )}
      <PF.Wrapper>
        <PF.Title>{props.isEdit ? "게시글 수정" : "게시글 등록"}</PF.Title>
        <form
          onSubmit={
            props.isEdit ? handleSubmit(onUpdate) : handleSubmit(onSubmit)
          }
        >
          <PF.WriterWrapper>
            <PF.InputWrapper>
              <PF.Label>작성자</PF.Label>
              <PF.Writer
                type="text"
                placeholder="이름을 적어주세요."
                readOnly={props.isEdit}
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
              <PF.Zipcode
                placeholder="07250"
                readOnly
                {...register("zipcode", {
                  required: "우편번호를 입력해주세요.",
                })}
              />
              <PF.SearchButton onClick={toggleModal}>
                우편번호 검색
              </PF.SearchButton>
            </PF.ZipcodeWrapper>
            <PF.Address
              readOnly
              {...register("address", { required: "주소를 입력해주세요." })}
            />
            <PF.Address
              {...register("addressDetail")}
              onChange={onChangeAddressDetail}
            />
          </PF.InputWrapper>

          <PF.InputWrapper>
            <PF.Label>유튜브</PF.Label>
            <PF.Youtube
              placeholder="링크를 복사해주세요."
              {...register("youtubeUrl", { required: "링크를 복사해주세요." })}
            />
          </PF.InputWrapper>

          <PF.ImageWrapper>
            <PF.Label>사진첨부</PF.Label>
            <PF.ImageBox>
              {fileUrls.map((el, index) => (
                <Uploads01
                  key={uuidv4()}
                  index={index}
                  fileUrl={el}
                  onChangeFileUrls={onChangeFileUrls}
                />
              ))}
            </PF.ImageBox>
          </PF.ImageWrapper>

          <PF.OptionWrapper>
            <PF.Label>메인설정</PF.Label>
            <PF.RadioButton type="radio" id="youtube" name="radio-button" />
            <PF.RadioLabel htmlFor="youtube">유튜브</PF.RadioLabel>
            <PF.RadioButton type="radio" id="image" name="radio-button" />
            <PF.RadioLabel htmlFor="image">사진</PF.RadioLabel>
          </PF.OptionWrapper>

          <PF.ButtonWrapper>
            <PF.SubmitButton type="submit" isActive={props.isEdit || isValid}>
              {props.isEdit ? "수정하기" : "등록하기"}
            </PF.SubmitButton>
          </PF.ButtonWrapper>
        </form>
      </PF.Wrapper>
    </PF.CustomBody>
  );
}
