'use client';

import { useRouter } from 'next/navigation';
import { authService } from '../lib/authService';
import { withAuth } from '../lib/protectedRoute';


function Dashboard() {
  const router = useRouter();

  return (
    <div>
      <h1>Dashboard</h1>
      <p>Welcome!</p>
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