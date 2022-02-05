import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { v4 } from "uuid";
import { addTodoListItem } from "./todoListsSlice";
import { addTodoItem, toggleTodoItem } from "./todoItemsSlice";
import { RootState } from "../store";

export default function TodoList(props: { listId: string }) {
  const { listId } = props;
  const todoList = useSelector((state: RootState) => state.todoLists[listId]);
  const items = useSelector((state: RootState) => state.todoItems);
  const todoItems = todoList.items.map((itemId) => items[itemId]);

  const dispatch = useDispatch();
  const [todoItemName, setTodoItemName] = useState("");

  function createTodoItem(name: string) {
    const id = v4();
    dispatch(addTodoItem({ id, name }));
    dispatch(addTodoListItem({ id: listId, itemId: id }));
  }

  return (
    <>
      <input
        onChange={(e) => setTodoItemName(e.target.value)}
        value={todoItemName}
        placeholder="Item Name"
      />
      <button
        onClick={() => {
          createTodoItem(todoItemName);
          setTodoItemName("");
        }}
      >
        Create item
      </button>
      <p>
        <b>{todoList.name}</b>
      </p>
      {todoItems.map((item) => (
        <p
          key={item.id}
          onClick={() => dispatch(toggleTodoItem({ id: item.id }))}
          style={{
            textDecoration: item.done ? "line-through" : "none",
            fontStyle: "italic",
          }}
        >
          {item.name}
        </p>
      ))}
    </>
  );
}
