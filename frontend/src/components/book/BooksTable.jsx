import { Link } from "react-router-dom";
import { MdOutlineDelete } from "react-icons/md";
import { BsInfoCircle } from "react-icons/bs";
import { AiOutlineEdit } from "react-icons/ai";
import PropTypes from "prop-types";

const BooksTable = ({ books }) => {
  return (
    <table className="w-full border-separate border-spacing-2">
      <thead>
        <tr>
          <th className="border border-slate-600 rounded-md">S.No</th>
          <th className="border border-slate-600 rounded-md">Title</th>
          <th className="border border-slate-600 rounded-md max-md:hidden">
            Author
          </th>
          <th className="border border-slate-600 rounded-md max-md:hidden">
            Year of Publish
          </th>
          <th className="border border-slate-600 rounded-md">Operations</th>
        </tr>
      </thead>
      <tbody>
        {books.map((book, index) => {
          // console.log(book);
          const { _id, title, author, publishYear } = book;
          return (
            <tr key={_id} className="h-8">
              <td className="border border-slate-700 rounded-md text-center">
                {index + 1}
              </td>
              <td className="border border-slate-700 rounded-md text-center">
                {title}
              </td>
              <td className="border border-slate-700 rounded-md text-center max-md:hidden">
                {author}
              </td>
              <td className="border border-slate-700 rounded-md text-center max-md:hidden">
                {publishYear}
              </td>
              <td className="border border-slate-700 rounded-md text-center">
                <div className="flex justify-center gap-x-4">
                  <Link to={`/books/details/${_id}`}>
                    <BsInfoCircle className="text-2xl text-green-500" />
                  </Link>
                  <Link to={`/books/edit/${_id}`}>
                    <AiOutlineEdit className="text-2xl text-yellow-500" />
                  </Link>
                  <Link to={`/books/delete/${_id}`}>
                    <MdOutlineDelete className="text-2xl text-red-500" />
                  </Link>
                </div>
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};

BooksTable.propTypes = {
  books: PropTypes.array.isRequired,
};

export default BooksTable;
