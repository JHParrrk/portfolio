import { useBoardLike } from "../../../../../commons/hooks/customs/useBoardLike";
import { useQueryIdChecker } from "../../../../../commons/hooks/customs/useQueryIdChecker";
import { BDBM } from "./BoardDetailBodyMiddle.styles";
import { IBoardDetailBodyProps } from "./BoardDetailBodyMiddle.types";

export default function BoardDetailBodyMiddle(props: IBoardDetailBodyProps) {
  const { id: boardId } = useQueryIdChecker("boardId");
  const { onClickLike, onClickDislike } = useBoardLike({
    boardId,
  });

  console.log(
    "BoardDetailBodyMiddle: fetchBoard data:",
    props.data?.fetchBoard
  );
  console.log(
    "BoardDetailBodyMiddle: fetchBoard title:",
    props.data?.fetchBoard?.title
  );
  console.log(
    "BoardDetailBodyMiddle: fetchBoard images:",
    props.data?.fetchBoard?.images
  );
  console.log(
    "BoardDetailBodyMiddle: fetchBoard contents:",
    props.data?.fetchBoard?.contents
  );
  console.log(
    "BoardDetailBodyMiddle: fetchBoard writer:",
    props.data?.fetchBoard?.writer
  );
  console.log(
    "BoardDetailBodyMiddle: fetchBoard createdAt:",
    props.data?.fetchBoard?.createdAt
  );
  console.log(
    "BoardDetailBodyMiddle: fetchBoard updatedAt:",
    props.data?.fetchBoard?.updatedAt
  );

  return (
    <BDBM.Body>
      <BDBM.Title>{props.data?.fetchBoard?.title}</BDBM.Title>
      <BDBM.ImageWrapper>
        {props.data?.fetchBoard.images
          ?.filter((el: string) => el)
          .map((el: string) => (
            <BDBM.Image key={el} src={`http://storage.googleapis.com/${el}`} />
          ))}
      </BDBM.ImageWrapper>
      <BDBM.Contents
        dangerouslySetInnerHTML={{
          __html: props.data?.fetchBoard?.contents || "",
        }}
      />
      {/* 리액트퀼 태그까지 출력하는거 수정 */}
      {props.data?.fetchBoard.youtubeUrl && (
        <BDBM.Youtube
          url={props.data?.fetchBoard.youtubeUrl}
          width="486px"
          height="240px"
        />
      )}
      <BDBM.LikeWrapper>
        <BDBM.IconWrapper>
          <BDBM.LikeIcon onClick={onClickLike} />
          <BDBM.LikeCount>{props.data?.fetchBoard.likeCount}</BDBM.LikeCount>
        </BDBM.IconWrapper>
        <BDBM.IconWrapper>
          <BDBM.DislikeIcon onClick={onClickDislike} />
          <BDBM.DislikeCount>
            {props.data?.fetchBoard.dislikeCount}
          </BDBM.DislikeCount>
        </BDBM.IconWrapper>
      </BDBM.LikeWrapper>
    </BDBM.Body>
  );
}
