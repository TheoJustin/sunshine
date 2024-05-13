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
  useToast,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { useAuth } from "../../../use-auth-client";
import { useMutation, useQuery } from "@tanstack/react-query";
import { sunshine_chat } from "../../../../../declarations/sunshine_chat";
import placeholder from "../../../../../../assets/profilePlaceholder.jpg";
import MiniLoaderSmall from "../../../components/MiniLoaderSmall";
import Snackbar from "../../../components/Snackbar";
import { FaCircleCheck } from "react-icons/fa6";

export default function AddFriendDialog({ isOpen, onClose, fetchFriends }) {
  const [searchedFriendName, setSearchedFriendName] = useState("");
  const [searchedFriends, setSearchedFriends] = useState();
  const { user, principal } = useAuth();
  const { status: addFriendStatus, mutate: addFriendMutate } = useMutation({
    mutationKey: ["addFriend"],
    mutationFn: addFriend,
  });

  const { status: fetchUnaddedStatus, mutate: fetchUnaddedMutate } =
    useMutation({
      mutationKey: ["fetchFriends"],
      mutationFn: fetchAllUnaddedFriends,
    });
  const toast = useToast();

  // const { data, isLoading } = useQuery({
  //   queryKey: ["getAllUnaddedFriends", searchedFriendName],
  //   queryFn: getAllUnaddedFriends
  // })

  async function fetchAllUnaddedFriends() {
    if (searchedFriendName === "") {
      setSearchedFriends(
        <div className="text-base text-center items-center text-gray-400">
          Please search for the friend's name first
        </div>
      );
    } else {
      const friends = await sunshine_chat.getAllUnaddedFriends(
        searchedFriendName,
        principal
      );
      if (friends.ok) {
        if (friends.ok.length == 0) {
          setSearchedFriends(
            <div className="text-base text-gray-400">No user found</div>
          );
          return;
        }
        const listItems = friends.ok.map((friend, idx) => (
          <>
            <div
              key={idx}
              onClick={() => addFriendMutate(friend.internet_identity)}
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
        // setSearchedFriends(listItems);
        setSearchedFriends(<ul className="space-y-3">{listItems}</ul>);
      }
    }
  }

  async function addFriend(friendPrinciple) {
    await sunshine_chat.addFriend(principal, friendPrinciple);
    setSearchedFriendName("");
    fetchFriends();
    onClose();
    toast({
      duration: 5000,
      isClosable: true,
      position: "bottom-right",
      render: () => (
        <Snackbar
          bgColor="bg-green-600"
          icon={<FaCircleCheck color="white" />}
          title="Success"
          description="Friend added"
        />
      ),
    });
    return true;
  }

  useEffect(() => {
    // if (searchedFriendName === "") {
    //   setSearchedFriends("Search for your friend's name");
    // }
    // sunshine_chat
    //   .getAllUnaddedFriends(searchedFriendName, principal)
    //   .then((friends) => {
    //     console.log(friends);
    //     if (friends.ok) {
    //       const listItems = friends.ok.map((friend, idx) => (
    //         <>
    //           <div
    //             key={idx}
    //             onClick={() => addFriendMutate(friend.internet_identity)}
    //             className={`cursor-pointer text-left hover:bg-cream-custom rounded-xl ease-out transition-all duration-200 p-4 flex flex-col mb-5 box-border`}
    //           >
    //             <div className="flex gap-5">
    //               <img
    //                 className="m-0 w-20 h-20 rounded-3xl object-cover"
    //                 src={
    //                   friend.profileUrl === "" ? placeholder : friend.profileUrl
    //                 }
    //                 alt=""
    //               />
    //               <div>
    //                 <div className="font-bold">{friend.name}</div>
    //                 <div className="text-lg text-gray-600">{friend.email}</div>
    //               </div>
    //             </div>
    //           </div>
    //         </>
    //       ));
    //       setSearchedFriends(listItems);
    //       setSearchedFriends(<ul className="space-y-3">{listItems}</ul>);
    //     }
    //   });
    fetchUnaddedMutate();
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
            <p className="text-base text-center ">
              Click on your friend to immediately add them (´◡`)
            </p>
            {fetchUnaddedStatus == "pending" || addFriendStatus == "pending" ? (
              <MiniLoaderSmall />
            ) : (
              <div className="overflow-y-scroll max-h-48 p-3 mt-5 rounded-xl items-center text-center bg-gray-100">
                {searchedFriends}
              </div>
            )}
            {/* {searchedFriends} */}
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
