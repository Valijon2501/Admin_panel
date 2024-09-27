import { Route, Routes } from "react-router-dom";
import HomePage from "../autozon/HomePage";

const Router = () => {
  return (
    <>
      <Routes>
        <Route path="" element={<HomePage />} />
      </Routes>
    </>
  );
};
export default Router;
