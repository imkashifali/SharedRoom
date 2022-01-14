import React from "react";

function Navbar() {
  const user = JSON.parse(localStorage.getItem("currentUser"));
  const userLogout = () => {
    localStorage.removeItem("currentUser");
    window.location.href = "/login";
  };
  return (
    <nav className="navbar navbar-expand-lg ">
      <div className="container-fluid">
        <a className="navbar-brand" href="">
          ShareRoom
        </a>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon" style={{color:'white'}}><i class="fas fa-bars"></i></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ms-auto">
            {user ? (
              <>
                <div class="dropdown">
                  <button
                    class="btn btn-secondary dropdown-toggle"
                    type="button"
                    id="dropdownMenuButton1"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                  >
                   <i class="far fa-user"></i> {user.name}
                  </button>
                  <ul
                    class="dropdown-menu"
                    aria-labelledby="dropdownMenuButton1"
                  >
                    <li>
                      <a class="dropdown-item" href="/profile">
                      <i class="fas fa-archway">Profile</i>
                      </a>
                    </li>
                    <li>
                      <a class="dropdown-item" href="#" onClick={userLogout}>
                      <i class="fas fa-sign-out-alt">Logout</i> 
                      </a>
                    </li>
                  </ul>
                </div>
              </>
            ) : (
              <>
                <li className="nav-item">
                  <a className="nav-link active" href="/login">
                    Login
                  </a>
                </li>
                <li className="nav-item">
                  <a className="nav-link" href="/register">
                    Registration
                  </a>
                </li>
              </>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
