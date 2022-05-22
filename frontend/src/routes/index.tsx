import { Route, Routes } from 'react-router-dom';
import React from 'react'
import pageRoutes from './pageRoutes';
import { Container } from 'components/Container/Container';


export const App = () => {
    return (
        <Routes>
            <Route path={pageRoutes.BASEPATH} element={<Container/>}/>
        </Routes>
    )
}