import { gql, useMutation } from '@apollo/client';
import {
  IMutation,
  IMutationUpdateUseditemArgs,
} from '@/shared/types/generated/types';

export const UPDATE_USED_ITEM = gql`
  mutation updateUseditem(
    $updateUseditemInput: UpdateUseditemInput!
    $useditemId: ID!
  ) {
    updateUseditem(
      updateUseditemInput: $updateUseditemInput
      useditemId: $useditemId
    ) {
      _id
      name
      remarks
      contents
      price
      tags
      images
      pickedCount
      useditemAddress {
        zipcode
        address
        addressDetail
      }
      createdAt
      updatedAt
    }
  }
`;

export const useMutationUpdateUseditem = () => {
  return useMutation<
    Pick<IMutation, 'updateUseditem'>,
    IMutationUpdateUseditemArgs
  >(UPDATE_USED_ITEM);
};
