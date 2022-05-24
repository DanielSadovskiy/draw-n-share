import React, { useState } from 'react'

// @ts-ignore
const UsersContext = React.createContext<any>()

const UsersProvider = ({ children }: any) => {
    const [users, setUsers] = useState([])

    return (
        <UsersContext.Provider value={{ users, setUsers }}>
            {children}
        </UsersContext.Provider>
    )
}

export { UsersContext, UsersProvider } 