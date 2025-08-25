import { IMarketListHeaderProps } from "./MarketListHeader.types";

export default function MarketListHeader(props: IMarketListHeaderProps) {
  return <div>{props.children}</div>;
}
