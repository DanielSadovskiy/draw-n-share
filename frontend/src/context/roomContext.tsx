import React, { useState } from 'react'

// @ts-ignore
const MainContext = React.createContext<any>()

const MainProvider = ({ children }: any) => {
    const [name, setName] = useState('')
    const [room, setRoom] = useState('')
    const [password, setPassword] = useState('')

    return (
        <MainContext.Provider value={{ name, room, setName, setRoom, password, setPassword}}>
            {children}
        </MainContext.Provider>
    )
}

export { MainContext, MainProvider } 