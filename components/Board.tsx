import React, { useEffect } from "react";

import { getTodosGroupedByColumn } from "@/lib/getTodosGroupedByColumn";
import ClientSideStoreComponent from "./ClientSideStoreComponent";

type Props = {};

const Board = async (props: Props) => {
  const board: Board = await getTodosGroupedByColumn();

  return (
    <>
      <ClientSideStoreComponent board={board} />
    </>
  );
};

export default Board;
