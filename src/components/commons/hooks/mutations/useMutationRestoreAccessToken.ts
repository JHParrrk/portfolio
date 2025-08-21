// src/components/commons/hooks/mutations/useMutationRestoreAccessToken.ts

import { IMutation } from "@/src/commons/types/generated/types";
import { useMutation } from "@apollo/client";
import { RESTORE_ACCESS_TOKEN } from "@/src/components/commons/hooks/mutations/RestoreAccessToken ";

export const useMutationRestoreAccessToken = () => {
  const mutation =
    useMutation<Pick<IMutation, "restoreAccessToken">>(RESTORE_ACCESS_TOKEN);

  return mutation;
};
