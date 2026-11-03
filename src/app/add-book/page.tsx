import type { Metadata } from "next";
import AddBookForm from "./addBook";


export const metadata: Metadata = {
  title: "Add Book",
};

const AddBookPage = () => {
  return <AddBookForm />;
};

export default AddBookPage;