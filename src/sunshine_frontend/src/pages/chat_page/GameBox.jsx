import { useMutation, useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { sunshine_chat } from "../../../../declarations/sunshine_chat";
import { useNavigate } from "react-router-dom";
import firstLogo from "../../../../../assets/game/twentyfive.png";
import secondLogo from "../../../../../assets/game/mentalmath.png";
import thirdLogo from "../../../../../assets/game/reactiontime.png";
import {
  Spinner,
  Table,
  Thead,
  Tbody,
  Tfoot,
  Tr,
  Th,
  Td,
  TableCaption,
  TableContainer,
  ChakraProvider,
  Button,
  Wrap,
} from "@chakra-ui/react";

export default function GameBox({
  principal,
  gameId,
  participants,
  score,
  gameType,
  activeGroup,
}) {
  const [isJoined, setIsJoined] = useState(false);
  const navigate = useNavigate();
  const { status: joiningStatus, mutate: joinMutate } = useMutation({
    mutationKey: ["checkJoined"],
    mutationFn: joiningGame,
  });
  async function joiningGame() {
    console.log(activeGroup, principal, gameId);
    await sunshine_chat.joinGame(activeGroup, principal, gameId);
    navigate(`/${gameType}`, { state: {gameId} });
    return true;
  }
  const { isLoading: loadingFetchJoin, data } = useQuery({
    queryKey: ["fetchJoinGame", principal, gameId],
    queryFn: () => {
      console.log(participants);
      return checkJoined(principal, gameId);
    },
  });
  async function checkJoined(principal, gameId) {
    let isJoined = await sunshine_chat.isJoinedGame(principal, gameId);
    console.log(isJoined);
    console.log(participants);
    console.log(isJoined.ok);
    if (isJoined.ok != null) {
      // if(isJoined.ok)
      setIsJoined(isJoined. ok);
      return "true";
    } else {
      return "false";
    }
  }
  useEffect(() => {
    console.log(score, participants);
  }, [])
  return (
    <div className="m-5 flex flex-row">
      {loadingFetchJoin == true  ? (
        <>
          <ChakraProvider>
            <Spinner
              thickness="4px"
              speed="0.65s"
              emptyColor="gray.200"
              color="orange.500"
              size="xl"
              className="m-4"
            />
          </ChakraProvider>
        </>
      ) : (
        <>
          <div className="flex flex-col w-[12vw] text-base space-y-3 text-center items-center">
            {/* <div className="flex flex-row">   */}
            {/* <h2 className="font-sans font-medium">Game :</h2> */}
            <h2 className="font-sans font-semibold">{gameType}</h2>
            {/* </div> */}
            <img
              className="rounded-xl max-w-20"
              src={gameType === "TwentyFive" ? firstLogo : gameType === "MentalMath" ? secondLogo : gameType === "ReactionTime" ? thirdLogo : ""}
              alt="game"
            />
            {/* here */}
            {!isJoined ? (
              <>
                <Button onClick={() => { joinMutate() }} 
                isLoading={joiningStatus == 'pending' ? true : false} 
                className="bg-green-custom hover:bg-darkgreen-custom font-productsans" color="white">
                  Play Game
                </Button>
              </>
            ) : (
              <Button disabled className="bg-gray-300 hover:bg-gray-400 w-full font-productsans" color="gray">
                Already Played
              </Button>
            )}
          </div>
          {participants.length >= 1 ?
            <div className="flex flex-col justify-around items-center m-5">
              <ChakraProvider>
                <TableContainer className="mb-5">
                  <Table variant="simple">
                    <Thead>
                      <Tr>
                        <Th>Name</Th>
                        <Th>Score</Th>
                      </Tr>
                    </Thead>
                    <Tbody>
                      {participants.map((name, index) => (
                        <>
                          <Tr>
                            <Td>{name}</Td>
                            <Td>{score[index].toString()}</Td>
                          </Tr>
                        </>
                      ))}
                    </Tbody>
                  </Table>
                </TableContainer>
              </ChakraProvider>
            </div>
            :
            <></>
          }
        </>
      )}
    </div>
  );
}
