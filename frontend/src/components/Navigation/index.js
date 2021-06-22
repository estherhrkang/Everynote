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
                <NavLink to='/notebooks'>Notebooks</NavLink>
                <ProfileButton user={sessionUser} />
            </>
        )
    }

    return (
        <ul>
            <li>
                {isLoaded && sessionLinks}
            </li>
        </ul>
    );
};

export default Navigation;