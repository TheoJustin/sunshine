import React, { useEffect, useState } from "react";
import { useAuth } from "../../use-auth-client";
import { useNavigate } from "react-router-dom";

// import { sunshine_backend } from "../../../../declarations/sunshine_backend"


const whoamiStyles = {
  border: "1px solid #1a1a1a",
  marginBottom: "1rem",
};

function LoggedIn() {
  const [result, setResult] = useState("");
  const [name, setName] = useState("");
  const [dob, setDOB] = useState("");
  const { user, logout } = useAuth();
  const [currentName, setcurrentName] = useState("Hai");
  const [email, setEmail] = useState("");
  const navigate = useNavigate();

  function handleRegister() {
    console.log(name);
    // sunshine_backend.tryFuzz();
    async function tryRegister() {
      const registerFlag = await user.register(name, email, dob);
      console.log(registerFlag);
      if (registerFlag == true) {
        console.log("success!");
        // console.log(isAuthenticated);
        navigate("/");
      }
    }
    tryRegister();
  }

  useEffect(() => {
    async function getUser() {
      // getting user's name
      const name = await user.getName();
      if (name != "Not Found") {
        // Navigate("/");
      }
    }
    getUser();
  }, [user])

  const handleClick = async () => {
    const userPrincipal = await user.whoami();
    setResult(userPrincipal);
    user.getName().then(currName => {
      setcurrentName(currName);
    })
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
          <input id="username" type="text" onChange={(event) => setName(event.target.value)} />
          <label htmlFor="dob">Date of Birth: </label>
          <input id="dob" type="date" onChange={(event) => setDOB(event.target.value)} />
          <label htmlFor="email">E-mail Address: </label>
          <input id="email" type="email" onChange={(event) => setEmail(event.target.value)} />
          <button onClick={handleRegister} >
            Add Data
          </button>
        </div>
        {currentName}
      </div>
    </div>
  );
}

export default LoggedIn;