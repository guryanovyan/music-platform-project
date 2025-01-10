import {Dispatch} from "react";
import {TrackAction, TrackActionTypes} from "@/types/track";
import axios from "axios";

export const fetchTracks = () => {
    return async (dispatch: Dispatch<TrackAction>) => {
        try {
            const response = await axios.get('http://localhost:5000/tracks')
            dispatch({type: TrackActionTypes.FETCH_TRACKS, payload: response.data})
        } catch (e) {
            dispatch({
                type: TrackActionTypes.FETCH_TRACKS_ERROR,
                payload: 'Error during loading tracks'
            })
        }
    }
}

export const searchTracks = (query: string) => {
    return async (dispatch: Dispatch<TrackAction>) => {
        try {
            const response = await axios.get('http://localhost:5000/search?query=' + query)
            dispatch({type: TrackActionTypes.FETCH_TRACKS, payload: response.data.tracks})
        } catch (e) {
            dispatch({
                type: TrackActionTypes.FETCH_TRACKS_ERROR,
                payload: 'Error during loading tracks'
            })
        }
    }
}

export const deleteTrack = (id: string) => {
    return async (dispatch: Dispatch<TrackAction>) => {
        try {
            await axios.delete('http://localhost:5000/tracks/' + id)
            dispatch(await fetchTracks())
        } catch (e) {
            console.log('Error during deleting a track')
        }
    }
}