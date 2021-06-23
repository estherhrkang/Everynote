import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, Redirect } from 'react-router-dom';

import { login } from '../../store/session';
import './LoginForm.css';

const LoginFormPage = () => {
    const dispatch = useDispatch();
    const history = useHistory();
    const sessionUser = useSelector(state => state.session.user);

    const [credential, setCredential] = useState('');
    const [password, setPassword] = useState('');
    const [errors, setErrors] = useState([]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setErrors([]);
        await dispatch(login({ credential, password }))
            .catch(async (res) => {
                const data = await res.json();
                if (data && data.errors) {
                    setErrors(data.errors)
                } else {
                    history.push('/notebooks')
                }
            })
    };
    
    const handleCancel = (e) => {
        e.preventDefault();
        setCredential('');
        setPassword('');
    };

    const handleDemoSignin = () => {
        dispatch(login({ credential: 'Demo-lition', password: 'password' }))
    };

    if (sessionUser) {
        return <Redirect to='/' />
    };

    return (
        <div className='rootDiv'>
            <h1 className='main-title'>Everynote</h1>
            <p>Remember everything important.</p>
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
                <div>
                    <button className='submitBtn' type='submit'>Sign in</button>
                </div>
                <div>
                    <button className='cancelBtn' type='button' onClick={handleCancel}>Cancel</button>
                </div>
                <div>
                    Don't have an account?
                    <button className='createAccountBtn' type='button' onClick={() => history.push('/signup')}>Create account</button>
                </div>
                <div>
                    <button className='demoBtn' type='button' onClick={handleDemoSignin}>Demo user</button>
                </div>
            </form>
        </div>
    );
};

export default LoginFormPage;