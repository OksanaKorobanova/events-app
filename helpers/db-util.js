import { MongoClient } from 'mongodb';

export async function connectDb() {
  const client = await MongoClient.connect(process.env.MONGO_URL);
  return client;
}

export async function insertDoc(client, collection, document) {
  const db = client.db('events');

  const result = await db.collection(collection).insertOne(document);
  return result;
}

export async function getAllDocuments(client, collection, filter = {}) {
  const db = client.db('events');

  const documents = await db
    .collection(collection)
    .find(filter)
    .sort({ _id: -1 }) // lastest comment - first
    .toArray();

  return documents;
}
