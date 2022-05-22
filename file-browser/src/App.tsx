import React, { Suspense, useEffect, useState } from 'react';
import logo from './logo.svg';
import './App.css';
import { BiArrowBack, BiFile, BiUpload } from 'react-icons/bi';
import { CardFolder } from './components/card-folder';
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
const filter = [
    {
        name: 'Images',
        imagePath: process.env.PUBLIC_URL + '/gallery.png',
        group: [
            'png',
            'jpeg',
            'gif',
            'psd',
            'jpg',
            'avif',
            'bmp',
            'webp',
            'svg',
        ],
    },
    {
        name: 'Documents',
        imagePath: process.env.PUBLIC_URL + '/doc.png',
        group: [
            'pdf',
            'docx',
            'csv',
            'doc',
            'xls',
            'xlsx',
            'txt',
            'ppt',
            'pptx',
        ],
    },
    {
        name: 'Other',
        imagePath: process.env.PUBLIC_URL + '/folder.png',
        group: [
            'bin',
            'exe',
            'aac',
            'arc',
            'iso',
            'avi',
            'bz',
            'css',
            'js',
            'bz2',
            'eot',
            'epub',
            'gz',
            'htm',
            'html',
            'ico',
            'jar',
            'js',
            'json',
            'mp3',
            'mp4',
            'mpeg',
            'php',
            'rar',
            'sh',
            'swf',
            'ts',
            'wav',
            'webm',
            'xhtml',
            'zip',
            '3gp',
            'md',
            '7z',
        ],
    },
];
const fetchImage = async () => {
    const res = await fetch('http://localhost:3000/getfiles');
    return res.json();
};
function App() {
    const { data, isLoading, isError, refetch } = useQuery(
        'getfiles',
        fetchImage,
    );
    const [files, setFiles] = useState([]);
    const [search, setSearch] = useState('');
    if (isLoading) {
        return <span>Loading...</span>;
    }

    if (isError) {
        return <span>Error</span>;
    }
    //console.log(mime.extension('IMAGE/JPEG'));
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
                    {files.length !== 0 && (
                        <Button
                            colorScheme="linkedin"
                            onClick={() => setFiles([])}
                            leftIcon={<BiArrowBack />}
                        >
                            Back
                        </Button>
                    )}
                    {files.length === 0 ? (
                        <Box display={'flex'} gap="2">
                            {data &&
                                filter.map((dataa, index) => (
                                    <CardFolder
                                        key={index}
                                        onOpen={() =>
                                            setFiles(
                                                data.filter((item: any) =>
                                                    dataa.group.includes(
                                                        item.mimetype,
                                                    ),
                                                ),
                                            )
                                        }
                                        count={
                                            data.filter((item: any) =>
                                                dataa.group.includes(
                                                    item.mimetype,
                                                ),
                                            ).length
                                        }
                                        imagePath={dataa.imagePath}
                                        name={dataa.name}
                                    ></CardFolder>
                                ))}
                        </Box>
                    ) : (
                        ''
                    )}
                    <Wrap spacing="30px">
                        {data &&
                            (files.length === 0 && search ? data : files)
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
                                                password={data.password}
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
