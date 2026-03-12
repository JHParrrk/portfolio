import {
  IMutation,
  IMutationToggleUseditemPickArgs,
} from '@/shared/types/generated/types';
import { gql, useMutation } from '@apollo/client';

export const TOGGLE_USED_ITEM_PICK = gql`
  mutation toggleUseditemPick($useditemId: ID!) {
    toggleUseditemPick(useditemId: $useditemId)
  }
`;

export const useMutationToggleUseditemPick = () => {
  const [toggleUseditemPick] = useMutation<
    Pick<IMutation, 'toggleUseditemPick'>,
    IMutationToggleUseditemPickArgs
  >(TOGGLE_USED_ITEM_PICK);

  return [toggleUseditemPick];
};
