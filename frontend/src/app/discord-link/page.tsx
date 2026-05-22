'use client';

import { useSearchParams, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { authService } from '../lib/authService';

export default function DiscordLink() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const code = searchParams.get('code');
  const discordId = searchParams.get('discordId');
  const [message, setMessage] = useState('Linking...');

  useEffect(() => {
    if (!discordId || !code) return;

    const token = localStorage.getItem('token');
    if (!token) {
      const returnUrl = `/discord-link?code=${code}&discordId=${discordId}`;
      router.push(`/login?redirect=${encodeURIComponent(returnUrl)}`);
      return;
    }

    linkDiscord();
  }, [discordId, code]);

  const linkDiscord = async () => {
    const data = await authService.request('/api/discord/link', 'POST', {
      discordId
    });
    if (data.error) {
      setMessage('Error: ' + data.error);
    } else {
      setMessage('Discord account linked! You can close this window.');
    }
  };

  return (
    <div>
      <h1>Linking Discord Account</h1>
      <p>{message}</p>
    </div>
  );
}