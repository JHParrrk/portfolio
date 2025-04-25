import BoardWrite from "../../../src/components/units/board/write/BoardWrite.index";

const BoardsNewPage = () => {
  const props = {
    isEdit: false,
  };

  return <BoardWrite {...props} />;
};

export default BoardsNewPage;
