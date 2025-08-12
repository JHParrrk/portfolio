import {
  FireFilledIcon,
  Searchbar,
  SearchbarInput,
} from "./Searchbars01.styles";
import type { ISearchbars01Props } from "./Searchbars01.types";

export default function Searchbars01(props: ISearchbars01Props): JSX.Element {
  return (
    <Searchbar>
      <FireFilledIcon />
      <SearchbarInput
        placeholder="검색어를 입력해 주세요."
        onChange={props.onChangeSearchbar}
        value={props.keyword}
      />
    </Searchbar>
  );
}
