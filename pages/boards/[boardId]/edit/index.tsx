import BoardWrite from '@/features/boards/ui/write/BoardWrite.index';
import { useQueryFetchBoard } from '@/shared/hooks/queries/useQueryFetchBoard';

const BoardsEditPage = () => {
  const { data, loading, error } = useQueryFetchBoard();

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;
  if (!data) return <p>No data available</p>;

  const props = {
    isEdit: true,
    data,
  };

  return <BoardWrite {...props} />;
};

export default BoardsEditPage;
