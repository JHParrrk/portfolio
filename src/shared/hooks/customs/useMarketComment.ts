import { useMutationMarketQuestion } from '@/shared/hooks/mutations/useMutationMarketQuestion';
import { FETCH_USED_ITEM_QUESTIONS } from '@/shared/hooks/queries/useQueryFetchUseditemQuestions';
import { ApolloQueryResult } from '@apollo/client';
import { IQuery } from '@/shared/types/generated/types';

interface IUseMarketCommentArgs {
  useditemId: string;
  useditemQuestionId?: string;
  onToggleEdit?: () => void;
  refetch?: (
    variables?: Partial<any>
  ) => Promise<ApolloQueryResult<Pick<IQuery, 'fetchUseditemQuestions'>>>;
}

export const useMarketComment = (args: IUseMarketCommentArgs) => {
  const {
    createUseditemQuestion,
    updateUseditemQuestion,
    deleteUseditemQuestion,
  } = useMutationMarketQuestion();

  const onClickWrite = async (data: { contents: string }) => {
    try {
      await createUseditemQuestion({
        variables: {
          createUseditemQuestionInput: { contents: data.contents },
          useditemId: args.useditemId,
        },
        refetchQueries: [
          {
            query: FETCH_USED_ITEM_QUESTIONS,
            variables: { useditemId: args.useditemId },
          },
        ],
      });
    } catch (error) {
      if (error instanceof Error) alert(error.message);
    }
  };

  const onClickUpdate = async (data: { contents: string }) => {
    if (!args.useditemQuestionId) return;
    try {
      await updateUseditemQuestion({
        variables: {
          updateUseditemQuestionInput: { contents: data.contents },
          useditemQuestionId: args.useditemQuestionId,
        },
      });
      if (args.onToggleEdit) args.onToggleEdit();
      if (args.refetch) await args.refetch();
    } catch (error) {
      if (error instanceof Error) alert(error.message);
    }
  };

  const onClickDelete = async () => {
    if (!args.useditemQuestionId) return;
    try {
      await deleteUseditemQuestion({
        variables: { useditemQuestionId: args.useditemQuestionId },
        refetchQueries: [
          {
            query: FETCH_USED_ITEM_QUESTIONS,
            variables: { useditemId: args.useditemId },
          },
        ],
      });
    } catch (error) {
      if (error instanceof Error) alert(error.message);
    }
  };

  return {
    onClickWrite,
    onClickUpdate,
    onClickDelete,
  };
};
