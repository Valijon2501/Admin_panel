// import { useNavigate } from "react-router-dom";
import { HomePageStyle } from "./HomePageStyle";
import { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const HomePage = () => {
  // const token = localStorage.getItem("tokenchik");
  // const navigate = useNavigate();
  // useEffect(() => {
  //   if (!token) {
  //     navigate("/");
  //   } else {
  //     navigate("/home");
  //   }
  // });

  // category get
  const [categ, setCateg] = useState();
  function getCategory() {
    fetch("https://autoapi.dezinfeksiyatashkent.uz/api/categories")
      .then((res) => res.json())
      .then((element) => setCateg(element?.data));
  }
  useEffect(() => {
    getCategory();
  }, []);

  // modal function
  const [openModal, setOpenModal] = useState(false);

  // category post

  const [nameEn, setNameEn] = useState();
  const [nameRu, setNameRu] = useState();
  const [image, setImage] = useState();

  const tokenxon = localStorage.getItem("tokenchik");

  const categoryPost = (event) => {
    const formdata = new FormData();
    formdata.append("name_en", nameEn);
    formdata.append("name_ru", nameRu);
    formdata.append("images", image);
    event.preventDefault();
    fetch("https://autoapi.dezinfeksiyatashkent.uz/api/categories", {
      method: "Post",
      headers: {
        // "Content-type": "multipart/form-data",
        Authorization: `Bearer ${tokenxon}`,
      },
      body: formdata,
    })
      .then((response) => response.json())
      .then((elem) => {
        if (elem?.success) {
          getCategory();
          toast.success(elem?.message);
          setOpenModal(false);
        } else {
          toast.error(elem?.message);
        }
      });
  };

  // delete api

  const deleteApi = (id) => {
    fetch(`https://autoapi.dezinfeksiyatashkent.uz/api/categories/${id}`, {
      method: "Delete",
      headers: {
        Authorization: `Bearer ${tokenxon}`,
      },
    })
      .then((resp) => resp.json())
      .then((items) => {
        if (items?.success) {
          toast.success(items?.message);
          getCategory();
        } else {
          toast.error(items?.message);
        }
      });
  };

  // put api 

  

  return (
    <>
      <HomePageStyle>
        <button onClick={() => setOpenModal(!openModal)}>
          {openModal ? "yopish" : " Qo'shish"}
        </button>
        {openModal && (
          <div className="modal">
            <h1>modal</h1>
            <form>
              <input
                onChange={(e) => setNameEn(e?.target?.value)}
                type="text"
                placeholder="name en"
                required
              />
              <input
                onChange={(e) => setNameRu(e?.target?.value)}
                type="text"
                placeholder="name ru"
                required
              />
              <input
                // multiple
                onChange={(e) => setImage(e?.target?.files[0])}
                type="file"
                required
              />
              <button onClick={categoryPost}>qo'shilsin add</button>
            </form>
          </div>
        )}
        <table id="customers" className="customers">
          <tr>
            <th>name_en</th>
            <th>name_rus</th>
            <th>image</th>
            <th>delete</th>
          </tr>
          {categ?.map((item, index) => (
            <tr key={index}>
              <td>{item?.name_en}</td>
              <td>{item?.name_ru}</td>
              <td>
                <img
                  src={`https://autoapi.dezinfeksiyatashkent.uz/api/uploads/images/${item?.image_src}`}
                  alt={"item?name_en"}
                />
              </td>
              <td>
                <button onClick={() => deleteApi(item?.id)}>o'chirish</button>
              </td>
            </tr>
          ))}
        </table>
      </HomePageStyle>
    </>
  );
};
export default HomePage;
