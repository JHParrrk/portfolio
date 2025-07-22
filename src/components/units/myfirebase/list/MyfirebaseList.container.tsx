import { useEffect, useState } from "react";
import MyfirebaseListUI from "./MyfirebaseList.presenter";
import { collection, getFirestore, getDocs } from "firebase/firestore/lite";
import type { DocumentData } from "firebase/firestore/lite";
import { firebaseApp } from "../../../../commons/libraries/firebase";
import { useMoveToPage } from "@/src/components/commons/hooks/customs/useMoveToPage";


export default function MyfirebaseList(): JSX.Element {
  const { onClickMoveToPage } = useMoveToPage();
  const [dataBoards, setDataBoards] = useState<DocumentData[]>([]);

  useEffect(() => {
    const fetchBoards = async (): Promise<void> => {
      const board = collection(getFirestore(firebaseApp), "board");
      const result = await getDocs(board);
      const boards = result.docs.map((el) => el.data());
      setDataBoards(boards);
    };
    void fetchBoards();
  }, []);

  const onClickMoveToBoardNew = (): void => {
    onClickMoveToPage("/myfirebase/new");
  };

  return (
    <MyfirebaseListUI
      dataBoards={dataBoards}
      onClickMoveToBoardNew={onClickMoveToBoardNew}
    />
  );
}
