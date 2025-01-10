import React from 'react';
import Navbar from "@/components/Navbar";
import Player from "@/components/player/Player";
import {Container} from "@mui/material";
import Box from "@mui/material/Box";
import Head from "next/head";
import {width} from "@mui/system";

interface MainLayoutProps {
    title?: string;
    description?: string;
    keywords?: string;
}

const MainLayout: React.FC<MainLayoutProps>
    = ({
           children,
           title,
           description,
           keywords
       }) => {
    return (
        <>
            <Head>
                <title>{title} {title && '|'} Music platform</title>
                <meta name={'description'} content={'Storage for your music. ' + description}/>
                <meta name={'robots'} content={"index, follow"}/>
                <meta name={'keywords'} content={keywords + ', music, tracks, platform'}/>
                <meta name={'viewport'} content={"width=device-width, initial-scale=1"}/>
            </Head>
            <Navbar>
                <Box sx={{p: 3, marginBottom: "60px"}}>
                    {children}
                </Box>
            </Navbar>
            <Player/>
        </>
    );
};

export default MainLayout;