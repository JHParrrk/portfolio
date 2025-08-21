// C:\portfolio\firstapp\src\components\units\board\write\BoardWrite.index.tsx
import dynamic from "next/dynamic";
import { Controller } from "react-hook-form";
import { PF } from "./BoardWrite.styles";
import { useBoardWrite } from "@/src/components/commons/hooks/customs/useBoardWrite";
import { IBoardWriteProps } from "./BoardWrite.types";
import Uploads01 from "@/src/components/commons/uploads/01/Uploads01.index";
import { useRecoilState } from "recoil";
import { accessTokenState } from "@/src/commons/stores";

const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });
import "react-quill/dist/quill.snow.css";

export default function BoardWrite(props: IBoardWriteProps): JSX.Element {
  const {
    register,
    handleSubmit,
    control,
    errors,
    isValid,
    isOpen,
    isChanged,
    fileUrls,
    onSubmit,
    onUpdate,
    onChangeAddressDetail,
    onCompleteAddressSearch,
    onFileSelect,
    toggleModal,
  } = useBoardWrite({ data: props.data });

  // 쓸일이 없음
  const [accessToken] = useRecoilState(accessTokenState);

  return (
    <PF.CustomBody>
      {isOpen && (
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
                {...register("writer")}
              />
              <PF.Error>{errors.writer?.message}</PF.Error>
            </PF.InputWrapper>
            <PF.InputWrapper>
              <PF.Label>비밀번호</PF.Label>
              <PF.Password
                type="password"
                placeholder="비밀번호를 작성해주세요."
                {...register("password")}
              />
              <PF.Error>{errors.password?.message}</PF.Error>
            </PF.InputWrapper>
          </PF.WriterWrapper>
          <PF.InputWrapper>
            <PF.Label>제목</PF.Label>
            <PF.Subject
              type="text"
              placeholder="제목을 작성해주세요."
              {...register("title")}
            />
            <PF.Error>{errors.title?.message}</PF.Error>
          </PF.InputWrapper>

          <PF.InputWrapper>
            <PF.Label>내용</PF.Label>
            <Controller
              name="contents"
              control={control}
              render={({ field }) => (
                <>
                  <ReactQuill
                    {...field}
                    theme="snow"
                    placeholder="내용을 작성해주세요."
                    style={{ height: "300px", marginBottom: "40px" }}
                  />
                  <PF.Error>{errors.contents?.message}</PF.Error>
                </>
              )}
            />
          </PF.InputWrapper>

          <PF.InputWrapper>
            <PF.Label>주소</PF.Label>
            <PF.ZipcodeWrapper>
              <PF.Zipcode
                placeholder="07250"
                readOnly
                {...register("zipcode")}
              />
              <PF.SearchButton onClick={toggleModal} type="button">
                우편번호 검색
              </PF.SearchButton>
            </PF.ZipcodeWrapper>
            <PF.Address readOnly {...register("address")} />
            <PF.Address
              {...register("addressDetail")}
              onChange={onChangeAddressDetail}
            />
            <PF.Error>{errors.address?.message}</PF.Error>
          </PF.InputWrapper>

          <PF.InputWrapper>
            <PF.Label>유튜브</PF.Label>
            <PF.Youtube
              placeholder="링크를 복사해주세요."
              {...register("youtubeUrl")}
            />
            <PF.Error>{errors.youtubeUrl?.message}</PF.Error>
          </PF.InputWrapper>

          <PF.ImageWrapper>
            <PF.Label>사진첨부</PF.Label>
            <PF.ImageBox>
              {fileUrls.map((el, index) => (
                <Uploads01
                  key={el || index}
                  index={index}
                  fileUrl={el}
                  // 만약 fileUrl이 있다면(수정할때) 이걸로 스토리지에 저장되어있는 사진 보여줌
                  onFileSelect={onFileSelect}
                  showDeleteButton={true}
                  // 앞은 Uploads01에서 사용할 이름 뒤는 useBoardWrite훅에서 정의된 실제 함수 이름
                />
              ))}
            </PF.ImageBox>
          </PF.ImageWrapper>

          <PF.OptionWrapper>
            <PF.Label>메인설정</PF.Label>
            <PF.RadioButton
              type="radio"
              id="youtube"
              value="youtube"
              // {...register("mainSetting")}
            />
            <PF.RadioLabel htmlFor="youtube">유튜브</PF.RadioLabel>
            <PF.RadioButton
              type="radio"
              id="image"
              value="image"
              // {...register("mainSetting")}
            />
            <PF.RadioLabel htmlFor="image">사진</PF.RadioLabel>
          </PF.OptionWrapper>

          <PF.ButtonWrapper>
            <PF.SubmitButton
              type="submit"
              isActive={props.isEdit ? isChanged : isValid}
              disabled={props.isEdit ? !isChanged : !isValid}
            >
              {props.isEdit ? "수정하기" : "등록하기"}
            </PF.SubmitButton>
          </PF.ButtonWrapper>
        </form>
      </PF.Wrapper>
    </PF.CustomBody>
  );
}
