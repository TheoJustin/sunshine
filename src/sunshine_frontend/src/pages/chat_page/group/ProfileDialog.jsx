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
import { useQuery } from "@tanstack/react-query";
import React, { useEffect, useState } from "react";
import { sunshine_backend } from "../../../../../declarations/sunshine_backend";
import placeholder from "../../../../../../assets/profilePlaceholder.jpg";
import MiniLoader from "../../../components/MiniLoader";

export default function ProfileDialog({ isOpen, onClose, passedPrincipal }) {
  const getUserDetail = async () => {
    return await sunshine_backend.getUserById(passedPrincipal);
  };

  const [isFriend, setIsFriend] = useState(false);

  const { data, isLoading, error } = useQuery({
    queryKey: ["getUserDetail", passedPrincipal],
    queryFn: getUserDetail,
  });

  if (isLoading) return <></>;

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader fontSize="2xl"></ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <div className="flex flex-col text-center items-center justify-center">
            {data && (
              <img
                className="w-20 h-20 object-cover m-0 align-end rounded-full"
                src={
                  data.ok.profileUrl === "" ? placeholder : data.ok.profileUrl
                }
                alt=""
              />
            )}

            <div className="text-2xl font-bold">{data && data.ok.name}</div>
            <div className="text-base">{data && data.ok.email}</div>
            <div className="text-base">{data && data.ok.birth_date}</div>
          </div>
        </ModalBody>
        <ModalFooter gap={5}>
          <Button
            className="bg-cream-custom hover:bg-cream-custom-hover"
            color="white"
          >
            Add Friend
          </Button>
          <Button colorScheme="red" mr={3} onClick={onClose}>
            Close
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}
