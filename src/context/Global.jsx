import React, { createContext, useState } from 'react'

export const GlobalContext = createContext()

export const GlobalProvider = ({ children }) => {

    const [global, setGlobal] = useState();
    console.log("Global Data is ", global)

    return (
        <>
            <GlobalContext.Provider value={{ global, setGlobal }}>
                {children}
            </GlobalContext.Provider>
        </>
    )
}
