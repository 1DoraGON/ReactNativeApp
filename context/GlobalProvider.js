import { createContext, useContext, useState, useEffect } from "react";

const GlobalContext = createContext();
const getCurrentUser = async () => {}
export const useGlobalContext = () => useContext(GlobalContext)

export const GlobalProvider = ({ children }) => {
    const [isLoggedIn, setIsLoggedIn] = useState(false)
    const [user, setUser] = useState(null)
    const [isLoading, setIsLoading] = useState(null)

    useEffect(() => {
        getCurrentUser()
            .then((res) => {
                if(res) {
                    console.log('its me handline it');
                    
                    setIsLoggedIn(true)
                    setUser(res)
                } else {
                    setIsLoggedIn(false)
                    setUser(null)
                }
                }
            )
            .catch((error) => {
                console.log(error);
                
            })
            .finally(() => {
                setIsLoading(false)  
            })
    },[])
    return (
        <GlobalContext.Provider
            value={{
                isLoggedIn,setIsLoggedIn,user,setUser,isLoading
            }}>
            {children}
        </GlobalContext.Provider>
    )
}