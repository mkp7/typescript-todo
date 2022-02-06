import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { v4 } from "uuid";
import TodoList from "./TodoList";
import { fetchTodos, addTodoList } from "./todoListsSlice";
import { RootState } from "../store";

export default function TodoApp() {
  const todoLists = useSelector((state: RootState) => state.todoLists);
  const dispatch = useDispatch();
  const [todoListName, setTodoListName] = useState("");
  const [selectedTodoList, setSelectedTodoList] = useState<string | null>(null);

  useEffect(() => {
    dispatch(fetchTodos());
  }, [dispatch]);

  function createTodoList(name: string) {
    const id = v4();
    dispatch(addTodoList({ id, name }));
  }
  return (
    <>
      <input
        onChange={(e) => setTodoListName(e.target.value)}
        value={todoListName}
        placeholder="List Name"
      />
      <button
        onClick={() => {
          createTodoList(todoListName);
          setTodoListName("");
        }}
      >
        Create list
      </button>
      {Object.keys(todoLists).map((id) => (
        <p onClick={() => setSelectedTodoList(id)} key={id}>
          {todoLists[id].name}
        </p>
      ))}

      {selectedTodoList && <TodoList listId={selectedTodoList} />}
    </>
  );
}
