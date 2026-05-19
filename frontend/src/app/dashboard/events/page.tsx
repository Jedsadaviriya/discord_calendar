'use client'
import { useState } from "react"
import { authService } from "@/app/lib/authService"
import { withAuth } from "@/app/lib/protectedRoute"

function Events(){
    const [title,setTitle] = useState('');
    const [startTime,setStartTime] = useState('');
    const [endTime,setEndTime] = useState('');
    const [type,setType] = useState('personal');
    const [error,setError] = useState('');

   const handleCreate = async (e: React.FormEvent) => {
  e.preventDefault();
  const data = await authService.request('/api/events', 'POST', {
    title,
    startTime: new Date(startTime).toISOString(),
    endTime: new Date(endTime).toISOString(),
    type
  });
  if (data.error) {
    setError(data.error);
  } else {
    setTitle('');
    setStartTime('');
    setEndTime('');
    alert('Event created!');
  }
};
    return(
        <div>
            <h1>Create Event</h1>
            <form onSubmit={handleCreate}>
                <input type="text" placeholder="What's the tit...le" value={title} onChange={(e)=>setTitle(e.target.value)} required/>
                <input type="datetime-local" value={startTime} onChange={(e)=>setStartTime(e.target.value)} required/>
                <input type="datetime-local" value={endTime} onChange={(e)=>setEndTime(e.target.value)} required />
                <select value={type} onChange={(e)=>setType(e.target.value)}>
                    <option value="personal">Personal</option>
                    <option value="work">Work</option>
                    <option value="family">Family</option>
                </select>
                <button type="submit">Create</button>
            </form>
            {error && <p>{error}</p>}
        </div>
    )
}

export default withAuth(Events)