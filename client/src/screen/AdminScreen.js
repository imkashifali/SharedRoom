import React, { useEffect, useState } from "react";
import { Tabs } from "antd";
import axios from 'axios';
import Loader from "../components/Loader";
import Error from "../components/Error";
import Swal from 'sweetalert2'

const { TabPane } = Tabs;

function AdminScreen() {
  if (!JSON.parse(localStorage.getItem("currentUser")).isAdmin) {
    window.location.href = "/home";
  }
  return (
    <div>
      <h2 className="text-center">Admin Panel</h2>
      <div className="mt-3 ml-3 mr-3 bs">
        <Tabs defaultActiveKey="1">
          <TabPane tab="Bookings" key="1">
            <Bookings />
          </TabPane>
          <TabPane tab="Rooms" key="2">
            <Rooms />
          </TabPane>
          <TabPane tab="AddRoom" key="3">
            <AddRoom />
          </TabPane>
          <TabPane tab="Users" key="4">
            <Users />
          </TabPane>
        </Tabs>
      </div>
    </div>
  );
}

export default AdminScreen;

export const Bookings = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState();

  useEffect(async () => {
    try {
      const data = (await axios.get("/api/bookings/getAllBooking")).data;
      console.log(data);
      setBookings(data);
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
      setError(error);
    }
  }, []);
  return (
    <div className="row">
      <div className="col-md-10">
        <h1>Bookings</h1>
        {loading && <Loader />}
        {error && <Error />}

        <table className="table table-bordered table-dark">
          <thead className="bs thead-dark">
            <tr>
              <th>Booking Id</th>
              <th>User Id</th>
              <th>Room </th>
              <th>From </th>
              <th>To </th>
              <th>Status </th>
            </tr>
          </thead>
          <tbody>
            {bookings.length &&
              bookings.map((book) => {
                return (
                  <tr>
                    <td>{book._id}</td>
                    <td>{book.userid}</td>
                    <td>{book.room}</td>
                    <td>{book.fromdate}</td>
                    <td>{book.todate}</td>
                    <td>{book.status}</td>
                  </tr>
                );
              })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export const Rooms = () => {
  const [rooms, setrooms] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState();

  useEffect(async () => {
    try {
      const data = (await axios.get("/api/rooms/getAllRooms")).data;
      console.log(data);
      setrooms(data);
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
      setError(error);
    }
  }, []);
  return (
    <div className="row">
      <div className="col-md-10">
        <h1>Rooms Listing</h1>
        {loading && <Loader />}
        {error && <Error />}

        <table className="table table-bordered table-dark">
          <thead className="bs thead-dark">
            <tr>
              <th>Room Id</th>
              <th>Name</th>
              <th>Type </th>
              <th>Rent Per Day </th>
              <th>Max Count </th>
              <th>Phone Number </th>
            </tr>
          </thead>
          <tbody>
            {rooms.length &&
              rooms.map((room) => {
                return (
                  <tr>
                    <td>{room._id}</td>
                    <td>{room.name}</td>
                    <td>{room.type}</td>
                    <td>{room.rentperday}</td>
                    <td>{room.maxcount}</td>
                    <td>{room.phonenumber}</td>
                  </tr>
                );
              })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export const Users = () => {
  const [users, setusers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState();

  useEffect(async () => {
    try {
      const data = (await axios.get("/api/users/getAllUsers")).data;
      console.log(data);
      setusers(data);
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
      setError(error);
    }
  }, []);
  return (
    <div className="row">
      <div className="col-md-10">
        <h1>Users Listing</h1>
        {loading && <Loader />}
        {error && <Error />}

        <table className="table table-bordered table-dark">
          <thead className="bs thead-dark">
            <tr>
              <th>User Id</th>
              <th>User Name</th>
              <th>User Email </th>
              <th>Is Admin </th>
            </tr>
          </thead>
          <tbody>
            {users.length &&
              users.map((user) => {
                return (
                  <tr>
                    <td>{user._id}</td>
                    <td>{user.name}</td>
                    <td>{user.email}</td>
                    <td>{user.isAdmin ? "YES" : "NO"}</td>
                  </tr>
                );
              })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export const AddRoom = () => {

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState();

  const [name, setname] = useState('');
  const [rentperday, setrentperday] = useState();
  const [maxcount, setmaxcount] = useState();
  const [description, setdescription] = useState();
  const [phonenumber, setphonenumber] = useState();
  const [type, settype] = useState();
  const [imageurl1, setimageurl1] = useState();
  const [imageurl2, setimageurl2] = useState();
  const [imageurl3, setimageurl3] = useState();

  async function AddMyRoom() {

    var newRoom = {
      name,
      rentperday,
      maxcount,
      description,
      phonenumber,
      type,
      imageurls: [imageurl1, imageurl2, imageurl3]
    };
    console.log(newRoom);

    try {
      setLoading(true)
      const result = await (await axios.post('/api/rooms/addingRoom',newRoom)).data;
      console.log(result);
      setLoading(false)
      Swal.fire("cong", "your bookings has been upload","success").then(result=>{
        window.location.reload()
      })
    } catch (error) {
      console.log(error.response);
      setLoading(false)
      Swal.fire("Oops","something went wrong","error")

    }
  }
  return (
    <div className="row ">
      <div className="col-md-5 d-grid gap-3">
        <input
          type='text'
          placeholder="Room Name"
          className="form-control"
          value={name}
          onChange={(e) => {
            setname(e.target.value);
          }}
        />
        <input
          type='text'
          placeholder="Rent Per Day"
          className="form-control"
          value={rentperday}
          onChange={(e) => {
            setrentperday(e.target.value);
          }}
        />
        <input
          type='text'
          placeholder="Max Count"
          className="form-control"
          value={maxcount}
          onChange={(e) => {
            setmaxcount(e.target.value);
          }}
        />
        <input
          type='text'
          placeholder="Description"
          className="form-control"
          value={description}
          onChange={(e) => {
            setdescription(e.target.value);
          }}
        />
        <input
          type='text'
          placeholder="Phone Number"
          className="form-control"
          value={type}
          onChange={(e) => {
            settype(e.target.value);
          }}
        />
      </div>
      <div className="col-md-5 d-grid gap-3">
        <input
          type='text'
          placeholder="Type"
          className="form-control"
          value={phonenumber}
          onChange={(e) => {
            setphonenumber(e.target.value);
          }}
        />
        <input
          type='text'
          placeholder="ImageUrl 1"
          className="form-control"
          value={imageurl1}
          onChange={(e) => {
            setimageurl1(e.target.value);
          }}
        />
        <input
          type='text'
          placeholder="ImageUrl 2"
          className="form-control"
          value={imageurl2}
          onChange={(e) => {
            setimageurl2(e.target.value);
          }}
        />
        <input
          type='text'
          placeholder="ImageUrl 3"
          className="form-control"
          value={imageurl3}
          onChange={(e) => {
            setimageurl3(e.target.value);
          }}
        />
        <div className="d-flex justify-content-end">
          <button className="btn btn-primary" onClick={AddMyRoom}>
            Add Room
          </button>
        </div>
      </div>
    </div>
  );
};
