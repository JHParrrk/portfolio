import { Tooltip } from "antd";
import { getDate } from "@/src/commons/libraries/utils/dateUtile";
import { IMarketDetailBodyProps } from "../middle/MarketDetailBodyMiddle.types";
import { MDBT } from "./MarketDetailBodyTop.styles";

export default function MarketDetailBodyTop(props: IMarketDetailBodyProps) {
  return (
    <MDBT.Header>
      <MDBT.AvatarWrapper>
        <MDBT.Avatar src="/images/avatar.png" />
        <MDBT.Info>
          <MDBT.Seller>{props.data?.fetchUseditem?.seller?.name}</MDBT.Seller>
          <MDBT.CreatedAt>
            {getDate(props.data?.fetchUseditem?.createdAt)}
          </MDBT.CreatedAt>
        </MDBT.Info>
      </MDBT.AvatarWrapper>
      <MDBT.IconWrapper>
        <MDBT.LinkIcon src="/images/board/detail/link.png" />
        <Tooltip
          placement="topRight"
          title={`${props.data?.fetchUseditem.useditemAddress?.address ?? ""} ${
            props.data?.fetchUseditem.useditemAddress?.addressDetail ?? ""
          }`}
        >
          <MDBT.LocationIcon src="/images/board/detail/location.png" />
        </Tooltip>
      </MDBT.IconWrapper>
    </MDBT.Header>
  );
}
