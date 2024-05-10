import {
    Stat,
    StatLabel,
    StatNumber,
    StatHelpText,
    StatArrow,
    StatGroup,
    ChakraProvider,
} from '@chakra-ui/react'

export default function StatLanding(){
    return (
        // <ChakraProvider>
            <StatGroup>
                <Stat>
                    <StatLabel>Chats Sent Today</StatLabel>
                    <StatNumber>20,670</StatNumber>
                    <StatHelpText>
                    <StatArrow type='increase' />
                    4.36%
                    </StatHelpText>
                </Stat>
            </StatGroup>
        // </ChakraProvider>
    )
}