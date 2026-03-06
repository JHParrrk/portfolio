import { useBoardLike } from '@/shared/hooks/customs/useBoardLike';
import { useQueryIdChecker } from '@/shared/hooks/customs/useQueryIdChecker';
import { BDBM } from './BoardDetailBodyMiddle.css';
import { IBoardDetailBodyProps } from './BoardDetailBodyMiddle.types';
import { LikeOutlined, DislikeOutlined } from '@ant-design/icons';
import ReactPlayer from 'react-player';

export default function BoardDetailBodyMiddle(props: IBoardDetailBodyProps) {
  const { id: boardId } = useQueryIdChecker('boardId');
  const { onClickLike, onClickDislike } = useBoardLike({
    boardId,
  });

  return (
    <div className={BDBM.Body}>
      <h1 className={BDBM.Title}>{props.data?.fetchBoard?.title}</h1>
      <div className={BDBM.ImageWrapper}>
        {props.data?.fetchBoard.images
          ?.filter((el: string) => el)
          .map((el: string) => (
            <img
              className={BDBM.Image}
              key={el}
              src={`http://storage.googleapis.com/${el}`}
            />
          ))}
      </div>
      <div
        className={BDBM.Contents}
        dangerouslySetInnerHTML={{
          __html: props.data?.fetchBoard?.contents || '',
        }}
      />
      {/* 리액트퀼 태그까지 출력하는거 수정 */}
      {props.data?.fetchBoard.youtubeUrl && (
        <ReactPlayer
          className={BDBM.Youtube}
          url={props.data?.fetchBoard.youtubeUrl}
          width="486px"
          height="240px"
        />
      )}
      <div className={BDBM.LikeWrapper}>
        <div className={BDBM.IconWrapper}>
          <LikeOutlined className={BDBM.LikeIcon} onClick={onClickLike} />
          <div className={BDBM.LikeCount}>
            {props.data?.fetchBoard.likeCount}
          </div>
        </div>
        <div className={BDBM.IconWrapper}>
          <DislikeOutlined
            className={BDBM.DislikeIcon}
            onClick={onClickDislike}
          />
          <div className={BDBM.DislikeCount}>
            {props.data?.fetchBoard.dislikeCount}
          </div>
        </div>
      </div>
    </div>
  );
}
