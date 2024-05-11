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
import { sunshine_chat } from "../../../../../declarations/sunshine_chat";
import { useAuth } from "../../../use-auth-client";
import { useMutation, useQuery } from "@tanstack/react-query";
import placeholder from "../../../../../../assets/profilePlaceholder.jpg";

export default function JoinGroupDialog({ isOpen, onClose }) {
  const [searchedGroupsToJoin, setSearchedGroupsToJoin] = useState();
  const [searchedGroupToJoinName, setSearchedGroupToJoinName] = useState("");
  const { user, principal } = useAuth();
  const { status: joinStatus, mutate: joinMutate } = useMutation({
    mutationKey: ["joinGroup"],
    mutationFn: joinGroup,
  });
  async function joinGroup(groupId) {
    console.log(groupId);
    await sunshine_chat.addGroupMember(principal, groupId);
    console.log("successfully joined!");
    setSearchedGroupToJoinName("");
    onClose();
    return true;
  }
  async function handleJoinClick(groupId) {
    joinMutate(groupId);
    console.log("success di handle join");
    console.log(joinStatus);
  }

  useEffect(() => {
    sunshine_chat
      .getAllUnjoinedGroups(searchedGroupToJoinName, principal)
      .then((groups) => {
        // console.log(searchedGroupName);
        // mapping buat chat
        if (groups.ok) {
          const listItems = groups.ok.map(
            ([name, description, id, imageUrl], idx) => (
              <>
                <div
                  key={idx}
                  onClick={() => handleJoinClick(id)}
                  className={`cursor-pointer text-left hover:bg-cream-custom rounded-xl ease-out transition-all duration-200 mr-2 p-4 flex flex-col mb-5`}
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
          setSearchedGroupsToJoin(<ul className="pt-4">{listItems}</ul>);
        }
        // else {
        //   setSearchedGroupsToJoin(
        //     "Please search for the group's name or description first"
        //   );
        // }
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
          </div>
          <div>{searchedGroupsToJoin}</div>
          {/* {searchedGroupToJoinName === "" &&
          searchedGroupsToJoin.length === 0 ? (
            <div>Please search for the group's name or description first</div>
          ) : (
            <></>
          )}{" "} */}
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
