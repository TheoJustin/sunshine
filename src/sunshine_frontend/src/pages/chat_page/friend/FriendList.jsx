import React, { useState } from "react";
import { useAuth } from "../../../use-auth-client";
import { sunshine_chat } from "../../../../../declarations/sunshine_chat";
import { Button, Input, useDisclosure } from "@chakra-ui/react";
import AddFriendDialog from "./AddFriendDialog";

export default function FriendList() {
  const { principal } = useAuth();
  const [friends, setFriends] = useState();
  const [searchFriendName, setSearchFriendName] = useState("");
  const { isOpen, onOpen, onClose } = useDisclosure();

  // const fetchFriends = () => {
  //   sunshine_chat.getAllFriends(principal).then((friend) => {
  //     console.log(friend)
  //   })
  // }

  return (
    <div className="flex h-screen w-[25%] py-3 bg-gray-50 border-solid border-gray-500 border-r border-opacity-50">
      {/* friend list */}
      <div className="flex gap-5 p-4 w-full">
        <Input
          focusBorderColor="orange.400"
          variant="filled"
          placeholder="Search Friend"
          size="md"
          onChange={(e) => {
            setSearchFriendName(e.target.value);
          }}
        />
        <Button
          className="bg-cream-custom hover:bg-cream-custom-hover"
          color="white"
          onClick={onOpen}
        >
          Add Friend
        </Button>
      </div>
      <AddFriendDialog isOpen={isOpen} onClose={onClose} />
    </div>
  );
}
