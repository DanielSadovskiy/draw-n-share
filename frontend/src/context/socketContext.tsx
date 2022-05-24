import React from 'react'
import io from 'socket.io-client'


// @ts-ignore
const SocketContext = React.createContext<any>()



const SocketProvider = ({ children }: any) => {
    const ENDPOINT = 'ws://localhost:3003';
    const socket = io(ENDPOINT)
    return (
        <SocketContext.Provider value={socket}>
            {children}
        </SocketContext.Provider>
    )
}

export { SocketContext, SocketProvider }