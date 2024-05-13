import React from "react";
import { useAuth } from "../../use-auth-client";
import { Button, ChakraProvider } from "@chakra-ui/react";
import ChakraTemplate from "../../templates/ChakraTemplate";

function LoggedOut() {
  const { login } = useAuth();

  return (
    <ChakraTemplate>
      <div className="flex justify-center items-center">
        <div className="relative flex flex-col top-[35vh] gap-3 text-center items-center bg-slate-50 w-fit p-7 rounded-xl bg-white/70 shadow-xl backdrop-blur-sm">
          <div className="text-orange-custom font-bold text-3xl">
            Hello Stranger!
          </div>
          <div className="mb-3">You are not authenticated</div>
          {/* <button type="button" id="loginButton" onClick={login}>
        Log in
      </button> */}
          <Button
            size="md"
            variant="solid"
            onClick={login}
            className="w-5/6 bg-orange-custom hover:bg-darkorange-custom"
            color="white"
          >
            Log in
          </Button>
        </div>
      </div>
    </ChakraTemplate>
  );
}

export default LoggedOut;
