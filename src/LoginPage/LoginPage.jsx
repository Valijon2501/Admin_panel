import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const LaginPage = () => {
  const [raqam, setRaqam] = useState();
  const [parol, setParol] = useState();
  const navigate = useNavigate;
  const loginSubmit = (event) => {
    event.preventDefault();
    fetch("https://autoapi.dezinfeksiyatashkent.uz/api/auth/signin", {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify({
        phone_number: raqam,
        password: parol,
      }),
    })
      .then((res) => res.json())
      .then((element) => {
        if (element?.success === true) {
          localStorage.setItem(
            "tokenchik",
            element?.data?.tokens?.accessToken?.token
          );
          toast.success(element?.message);
          navigate("/home");
        } else {
          toast.error(element?.message);
        }
      });
  };

  return (
    <>
      <h1>Login qilish</h1>
      <form action="">
        <input
          onChange={(e) => setRaqam(e?.target?.value)}
          type="text"
          placeholder="number"
          required
          minLength={3}
        />
        <input
          onChange={(e) => setParol(e?.target?.value)}
          type="text"
          placeholder="password"
          required
          minLength={3}
        />
        <button onClick={loginSubmit}>login qilish</button>
      </form>
      <ToastContainer />
    </>
  );
};
export default LaginPage;
