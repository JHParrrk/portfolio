import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  ApolloLink,
  fromPromise,
} from '@apollo/client';
import createUploadLink from 'apollo-upload-client/createUploadLink.mjs';
import { useGlobalStore } from '@/shared/models/stores';
import { useEffect } from 'react';
import { onError } from '@apollo/client/link/error';
import { getAccessToken } from '@/shared/api/libraries/getAccessToken';
import { setContext } from '@apollo/client/link/context';

const GLOBAL_STATE = new InMemoryCache();

interface IApolloSettingsProps {
  children: JSX.Element;
}

const ApolloSettings = (props: IApolloSettingsProps): JSX.Element => {
  const { accessToken, setAccessToken, restoreAccessToken } = useGlobalStore();

  useEffect(() => {
    void restoreAccessToken().then((newAccessToken) => {
      setAccessToken(newAccessToken ?? '');
    });
  }, [restoreAccessToken, setAccessToken]);

  const authLink = setContext((_, { headers }) => {
    return {
      headers: {
        ...headers,
        authorization: accessToken ? `Bearer ${accessToken}` : '',
      },
    };
  });

  const errorLink = onError(({ graphQLErrors, operation, forward }) => {
    if (graphQLErrors) {
      for (const err of graphQLErrors) {
        if (err.extensions?.code === 'UNAUTHENTICATED') {
          return fromPromise(
            getAccessToken().then((newAccessToken) => {
              setAccessToken(newAccessToken ?? '');
              operation.setContext({
                headers: {
                  ...operation.getContext().headers,
                  Authorization: `Bearer ${newAccessToken}`,
                },
              });
            })
          ).flatMap(() => forward(operation));
        }
      }
    }
  });

  const uploadLink = createUploadLink({
    // 기존의 외부 API 엔드포인트 대신, 내부의 BFF Proxy API를 바라보도록 변경합니다. (보안 목적)
    // uri: 'https://backendonline.codebootcamp.co.kr/graphql',
    uri: '/api/graphql/proxy',
    credentials: 'include',
  });

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
