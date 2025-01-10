import React from 'react';
import {ITrack} from "@/types/track";
import {Card} from "@mui/material";
import IconButton from "@mui/material/IconButton";
import {Delete, Pause, PlayArrow} from "@mui/icons-material";
import {useRouter} from "next/router";
import {useActions} from "@/hooks/useActions";
import {useTypedSelector} from "@/hooks/useTypedSelector";
import {useTrackPlayer} from "@/hooks/useTrackPlayer";
import Header from "@/components/Header";
import {IAlbum} from "@/types/album";
import {audioPlayer} from "@/store/audio";

interface ItemProps {
    track?: ITrack;
    album?: IAlbum;
}

const Item: React.FC<ItemProps> = ({track, album}) => {
    const router = useRouter();
    const {deleteTrack, deleteAlbum} = useActions()
    const {active, pause} = useTypedSelector(state => state.player)
    const {play} = useTrackPlayer()

    const deleteHandler = async (e) => {
        e.stopPropagation()
        if (track) {
            if (confirm('Delete that track?')) {
                if ("_id" in track) {
                    await deleteTrack(track._id)
                }
            }
        }
        if (album) {
            if (confirm('Delete that album?')) {
                if ("_id" in album) {
                    await deleteAlbum(album._id)
                }
            }
        }
    }

    return (
        <Card
            sx={{margin: 1.5, padding: 1, display: 'flex', alignItems: 'center', backgroundColor: 'rgba(0,0,0,0.03)'}}
            onClick={() => router.push(
                `${track ? `/tracks/${track?._id}` : album ? `/albums/${album?._id}` : ''}`
            )}
        >
            {track &&
                <IconButton sx={{marginRight: 1}} onClick={e => play(track, e)}>
                    {active?._id === track?._id && !pause ? <Pause/> : <PlayArrow/>}
                </IconButton>
            }
            <Header
                picture={track?.picture || album?.picture}
                name={track?.name || album?.name}
                artist={track?.artist || album?.author}
            />
            <IconButton sx={{marginLeft: 'auto'}} onClick={deleteHandler}>
                <Delete />
            </IconButton>
        </Card>
    );
};

export default Item;