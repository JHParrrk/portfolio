import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client";

interface IApolloSettingsProps {
  children: JSX.Element;
}

const ApolloSettings = (props: IApolloSettingsProps): JSX.Element => {
  const client = new ApolloClient({
    uri: "https://backendonline.codebootcamp.co.kr/graphql",
    cache: new InMemoryCache(),
    // 컴퓨터의 메모리에다가 백엔드에서 받아온 데이터 임시저장
  });

  return <ApolloProvider client={client}>{props.children}</ApolloProvider>;
};

export default ApolloSettings;
