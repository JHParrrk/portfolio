import { IBoardListHeaderProps } from "./BoardListHeader.types";

export default function BoardListHeader(props: IBoardListHeaderProps) {
  return <div>{props.children}</div>;
}
