import React, {useState} from 'react';
import styles from "@/styles/List.module.scss";
import {Grid} from "@mui/system";
import {Button, Card, TextField} from "@mui/material";
import List from "@/components/List";
import {searchAlbums} from "@/store/actions-creators/album";
import {useDispatch} from "react-redux";
import {NextThunkDispatch} from "@/store";
import {useTypedSelector} from "@/hooks/useTypedSelector";
import {searchTracks} from "@/store/actions-creators/track";
import {useRouter} from "next/router";

interface ListCardProps {
    forTracks?: boolean;
    forAlbums?: boolean;
}

const ListCard: React.FC<ListCardProps>  = ({forTracks, forAlbums}) => {
    const [query, setQuery] = useState<string>('');
    const [timer, setTimer] = useState<NodeJS.Timeout>(null);
    const dispatch = useDispatch() as NextThunkDispatch;
    const {tracks} = useTypedSelector(state => state.track);
    const {albums} = useTypedSelector(state => state.album);
    const router = useRouter();

    const search = async (e: React.ChangeEvent<HTMLInputElement>) => {
        setQuery(e.target.value)
        if (timer) {
            clearTimeout(timer)
        }
        setTimer(
            setTimeout(async () => {
                if (forTracks) {
                    await dispatch(await searchTracks(e.target.value))
                }
                if (forAlbums) {
                    await dispatch(await searchAlbums(e.target.value))
                }
            }, 500)
        )
    }

    return (
        <Card className={styles.List__card}>
            <Grid container className={styles.List__header}>
                <h1>{forTracks ? 'Track list' : forAlbums ? 'Album list' : ''}</h1>
                <TextField
                    sx={{width: 400}}
                    size='small'
                    value={query}
                    onChange={search}
                    placeholder={'Search...'}
                />
                <Button
                    variant="outlined"
                    color="secondary"
                    style={{height: 40}}
                    onClick={() => router.push(
                        `${forTracks ? '/tracks/create' : forAlbums ? '/albums/create' : ''}`
                    )}
                >
                    {forTracks ? 'Upload track' : forAlbums ? 'Upload album' : ''}
                </Button>
            </Grid>
            <List tracks={tracks} albums={albums} />
        </Card>
    );
};

export default ListCard;