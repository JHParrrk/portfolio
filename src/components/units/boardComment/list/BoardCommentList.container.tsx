import { useMutation, useQuery } from "@apollo/client"; // Apollo Client의 useMutation과 useQuery 훅을 가져옵니다.
import { useRouter } from "next/router"; // Next.js의 useRouter 훅을 가져옵니다.
import {
  IMutation,
  IMutationDeleteBoardCommentArgs,
  IMutationUpdateBoardCommentArgs,
  IQuery,
  IQueryFetchBoardCommentsArgs,
} from "../../../../commons/types/generated/types"; // GraphQL 타입 정의를 가져옵니다.
import BoardCommentListUI from "./BoardCommentList.presenter"; // UI 컴포넌트를 가져옵니다.
import {
  DELETE_BOARD_COMMENT,
  FETCH_BOARD_COMMENTS,
  UPDATE_BOARD_COMMENT,
} from "./BoardCommentList.queries"; // GraphQL 쿼리와 뮤테이션을 가져옵니다.
import { useForm, SubmitHandler } from "react-hook-form"; // react-hook-form 훅을 가져옵니다.
import { useState, MouseEvent } from "react"; // React의 useState와 MouseEvent 타입을 가져옵니다.
import { IFormInput } from "./BoardCommentList.types"; // 입력 폼 타입을 가져옵니다.

export default function BoardCommentList() {
  // BoardCommentList 컴포넌트를 정의합니다.
  const router = useRouter(); // Next.js 라우터를 초기화합니다.
  if (!router || typeof router.query.boardId !== "string") return <></>; // 라우터가 유효하지 않거나 boardId가 문자열이 아니면 빈 태그를 반환합니다.

  const [deleteBoardComment] = useMutation<
    Pick<IMutation, "deleteBoardComment">,
    IMutationDeleteBoardCommentArgs
  >(DELETE_BOARD_COMMENT); // 댓글 삭제를 위한 뮤테이션 훅을 초기화합니다.

  const [updateBoardComment] = useMutation<
    Pick<IMutation, "updateBoardComment">,
    IMutationUpdateBoardCommentArgs
  >(UPDATE_BOARD_COMMENT); // 댓글 수정을 위한 뮤테이션 훅을 초기화합니다.

  const { data } = useQuery<
    Pick<IQuery, "fetchBoardComments">,
    IQueryFetchBoardCommentsArgs
  >(FETCH_BOARD_COMMENTS, {
    variables: { boardId: router.query.boardId },
  }); // 댓글 목록을 가져오기 위한 쿼리 훅을 초기화하고, boardId를 변수로 전달합니다.

  const {
    register,
    handleSubmit,
    setValue,
    getValues,
    formState: { errors },
  } = useForm<IFormInput>(); // react-hook-form 훅을 초기화하고 필요한 메서드를 가져옵니다.

  const [isEditing, setIsEditing] = useState<string | null>(null); // 현재 편집 중인 댓글의 ID를 저장하는 상태를 초기화합니다.

  const validateInputs = () => {
    // 입력값을 검증하는 함수입니다.
    const values = getValues(); // 현재 폼 데이터를 가져옵니다.
    if (!values.contents) {
      alert("내용을 입력해주세요."); // 내용이 비어 있으면 경고 메시지를 표시합니다.
      return false;
    }
    if (!values.password) {
      alert("비밀번호를 입력해주세요."); // 비밀번호가 비어 있으면 경고 메시지를 표시합니다.
      return false;
    }
    return true;
  };

  const onSubmit: SubmitHandler<IFormInput> = async (formData) => {
    // 폼 제출 시 호출되는 함수입니다.
    if (!validateInputs()) {
      return; // 입력값 검증에 실패하면 함수를 종료합니다.
    }
    try {
      await updateBoardComment({
        variables: {
          updateBoardCommentInput: {
            contents: formData.contents,
            rating: formData.rating,
          },
          password: formData.password,
          boardCommentId: isEditing!,
        },
        refetchQueries: [
          {
            query: FETCH_BOARD_COMMENTS,
            variables: { boardId: router.query.boardId },
          },
        ],
      }); // 댓글을 업데이트하는 뮤테이션을 실행하고, 댓글 목록을 다시 가져옵니다.
      setIsEditing(null); // 수정 모드를 종료합니다.
    } catch (error) {
      if (error instanceof Error) alert(error.message); // 오류가 발생하면 경고 메시지를 표시합니다.
    }
  };

  const onClickDelete = async (event: MouseEvent<HTMLImageElement>) => {
    // 삭제 아이콘 클릭 시 호출되는 함수입니다.
    const password = prompt("비밀번호를 입력하세요."); // 비밀번호를 입력받습니다.
    try {
      if (!(event.target instanceof HTMLImageElement)) {
        alert("시스템에 문제가 있습니다."); // 클릭된 요소가 이미지가 아니면 경고 메시지를 표시합니다.
        return;
      }

      await deleteBoardComment({
        variables: {
          password,
          boardCommentId: event.target.id,
        },
        refetchQueries: [
          {
            query: FETCH_BOARD_COMMENTS,
            variables: { boardId: router.query.boardId },
          },
        ],
      }); // 댓글을 삭제하는 뮤테이션을 실행하고, 댓글 목록을 다시 가져옵니다.
    } catch (error) {
      if (error instanceof Error) alert(error.message); // 오류가 발생하면 경고 메시지를 표시합니다.
    }
  };

  const handleEditClick = (id: string, contents: string) => {
    // 수정 아이콘 클릭 시 호출되는 함수입니다.
    setIsEditing(id); // 편집 중인 댓글의 ID를 설정합니다.
    setValue("contents", contents); // 폼에 댓글 내용을 설정합니다.
    setValue("password", ""); // 폼에 비밀번호를 초기화합니다.
  };

  const handleCancelClick = () => {
    // 취소 아이콘 클릭 시 호출되는 함수입니다.
    setIsEditing(null); // 수정 모드를 종료합니다.
    setValue("contents", ""); // 폼 내용을 초기화합니다.
    setValue("password", ""); // 폼 비밀번호를 초기화합니다.
  };

  const handleChangeContent = (data: string) => {
    // 댓글 내용이 변경될 때 호출되는 함수입니다.
    setValue("contents", data); // 폼 내용을 업데이트합니다.
  };

  const handleSaveClick = async () => {
    // 저장 아이콘 클릭 시 호출되는 함수입니다.
    if (!validateInputs()) {
      return; // 입력값 검증에 실패하면 함수를 종료합니다.
    }
    await handleSubmit(onSubmit)(); // 폼을 제출합니다.
  };

  const handleRateChange = (value: number) => {
    setValue("rating", value);
  };

  const props = {
    data,
    onClickDelete,
    handleSubmit,
    onSubmit,
    register,
    errors,
    isEditing,
    handleEditClick,
    handleCancelClick,
    handleChangeContent,
    handleRateChange,
    handleSaveClick,
  }; // UI 컴포넌트에 전달할 props를 정의합니다.

  return <BoardCommentListUI {...props} />; // UI 컴포넌트를 렌더링합니다.
}
