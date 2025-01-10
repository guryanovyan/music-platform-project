import React, {useEffect} from 'react';
import styles from '../../styles/Player.module.scss'
import {useTypedSelector} from "@/hooks/useTypedSelector";
import {useActions} from "@/hooks/useActions";
import {audioPlayer} from '@/store/audio'
import Header from "@/components/Header";
import PlayerControl from "@/components/player/PlayerControl";
import VolumeControl from "@/components/player/VolumeControl";

let audio;

const Player = () => {
    const {pause, duration, active, volume, currentTime} = useTypedSelector(state => state.player)
    const {pauseTrack, playTrack, setVolume, setDuration, setCurrentTime} = useActions()

    useEffect(() => {
        if(!audio) {
            audio = audioPlayer.audio;
        }
        if (active) {
            if (audio.src !== 'http://localhost:5000/' + active.audio ) {
                setAudio();
            }
            if (!pause) {
                audio.play()
            }
        }
    }, [active]);

    const setAudio = () => {
        if(active) {
            audio.src = 'http://localhost:5000/' + active.audio;
            audio.volume = volume / 100;
            audio.onloadedmetadata = () => {
                setDuration(audio.duration)
            }
            audio.ontimeupdate = () => {
                setCurrentTime(audio.currentTime)
            }
        }
    }

    const play = () => {
        if (pause) {
            playTrack()
            audio.play();
        } else {
            pauseTrack()
            audio.pause();
        }
    }

    const changeVolume = (e: React.ChangeEvent<HTMLInputElement>) => {
        audio.volume = Number(e.target.value) / 100;
        setVolume(Number(e.target.value))
    }

    const changeCurrentTime = (e: React.ChangeEvent<HTMLInputElement>) => {
        audio.currentTime = Number(e.target.value);
        setCurrentTime(Number(e.target.value))
    }

    return (
        <div className={styles.player}>
            {active ?
                <Header picture={active.picture} name={active.name} artist={active.artist} />
            :
                <Header />
            }
            <PlayerControl
                togglePlayPause={play}
                isPlaying={!pause}
                currentTime={currentTime}
                duration={duration}
                changeCurrentTime={changeCurrentTime}
            />
            <VolumeControl volume={volume} changeVolume={changeVolume} />
        </div>
    );
};

export default Player;