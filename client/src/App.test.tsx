import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { Provider } from "react-redux";
import { store } from "./store";
import App from "./App";

describe("Tests todo app", () => {
  test("Creates todo lists", () => {
    render(
      <Provider store={store}>
        <App />
      </Provider>
    );

    const inputElement = screen.getByPlaceholderText("List Name");
    const buttonElement = screen.getByText("Create list");
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

  test("Creates todo items", () => {
    render(
      <Provider store={store}>
        <App />
      </Provider>
    );

    const todoListOne = screen.getByText("todo list one");
    fireEvent.click(todoListOne);

    const inputElement = screen.getByPlaceholderText("Item Name");
    const buttonElement = screen.getByText("Create item");

    fireEvent.change(inputElement, { target: { value: "todo item one" } });
    fireEvent.click(buttonElement);

    const todoItemOne = screen.getByText("todo item one");

    expect(todoItemOne).toBeInstanceOf(HTMLParagraphElement);
    expect(todoItemOne).toHaveTextContent("todo item one");

    fireEvent.change(inputElement, { target: { value: "todo item two" } });
    fireEvent.click(buttonElement);

    const todoItemTwo = screen.getByText("todo item two");

    expect(todoItemTwo).toBeInstanceOf(HTMLParagraphElement);
    expect(todoItemTwo).toHaveTextContent("todo item two");
  });

  test("Toggle todo items", () => {
    render(
      <Provider store={store}>
        <App />
      </Provider>
    );

    const todoListOne = screen.getByText("todo list one");
    fireEvent.click(todoListOne);

    const todoItemOne = screen.getByText("todo item one");
    fireEvent.click(todoItemOne);
    expect(todoItemOne).toHaveStyle("text-decoration: line-through");

    const todoItemTwo = screen.getByText("todo item two");
    fireEvent.click(todoItemTwo);
    expect(todoItemTwo).toHaveStyle("text-decoration: line-through");

    fireEvent.click(todoItemOne);
    expect(todoItemOne).toHaveStyle("text-decoration: none");
  });
});
