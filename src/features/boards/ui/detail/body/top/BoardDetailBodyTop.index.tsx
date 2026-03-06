import { Tooltip } from 'antd';
import { getDate } from '@/shared/api/libraries/utils/dateUtile';
import { IBoardDetailBodyProps } from '../middle/BoardDetailBodyMiddle.types';
import { BDBT } from './BoardDetailBodyTop.css';

export default function BoardDetailBodyTop(props: IBoardDetailBodyProps) {
  return (
    <div className={BDBT.Header}>
      <div className={BDBT.AvatarWrapper}>
        <img className={BDBT.Avatar} src="/images/avatar.png" />
        <div className={BDBT.Info}>
          <div className={BDBT.Writer}>{props.data?.fetchBoard?.writer}</div>
          <div className={BDBT.CreatedAt}>
            {getDate(props.data?.fetchBoard?.createdAt)}
          </div>
        </div>
      </div>
      <div className={BDBT.IconWrapper}>
        <img className={BDBT.LinkIcon} src="/images/board/detail/link.png" />
        <Tooltip
          placement="topRight"
          title={`${props.data?.fetchBoard.boardAddress?.address ?? ''} ${
            props.data?.fetchBoard.boardAddress?.addressDetail ?? ''
          }`}
        >
          <img
            className={BDBT.LocationIcon}
            src="/images/board/detail/location.png"
          />
        </Tooltip>
      </div>
    </div>
  );
}
