import { useMutation, useQuery } from "@tanstack/react-query";
import { useState } from "react"
import { sunshine_chat } from "../../../../declarations/sunshine_chat";
import { useNavigate } from "react-router-dom";


export default function GameBox({ principal, gameId, participants, score, gameType, activeGroup }) {

    const [isJoined, setIsJoined] = useState(false);
    const navigate = useNavigate();
    const { status: joiningStatus, mutate: joinMutate } = useMutation({
        mutationKey: ["checkJoined"],
        mutationFn: joiningGame
    });
    async function joiningGame() {
        console.log(activeGroup, principal, gameId);
        await sunshine_chat.joinGame(activeGroup, principal, gameId);
        navigate(`/${gameType}`, { state: { gameId } });
        return true;
    }
    const { isLoading: loadingFetchJoin, data } = useQuery({
        queryKey: ["fetchJoinGame", principal, gameId],
        queryFn: () => { return checkJoined(principal, gameId) }
    })
    async function checkJoined(principal, gameId) {
        let isJoined = await sunshine_chat.isJoinedGame(principal, gameId);
        console.log(isJoined);
        console.log(isJoined.ok);
        if (isJoined) {
            // if(isJoined.ok)
            setIsJoined(isJoined.ok);
            return "true";
        }
        else {
            console.log("error");
            return "false";
        }
        // return isJoined;
        // return true;
    }
    return (
        <>
            {loadingFetchJoin}
            {joiningStatus}
            <h2>{gameType}</h2>
            {
                participants.map((name, index) => (
                    <p key={index}>{name} : {score[index].toString()}</p>
                ))
            }
            {/* {participants} */}
            <p>Press button below to join game!</p>
            {loadingFetchJoin ? "loading" : isJoined ?
                <button >
                    You have already participated
                </button> :
                <button onClick={() => { joinMutate() }}>
                    {joiningStatus === 'pending' ? "loading" : "Join Game"}
                </button>}

        </>
    )
}