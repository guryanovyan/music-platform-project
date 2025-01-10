import React, {useState} from 'react';
import {ITrack} from "@/types/track";
import MainLayout from "@/layouts/MainLayout";
import {Button, TextField} from "@mui/material";
import {useRouter} from "next/router";
import {ArrowBack, Pause, PlayArrow} from "@mui/icons-material";
import {Grid, Stack} from "@mui/system";
import {GetServerSideProps} from "next";
import axios from "axios";
import {useInput} from "@/hooks/useInput";
import {useTypedSelector} from "@/hooks/useTypedSelector";
import IconButton from "@mui/material/IconButton";
import {useTrackPlayer} from "@/hooks/useTrackPlayer";

const TrackPage = ({serverTrack}) => {
    const [track, setTrack] = useState<ITrack>(serverTrack);
    const router = useRouter();
    const username = useInput('')
    const comment = useInput('')
    const {active, pause} = useTypedSelector(state => state.player)
    const {play} = useTrackPlayer()

    const addComment = async () => {
        try {
            const response = await axios.post('http://localhost:5000/tracks/comment', {
                username: username.value,
                text: comment.value,
                trackId: track._id
            })
            setTrack({...track, comments: [...track.comments, response.data]})
        } catch (e) {
            console.log(e)
        }
    }

    return (
        <MainLayout
            title={`${track.name} - ${track.artist}`}
            description={`Read more about track ${track.name} by ${track.artist}`}
            keywords={`${track.name}, ${track.artist}, ${track.text}`}
        >
            <Button
                variant="outlined"
                color="secondary"
                startIcon={<ArrowBack/>}
                onClick={() => router.push('/tracks')}
            >
                To list
            </Button>
            <Grid container sx={{justifyContent: 'space-between'}}>
                <Stack>
                    <Grid container style={{margin: "20px 0"}}>
                        <img alt={'Track picture'} src={'http://localhost:5000/' + track.picture} width={300} height={300}/>
                        <div style={{margin: "0 30px"}}>
                            <h3 style={{margin: 0, color: "gray"}}>{track.album}</h3>
                            <h1 style={{margin: 0}}>{track.name}</h1>
                            <h2 style={{margin: 0}}>{track.artist}</h2>
                            <h3 style={{margin: "20px 0"}}>{track.listens || 0} listens</h3>
                            <IconButton style={{marginRight: 10}} onClick={e => play(track, e)}>
                                {active?._id === track._id && !pause ? <Pause/> : <PlayArrow/>}
                            </IconButton>
                        </div>
                    </Grid>
                    <Stack spacing={1} style={{width: 500}}>
                        <h2>Comments:</h2>
                        <TextField
                            {...username}
                            label={'Name'}
                            style={{width: 300}}
                        />
                        <TextField
                            {...comment}
                            label={'Comment'}
                            style={{width: 500}}
                            multiline
                            rows={4}
                        />
                        <Button
                            style={{width: 200, alignSelf: "center"}}
                            onClick={addComment}
                        >
                            Send
                        </Button>
                        <div>
                            {track.comments.map(comment =>
                                <div>
                                    <div>{comment.username}</div>
                                    <div style={{fontSize: "smaller"}}>{comment.text}</div>
                                </div>
                            )}
                        </div>
                    </Stack>
                </Stack>
                <Stack sx={{marginRight: 10}}>
                    <h2>Lyrics:</h2>
                    <p style={{whiteSpace: "pre-wrap", wordWrap: "break-word"}}>{track.text}</p>
                </Stack>
            </Grid>
        </MainLayout>
    );
};

export default TrackPage;

export const getServerSideProps: GetServerSideProps = async ({params}) => {
    const response = await axios.get('http://localhost:5000/tracks/' + params.id);
    return {
        props: {
            serverTrack: response.data
        }
    }
}