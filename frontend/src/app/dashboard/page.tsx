'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { authService } from '@/app/lib/authService';

export default function Dashboard() {
  const [user, setUser] = useState<{message: string} | null>(null);
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      router.push('/login');
    } else {
        setUser({message: 'you are logged in'})
    }
  }, [router]);

  return (
    <div>
      <h1>Dashboard</h1>
      {user && <p>{user.message}</p>}
      <button onClick={() => {
        authService.logout();
        router.push('/login');
      }}>
        Logout
      </button>
    </div>
  );
}