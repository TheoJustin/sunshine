import { Button, Input, useDisclosure } from "@chakra-ui/react";
import { useMutation, useQuery } from "@tanstack/react-query";
import React, { useEffect, useState } from "react";
import { useAuth } from "../../../use-auth-client";
import { sunshine_chat } from "../../../../../declarations/sunshine_chat";
import { TbSend2 } from "react-icons/tb";
import MiniLoader from "../../../components/MiniLoader";
import placeholder from "../../../../../../assets/profilePlaceholder.jpg";
import ProfileDialog from "../group/ProfileDialog";
import SendMoneyDialog from "../SendMoneyDialog";
import { sunshine_backend } from "../../../../../declarations/sunshine_backend";

export default function ChatBoxFriend({ activeFriend }) {
  const [chats, setChats] = useState("");
  const [message, setMessage] = useState("");
  const [friendHeader, setFriendHeader] = useState();
  const { user, principal } = useAuth();
  const [passedPrincipal, setPassedPrincipal] = useState();
  const {
    isOpen: isOpenProfile,
    onOpen: onOpenProfile,
    onClose: onCloseProfile,
  } = useDisclosure();
  const {
    isOpen: isOpenSendMoney,
    onOpen: onOpenSendMoney,
    onClose: onCloseSendMoney,
  } = useDisclosure();

  const { mutate: sendMutate, status: sendStatus } = useMutation({
    mutationKey: ["checkSend"],
    mutationFn: handleSend,
  });
  const { isLoading: isLoadingFetchChat } = useQuery({
    queryKey: ["checkFetch"],
    queryFn: fetchChats,
  });

  async function fetchChats() {
    if (activeFriend === "") {
      return;
    }
    const allChats = await sunshine_chat.getAllChatsFromFriend(
      principal,
      activeFriend
    );
    if (allChats.ok) {
      let lastPrincipal = null;
      const listItems = allChats.ok.map(
        ([name, message, timestamp, principalMsg, pfp]) => {
          const isSender = principal.toString() === principalMsg.toString();
          const isTheSameSender =
            lastPrincipal &&
            lastPrincipal.toString() === principalMsg.toString();
          lastPrincipal = principalMsg;
          if (isSender) {
            return (
              <>
                <div className="flex-col flex items-end mb-3">
                  {isTheSameSender ? (
                    <></>
                  ) : (
                    <div className="text-base">{name}</div>
                  )}

                  <div className="flex gap-3 items-end">
                    <div className="text-sm">
                      {" "}
                      {new Date(Number(timestamp) / 1000000).toLocaleString()}
                    </div>
                    <div className="bg-cream-custom w-fit p-2 rounded-2xl text-lg max-w-[30vw]">
                      {message}
                    </div>
                  </div>
                  {/* {name}: {message} at{" "}
                    {new Date(Number(timestamp) / 1000000).toLocaleString()} */}
                </div>
              </>
            );
          } else {
            return (
              <>
                <div className="flex gap-5 items-center mb-3">
                  {isTheSameSender ? (
                    <></>
                  ) : (
                    <img
                      className="w-10 h-10 object-cover m-0 align-end rounded-full cursor-pointer"
                      src={pfp === "" ? placeholder : pfp}
                      alt=""
                      onClick={() => {
                        setPassedPrincipal(principalMsg);
                        onOpenProfile();
                      }}
                    />
                  )}
                  <div className="flex flex-col">
                    {isTheSameSender ? (
                      <></>
                    ) : (
                      <div className="text-base">{name}</div>
                    )}
                    <div
                      className={`flex gap-3 items-end ${
                        isTheSameSender ? "ml-[3.75rem]" : ""
                      }`}
                    >
                      <div className="bg-gray-50 w-fit p-2 rounded-2xl text-lg max-w-[30vw]">
                        {message}
                      </div>
                      <div className="text-sm">
                        {" "}
                        {new Date(Number(timestamp) / 1000000).toLocaleString()}
                      </div>
                    </div>
                  </div>
                  {/* {name}: {message} at{" "}
                    {new Date(Number(timestamp) / 1000000).toLocaleString()} */}
                </div>
              </>
            );
          }
        }
      );
      setChats(<>{listItems}</>);
    }
    // console.log(allChats);
    return true;
  }

  async function fetchFriendHeader() {
    if (activeFriend === "") {
      return;
    }
    const friend = await sunshine_backend.getUserById(activeFriend);
    if (friend.ok) {
      const friendTitle = () => {
        return (
          <>
            <div className="flex justify-start items-center text-left p-3 font-productsans mr-0 bg-white border-b-2 border-darkorange-custom cursor-pointer">
              <img
                src={
                  friend.ok.profileUrl == "" ? placeholder : friend.ok.imageUrl
                }
                className="rounded-full w-11 h-11 m-2 mr-5 object-cover"
                alt=""
              />
              <div>
                <h1 className="font-semibold">{friend.ok.name}</h1>
              </div>
            </div>
          </>
        );
      };
      setFriendHeader(friendTitle);
    }
  }

  async function handleSend() {
    const result = await sunshine_chat.createFriendChat(
      principal,
      activeFriend,
      message
    );
    if (result.ok) {
      console.log("delivered!");
    }
    setMessage("");
    // getChatsMutate(activeGroup);
    // setShouldSendData(false);
    return true;
  }

  useEffect(() => {
    fetchChats();
    fetchFriendHeader();
  }, [user, chats, activeFriend]);
  return (
    <div className="flex flex-col h-full w-[69%] gap-5 justify-between">
      <div className="overflow-y-scroll">
        {activeFriend ? (
          isLoadingFetchChat ? (
            <>
              <MiniLoader />
            </>
          ) : (
            <>
              {friendHeader}
              <div className="p-6">{chats}</div>
            </>
          )
        ) : (
          ""
        )}
      </div>
      <div className="justify-end p-6">
        {activeFriend ? (
          <div className="flex gap-1 items-center">
            <Input
              focusBorderColor="none"
              variant="filled"
              placeholder="Message"
              size="md"
              onChange={(e) => {
                setMessage(e.target.value);
              }}
              value={message}
              _focus={{
                bg: "#eef2f6",
                borderColor: "transparent",
                boxShadow: "none",
              }}
            />
            {sendStatus === "pending" ? (
              <Button
                className="bg-orange-custom hover:bg-darkorange-custom"
                size="sm"
                textColor="white"
                height={10}
                isLoading
              >
                <TbSend2 size={25} />
              </Button>
            ) : (
              <Button
                className="bg-orange-custom hover:bg-darkorange-custom"
                size="sm"
                textColor="white"
                onClick={sendMutate}
                height={10}
              >
                <TbSend2 size={25} />
              </Button>
            )}
          </div>
        ) : (
          <></>
        )}
      </div>
      {passedPrincipal !== "" ? (
        <>
          <ProfileDialog
            isOpen={isOpenProfile}
            onClose={onCloseProfile}
            passedPrincipal={passedPrincipal}
            setPassedPrincipal={setPassedPrincipal}
            onOpenSendMoney={onOpenSendMoney}
          />
          <SendMoneyDialog
            isOpen={isOpenSendMoney}
            onClose={onCloseSendMoney}
            passedPrinciple={passedPrincipal}
          />
        </>
      ) : (
        <></>
      )}
    </div>
  );
}
