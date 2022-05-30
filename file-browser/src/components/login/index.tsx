import { useState } from 'react';
import {
    Flex,
    Heading,
    Input,
    Button,
    InputGroup,
    Stack,
    InputLeftElement,
    chakra,
    Box,
    Link,
    Avatar,
    FormControl,
    FormHelperText,
    InputRightElement,
    useToast,
} from '@chakra-ui/react';
import { FaUserAlt, FaLock } from 'react-icons/fa';
import { useMutation } from 'react-query';
import axios from 'axios';

const CFaUserAlt = chakra(FaUserAlt);
const CFaLock = chakra(FaLock);

const Login = ({setIsLogin}:any) => {
    const [showPassword, setShowPassword] = useState(false);
const [username,setUsername]=useState("")
const [password,setPassword]=useState("")
const toast = useToast();
    const handleShowClick = () => setShowPassword(!showPassword);
    const onSubmit = () => {
        if(password&&username){
        axios.get(`http://localhost:3000/login/${username}/${password}`, {
         
        }).then((res)=>{


            if(res.data){
                if(res.data.isLogin){
                    setIsLogin(true)
                    localStorage.setItem("islogin","true")
                }else{
                    setIsLogin(false)
                    toast({
                        title: 'incorrect data',
                        description: 'useranme and password is incorrect',
                        status: 'error',
                        duration: 5000,
                        isClosable: true,
                    });
                }
            }
        })
    
    }else{
        toast({
            title: 'validation Error',
            description: 'plz fill your username and password',
            status: 'error',
            duration: 5000,
            isClosable: true,
        });
        }
    };
    return (
        <Flex
            flexDirection="column"
            width="100wh"
            height="100vh"
            backgroundColor="gray.200"
            justifyContent="center"
            alignItems="center"
        >
            <Stack
                flexDir="column"
                mb="2"
                justifyContent="center"
                alignItems="center"
            >
                <img src='/logoD.png' style={{height:"120px"}} />
                {/* <Heading color="teal.400">Welcome</Heading> */}
                <Box minW={{ base: '90%', md: '468px' }}>
                    <form>
                        <Stack
                            spacing={4}
                            p="1rem"
                            backgroundColor="whiteAlpha.900"
                            boxShadow="md"
                        >
                            <FormControl>
                                <InputGroup>
                                    <InputLeftElement
                                        pointerEvents="none"
                                        children={
                                            <CFaUserAlt color="gray.300" />
                                        }
                                    />
                                    <Input
                                    value={username}
                                    onChange={(e)=>setUsername(e.target.value)}
                                        type="text"
                                        placeholder="Username"
                                    />
                                </InputGroup>
                            </FormControl>
                            <FormControl>
                                <InputGroup>
                                    <InputLeftElement
                                        pointerEvents="none"
                                        color="gray.300"
                                        children={<CFaLock color="gray.300" />}
                                    />
                                    <Input
                                          value={password}
                                          onChange={(e)=>setPassword(e.target.value)}
                                        type={
                                            showPassword ? 'text' : 'password'
                                        }
                                        placeholder="Password"
                                    />
                                    <InputRightElement width="4.5rem">
                                        <Button
                                            h="1.75rem"
                                            size="sm"
                                            onClick={handleShowClick}
                                        >
                                            {showPassword ? 'Hide' : 'Show'}
                                        </Button>
                                    </InputRightElement>
                                </InputGroup>
                                {/* <FormHelperText textAlign="right">
                                    <Link>forgot password?</Link>
                                </FormHelperText> */}
                            </FormControl>
                            <Button
                                onClick={onSubmit}
                                borderRadius={0}
                                type="submit"
                                variant="solid"
                                colorScheme="teal"
                                width="full"
                            >
                                Login
                            </Button>
                        </Stack>
                    </form>
                </Box>
            </Stack>
            {/* <Box>
                New to us?{' '}
                <Link color="teal.500" href="#">
                    Sign Up
                </Link>
            </Box> */}
        </Flex>
    );
};

export default Login;
