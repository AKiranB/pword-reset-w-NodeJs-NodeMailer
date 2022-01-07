import React, { useEffect } from 'react'
import { useState } from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import axios from 'axios'


export default function Signup() {

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');


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



    // const signup = (username, password) => {
    //     return axios.post('api/auth/signup', { username, password })
    //         .then(response => {
    //             return response.data;
    //         })
    //         .catch(err => {
    //             return err.response.data
    //         })
    // };

    const signup = () => {
        return axios.post('/api/auth/signup', { username, password })
            .then(response => {
                return response.data;
            })
            .catch(err => {
                return err.response.data
            })
    };

    const handleSubmit = e => {
        e.preventDefault();
        signup(username, password)
            .then(response => {
                if (response.message) {
                    setUsername('');
                    setPassword('');
                    setMessage(response.message)

                } else {
                    console.log('unable to signup')
                }
            })
            .catch(err => console.log(err))
    }

    return (
        <div className='secondaryContainer'>
            <h3>Sign up</h3>
            <form onSubmit={handleSubmit} className='baseForm'>
                <TextField
                    type="text"
                    name="username"
                    value={username}
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
                <Button variant='contained' type="submit">Create Account </Button>
                {message && (
                    <h3>{message}</h3>
                )}
                <p>Already a user? <a href='/login'>- <u>Log In</u></a></p>
            </form>
        </div>
    )

};

