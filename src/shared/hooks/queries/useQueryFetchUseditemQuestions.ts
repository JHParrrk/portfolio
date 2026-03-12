import {
  IQuery,
  IQueryFetchUseditemQuestionsArgs,
} from '@/shared/types/generated/types';
import { gql, useQuery } from '@apollo/client';

export const FETCH_USED_ITEM_QUESTIONS = gql`
  query fetchUseditemQuestions($useditemId: ID!, $page: Int) {
    fetchUseditemQuestions(useditemId: $useditemId, page: $page) {
      _id
      contents
      user {
        _id
        name
        picture
      }
      createdAt
      updatedAt
    }
  }
`;

export const useQueryFetchUsedItemQuestions = (
  args: IQueryFetchUseditemQuestionsArgs
) => {
  const { data, fetchMore, refetch } = useQuery<
    Pick<IQuery, 'fetchUseditemQuestions'>,
    IQueryFetchUseditemQuestionsArgs
  >(FETCH_USED_ITEM_QUESTIONS, {
    variables: { useditemId: args.useditemId, page: args.page },
  });

  return { data, fetchMore, refetch };
};
