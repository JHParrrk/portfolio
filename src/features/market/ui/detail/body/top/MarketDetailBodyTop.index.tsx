import { Tooltip } from 'antd';
import { getDate } from '@/shared/api/libraries/utils/dateUtile';
import { IMarketDetailBodyProps } from '../middle/MarketDetailBodyMiddle.types';
import { MDBT } from './MarketDetailBodyTop.css';

export default function MarketDetailBodyTop(props: IMarketDetailBodyProps) {
  return (
    <div className={MDBT.Header}>
      <div className={MDBT.AvatarWrapper}>
        <img className={MDBT.Avatar} src="/images/avatar.png" />
        <div className={MDBT.Info}>
          <div className={MDBT.Seller}>
            {props.data?.fetchUseditem?.seller?.name}
          </div>
          <div className={MDBT.CreatedAt}>
            {getDate(props.data?.fetchUseditem?.createdAt)}
          </div>
        </div>
      </div>
      <div className={MDBT.IconWrapper}>
        <img className={MDBT.LinkIcon} src="/images/board/detail/link.png" />
        <Tooltip
          placement="topRight"
          title={`${props.data?.fetchUseditem.useditemAddress?.address ?? ''} ${
            props.data?.fetchUseditem.useditemAddress?.addressDetail ?? ''
          }`}
        >
          <img
            className={MDBT.LocationIcon}
            src="/images/board/detail/location.png"
          />
        </Tooltip>
      </div>
    </div>
  );
}
