import {
  FireFilledIcon,
  Searchbar,
  SearchbarInput,
} from "./Searchbars01.styles";
import type { ISearchbars01UIProps } from "./Searchbars01.types";

export default function Searchbars01UI(
  props: ISearchbars01UIProps
): JSX.Element {
  const { onChangeSearchbar } = props;
  return (
    <Searchbar>
      <FireFilledIcon />
      <SearchbarInput
        placeholder="검색어를 입력해 주세요."
        onChange={onChangeSearchbar}
      />
    </Searchbar>
  );
}
