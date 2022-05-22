import { ViewIcon } from '@chakra-ui/icons';
import { Box, Button, Image } from '@chakra-ui/react';
import React from 'react';
export const CardFolder: React.FC<{
    imagePath: string;
    name: string;
    onOpen?: () => void;
    count?: number;
}> = ({ imagePath, name, onOpen, count }) => {
    return (
        <Box
            bg="white"
            maxW="xs"
            width={'220px'}
            borderWidth="1px"
            borderRadius="lg"
            overflow="hidden"
        >
            <Box justifyContent={'center'} display="flex" pt="12px">
                <Image
                    src={imagePath}
                    height={'128px'}
                    alt={'roperty.imageAlt'}
                />
            </Box>

            <Box p="6">
                <Box display="flex" alignItems="baseline">
                    <Box
                        color="gray.500"
                        fontWeight="semibold"
                        letterSpacing="wide"
                        fontSize="xs"
                        textTransform="uppercase"
                        ml="2"
                    >
                        {count} &bull;
                    </Box>
                </Box>

                <Box
                    mt="1"
                    fontWeight="semibold"
                    as="h4"
                    lineHeight="tight"
                    noOfLines={1}
                >
                    {name}
                </Box>

                {/* <Box>
                    Name: {name}
                    <Box as="span" color="gray.600" fontSize="sm"></Box>
                </Box> */}

                <Box display="flex" mt="2" alignItems="center">
                    <Button
                        leftIcon={<ViewIcon />}
                        colorScheme="blue"
                        onClick={onOpen}
                    >
                        Open
                    </Button>
                </Box>
                <Box mt="2">
                    {/* {isViewHash && <Code display={'inherit'}>{hash}</Code>} */}
                </Box>
            </Box>
        </Box>
    );
};
