import { ChakraProvider } from "@chakra-ui/react";
import React from "react";

export default function ChakraTemplate({ children }) {
  return (
    <ChakraProvider>
      <div>{children}</div>
    </ChakraProvider>
  );
}
