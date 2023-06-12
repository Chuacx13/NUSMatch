import React from 'react'
import { signOut } from 'firebase/auth';
import { auth } from '../config/firebase';
import '../styles/logout.css';

function Logout() {
    
    const logout = async () => {
        await signOut(auth);
    }

    console.log(auth.currentUser);
    return (
    <button onClick={logout}>
        Log Out
    </button>
    );
}

export default Logout;