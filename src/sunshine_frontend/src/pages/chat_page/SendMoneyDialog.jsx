import {
  Button,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { useAuth } from "../../use-auth-client";
import { sunshine_backend } from "../../../../declarations/sunshine_backend";
import { useQuery } from "@tanstack/react-query";

export default function SendMoneyDialog({ isOpen, onClose, passedPrinciple }) {
  const { principal } = useAuth();

  const getUserDetail = async () => {
    return await sunshine_backend.getUserById(principal);
  };
  const getFriendDetail = async () => {
    console.log(passedPrinciple);
    if (passedPrinciple && passedPrinciple !== "") {
      return await sunshine_backend.getUserById(passedPrinciple);
    }
  };

  const { data, isLoading, error } = useQuery({
    queryKey: ["getUserDetail"],
    queryFn: getUserDetail,
  });

  const { data: friendData } = useQuery({
    queryKey: ["getFriendDetail", passedPrinciple],
    queryFn: getFriendDetail,
  });

  useEffect(() => {
    getFriendDetail();
    getUserDetail();
  }, []);

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader fontSize="2xl">Send Money</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <div className="flex flex-col gap-4">
            <div className="text-lg">{`Your Balance : ${
              data && data.ok && data.ok.money
            }`}</div>
            <div className="text-lg">{`Recipient's Name : ${
              friendData && friendData.ok && friendData.ok.name
            }`}</div>

            <div className="text-base">Please input your desired amount</div>
            <Input
              focusBorderColor="orange.400"
              variant="filled"
              placeholder="Total Nominal"
              size="md"
              type="number"
            />
          </div>
        </ModalBody>
        <ModalFooter>
          <Button colorScheme="red" onClick={onClose}>
            Close
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}
