import { Tooltip } from "antd";
import { getDate } from "../../../../../../commons/libraries/utils";
import { IBoardDetailBodyProps } from "../middle/BoardDetailBodyMiddle.types";
import { BDBT } from "./BoardDetailBodyTop.styles";

export default function BoardDetailBodyTop(props: IBoardDetailBodyProps) {
  return (
    <BDBT.Header>
      <BDBT.AvatarWrapper>
        <BDBT.Avatar src="/images/avatar.png" />
        <BDBT.Info>
          <BDBT.Writer>{props.data?.fetchBoard?.writer}</BDBT.Writer>
          <BDBT.CreatedAt>
            {getDate(props.data?.fetchBoard?.createdAt)}
          </BDBT.CreatedAt>
        </BDBT.Info>
      </BDBT.AvatarWrapper>
      <BDBT.IconWrapper>
        <BDBT.LinkIcon src="/images/board/detail/link.png" />
        <Tooltip
          placement="topRight"
          title={`${props.data?.fetchBoard.boardAddress?.address ?? ""} ${
            props.data?.fetchBoard.boardAddress?.addressDetail ?? ""
          }`}
        >
          <BDBT.LocationIcon src="/images/board/detail/location.png" />
        </Tooltip>
      </BDBT.IconWrapper>
    </BDBT.Header>
  );
}
