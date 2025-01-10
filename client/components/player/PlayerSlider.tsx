import React from 'react';
import {Grid} from "@mui/system";

interface TrackProgressProps {
    value?: number;
    max?: number;
    formattedTime?: string;
    formattedDuration?: string;
    onChange: (e) => void;
    width?: number;
}

const PlayerSlider: React.FC<TrackProgressProps> = ({value, max = 100, formattedTime, formattedDuration, width, onChange}) => {
    return (
        <Grid container sx={{alignItems: "center"}}>
            <div>{formattedTime}</div>
            <input
                type={"range"}
                min={0}
                max={max}
                value={value}
                onChange={onChange}
                style={{width: width, height: "5px", cursor: "pointer", accentColor: "#dbdbdb"}}
            />
            <div>{formattedDuration}</div>
        </Grid>
    );
};

export default PlayerSlider;