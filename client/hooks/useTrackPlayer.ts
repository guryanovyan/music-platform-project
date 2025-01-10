import axios from "axios";
import {useState} from "react";
import {useActions} from "@/hooks/useActions";
import {audioPlayer} from "@/store/audio";
import {useTypedSelector} from "@/hooks/useTypedSelector";

export const useTrackPlayer = () => {
    const [isListened, setIsListened] = useState(false);
    const {playTrack, pauseTrack, setActiveTrack} = useActions()
    const audio = audioPlayer.audio;
    const {active, pause} = useTypedSelector(state => state.player)

    const play = async (track, e) => {
        e.stopPropagation()
        if (active?._id === track._id) {
            if (pause) {
                playTrack();
                audio.play()
            } else {
                pauseTrack();
                audio.pause()
            }
        } else {
            setActiveTrack(track)
            playTrack()
            if (!isListened) {
                try {
                    await axios.post('http://localhost:5000/tracks/listen/' + track._id);
                    setIsListened(true)
                } catch (e) {
                    console.log('Error while incrementing listen count')
                }
            }
        }
    }

    return {play};
}