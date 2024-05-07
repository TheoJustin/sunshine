import React from "react";
import { useAuth } from "../../use-auth-client";
import { Button } from "@chakra-ui/react";

function LoggedOut() {
  const { login } = useAuth();

  return (
    <div className="container">
      <h1>Internet Identity Clienasdsadt</h1>
      <h2>You are not authenticated</h2>
      <p>To log in, click this button!</p>
      {/* <button type="button" id="loginButton" onClick={login}>
        Log in
      </button> */}
      <Button colorScheme='teal' size='md' variant='solid'>
        Log in
      </Button>
      
    </div>
  );
}

export default LoggedOut;