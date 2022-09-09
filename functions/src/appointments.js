import dbConnect from "./dbConnect.js";

export async function getAppointments(req, res) {
  const db = dbConnect();
  const collection = await db
    .collection("appointments")
    .get()
    .catch((err) => res.status(500).send(err));
  const appointments = collection.docs.map((doc) => {
    let appointment = doc.data();
    appointment.id = doc.id;
    return appointment;
  });
  res.send(appointments);
}

export async function createAppointment(req, res) {
  const newAppointment = req.body;
  if (!newAppointment) {
    res.status(400).send({ success: false, message: "Invalid request" });
    return;
  }
  const db = dbConnect();
  await db
    .collection(`appointments`)
    .add(newAppointment)
    .then((doc) => res.status(201).send({message: `Document created, ID: ${doc.id}`}))
    .catch((err) => res.status(500).send(err));
}
