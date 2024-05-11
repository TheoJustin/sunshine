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
import { useMutation, useQuery } from "@tanstack/react-query";
import React, { useEffect, useState } from "react";
import { sunshine_backend } from "../../../../../declarations/sunshine_backend";
import placeholder from "../../../../../../assets/profilePlaceholder.jpg";
import MiniLoader from "../../../components/MiniLoader";
import { useAuth } from "../../../use-auth-client";
import { sunshine_chat } from "../../../../../declarations/sunshine_chat";

export default function ProfileDialog({ isOpen, onClose, passedPrincipal }) {
  const { principal } = useAuth();
  const getUserDetail = async () => {
    return await sunshine_backend.getUserById(passedPrincipal);
  };
  const checkIsFriend = async () => {
    // console.log(passedPrincipal)
    return await sunshine_chat.isFriends(principal, passedPrincipal);
  };

  const addFriend = async () => {
    await sunshine_chat.addFriend(principal, passedPrincipal);
    console.log("Added friend!");
    onClose();
    return true;
  };

  const { data, isLoading, error } = useQuery({
    queryKey: ["getUserDetail", passedPrincipal],
    queryFn: getUserDetail,
  });

  const { data: isFriend, isLoading: isFriendLoading } = useQuery({
    queryKey: ["checkIsFriend", passedPrincipal],
    queryFn: checkIsFriend,
  });

  const { status, mutate } = useMutation({
    mutationKey: ["addFriend"],
    mutationFn: addFriend,
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
          {/* {isFriendLoading ? (
            <>
              <Button
                className="bg-cream-custom hover:bg-cream-custom-hover"
                color="white"
                isLoading
              />
            </>
          ) :  */}
          {isFriend ? (
            <></>
          ) : (
            <Button
              className="bg-cream-custom hover:bg-cream-custom-hover"
              color="white"
              onClick={mutate}
            >
              Add Friend
            </Button>
          )}
          <Button colorScheme="red" mr={3} onClick={onClose}>
            Close
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}
