import client from "./client";

export const getReservations = (userId) =>
  client.get("/reservation", { params: userId ? { user: userId } : {} });

export const createReservation = (payload) =>
  client.post("/reservation", payload);

export const deleteReservation = (id) =>
  client.delete(`/reservation/${id}`);
