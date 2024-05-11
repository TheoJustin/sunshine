import { useMutation, useQuery } from "@tanstack/react-query";
import { useState } from "react";
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
    navigate(`/${gameType}`, { state: { gameId } });
    return true;
  }
  const { isLoading: loadingFetchJoin, data } = useQuery({
    queryKey: ["fetchJoinGame", principal, gameId],
    queryFn: () => {
      return checkJoined(principal, gameId);
    },
  });
  async function checkJoined(principal, gameId) {
    let isJoined = await sunshine_chat.isJoinedGame(principal, gameId);
    console.log(isJoined);
    console.log(isJoined.ok);
    if (isJoined) {
      // if(isJoined.ok)
      setIsJoined(isJoined.ok);
      return "true";
    } else {
      console.log("error");
      return "false";
    }
    // return isJoined;
    // return true;
  }
  return (
    <div className="m-5 flex flex-row">
      {loadingFetchJoin ? (
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
          <div className="flex flex-col w-full justify-center items-center">
            <div className="flex flex-row">
              <h2 className="font-sans font-medium">Game :</h2>
              <h2 className="font-sans font-semibold ml-2">{gameType}</h2>
            </div>
            {gameType === "TwentyFive" ? (
              <img
                class="w-96 rounded-xl h-96 md:h-auto md:w-48"
                src={firstLogo}
                alt="game"
              />
            ) : gameType === "MentalMath" ? (
              <img
                class="w-96 rounded-xl h-96 md:h-auto md:w-48"
                src={secondLogo}
                alt="game"
              />
            ) : (
              <img
                class=" w-96 rounded-xl h-96 md:h-auto md:w-48"
                src={thirdLogo}
                alt="game"
              />
            )}

            
              {/* here */}
              {joiningStatus !== "pending" && !isJoined ? (
                <>
                  <button
                    type="button"
                    class="m-4 w-36 rounded-xl text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium text-sm px-5 py-2.5 text-center inline-flex items-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                    onClick={() => {
                      joinMutate();
                    }}
                  >
                    Play Game
                    <svg
                      class="rtl:rotate-180 w-5 h-3.5 ms-2"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 14 10"
                    >
                      <path
                        stroke="currentColor"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M1 5h12m0 0L9 1m4 4L9 9"
                      />
                    </svg>
                  </button>
                </>
              ) : (
                <></>
              )}
          </div>

          <div className="flex flex-col justify-around items-center m-5">
            {/* first */}
            {participants.length >= 1 ? (
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
            ) : (
              <></>
            )}
            {/* second */}
            {loadingFetchJoin ? (
              // checks if it is loading
              <></>
            ) : isJoined ? (
              // if not, then it checks if it has already joined
              <button
                type="button"
                disabled
                className="inline-flex items-center px-4 py-2 text-sm font-sans rounded-md shadow-sm text-white bg-lime-500 cursor-not-allowed hover:bg-lime-600"
              >
                <svg
                  className="w-8 h-6 mr-2 -ml-1 text-white"
                  fill="none"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path d="M5 13l4 4L19 7"></path>
                </svg>
                You have already participated
              </button>
            ) : (
              // if all are false then shows a button to play
              <>
                {joiningStatus !== "pending" ? (
                  <>
                  </>
                ) : (
                  <>
                    <button
                      disabled
                      type="button"
                      class="m-4 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 inline-flex items-center"
                    >
                      <svg
                        aria-hidden="true"
                        role="status"
                        class="inline w-4 h-4 me-3 text-white animate-spin"
                        viewBox="0 0 100 101"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                          fill="#E5E7EB"
                        />
                        <path
                          d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                          fill="currentColor"
                        />
                      </svg>
                      Loading...
                    </button>
                  </>
                )}
              </>
            )}
          </div>
        </>
      )}
    </div>
  );
}
