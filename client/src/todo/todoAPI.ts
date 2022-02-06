import { TodoListsState } from "./todoListsSlice";

interface Response {
  data: TodoListsState;
}

const baseUrl = "http://localhost:3000";

export function getAll(): Promise<Response> {
  return fetch(`${baseUrl}/todos`).then((response) => response.json());
}
