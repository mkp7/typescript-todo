import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { v4 } from "uuid";

export interface TodoListsState {
  [key: string]: string;
}

const initialState: TodoListsState = {};

export const counterSlice = createSlice({
  name: "todo-lists",
  initialState,
  reducers: {
    addTodoList: (state, action: PayloadAction<string>) => {
      const id = v4();
      state[id] = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { addTodoList } = counterSlice.actions;

export default counterSlice.reducer;
