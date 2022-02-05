import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface TodoItemState {
  id: string;
  name: string;
  done: boolean;
}

export interface TodoItemsState {
  [key: string]: TodoItemState;
}

const initialState: TodoItemsState = {};

export const todoItemsSlice = createSlice({
  name: "todo-items",
  initialState,
  reducers: {
    addTodoItem: (
      state,
      action: PayloadAction<{ id: string; name: string }>
    ) => {
      const { id, name } = action.payload;
      state[id] = { id, name, done: false };
    },
    toggleTodoItem: (state, action: PayloadAction<{ id: string }>) => {
      const { id } = action.payload;
      state[id].done = !state[id].done;
    },
  },
});

// Action creators are generated for each case reducer function
export const { addTodoItem, toggleTodoItem } = todoItemsSlice.actions;

export default todoItemsSlice.reducer;
