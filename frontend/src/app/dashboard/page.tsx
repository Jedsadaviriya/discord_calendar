'use client';

import { useRouter } from 'next/navigation';
import { authService } from '../lib/authService';
import { withAuth } from '../lib/protectedRoute';
import { useEffect, useState } from 'react';
import Link from 'next/link';

function Dashboard() {
  const [events, setEvents] = useState<any[]>([]);
  const [communities, setCommunities]=useState<any[]>([]);
  const router = useRouter();

  useEffect(() =>{
    fetchEvents();
    fetchCommunities();
  },[]);
  const fetchEvents=async()=> {
    const data = await authService.request('/api/events', 'GET')
    if (Array.isArray(data)) setEvents(data)
  }
  const fetchCommunities=async()=> {
    const data = await authService.request('/api/communities', 'GET');
    if (Array.isArray(data)) setCommunities(data);
  }
  return (
    <div>
      <h1>Dashboard</h1>
      <Link href="/dashboard/events">Create Events</Link>
      <Link href="/dashboard/communities">Create Communities</Link>
      <h2>Yo Fam (Communities)</h2>
      {communities.map((community: any)=>(
        <div key={community._id}>
          <h3>{community.name}</h3>
          <p>Members: {community.members.length}</p>
          <Link href={`/dashboard/communities/${community._id}`}>Invite Members</Link>
        </div>
      ))}
      <h2>These are your Events:</h2>
      {events.map((event: any)=>(
        <div key={event._id}>
          <h3>{event.title}</h3>
          <p>{event.type}</p>
          <p>{new Date(event.startTime).toLocaleString()}</p>
        </div>
      ))}
      <button onClick={() => {
        authService.logout();
        router.push('/login');
      }}>
        Logout
      </button>
    </div>
  );
}

export default withAuth(Dashboard);