import React, { useEffect, useState } from "react";
import { sunshine_chat } from "../../../../../declarations/sunshine_chat";
import { useAuth } from "../../../use-auth-client";
import { useMutation, useQuery } from "@tanstack/react-query";
import { Button, Input, useDisclosure } from "@chakra-ui/react";
import { PhoneIcon, SearchIcon } from "lucide-react";
import { MagnifyingGlassIcon } from "@heroicons/react/24/solid";
import CreateGroupDialog from "./CreateGroupDialog";
import JoinGroupDialog from "./JoinGroupDialog";
import Group from "./Group";
import Skeleton from "../../../components/Skeleton";

export default function GroupList({ activeGroup, setActiveGroup }) {
  const [groups, setGroups] = useState();
  const { principal } = useAuth();

  const [searchedGroupName, setSearchedGroupName] = useState("");
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

  const { isLoading, error, isFetching } = useQuery({
    queryKey: ["fetchGroups", groups, searchedGroupName],
    queryFn: fetchGroups,
  });

  useEffect(() => {
    fetchGroups();
  }, [groups, searchedGroupName]);

  async function fetchGroups  () {
    const groups = await sunshine_chat.getAllGroups(searchedGroupName, principal);
      if (groups.ok) {
        const listItems = groups.ok.map(
          ([name, lastMessage, id, imageUrl], idx) => (
            <Group
              key={idx}
              groupName={name}
              lastMessage={lastMessage}
              id={id}
              imageUrl={imageUrl}
              setActiveGroup={setActiveGroup}
              activeGroup={activeGroup}
            />
          )
        );
        setGroups(listItems);
      }
    ;
    return true;
  };

  return (
    <>
      <div className="flex-row h-screen w-[25%] py-3 bg-gray-50 border-solid border-gray-500 border-r border-opacity-50 relative text-center font-productsans">
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
            className="bg-orange-custom hover:bg-darkorange-custom"
            color="white"
            onClick={onOpenJoinGroup}
          >
            Join
          </Button>
        </div>
        <div className="overflow-y-scroll h-[93%] flex flex-col pl-4">
          {isLoading || isFetching ? <Skeleton /> : groups}
        </div>
        <div className="absolute top-[93%] left-[21vw] gap-4 flex">
          <Button
            className="bg-orange-custom hover:bg-darkorange-custom"
            color="white"
            onClick={onOpenCreateGroup}
            borderRadius={9999}
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
    </>
  );
}
