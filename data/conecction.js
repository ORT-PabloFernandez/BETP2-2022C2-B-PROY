import { MongoClient } from "mongodb";
import dotenv from "dotenv";
dotenv.config();

//const mongoclient = require("mongodb").MongoClient;

const uri = process.env.MONGO_DB_CS;

const client = new MongoClient(uri);
// TODO: Usar un singleton para evitar generar muchas conecciones abiertas
let instance = null;
async function getConnection() {
  if (instance == null) {
    try {
      instance = await client.connect();
    } catch (error) {
      console.log(error.message);
      throw new Error("Error al establecer la conexión con mongodb");
    }
  }
  return instance;
}

export { getConnection };
