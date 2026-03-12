import { gql, useMutation } from '@apollo/client';
import { IMutation } from '@/shared/types/generated/types';

export const LOGOUT_USER = gql`
  mutation logoutUser {
    logoutUser
  }
`;

export const useMutationLogoutUser = () => {
  return useMutation<Pick<IMutation, 'logoutUser'>>(LOGOUT_USER);
};
