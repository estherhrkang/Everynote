import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import ProfileButton from './ProfileButton';
import './Navigation.css';

const Navigation = ({ isLoaded }) => {
    const sessionUser = useSelector(state => state.session.user);

    let sessionLinks;
    if (sessionUser) {
        sessionLinks = (
            <>
                <ProfileButton user={sessionUser} />
                <NavLink to='/notebooks'>Notebooks</NavLink>
            </>
        )
    } else {
        sessionLinks = (
            <>
                <NavLink to='/signin'>Sign In</NavLink>
                <NavLink to='/signup'>Sign Up</NavLink>
            </>
        )
    }

    return (
        <ul>
            <li>
                <NavLink exact to='/'>Home</NavLink>
                {isLoaded && sessionLinks}
            </li>
        </ul>
    );
};

export default Navigation;