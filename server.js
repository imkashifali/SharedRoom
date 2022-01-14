const express = require("express");
const app = express();
const DBFile = require("./db");
app.use(express.json())

const roomRouter = require("./routes/roomRoute");
const usersRouter = require("./routes/usersRoute")
const bookingsRouter = require("./routes/bookingRoute")

app.use("/api/rooms", roomRouter);
app.use("/api/users", usersRouter);
app.use("/api/bookings", bookingsRouter);


const port = process.env.Port || 5000;

app.listen(port, () => console.log(`Node Server Running Successfully on ${port}`));
