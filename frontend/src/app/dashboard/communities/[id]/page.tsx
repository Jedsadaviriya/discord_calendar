'use client';

import { useEffect, useState } from "react";
import { authService } from "@/app/lib/authService";
import { withAuth } from "@/app/lib/protectedRoute";
import { useParams } from "next/navigation";

function CommunityDetail(){
    const [email, setEmail]= useState('');
    const [error, setError]= useState('');
    const [communityEvents, setCommunityEvents] = useState<any[]>([])
    const [commuinty, setCommunity]=useState<any>(null);
    const params= useParams();
    const communityId = params.id as string;

    useEffect(()=>{
        fetchCommunity();
        fetchCommunityEvents();
    }, []);

    const fetchCommunityEvents =async()=>{
        const data = await authService.request(`/api/communities/${communityId}/events`, 'GET');
        setCommunityEvents(data);
    }

    const fetchCommunity = async()=> {
        const data = await authService.request(`/api/communities/${communityId}`, 'GET');
        setCommunity(data);
    }

    const handleInvite = async (e: React.FormEvent)=>{
        e.preventDefault();
        const data = await authService.request(`/api/communities/${communityId}/invite`, 'POST',{
            email
        })
        if (data.error){
            setError(data.error)
        } else {
            setEmail('');
            fetchCommunity();
            alert('A Mf(Member/family...) invited');
        }
    };
    return(
        <div>
            <h1>Invite Member</h1>
            <form onSubmit={handleInvite}>
                <input type="email" placeholder="Email" value={email} onChange={(e)=>setEmail(e.target.value)} required />
                <button type="submit">Invite</button>
            </form>
            {error && <p>{error}</p>}
            <h2>Community Events</h2>
            {communityEvents.map((event: any) => (
                <div key={event._id}>
                    <h3>{event.title}</h3>
                    <p>{event.type}</p>
                    <p>{new Date(event.startTime).toLocaleString()}</p>
                    <p>hello world</p>
                </div>
                
            ))}
        </div>
    )
}

export default withAuth(CommunityDetail);