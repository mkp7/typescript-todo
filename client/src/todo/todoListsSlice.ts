import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { getAll } from "./todoAPI";

export interface TodoListState {
  id: string;
  name: string;
  items: string[];
}

export interface TodoListsState {
  [key: string]: TodoListState;
}

const initialState: TodoListsState = {};

export const fetchTodos = createAsyncThunk<TodoListsState>(
  "todos/getAll",
  async () => {
    const response = await getAll();
    return response.data;
  }
);

export const todoListsSlice = createSlice({
  name: "todo-lists",
  initialState,
  reducers: {
    addTodoList: (
      state,
      action: PayloadAction<{ id: string; name: string }>
    ) => {
      const { id, name } = action.payload;
      state[id] = { id, name, items: [] };
    },
    addTodoListItem: (
      state,
      action: PayloadAction<{ id: string; itemId: string }>
    ) => {
      const { id, itemId } = action.payload;
      const list = state[id];
      list.items.push(itemId);
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchTodos.fulfilled, (state, action) => {
      console.log(action.payload);
    });
  },
});

// Action creators are generated for each case reducer function
export const { addTodoList, addTodoListItem } = todoListsSlice.actions;

export default todoListsSlice.reducer;
