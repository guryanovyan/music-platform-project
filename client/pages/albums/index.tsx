import React from 'react';
import MainLayout from "@/layouts/MainLayout";
import {useTypedSelector} from "@/hooks/useTypedSelector";
import {fetchAlbums} from "@/store/actions-creators/album";
import {NextThunkDispatch, wrapper} from "@/store";
import ListCard from "@/components/ListCard"

const Index = () => {
    const {error} = useTypedSelector(state => state.album);

    if (error) {
        return <MainLayout><h1>{error}</h1></MainLayout>
    }

    return (
        <MainLayout
            title={'Album list'}
            description={'See all albums on our website'}
            keywords={`list, storage, albums`}
        >
            <ListCard forAlbums/>
        </MainLayout>
    );
};

export default Index;

export const getServerSideProps = wrapper.getServerSideProps((store) =>  async() => {
    const dispatch = store.dispatch as NextThunkDispatch;
    await dispatch(await fetchAlbums());
    return {
        props: {},
    }
})