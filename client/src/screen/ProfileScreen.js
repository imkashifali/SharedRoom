import React, { useEffect,useState } from "react";
import { Tabs, Tag, Divider } from "antd";
import axios from "axios";
import Swal from 'sweetalert2'

import Loader from "../components/Loader";
import Error from "../components/Error";

const { TabPane } = Tabs;

function ProfileScreen() {
  const user = JSON.parse(localStorage.getItem("currentUser"));

  useEffect(() => {
    if (!user) {
      window.location.href = "/login";
    }
  }, []);

  return (
    <div className="ml-3 mt-3">
      <Tabs defaultActiveKey="1">
        <TabPane tab="Profile" key="1">
          <h2>MyProfile</h2>
          <br />
          <h2>Name: {user.name}</h2>
          <h2>email: {user.email}</h2>
          <h2>Admin: {user.isAdmin ? "YES" : "NO"}</h2>
        </TabPane>
        <TabPane tab="Booking" key="2">
          <MyBookings />
        </TabPane>
      </Tabs>
    </div>
  );
}

export default ProfileScreen;

export function MyBookings() {
  const [bookings, setbookings] = useState([])
  
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState();

  const user = JSON.parse(localStorage.getItem("currentUser"));

  useEffect(async () => {
    try {
      setLoading(true)
      const rooms = (
        await axios.post("/api/bookings/getBookingsByUserId", {
          userid: user._id,
        })
      ).data;
      setbookings(rooms)
      console.log(rooms);
      setLoading(false)
    } catch (error) {
      console.log(error);
      setLoading(false)
      setError(error)
    }
  }, []);
const cancelBooking=async(bookingid, roomid)=>{
  try {
    setLoading(true)
    const result = (await axios.post("/api/bookings/cancelBooking",bookingid, roomid)).data;
    console.log(result)
    setLoading(false)
    Swal.fire("cong", "your bookings has been cancelled","success").then(result=>{
      window.location.reload()
    })
  } catch (error) {
    console.log(error)
    setLoading(false)
    Swal.fire("Oops","something went wrong","error")
  }
}
  return (
    <div>
      <div className="row">
        <div className="col-md-6">
        <h1>My Bookings</h1>
          {loading && <Loader/>}
          {bookings && (bookings.map(booking=>{
            return <div className="bs">
              <p><b>{booking.room}</b></p>
              <p><b>bookingID</b>:{booking._id}</p>
              <p><b>CheckIT</b>:{booking.fromdate}</p>
              <p><b>CheckOut</b>:{booking.todate}</p>
              <p><b>Amount</b>:{booking.totalamount}</p>
              <p><b>Status</b>:
              {booking.status == "booked" ? (<Tag color="orange">Cancelled</Tag>) : (<Tag color="green">Confirmed</Tag>)}</p>
              {booking.status !== 'canceled' && (
                <div className="text-right">
                <button className="btn btn-primary" onClick={()=>{cancelBooking(booking._id, booking.roomid)}}>Booking Cancel</button>
              </div>
              )}
            </div>
          }))}
        </div>
      </div>
    </div>
  );
}
