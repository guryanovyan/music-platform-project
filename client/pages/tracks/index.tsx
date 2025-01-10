import React from 'react';
import MainLayout from "@/layouts/MainLayout";
import {useTypedSelector} from "@/hooks/useTypedSelector";
import {NextThunkDispatch, wrapper} from "@/store";
import {fetchTracks} from "@/store/actions-creators/track";
import ListCard from "@/components/ListCard"

const Index = () => {
    const {error} = useTypedSelector(state => state.track);

    if (error) {
        return <MainLayout><h1>{error}</h1></MainLayout>
    }

    return (
        <MainLayout
            title={'Track list'}
            description={'See all tracks on our website'}
            keywords={`list, storage, tracks`}
        >
            <ListCard forTracks />
        </MainLayout>
    );
};

export default Index;

export const getServerSideProps = wrapper.getServerSideProps((store) =>  async() => {
    const dispatch = store.dispatch as NextThunkDispatch;
    await dispatch(await fetchTracks());
    return {
        props: {},
    }
})