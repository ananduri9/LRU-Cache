import { RemoteMongoClient } from "mongodb-stitch-browser-sdk";
import { app } from "./app";
import {
  SERVICE_NAME,
  DB_NAME,
  COLLECTION_NAME
} from "../constants"

// TODO: Initialize a MongoDB Service Client
const mongoClient = app.getServiceClient(
  RemoteMongoClient.factory,
  SERVICE_NAME
);

// TODO: Instantiate a collection handle for todo.items
const items = mongoClient.db(DB_NAME).collection(COLLECTION_NAME);
const metrics = mongoClient.db(DB_NAME).collection("metrics");

export { items };
export { metrics };