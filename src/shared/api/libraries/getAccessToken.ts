// getAccessToken.ts

import { GraphQLClient } from 'graphql-request';
import { IMutation } from '@/shared/types/generated/types';
import { RESTORE_ACCESS_TOKEN } from '@/shared/hooks/mutations/RestoreAccessToken ';

export const getAccessToken = async (): Promise<string | undefined> => {
  try {
    const graphqlClient = new GraphQLClient(
      // 외부 API 엔드포인트 대신, 내부 BFF Proxy API를 바라보도록 변경
      '/api/graphql/proxy',
      {
        credentials: 'include',
      }
    );
    const result =
      await graphqlClient.request<Pick<IMutation, 'restoreAccessToken'>>(
        RESTORE_ACCESS_TOKEN
      );
    const newAccessToken = result.restoreAccessToken.accessToken;

    return newAccessToken;
  } catch (error) {
    if (error instanceof Error) console.log(error.message);
  }
};
