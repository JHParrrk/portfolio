import { IQuery } from "../../../../commons/types/generated/types";

export interface IBoardDetailUIProps {
  data?: Pick<IQuery, "fetchBoard">;
  // 여기서 data 속성에 ?를 추가하여 선택적 속성으로 만들었습니다.
  // 이로 인해 data가 undefined일 수도 있다는 것을 타입 시스템에 알리게 됩니다.
  onClickDelete: () => Promise<void>;
  onClickList: () => void;
  onClickEdit: () => void;
}
