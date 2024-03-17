import { Button } from '@/components/ui/button';
import { signIn } from 'next-auth/react';
import * as React from 'react';
import { FaSpotify } from "react-icons/fa";
import { SiApplemusic } from "react-icons/si";
import { initializeMusicKit, getMusicKitInstance } from '../api/musickit';

export interface ILoginWithProps {
}

export function LoginWith (props: ILoginWithProps) {

  React.useEffect(() => {
    const developerToken: string = process.env.APPLE_SECRET as string;
    initializeMusicKit(developerToken).then(() => {
      const music = getMusicKitInstance();
      if (music) {
        console.log(music.isAuthorized);
      }
    });
  }, []);


  return (
    <div className='h-full w-full flex items-center justify-center gap-16'>
      <Button onClick={()=>signIn('spotify', {callbackUrl: "/spotify"})}>
        <FaSpotify className='w-6 h-6' />
        <span className='ml-2'>Login with Spotify</span>
      </Button>
      <Button onClick={()=> signIn('apple', {callbackUrl: "/apple"})}>
        <SiApplemusic className='w-6 h-6' />
        <span className='ml-2'>Login with Apple Music</span>
      </Button>
    </div>
  );
}
