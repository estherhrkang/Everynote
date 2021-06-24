import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import ProfileButton from './ProfileButton';
import '../../index.css';

const Navigation = ({ isLoaded }) => {
    const sessionUser = useSelector(state => state.session.user);

    let sessionLinks;
    if (sessionUser) {
        sessionLinks = (
            <div className='navigation-div'>
                <ul className='navigation-ul'>
                    <li className='navigation-li'>
                        <ProfileButton user={sessionUser} />
                    </li>
                    <li className='navigation-li'>
                        <NavLink to='/notebooks'><i className='fas fa-book'> Notebooks</i></NavLink>
                    </li>
                    <li className='navigation-li'> 
                        <NavLink to='/notes'><i className='fas fa-sticky-note'> Notes</i></NavLink>
                    </li>
                </ul>
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