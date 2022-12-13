import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Detail from "../pages/Detail";
import List from "../pages/List";
import Main from "../pages/Main";

const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="detail/:id" element={<Detail />} />
        <Route path="list/:category" element={<List />} />
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
