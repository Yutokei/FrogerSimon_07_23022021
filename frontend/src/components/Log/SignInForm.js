import React, { useState, useContext } from 'react';
import { useHistory } from 'react-router';
import { AuthContext } from '../../auth/AuthContext';
import axios from 'axios';

const SignInForm = () => {
    
    const history =useHistory()

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const { setAuthState } = useContext(AuthContext)

    const handleLogin = (e) => {
        e.preventDefault();
        const emailError = document.querySelector('.email.error')
        const passwordError = document.querySelector('.password.error')
        axios({
            method:'post',
            url: `${process.env.REACT_APP_API_URL}api/user/login`,
            withCredentials: false,
            data: {
                email,
                password,
            }
        })
        .then((res) => {
            if (res.data.errors) {
                alert(res.data.error)
                console.log(email)
                emailError.innerHTML = res.data.errors.email;
                passwordError.innerHTML = res.data.errors.password;
            }
            else {
                localStorage.setItem("token", res.data.token);
                setAuthState({
                    username: res.data.username, 
                    uuid: res.data.uuid,
                    admin: res.data.isAdmin,
                    status: true
                });
                history.push('/home');
            }
        })
        .catch((err) => {
            console.error(err)
        })
    }

    return (
        <form action="" onSubmit={handleLogin} id="sign-up-form">
            <label htmlFor="email">Email</label>
            <br />
            <input
             type="text" 
             name="email" 
             id="email" 
             onChange={(e) => setEmail(e.target.value)} 
             value={email}
            />
            <div className="email error"></div>
            <br />
            <label htmlFor="password">Email</label>
            <br />
            <input
             type="password" 
             name="password" 
             id="password" 
             onChange={(e) => setPassword(e.target.value)} 
             value={password}
            />
            <div className="email error"></div>
            <br />
            <input type="submit" value="Se connecter"/>
        </form>

    )
}

export default SignInForm;