import React from 'react';
import {ITrack} from "@/types/track";
import {Stack} from "@mui/system";
import Item from "@/components/Item";
import {IAlbum} from "@/types/album";

interface ListProps {
    tracks?: ITrack[];
    albums?: IAlbum[]
}
const List: React.FC<ListProps> = ({tracks, albums}) => {
    return (
        <Stack container spacing={2} p={2}>
            {tracks &&
                tracks?.map(track =>
                <Item key={track._id} track={track}/>
            )}
            {albums &&
                albums?.map(album =>
                <Item key={album._id} album={album}/>
            )}
        </Stack>
    );
};

export default List;