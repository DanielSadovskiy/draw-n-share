import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './styles.module.css'


export const NotFoundPage = () => {
    const navigate = useNavigate();
    const [isNavigation, setNavigation] = useState(false)
    useEffect(() => {
        setTimeout(() => setNavigation(true), 2000)
    }, [])
    useEffect(() => {
        if(isNavigation) navigate('/')
    },[isNavigation])
    return (
        <div className={styles.notFoundPage}>
            <h2>PAGE NOT FOUND</h2>
        </div>
    )
}