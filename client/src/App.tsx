import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { addTodoList } from "./todo/todoListsSlice";
import { RootState } from "./store";

function App() {
  const todoLists = useSelector((state: RootState) => state.todoLists);
  const dispatch = useDispatch();
  const [todoListName, setTodoListName] = useState("");

  return (
    <>
      <h2>To-Do App using TypeScript.</h2>
      <input
        onChange={(e) => setTodoListName(e.target.value)}
        value={todoListName}
        placeholder="Todo List Name"
      />
      <button
        onClick={() => {
          dispatch(addTodoList(todoListName));
          setTodoListName("");
        }}
      >
        Add todo
      </button>
      {Object.keys(todoLists).map((id) => (
        <p key={id}>{todoLists[id]}</p>
      ))}
    </>
  );
}

export default App;
