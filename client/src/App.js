import "./App.css";
import Navbar from "./components/Navbar";
import HomeScreen from "./screen/HomeScreen";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import BookingScreen from "./screen/BookingScreen";
import LoginScreen from "./screen/LoginScreen";
import RegistrationScreen from "./screen/RegistrationScreen";
import ProfileScreen from "./screen/ProfileScreen";
import AdminScreen from "./screen/AdminScreen";
import LandingScreen from "./screen/LandingScreen";


function App() {
  return (
    <div className="App">
      <Navbar />
      <BrowserRouter>
        <Routes>
          <Route path="/home" element={<HomeScreen />} exact />
          <Route path='/book/:roomid/:fromdate/:todate' element={<BookingScreen />} exact />
          <Route path="/login" element={<LoginScreen />} exact />
          <Route path="/register" element={<RegistrationScreen />} exact />
          <Route path="/profile" element={<ProfileScreen />} exact />
          <Route path="/admin" element={<AdminScreen />} exact />
          <Route path="/" element={<LandingScreen />} exact />




        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
