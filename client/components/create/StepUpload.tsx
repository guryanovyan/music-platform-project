import React, {FC, useState} from 'react';
import styles from "@/styles/StepWrapper.module.scss";
import FileUpload from "@/components/create/FileUpload";
import {Button} from "@mui/material";
import {FileUploadSharp} from "@mui/icons-material";
import {Stack} from "@mui/system";

interface StepUploadProps {
    cover?: boolean;
    audio?: boolean;
    onFileChange: (file: File) => void;
    stepTracks?: boolean;
}
const StepUpload: React.FC<StepUploadProps> = ({cover, audio, onFileChange, stepTracks}) => {
    const [file, setFile] = useState(null);

    const handleFileChange = (file) => {
        setFile(file);
        onFileChange(file)
    }

    return (
        <Stack sx={{alignItems: 'center'}} className={stepTracks && styles.StepWrapper__stepTracks} >
            {file &&
                <>
                    {cover &&
                        <img src={URL.createObjectURL(file)} alt="Selected track" />
                    }
                    {audio &&
                        <audio controls src={URL.createObjectURL(file)} />
                    }
                    <div
                        className={stepTracks ? styles.StepWrapper__stepTracks__fileName : styles.StepWrapper__fileName}
                    >
                        {file.name}
                    </div>
                </>
            }
            {!stepTracks && <hr/>}
            <FileUpload
                setFile={handleFileChange}
                accept={cover ? 'image/*' : audio ? 'audio/*' : '*/*'}
            >
                <Button
                    endIcon={<FileUploadSharp />}
                    color="secondary"
                    className={stepTracks ? styles.StepWrapper__stepTracks : ''}
                >
                    {cover ? 'Upload cover' : audio ? 'Upload audio' : 'Upload file'}
                </Button>
            </FileUpload>
        </Stack>
    );
};

export default StepUpload;