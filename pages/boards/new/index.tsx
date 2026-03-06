import BoardWrite from '@/features/boards/ui/write/BoardWrite.index';

const BoardsNewPage = () => {
  const props = {
    isEdit: false,
  };

  return <BoardWrite {...props} />;
};

export default BoardsNewPage;
