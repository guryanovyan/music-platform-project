import React, {useState} from 'react';
import MainLayout from "@/layouts/MainLayout";
import {IAlbum} from "@/types/album";
import {ArrowBack} from "@mui/icons-material";
import {Button} from "@mui/material";
import {GetServerSideProps} from "next";
import axios from "axios";
import {useRouter} from "next/router";
import {Grid} from "@mui/system";
import List from "@/components/List";

const AlbumPage = ({serverAlbum}) => {
    const [album, setAlbum] = useState<IAlbum>(serverAlbum);
    const router = useRouter();
    
    return (
        <MainLayout
            title={`${album.name} - ${album.author}`}
            description={`Read more about album ${album.name} by ${album.author}`}
            keywords={`${album.name}, ${album.author}, ${album.tracks}`}
        >
            <Button
                variant="outlined"
                color="secondary"
                startIcon={<ArrowBack/>}
                onClick={() => router.push('/albums')}
            >
                To list
            </Button>
            <Grid container style={{margin: "20px 0"}}>
                <img alt={'Track picture'} src={'http://localhost:5000/' + album.picture} width={300} height={300}/>
                <div style={{margin: "0 30px"}}>
                    <h1 style={{margin: 0}}>{album.name}</h1>
                    <h2 style={{margin: 0}}>{album.author}</h2>
                    <h3 style={{margin: "20px 0"}}>{album.tracks.length} tracks</h3>
                </div>
            </Grid>
            <List tracks={album.tracks}/>
        </MainLayout>
    );
};

export default AlbumPage;

export const getServerSideProps: GetServerSideProps = async ({params}) => {
    const response = await axios.get('http://localhost:5000/albums/' + params.id);
    return {
        props: {
            serverAlbum: response.data
        }
    }
}