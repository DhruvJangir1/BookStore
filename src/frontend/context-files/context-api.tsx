import { createContext } from "react";
import { useState } from "react";
import { AppContextType } from './context-type';
import useHistory from "../hooks/useHistory";
export const AppContext = createContext<AppContextType>({
    location: '',
    updateLocation:()=>{},
    history: ''
})

export default function AppContextProvider({ children }: { children: React.ReactNode }) {
    const [location, setLocation] = useState('')
    const {history,addToHistory} = useHistory();


    function updateLocation(newLocation: string) { 
        // HOW IT WORKS: old state becomes the current state and the current state becomes the new state to preserve current and previous locations
        addToHistory(location);
        setLocation(newLocation);
    }

    const ctx = {
        location,updateLocation,
        history
    }
    return (
        <AppContext.Provider value={ctx}>
            {children}
        </AppContext.Provider>
    )
}