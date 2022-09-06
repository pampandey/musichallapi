import functions from "firebase-functions";
import express from "express";
import cors from "cors";
import { getAppointments, createAppointment } from "./src/appointments.js"

const app = express();
app.use(cors());
app.use(express.json());

// app.get(`/test`, (req, res) => {
//   res.send(`Hooray, it works!🔥`);
// });

app.get("/appointments", getAppointments);
app.post("/appointments", createAppointment);

export const api = functions.https.onRequest(app);
