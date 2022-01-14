import React from "react";
import ReactDOM from "react-dom";
import { Link } from "react-router-dom";
import AOS from 'aos';
import 'aos/dist/aos.css'; // You can also use <link> for styles
// ..
AOS.init({
    duration:"2000"
});

function LandingScreen() {
  return (
    <div className="row landing">
        <div className="col-md-12 text-center">
      <h2 data-aos="zoom-in" style={{color:"white", fontSize:"150px"}}>ShareRooms</h2>
      <h3 data-aos="zoom-out" style={{color:"white"}}>There is only on Boss</h3>

      <Link to='/home'>
        <button style={{color:"black"}} className="btn btn-primary">Get Started</button>
      </Link>
    </div>
    </div>
  );
}

export default LandingScreen;
