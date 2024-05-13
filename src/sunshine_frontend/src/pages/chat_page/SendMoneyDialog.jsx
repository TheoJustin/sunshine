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
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { useAuth } from "../../use-auth-client";
import { sunshine_backend } from "../../../../declarations/sunshine_backend";
import { useQuery } from "@tanstack/react-query";
import ConfirmationDialog from "./ConfirmationDialog";

export default function SendMoneyDialog({ isOpen, onClose, passedPrincipal }) {
  const { principal } = useAuth();
  const {
    isOpen: isOpenConfirmation,
    onOpen: onOpenConfirmation,
    onClose: onCloseConfirmation,
  } = useDisclosure();

  const getUserDetail = async () => {
    return await sunshine_backend.getUserById(principal);
  };
  const getFriendDetail = async () => {
    // console.log(passedPrinciple);
    if (passedPrincipal && passedPrincipal !== "") {
      return await sunshine_backend.getUserById(passedPrincipal);
    }
  };

  const { data, isLoading, error, refetch } = useQuery({
    queryKey: ["getUserDetail"],
    queryFn: getUserDetail,
  });

  const { data: friendData } = useQuery({
    queryKey: ["getFriendDetail", passedPrincipal],
    queryFn: getFriendDetail,
  });

  const [amount, setAmount] = useState("");
  const toast = useToast();

  useEffect(() => {
    getFriendDetail();
    getUserDetail();
  }, []);

  return (
    <>
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
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
              />
            </div>
          </ModalBody>
          <ModalFooter>
            <Button
              mr={3}
              className="bg-orange-custom hover:bg-darkorange-custom"
              color="white"
              onClick={() => {
                if (amount <= 0) {
                  // toast({
                  //   title: "Nominal must be more than 0!",
                  //   description: "We've created your account for you.",
                  //   status: "error",
                  //   duration: 5000,
                  //   isClosable: true,
                  // });
                  return;
                }
                onOpenConfirmation();
              }}
            >
              Send Money
            </Button>
            <Button colorScheme="red" onClick={onClose}>
              Close
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
      {data && friendData && (
        <>
          <ConfirmationDialog
            user={data}
            friend={friendData}
            isOpen={isOpenConfirmation}
            onClose={onCloseConfirmation}
            amount={amount}
            setAmount={setAmount}
            onCloseSendMoney={onClose}
            refetch={refetch}
          />
        </>
      )}
    </>
  );
}
