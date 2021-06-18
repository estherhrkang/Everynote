import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { logout} from '../../store/session';

const ProfileButton = ({ user }) => {
    const dispatch = useDispatch();

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

    const handleLogout = (e) => {
        e.preventDefault();
        dispatch(logout());
    };

    return (
        <>
            <button onClick={openMenu}>
                <i className='fab fa-evernote' />
            </button>
            {showMenu && (
                <ul>
                    <li>{user.username}</li>
                    <li>{user.email}</li>
                    <li>
                        <button onClick={handleLogout}>Sign Out</button>
                    </li>
                </ul>
            )}
        </>
    );
};

export default ProfileButton;