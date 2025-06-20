'use client'

import { useAuth } from "@/context/AuthContext";
import { useSearchParams } from "next/navigation";
import { useState } from "react";

const Login = () => {

    const params = useSearchParams();
    const isReg = params.get('register');

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isRegistration, setRegistration] = useState(isReg);
    const [error, setError] = useState(null);
    const [authenticating, setAuthenticating] = useState(false);

    const {signup, login} = useAuth();

    const handleAuthenticate = async () => {
        let atSymbol = (!email || !email.includes('@'));
        let passValid = (!password || password.length < 6)
        
        if (atSymbol || passValid || authenticating) {
            return;
        }

        setError(null);
        setAuthenticating(true);

        try {
            if (isRegistration) {
                // Register user.
                await signup(email, password);
            }

            else {
                // Login user.
                await login(email, password);
            }
        }

        catch (err) {
            console.log(err.message);
            setError(err.message)
        }

        finally {
            setAuthenticating(false);
        }
    }

    return (
        <div className="login">
            <h2>{isRegistration ? 'Create an account' : 'Login'}</h2>
            {error && (<div className="">
                <p>❌ {error}</p>
            </div>)}
            <input value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" type="email" />
            <input value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" type="password" />
            <button onClick={handleAuthenticate} disabled={authenticating}>
                {authenticating ? 'Submitting...' : 'Submit'}
            </button>
            <div className="full-line" />
            <div>
                <p>{(isRegistration ? 'Already' : 'Don\'t') + ' have an account?' }</p>
                <button onClick={ () => {
                    setRegistration(!isRegistration)
                }}>{isRegistration ? 'Log in' : 'Sign Up'}</button>
            </div>
        </div>
    )
}

export default Login;