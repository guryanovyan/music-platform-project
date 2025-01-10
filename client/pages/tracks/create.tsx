import React, {useState} from 'react';
import MainLayout from "@/layouts/MainLayout";
import StepWrapper from "@/components/create/StepWrapper";
import {Grid, Stack} from "@mui/system";
import {Button, TextField} from "@mui/material";
import {useInput} from "@/hooks/useInput";
import {useRouter} from "next/router";
import axios from "axios";
import StepUpload from "@/components/create/StepUpload";
import styles from "@/styles/StepWrapper.module.scss";

const Create = () => {
    const [activeStep, setActiveStep] = useState(0)
    const [picture, setPicture] = useState<File>(null)
    const [audio, setAudio] = useState<File>(null)
    const name = useInput('')
    const artist = useInput('')
    const text = useInput('')
    const router = useRouter();

    const back = () => {
        setActiveStep(prevState => prevState - 1)
    }

    const next = () => {
        if(activeStep !== 2) {
            setActiveStep(prevState => prevState + 1)
        } else {
            const formData = new FormData();
            formData.append('name', name.value);
            formData.append('artist', artist.value);
            formData.append('text', text.value);
            formData.append('picture', picture);
            formData.append('audio', audio);
            axios.post('http://localhost:5000/tracks', formData)
                .then(resp => router.push('/tracks'))
                .catch(e => console.log(e))
        }
    }

    return (
        <MainLayout
            title={`Uploading track`}
            description={`Upload your track.`}
            keywords={`upload, store`}
        >
            <StepWrapper activeStep={activeStep}>
                {activeStep === 0 &&
                    <Stack container spacing={2} className={styles.StepWrapper__trackInfo}>
                        <TextField
                            {...name}
                            label={"Track name"}
                        />
                        <TextField
                            {...artist}
                            label={"Track author"}
                        />
                        <TextField
                            {...text}
                            label={"Track lyrics"}
                            multiline
                            rows={6}
                        />
                    </Stack>
                }
                {activeStep === 1 &&
                    <StepUpload cover onFileChange={setPicture} />
                }
                {activeStep === 2 &&
                    <StepUpload audio onFileChange={setAudio} />
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