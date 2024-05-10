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

export default function ChatBox({ activeGroup }) {
  //buat semua chat
  const [chats, setChats] = useState("");
  // buat input
  const [message, setMessage] = useState("");
  const { user, principal } = useAuth();
  const [shouldSendData, setShouldSendData] = useState(false);
  const { mutate: sendMutate, status: sendStatus } = useMutation({
    mutationKey: ["checkSend"],
    mutationFn: handleSend,
  });

  const { isLoading: isLoadingFetchChat } = useQuery({
    queryKey: ["checkFetch"],
    queryFn: fetchChats,
  });
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [passedPrincipal, setPassedPrincipal] = useState();

  async function fetchChats(activeGroup) {
    // console.log(activeGroup);
    const chats = await sunshine_chat.getAllChatsAccordingToGroup(activeGroup);
    // mapping buat chat
    const chatngame = await sunshine_chat.getAllChatsAndGamesAccordingToGroup(
      activeGroup
    );
    // console.log(chatngame);
    // console.log(chats);
    // if (chats.ok) {
    //   let lastPrincipal = null;
    //   const listItems = chats.ok.map(
    //     ([name, message, timestamp, principalMsg, pfp]) => {
    //       const isSender = principal.toString() === principalMsg.toString();
    //       const isTheSameSender =
    //         lastPrincipal &&
    //         lastPrincipal.toString() === principalMsg.toString();
    //       lastPrincipal = principalMsg;
    //       if (isSender) {
    //         return (
    //           <>
    //             <div className="flex-col flex items-end mb-3">
    //               {isTheSameSender ? (
    //                 <></>
    //               ) : (
    //                 <div className="text-base">{name}</div>
    //               )}

    //               <div className="flex gap-3 items-end">
    //                 <div className="text-sm">
    //                   {" "}
    //                   {new Date(Number(timestamp) / 1000000).toLocaleString()}
    //                 </div>
    //                 <div className="bg-cream-custom w-fit p-2 rounded-2xl text-lg max-w-[30vw]">
    //                   {message}
    //                 </div>
    //               </div>
    //               {/* {name}: {message} at{" "}
    //         {new Date(Number(timestamp) / 1000000).toLocaleString()} */}
    //             </div>
    //           </>
    //         );
    //       } else {
    //         return (
    //           <>
    //             <div className="flex gap-5 items-center mb-3">
    //               {isTheSameSender ? (
    //                 <></>
    //               ) : (
    //                 <img
    //                   className="w-10 h-10 object-cover m-0 align-end rounded-full"
    //                   src={pfp === "" ? placeholder : pfp}
    //                   alt=""
    //                 />
    //               )}
    //               <div className="flex flex-col">
    //                 {isTheSameSender ? (
    //                   <></>
    //                 ) : (
    //                   <div className="text-base">{name}</div>
    //                 )}
    //                 <div
    //                   className={`flex gap-3 items-end ${isTheSameSender ? "ml-[3.75rem]" : ""
    //                     }`}
    //                 >
    //                   <div className="bg-gray-50 w-fit p-2 rounded-2xl text-lg max-w-[30vw]">
    //                     {message}
    //                   </div>
    //                   <div className="text-sm">
    //                     {" "}
    //                     {new Date(Number(timestamp) / 1000000).toLocaleString()}
    //                   </div>
    //                 </div>
    //               </div>
    //               {/* {name}: {message} at{" "}
    //         {new Date(Number(timestamp) / 1000000).toLocaleString()} */}
    //             </div>
    //           </>
    //         );
    //       }
    //     }
    //   );

    //   //   Setting the state with the list of elements
    //   setChats(<>{listItems}</>);
    // }

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
          // console.log(id, message, principalMsg, timestamp, status, variant, gameType, participants, scores, name, pfp);
          // let pfp = await sunshine_backend.getPfp(principalMsg);
          // let name = await sunshine_backend.getName(principalMsg);
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
                          onOpen();
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
                    {/* {name}: {message} at{" "}
              {new Date(Number(timestamp) / 1000000).toLocaleString()} */}
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
                      <div className="bg-cream-custom w-fit p-2 rounded-2xl text-lg max-w-[30vw]">
                        {/* <h2>{gameType}</h2>
                        {participants.map((name) => {
                          <p>{name}</p>
                        })}
                        <p>Press button below to join game!</p>
                        <button>Join Game</button> */}
                        <GameBox
                          principal={principal}
                          gameId={id}
                          participants={participants}
                          score={scores}
                          gameType={gameType}
                          activeGroup={activeGroup}
                        />
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
                            activeGroup={activeGroup}
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
                    {/* {name}: {message} at{" "}
              {new Date(Number(timestamp) / 1000000).toLocaleString()} */}
                  </div>
                </>
              );
            }
          }
        }
      );

      //   Setting the state with the list of elements
      setChats(<>{listItems}</>);
    }

    return true;
  }

  async function getPfp(principal) {
    return await sunshine_backend.getPfp(principal);
  }

  function trySend() {
    sendMutate();
  }

  useEffect(() => {
    // getChatsMutate(activeGroup);
    fetchChats(activeGroup);
  }, [user, chats, activeGroup]);

  async function handleSend() {
    const result = await sunshine_chat.createChat(
      message,
      principal,
      activeGroup
    );
    if (result.ok) {
      console.log("delivered!");
    }
    getChatsMutate(activeGroup);
    setShouldSendData(false);
    return true;
  }

  return (
    <div className="flex flex-col h-full w-[69%] gap-5 p-6 justify-between">
      <div className="overflow-y-scroll">
        {activeGroup ? (
          isLoadingFetchChat ? (
            <>
              <MiniLoader />
            </>
          ) : (
            chats
          )
        ) : (
          ""
        )}
      </div>
      <div className="justify-end">
        {activeGroup ? (
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
            <GameOptions activeGroup={activeGroup} />
            {sendStatus === "pending" ? (
              <Button
                className="bg-cream-custom hover:bg-cream-custom-hover"
                size="sm"
                textColor="white"
                height={10}
                isLoading
              >
                <TbSend2 size={25} />
              </Button>
            ) : (
              <Button
                className="bg-cream-custom hover:bg-cream-custom-hover"
                size="sm"
                textColor="white"
                onClick={trySend}
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
        <ProfileDialog
          isOpen={isOpen}
          onClose={onClose}
          passedPrincipal={passedPrincipal}
        />
      ) : (
        <></>
      )}
    </div>
  );
}
