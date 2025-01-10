import React from 'react';
import MainLayout from "@/layouts/MainLayout";

const Index = () => {
    return (
        <>
            <MainLayout>
                <div className={"center"}>
                    <h1>Main page</h1>
                    <h3>Here are the best tracks!</h3>
                </div>
            </MainLayout>

            <style jsx>
                {`
                    .center {
                        display: flex;
                        flex-direction: column;
                        align-items: center;
                        justify-content: center;
                    }
                `}
            </style>
        </>
    );
};

export default Index;