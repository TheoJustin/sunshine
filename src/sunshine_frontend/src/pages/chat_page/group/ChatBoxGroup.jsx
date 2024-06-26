import React, { useEffect, useState } from "react";
import { sunshine_chat } from "../../../../../declarations/sunshine_chat";
import { useAuth } from "../../../use-auth-client";
import { useMutation, useQuery } from "@tanstack/react-query";
import GameOptions from "../../../components/game/GameOptions";
import {
  Button,
  Input,
  InputGroup,
  InputRightElement,
  useDisclosure,
} from "@chakra-ui/react";
import { ExclamationCircleIcon } from "@heroicons/react/24/solid";
import { TbSend2 } from "react-icons/tb";
import { sunshine_game } from "../../../../../declarations/sunshine_game";
import placeholder from "../../../../../../assets/profilePlaceholder.jpg";
import MiniLoader from "../../../components/MiniLoader";
import { sunshine_backend } from "../../../../../declarations/sunshine_backend";
import GameBox from "../GameBox";
import ProfileDialog from "./ProfileDialog";
import GroupDetailDialog from "./GroupDetailDialog";
import SendMoneyDialog from "../SendMoneyDialog";

export default function ChatBox({ activeGroup, setActiveGroup }) {
  //buat semua chat
  const [chats, setChats] = useState("");
  // buat input
  const [message, setMessage] = useState("");
  const { user, principal } = useAuth();
  const [groupHeader, setGroupHeader] = useState("");
  const { mutate: sendMutate, status: sendStatus } = useMutation({
    mutationKey: ["checkSend"],
    mutationFn: handleSend,
  });

  const { isLoading: loadingFetchData } = useQuery({
    queryKey: ["queryFetch"],
    queryFn: fetchDatas,
    refetchInterval: 5000
  });

  const { status: statusFetchingData, mutate: dataMutate } = useMutation({
    mutationKey: ["checkFetch"],
    mutationFn: fetchDatas,
  });
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
  const [passedPrincipal, setPassedPrincipal] = useState();
  const { isOpen: isOpenGroup, onOpen: onOpenGroup, onClose: onCloseGroup } = useDisclosure();

  async function fetchDatas() {
    await fetchChats();
    await fetchGroupHeader();
    return true;
  }

  async function fetchGroupHeader() {
    const group = await sunshine_chat.getGroupById(activeGroup);
    if (group.ok) {
      const groupTitle = () => {
        return (
          <>
            <div className="flex justify-start items-center text-left p-3 font-productsans mr-0 bg-white border-b-2 border-darkorange-custom cursor-pointer h-1/6" onClick={() => {
              onOpenGroup();
            }}>
              <img src={group.ok.imageUrl == "" ? placeholder : group.ok.imageUrl} className="rounded-full w-11 h-11 m-2 mr-5 object-cover" alt="" />
              <div>
                <h1 className="font-semibold">{group.ok.groupName}</h1>
                <p>{group.ok.description}</p>
              </div>
            </div>
          </>
        )
      }
      setGroupHeader(groupTitle);
    }
  }

  async function fetchChats() {
    const chatngame = await sunshine_chat.getAllChatsAndGamesAccordingToGroup(
      activeGroup
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
          pfp,
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
                        className={`flex gap-3 items-end ${isTheSameSender ? "ml-[3.75rem]" : ""
                          }`}
                      >
                        <div className="bg-gray-50 w-fit p-2 rounded-2xl text-lg max-w-[30vw]">
                          {message}
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
                      <div className="bg-cream-custom w-fit p-2 text-center rounded-2xl text-lg max-w-[30vw]">
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
                        <div className="bg-gray-50 w-fit p-2 rounded-2xl text-lg max-w-[30vw]">
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

  function trySend() {
    sendMutate();
  }

  useEffect(() => {
    dataMutate();
  }, [user, activeGroup]);

  async function handleSend() {
    const result = await sunshine_chat.createChat(
      message,
      principal,
      activeGroup
    );
    if (result.ok) {
      setMessage("");
    }
    dataMutate();
    return true;
  }

  return (
    <div className="flex flex-col h-full w-[69%] justify-between ">
      <div className="flex flex-col h-[87%] w-full justify-between ">
        {statusFetchingData == 'pending' || loadingFetchData == true ? <MiniLoader /> :
          activeGroup ? (
            <>
              {groupHeader}
              <div className="p-6 overflow-y-scroll h-5/6">
                {chats}
              </div>
            </>
          ) : (
            ""
          )}
      </div>
      {activeGroup ? (
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
            <GameOptions activeGroup={activeGroup} refetch={dataMutate} flag="group" />
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
                onClick={trySend}
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
            refetch={() => { dataMutate() }}
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
      <GroupDetailDialog isOpen={isOpenGroup} onClose={onCloseGroup} activeGroup={activeGroup} setActiveGroup={setActiveGroup} onOpenProfile={onOpenProfile}
        passedPrincipal={passedPrincipal}
        setPassedPrincipal={setPassedPrincipal} />
    </div>
  );
}
