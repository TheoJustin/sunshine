import React, { useState } from "react";
import { useAuth } from "../../use-auth-client";

import { sunshine_backend } from "../../../../declarations/sunshine_backend"


const whoamiStyles = {
  border: "1px solid #1a1a1a",
  marginBottom: "1rem",
};

function LoggedIn() {
  const [result, setResult] = useState("");
  const [name, setName] = useState("");
  const [dob, setDOB] = useState("");
  const { whoamiActor, logout } = useAuth();
  
  function handleRegister(){
    console.log(name);
    sunshine_backend.tryFuzz();
  }

  const handleClick = async () => {
    const whoami = await whoamiActor.whoami();
    setResult(whoami);
  };

  return (
    <div className="container">
      <h1>Internet Identity Client</h1>
      <h2>You are authenticated!</h2>
      <p>To see how a canister views you, click this button!</p>
      <button
        type="button"
        id="whoamiButton"
        className="primary"
        onClick={handleClick}
      >
        Who am I?
      </button>
      <input
        type="text"
        readOnly
        id="whoami"
        value={result}
        placeholder="your Identity"
        style={whoamiStyles}
      />
      {/* <p>{result}</p> */}
      <button id="logout" onClick={logout}>
        log out
      </button>
      <div>
        <div id="regisForm">
          <label htmlFor="username">Name: </label>
          <input id="username" type="text" onChange={(event) => setName(event.target.value)}/>
          <label htmlFor="dob">Date of Birth: </label>
          <input id="dob"  type="date" onChange={(event) => setName(event.target.value)}/>
          <label htmlFor="email">E-mail Address: </label>
          <input id="email"  type="email" />
          <button onClick={handleRegister}>
            Add Data
          </button>
        </div>
      </div>
    </div>
  );
}

export default LoggedIn;