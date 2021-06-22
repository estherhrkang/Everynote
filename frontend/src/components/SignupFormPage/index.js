import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { useHistory } from 'react-router';
import { signup } from '../../store/session';
import LoginFormPage from '../LoginFormPage';
import './SignupForm.css';

const SignupFormPage = () => {
    const dispatch = useDispatch();
    const history = useHistory();
    const sessionUser = useSelector(state => state.session.user);
    // add error if username or email address already exists

    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [errors, setErrors] = useState([]);

    useEffect(() => {
        const errors = [];

        if (email.length > 256) errors.push('Email address should be less than 256 characters.');
        if (username.length > 30) errors.push('Username should be less than 30 characters.');
        if (username === email) errors.push('Username cannot be same as email address.');
        if (password.length > 60) errors.push('Password should be less than 60 characters.');
        if (password !== confirmPassword) errors.push('Password and confirm password must match.');

        setErrors(errors);
    }, [email, username, password, confirmPassword]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        let newUser = await dispatch(signup({ username, email, password }))

        if (newUser) history.push('/');
    };

    const handleCancel = (e) => {
        e.preventDefault();

        setEmail('');
        setUsername('');
        setPassword('');
        setConfirmPassword('');
    };

    const handleSignin = () => {
        history.push('/');
    }

    if (sessionUser) {
        return <Redirect to='/' />
    }

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
                        placeholder='Username'
                        value={username}
                        onChange={e => setUsername(e.target.value)}
                        required
                    ></input>
                </div>
                <div>
                    <input
                        type='text'
                        placeholder='Email address'
                        value={email}
                        onChange={e => setEmail(e.target.value)}
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
                <div>
                    <input
                        type='text'
                        placeholder='Confirm password'
                        value={confirmPassword}
                        onChange={e => setConfirmPassword(e.target.value)}
                        required
                    ></input>
                </div>
                <button className='submitBtn' type='submit'>Sign up</button>
                <button className='cancelBtn' type='button' onClick={handleCancel}>Cancel</button>
                <div>
                    Already have an account?
                    <button className='signinBtn' type='button' onClick={handleSignin}>Sign in</button>
                </div>
            </form>
        </div>
    );
};

export default SignupFormPage;