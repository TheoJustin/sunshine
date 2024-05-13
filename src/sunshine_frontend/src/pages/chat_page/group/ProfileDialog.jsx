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
  useDisclosure,
} from "@chakra-ui/react";
import { useMutation, useQuery } from "@tanstack/react-query";
import React, { useEffect, useState } from "react";
import { sunshine_backend } from "../../../../../declarations/sunshine_backend";
import placeholder from "../../../../../../assets/profilePlaceholder.jpg";
import MiniLoader from "../../../components/MiniLoader";
import { useAuth } from "../../../use-auth-client";
import { sunshine_chat } from "../../../../../declarations/sunshine_chat";
import UnfriendConfirmDialog from "../friend/UnfriendDialog";

export default function ProfileDialog({
  isOpen,
  onClose,
  setPassedPrincipal,
  passedPrincipal,
  onOpenSendMoney,
  refetch
}) {
  const { principal } = useAuth();
  const [isBothUserFriend, setIsBothUserFriend] = useState(false);
  const {
    isOpen: isOpenConfirm,
    onOpen: onOpenConfirm,
    onClose: onCloseConfirm,
  } = useDisclosure();
  const getUserDetail = async () => {
    return await sunshine_backend.getUserById(passedPrincipal);
  };
  const checkIsFriend = async () => {
    let isBothFriend = await sunshine_chat.isFriends(
      principal,
      passedPrincipal
    );
    if (isBothFriend && isBothFriend.ok) {
      setIsBothUserFriend(isBothFriend.ok);
      return true;
    }
    setIsBothUserFriend(false);
    return false;
  };

  const addFriend = async () => {
    await sunshine_chat.addFriend(principal, passedPrincipal);
    setIsBothUserFriend(await checkIsFriend(principal, passedPrincipal));
    onClose();
    return true;
  };

  const { data, isLoading, error } = useQuery({
    queryKey: ["getUserDetail", passedPrincipal],
    queryFn: getUserDetail,
  });

  const { data: isFriend, isLoading: isFriendLoading } = useQuery({
    queryKey: ["checkIsFriend", passedPrincipal, isOpenConfirm],
    queryFn: checkIsFriend,
  });

  const { status, mutate } = useMutation({
    mutationKey: ["addFriend", isFriend],
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
            <div className="text-base text-center w-full">{data && data.ok.email}</div>
            <div className="text-base text-center w-full">{data && data.ok.birth_date}</div>
          </div>
        </ModalBody>
        <ModalFooter gap={5} justifyContent='center' width='100%'>
          {isFriendLoading || status === "pending" ? (
            <>
              <Button width='40%'
                className="bg-orange-custom hover:bg-darkorange-custom"
                color="white"
                isLoading
              />
            </>
          ) : isBothUserFriend ? (
            <>
              <Button width='40%'
                className="bg-orange-custom hover:bg-darkorange-custom"
                color="white"
                onClick={() => {
                  onClose();
                  setPassedPrincipal(passedPrincipal);
                  onOpenSendMoney();
                }}
              >
                Send Money
              </Button>
              <Button width='40%'
                colorScheme="red"
                color="white"
                onClick={() => {
                  setPassedPrincipal(passedPrincipal);
                  onOpenConfirm();
                }}
              >
                Unfriend
              </Button>
            </>
          ) : (
            <Button width='40%'
              className="bg-orange-custom hover:bg-darkorange-custom"
              color="white"
              onClick={mutate}
            >
              Add Friend
            </Button>
          )}

        </ModalFooter>
      </ModalContent>
      <UnfriendConfirmDialog
            user={principal}
            friend={passedPrincipal}
            isOpen={isOpenConfirm}
            onClose={onCloseConfirm}
            onCloseProfile={onClose}
            refetch={refetch}
          />
    </Modal>
    
  );
}
