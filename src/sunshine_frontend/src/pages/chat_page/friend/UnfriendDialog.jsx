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
//   import { useAuth } from "../../use-auth-client";
//   import { sunshine_backend } from "../../../../declarations/sunshine_backend";
  import { useMutation, useQuery } from "@tanstack/react-query";
//   import { sunshine_chat } from "../../../../declarations/sunshine_chat";
  import { sunshine_chat } from "../../../../../declarations/sunshine_chat";
  export default function UnfriendConfirmDialog({
    user,
    friend,
    isOpen,
    onClose,
    onCloseProfile,
    refetch
  }) {
    async function unfriend(){
        console.log("unfriending...");
        console.log(user, friend);
        if(user != null){
            const aa = await sunshine_chat.unfriend(user, friend);
            console.log(aa);

        }
        onClose();
        onCloseProfile();
        refetch();
        return true;
    }
  
    const { mutate, status } = useMutation({
      mutationKey: ["unfriend"],
      mutationFn: unfriend,
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
                Are you sure you want to unfriend this user?
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
                onClick={() => {mutate()}}
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
  