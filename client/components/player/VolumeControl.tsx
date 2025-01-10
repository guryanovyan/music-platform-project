import React from 'react';
import {VolumeUp} from "@mui/icons-material";
import PlayerSlider from "@/components/player/PlayerSlider";

interface VolumeControlProps {
    volume: number;
    changeVolume: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const VolumeControl: React.FC<VolumeControlProps> = ({volume, changeVolume}) => {
    return (
        <>
            <VolumeUp />
            <PlayerSlider value={volume} onChange={changeVolume} />
        </>
    );
};

export default VolumeControl;