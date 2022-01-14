import React, { useEffect, useState } from "react";
import axios from "axios";
import Room from "../components/Room";
import "antd/dist/antd.css";
import Loader from "../components/Loader";
import Error from "../components/Error";
import moment from "moment";
import { DatePicker, Space } from "antd";
const { RangePicker } = DatePicker;

function HomeScreen() {
  const [rooms, setRooms] = useState([]);
  const [loading, setLoading] = useState();
  const [error, setError] = useState();

  const [fromdate, setfromdate] = useState();
  const [todate, settodate] = useState();

  const [duplicateroom, setduplicateroom] = useState([]);
  
  const [searchKeys, setsearchKeys] = useState("");
  const [type, settype] = useState("all");

  useEffect(async () => {
    // (async function() {

    try {
      setLoading(true);
      const data = (await axios.get("/api/rooms/getAllRooms")).data;
      setduplicateroom(data);
      console.log(data);
      setRooms(data);
      setLoading(false);
    } catch (error) {
      setError(true);
      console.log(error);
      setLoading(false);
    }
    // })();
  }, []);

  const filterByDate = (dates) => {
    setfromdate(moment(dates[0]).format("DD-MM-YYYY"));
    settodate(moment(dates[1]).format("DD-MM-YYYY"));

    var temproom = [];
    var availability = false;
    for (const room of duplicateroom) {
      if (room.currentbookings.length > 0) {
        for (const booking of room.currentbookings) {
          if (
            !moment(moment(dates[0]).format("DD-MM-YYYY")).isBetween(
              booking.fromdate,
              booking.todate
            ) &&
            !moment(moment(dates[1]).format("DD-MM-YYYY")).isBetween(
              booking.fromdate,
              booking.todate
            )
          ) {
            if (
              moment(dates[0]).format("DD-MM-YYYY") !== booking.fromdate &&
              moment(dates[0]).format("DD-MM-YYYY") !== booking.todate &&
              moment(dates[1]).format("DD-MM-YYYY") !== booking.fromdate &&
              moment(dates[1]).format("DD-MM-YYYY") !== booking.todate
            ) {
              availability = true;
            }
          }
        }
      }

      if (availability == true || room.currentbookings.length == 0) {
        temproom.push(room);
      }
      setRooms(temproom);
    }
  };
  const filterBySearch = () => {
    const temprooms = duplicateroom.filter((room) =>
      room.name.toLowerCase().includes(searchKeys.toLowerCase())
    );
    setRooms(temprooms);
  };
  const filterByType = (e) => {
    settype(e)
    if(e!=='all'){
      const tempsroom = duplicateroom.filter(
        (room) => room.type.toLowerCase() == e.toLowerCase()
      );
  
      setRooms(tempsroom);
    }else{
      setRooms(duplicateroom);

    }
  };
  return (
    <div className="container">
      <div className="row mt-5 bs">
        <div className="col-md-3">
          <RangePicker format="DD-MM-YYYY" onChange={filterByDate} />
        </div>
        <div className="col-md-5">
          <input
            type="text"
            className="form-control"
            placeholder="searchroom"
            value={searchKeys}
            onChange={(e) => {
              setsearchKeys(e.target.value);
            }}
            onKeyUp={filterBySearch}
          />
        </div>
        <div className="col-md-3">
          <select
            className="form-control"
            value={type}
            onChange={(e) => {
              filterByType(e.target.value);
            }}
          >
            <option value="all">all</option>
            <option value="delux">delux</option>
            <option value="non-delux">non-delux</option>
          </select>
        </div>
      </div>
      <div className="row justify-content-center mt-5">
        {loading ? (
          <h1>
            <Loader />
          </h1>
        ) : (
          rooms.map((room) => {
            return (
              <div className="col-md-9 mt-3">
                <Room room={room} fromdate={fromdate} todate={todate} />
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}

export default HomeScreen;
