import { betterAuth } from "better-auth";
import { MongoClient } from "mongodb";
import { mongodbAdapter } from "@better-auth/mongo-adapter";

const client = new MongoClient(process.env.MONGODB_URI!);
const db = client.db('booknook-server');

export const auth = betterAuth({
    emailAndPassword: { 
    enabled: true, 
    autoSignIn: false,
  }, 
  database: mongodbAdapter(db, {
    client,
  }),
});