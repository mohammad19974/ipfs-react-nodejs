import React, { Suspense, useEffect, useState } from 'react';
import logo from './logo.svg';
import './App.css';
import { BiFile, BiUpload } from 'react-icons/bi';

import Dashboard from './dashboard';
import { useQuery } from 'react-query';
import {
    Badge,
    Box,
    Button,
    Image,
    Input,
    InputGroup,
    InputLeftElement,
    List,
    ListIcon,
    ListItem,
    Stack,
    Wrap,
    WrapItem,
} from '@chakra-ui/react';
import { CardFile } from './components/card-file';
import { SearchIcon } from '@chakra-ui/icons';
import { DrawerUpload } from './components/drawer-upload';

const fetchImage = async () => {
    const res = await fetch('http://localhost:3000/getfiles');
    return res.json();
};
function App() {
    const { data, isLoading, isError, refetch } = useQuery(
        'getfiles',
        fetchImage,
    );
    const [search, setSearch] = useState('');
    if (isLoading) {
        return <span>Loading...</span>;
    }

    if (isError) {
        return <span>Error</span>;
    }
    return (
        <Dashboard>
            <Suspense fallback={<>Loading</>}>
                <InputGroup mr="12px">
                    <SeacrhInput
                        onChange={setSearch}
                        value={search}
                    ></SeacrhInput>
                    <DrawerUpload refetch={refetch}></DrawerUpload>
                </InputGroup>
                <List spacing={3}>
                    <Wrap spacing="30px">
                        {data &&
                            data
                                .filter((data: { fileName: string }) =>
                                    data.fileName
                                        .toLowerCase()
                                        .match(
                                            new RegExp(
                                                search.toLowerCase(),
                                                'g',
                                            ),
                                        ),
                                )
                                .map((data: any, index: number) => {
                                    return (
                                        <WrapItem key={index}>
                                            <CardFile
                                                name={data.name}
                                                fileName={data.fileName}
                                                hash={data.hash}
                                                size={data.size}
                                                mimetype={data.mimetype}
                                            ></CardFile>
                                        </WrapItem>
                                    );
                                })}
                    </Wrap>
                </List>
            </Suspense>
        </Dashboard>
    );
}

export default App;
const SeacrhInput = ({
    onChange,
    value,
}: {
    onChange: (value: string) => void;
    value: string;
}) => {
    return (
        <Stack
            bg="white"
            style={{ width: '100%' }}
            mb="23px"
            mr="8px"
            spacing={4}
        >
            <InputGroup>
                <InputLeftElement
                    pointerEvents="none"
                    children={<SearchIcon color="gray.300" />}
                />
                <Input
                    onChange={(event) => onChange(event.target.value)}
                    value={value}
                    type="search"
                    placeholder="File Name"
                />
            </InputGroup>
        </Stack>
    );
};
