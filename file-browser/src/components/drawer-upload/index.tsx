import {
    Button,
    Drawer,
    DrawerBody,
    DrawerCloseButton,
    DrawerContent,
    DrawerFooter,
    DrawerHeader,
    DrawerOverlay,
    FormControl,
    FormLabel,
    Input,
    Switch,
    useDisclosure,
    useToast,
} from '@chakra-ui/react';
import axios from 'axios';
import React, { useState } from 'react';
import { BiUpload } from 'react-icons/bi';
import { useMutation } from 'react-query';

export function DrawerUpload({ refetch }: any) {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const [password, setPassword] = useState('');
    const [isPassword, setIsPassword] = useState(false);
    const btnRef = React.useRef<any>();
    const toast = useToast();
    const [file, setFile] = useState<any>(undefined);
    const { mutate, isLoading } = useMutation(
        (body: any) => {
            return axios.post('http://localhost:3000/upload', body, {
                headers: {
                    'content-type': 'multipart/form-data',
                },
            });
        },
        {
            onSuccess: () => {
                toast({
                    title: 'Upload Success',
                    description: 'Created new File',
                    status: 'success',
                    duration: 5000,
                    isClosable: true,
                });
                refetch();
                setIsPassword(false);
                onClose();
            },
            onError: () => {
                toast({
                    title: 'Upload failed',
                    description: 'An error occurred while uploading the file ',
                    status: 'error',
                    duration: 5000,
                    isClosable: true,
                });
            },
        },
    );
    const onSubmit = () => {
        if (isPassword) {
            if (password === '') {
                alert('enter password or press disable password');
                return;
            }
        }
        if (file !== undefined) {
            // Create an object of formData
            // // const formData = new FormData();
            // console.log(file[0]);
            // Update the formData object
            // formData.append('file', file[0]);
            mutate({
                file: file[0],
                password: isPassword ? password : undefined,
            });
        } else {
            alert('Please choose file');
        }
    };
    return (
        <>
            <Button
                ref={btnRef}
                onClick={onOpen}
                leftIcon={<BiUpload />}
                colorScheme="teal"
                variant="solid"
            >
                New File
            </Button>
            <Drawer
                isOpen={isOpen}
                placement="right"
                onClose={onClose}
                finalFocusRef={btnRef}
            >
                <DrawerOverlay />
                <DrawerContent>
                    <DrawerCloseButton />
                    <DrawerHeader>Upload new File</DrawerHeader>

                    <DrawerBody>
                        <Input
                            onChange={(e) => setFile(e.target?.files!)}
                            type="file"
                        ></Input>
                        <FormControl
                            mt="8px"
                            display="flex"
                            alignItems="center"
                        >
                            <FormLabel htmlFor="email-alerts" mb="0">
                                Enable password
                            </FormLabel>
                            <Switch
                                isChecked={isPassword}
                                onChange={(e) => {
                                    setIsPassword(e.target.checked as any);
                                    setPassword('');
                                }}
                                id="email-alerts"
                            />
                        </FormControl>
                        {isPassword && (
                            <Input
                                mt="4px"
                                value={password}
                                type="password"
                                placeholder="Password"
                                onChange={(e) => setPassword(e.target.value)}
                                isRequired={true}
                                required
                            ></Input>
                        )}
                    </DrawerBody>

                    <DrawerFooter>
                        <Button variant="outline" mr={3} onClick={onClose}>
                            Cancel
                        </Button>
                        <Button
                            disabled={isLoading}
                            isLoading={isLoading}
                            colorScheme="blue"
                            onClick={onSubmit}
                        >
                            Save
                        </Button>
                    </DrawerFooter>
                </DrawerContent>
            </Drawer>
        </>
    );
}
