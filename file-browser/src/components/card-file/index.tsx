import {
    Badge,
    Box,
    Button,
    ButtonGroup,
    Code,
    Image,
    Input,
    Link,
} from '@chakra-ui/react';
import { useCallback, useState } from 'react';
import { CardFileProps } from './props';
import { LinkIcon, ViewIcon, ViewOffIcon } from '@chakra-ui/icons';

export const CardFile: React.FC<CardFileProps> = ({
    fileName,
    hash,
    password,
    name,
    size,
    mimetype,
}) => {
    const [isViewHash, setIsViewHash] = useState(false);
    const [passwordText, setPasswordText] = useState('');
    const handleViewHash = useCallback(() => {
        setIsViewHash(!isViewHash);
    }, [isViewHash]);
    function downloadFile(url: string) {
        const a = document.createElement('a');
        a.href = url;

        document.body.appendChild(a);
        a.target = '_black';
        a.click();
        document.body.removeChild(a);
    }
    return (
        <Box
            bg="white"
            maxW="xs"
            borderWidth="1px"
            borderRadius="lg"
            overflow="hidden"
        >
            <Box justifyContent={'center'} display="flex" pt="12px">
                <Image
                    src={'/file.png'}
                    height={'128px'}
                    alt={'roperty.imageAlt'}
                />
            </Box>

            <Box p="6">
                <Box display="flex" alignItems="baseline">
                    <Badge borderRadius="full" px="2" colorScheme="teal">
                        {mimetype ===
                        'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
                            ? 'Word'
                            : mimetype}
                    </Badge>
                    <Box
                        color="gray.500"
                        fontWeight="semibold"
                        letterSpacing="wide"
                        fontSize="xs"
                        textTransform="uppercase"
                        ml="2"
                    >
                        {(size / 1024).toFixed(2)} kB &bull;
                    </Box>
                </Box>
                <Box
                    title={fileName}
                    mt="1"
                    fontWeight="semibold"
                    as="h4"
                    lineHeight="tight"
                    noOfLines={1}
                >
                    {' '}
                    FileName:{' '}
                    {password === null || password === passwordText ? (
                        <Link
                            textColor={'blue.700'}
                            href={`http://127.0.0.1:8080/ipfs/${hash}`}
                            target="_blank"
                        >
                            {fileName}{' '}
                        </Link>
                    ) : (
                        fileName
                    )}
                </Box>
                {/* <Box>
                    Name: {name}
                    <Box as="span" color="gray.600" fontSize="sm"></Box>
                </Box> */}
                <Box display="flex" mt="2" alignItems="center">
                    {password === null || password === passwordText ? (
                        <ButtonGroup variant="outline" spacing="2">
                            <Button
                                leftIcon={
                                    !isViewHash ? (
                                        <ViewIcon />
                                    ) : (
                                        <ViewOffIcon></ViewOffIcon>
                                    )
                                }
                                colorScheme="blue"
                                onClick={handleViewHash}
                            >
                                {isViewHash ? 'hidden' : 'View'} hash
                            </Button>
                            <Button
                                leftIcon={<LinkIcon></LinkIcon>}
                                onClick={() =>
                                    downloadFile(
                                        `http://127.0.0.1:8080/ipfs/${hash}`,
                                    )
                                }
                            >
                                Open file
                            </Button>
                        </ButtonGroup>
                    ) : (
                        ''
                    )}
                </Box>{' '}
                {password !== null && password !== passwordText ? (
                    <Box mt="2px">
                        {' '}
                        <Input
                            value={passwordText}
                            onChange={(e) => setPasswordText(e.target.value)}
                            placeholder="Password"
                        ></Input>
                    </Box>
                ) : (
                    ''
                )}
                <Box mt="2">
                    {isViewHash && <Code display={'inherit'}>{hash}</Code>}
                </Box>
            </Box>
        </Box>
    );
};
