import { Header } from 'components/Header';
import React from 'react';
import styles from './styles.module.css'


export const Layout = ({ children }: any) => {
    return (
        <div className={styles.layout}>
            <Header/>
            <main>
                {children}
            </main>
        </div>
    )
}