import {Dispatch} from "react";
import axios from "axios";
import {AlbumAction, AlbumActionTypes} from "@/types/album";

export const fetchAlbums = () => {
    return async (dispatch: Dispatch<AlbumAction>) => {
        try {
            const response = await axios.get('http://localhost:5000/albums')
            dispatch({type: AlbumActionTypes.FETCH_ALBUMS, payload: response.data})
        } catch (e) {
            dispatch({
                type: AlbumActionTypes.FETCH_ALBUMS_ERROR,
                payload: 'Error during loading albums'
            })
        }
    }
}

export const searchAlbums = (query: string) => {
    return async (dispatch: Dispatch<AlbumAction>) => {
        try {
            const response = await axios.get('http://localhost:5000/search?query=' + query)
            dispatch({type: AlbumActionTypes.FETCH_ALBUMS, payload: response.data.albums})
        } catch (e) {
            dispatch({
                type: AlbumActionTypes.FETCH_ALBUMS_ERROR,
                payload: 'Error during loading albums'
            })
        }
    }
}

export const deleteAlbum = (id: string) => {
    return async (dispatch: Dispatch<AlbumAction>) => {
        try {
            await axios.delete('http://localhost:5000/albums/' + id)
            dispatch(await fetchAlbums())
        } catch (e) {
            console.log('Error during deleting an album')
        }
    }
}