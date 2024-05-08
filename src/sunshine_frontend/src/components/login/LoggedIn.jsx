import React, { useEffect, useState } from "react";
import { useAuth } from "../../use-auth-client";
import { useNavigate } from "react-router-dom";
import ChakraTemplate from "../../templates/ChakraTemplate";
import { Button, Input } from "@chakra-ui/react";
import { useQuery } from "@tanstack/react-query";

const whoamiStyles = {
  border: "1px solid #1a1a1a",
  marginBottom: "1rem",
};

function LoggedIn() {
  const [result, setResult] = useState("");
  const [name, setName] = useState("");
  const [dob, setDob] = useState("");
  const { user, logout, getUser } = useAuth();
  const [email, setEmail] = useState("");
  const [isUpdating, setIsUpdating] = useState(false);
  const navigate = useNavigate();

  const { data, isLoading, error } = useQuery({
    queryKey: ["getUser"],
    queryFn: getUser,
  });

  const handleRegister = () => {
    setIsUpdating(true);
    // sunshine_backend.tryFuzz();
    async function tryRegister() {
      if (data.err) {
        const registerFlag = await user.register(name, email, dob);
        console.log(registerFlag);
        if (registerFlag == true) {
          setIsUpdating(false);
        }
      } else {
        const updateFlag = await user.updateUser(
          data.ok.internet_identity,
          name,
          email,
          dob
        );
        if (updateFlag == true) {
          setIsUpdating(false);
        }
      }
    }
    tryRegister();
  };

  useEffect(() => {
    if (!isLoading) {
      if (data.ok) {
        setName(data.ok.name);
        setEmail(data.ok.email);
        setDob(data.ok.birth_date);
      }
    }
  }, [data, isLoading]);

  if (isLoading) return <div>loading</div>;

  return (
    <ChakraTemplate>
      <div className="flex justify-center items-center">
        <div className="relative flex flex-col top-[35vh] gap-3 text-center items-center bg-slate-50 w-[30vw] p-3 rounded-xl drop-shadow-lg">
          <div className="text-teal-custom font-bold text-3xl">
            Profile Page
          </div>
          <div className="flex gap-5 text-lg container items-center">
            <div className="min-w-14">Name</div>
            <Input
              focusBorderColor="teal.400"
              variant="filled"
              placeholder="Name"
              size="md"
              onChange={(e) => setName(e.target.value)}
              value={name}
            />
          </div>
          <div className="flex gap-5 text-lg container items-center">
            <div className="min-w-14">Email</div>
            <Input
              focusBorderColor="teal.400"
              variant="filled"
              placeholder="Email"
              size="md"
              onChange={(e) => setEmail(e.target.value)}
              value={email}
            />
          </div>
          <div className="flex gap-5 text-lg container items-center">
            <div className="min-w-14">DOB</div>
            <Input
              focusBorderColor="teal.400"
              variant="filled"
              placeholder="Date of Birth"
              size="md"
              type="date"
              onChange={(e) => setDob(e.target.value)}
              value={dob}
            />
          </div>
          {/* <button type="button" id="loginButton" onClick={login}>
        Log in
      </button> */}
          {!isUpdating ? (
            <Button
              colorScheme="teal"
              size="md"
              variant="solid"
              className="w-full"
              onClick={handleRegister}
            >
              Update Data
            </Button>
          ) : (
            <>
              <Button
                colorScheme="teal"
                size="md"
                variant="solid"
                className="w-full"
                isLoading
              />
            </>
          )}

          <Button
            colorScheme="red"
            size="md"
            variant="solid"
            className="w-full"
            onClick={() => {
              logout();
              window.location.reload();
            }}
          >
            Log Out
          </Button>
        </div>
      </div>
    </ChakraTemplate>
  );
  {
    /* <div className="container">
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
        /> */
  }
  {
    /* <p>{result}</p> */
  }
  {
    /* <button id="logout" onClick={logout}>
          log out
        </button>
        <div>
          <div id="regisForm">
            <label htmlFor="username">Name: </label>
            <input
              id="username"
              type="text"
              onChange={(event) => setName(event.target.value)}
            />
            <label htmlFor="dob">Date of Birth: </label>
            <input
              id="dob"
              type="date"
              onChange={(event) => setDOB(event.target.value)}
            />
            <label htmlFor="email">E-mail Address: </label>
            <input
              id="email"
              type="email"
              onChange={(event) => setEmail(event.target.value)}
            />
            <button onClick={handleRegister}>Add Data</button>
          </div>
          {currentName}
        </div>
      </div> */
  }
}

export default LoggedIn;
