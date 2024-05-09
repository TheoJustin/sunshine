import React from 'react';
import { useNavigate } from "react-router-dom";
import { Button, useDisclosure, Modal, ModalOverlay, ModalContent, ModalHeader, ModalCloseButton, ModalBody, ChakraProvider } from '@chakra-ui/react';
import { MdArrowBack } from 'react-icons/md';

export default function BackToChat({ score }) {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const navigate = useNavigate();

    const handleBackToChat = () => {
        onClose();
        navigate('/chat');
    };

    return (
        <>
        <ChakraProvider>
        <Button onClick={onOpen}>Continue</Button>
            <Modal isOpen={isOpen} onClose={onClose}>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader className='font-sans font-bold text-6xl'>Game Over</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        
                        <h1 className="font-sans mb-4 font-semibold">
                            Final score is: {score}
                        </h1>
                        <Button leftIcon={<MdArrowBack />} colorScheme='blue' variant='outline' onClick={handleBackToChat} className='mb-5'>
                            Back To Chat
                        </Button>
                    </ModalBody>
                </ModalContent>
            </Modal>
        </ChakraProvider>
        </>
    );
}
