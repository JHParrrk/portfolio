import { MLH } from "./MarketListHeader.styles";
import Searchbars01 from "@/src/components/commons/searchbars/01/Searchbars01.index";

// 헤더 컴포넌트가 받을 props 타입을 정의합니다.
interface IMarketListHeaderProps {
  isSoldout: boolean;
  onClickToggle: (soldoutStatus: boolean) => () => void;
  onChangeSearchbar: (value: string) => void;
  keyword: string;
}

export default function MarketListHeader(props: IMarketListHeaderProps) {
  return (
    <MLH.Header>
      <MLH.ToggleWrapper>
        <MLH.ToggleButton
          isActive={!props.isSoldout}
          onClick={props.onClickToggle(false)}
        >
          판매중 상품
        </MLH.ToggleButton>
        <MLH.ToggleButton
          isActive={props.isSoldout}
          onClick={props.onClickToggle(true)}
        >
          판매된 상품
        </MLH.ToggleButton>
      </MLH.ToggleWrapper>

      <Searchbars01
        // 1. Searchbars01로부터 '이벤트 객체'를 받음
        onChangeSearchbar={(event) =>
          // 2. 'event.target.value'를 통해 '문자열'만 추출하여
          // 3. 부모(MarketList)에게 전달
          props.onChangeSearchbar(event.target.value)
        }
        keyword={props.keyword}
      />
    </MLH.Header>
  );
}
