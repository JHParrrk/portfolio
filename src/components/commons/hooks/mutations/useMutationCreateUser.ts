import {
  IMutation,
  IMutationCreateUserArgs,
} from "@/src/commons/types/generated/types";
import { gql, useMutation } from "@apollo/client";

export const CREATE_USER = gql`
  mutation createUser($createUserInput: CreateUserInput!) {
    createUser(createUserInput: $createUserInput) {
      _id
      email
      name
    }
  }
`;

export const useMutationCreateUser = () => {
  const mutation = useMutation<
    Pick<IMutation, "createUser">,
    IMutationCreateUserArgs
  >(CREATE_USER);

  return mutation;
};
