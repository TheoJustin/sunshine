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
import { useMutation } from "@tanstack/react-query";
import React, { useEffect, useState } from "react";
import { useAuth } from "../../../use-auth-client";
import { sunshine_chat } from "../../../../../declarations/sunshine_chat";
import { uploadImage } from "../../../../../config/cloudinary";
import Snackbar from "../../../components/Snackbar";
import { IoMdAlert } from "react-icons/io";
import { FaCircleCheck } from "react-icons/fa6";

export default function CreateGroupDialog({ isOpen, onClose }) {
  const { status: createStatus, mutate: createMutate } = useMutation({
    mutationFn: createGroup,
    mutationKey: ["createGroup"],
  });
  const { user, principal } = useAuth();
  const [groupName, setGroupName] = useState("");
  const [groupDescription, setGroupDescription] = useState("");
  const [groupImage, setGroupImage] = useState("");
  const [imageLoading, setImageLoading] = useState(false);
  const toast = useToast();

  async function handleClick() {
    createMutate();
  }

  async function createGroup() {

    if (!validateGroup()) {
      return;
    }

    await sunshine_chat.createGroup(
      groupName,
      principal,
      groupDescription,
      groupImage
    );
    setGroupName("");
    setGroupDescription("");
    setGroupImage("");
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
          description="The group has been successfully created"
        />
      ),
    });
    return true;
  }

  const validateGroup = () => {
    if (groupName === "") {
      toast({
        duration: 5000,
        isClosable: true,
        position: "bottom-right",
        render: () => (
          <Snackbar
            bgColor="bg-red-600"
            icon={<IoMdAlert color="white" />}
            title="Field error"
            description="Fill in your group name!"
          />
        ),
      });
      return false;
    }
    if (groupDescription === "") {
      toast({
        duration: 5000,
        isClosable: true,
        position: "bottom-right",
        render: () => (
          <Snackbar
            bgColor="bg-red-600"
            icon={<IoMdAlert color="white" />}
            title="Field error"
            description="Fill in your group description!"
          />
        ),
      });
      return false;
    }
    if (groupName.length > 40) {
      toast({
        duration: 5000,
        isClosable: true,
        position: "bottom-right",
        render: () => (
          <Snackbar
            bgColor="bg-red-600"
            icon={<IoMdAlert color="white" />}
            title="Group name error"
            description="Group name cannot have more than 40 characters!"
          />
        ),
      });
      return false;
    }
    if (groupDescription.length > 150) {
      toast({
        duration: 5000,
        isClosable: true,
        position: "bottom-right",
        render: () => (
          <Snackbar
            bgColor="bg-red-600"
            icon={<IoMdAlert color="white" />}
            title="Group description error"
            description="Group name cannot have more than 150 characters!"
          />
        ),
      });
      return false;
    }
    return true;
  };

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
