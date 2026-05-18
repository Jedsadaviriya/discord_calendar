'use client';

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function Home(){
  const [token,setToken]=useState<string|null>(null);
  const router = useRouter();
  useEffect(()=> {
    setToken(localStorage.getItem('token'))
  }, []);
  return (
    <div>
      <h1>DiCalendar</h1>
      {token ? (
        <>
         <Link href="/dashboard">go to Dashboard</Link>
         <button onClick={()=>{
          localStorage.removeItem('token');
          router.push('/');
         }}>Logout</button>
        </>
      ) : (
        <>
          <Link href="/login">Login</Link>
          <Link href="/signup">Signup</Link>
        </>
      )}
    </div>
  );
}