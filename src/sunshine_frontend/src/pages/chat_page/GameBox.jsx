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
}) {
  const [isJoined, setIsJoined] = useState(false);
  const navigate = useNavigate();
  const { status: joiningStatus, mutate: joinMutate } = useMutation({
    mutationKey: ["checkJoined"],
    mutationFn: joiningGame,
  });
  async function joiningGame() {
    // console.log(activeGroup, principal, gameId);
    await sunshine_chat.joinGame(principal, gameId);
    navigate(`/${gameType}`, { state: {gameId} });
    return true;
  }
  const { status: checkJoinStatus, mutate: checkMutate } = useMutation({
    mutationKey: ["fetchJoinGame"],
    mutationFn: checkJoined,
  });
  async function checkJoined() {
    let isJoined = await sunshine_chat.isJoinedGame(principal, gameId);
    if (isJoined && isJoined.ok) {
      // if(isJoined.ok)
      setIsJoined(isJoined.ok);
      return "true";
    } else {
      return "false";
    }
  }
  useEffect(() => {
    console.log(score, participants);
    checkMutate();
  }, [principal, gameId])
  return (
    <div className="m-5 flex flex-row items-center">
      {checkJoinStatus == 'pending'  ? (
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
                isLoading={joiningStatus == 'pending' || checkJoinStatus == 'pending' ? true : false} 
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
            <div className="flex flex-col justify-around items-center m-5 w-80">
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
                          <Tr className="text-sm">
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
