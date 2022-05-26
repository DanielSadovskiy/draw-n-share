import { Route, Routes } from 'react-router-dom';
import React from 'react'
import pageRoutes from './pageRoutes';
import { Container } from 'components/Container/Container';
import { Layout } from 'components/Layout';
import { NotFoundPage } from 'components/NotFoundPage';
import { Login } from 'components/Login';
import { ProtectedRoute } from 'components/ProtectedRoute';

export const App = () => {
    return (
            <Routes>       
                <Route path={pageRoutes.BASEPATH} element={<Login/>}/> 
                    <Route path={pageRoutes.ROOMPATH} element={
                        <ProtectedRoute>
                            <Container/>
                        </ProtectedRoute>
                        }
                    /> 
                <Route path="*" element={<NotFoundPage/>}/> 
            </Routes>
    )
}