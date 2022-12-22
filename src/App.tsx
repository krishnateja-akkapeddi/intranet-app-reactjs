import { Route, Routes } from "react-router-dom";
import React, { createElement } from "react";
import pageRoutes from "./routes/pageRoutes";
import "./App.css";
import path from "path";
import { useDispatch } from "react-redux";
import { appSlice } from "./store/slices/AppSlice";
type Props = {};

const AppRoutes = (props: Props) => {
  const dispatch = useDispatch();
  React.useEffect(() => {
    dispatch(
      appSlice.actions.setDarkMode(localStorage.getItem("mode") === "dark")
    );
  }, [localStorage]);
  return (
    <Routes>
      {pageRoutes.map((route, key) => {
        return (
          <Route
            key={key}
            element={createElement(route.element)}
            path={route.path}
          ></Route>
        );
      })}
    </Routes>
  );
};

export default AppRoutes;
