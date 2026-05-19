'use client';

import { useRouter } from 'next/navigation';
import { authService } from '../lib/authService';
import { withAuth } from '../lib/protectedRoute';
import { useEffect, useState } from 'react';
import Link from 'next/link';

function Dashboard() {
  const [events, setEvents] = useState<any[]>([]);
  const router = useRouter();

  useEffect(() =>{
    fetchEvents();
  },[]);
  const fetchEvents=async()=> {
    const data = await authService.request('/api/events', 'GET')
    setEvents(data)
  }
  return (
    <div>
      <h1>Dashboard</h1>
      <Link href="/dashboard/events">Create Events</Link>
      <h2>These are your Events:</h2>
      {events.map((event: any)=>(
        <div key={event._id}>
          <h3>{event._id}</h3>
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