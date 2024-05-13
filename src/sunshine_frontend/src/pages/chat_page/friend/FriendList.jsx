import React, { useEffect, useState } from "react";
import { useAuth } from "../../../use-auth-client";
import { sunshine_chat } from "../../../../../declarations/sunshine_chat";
import { Button, Input, useDisclosure} from "@chakra-ui/react";
import AddFriendDialog from "./AddFriendDialog";
import Friend from "./Friend";
import Skeleton from "../../../components/Skeleton";
import { useQuery } from "@tanstack/react-query";

export default function FriendList({ activeFriend, setActiveFriend }) {
  const { principal } = useAuth();
  const [friends, setFriends] = useState();
  const [searchFriendName, setSearchFriendName] = useState("");
  const { isOpen, onOpen, onClose } = useDisclosure();

  async function fetchFriends (){
    const friendsFetched = await sunshine_chat.getAllAvailableFriends(searchFriendName, principal);
    
      // .then((friends) => {
        console.log(friendsFetched);
        if (friendsFetched.ok) {
          const listItems = friendsFetched.ok.map(
            ([name, profileUrl, lastMsg, friendPrincipal], idx) => {
              // console.log(user);
              return (
                <Friend
                  key={idx}
                  name={name}
                  pfp={profileUrl}
                  friendPrincipal={friendPrincipal}
                  lastMsg={lastMsg}
                  activeFriend={activeFriend}
                  setActiveFriend={setActiveFriend}
                />
              );
            }
          );
          setFriends(listItems);
        }
      
    return true;
  };
  const { isLoading, error, isFetching } = useQuery({
    queryKey: ["fetchFriends", searchFriendName],
    queryFn: fetchFriends
  });

  useEffect(() => {
    fetchFriends();
  }, [searchFriendName]);

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
          className="bg-orange-custom hover:bg-darkorange-custom"
          color="white"
          onClick={onOpen}
          padding={5}
        >
          Add Friend
        </Button>
      </div>
      <div className="overflow-y-scroll h-[93%] flex flex-col pl-4">
        {isLoading || isFetching ? <Skeleton /> : friends}
      </div>
      <AddFriendDialog isOpen={isOpen} onClose={onClose} fetchFriends={fetchFriends} />
    </div>
  );
}
