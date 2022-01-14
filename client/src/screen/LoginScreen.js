import React, { useState } from "react";
import axios from "axios";
import Loader from "../components/Loader";
import Error from "../components/Error";

function LoginScreen() {
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState();

  async function LoginNow() {
    const UserLogin = {
      email: email,
      password: password,
    };
    try {
      setLoading(true);
      const result = (await axios.post("/api/users/login", UserLogin)).data;
      setLoading(false);

      localStorage.setItem("currentUser", JSON.stringify(result));
      window.location.href = "/home";
    } catch (error) {
      console.log(error);
      setLoading(false);
      setError(true);
    }
  }

  return (
    <div>
      {loading && <Loader />}
      <div className="row justify-content-center ">
        <div className="col-md-5 ">
          {error && <Error message="invalid Credentials" />}
          <div className="bs d-grid gap-3">
            <h2>Login User</h2>

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

            <button className="btn btn-primary mt-3" onClick={LoginNow}>
              Login{" "}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LoginScreen;
