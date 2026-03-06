import { FireFilled } from "@ant-design/icons";
import {
  FireFilledIcon,
  Searchbar,
  SearchbarInput,
} from "./Searchbars01.css";
import type { ISearchbars01Props } from "./Searchbars01.types";

export default function Searchbars01(props: ISearchbars01Props): JSX.Element {  
  return (
    <div className={Searchbar}>
      <FireFilled className={FireFilledIcon} />
      <input
        className={SearchbarInput}
        placeholder="검색어를 입력해 주세요."
        onChange={props.onChangeSearchbar}
        value={props.keyword}
      />
    </div>
  );
}
