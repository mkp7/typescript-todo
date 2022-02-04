import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { Provider } from "react-redux";
import { store } from "./store";
import App from "./App";

describe("Tests todo list", () => {
  test("Creates todo list", () => {
    render(
      <Provider store={store}>
        <App />
      </Provider>
    );

    const inputElement = screen.getByPlaceholderText("Todo List Name");
    const buttonElement = screen.getByText("Add todo");
    fireEvent.change(inputElement, { target: { value: "todo list one" } });
    fireEvent.click(buttonElement);

    const todoListOne = screen.getByText("todo list one");

    expect(todoListOne).toBeInstanceOf(HTMLParagraphElement);
    expect(todoListOne).toHaveTextContent("todo list one");

    fireEvent.change(inputElement, { target: { value: "todo list two" } });
    fireEvent.click(buttonElement);

    const todoListTwo = screen.getByText("todo list two");

    expect(todoListTwo).toBeInstanceOf(HTMLParagraphElement);
    expect(todoListTwo).toHaveTextContent("todo list two");
  });
});
