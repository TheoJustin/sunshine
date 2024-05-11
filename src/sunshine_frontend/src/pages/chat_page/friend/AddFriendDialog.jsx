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
import { useAuth } from "../../../use-auth-client";
import { useMutation, useQuery } from "@tanstack/react-query";
import { sunshine_chat } from "../../../../../declarations/sunshine_chat";

export default function AddFriendDialog({ isOpen, onClose }) {
  const [searchedFriendName, setSearchedFriendName] = useState("");
  const { user, principal } = useAuth();
  const { status: joinStatus, mutate: joinMutate } = useMutation({
    mutationKey: ["addFriend"],
    mutationFn: () => {},
  });

  // const { data, isLoading } = useQuery({
  //   queryKey: ["getAllUnaddedFriends", searchedFriendName],
  //   queryFn: getAllUnaddedFriends
  // })

  // async function getAllUnaddedFriends(){
  //   if(searchedFriendName === ""){
  //     return false;
  //   }
  //   return await sunshine_chat.getAllUnaddedFriends(searchedFriendName, principal);
  // }

  async function addFriend() {}

  async function handleClick() {}

  useEffect(() => {
    sunshine_chat
      .getAllUnaddedFriends(searchedFriendName, principal)
      .then((friends) => {
        console.log(friends);
      });
  }, [searchedFriendName]);

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader fontSize="2xl">Add New Friend</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <div className="flex flex-col gap-4">
            <div className="text-base">Enter your friend's name to search</div>
            <Input
              focusBorderColor="orange.400"
              variant="filled"
              placeholder="Friend Name"
              size="md"
              onChange={(e) => {
                setSearchedFriendName(e.target.value);
              }}
              value={searchedFriendName}
            />
          </div>
        </ModalBody>
        <ModalFooter>
          <Button colorScheme="red" mr={3} onClick={onClose}>
            Close
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}
