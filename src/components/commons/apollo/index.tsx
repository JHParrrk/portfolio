import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  ApolloLink,
} from "@apollo/client";
import createUploadLink from "apollo-upload-client/createUploadLink.mjs";

interface IApolloSettingsProps {
  children: JSX.Element;
}

const ApolloSettings = (props: IApolloSettingsProps): JSX.Element => {
  const uploadLink = createUploadLink({
    uri: "https://backendonline.codebootcamp.co.kr/graphql",
  });

  const client = new ApolloClient({
    link: ApolloLink.from([uploadLink as unknown as ApolloLink]),
    cache: new InMemoryCache(),
    // 컴퓨터의 메모리에다가 백엔드에서 받아온 데이터 임시저장
  });

  return <ApolloProvider client={client}>{props.children}</ApolloProvider>;
};

export default ApolloSettings;
