import { useEffect} from "react";
import WorkoutDetails from "../components/WorkoutDetails";
import WorkoutForm from "../components/WorkoutForm";
import { useWorkoutContext } from "../hooks/useWorkoutContext";
import { useAuthContext } from "../hooks/useAuthContext";

const Home = () => {

    const {user}              = useAuthContext();

    const {workouts,dispatch} = useWorkoutContext();
    // "proxy":"http://localhost:4000",
    useEffect(()=>{
        const fetchWorkouts = async () => {
            const resp = await fetch('https://workout-tracker-backend-d4q0.onrender.com/api/workouts/',{headers:{'Authorization':`Beared ${user.token}`}});
            const json = await resp.json();
            console.log(json);
            if (resp.ok){
                dispatch({type:"SET_WORKOUTS",payload:json});
            }
        }
        if (user) {
            fetchWorkouts()
        }
    },[user,dispatch]);

    return (
        <div className="home">
            <div className="workouts">
                {!workouts && <div>Please wait. The server response is slow.😿</div>}
                {workouts && workouts.map((w)=>(
                    <WorkoutDetails key={w._id} wrkt={w}/>
                ))}
            </div>
            <WorkoutForm/>
        </div>
    )
}

export default Home;