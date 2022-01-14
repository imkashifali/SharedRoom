const express = require("express");
const router = express.Router();

const Room = require("../models/room");

//Get All Rooms
router.get("/getAllRooms", async (req, res) => {
  try {
    const rooms = await Room.find({});
    // return res.json({ rooms });
    res.send(rooms);
  } catch (error) {
    return res.status(400).json({ message: error });
  }
});

//Get Single Book Room
router.post("/getRoomById", async (req, res) => {
  const roomid = req.body.roomid;
  try {
    const room = await Room.findOne({ _id: roomid });
    res.send(room);
  } catch (error) {
    return res.status(400).json({ message: error });
  }
});

router.post("/addingRoom", async (req, res) => {
  try {
    const newroom = new Room(req.body);
    await newroom.save();

    res.send("now room add successfully ");
  } catch (error) {
    return res.status(400).json({ error });
  }
});

module.exports = router;
