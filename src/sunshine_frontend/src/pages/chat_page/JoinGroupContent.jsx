import React, { useEffect, useState } from "react";
import { sunshine_chat } from "../../../../declarations/sunshine_chat";
import { useAuth } from "../../use-auth-client";
import { useMutation, useQuery } from "@tanstack/react-query";
import ChatBox from "./ChatBox";
import CreateGroupContent from "./CreateGroupContent";


const joinButtonStyle = () => ({
    position: 'absolute',
    top: '50%',
    // width: '2rem',
    // height: '2rem',
    borderRadius: '1rem',
    backgroundColor: '#ff9f1c',
    color: '#ffffff',
    left: '80%',
});


export default function JoinGroupContent({ closeJoinGroupOverlay, overlayBoxStyle, closeGroupStyle }) {
    // for join group
    const [searchedGroupsToJoin, setSearchedGroupsToJoin] = useState();
    const [searchedGroupToJoinName, setSearchedGroupToJoinName] = useState("");
    const { user, principal } = useAuth();
    const { status: joinStatus, mutate: joinMutate } = useMutation({
        mutationKey: ["createGroup"],
        mutationFn: joinGroup,
    })
    async function joinGroup(groupId) {
        console.log(groupId);
        await sunshine_chat.addGroupMember(principal, groupId);
        console.log("successfully joined!")
        closeJoinGroupOverlay();
        return true;
    }
    async function handleJoinClick(groupId){
        joinMutate(groupId);
        console.log("success di handle join")
        console.log(joinStatus);
    }
    useEffect(() => {
        sunshine_chat.getAllUnjoinedGroups(searchedGroupToJoinName, principal).then(groups => {
            // console.log(searchedGroupName);
            // mapping buat chat
            if (groups.ok) {
                const listItems = groups.ok.map(([name, description, id]) => (

                    <li className="text-left font-productsans relative">
                        <h1>{name}</h1>
                        <p>{description}</p>
                        <button style={joinButtonStyle()} onClick={() => handleJoinClick(id)}>
                            Join 
                        </button>
                    </li>
                ));

                //   Setting the state with the list of elements
                setSearchedGroupsToJoin(<ul className="pt-4">{listItems}</ul>);
            }
            else {
                setSearchedGroupsToJoin("Please search for the group's name or description first")
            }
        })
    }, [searchedGroupToJoinName])

    return (
        <div style={overlayBoxStyle()} className="justify-center flex-row text-center">
            <button style={closeGroupStyle()} onClick={closeJoinGroupOverlay}>
                X
            </button>
            <h1 className="text-center font-productsans text-3xl pb-4">Join Group</h1>
            <input placeholder="Search group's name" type="text" style={{
                border: '3px solid #B0DDD6 ',
                borderRadius: '0.5rem',
                padding: '0.5rem'
            }} value={searchedGroupToJoinName} className="font-productsans text-xl" onChange={(e) => { setSearchedGroupToJoinName(e.target.value) }} />
            <br />
            {searchedGroupsToJoin}
        </div>
    )
}