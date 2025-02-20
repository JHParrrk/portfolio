import type { ChangeEvent } from "react";
import Searchbars01UI from "./Searchbars01.presenter";
import type { ISearchbars01Props } from "./Searchbars01.types";
import _ from "lodash";

export const highLightText = (text: string, keyword: string): JSX.Element => {
  const escapeRegExp = (string: string): string => {
    return string.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  };
  // 정규식에서 특수문자를 이스케이프 처리하는 함수입니다. 검색어에 특수문자가 포함될 경우를 대비합니다.

  if (!keyword) return <>{text}</>;

  const regex = new RegExp(`(${escapeRegExp(keyword)})`, "gi");
  const parts = text.split(regex);

  return (
    <>
      {parts.map((part, index) =>
        regex.test(part) ? (
          <span key={index} style={{ color: "red" }}>
            {part}
          </span>
        ) : (
          <span key={index}>{part}</span>
        )
      )}
    </>
  );
};
// regex: 검색어에 대응하는 정규식을 생성합니다. 'gi' 플래그를 사용하여
// 대소문자를 구분하지 않고 전체 텍스트에서 검색합니다.
// text.split(regex): 텍스트를 검색어 기준으로 분할합니다.
// parts.map(): 분할된 각 부분을 순회하며, 검색어와 일치하는 부분에는
// 빨간색 스타일을 적용합니다.
// 정규 표현식을 생성합니다.
// 정규 표현식을 기준으로 문자열을 분할합니다.
// 분할된 문자열 중 검색어 부분만 스타일을 적용합니다.

export default function Searchbars01(props: ISearchbars01Props): JSX.Element {
  const { refetch, refetchBoardsCount, onChangeKeyword } = props;
  const getDebounce = _.debounce((value: string) => {
    void refetch({ search: value, page: 1 });
    void refetchBoardsCount({ search: value });
    onChangeKeyword(value);
  }, 500);

  const onChangeSearchbar = (event: ChangeEvent<HTMLInputElement>): void => {
    getDebounce(event.target.value);
  };

  const extendProps = {
    ...props,
    onChangeSearchbar,
  };

  return <Searchbars01UI {...extendProps} />;
}
