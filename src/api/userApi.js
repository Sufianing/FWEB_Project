import client from "./client";

export const getUsers = () => client.get("/user");
export const createUser = (payload) => client.post("/user", payload);
