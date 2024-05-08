import React from "react";
import { useAuth } from "../../use-auth-client";
import { Button, ChakraProvider } from "@chakra-ui/react";
import ChakraTemplate from "../../templates/ChakraTemplate";

function LoggedOut() {
  const { login } = useAuth();

  return (
    <ChakraTemplate>
      <div className="flex justify-center items-center">
        <div className="relative flex flex-col top-[35vh] gap-3 text-center items-center bg-slate-50 w-fit p-7 rounded-xl drop-shadow-lg">
          <div className="text-teal-custom font-bold text-3xl">Welcome Back!</div>
          <div className="">You are not authenticated</div>
          {/* <button type="button" id="loginButton" onClick={login}>
        Log in
      </button> */}
          <Button colorScheme="teal" size="md" variant="solid" onClick={login} className="w-full">
            Log in
          </Button>
        </div>
      </div>
    </ChakraTemplate>
  );
}

export default LoggedOut;
