import {useState} from 'react';
import { useWorkoutContext } from '../hooks/useWorkoutContext';
import { useAuthContext } from '../hooks/useAuthContext';

const WorkoutForm = () => {
    const {dispatch} = useWorkoutContext();
    const [title,setTitle] = useState('');
    const [load,setLoad]   = useState('');
    const [reps,setReps]   = useState('');
    const [error,setError] = useState(null);
    const [emptyF,setEmptyF] = useState([]);
    const {user}            = useAuthContext();

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!user){
            setError('You must be Logged In!')
            return 
        }
        const workout = {title,load,reps};
        const response = await fetch('/api/workouts/',{method:'POST',body:JSON.stringify(workout),headers:{'Content-Type':'application/json','Authorization':`Beared ${user.token}`}});
        const json     = await response.json();
        if (!response.ok) {
            setError(json.error);
            setEmptyF(json.emptyFields);
        }
        else if (response.ok) {
            setError(null);
            console.log('New Workout Added!');
            setTitle('');
            setLoad('');
            setReps('');
            setEmptyF([]);
            dispatch({type:"CREATE_WORKOUT",payload:json});
        }
    }

    return (
        <form className='create' onSubmit={handleSubmit}>
            <h3>Add a New Workout</h3>
            <label>Exercise Title:</label>
            <input type='text' onChange={e=>{setTitle(e.target.value)}} value={title} className={emptyF.includes('title') ? 'error' : ""}/>
            <label>Load (kg):</label>
            <input type='number' onChange={e=>{setLoad(e.target.value)}} value={load} className={emptyF.includes('load') ? 'error' : ""}/>
            <label>Reps:</label>
            <input type="number" onChange={e=>{setReps(e.target.value)}} value={reps} className={emptyF.includes('reps') ? 'error' : ""}/>
            <button type='submit'>Submit</button>
            {error && <div className='error'>{error}</div>}
        </form>
    )
}

export default WorkoutForm;