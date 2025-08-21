import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  ApolloLink,
  fromPromise,
} from "@apollo/client";
import createUploadLink from "apollo-upload-client/createUploadLink.mjs";
import { useRecoilState, useRecoilValueLoadable } from "recoil";
import {
  accessTokenState,
  restoreAccessTokenLoadable,
} from "@/src/commons/stores";
import { useEffect } from "react";
import { onError } from "@apollo/client/link/error";
import { getAccessToken } from "@/src/commons/libraries/getAccessToken";
import { setContext } from "@apollo/client/link/context";

const GLOBAL_STATE = new InMemoryCache();
// "Apollo Client의 캐시 데이터는 기본적으로 컴포넌트 재마운트나
// 새 창을 열 때 초기화됩니다. 이를 방지하기 위해 GLOBAL_STATE라는
// 전역 변수에 InMemoryCache를 저장하여 모든 Apollo Client 인스턴스가
// 동일한 캐시를 공유하도록 설정했습니다.

interface IApolloSettingsProps {
  children: JSX.Element;
}

const ApolloSettings = (props: IApolloSettingsProps): JSX.Element => {
  // Recoil 상태로 accessToken을 관리합니다.
  const [accessToken, setAccessToken] = useRecoilState(accessTokenState);
  // Recoil Loadable을 사용하여 비동기로 accessToken을 가져옵니다.
  const loadedAccessToken = useRecoilValueLoadable(restoreAccessTokenLoadable);

  // 컴포넌트가 처음 마운트될 때 (새로고침 시) 쿠키에서 토큰을 가져와 Recoil 상태를 초기화합니다.
  useEffect(() => {
    // loadedAccessToken.toPromise()를 사용해 비동기 작업이 완료될 때까지 기다립니다.
    void loadedAccessToken.toPromise().then((newAccessToken) => {
      // 새로운 토큰을 Recoil 상태에 저장합니다. null 또는 undefined일 경우 빈 문자열로 처리합니다.
      setAccessToken(newAccessToken ?? "");
    });
  }, []);

  // authLink: 모든 GraphQL 요청이 전송되기 전에 실행되어 인증 헤더를 동적으로 설정합니다.
  // 이 링크를 통해 항상 최신 Recoil 상태의 accessToken을 요청에 포함시킬 수 있습니다.
  const authLink = setContext((_, { headers }) => {
    return {
      headers: {
        ...headers,
        authorization: accessToken ? `Bearer ${accessToken}` : "", // Recoil의 accessToken을 사용
      },
    };
  });

  // errorLink: GraphQL 요청에서 에러가 발생했을 때 이를 가로채는 역할을 합니다.
  const errorLink = onError(({ graphQLErrors, operation, forward }) => {
    if (graphQLErrors) {
      for (const err of graphQLErrors) {
        // 에러 코드가 'UNAUTHENTICATED' (토큰 만료)인지 확인합니다.
        if (err.extensions?.code === "UNAUTHENTICATED") {
          // refreshToken을 사용하여 accessToken을 재발급받는 비동기 로직을 실행합니다.
          return fromPromise(
            getAccessToken().then((newAccessToken) => {
              // Recoil 상태를 새로운 accessToken으로 업데이트합니다.
              setAccessToken(newAccessToken ?? "");
              // 실패했던 요청에 새로운 토큰을 포함시켜 컨텍스트를 재설정합니다.
              operation.setContext({
                headers: {
                  ...operation.getContext().headers,
                  Authorization: `Bearer ${newAccessToken}`,
                },
              });
            })
          ).flatMap(() => forward(operation)); // 재설정된 요청을 다시 보냅니다.
        }
      }
    }
  });

  // uploadLink: 파일을 포함한 요청을 처리합니다.
  // credentials: "include" 옵션을 통해 쿠키가 요청에 포함되도록 설정합니다.
  const uploadLink = createUploadLink({
    uri: "https://backendonline.codebootcamp.co.kr/graphql",
    credentials: "include",
  });

  // Apollo Client 설정: ApolloLink.from으로 링크들을 연결합니다.
  // 링크 순서가 중요합니다: errorLink -> authLink -> uploadLink
  // 에러를 먼저 감지하고, 그 다음 인증 헤더를 추가하며, 마지막으로 요청을 보냅니다.
  const client = new ApolloClient({
    link: ApolloLink.from([
      errorLink,
      authLink,
      uploadLink as unknown as ApolloLink,
    ]),
    cache: GLOBAL_STATE,
  });

  return <ApolloProvider client={client}>{props.children}</ApolloProvider>;
};

export default ApolloSettings;
