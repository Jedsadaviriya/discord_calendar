'use client'
import { useState,useEffect } from "react"
import { authService } from "@/app/lib/authService"
import { withAuth } from "@/app/lib/protectedRoute"

function WorkSchedule(){
    const [daysOfWeek, setDaysOfWeek]=useState<number[]>([]);
    const [startTime, setStartTime]=useState('09:00');
    const [endTime, setEndTime]=useState('17:00');
    const [timezone, setTimezone]=useState('UTC');
    const[error, setError]=useState('');
    const [schedule, setSchedule]=useState<any>(null);

    useEffect(()=>{
        fetchSchedule();
    }, []);
    const fetchSchedule=async()=>{
        const data=await authService.request('/api/schedule', 'GET');
        if (data&& data._id){
            setSchedule(data);
            setDaysOfWeek(data.daysOfWeek);
            setStartTime(data.startTime);
            setEndTime(data.endTime);
            setTimezone(data.timezone);
        }
    }
    const handleDayToggle = (day:number)=>{
        setDaysOfWeek(prev=>
            prev.includes(day) ? prev.filter(d=>d!==day) : [...prev,day]
        );
    };
    const handleSave =async (e: React.FormEvent)=>{
        e.preventDefault();
        const data =await authService.request('/api/schedule', 'POST',{
            daysOfWeek,
            startTime,
            endTime,
            timezone
        });
        if (data.error){
            setError(data.error);
        }else{
            alert('Schedule saved... you dumbahhhh')
        }
    };
    const days = ['Mon','Tue','Wed','Thu','Fri','Sat','Sun'];
    return(
        <div>
            <h1>Work Schedule</h1>
            <form onSubmit={handleSave}>
                <h2>Days</h2>
                {days.map((day, i)=>(
                    <label key={i}>
                        <input type="checkbox"
                        checked={daysOfWeek.includes(i)}
                        onChange={()=> handleDayToggle(i)} />
                        {day}
                    </label>
                ))}
                <h2>Work Hourssssss</h2>
                <input type="time" 
                value={startTime}
                onChange={(e) => setStartTime(e.target.value)}/>
                <input type="time" 
                value={endTime}
                onChange={(e) => setEndTime(e.target.value)}/>
                <h2>Timezone</h2>
                <input type="text" placeholder="UTC"
                value={timezone} 
                onChange={(e)=>setTimezone(e.target.value)}/>
                <button type="submit">Save</button>
            </form>
            {error && <p>{error}</p>}
        </div>
    )
}

export default withAuth(WorkSchedule);
