import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';

import { login } from '../../store/session';

const LoginFormPage = () => {
    const dispatch = useDispatch();
    const history = useHistory();

    const [credential, setCredential] = useState('');
    const [password, setPassword] = useState('');
    const [errors, setErrors] = useState([]);

    useEffect(() => {
        const errors = [];

        if (!credential.length) errors.push('Please provider your email addres or username.');
        if (!password.length) errors.push('Please provide your password.');

        setErrors(errors);
    }, [credential, password]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        const payload = {
            credential,
            password
        };

        let loggedInUser = await dispatch(login(payload));

        if (loggedInUser) history.push('/');
    };

    const handleCancel = (e) => {
        e.preventDefault();
        setCredential('');
        setPassword('');
    };

    return (
        <div>
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
                    ></input>
                </div>
                <div>
                    <input
                        type='text'
                        placeholder='Password'
                        value={password}
                        onChange={e => setPassword(e.target.value)}
                    ></input>
                </div>
                <button type='submit'>Sign in</button>
                <button type='button' onClick={handleCancel}>Cancel</button>
            </form>
        </div>
    );
};

export default LoginFormPage;