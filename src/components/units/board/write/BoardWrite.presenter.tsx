import { IBoardWriteUIProps } from "./BoardWrite.types";
import { PF } from "./BoardWrite.styles";
import Uploads01 from "../../../commons/uploads/01/Uploads01.container";
import { v4 as uuidv4 } from "uuid";

export default function BoardWriteUI(props: IBoardWriteUIProps) {
  const {
    register,
    formState: { errors, isValid },
    onClickSubmit,
    onClickUpdate,
    isEdit,
    isOpen,
    onChangeAddressDetail,
    onClickAddressSearch,
    onCompleteAddressSearch,
    onChangeFileUrls,
    fileUrls,
  } = props;

  return (
    <PF.Custombody>
      {isOpen && ( // 주소 검색 모달이 열려 있을 때 표시
        <PF.AddressModal open={true} onCancel={onClickAddressSearch}>
          <PF.AddressSearchInput onComplete={onCompleteAddressSearch} />
        </PF.AddressModal>
      )}
      <PF.Wrapper>
        <PF.Title>{isEdit ? "게시글 수정" : "게시글 등록"}</PF.Title>
        <form onSubmit={isEdit ? onClickUpdate : onClickSubmit}>
          <PF.WriterWrapper>
            <PF.InputWrapper>
              <PF.Label>작성자</PF.Label>
              <PF.Writer
                type="text"
                placeholder="이름을 적어주세요."
                readOnly={isEdit} // 수정 모드에서는 읽기 전용
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
              <PF.SearchButton onClick={onClickAddressSearch}>
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
            <PF.SubmitButton type="submit" isActive={isEdit || isValid}>
              {isEdit ? "수정하기" : "등록하기"}
            </PF.SubmitButton>
          </PF.ButtonWrapper>
        </form>
      </PF.Wrapper>
    </PF.Custombody>
  );
}
