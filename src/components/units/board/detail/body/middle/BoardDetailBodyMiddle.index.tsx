import { useBoardLike } from "../../../../../commons/hooks/customs/useBoardLike";
import { useQueryIdChecker } from "../../../../../commons/hooks/customs/useQueryIdChecker";
import { BDBM } from "./BoardDetailBodyMiddle.styles";
import { IBoardDetailBodyProps } from "./BoardDetailBodyMiddle.types";

export default function BoardDetailBodyMiddle(props: IBoardDetailBodyProps) {
  const { id: boardId } = useQueryIdChecker("boardId");
  const { onClickLike, onClickDislike } = useBoardLike({
    boardId,
  });
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
      <BDBM.Contents>{props.data?.fetchBoard?.contents}</BDBM.Contents>
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
