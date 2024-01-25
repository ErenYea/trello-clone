import { database } from "@/appwrite";

const updateTodoInDB = async (todo: Todo, columnId: TypedColumn) => {
  // console.log(todo);
  await database.updateDocument(
    process.env.NEXT_PUBLIC_DATABASE_ID!,
    process.env.NEXT_PUBLIC_TODOS_COLLECTION_ID!,
    todo.$id,
    {
      title: todo.title,
      status: columnId,
    }
  );
};

export default updateTodoInDB;
