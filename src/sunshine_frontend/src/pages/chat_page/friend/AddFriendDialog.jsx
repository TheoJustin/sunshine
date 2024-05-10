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
import React, { useState } from "react";

export default function AddFriendDialog({ isOpen, onClose }) {
  const [searchedFriendName, setSearchedFriendName] = useState("");
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
