import { gql, useMutation } from "@apollo/client";
import {
  IMutation,
  IMutationDeleteBoardArgs,
} from "@/src/commons/types/generated/types";
import { FETCH_BOARDS } from "@/src/components/commons/hooks/queries/useQueryFetchBoards";

export const DELETE_BOARD = gql`
  mutation deleteBoard($boardId: ID!) {
    deleteBoard(boardId: $boardId)
  }
`;

export const useMutationDeleteBoard = () => {
  const [deleteBoard] = useMutation<
    Pick<IMutation, "deleteBoard">,
    IMutationDeleteBoardArgs
  >(DELETE_BOARD);

  return { deleteBoard };
};

// 당장을 쓸모 없음 상세페이지에서 삭제하고 목록으로 움직여서 새로고침되기때문
// export const useMutationDeleteBoard = () => {
//   const [deleteBoard] = useMutation<
//     Pick<IMutation, "deleteBoard">, // 뮤테이션 결과의 타입 지정 (deleteBoard 필드를 포함)
//     IMutationDeleteBoardArgs // 뮤테이션 변수의 타입 지정 (boardId를 포함)
//   >(DELETE_BOARD, {
//     // ⭐ 여기에 캐시 업데이트 로직을 추가합니다. ⭐
//     // update 함수는 DELETE_BOARD 뮤테이션이 성공적으로 완료된 후 호출됩니다.
//     // cache: Apollo Client 캐시 객체
//     // data: 뮤테이션 성공 시 서버로부터 받은 응답 데이터
//     // variables: 뮤테이션을 호출할 때 전달한 변수들 (여기서는 boardId)
//     update(cache, { data }, { variables }) {
//       // data.deleteBoard는 서버에서 삭제된 게시글의 ID를 반환한다고 가정합니다.
//       const deletedBoardId = data?.deleteBoard;

//       // 만약 응답에서 삭제된 게시글 ID를 찾을 수 없다면, variables에서 가져올 수도 있습니다.
//       // const deletedBoardId = data?.deleteBoard || variables?.boardId;

//       if (!deletedBoardId) {
//         console.warn(
//           "삭제된 게시글 ID를 응답에서 찾을 수 없습니다. 캐시 업데이트가 불완전할 수 있습니다."
//         );
//         return;
//       }

//       // 1. 캐시에서 'FETCH_BOARDS' 쿼리의 현재 데이터를 읽어옵니다.
//       //    readQuery는 캐시에 있는 특정 쿼리의 데이터를 가져올 때 사용합니다.
//       //    만약 FETCH_BOARDS 쿼리에 페이지, 검색어 등의 변수가 있다면,
//       //    readQuery에도 해당 변수들을 정확히 일치시켜 전달해야 합니다.
//       //    예: const existingBoardsData = cache.readQuery({ query: FETCH_BOARDS, variables: { page: 1, search: "" } });
//       const existingBoardsData: any = cache.readQuery({
//         query: FETCH_BOARDS,
//         // 만약 FETCH_BOARDS 쿼리에 변수가 필요하다면, 여기에 추가해주세요.
//         // 예: variables: { page: 1, search: "" }
//       });

//       // 2. 만약 캐시에 게시글 목록 데이터가 있다면 (즉, fetchBoards가 존재한다면)
//       if (existingBoardsData && existingBoardsData.fetchBoards) {
//         // 3. 삭제된 게시글을 제외한 새로운 목록을 생성합니다.
//         //    게시글 객체의 ID 필드 이름이 '_id'인지 확인하세요.
//         const newBoards = existingBoardsData.fetchBoards.filter(
//           (board: { _id: string }) => board._id !== deletedBoardId
//         );

//         // 4. 캐시를 새로운 목록으로 다시 씁니다.
//         //    writeQuery는 캐시를 업데이트하거나 새로 쓸 때 사용합니다.
//         cache.writeQuery({
//           query: FETCH_BOARDS, // 업데이트할 대상 쿼리 (읽었던 쿼리와 동일해야 합니다.)
//           data: {
//             fetchBoards: newBoards, // 업데이트된 데이터
//           },
//           // readQuery와 동일하게, 쿼리에 변수가 있다면 여기에 추가해야 합니다.
//           // 예: variables: { page: 1, search: "" }
//         });
//       }
//     },
//   });

//   return { deleteBoard };
// };
