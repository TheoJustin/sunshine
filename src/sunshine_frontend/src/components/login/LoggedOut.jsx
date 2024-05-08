import React from "react";
import { useAuth } from "../../use-auth-client";
import { Button, ChakraProvider } from "@chakra-ui/react";
import ChakraTemplate from "../../templates/ChakraTemplate";

function LoggedOut() {
  const { login } = useAuth();

  return (
    <ChakraTemplate>
      <div className="container">
        <h1>Internet Identity Clienasdsadt</h1>
        <h2>You are not authenticated</h2>
        <p>To log in, click this button!</p>
        {/* <button type="button" id="loginButton" onClick={login}>
        Log in
      </button> */}
        <Button colorScheme="teal" size="md" variant="solid">
          Log in
        </Button>
      </div>
    </ChakraTemplate>
  );
}

export default LoggedOut;
