import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import BackButton from "../components/BackButton";
import Spinner from "../components/Spinner";
import { useSnackbar } from "notistack";

const EditBook = () => {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [publishYear, setPublishYear] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const books_url = "http://localhost:3000";
  const { id } = useParams();
  const { enqueueSnackbar } = useSnackbar();
  // console.log(id);

  useEffect(() => {
    const controller = new AbortController();

    setLoading(true);
    fetch(`${books_url}/books/${id}`, { signal: controller.signal })
      .then((res) => res.json())
      .then((data) => {
        setTitle(data.title);
        setAuthor(data.author);
        setPublishYear(data.publishYear);
        setLoading(false);
        // console.log(data);
      })
      .catch((error) => {
        setLoading(false);
        console.log(error);
      });

    return () => controller.abort();
  }, [books_url, id]);

  const handleEditBook = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const existingBookResponse = await fetch(`${books_url}/books/${id}`, {
        method: "GET",
      });

      if (!existingBookResponse.status) {
        throw new Error(
          `Failed to fetch current book details: ${existingBookResponse.message}`
        );
      }

      let updatedBook = {};
      // console.log({ title, author, publishYear });
      if (title) updatedBook.title = title.trim();
      if (author) updatedBook.author = author.trim();
      if (publishYear) updatedBook.publishYear = publishYear;

      // console.log("BEFORE", updatedBook);

      if (
        !updatedBook.title &&
        !updatedBook.author &&
        !updatedBook.publishYear
      ) {
        throw new Error("Please provide one or more values to update");
      }

      const existingBook = await existingBookResponse.json();
      // console.log("existing book =>", existingBook);

      // if (
      //   updatedBook.title === existingBook.title ||
      //   updatedBook.author === existingBook.author ||
      //   updatedBook.publishYear === existingBook.publishYear
      // ) {
      //   throw new Error(
      //     "Please provide value other than existing to update the field or cancel the update!"
      //   );
      // }

      // Include the current values for fields that are not being updated
      if (!updatedBook.title) updatedBook.title = existingBook.title;
      if (!updatedBook.author) updatedBook.author = existingBook.author;
      if (!updatedBook.publishYear)
        updatedBook.publishYear = existingBook.publishYear;

      // console.log("AFTER", updatedBook);

      const res = await fetch(`${books_url}/books/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedBook),
      });

      const data = await res.json();
      // console.log(data);

      if (data.success) {
        enqueueSnackbar(data.status, { variant: "success" });
        console.log(data.status);
      } else {
        throw new Error(data.status);
      }
      setLoading(false);
      navigate("/");
    } catch (error) {
      setLoading(false);
      enqueueSnackbar(error.message, { variant: "error" });
      console.error(error);
    }
  };

  return (
    <div className="p-4">
      <BackButton />
      <h1 className="text-3xl my-4">
        Edit Book{" "}
        <small>
          <i>(one/more fields are required for update)</i>
        </small>
      </h1>
      {loading ? <Spinner /> : ""}
      <div className="flex flex-col border-2 border-sky-400 rounded-xl w-[600px] p-4 mx-auto">
        <div className="my-4">
          <label className="text-xl mr-4 text-gray-500">Title</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="border-2 border-gray-500 px-4 py-2 w-full"
          />
        </div>
        <div className="my-4">
          <label className="text-xl mr-4 text-gray-500">Author</label>
          <input
            type="text"
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
            className="border-2 border-gray-500 px-4 py-2 w-full"
          />
        </div>
        <div className="my-4">
          <label className="text-xl mr-4 text-gray-500">Publish Year</label>
          <input
            type="text"
            value={publishYear}
            onChange={(e) => setPublishYear(e.target.value)}
            className="border-2 border-gray-500 px-4 py-2 w-full"
          />
        </div>
        <div className="flex flex-row justify-center">
          {/* <button
            className="p-2 bg-gray-300 m-8 w-1/2"
            onClick={() => navigate("/")}
          >
            Cancel
          </button> */}
          <button className="p-2 bg-sky-300 m-8 w-1/2" onClick={handleEditBook}>
            Save
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditBook;
