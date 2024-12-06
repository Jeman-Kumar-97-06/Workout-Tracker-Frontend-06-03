import {Link} from 'react-router-dom';
import { useLogout } from '../hooks/useLogout';
import { useAuthContext } from '../hooks/useAuthContext';

const Navbar = () => {
    const {logout} = useLogout();
    const handleLogout = () => {
        logout();
    }
    const {user} = useAuthContext();
    return (
        <header>
            <div className="container">
                <Link to ='/'><h1>Workout Tracker</h1></Link>
                <nav>
                    {user && (
                        <div>
                            <span>{user.email}</span>
                            <button onClick={handleLogout}>Logout</button>
                        </div>
                    )}
                    {!user && (<div>
                                <Link to = '/login'>Login</Link>
                                <Link to = '/signup'>Signup</Link>
                               </div>
                            )
                    }
                </nav>
            </div>
        </header>
    )
}

export default Navbar;