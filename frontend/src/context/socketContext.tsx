import React from 'react'
import io from 'socket.io-client'

// @ts-ignore
const SocketContext = React.createContext()

const SocketProvider = ({ children }: any) => {
    const ENDPOINT = 'ws://localhost:9000';
    const socket = io(ENDPOINT)
    return (
        <SocketContext.Provider value={socket}>
            {children}
        </SocketContext.Provider>
    )
}

export { SocketContext, SocketProvider }