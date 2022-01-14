import React from "react";

function Error({ message }) {
  return (
    <div class="alert alert-danger" role="alert">
      <h1>{message}</h1>
    </div>
  );
}

export default Error;
