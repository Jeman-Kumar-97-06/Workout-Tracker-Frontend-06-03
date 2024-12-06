import {useWorkoutContext} from '../hooks/useWorkoutContext';
import formatDistanceToNow from 'date-fns/formatDistanceToNow';
import { useAuthContext } from '../hooks/useAuthContext';
const WorkoutDetails = ({wrkt}) => {
    const {dispatch} = useWorkoutContext();
    const {user}     = useAuthContext();
    const handleClick = async () => {
        if (!user) {
            return;
        }
        const response = await fetch('/api/workouts/'+wrkt._id,{method:"DELETE",headers:{'Authorization':`Beared ${user.token}`}});
        const json     = await response.json();
        if(response.ok){
            dispatch({type:"DELETE_WORKOUT",payload:json})
        }
    }
    return (
        <div className="workout-details">
            <h4>{wrkt.title}</h4>
            <p><strong>Load (kg) : </strong>{wrkt.load}</p>
            <p><strong>Reps :</strong>{wrkt.reps}</p>
            <p>{formatDistanceToNow(new Date(wrkt.createdAt),{addSuffix:true})}</p>
            <button className='material-symbols-outlined' onClick={handleClick}>delete</button>
        </div>
    )
}

export default WorkoutDetails;