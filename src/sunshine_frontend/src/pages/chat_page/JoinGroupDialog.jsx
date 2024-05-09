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
import { sunshine_chat } from "../../../../declarations/sunshine_chat";
import { useAuth } from "../../use-auth-client";
import { useMutation, useQuery } from "@tanstack/react-query";
import ChatBox from "./ChatBox";
import CreateGroupContent from "./CreateGroupContent";

export default function JoinGroupDialog({ isOpen, onClose }) {
  const [searchedGroupsToJoin, setSearchedGroupsToJoin] = useState();
  const [searchedGroupToJoinName, setSearchedGroupToJoinName] = useState("");
  const { user, principal } = useAuth();
  const { status: joinStatus, mutate: joinMutate } = useMutation({
    mutationKey: ["createGroup"],
    mutationFn: joinGroup,
  });
  async function joinGroup(groupId) {
    console.log(groupId);
    await sunshine_chat.addGroupMember(principal, groupId);
    console.log("successfully joined!");
    closeJoinGroupOverlay();
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
          const listItems = groups.ok.map(([name, description, id]) => (
            <li className="text-left font-productsans relative">
              <h1>{name}</h1>
              <p>{description}</p>
              <button
                // style={joinButtonStyle()}
                // onClick={() => handleJoinClick(id)}
              >
                Join
              </button>
            </li>
          ));

          //   Setting the state with the list of elements
          setSearchedGroupsToJoin(<ul className="pt-4">{listItems}</ul>);
        } else {
          setSearchedGroupsToJoin(
            "Please search for the group's name or description first"
          );
        }
      });
  }, [searchedGroupToJoinName]);
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Join Group</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
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
          <div>{searchedGroupsToJoin}</div>
        </ModalBody>
        <ModalFooter>
          <Button colorScheme="red" mr={3} onClick={onClose}>
            Close
          </Button>
          {/* <Button
            className="bg-cream-custom hover:bg-cream-custom-hover"
            color="white"
          >
            Join Group
          </Button> */}
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}
