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
import { useMutation } from "@tanstack/react-query";
import React, { useState } from "react";
import { useAuth } from "../../use-auth-client";
import { sunshine_chat } from "../../../../declarations/sunshine_chat";

export default function CreateGroupDialog({ isOpen, onClose }) {
  const { status: createStatus, mutate: createMutate } = useMutation({
    mutationFn: createGroup,
    mutationKey: ["createGroup"],
    onSuccess: () => {
      onClose();
    },
  });
  const { user, principal } = useAuth();
  const [groupName, setGroupName] = useState("");
  const [groupDescription, setGroupDescription] = useState("");

  async function handleClick() {
    createMutate();
    // console.log("create clicked");
    // console.log(principal)
  }

  async function createGroup() {
    await sunshine_chat.createGroup(groupName, principal, groupDescription);
    // wannaCreate = false;
    setGroupName("");
    setGroupDescription("");
    return true;
  }
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader fontSize="2xl">Create Group</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <div className="flex flex-col gap-4">
            <div className="text-base">
              Enter your group name and description below :)
            </div>
            <Input
              focusBorderColor="orange.400"
              variant="filled"
              placeholder="Group Name"
              size="md"
              onChange={(e) => {
                setGroupName(e.target.value);
              }}
              value={groupName}
            />
            <Input
              focusBorderColor="orange.400"
              variant="filled"
              placeholder="Group Description"
              size="md"
              onChange={(e) => {
                setGroupDescription(e.target.value);
              }}
              value={groupDescription}
            />
          </div>
        </ModalBody>
        <ModalFooter>
          <Button colorScheme="red" mr={3} onClick={onClose}>
            Close
          </Button>
          {createStatus !== "pending" ? (
            <Button
              className="bg-cream-custom hover:bg-cream-custom-hover"
              color="white"
              onClick={handleClick}
            >
              Create Group
            </Button>
          ) : (
            <Button
              isLoading
              className="bg-cream-custom hover:bg-cream-custom-hover"
              color="white"
            />
          )}
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}
