import React from 'react';
import { Button, ButtonGroup } from '@chakra-ui/react'

export default function BackToChat(){
    return(
        <>
            <Button leftIcon={<MdCall />} colorScheme='blue' variant='outline'>
                Back To Chat
            </Button>
        </>
    )
}