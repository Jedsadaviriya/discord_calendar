'use client';

import { useState } from "react";
import { authService } from "../lib/authService";
import { useRouter } from "next/navigation";
export default function Signup(){
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [username, setUsername] = useState('');
    const [error, setError] = useState('');
    const router = useRouter();
    const handleSignup = async (e: React.FormEvent)=> {
        e.preventDefault();
        const data =await authService.signup(email, password, username);
        if (data.error) {
            setError(data.error);
        }else{
            router.push('/login');
        }
    }

    return (
        <form onSubmit={handleSignup}>
            <input type="text" placeholder="username?" value={username} onChange={(e)=>setUsername(e.target.value)}/>
            <input type="email" placeholder="email?" value={email} onChange={(e)=> setEmail(e.target.value)} />
            <input type="password" placeholder="very secret password?" value={password} onChange={(e)=>setPassword(e.target.value)}/>
            <button type="submit">Sign Up</button>
            {error && <p>{error}</p>}
        </form>
    )
}