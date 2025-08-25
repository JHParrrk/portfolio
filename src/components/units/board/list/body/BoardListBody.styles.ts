// BoardListBody.styles.ts
import styled from "@emotion/styled";
import { ITextTokenProps } from "./BoardListBody.types";

export const BLB = {
  BodyWrapper: styled.div`
    --row-height: 52px;
    --border-height: 1px;
    --table-top-margin: 20px;
    --table-top-border: 2px;
    --table-bottom-border: 2px;

    /*
     * 게시물 목록 10개 기준: TableTop + 헤더 행 1개 + 게시물 행 10개 + TableBottom
     */
    min-height: calc(
      var(--table-top-margin) + var(--table-top-border) +
        (var(--row-height) + var(--border-height)) * 11 +
        /* 헤더 1개 + 게시물 10개 */ var(--table-bottom-border)
    );
  `,

  TableTop: styled.div`
    border-top: var(--table-top-border) solid gray;
    margin-top: var(--table-top-margin);
  `,
  TableBottom: styled.div`
    border-bottom: var(--table-bottom-border) solid gray;
  `,
  Row: styled.div`
    display: flex;
    flex-direction: row;
    height: var(--row-height);
    line-height: var(--row-height);
    border-bottom: var(--border-height) solid gray;

    :hover {
      color: blue;
    }
  `,
  ColumnHeaderBasic: styled.div`
    width: 10%;
    text-align: center;
  `,
  ColumnHeaderTitle: styled.div`
    width: 70%;
    text-align: center;
  `,
  ColumnBasic: styled.div`
    width: 10%;
    text-align: center;
  `,
  ColumnTitle: styled.div`
    width: 70%;
    text-align: center;
    cursor: pointer;

    :hover {
      color: blue;
    }
  `,
  TextToken: styled.span`
    color: ${(props: ITextTokenProps) => (props.isMatched ? "red" : "black")};
  `,
};
