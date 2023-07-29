/* eslint-disable testing-library/no-unnecessary-act */
import { render, screen } from "@testing-library/react";
import App from "./App";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { act } from "react-dom/test-utils";
import NavBar from "./components/navbar/NavBar";
import { Provider } from "react-redux";
import "@testing-library/jest-dom";
import store from "./components/store/store";
test("renders navbar link", () => {
  act(() => {
    render(
      <BrowserRouter>
        <Provider store={store}>
          <Routes>
            <Route path="*" element={<NavBar />} />
          </Routes>
        </Provider>
      </BrowserRouter>
    );
  });

  const linkElement = screen.getByText(/contact/i);
  expect(linkElement).toBeInTheDocument();
});
