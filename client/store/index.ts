// create a makeStore function
import {Context, createWrapper, MakeStore} from "next-redux-wrapper";
import {AnyAction, applyMiddleware, createStore, Store} from "redux";
import {persistReducer, persistStore} from 'redux-persist';
import storage from 'redux-persist/lib/storage'
import {reducer, RootState} from "@/store/reducers";
import {thunk, ThunkAction, ThunkDispatch} from "redux-thunk";

const persistConfig = {
    key: "root",
    storage,
    whitelist: ["player"]
}

const persistedReducer = persistReducer(persistConfig, reducer);

const makeStore: MakeStore<Store<RootState>> = (context: Context) => createStore(persistedReducer, applyMiddleware(thunk));

export const persistor = persistStore(makeStore());

// export an assembled wrapper
export const wrapper = createWrapper<Store<RootState>>(makeStore, {debug: true});

export type NextThunkDispatch = ThunkDispatch<RootState, void, AnyAction>