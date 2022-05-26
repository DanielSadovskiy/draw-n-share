import { Header } from 'components/Header';
import { ToastContainer } from 'react-toastify';
import React from 'react';
import 'react-toastify/dist/ReactToastify.css';
import styles from './styles.module.css'



export const Layout = ({ children }: any) => {
    return (
        <div className={styles.layout}>
            <Header/>
            <ToastContainer />
            <main>
                {children}
            </main>
        </div>
    )
}