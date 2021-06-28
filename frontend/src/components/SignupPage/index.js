import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { useHistory } from 'react-router';
import { signup } from '../../store/session';
import '../../index.css';

const SignupPage = () => {
    const dispatch = useDispatch();
    const history = useHistory();
    const sessionUser = useSelector(state => state.session.user);
    // add error if username or email address already exists

    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [errors, setErrors] = useState([]);
    const [passwordType, setPasswordType] = useState('password');

    useEffect(() => {
        const errors = [];

        if (email.length > 256) errors.push('Email address must be less than 256 characters.');
        if (email.length && !email.includes('@' && '.')) errors.push('Please provide an email address.');
        if (username.length > 30) errors.push('Username must be less than 30 characters.');
        if (username.length && username === email) errors.push('Username cannot be same as email address.');
        if (password.length > 60) errors.push('Password must be less than 60 characters.');
        if (password.length < 6) errors.push('Password must be 6 characters or more.')
        if (password !== confirmPassword) errors.push('Password and confirm password must match.');

        setErrors(errors);
    }, [email, username, password, confirmPassword]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        let newUser = await dispatch(signup({ username, email, password }))

        if (newUser) history.push('/notes');
    };

    const handleCancel = (e) => {
        e.preventDefault();

        setEmail('');
        setUsername('');
        setPassword('');
        setConfirmPassword('');
    };

    if (sessionUser) {
        return <Redirect to='/notes' />
    }

    return (
        <div className='signup-form-container'>
            <div className='signup-form-body'>
                <div className='signup-form-heading'>
                    <h1>Everynote</h1>
                    <p>Remember everything important.</p>
                    <div className='error-container'>
                        <ul>
                            {errors.map(error => <li  className='error-li' key={error}>{error}</li>)}
                        </ul>
                    </div>
                </div>
                <form className='signup-form' onSubmit={handleSubmit}>
                    <div className='signup-form__input-div'>
                        <input
                            className='signup-form__input'
                            type='text'
                            placeholder='Username'
                            value={username}
                            onChange={e => setUsername(e.target.value)}
                            required
                        ></input>
                        <input
                            className='signup-form__input'
                            type='text'
                            placeholder='Email address'
                            value={email}
                            onChange={e => setEmail(e.target.value)}
                            required
                        ></input>
                        <input
                            className='signup-form__input'
                            type={passwordType}
                            placeholder='Password'
                            value={password}
                            onChange={e => setPassword(e.target.value)}
                            required
                        ></input>
                        <input
                            className='signup-form__input'
                            type={passwordType}
                            placeholder='Confirm password'
                            value={confirmPassword}
                            onChange={e => setConfirmPassword(e.target.value)}
                            required
                        ></input>
                        <button className='signup-btn' type='submit'>Sign up</button>
                        <button className='cancel-btn' type='button' onClick={handleCancel}>Cancel</button>
                    </div>
                    {password && (
                        <div className='show-password-div'>
                            <label>Show password</label>
                            <input
                                className='show-password-checkbox'
                                type='checkbox' 
                                onClick={() => passwordType === 'password' ? setPasswordType('text') : setPasswordType('password')}
                            >
                            </input>
                        </div>
                    )}
                    <div className='signin-form__button-div'>
                        <div className='signin-form__button-header'>
                            Already have an account?
                        </div>
                        <div>
                            <button className='alter-signin-btn' type='button' onClick={() => history.push('/')}>Sign in</button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default SignupPage;