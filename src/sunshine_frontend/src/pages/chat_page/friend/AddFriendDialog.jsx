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
import placeholder from "../../../../../../assets/profilePlaceholder.jpg";

export default function AddFriendDialog({ isOpen, onClose }) {
  const [searchedFriendName, setSearchedFriendName] = useState("");
  const [searchedFriends, setSearchedFriends] = useState();
  const { user, principal } = useAuth();

  const { status: addFriendStatus, mutate: addFriendMutate } = useMutation({
    mutationKey: ["addFriend"],
    mutationFn: addFriend,
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

  async function addFriend(friendPrinciple) {
    await sunshine_chat.addFriend(principal, friendPrinciple)
    setSearchedFriendName("");
    onClose();
    return true;
  }


  useEffect(() => {
    if (searchedFriendName === "") {
      setSearchedFriends(null);
    }
    sunshine_chat
      .getAllUnaddedFriends(searchedFriendName, principal)
      .then((friends) => {
        console.log(friends);
        if (friends.ok) {
          const listItems = friends.ok.map((friend, idx) => (
            <>
              <div
                key={idx}
                onClick={() => addFriend(friend.internet_identity)}
                className={`cursor-pointer text-left hover:bg-cream-custom rounded-xl ease-out transition-all duration-200 p-4 flex flex-col mb-5 box-border`}
              >
                <div className="flex gap-5">
                  <img
                    className="m-0 w-20 h-20 rounded-3xl object-cover"
                    src={
                      friend.profileUrl === "" ? placeholder : friend.profileUrl
                    }
                    alt=""
                  />
                  <div>
                    <div className="font-bold">{friend.name}</div>
                    <div className="text-lg text-gray-600">{friend.email}</div>
                  </div>
                </div>
              </div>
            </>
          ));
          setSearchedFriends(listItems);
        }
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
            {searchedFriends}
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
