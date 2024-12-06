import {useAuthContext} from './useAuthContext';
import { useWorkoutContext } from './useWorkoutContext';

export const useLogout = () => {
    const {dispatch:workoutsdispatch} = useWorkoutContext();
    const {dispatch} = useAuthContext();
    const logout = () => {
        //Remove user from localStorage:
        localStorage.removeItem('user');
        //Update Auth State:
        dispatch({type:'LOGOUT'});
        workoutsdispatch({type:"SET_WORKOUT",payload:null});
    };
    return {logout};
};