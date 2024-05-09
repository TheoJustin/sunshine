

import React, { useEffect, useState } from "react";
import { sunshine_chat } from "../../../../declarations/sunshine_chat";
import { useAuth } from "../../use-auth-client";
import { useMutation, useQuery } from "@tanstack/react-query";
import ChatBox from "./ChatBox";




// const closeGroupStyle = () => ({
//     position: 'absolute',
//     top: '8%',
//     borderRadius: '1rem',
//     // backgroundColor: '#ff9f1c',
//     size: '2rem',
//     left: '90%'
// })

// const overlayBoxStyle = () => ({
//     position: 'fixed',
//     padding: '2rem',
//     top: '50%',
//     borderRadius: '1rem',
//     transform: 'translate(-50%, -50%)',
//     backgroundColor: '#ffffff',
//     width: '50%',
//     height: 'auto',
//     left: '50%'
// })

export default function CreateGroupContent({ closeCreateGroupOverlay, overlayBoxStyle, closeGroupStyle }) {
    const { status: createStatus, mutate: createMutate } = useMutation({
        mutationFn: createGroup,
        mutationKey: ["createGroup"]
    })
    const { user, principal } = useAuth();
    const [groupName, setGroupName] = useState("");
    const [groupDescription, setGroupDescription] = useState("");

    async function handleClick() {
        createMutate();
        console.log("create clicked");
        console.log(createStatus);
    }

    async function createGroup() {
        // console.lo
        await sunshine_chat.createGroup(groupName, principal, groupDescription);
        // wannaCreate = false;
        setGroupName("");
        closeCreateGroupOverlay();
        return true;
    }

    return (
        <div style={overlayBoxStyle()} className="justify-center flex-row text-center">
            <button style={closeGroupStyle()} onClick={closeCreateGroupOverlay}>
                X
            </button>
            <h1 className="text-center font-productsans text-3xl pb-4">Create Group</h1>
            <h3 className="text-center font-productsans p-5 text-2xl">Enter your group name and description below :)</h3>
            <input placeholder="Group Name" type="text" style={{
                border: '3px solid #B0DDD6 ',
                borderRadius: '0.5rem',
                padding: '0.5rem'
            }} value={groupName} className="font-productsans text-xl" onChange={(e) => { setGroupName(e.target.value) }} />
            <br />

            <input placeholder="Group Description" type="text" style={{
                border: '3px solid #B0DDD6 ',
                borderRadius: '0.5rem',
                padding: '0.5rem'
            }} value={groupDescription} className="font-productsans text-xl mt-3" onChange={(e) => { setGroupDescription(e.target.value) }} />
            <br />

            <button className="font-productsans pt-5 text-center text-2xl mt-10 text-" onClick={createStatus === 'pending' ? null : handleClick} style={{
                backgroundColor: '#ff9f1c',
                color: '#ffffff',
                borderRadius: '0.5rem',
                padding: '0.8rem 1.5rem',
                // fontWeight: '600'
            }}>
                {createStatus === 'pending' ? "Loading..." : "Create"}
                {/* Create */}
            </button>
        </div>
    )
}