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
import Group from "./Group";

export default function GroupList() {
  const [groups, setGroups] = useState();
  const { principal } = useAuth();

  const [searchedGroupName, setSearchedGroupName] = useState("");
  const [activeGroup, setActiveGroup] = useState("");
  const {
    isOpen: isOpenCreateGroup,
    onOpen: onOpenCreateGroup,
    onClose: onCloseCreateGroup,
  } = useDisclosure();
  const {
    isOpen: isOpenJoinGroup,
    onOpen: onOpenJoinGroup,
    onClose: onCloseJoinGroup,
  } = useDisclosure();

  useEffect(() => {
    sunshine_chat.getAllGroups(searchedGroupName, principal).then((groups) => {
      if (groups.ok) {
        const listItems = groups.ok.map(([name, lastMessage, id]) => (
          <Group groupName={name} lastMessage={lastMessage} id={id} setActiveGroup={setActiveGroup} activeGroup={activeGroup} />
        ));

        //   Setting the state with the list of elements
        setGroups(listItems);
      }
    });
  }, [groups, searchedGroupName]);

  return (
    <>
      <div className="flex-row h-screen w-[25%] py-3 bg-gray-50 border-solid border-gray-500 border-r border-opacity-50 relative text-center font-productsans">
        {/* group list */}
        <div className="flex gap-5 p-4">
          <Input
            focusBorderColor="orange.400"
            variant="filled"
            placeholder="Search Group"
            size="md"
            onChange={(e) => {
              setSearchedGroupName(e.target.value);
            }}
          />
          <Button
            className="bg-cream-custom hover:bg-cream-custom-hover"
            color="white"
            onClick={onOpenJoinGroup}
          >
            Join
          </Button>
        </div>
        <div className="overflow-y-scroll h-[93%] flex flex-col pl-4">
          {groups}
        </div>
        <div className="absolute top-[93%] left-[21vw] gap-4 flex">
          <Button
            className="bg-cream-custom hover:bg-cream-custom-hover"
            color="white"
            onClick={onOpenCreateGroup}
            borderRadius={25}
          >
            +
          </Button>
        </div>
        <CreateGroupDialog
          isOpen={isOpenCreateGroup}
          onClose={onCloseCreateGroup}
        />
        <JoinGroupDialog isOpen={isOpenJoinGroup} onClose={onCloseJoinGroup} />
      </div>
      <ChatBox activeGroup={activeGroup} />
    </>
  );
}
