import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface TodoListState {
  id: string;
  name: string;
  items: string[];
}

export interface TodoListsState {
  [key: string]: TodoListState;
}

const initialState: TodoListsState = {};

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
});

// Action creators are generated for each case reducer function
export const { addTodoList, addTodoListItem } = todoListsSlice.actions;

export default todoListsSlice.reducer;
