import {combineReducers} from "redux";
import {playerReducer} from "@/store/reducers/playerReducer";
import {HYDRATE} from "next-redux-wrapper";
import {trackReducer} from "@/store/reducers/trackReducer";
import {albumReducer} from "@/store/reducers/albumReducer";

export const rootReducer = combineReducers({
    player: playerReducer,
    track: trackReducer,
    album: albumReducer
})

export type RootState = ReturnType<typeof rootReducer>

export const reducer = (state, action) => {
    if (action.type === HYDRATE) {
        const nextState = {
            ...state, // use previous state
            ...action.payload, // apply delta from hydration
        };
        if (state?.player) nextState.player = state.player; // preserve count value on client side navigation
        return nextState;
    } else {
        return rootReducer(state, action);
    }
};