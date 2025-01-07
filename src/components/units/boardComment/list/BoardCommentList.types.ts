import { MouseEvent } from "react"; // React의 MouseEvent 타입을 가져옵니다.
import { IQuery } from "../../../../commons/types/generated/types"; // 그래프QL 타입 정의를 가져옵니다.
import {
  SubmitHandler,
  UseFormHandleSubmit,
  UseFormRegister,
  FieldError,
} from "react-hook-form"; // react-hook-form의 타입 정의를 가져옵니다.

export interface IBoardCommentListUIProps {
  // UI 컴포넌트에 전달할 props 타입을 정의합니다.
  data?: Pick<IQuery, "fetchBoardComments">; // 댓글 목록 데이터, fetchBoardComments 필드를 선택합니다.
  onClickDelete: (event: MouseEvent<HTMLImageElement>) => void; // 삭제 아이콘 클릭 시 호출되는 함수
  handleSubmit: UseFormHandleSubmit<IFormInput>; // 폼 제출 핸들러
  onSubmit: SubmitHandler<IFormInput>; // 폼 제출 함수
  register: UseFormRegister<IFormInput>; // 폼 입력 필드 등록 함수
  errors: {
    // 폼 필드 오류를 정의합니다.
    contents?: FieldError; // 내용 필드 오류
    password?: FieldError; // 비밀번호 필드 오류
  };
  isEditing: string | null; // 현재 편집 중인 댓글의 ID
  handleChangeContent: (data: string) => void; // 댓글 내용 변경 핸들러
  handleSaveClick: () => void; // 저장 클릭 핸들러
  handleCancelClick: () => void; // 취소 클릭 핸들러
  handleEditClick: (id: string, contents: string) => void; // 수정 클릭 핸들러
  handleRateChange: (value: number) => void; // 별점 변경 핸들러
}

export interface IFormInput {
  // 폼 입력 데이터 타입을 정의합니다.
  contents: string; // 댓글 내용
  password: string; // 비밀번호
  rating: number; // 별점
}
