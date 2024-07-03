import React from 'react';
import { Stack, Box, Typography } from '@mui/material';
import { Container } from './styles';
import { BasketballHeadzTokenInfoType } from '../../../types';
import { Icon } from '@iconify/react';
import { MenuBtn } from './styles';
import Link from 'next/link';
import { SxProps } from '@mui/system';
import { saveAs } from 'file-saver';

type ComponentProps = {
    item: BasketballHeadzTokenInfoType;
    selectedBasketballHeadzTokenId: string;
    setSelectedBasketballHeadzTokenId: (value: string) => void;
    sx?: SxProps;
    onChangeName: (item: BasketballHeadzTokenInfoType) => void;
};

const BasketballHeadzBox: React.FC<ComponentProps> = ({
    item,
    selectedBasketballHeadzTokenId,
    setSelectedBasketballHeadzTokenId,
    sx,
    onChangeName
}): JSX.Element => {
    function downloadBlob(blob: any, name: string) {
        // Convert your blob into a Blob URL (a special url that points to an object in the browser's memory)
        const blobUrl = URL.createObjectURL(blob);
        // Create a link element
        const link = document.createElement('a');
        // Set link's href to point to the Blob URL
        link.href = blobUrl;
        link.setAttribute('download', name);

        // Append link to the body
        document.body.appendChild(link);
        // Dispatch click event on the link
        // This is necessary as link.click() does not work on the latest firefox
        link.click();

        // Remove link from body
        document.body.removeChild(link);
    }


    const saveFile = (image: string) => {
        let fileName = image.split('/').pop();
        saveAs(image, fileName);
    };

    const onClickItem = () => {
        if (selectedBasketballHeadzTokenId === item.tokenId) {
            setSelectedBasketballHeadzTokenId('');
        } else {
            setSelectedBasketballHeadzTokenId(item.tokenId);
        }
    };

    let bbhName: string = item.title;
    if (bbhName.startsWith('Basketball Headz #')) {
        let id: string = bbhName.split('#').pop() || '';
        bbhName = `Basketball Headz #${id.substring(0, 3)}...${id.substring(id.length - 3, id.length)}`;
    }

    return (
        <Container
            rowGap={2}
            selectable
            selected={selectedBasketballHeadzTokenId === item.tokenId}
            onClick={onClickItem}
            sx={{ ...sx }}
        >
            <Box width={166} height={210}>
                {(!!item.image || !!item.animation) && (
                    <img
                        src={!!item.image ? item.image : item.animation}
                        width="100%"
                        height="100%"
                        alt=""
                        className="img"
                    />
                )}
            </Box>
            <Stack spacing={1}>
                <Typography width={140} fontSize={16} fontWeight={700} lineHeight={1.3}>
                    {bbhName}
                </Typography>
                {/* <Typography fontSize={16} fontWeight={400} color="#979797">
                    {item.count}
                </Typography> */}
            </Stack>
            {selectedBasketballHeadzTokenId === item.tokenId && (
                <Stack
                    position="absolute"
                    top="102%"
                    left={0}
                    right={0}
                    paddingY={1}
                    borderRadius={2}
                    sx={{ background: '#1B1C22' }}
                >
                    <MenuBtn
                        onClick={() =>
                            window.open(
                                `${
                                    process.env.NEXT_PUBLIC_ENV == 'production'
                                        ? 'https://opensea.io/assets/ethereum/0xf1ac459201d6a2be148f1a28ae78f9c19e8b5f26'
                                        : 'https://testnets.opensea.io/assets/rinkeby/0x75893670f873fdee8bce2ef5399f6ba07b48fb21'
                                }/${item.tokenId}`,
                                '_blank',
                                'noopener,noreferrer'
                            )
                        }
                    >
                        <img src="/assets/thelab/opensea.svg" width={20} height={20} alt="" />
                        <Typography fontSize={14} fontWeight={600} marginLeft={1.5} padding="0 0 4px">
                            OpenSea
                        </Typography>
                    </MenuBtn>
                    {/* <MenuBtn onClick={() => onChangeName(item)}>
                        <img src="/assets/thelab/change-name.svg" width={18} height={18} alt="" />
                        <Typography fontSize={14} fontWeight={600} marginLeft={1.5} padding="0 0 4px">
                            Change Name
                        </Typography>
                    </MenuBtn> */}
                    <MenuBtn
                        onClick={() => {
                            saveFile(item.image);
                        }}
                    >
                        <img src="/assets/thelab/download.svg" width={18} height={18} alt="" />
                        <Typography fontSize={14} fontWeight={600} marginLeft={1.5} padding="0 0 4px">
                            Download
                        </Typography>
                    </MenuBtn>
                </Stack>
            )}
        </Container>
    );
};

export default BasketballHeadzBox;
