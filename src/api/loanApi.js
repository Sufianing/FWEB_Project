import client from "./client";

export const getLoans = (userId) =>
  client.get("/loan", { params: userId ? { user: userId } : {} });
