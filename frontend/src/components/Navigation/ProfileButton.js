import { useState, useEffect } from 'react';
import { useHistory } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';
import { logout} from '../../store/session';

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
            <button onClick={openMenu}>
                <i className='fab fa-evernote'> {user.username}</i>
            </button>
            {showMenu && (
                <ul>
                    <li>{user.username}</li>
                    <li>{user.email}</li>
                    <li>
                        <button onClick={handleSignout}>Sign Out</button>
                    </li>
                </ul>
            )}
        </>
    );
};

export default ProfileButton;