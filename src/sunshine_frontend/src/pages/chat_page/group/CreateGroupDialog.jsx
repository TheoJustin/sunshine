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
import React, { useEffect, useState } from "react";
import { useAuth } from "../../../use-auth-client";
import { sunshine_chat } from "../../../../../declarations/sunshine_chat";
import { uploadImage } from "../../../../../config/cloudinary";

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
  const [groupImage, setGroupImage] = useState("");
  const [imageLoading, setImageLoading] = useState(false);

  async function handleClick() {
    createMutate();
  }

  async function createGroup() {
    console.log("created");
    await sunshine_chat.createGroup(
      groupName,
      principal,
      groupDescription,
      groupImage
    );
    console.log(groupImage);
    // wannaCreate = false;
    setGroupName("");
    setGroupDescription("");
    setGroupImage("");
    return true;
  }

  const handleImage = async (e) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      const validatedFileTypes = [
        "image/jpeg",
        "image/png",
        "image/jpg",
        "image/webp",
      ];

      if (validatedFileTypes.includes(file.type)) {
        try {
          const url = await uploadImage(file, setImageLoading);
          if (url) {
            setGroupImage(url);
          } else {
            throw new Error("Failed to upload image.");
          }
        } catch (error) {
          console.log(error);
        }
      } else {
        e.target.value = "";
      }
      //   console.log(image);
    }
  };

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
            {!imageLoading ? (
              <>
                <Button
                  onClick={() => document.getElementById("file-input").click()}
                  className="bg-green-custom hover:bg-darkgreen-custom"
                  color="white"
                  onChange={(e) => {
                    handleImage(e);
                  }}
                >
                  Upload File
                </Button>
                <Input
                  type="file"
                  style={{ display: "none" }}
                  id="file-input"
                  onChange={(e) => {
                    handleImage(e);
                  }}
                />
              </>
            ) : (
              <Button
                isLoading
                className="bg-green-custom hover:bg-darkgreen-custom"
                color="white"
              />
            )}
            {groupImage === "" ? (
              <></>
            ) : (
              <img
                className="rounded-3xl w-36 h-36 object-cover"
                src={groupImage}
              />
            )}
          </div>
        </ModalBody>
        <ModalFooter>
          <Button colorScheme="red" mr={3} onClick={onClose}>
            Close
          </Button>
          {createStatus !== "pending" && imageLoading !== true ? (
            <Button
              className="bg-orange-custom hover:bg-darkorange-custom"
              color="white"
              onClick={handleClick}
            >
              Create Group
            </Button>
          ) : (
            <Button
              isLoading
              className="bg-orange-custom hover:bg-darkorange-custom"
              color="white"
            />
          )}
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}
