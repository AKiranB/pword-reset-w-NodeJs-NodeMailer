import React, { useEffect } from 'react'
import { useState } from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import axios from 'axios'


export default function Signup() {

    const [name, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');
    const [email, setEmail] = useState('')
    const [error, setError] = useState('')

    useEffect(() => {
        const apiTest = () => {
            axios
                .get("/auth/signup")
                .then((res) => {
                    console.log(res);
                })
                .catch((err) => {
                    console.log(err);
                });
        }

        apiTest()
    }, [])

    const signup = () => {
        return axios.post('/auth/signup', { name, password, email })
            .then(response => {
                return response.data;
            })
            .catch(err => {
                console.log(err)
            })
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const { data: res } = axios.post('/auth/signup', { name, password, email })
            setMessage(res.message);
        } catch (error) {
            if (
                error.response &&
                error.response.status >= 400 &&
                error.response.status <= 500
            ) {
                setError(error.response.data.message);
            }
        }
    };


    // const handleSubmit = e => {
    //     e.preventDefault();
    //     signup(name, password, email)
    //         .then(response => {
    //             if (response.message) {
    //                 setUsername('');
    //                 setPassword('');
    //                 setMessage(response.message)

    //             } else {
    //                 console.log(response.error)
    //             }
    //         })
    //         .catch(err => console.log(err))
    // }

    return (
        <div className='secondaryContainer'>
            <h3>Sign up</h3>
            <form onSubmit={handleSubmit} className='baseForm'>
                <TextField
                    type="text"
                    name="username"
                    value={name}
                    onChange={e => setUsername(e.target.value)}
                    className='Input'
                    error={message ? true : false}
                    label="Username" variant="outlined"

                />
                <TextField
                    type="password"
                    name="password"
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                    className='Input'
                    error={message ? true : false}
                    label="Password" variant="outlined"

                />
                <TextField
                    type="email"
                    name="email"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    className='Input'
                    error={message ? true : false}
                    label="email" variant="outlined"

                />
                <Button variant='contained' type="submit">Create Account </Button>
                {message && (
                    <h3>{message}</h3>

                )}
                <p>Already a user? <a href='/login'>- <u>Log In</u></a></p>
                {error && (
                    <h3>{error}</h3>

                )}
            </form>
        </div>
    )

};

