import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, Redirect } from 'react-router-dom';

import { login } from '../../store/session';
import '../../index.css';

const SigninFormPage = () => {
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
            .catch(async(res) => {
                const data = await res.json();
                if (data && data.errors) {
                    setErrors(data.errors)
                } else {
                    history.push('/notes')
                }
            });
    };
    
    const handleCancel = (e) => {
        e.preventDefault();
        setCredential('');
        setPassword('');
    };

    const handleDemoSignin = async () => {
        await dispatch(login({ credential: 'Demo-lition', password: 'password' }))
        history.push('/notes')
    };

    if (sessionUser) {
        return <Redirect to='/' />
    };

    return (
        <div className='signin-form-container'>
            <div className='signin-form-body'>
                <div className='signin-form-heading'>
                    <h1>Everynote</h1>
                    <p>Remember everything important.</p>
                    <div className='error-container'>
                        <ul className='error-ul'>
                            {errors.map(error => <li key={error}>{error}</li>)}
                        </ul>
                    </div>
                </div>
                <form className='signin-form' onSubmit={handleSubmit}>
                    <div className='signin-form__input-div'>
                        <input 
                            className='signin-form__input'
                            type='text'
                            placeholder='Email address or username'
                            value={credential}
                            onChange={e => setCredential(e.target.value)}
                            required
                        ></input>
                        <input
                            className='signin-form__input'
                            type='password'
                            placeholder='Password'
                            value={password}
                            onChange={e => setPassword(e.target.value)}
                            required
                        ></input>
                        <button className='signin-btn' type='submit'>Sign in</button>
                        <button className='cancel-btn' type='button' onClick={handleCancel}>Cancel</button>
                    </div>
                    <div className='signin-form__button-div'>
                        <div className='signin-form__button-header'>
                            Don't have an account?
                        </div>
                        <div>
                            <button className='create-account-btn' type='button' onClick={() => history.push('/signup')}>Create account</button>
                        </div>
                        <div>
                            <button className='demo-signin-btn' type='button' onClick={handleDemoSignin}>Demo user</button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default SigninFormPage;