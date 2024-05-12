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
import React, { useEffect, useState } from "react";
import { sunshine_chat } from "../../../../../declarations/sunshine_chat";
import { useAuth } from "../../../use-auth-client";
import { useMutation, useQuery } from "@tanstack/react-query";
import placeholder from "../../../../../../assets/profilePlaceholder.jpg";
import { sunshine_backend } from "../../../../../declarations/sunshine_backend";
import MiniLoader from "../../../components/MiniLoader";
// import { group } from "console";

export default function GroupDetailDialog({ isOpen, onClose, activeGroup }) {
    const [currGroup, setCurrGroup] = useState("");
    const [members, setMembers] = useState("");
    const { user, principal } = useAuth();
    const { status: leaveStatus, mutate: leaveMutate } = useMutation({
        mutationKey: ["leaveGroup"],
        mutationFn: leaveGroup,
    });
    const { status: fetchStatus, mutate: fetchMutate } = useMutation({
        mutationKey: ["fetchDataGroupDetail"],
        mutationFn: fetchData
    })
    async function leaveGroup(activeGroup) {
        console.log(activeGroup);
        await sunshine_chat.leaveGroup(principal, activeGroup);
        console.log("successfully left!");
        // setSearchedGroupToJoinName("");
        onClose();
        return true;
    }
    async function fetchData() {
        console.log(fetchStatus);
        let group = await sunshine_chat.getGroupById(activeGroup);
        console.log(group);
        if (group.ok) {
            setCurrGroup(group.ok);
            const data = await sunshine_chat.getAllMembers(activeGroup);
            const listItems = data.ok.map(([userId, userName, userProfile]) => (
                <div key={userId} className="flex">
                    <img src={userProfile === "" ? placeholder : userProfile} alt="" />
                    <h1>{userName}</h1>
                </div>
            ));
            console.log(listItems);
            //   Setting the state with the list of elements
            setMembers(<ul className="pt-4">{listItems}</ul>);
        }
        return true;
    }
    async function handleLeaveClick(activeGroup) {
        joinMutate(activeGroup);
        console.log("success di handle join");
        // console.log(joinStatus);
    }
    useEffect(() => {
        fetchMutate();
    }, [isOpen])
    return (
        <Modal isOpen={isOpen} onClose={onClose}>
            <ModalOverlay />
            <ModalContent>
                {fetchStatus == 'pending' ? <MiniLoader /> :
                    <>
                        <ModalHeader fontSize="2xl" textAlign="center">{currGroup.groupName}</ModalHeader>
                        <ModalCloseButton />
                        <ModalBody>
                            <div className="flex flex-col gap-4">
                                <div className="text-base">{currGroup.description}</div>

                                <div>
                                    {fetchStatus == 'pending' ? "Loading..." : "Group Members"}
                                    {members}
                                </div>
                            </div>
                            {/* {searchedGroupToJoinName === "" &&
            searchedGroupsToJoin.length === 0 ? (
              <div>Please search for the group's name or description first</div>
            ) : (
              <></>
            )}{" "} */}
                        </ModalBody>
                        <ModalFooter>
                            <Button colorScheme="red" onClick={onClose}>
                                Close
                            </Button>
                            <Button
                                className="bg-cream-custom hover:bg-cream-custom-hover"
                                color="white"
                                onClick={()=> {leaveMutate(activeGroup)}}
                            // onClick={mutate}
                            >
                                Leave Group
                            </Button>
                        </ModalFooter>
                    </>
                }

            </ModalContent>
        </Modal>
    );
}
