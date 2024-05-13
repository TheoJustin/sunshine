import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { sunshine_game } from "../../../../declarations/sunshine_game";
import TwentyFiveLogo from "../../../../../assets/game/twentyfive.png";
import MentalMathLogo from "../../../../../assets/game/mentalmath.png";
import ReactionTimeLogo from "../../../../../assets/game/reactiontime.png";
import {
  Button,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
import { IoGameController } from "react-icons/io5";
import { useMutation } from "@tanstack/react-query";
import { useAuth } from "../../use-auth-client";
import { sunshine_chat } from "../../../../declarations/sunshine_chat";
import Snackbar from "../Snackbar";
import { IoMdAlert } from "react-icons/io";

function GameOptions({ activeGroup, flag, activeFriend, refetch }) {
  const navigate = useNavigate();
  const { principal } = useAuth();
  // const [isOpen, setIsOpen] = useState(false);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [selectedGame, setSelectedGame] = useState("");
  const toast = useToast();

  const games = [
    {
      id: "firstgame",
      title: "TwentyFive",
      company: "Sunshine Games",
      imageUrl: TwentyFiveLogo,
    },
    {
      id: "secondgame",
      title: "MentalMath",
      company: "Brain Boosters",
      imageUrl: MentalMathLogo,
    },
    {
      id: "thirdgame",
      title: "ReactionTime",
      company: "Quick Reflex Co.",
      imageUrl: ReactionTimeLogo,
    },
  ];

  const handleSelection = (gameId) => setSelectedGame(gameId);
  const { status: createGameStatus, mutate: createGameMutate } = useMutation({
    mutationFn: handleStartGame,
  });

  async function handleStartGame() {
    if (selectedGame) {
      if (flag == "group") {
        await sunshine_chat.createGame(activeGroup, principal, selectedGame);
      } else if (flag == "friend") {
        await sunshine_chat.createGameFriend(
          principal,
          activeFriend,
          selectedGame
        );
      }
      onClose();
      refetch();
    } else {
      toast({
        duration: 5000,
        isClosable: true,
        position: "bottom-right",
        render: () => (
          <Snackbar
            bgColor="bg-red-600"
            icon={<IoMdAlert color="white" />}
            title="Game problem"
            description="Please select one of the game!"
          />
        ),
      });
    }
  }

  return (
    <>
      <Button
        className="bg-orange-custom hover:bg-darkorange-custom"
        size="sm"
        textColor="white"
        onClick={onOpen}
        height={10}
      >
        <IoGameController size={25} />
      </Button>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader fontSize="2xl" className="flex justify-center items-center">Game Selection</ModalHeader>
          <ModalBody>
            <div className="font-sans">
              <p className="text-gray-500 dark:text-gray-400 mb-4 font-productsans text-center">
                Pick a game to test your skills:
              </p>
              <ul className="space-y-4 mb-4 font-sans">
                {games.map((game) => (
                  <li key={game.id}>
                    <input
                      type="radio"
                      id={game.id}
                      name="game"
                      value={game.id}
                      checked={selectedGame === game.title}
                      onChange={() => handleSelection(game.title)}
                      className="hidden peer"
                      required
                    />
                    <label
                      htmlFor={game.id}
                      className="inline-flex items-center justify-between w-full p-5 text-gray-900 bg-white border border-gray-200 rounded-lg cursor-pointer   peer-checked:border-orange-custom peer-checked:text-orange-custom hover:text-gray-900 hover:bg-gray-100 font-sans"
                    >
                      <div className="flex items-center">
                        <img
                          src={game.imageUrl}
                          alt={game.title}
                          className="h-16 w-16 mr-4"
                        />
                        <div>
                          <div className="text-lg font-semibold">
                            {game.title}
                          </div>
                          <div className="text-sm text-gray-500">
                            {game.company}
                          </div>
                        </div>
                      </div>
                    </label>
                  </li>
                ))}
              </ul>
              {createGameStatus == "pending" ? (
                <Button width='100%'
                  className="bg-orange-custom hover:bg-darkorange-custom"
                  color="white"
                  isLoading
                ></Button>
              ) : (
                <Button
                  onClick={createGameMutate}
                  className="w-full bg-orange-custom hover:bg-darkorange-custom"
                  color="white"
                >
                  Start Game
                </Button>
              )}
            </div>
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="red" onClick={onClose}>
              Close
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}

export default GameOptions;
