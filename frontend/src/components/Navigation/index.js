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
                <NavLink to='/notebooks'><i class='fas fa-book'>Notebooks</i></NavLink>
            </>
        )
    }

    return (
        <>
            {isLoaded && sessionLinks}
        </>
    );
};

export default Navigation;