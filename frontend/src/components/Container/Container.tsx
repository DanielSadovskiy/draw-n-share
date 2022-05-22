import { Board } from 'components/Board/Board'
import React from 'react'
import styles from  './styles.module.css'

export const Container = () => {


    return (
        <div className={styles.container}>
            <div className={styles.colorPicker}>
                <input type="color" />
            </div>
            <div className={styles.board}>
                <Board/>
            </div>
        </div>
    )

}