import { useState } from "react";
import { useNavigate } from "react-router-dom";
import BackButton from "../components/BackButton";
import Spinner from "../components/Spinner";
import { useSnackbar } from "notistack";

function CreateBook() {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [publishYear, setPublishYear] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const books_url = "http://localhost:3000";
  const { enqueueSnackbar } = useSnackbar();

  const handleCreateBook = async (e) => {
    e.preventDefault();

    let newBook = {};
    if (title) newBook.title = title.trim();
    if (author) newBook.author = author.trim();
    if (publishYear) newBook.publishYear = publishYear;

    // console.log("data", newBook);

    try {
      setLoading(true);
      const res = await fetch(`${books_url}/books`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newBook),
      });

      const data = await res.json();

      // console.log(data);

      if (!data.success) {
        throw new Error(`Failed to create new book! ${data.message}`);
      } else {
        enqueueSnackbar(data.status, { variant: "success" });
        setLoading(false);
        navigate("/");
      }
    } catch (error) {
      enqueueSnackbar(error.message, { variant: "error" });
      setLoading(false);
      console.error(error);
    }
  };

  return (
    <div className="p-4">
      <BackButton />
      <h1 className="text-3xl my-4">Create Book</h1>
      {loading ? <Spinner /> : ""}
      <div className="flex flex-col border-2 border-sky-400 rounded-xl w-[600px] p-4 mx-auto">
        <div className="my-4">
          <label className="text-xl mr-4 text-gray-500">
            Title <small className="text-red-600">*</small>
          </label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="border-2 border-gray-400 px-4 py-2 w-full"
          />
        </div>
        <div className="my-4">
          <label className="text-xl mr-4 text-gray-500">
            Author <small className="text-red-600">*</small>
          </label>
          <input
            type="text"
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
            className="border-2 border-gray-400 px-4 py-2 w-full"
          />
        </div>
        <div className="my-4">
          <label className="text-xl mr-4 text-gray-500">
            Publish Year <small className="text-red-600">*</small>
          </label>
          <input
            type="number"
            value={publishYear}
            onChange={(e) => setPublishYear(e.target.value)}
            className="border-2 border-gray-400 px-4 py-2 w-full"
          />
        </div>
        <button
          className="p-2 bg-sky-300 m-8"
          type="submit"
          onClick={handleCreateBook}
        >
          Save Book
        </button>
      </div>
    </div>
  );
}

export default CreateBook;
