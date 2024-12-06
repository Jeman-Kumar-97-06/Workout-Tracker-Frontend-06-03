import {useState} from 'react';
import {useAuthContext} from './useAuthContext';

export const useLogin = () => {
    const [error,setError] = useState(null);
    const [isLoading,setIsLoading] = useState(null);
    const {dispatch} = useAuthContext();

    const login = async (email,password) => {
        setIsLoading(true);
        setError(null);
        const resp = await fetch('https://workout-tracker-backend-d4q0.onrender.com/api/users/login',{method:"POST",headers:{'Content-Type':"application/json"},body:JSON.stringify({email,password})});
        const json = await resp.json();
        if (!resp.ok) {
            setIsLoading(false);
            setError(json.error);
        }
        if (resp.ok) {
            //Save the user to local storage:
            localStorage.setItem('user',JSON.stringify(json));
            //Update the Auth Context:
            dispatch({type:"LOGIN",payload:json});
            setIsLoading(false);
        }
    }
    return {login,isLoading,error};
}