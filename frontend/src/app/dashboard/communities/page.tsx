'use client';
import { authService } from "@/app/lib/authService";
import { withAuth } from "@/app/lib/protectedRoute";
import React, { useState, useEffect } from "react";
import Link from "next/link";
function Communities(){
    const [name,setName]=useState('');
    const [error,setError]=useState('');
    const [communities,setCommunities]=useState<any[]>([]);

    const fetchCommunities=async()=>{
        const data = await authService.request('/api/communities', 'GET');
        if (!data.error) setCommunities(data);
    };

    useEffect(()=>{ fetchCommunities(); },[]);

    const handleCreate=async(e:React.FormEvent)=>{
        e.preventDefault();
        const data = await authService.request('/api/communities', 'POST',{
            name
        });
        if (data.error){
            setError(data.error);
        }else{
            setName('');
            alert('Community created... you dumbahhhh');
            fetchCommunities();
        }
    }
    return (
        <div>
            <h1>Create Community</h1>
            <form onSubmit={handleCreate}>
                <input type="text" placeholder="Community Nammmmmmeeee" value={name} onChange={(e)=>setName(e.target.value)} required/>
                <button type="submit">Create</button>
            </form>
            {error && <p>{error}</p>}
            <h2>Your Communities</h2>
                {communities.map((community: any) => (
                <div key={community._id}>
                    <Link href={`/dashboard/communities/${community._id}`}>
                    <h3>{community.name}</h3>
                    </Link>
                    <p>Members: {community.members.length}</p>
                </div>
            ))}
        </div>

    )
}
export default withAuth(Communities)