import React, { useEffect, useState } from "react";
import { sunshine_chat } from "../../../../declarations/sunshine_chat";
import { useAuth } from "../../use-auth-client";
import { useMutation, useQuery } from "@tanstack/react-query";
import GameOptions from "../../components/game/GameOptions";
import { Button, Input, InputGroup, InputRightElement } from "@chakra-ui/react";
import { ExclamationCircleIcon } from "@heroicons/react/24/solid";
import { TbSend2 } from "react-icons/tb";

export default function ChatBox({ activeGroup }) {
  //buat semua chat
  const [chats, setChats] = useState("");
  // buat input
  const [message, setMessage] = useState("");
  const { user, principal } = useAuth();
  const [sendBtn, setSendBtn] = useState();
  // const [group, setGroup] = useState();
  const [shouldSendData, setShouldSendData] = useState(false);
  const { mutate: sendMutate, status: sendStatus } = useMutation({
    mutationKey: ["checkSend"],
    mutationFn: handleSend,
  });

  const { isLoading: isLoadingFetchChat } = useQuery({
    queryKey: ["checkFetch", activeGroup, chats],
    queryFn: () => fetchChats(activeGroup),
  });

  async function fetchChats(activeGroup) {
    const chats = await sunshine_chat.getAllChatsAccordingToGroup(activeGroup);
    // mapping buat chat
    if (chats.ok) {
      const listItems = chats.ok.map(([name, message, timestamp]) => (
        <li>
          {name}: {message} at{" "}
          {new Date(Number(timestamp) / 1000000).toLocaleString()}
        </li>
      ));
      //   Setting the state with the list of elements
      setChats(<ul>{listItems}</ul>);
    }

    return true;
  }

  function trySend() {
    sendMutate();
  }

  useEffect(() => {
    fetchChats(activeGroup);
  }, [user, chats, activeGroup]);

  async function handleSend() {
    // async function sendChat() {
    const result = await sunshine_chat.createChat(
      message,
      principal,
      activeGroup
    );
    if (result.ok) {
      console.log("delivered!");
    }
    setShouldSendData(false);
    console.log(result);
    // }
    // sendChat();
    // fetchChats(activeGroup);
    return true;
  }

  return (
    <div className="flex flex-col h-full w-[69%] gap-5 p-6 justify-between">
      {/* {sendStatus} */}
      <div className="overflow-y-scroll">
        {activeGroup ? (isLoadingFetchChat ? "Fetching Chat..." : chats) : ""}
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

            <GameOptions activeGroup={activeGroup}/>

            <Button
              className="bg-cream-custom hover:bg-cream-custom-hover"
              size="sm"
              textColor="white"
              onClick={trySend}
              height={10}
            >
              <TbSend2 size={25}/>
            </Button>
          </div>
        ) : (
          <></>
        )}
      </div>
      {/* <div className="align-bottom">{sendStatus == "pending" ? "Sending Data" : sendBtn}</div> */}

      {/* <h1>Create A new Game</h1> */}
      {/* <GameOptions /> */}
    </div>
  );
}
