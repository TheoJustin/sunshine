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
import { useMutation, useQuery } from "@tanstack/react-query";
import { sunshine_chat } from "../../../../declarations/sunshine_chat";

export default function ConfirmationDialog({
  user,
  friend,
  amount,
  isOpen,
  onClose,
}) {
  const sendMoney = async () => {
    await sunshine_chat.sendMoney(
      user.ok.internet_identity,
      friend.ok.internet_identity,
      amount
    );
    onClose();
    return true;
  };

  const { mutate, status } = useMutation({
    mutationKey: ["sendMoney"],
    mutationFn: sendMoney,
  });
  return (
    <Modal isOpen={isOpen} onClose={onClose} isCentered>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader fontSize="2xl">Confirmation</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <div className="flex flex-col gap-4">
            <div className="text-lg">
              Do you confirm that you would like to proceed with this
              transaction?
            </div>
          </div>
        </ModalBody>
        <ModalFooter>
          {status === "pending" ? (
            <Button colorScheme="green" color="white" mr={3} isLoading>
              Confirm
            </Button>
          ) : (
            <Button
              colorScheme="green"
              color="white"
              mr={3}
              onClick={() => mutate()}
            >
              Confirm
            </Button>
          )}

          <Button colorScheme="red" onClick={onClose}>
            Close
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}
