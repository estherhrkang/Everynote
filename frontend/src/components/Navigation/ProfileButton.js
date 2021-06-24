import { useState, useEffect } from 'react';
import { useHistory } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';
import { logout} from '../../store/session';
import '../../index.css';

const ProfileButton = ({ user }) => {
    const dispatch = useDispatch();
    const history = useHistory();

    const [showMenu, setShowMenu] = useState(false);
    
    useEffect(() => {
        if (!showMenu) return;
        
        const closeMenu = () => setShowMenu(false);
        
        document.addEventListener('click', closeMenu);
        
        return () => document.removeEventListener('click', closeMenu);
    }, [showMenu]);

    const openMenu = () => {
        if (showMenu) return;
        setShowMenu(true);
    };

    const handleSignout = () => {
        dispatch(logout());
        history.push('/');
    };

    return (
        <>
            <button className='profile-btn' onClick={openMenu}>
                <i className='fab fa-evernote'> {user.username}</i>
            </button>
            {showMenu && (
                <ul className='profile-btn__ul'>
                    <li className='profile-btn__li'>{user.username}</li>
                    <li className='profile-btn__li'>{user.email}</li>
                    <li className='profile-btn__li'>
                        <button className='profile-btn__signout-btn' onClick={handleSignout}>Sign Out</button>
                    </li>
                </ul>
            )}
        </>
    );
};

export default ProfileButton;