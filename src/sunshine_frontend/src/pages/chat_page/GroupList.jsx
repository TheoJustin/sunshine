import React, { useEffect, useState } from "react";
import { sunshine_chat } from "../../../../declarations/sunshine_chat";
import { useAuth } from "../../use-auth-client";
import { useMutation, useQuery } from "@tanstack/react-query";
import ChatBox from "./ChatBox";
import CreateGroupContent from "./CreateGroupContent";
import JoinGroupContent from "./JoinGroupContent";
import {
  Button,
  Input,
  InputGroup,
  InputLeftElement,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  useDisclosure,
} from "@chakra-ui/react";
import { PhoneIcon, SearchIcon } from "lucide-react";
import { MagnifyingGlassIcon } from "@heroicons/react/24/solid";
import CreateGroupDialog from "./CreateGroupDialog";
import JoinGroupDialog from "./JoinGroupDialog";

var wannaCreate = false;
var wannaJoin = false;

const overlayStyle = () => ({
  position: "fixed" /* Sit on top of the page content */,
  display: "none" /* Hidden by default */,
  width: "100%" /* Full width (cover the whole page) */,
  height: "100%" /* Full height (cover the whole page) */,
  top: "0",
  left: "0",
  right: "0",
  bottom: "0",
  backgroundColor: "rgba(0,0,0,0.5)" /* Black background with opacity */,
  zIndex:
    "2" /* Specify a stack order in case you're using a different order for other elements */,
  display: wannaCreate || wannaJoin ? "block" : "none",
});

const actionsGroupStyle = () => ({
  position: "absolute",
  top: "93%",
  display: "flex",
  // width: '2rem',
  // height: '2rem',
  transform: "translate(-50%, -50%)",
  left: "73%",
  gap: "1rem",
});

const joinButtonStyle = () => ({
  position: "absolute",
  top: "50%",
  // width: '2rem',
  // height: '2rem',
  borderRadius: "1rem",
  backgroundColor: "#ff9f1c",
  color: "#ffffff",
  left: "80%",
});

const actionBtnStyle = () => ({
  borderRadius: "0.5rem",
  backgroundColor: "#ff9f1c",
  color: "#ffffff",
  fontSize: "1.2rem",
  padding: "0.5rem 1rem",
});

const closeGroupStyle = () => ({
  position: "absolute",
  top: "8%",
  borderRadius: "1rem",
  // backgroundColor: '#ff9f1c',
  size: "2rem",
  left: "90%",
});

const overlayBoxStyle = () => ({
  position: "fixed",
  padding: "2rem",
  top: "50%",
  borderRadius: "1rem",
  transform: "translate(-50%, -50%)",
  backgroundColor: "#ffffff",
  width: "50%",
  height: "auto",
  left: "50%",
});

export default function GroupList() {
  const [groups, setGroups] = useState();
  const { principal } = useAuth();

  const [searchedGroupName, setSearchedGroupName] = useState("");
  const [activeGroup, setActiveGroup] = useState("");
  const { isOpen: isOpenCreateGroup, onOpen: onOpenCreateGroup, onClose: onCloseCreateGroup } = useDisclosure();
  const { isOpen: isOpenJoinGroup, onOpen: onOpenJoinGroup, onClose: onCloseJoinGroup } = useDisclosure();

  // const { isLoading, error } = useQuery({
  //     queryKey: ["createGroup"],
  //     queryFn: createGroup,
  //     enabled: shouldCreateGroup,
  //   });

  useEffect(() => {
    sunshine_chat.getAllGroups(searchedGroupName, principal).then((groups) => {
      // console.log(searchedGroupName);
      // mapping buat chat
      if (groups.ok) {
        const listItems = groups.ok.map(([name, lastMessage, id]) => (
          <li
            onClick={() => {
              clickGroup(id);
              console.log(name);
            }}
            className="cursor-pointer text-left"
          >
            <h1>{name}</h1>
            <br />
            <p>{lastMessage}</p>
          </li>
        ));

        //   Setting the state with the list of elements
        setGroups(<ul className="pt-4">{listItems}</ul>);
      }
    });
  }, [groups, searchedGroupName]);

  async function clickGroup(groupId) {
    // async function changeGroup(){
    // await sunshine_chat.focusGroup(groupId);
    console.log(groupId);
    setActiveGroup(groupId);
  }

  // useEffect(()=>{
  //     // sunshine_chat.generateDummyGroup(principal);
  // }, [principal])

  async function showCreateGroupOverlay() {
    wannaCreate = true;
  }
  async function showJoinGroupOverlay() {
    wannaJoin = true;
  }

  async function closeCreateGroupOverlay() {
    // setGroupName("");
    wannaCreate = false;
  }
  async function closeJoinGroupOverlay() {
    // setSearchedGroupToJoinName("");
    wannaJoin = false;
  }

  return (
    <>
      <div className="flex-row h-screen w-[25%] py-3 bg-gray-50 border-solid border-gray-500 border-r border-opacity-50 relative p-4 text-center font-productsans">
        {/* group list */}
        <Input
          focusBorderColor="orange.400"
          variant="filled"
          placeholder="Search Group"
          size="md"
          onChange={(e) => {
            setSearchedGroupName(e.target.value);
          }}
        />
        {groups}
        <div className="absolute flex top-[93%] left-[73%] translate-x-[-50%] gap-4">
          <Button
            className="bg-cream-custom hover:bg-cream-custom-hover"
            color="white"
            onClick={onOpenJoinGroup}
          >
            Join
          </Button>
          <Button
            className="bg-cream-custom hover:bg-cream-custom-hover"
            color="white"
            onClick={onOpenCreateGroup}
          >
            +
          </Button>
        </div>
        <CreateGroupDialog isOpen={isOpenCreateGroup} onClose={onCloseCreateGroup}/>
        <JoinGroupDialog isOpen={isOpenJoinGroup} onClose={onCloseJoinGroup}/>
        {/* <div style={actionsGroupStyle()}>
          <button style={actionBtnStyle()} onClick={showJoinGroupOverlay}>
            Join
          </button>
          <button style={actionBtnStyle()} onClick={showCreateGroupOverlay}>
            +
          </button>
        </div> */}
      </div>
      {/* <div style={overlayStyle()}>
                {wannaCreate ?
                    <CreateGroupContent wannaCreate={wannaCreate} closeCreateGroupOverlay={closeCreateGroupOverlay} overlayBoxStyle={overlayBoxStyle} closeGroupStyle={closeGroupStyle} />
                    : wannaJoin ?
                        <JoinGroupContent wannaJoin={wannaJoin} closeJoinGroupOverlay={closeJoinGroupOverlay} overlayBoxStyle={overlayBoxStyle} closeGroupStyle={closeGroupStyle} />
                        :
                        ""}

            </div> */}
      <ChatBox activeGroup={activeGroup} />
    </>
  );
}
