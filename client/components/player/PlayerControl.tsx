import React from 'react';
import IconButton from "@mui/material/IconButton";
import {Pause, PlayArrow} from "@mui/icons-material";
import PlayerSlider from "@/components/player/PlayerSlider";
import {Stack} from "@mui/system";

interface PlayerControlsProps {
    togglePlayPause: () => void;
    isPlaying: boolean;
    currentTime: number;
    duration: number;
    changeCurrentTime: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const PlayerControl: React.FC<PlayerControlsProps> = ({togglePlayPause, isPlaying, currentTime, duration, changeCurrentTime}) => {
    const formatTime = (seconds: number): string => {
        const min = Math.floor(seconds / 60);
        const sec = Math.floor(seconds % 60);
        return `${min.toString().padStart(2, '0')}:${sec.toString().padStart(2, '0')}`;
    }

    return (
        <Stack sx={{alignItems: "center", flex: 1}}>
            <IconButton onClick={togglePlayPause} sx={{maxWidth: 40, maxHeight: 30}}>
                {isPlaying ? <Pause/> : <PlayArrow/>}
            </IconButton>
            <PlayerSlider
                value={currentTime}
                max={duration}
                formattedTime={formatTime(currentTime)}
                formattedDuration={formatTime(duration)}
                onChange={changeCurrentTime}
                width={400}
            />
        </Stack>
    );
};

export default PlayerControl;