import React, { useEffect, useState } from "react";
import { useAuth } from "../../../use-auth-client";
import { sunshine_chat } from "../../../../../declarations/sunshine_chat";
import { Button, Input, useDisclosure, useQuery } from "@chakra-ui/react";
import AddFriendDialog from "./AddFriendDialog";
import Friend from "./Friend";

export default function FriendList({ activeFriend, setActiveFriend }) {
  const { principal } = useAuth();
  const [friends, setFriends] = useState();
  const [searchFriendName, setSearchFriendName] = useState("");
  const { isOpen, onOpen, onClose } = useDisclosure();

  const fetchFriends = () => {
    sunshine_chat.getAllFriends(principal).then((friends) => {
      // console.log(friends);
      if (friends.ok) {
        const listItems = friends.ok.map((user, idx) => {
          // console.log(user);
          return (
            <Friend
              key={idx}
              name={user.name}
              pfp={user.profileUrl}
              friendPrincipal={user.internet_identity}
              activeFriend={activeFriend}
              setActiveFriend={setActiveFriend}
            />
          );
        });
        setFriends(listItems);
      }
    });
    return true;
  };
  const { isLoading, error } = useQuery({
    queryKey: ["fetchFriends", searchFriendName, friends],
    queryFn: fetchFriends,
  });

  useEffect(() => {
    fetchFriends();
  }, [friends, searchFriendName]);

  return (
    <div className="flex-row h-screen w-[25%] py-3 bg-gray-50 border-solid border-gray-500 border-r border-opacity-50">
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
      <div className="overflow-y-scroll h-[93%] flex flex-col pl-4">
        {!isLoading ? friends : <></>}
      </div>
      <AddFriendDialog isOpen={isOpen} onClose={onClose} />
    </div>
  );
}
