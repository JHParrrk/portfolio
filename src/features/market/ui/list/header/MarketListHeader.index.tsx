import { MLH } from "./MarketListHeader.css";
import Searchbars01 from "@/shared/ui/searchbar/01/Searchbars01.index";

// 헤더 컴포넌트가 받을 props 타입을 정의합니다.
interface IMarketListHeaderProps {
  isSoldout: boolean;
  onClickToggle: (soldoutStatus: boolean) => () => void;
  onChangeSearchbar: (value: string) => void;
  keyword: string;
}

export default function MarketListHeader(props: IMarketListHeaderProps) {
  return (
    <div className={MLH.Header}>
      <div className={MLH.ToggleWrapper}>
        <button
          className={MLH.ToggleButton}
          style={{
            fontWeight: !props.isSoldout ? "600" : "500",
            backgroundColor: !props.isSoldout ? "#FFD600" : "transparent",
            color: !props.isSoldout ? "#000" : "#4F4F4F",
            border: !props.isSoldout ? "1px solid #FFD600" : "1px solid transparent",
          }}
          onClick={props.onClickToggle(false)}
        >
          판매중 상품
        </button>
        <button
          className={MLH.ToggleButton}
          style={{
            fontWeight: props.isSoldout ? "600" : "500",
            backgroundColor: props.isSoldout ? "#FFD600" : "transparent",
            color: props.isSoldout ? "#000" : "#4F4F4F",
            border: props.isSoldout ? "1px solid #FFD600" : "1px solid transparent",
          }}
          onClick={props.onClickToggle(true)}
        >
          판매된 상품
        </button>
      </div>

      <Searchbars01
        // 1. Searchbars01로부터 '이벤트 객체'를 받음
        onChangeSearchbar={(event) =>
          // 2. 'event.target.value'를 통해 '문자열'만 추출하여
          // 3. 부모(MarketList)에게 전달
          props.onChangeSearchbar(event.target.value)
        }
        keyword={props.keyword}
      />
    </div>
  );
}
