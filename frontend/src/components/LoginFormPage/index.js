import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, Redirect } from 'react-router-dom';
import SignupFormPage from '../SignupFormPage';

import { login } from '../../store/session';
import './LoginForm.css';

const LoginFormPage = () => {
    const dispatch = useDispatch();
    const history = useHistory();
    const sessionUser = useSelector(state => state.session.user);

    const [credential, setCredential] = useState('');
    const [password, setPassword] = useState('');
    const [errors, setErrors] = useState([]);

    useEffect(() => {
        const errors = [];

        if (!credential.length) errors.push('Please provider your email address or username.');
        if (!password.length) errors.push('Please provide your password.');

        setErrors(errors);
    }, [credential, password]);
  
    const handleSubmit = async (e) => {
        e.preventDefault();
        
        let loggedInUser = await dispatch(login({ credential, password }));
        
        if (loggedInUser) history.push('/');
    };
    
    const handleCancel = (e) => {
        e.preventDefault();
        setCredential('');
        setPassword('');
    };

    const handleCreateAccount = () => {
        history.push('/signup');
    }

    if (sessionUser) {
        return <Redirect to='/' />
    };

    return (
        <div className='rootDiv'>
            <h1>Everynote</h1>
            <form onSubmit={handleSubmit}>
                <ul>
                    {errors.map(error => <li key={error}>{error}</li>)}
                </ul>
                <div>
                    <input
                        type='text'
                        placeholder='Email address or username'
                        value={credential}
                        onChange={e => setCredential(e.target.value)}
                        required
                    ></input>
                </div>
                <div>
                    <input
                        type='text'
                        placeholder='Password'
                        value={password}
                        onChange={e => setPassword(e.target.value)}
                        required
                    ></input>
                </div>
                <button className='submitBtn' type='submit'>Sign in</button>
                <button className='cancelBtn' type='button' onClick={handleCancel}>Cancel</button>
                <button className='createAccountBtn' type='button' onClick={handleCreateAccount}>Create account</button>
            </form>
        </div>
    );
};

export default LoginFormPage;