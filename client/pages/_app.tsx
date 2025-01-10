import React from "react";
import {AppProps} from "next/app";
import {persistor, wrapper} from "@/store";
import {PersistGate} from "redux-persist/integration/react";

function MyApp({Component, pageProps}: AppProps) {
    return (
        <PersistGate persistor={persistor} loading={null}>
                <Component {...pageProps} />
        </PersistGate>
);
}

export default wrapper.withRedux(MyApp);
