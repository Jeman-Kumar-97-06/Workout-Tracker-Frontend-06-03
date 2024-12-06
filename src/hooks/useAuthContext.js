import { AuthContext } from "../context/AuthContext";
import { useContext } from 'react';

export const useAuthContext = () => {
    const context = useContext(AuthContext);
    if (!context){
        throw Error('useAuthContext must be used inside components that are wrapped around AuthContextProvider');
    }
    return context;
}
