'use client';

import { useEffect } from "react";
import { useRouter } from "next/navigation";
export function withAuth(Component: any){
    return function ProtectedRoute(props: any) {
        const router = useRouter();
        useEffect(()=>{
            const token =localStorage.getItem('token');
            if (!token) {
                router.push('/login');
            }
        }, [router]);
        return <Component {...props}/>;
    }
}