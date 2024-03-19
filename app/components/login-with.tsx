"use client";
import { Button } from '@/components/ui/button';
import { signIn } from 'next-auth/react';
import * as React from 'react';
import { FaSpotify } from "react-icons/fa";
import { SiApplemusic } from "react-icons/si";
import { initializeMusicKit, getMusicKitInstance, authorizeMusicKit } from '../api/musickit';
import { useRouter } from 'next/navigation';

export interface ILoginWithProps {
}

export function LoginWith (props: ILoginWithProps) {
  const [isInitialized, setIsInitialized] = React.useState(false);
  const router = useRouter();

  React.useEffect(() => {
    const developerToken: string = process.env.NEXT_PUBLIC_APPLE_SECRET?.toString() || "";
    console.log(developerToken);
    initializeMusicKit(developerToken)
      .then(() => setIsInitialized(true))
      .catch((error) => console.error(error));
  }, []);

  const handleAuthorize = async () => {
    if (isInitialized) {
      await authorizeMusicKit();
      const musicInstance = getMusicKitInstance();
      if (musicInstance?.isAuthorized) {
        router.push('/apple');
      } else {
        console.log('User is not authorized');
      }
    } else {
      console.log('MusicKit is not initialized. error from login-with.tsx: handleAuthorize()');
    }
  }

  return (
    <div className='h-full w-full flex items-center justify-center gap-16'>
      <Button onClick={()=>signIn('spotify', {callbackUrl: "/spotify"})}>
        <FaSpotify className='w-6 h-6' />
        <span className='ml-2'>Login with Spotify</span>
      </Button>
      <Button onClick={handleAuthorize}>
        <SiApplemusic className='w-6 h-6' />
        <span className='ml-2'>Login with Apple Music</span>
      </Button>
    </div>
  );
}
