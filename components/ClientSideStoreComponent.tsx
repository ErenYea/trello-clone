"use client";
import { useBoardStore } from "@/store/BoardStore";
import React, { useEffect } from "react";
import { DragDropContext, DropResult } from "react-beautiful-dnd";
import Column from "./Column";
import { StrictModeDroppable } from "./StrictModeDroppable";
import updateTodoInDB from "@/lib/updateTodoInDB";

type Props = {
  board: Board;
};

const ClientSideStoreComponent = (props: Props) => {
  const [board, setBoard] = useBoardStore((state) => [
    state.board,
    state.setBoard,
  ]);
  const handleOnDragEnd = async (result: DropResult) => {
    const { destination, source, type } = result;

    // Check if the user dragged card outside of the board
    if (!destination) {
      return;
    }
    // Handle column drag
    if (type == "column") {
      const entries = Array.from(board.columns.entries());
      const [removed] = entries.splice(source.index, 1);
      entries.splice(destination.index, 0, removed);
      const rearrangedColumns = new Map(entries);
      setBoard({
        ...board,
        columns: rearrangedColumns,
      });
    }

    // Handle card drag
    // THis step is needed as the indexes are stored as numbers 0,1,2 etc,instaed of id's with DND library
    if (type == "card") {
      const columns = Array.from(board.columns);
      const startColumn = columns[Number(source.droppableId)];
      const finishColumn = columns[Number(destination.droppableId)];
      // console.log(startColumn, finishColumn);
      const startCol: Column = {
        id: startColumn[0],
        todos: startColumn[1].todos,
      };
      const finishCol: Column = {
        id: finishColumn[0],
        todos: finishColumn[1].todos,
      };

      if (!startCol || !finishCol) return;

      if (source.index === destination.index && startCol === finishCol) return;

      const newTodos = startCol.todos;
      const [todoMoved] = newTodos.splice(source.index, 1);

      if (startCol.id === finishCol.id) {
        // same column task drag
        newTodos.splice(destination.index, 0, todoMoved);
        const newCol: Column = {
          id: startCol.id,
          todos: newTodos,
        };
        const newColumns = new Map(board.columns);
        newColumns.set(startCol.id, newCol);
        setBoard({
          ...board,
          columns: newColumns,
        });
      } else {
        //dragging to another column
        const finishTodos = Array.from(finishCol.todos);
        finishTodos.splice(destination.index, 0, todoMoved);
        const newColumns = new Map(board.columns);
        newColumns.set(startCol.id, {
          id: startCol.id,
          todos: newTodos,
        });
        newColumns.set(finishCol.id, {
          id: finishCol.id,
          todos: finishTodos,
        });
        // Update the db
        updateTodoInDB(todoMoved, finishCol.id);
        setBoard({
          ...board,
          columns: newColumns,
        });
      }
    }
  };
  useEffect(() => {
    setBoard(props.board);
  }, [setBoard]);
  return (
    <DragDropContext onDragEnd={handleOnDragEnd}>
      <StrictModeDroppable
        droppableId="board"
        direction="horizontal"
        type="column"
      >
        {(provided) => (
          <div
            className="grid grid-cols-1 md:grid-cols-3 gap-5 max-w-7xl mx-auto"
            {...provided.droppableProps}
            ref={provided.innerRef}
          >
            {Array.from(board.columns.entries()).map(([id, column], index) => (
              <Column key={id} id={id} todos={column.todos} index={index} />
            ))}
          </div>
        )}
      </StrictModeDroppable>
    </DragDropContext>
  );
};

export default ClientSideStoreComponent;
