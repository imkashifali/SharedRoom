import React, { useState } from "react";
import axios from "axios";
import Loader from "../components/Loader";
import Error from "../components/Error";
import Success from "../components/Success";

function RegistrationScreen() {
  const [name, setname] = useState("");
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");
  const [cpassword, setcpassword] = useState("");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState();
  const [success, setSuccess] = useState();

  async function RegisterNow() {
    if (password === cpassword) {
      const userRegister = {
        name: name,
        email: email,
        password: password,
        cpassword: cpassword,
      };
      console.log(userRegister);

      try {
        setLoading(true);
        const result = (await axios.post("/api/users/register", userRegister))
          .data;
        console.log(result);
        setLoading(false);
        setSuccess(true);
        setname("");
        setemail("");
        setpassword("");
        setcpassword("");
      } catch (error) {
        console.log(error);
        setLoading(false);
        setError(true);
      }
    } else {
      alert("Password Not Matched");
    }
  }

  return (
    <div>
      {loading && <Loader />}
      {error && <Error />}

      <div className="row justify-content-center mt-5">
        <div className="col-md-5">
          {success && <Success message="Registration Successfully Add" />}

          <div className="bs d-grid gap-3">
            <h2>Register User</h2>
            <input
              type="text"
              className="form-control"
              placeholder="Name"
              value={name}
              onChange={(e) => setname(e.target.value)}
            />
            <input
              type="text"
              className="form-control"
              placeholder="Email"
              value={email}
              onChange={(e) => setemail(e.target.value)}
            />
            <input
              type="password"
              className="form-control"
              placeholder="Password"
              value={password}
              onChange={(e) => setpassword(e.target.value)}
            />
            <input
              type="password"
              className="form-control"
              placeholder="ConfrimPassword"
              value={cpassword}
              onChange={(e) => setcpassword(e.target.value)}
            />
            <button className="btn btn-primary mt-3" onClick={RegisterNow}>
              Register{" "}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default RegistrationScreen;
