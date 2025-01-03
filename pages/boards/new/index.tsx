import BoardWrite from "../../../src/components/units/board/write/BoardWrite.container";
import useBoardForm from "../../../src/hooks/useBoardForm";

const BoardsNewPage = () => {
  const boardFormProps = useBoardForm();

  const props = {
    isEdit: false,
    ...boardFormProps,
  };

  return <BoardWrite {...props} />;
};

export default BoardsNewPage;
