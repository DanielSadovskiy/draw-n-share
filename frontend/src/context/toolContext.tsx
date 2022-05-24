import React, { useState } from 'react'

// @ts-ignore
const ToolContext = React.createContext<any>()

const ToolProvider = ({ children }: any) => {
    const [color, setColor] = useState("#000")

    return (
        <ToolContext.Provider value={{color, setColor}}>
            {children}
        </ToolContext.Provider>
    )
}

export { ToolContext, ToolProvider } 