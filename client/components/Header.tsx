import React from 'react';
import {Stack} from "@mui/system";
import styles from '../styles/Header.module.scss'

interface HeaderProps {
    picture?: string;
    name?: string;
    artist?: string;
    album?: string;
    duration?: string
}

const Header: React.FC<HeaderProps> = ({picture, artist, name, album, duration}) => {
    return (
        <>
            {picture ?
                <img className={styles.Header__image} src={'http://localhost:5000/' + picture} alt={"Track cover"}/>
            :
                <div className={styles.Header__image} />
            }
            <Stack className={styles.Header__info}>
                <div>{name}</div>
                <div className={styles.Header__artist}>{artist}</div>
                <div className={styles.Header__artist}>{album}</div>
                <div>{duration}</div>
            </Stack>
        </>
    );
};

export default Header;