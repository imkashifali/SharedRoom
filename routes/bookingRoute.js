const express = require("express");
const router = express.Router();
const moment = require("moment");
const stripe = require("stripe")("sk_test_DooioTfTHYU1biN5xDqFUFzT00r3uDAzMY");
const Bookings = require("../models/booking");
const Room = require("../models/room");
const { v4: uuidv4 } = require("uuid");

router.post("/bookroom", async (req, res) => {
  const { room, userid, fromdate, todate, totalamount, totaldays, token } =
    req.body;

  try {
    const customer = await stripe.customers.create({
      email: token.email,
      source: token.id,
    });

    const payment = await stripe.changes.create(
      {
        amount: totalamount * 100,
        customer: customer.id,
        currency: "inr",
        recipt_email: token.email,
      },
      { idempotencyKey: uuidv4() }
    );
    if (payment) {
      const newbooking = new Bookings({
        room: room.name,
        roomid: room._id,
        userid,
        fromdate: moment(fromdate).format("DD-MM-YYYY"),
        todate: moment(todate).format("DD-MM-YYYY"),
        totalamount,
        totaldays,
        transactionId: "1234",
      });
      const booking = await newbooking.save();
      const newRoom = await Room.findOne({ _id: room._id });
      newRoom.currentbookings.push({
        bookingid: booking._id,
        fromdate: moment(fromdate).format("DD-MM-YYYY"),
        todate: moment(todate).format("DD-MM-YYYY"),
        userid: userid,
        status: booking.status,
      });
      await newRoom.save();
      res.send("room booked successfully");
    }

    res.send("Payment Successfully , Room Booked Now");
  } catch (error) {
    res.status(400).json({ error });
  }
});

router.post("/getBookingsByUserId", async(req, res) => {
  const userid = req.body.userid;

  try {
    const bookings =await Bookings.find({ userid: userid });
    res.send(bookings);
  } catch (error) {
    return res.status(400).json({ error });
  }
});

router.post('/cancelBooking', async(req, res) => {
  const {bookingid, roomid} = req.body;


  try {
    const bookingItem = await Bookings.findOne({_id:bookingid})
    
    bookingItem.status = "Cancelled"
    await bookingItem.save()
    const room = await Room.findOne({_id:roomid})

    const bookings=room.currentbookings

    const temp = bookings.filter(booking=>booking.bookingid.toString()!==bookingid)
    room.currentbookings=temp
    await room.save()
    res.send("Your BOOKING Cancelled successfully")
  } catch (error) {
    return res.status(400).json({error})
  }
});

router.get('/getAllBooking', async(req, res) => {
  try {
    const booking = await Bookings.find()
    res.send(booking)
  } catch (error) {
   return res.status(400).json({error})
  }
});
module.exports = router;
