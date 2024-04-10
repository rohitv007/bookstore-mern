import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import BackButton from "../components/BackButton";
import Spinner from "../components/Spinner";
import { useSnackbar } from "notistack";

const DeleteBook = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const books_url = "http://localhost:3000";
  const { id } = useParams();
  const { enqueueSnackbar } = useSnackbar();
  // console.log(id);

  const handleDeleteBook = async () => {
    setLoading(true);
    try {
      const res = await fetch(`${books_url}/books/${id}`, {
        method: "DELETE",
      });
      const data = await res.json();
      setLoading(false);
      enqueueSnackbar(data.status, { variant: "success" });
      navigate("/");
    } catch (error) {
      setLoading(false);
      enqueueSnackbar(error.message, { variant: "error" });
      console.log(error);
    }
  };

  return (
    <div className="p-4">
      <BackButton />
      <h1 className="text-3xl my-4">Delete Book</h1>
      {loading ? <Spinner /> : ""}
      <div className="flex flex-col items-center border-2 border-sky-400 rounded-xl w-[600px] p-8 mx-auto">
        <h3 className="text-xl">
          Are you certain you&apos;d like to delete this book?
        </h3>
        <div className="flex flex-row justify-center w-full">
          <button
            className="p-2 bg-gray-300 m-8 w-1/2"
            onClick={() => navigate("/")}
          >
            Cancel
          </button>
          <button
            className="p-2 bg-red-600 text-white m-8 w-1/2"
            onClick={handleDeleteBook}
          >
            Yes, Delete it
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteBook;
