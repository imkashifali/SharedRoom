import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import Loader from "../components/Loader";
import Error from "../components/Error";
import moment from "moment";
import StripeCheckout from "react-stripe-checkout";
import Swal from 'sweetalert2'


function BookingScreen() {
  let params = useParams();

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState();
  const [room, setRoom] = useState();

  const roomid = params.roomid;
  const fromdate = moment(params.fromdate, "DD-MM-YYYY");
  const todate = moment(params.todate, "DD-MM-YYYY");

  const totaldays = moment.duration(todate.diff(fromdate)).asDays() + 1;

  const [totalamount, setTotalAmount] = useState();

  useEffect(async () => {
    // (async function() {
      if(!localStorage.getItem("currentUser")){
        window.location.reload='/login'
      }

    try {
      setLoading(true);
      const data = (
        await axios.post("/api/rooms/getRoomById", { roomid: params.roomid })
      ).data;
      setTotalAmount(data.rentperday * totaldays);

      console.log(data);
      setRoom(data);
      setLoading(false);
    } catch (error) {
      setError(true);
      setLoading(false);
    }
  // })();
  }, []);

 
  const onToken = async(token) => {
    const BookingDetails = {
      room,
      userid: JSON.parse(localStorage.getItem("currentUser"))._id,
      fromdate,
      todate,
      totalamount,
      totaldays,
      token
    };
    try {
      setLoading(true);
      const result = await axios.post("/api/bookings/bookroom", BookingDetails);
      setLoading(false)
      Swal.fire("Congratulations","Your Rooms Booked Successfully","success").then(result=>{
        window.location.href='/bookings'
      })
    } catch (error) {
      setLoading(false)
      Swal.fire("Oops","Something Went Wrong","error")

    }
  };
  return (
    <div className="m-5">
      {loading ? (
        <h1>
          <Loader />
        </h1>
      ) : room ? (
        <div className="row justify-content-center mt-5 bs">
          <div className="col-md-5">
            <h1>{room.name}</h1>
            <img src={room.imageurls[0]} className="bigImg" />
          </div>
          <div className="col-md-5">
            <div style={{ textAlign: "right" }}>
              <h1>Booking Details</h1>
              <hr />
              <b>
                <p>
                  Name :{JSON.parse(localStorage.getItem("currentUser")).name}{" "}
                </p>
                <p>Form Date :{params.fromdate} </p>
                <p>To Date : {params.todate}</p>
                <p>Max Count : {room.maxcount}</p>
              </b>
            </div>
            <div style={{ textAlign: "right" }}>
              <h1>Amount</h1>
              <hr />
              <b>
                <p>Total Days : {totaldays}</p>
                <p>Rent Per Day : {room.rentperday}</p>
                <p>Total Amount :{totalamount}</p>
              </b>
            </div>
            <div style={{ float: "right" }}>
              <StripeCheckout
                amount={totalamount * 100}
                token={onToken}
                currency="INR"
                stripeKey="pk_test_TdqXCqxUgHLKjdJ7woXpluN400eDwSd2LD"
              >
                <button className="btn btn-primary">
                  Pay Now
                </button>
              </StripeCheckout>
            </div>
          </div>
        </div>
      ) : (
        <Error />
      )}
    </div>
  );
}

export default BookingScreen;
