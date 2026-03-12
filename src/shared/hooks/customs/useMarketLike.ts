import { useMutationToggleUseditemPick } from '@/shared/hooks/mutations/useMutationToggleUseditemPick';
import { FETCH_USED_ITEM } from '@/shared/hooks/queries/ustQueryFetchUsedItem';

interface IUseMarketLikeArgs {
  useditemId: string;
}

export const useMarketLike = (args: IUseMarketLikeArgs) => {
  const [toggleUseditemPick] = useMutationToggleUseditemPick();

  const onClickLike = async () => {
    try {
      await toggleUseditemPick({
        variables: { useditemId: args.useditemId },
        refetchQueries: [
          {
            query: FETCH_USED_ITEM,
            variables: { useditemId: args.useditemId },
          },
        ],
      });
    } catch (error) {
      if (error instanceof Error) alert(error.message);
    }
  };

  return {
    onClickLike,
  };
};
