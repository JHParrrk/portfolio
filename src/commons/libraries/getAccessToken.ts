// getAccessToken.ts

import { GraphQLClient } from "graphql-request";
import { IMutation } from "@/src/commons/types/generated/types";
import { RESTORE_ACCESS_TOKEN } from "@/src/components/commons/hooks/mutations/RestoreAccessToken ";

export const getAccessToken = async (): Promise<string | undefined> => {
  try {
    const graphqlClient = new GraphQLClient(
      "https://backendonline.codebootcamp.co.kr/graphql",
      {
        credentials: "include",
      }
    );
    const result = await graphqlClient.request<
      Pick<IMutation, "restoreAccessToken">
    >(RESTORE_ACCESS_TOKEN);
    const newAccessToken = result.restoreAccessToken.accessToken;

    return newAccessToken;
  } catch (error) {
    if (error instanceof Error) console.log(error.message);
  }
};
