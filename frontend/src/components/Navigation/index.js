import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import ProfileButton from './ProfileButton';
import '../index.css';

const Navigation = ({ isLoaded }) => {
    const sessionUser = useSelector(state => state.session.user);

    let sessionLinks;
    if (sessionUser) {
        sessionLinks = (
            <div className='sidebar'>
                    <ProfileButton user={sessionUser} />
                    <NavLink to='/notebooks'><i className='fas fa-book'> Notebooks</i></NavLink>
                    <NavLink to='/notes'><i className='fas fa-sticky-note'> Notes</i></NavLink>
            </div>
        )
    }

    return (
        <>
            {isLoaded && sessionLinks}
        </>
    );
};

export default Navigation;