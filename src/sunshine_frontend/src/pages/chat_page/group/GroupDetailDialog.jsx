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
import React, { useEffect, useState } from "react";
import { sunshine_chat } from "../../../../../declarations/sunshine_chat";
import { useAuth } from "../../../use-auth-client";
import { useMutation, useQuery } from "@tanstack/react-query";
import placeholder from "../../../../../../assets/profilePlaceholder.jpg";
import { sunshine_backend } from "../../../../../declarations/sunshine_backend";
import MiniLoader from "../../../components/MiniLoader";
import { center } from "@cloudinary/url-gen/qualifiers/textAlignment";
import ProfileDialog from "./ProfileDialog";

export default function GroupDetailDialog({ isOpen, onClose, activeGroup, setActiveGroup, passedPrincipal, setPassedPrincipal, onOpenProfile }) {
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
        await sunshine_chat.leaveGroup(principal, activeGroup);
        setActiveGroup("");
        onClose();
        return true;
    }
    async function fetchData() {
        let group = await sunshine_chat.getGroupById(activeGroup);
        if (group.ok) {
            setCurrGroup(group.ok);
            const data = await sunshine_chat.getAllMembers(activeGroup);
            const listItems = data.ok.map(([userId, userName, userProfile]) => (
                <div key={userId} className="flex items-center cursor-pointer" onClick={() => { userId.toString() === principal.toString() ? null : (setPassedPrincipal(userId), onOpenProfile()) }}>
                    <img src={userProfile === "" ? placeholder : userProfile} className="m-0 w-14 h-14 rounded-full object-cover" alt="" />
                    <h1 className="ml-3 text-lg">{userName}</h1>
                </div>
            ));
            setMembers(<div className="bg-lightcream-custom p-5 rounded-xl text-center">
                <h1 className="border-b-2 font-semibold text-xl border-orange-custom pb-3 ">Group Members</h1>
                <div className="pt-3 overflow-y-scroll max-h-28 space-y-3">
                    {listItems}

                </div>
            </div>);
        }
        return true;
    }
    async function handleLeaveClick(activeGroup) {
        joinMutate(activeGroup);
    }
    useEffect(() => {
        fetchMutate();
    }, [isOpen])
    return (
        <Modal isOpen={isOpen} onClose={onClose}>
            <ModalOverlay />
            <ModalContent minH='50vh'>
                {fetchStatus == 'pending' ? <div className="flex justify-center items-center">
                <MiniLoader />
                </div>  :
                    <>
                        <ModalHeader fontSize="2xl" textAlign="center">{currGroup.groupName}</ModalHeader>
                        <ModalCloseButton />
                        <ModalBody>
                            <div className="flex flex-col gap-4">
                                <div><img className="rounded-full object-cover w-24 h-24" src={currGroup.imageUrl == "" ? placeholder : currGroup.imageUrl} alt="" /></div>
                                <div className="text-base text-center">{currGroup.description}</div>

                                <div>
                                    {members}
                                </div>
                            </div>
                        </ModalBody>
                        <ModalFooter justifyContent='center' width='100%'>
                            <Button colorScheme="red" width='40%' mr={3} onClick={onClose}>
                                Close
                            </Button>
                            <Button
                                width='40%'
                                className="bg-orange-custom hover:bg-darkorange-custom"
                                color="white"
                                isLoading={leaveStatus == 'pending' ? true : false}
                                onClick={() => { leaveMutate(activeGroup) }}
                            >
                                Leave Group
                            </Button>
                        </ModalFooter>
                    </>
                }

            </ModalContent>
            {/* <ProfileDialog
                isOpen={isOpenProfile}
                onClose={onCloseProfile}
                passedPrincipal={passedPrincipal}
                setPassedPrincipal={setPassedPrincipal}
                onOpenSendMoney={onOpenSendMoney}
                refetch={() => { dataMutate() }}
            /> */}
        </Modal>
    );
}
