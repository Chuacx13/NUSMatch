import React from 'react';
import { auth } from '../config/firebase';
import { createUserWithEmailAndPassword, signOut, signInWithEmailAndPassword, sendEmailVerification } from 'firebase/auth'; 
import { useEffect, useState } from 'react';
import Axios from 'axios';

export const Auth = () => { 

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [users, setUsers] = useState([]);

    console.log(auth?.currentUser?.email);
    console.log(auth?.currentUser?.emailVerified);

    const register = async () => {
        try {
            await createUserWithEmailAndPassword(auth, email, password);
            await sendEmailVerification(auth.currentUser);
            await signOut(auth);
        } catch (err) {
            console.error(err);
        }
    };

    const logOut = async () => {
        try {
            await signOut(auth);
        } catch (err) {
            console.error(err);
        }
    }

    const login = async () => {
        try {
            await signInWithEmailAndPassword(auth, email, password);
            if (!auth.currentUser.emailVerified) {
                signOut(auth);
            }
        } catch (err) {
            console.error(err);
        }
    }

    const emailInput = (e) => {
        const localPart = e.target.value;
        const modifiedEmail = localPart + "@u.nus.edu";
        setEmail(modifiedEmail);        
    }

    return (
        <div>
            <input 
                placeholder="NUSNET ID" 
                onChange={emailInput}
                required
            />
            <input 
                placeholder="Password"
                type="password"
                onChange={(e) => setPassword(e.target.value)}
                required
            />
            <button onClick={register}> Register </button>
            <button onClick={logOut}> Log Out </button>
            <button onClick={login}> Login </button>
        </div>
    );
};