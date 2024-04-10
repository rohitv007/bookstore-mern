import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { MdOutlineAddBox } from "react-icons/md";
import Spinner from "../components/Spinner";
import BooksTable from "../components/book/BooksTable";
import BooksCard from "../components/book/BooksCard";

const Home = () => {
  // fetch - all books

  const [allBooks, setAllBooks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showType, setShowType] = useState("table");

  const books_url = "http://localhost:3000";

  useEffect(() => {
    const controller = new AbortController();

    setLoading(true);
    (async () => {
      try {
        const res = await fetch(`${books_url}/books`, {
          method: "GET",
          signal: controller.signal,
        });
        const data = await res.json();
        // console.log(data);
        // console.log(data.allBooks);
        setAllBooks(data.allBooks);
        setLoading(false);
      } catch (error) {
        // console.log(error);
        setLoading(false);
      }
    })();
    return () => controller.abort();
  }, [books_url]);

  // Function to handle screen resize event
  const handleResize = () => {
    if (window.innerWidth < 768) {
      console.log("reached md");
      setShowType("card");
    } else {
      setShowType("table");
    }
  };

  useEffect(() => {
    window.addEventListener("resize", handleResize);
    handleResize();
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div className="p-4 h-screen">
      <div className="flex justify-center items-center gap-x-4">
        <button
          className="bg-sky-300 hover:bg-sky-600 px-4 py-1 rounded-lg"
          onClick={() => setShowType("table")}
        >
          Table
        </button>
        <button
          className="bg-sky-300 hover:bg-sky-600 px-4 py-1 rounded-lg"
          onClick={() => setShowType("card")}
        >
          Card
        </button>
      </div>
      <div className="flex justify-between items-center">
        <h1 className="my-8 text-2xl">BookWave</h1>
        <Link to="/books/create">
          <MdOutlineAddBox className="text-sky-800 text-4xl" />
        </Link>
      </div>
      {loading ? (
        <Spinner />
      ) : showType === "table" ? (
        <BooksTable books={allBooks} />
      ) : (
        <BooksCard books={allBooks} />
      )}
    </div>
  );
};

export default Home;
