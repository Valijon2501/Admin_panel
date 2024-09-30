import { Route, Routes } from "react-router-dom";
import HomePage from "../HomePage/HomePage";
import LaginPage from "../LoginPage/LoginPage";

const Router = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<LaginPage />} />
        <Route path="/home" element={<HomePage />} />

      </Routes>
    </>
  );
};
export default Router;
