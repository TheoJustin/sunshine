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
import { sunshine_chat } from "../../../../../declarations/sunshine_chat";
import { useAuth } from "../../../use-auth-client";
import { useMutation, useQuery } from "@tanstack/react-query";
import placeholder from "../../../../../../assets/profilePlaceholder.jpg";
import MiniLoader from "../../../components/MiniLoader";
import MiniLoaderSmall from "../../../components/MiniLoaderSmall";
import Snackbar from "../../../components/Snackbar";
import { FaCircleCheck } from "react-icons/fa6";

export default function JoinGroupDialog({ isOpen, onClose }) {
  const [searchedGroupsToJoin, setSearchedGroupsToJoin] = useState();
  const [searchedGroupToJoinName, setSearchedGroupToJoinName] = useState("");
  const { user, principal } = useAuth();
  const [wannaJoin, setWannaJoin] = useState(false);
  const { status: joinStatus, mutate: joinMutate } = useMutation({
    mutationKey: ["joinGroup"],
    mutationFn: joinGroup,
  });
  const toast = useToast();

  async function joinGroup(groupId) {
    // console.log(groupId);
    await sunshine_chat.addGroupMember(principal, groupId);
    // console.log("successfully joined!");
    setSearchedGroupToJoinName("");
    setWannaJoin(false);
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
          description="Successfuly joined the group"
        />
      ),
    });
    return true;
  }
  async function handleJoinClick(groupId) {
    setWannaJoin(true);
    joinMutate(groupId);
    // console.log("success di handle join");
    // console.log(joinStatus);
  }

  useEffect(() => {
    sunshine_chat
      .getAllUnjoinedGroups(searchedGroupToJoinName, principal)
      .then((groups) => {
        // console.log(groups)
        // console.log(searchedGroupName);
        // mapping buat chat

        if (groups.ok) {
          if (groups.ok.length == 0) {
            setSearchedGroupsToJoin(
              <div className="text-base text-gray-400">No groups found</div>
            );
            return;
          }
          const listItems = groups.ok.map(
            ([name, description, id, imageUrl], idx) => (
              <>
                <div
                  key={idx}
                  onClick={() => handleJoinClick(id)}
                  className={`cursor-pointer text-left hover:bg-cream-custom rounded-xl ease-out transition-all duration-200 p-4 flex flex-col`}
                >
                  <div className="flex gap-5">
                    <img
                      className="m-0 w-20 h-20 rounded-3xl object-cover"
                      src={imageUrl === "" ? placeholder : imageUrl}
                      alt=""
                    />
                    <div>
                      <div className="font-bold">{name}</div>
                      <div className="text-lg text-gray-600">{description}</div>
                    </div>
                  </div>
                </div>
              </>
            )
          );

          //   Setting the state with the list of elements
          setSearchedGroupsToJoin(<ul className="space-y-3">{listItems}</ul>);
        } else {
          setSearchedGroupsToJoin(
            <div className="text-base text-center items-center text-gray-400">
              Please search for the group's name or description first
            </div>
          );
        }
      });
  }, [searchedGroupToJoinName]);
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader fontSize="2xl">Join Group</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <div className="flex flex-col gap-4">
            <div className="text-base">Enter group name to search</div>
            <Input
              focusBorderColor="orange.400"
              variant="filled"
              placeholder="Group Name"
              size="md"
              onChange={(e) => {
                setSearchedGroupToJoinName(e.target.value);
              }}
              value={searchedGroupToJoinName}
            />
            <p className="text-base text-center ">
              Click on the group to immediately join (´◡`)
            </p>
          </div>
          {wannaJoin == true ? (
            <MiniLoaderSmall />
          ) : (
            <div className="overflow-y-scroll max-h-48 p-3 mt-5 rounded-xl items-center text-center bg-gray-100">
              {searchedGroupsToJoin}
            </div>
          )}
          {/* {searchedGroupToJoinName === "" &&
          searchedGroupsToJoin.length === 0 ? (
            <div>Please search for the group's name or description first</div>
          ) : (
            <></>
          )}{" "} */}
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
