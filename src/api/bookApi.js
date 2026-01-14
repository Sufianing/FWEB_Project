import client from "./client";

export const getBooks = (q) =>
  client.get("/book", { params: q ? { q } : {} });

export const getBookById = (id) =>
  client.get(`/book/${id}`);
