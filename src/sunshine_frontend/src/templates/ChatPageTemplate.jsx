import React, { Children, useEffect, useState } from "react";
import Sidebar from "../pages/chat_page/Sidebar";
import { useAuth } from "../use-auth-client";
import { useNavigate } from "react-router-dom";
import { useIsFetching, useQuery } from "@tanstack/react-query";
import { ChakraProvider } from "@chakra-ui/react";
import Loader from "../components/Loader";

export default function ChatPageTemplate({ children }) {
  const { checkAuthentication } = useAuth();

  const { isLoading, error } = useQuery({
    queryKey: ["checkAuthentication"],
    queryFn: checkAuthentication,
  });

  if (isLoading) return <Loader />;
  if (error) return <div>error</div>;

  return (
    <>
      <ChakraProvider>
        <div className="flex w-screen h-screen bg-yellow-50 overflow-y-hidden">
          <Sidebar />
          {children}
        </div>
      </ChakraProvider>
    </>
  );
}
