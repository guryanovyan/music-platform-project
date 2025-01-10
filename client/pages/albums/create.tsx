import React, {useState} from 'react';
import MainLayout from "@/layouts/MainLayout";
import {Grid, Stack} from "@mui/system";
import styles from "@/styles/StepWrapper.module.scss";
import {Button, TextField} from "@mui/material";
import StepUpload from "@/components/create/StepUpload";
import StepWrapper from "@/components/create/StepWrapper";
import {useInput} from "@/hooks/useInput";
import {useRouter} from "next/router";
import axios from "axios";
import {CloseIcon} from "next/dist/client/components/react-dev-overlay/internal/icons/CloseIcon";

const Create = () => {
    const [activeStep, setActiveStep] = useState(0);
    const [picture, setPicture] = useState<File>(null)
    const [tracks, setTracks] = useState([{name: '', text: '', audio: null}])
    const name = useInput('')
    const author = useInput('')
    const router = useRouter();

    const back = () => {
        setActiveStep(prevState => prevState - 1)
    }

    const next = () => {
        if (activeStep !== 2) {
            setActiveStep(prevState => prevState + 1)
        } else {
            const formData = new FormData();
            formData.append('name', name.value);
            formData.append('author', author.value);
            formData.append('picture', picture);
            tracks.forEach((track, index) => {
                formData.append(`tracks[${index}][name]`, track.name);
                formData.append(`tracks[${index}][text]`, track.text);
                formData.append('audios', track.audio);
            })
            axios.post('http://localhost:5000/albums', formData)
                .then(resp => router.push('/albums'))
                .catch(e => console.log(e))
        }
    }

    const addTrack = () => {
        setTracks([...tracks, {name: '', text: '', audio: null}])
    }

    const addTrackInfo = (index, key, value) => {
        const updatedTracks = tracks.map((track, i) =>
            i === index ? { ...track, [key]: value } : track
        );
        setTracks(updatedTracks);
    };




    return (
        <MainLayout
            title={`Uploading album`}
            description={`Upload your album.`}
            keywords={`upload, store`}
        >
            <StepWrapper activeStep={activeStep}>
                {activeStep === 0 &&
                    <Stack container spacing={2} className={styles.StepWrapper__albumInfo}>
                        <TextField
                            {...name}
                            label={"Album name"}
                        />
                        <TextField
                            {...author}
                            label={"Album author"}
                        />
                    </Stack>
                }
                {activeStep === 1 &&
                    <StepUpload cover onFileChange={setPicture} />
                }
                {activeStep === 2 &&
                    <Stack>
                        {tracks.map((track, index) =>
                            <Grid container sx={{margin: 2, justifyContent: 'space-between'}}>
                                <TextField
                                    onChange={e => addTrackInfo(index, 'name', e.target.value)}
                                    label={"Track name"}
                                    value={track.name}
                                    sx={{width: 250}}
                                />
                                <TextField
                                    onChange={e => addTrackInfo(index, 'text', e.target.value)}
                                    label={"Track lyrics"}
                                    value={track.text}
                                    sx={{width: 350}}
                                    multiline
                                    rows={3}
                                />
                                <StepUpload
                                    audio
                                    stepTracks
                                    sx={{justifySelf: 'center'}}
                                    onFileChange={audio => addTrackInfo(index, 'audio', audio)}
                                />
                            </Grid>
                        )}
                        <hr />
                        <Button onClick={addTrack} color="secondary">Add track</Button>
                    </Stack>
                }
            </StepWrapper>
            <Grid container justifyContent={"space-between"}>
                <Button onClick={back} disabled={activeStep <= 0} variant='outlined' color="secondary">Back</Button>
                <Button onClick={next} variant='outlined' color="secondary">Next</Button>
            </Grid>
        </MainLayout>
    );
};

export default Create;