"use client"

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function DashboardRedirect() {
    const router = useRouter();

    useEffect(() => {
        router.replace('/admin-dashboard');
    }, [router]);

    return (
        <div className="min-h-screen bg-black flex items-center justify-center">
            <div className="animate-pulse text-zinc-500">Redirecting to dashboard...</div>
        </div>
    );
}
