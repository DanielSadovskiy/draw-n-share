import React, { useState } from 'react'

// @ts-ignore
const ToolContext = React.createContext<any>()

const ToolProvider = ({ children }: any) => {
    const [color, setColor] = useState("#000")
    const [width, setWidth] = useState(5)
    console.log(width)

    return (
        <ToolContext.Provider value={{color, setColor, width , setWidth}}>
            {children}
        </ToolContext.Provider>
    )
}

export { ToolContext, ToolProvider } 