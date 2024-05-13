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
import GameOptions from "../../../components/game/GameOptions";
import GameBox from "../GameBox";

export default function ChatBoxFriend({ activeFriend, setActiveFriend }) {
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
    queryKey: ["checkFetch", user],
    queryFn: fetchDatas,
    refetchInterval: 5000,
  });

  const { status: statusFetchingData, mutate: dataMutate } = useMutation({
    mutationKey: ["checkFetch"],
    mutationFn: fetchDatas,
  });

  async function fetchDatas() {
    await fetchChats();
    await fetchFriendHeader();
    return true;
  }

  async function fetchChats() {
    const chatngame = await sunshine_chat.getAllChatsAndGamesAccordingToFriend(
      principal, activeFriend
    );
    if (chatngame.ok) {
      let lastPrincipal = null;
      const listItems = chatngame.ok.map(
        ([
          id,
          message,
          principalMsg,
          timestamp,
          status,
          variant,
          gameType,
          participants,
          scores,
          name,
          pfp,  idx
        ]) => {
          const isSender = principal.toString() === principalMsg.toString();
          const isTheSameSender =
          lastPrincipal &&
          lastPrincipal.toString() === principalMsg.toString();
          lastPrincipal = principalMsg;
          
          if (variant == "chat") {
          if (isSender) {
            return (
              <>
                <div key={idx} className="flex-col flex items-end mb-3">
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
                  </div>
                </>
              );
          }
          } else if (variant == "game") {
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
                      <div className="bg-cream-custom w-fit p-2 text-center rounded-2xl text-lg max-w-[33vw]">
                        <GameBox
                          principal={principal}
                          gameId={id}
                          participants={participants}
                          score={scores}
                          gameType={gameType}
                        />
                      </div>
                    </div>
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
                        className="w-10 h-10 object-cover m-0 align-end rounded-full"
                        src={pfp === "" ? placeholder : pfp}
                        alt=""
                      />
                    )}
                    <div className="flex flex-col">
                      {isTheSameSender ? (
                        <></>
                      ) : (
                        <div className="text-base">{name}</div>
                      )}
                      <div
                        className={`flex gap-3 items-end ${isTheSameSender ? "ml-[3.75rem]" : ""
                          }`}
                      >
                        <div className="bg-gray-50 w-fit p-2 rounded-2xl text-lg max-w-[33vw]">
                          <GameBox
                            principal={principal}
                            gameId={id}
                            participants={participants}
                            score={scores}
                            gameType={gameType}
                          />
                        </div>
                        <div className="text-sm">
                          {" "}
                          {new Date(
                            Number(timestamp) / 1000000
                          ).toLocaleString()}
                        </div>
                      </div>
                    </div>
                  </div>
                </>
              );
            }
          }
        }
      );
      setChats(<>{listItems}</>);
    }

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
            <div
              onClick={() => {
                setPassedPrincipal(activeFriend);
                onOpenProfile();
              }}
              className="flex justify-start items-center text-left p-3 font-productsans mr-0 bg-white border-b-2 border-darkorange-custom cursor-pointer h-1/6"
            >
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
    setMessage("");
    dataMutate();
    return true;
  }

  useEffect(() => {
    dataMutate();
  }, [user, activeFriend]);

  return (
    <div className="flex flex-col h-full w-[69%] justify-between">
      <div className="flex flex-col h-[87%] w-full justify-between">
        {activeFriend ? (
          isLoadingFetchChat || statusFetchingData == "pending" ? (
            <>
              <MiniLoader />
            </>
          ) : (
            <>
              {friendHeader}
              <div className="p-6 overflow-y-scroll h-5/6">{chats}</div>
            </>
          )
        ) : (
          ""
        )}
      </div>
      {activeFriend ? (
        <div className="justify-end h-[13%] p-6 bg-white">
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
            <GameOptions
              activeFriend={activeFriend}
              refetch={dataMutate}
              flag="friend"
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
        </div>
      ) : (
        <></>
      )}
      {passedPrincipal !== "" ? (
        <>
          <ProfileDialog
            isOpen={isOpenProfile}
            onClose={onCloseProfile}
            passedPrincipal={passedPrincipal}
            setPassedPrincipal={setPassedPrincipal}
            onOpenSendMoney={onOpenSendMoney}
            refetch={() => {
              setActiveFriend("");
              dataMutate();
            }}
          />
          <SendMoneyDialog
            isOpen={isOpenSendMoney}
            onClose={onCloseSendMoney}
            passedPrincipal={passedPrincipal}
          />
        </>
      ) : (
        <></>
      )}
    </div>
  );
}
