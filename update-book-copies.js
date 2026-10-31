
import "dotenv/config";
import { MongoClient } from "mongodb";

const uri = process.env.MONGODB_URI || process.env.MONGODB_URL;

if (!uri) {
  throw new Error(
    "MongoDB connection string not found. Check your .env file."
  );
}

const client = new MongoClient(uri);

const books = [
  { title: "The Silent Patient", totalCopies: 5 },
  { title: "Atomic Habits", totalCopies: 8 },
  { title: "A Brief History of Time", totalCopies: 4 },
  { title: "The Alchemist", totalCopies: 6 },
  { title: "Sapiens", totalCopies: 5 },
  {
    title: "Harry Potter and the Philosopher's Stone",
    totalCopies: 7,
  },
  { title: "The Great Gatsby", totalCopies: 3 },
  { title: "On the Origin of Species", totalCopies: 4 },
  { title: "The Diary of a Young Girl", totalCopies: 5 },
  { title: "Charlotte's Web", totalCopies: 6 },
  { title: "Pride and Prejudice", totalCopies: 4 },
  { title: "Cosmos", totalCopies: 5 },
  { title: "The Guns of August", totalCopies: 3 },
  { title: "Matilda", totalCopies: 7 },
  { title: "The Book Thief", totalCopies: 4 },
  { title: "The Selfish Gene", totalCopies: 3 },
  { title: "Guns, Germs, and Steel", totalCopies: 5 },
  { title: "The Little Prince", totalCopies: 6 },
  { title: "To Kill a Mockingbird", totalCopies: 4 },
  { title: "The Gene", totalCopies: 3 },
  { title: "The Wright Brothers", totalCopies: 4 },
  { title: "Charlie and the Chocolate Factory", totalCopies: 6 },
  { title: "The Midnight Library", totalCopies: 5 },
  { title: "The Elegant Universe", totalCopies: 3 },
  { title: "A Long Walk to Water", totalCopies: 4 },
];

async function updateBookCopies() {
  try {
    await client.connect();
    console.log("Connected to MongoDB Atlas!");

    const db = client.db("booknook-server");
    const collection = db.collection("all-books");

    const operations = books.map((book) => ({
      updateOne: {
        filter: { title: book.title },
        update: {
          $set: { totalCopies: book.totalCopies },
        },
      },
    }));

    const result = await collection.bulkWrite(operations);

    console.log("\nUpdate completed!");
    console.log("Matched books:", result.matchedCount);
    console.log("Modified books:", result.modifiedCount);
    console.log("Books not found:", books.length - result.matchedCount);

    const updatedBooks = await collection
      .find(
        { title: { $in: books.map((book) => book.title) } },
        { projection: { _id: 0, title: 1, totalCopies: 1 } }
      )
      .toArray();

    console.table(updatedBooks);
  } catch (error) {
    console.error("Error updating books:", error);
  } finally {
    await client.close();
  }
}

updateBookCopies();
