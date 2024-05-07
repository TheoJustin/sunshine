import React, { useEffect, useState } from "react";
import { sunshine_chat } from "../../../../declarations/sunshine_chat";
import { useAuth } from "../../use-auth-client";

export default function GroupList() {
    const [groups, setGroups] = useState();
    const { principal } = useAuth();
    useEffect(()=>{
        sunshine_chat.getAllGroups().then(groups => {
            // console.log(groups);
            // mapping buat chat
            if (groups.ok) {
                const listItems = groups.ok.map(([name, lastMessage, id]) => (

                    <li onClick={() => {clickGroup(id); console.log(name)}} className="cursor-pointer">
                        <h1>{name}</h1> 
                        <br />
                        <p>{lastMessage}</p>
                    </li>
                ));

                //   Setting the state with the list of elements
                setGroups(<ul>{listItems}</ul>);
            }
        })
    }, [groups])

    async function clickGroup(groupId){
        // async function changeGroup(){
            await sunshine_chat.focusGroup(groupId);
        // }
        await console.log(sunshine_chat.getCurrentGroup());
        // changeGroup();
    }

    useEffect(()=>{
        sunshine_chat.generateDummyGroup(principal);
    }, [principal])

    return (
        <div className="flex h-screen w-[25%] py-3 bg-gray-50 border-solid border-gray-500 border-r border-opacity-50">
            {/* group list */}
            {groups}
        </div>
    );
}
