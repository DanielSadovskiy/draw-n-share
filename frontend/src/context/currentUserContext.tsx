import React, { useState } from 'react'

// @ts-ignore
const CurrentUserContext = React.createContext<any>()

const CurrentUserProvider = ({ children }: any) => {
    const [user,setUser] = useState(null)

    

    return (
        <CurrentUserContext.Provider value={{user, setUser}}>
            {children}
        </CurrentUserContext.Provider>
    )
}

export { CurrentUserContext, CurrentUserProvider } 