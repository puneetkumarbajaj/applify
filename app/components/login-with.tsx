import { Button } from '@/components/ui/button';
import { signIn } from 'next-auth/react';
import * as React from 'react';
import { FaSpotify } from "react-icons/fa";
import { SiApplemusic } from "react-icons/si";
import { initializeMusicKit, getMusicKitInstance, authorizeMusicKit } from '../api/musickit';

export interface ILoginWithProps {
}

export function LoginWith (props: ILoginWithProps) {
  const [isInitialized, setIsInitialized] = React.useState(false);

  React.useEffect(() => {
    const developerToken = process.env.APPLE_SECRET;
    // initializeMusicKit(developerToken)
    //   .then(() => setIsInitialized(true))
    //   .catch((error) => console.error(error));

    document.addEventListener('musickitloaded', function() {
      MusicKit.configure({
        developerToken: developerToken,
        app: {
          name: 'Applify',
          build: '0.1',
        }
      });
      setIsInitialized(true);
      console.log('MusicKit loaded. message from login-with.tsx: useEffect()');
    });
  }, []);

  const handleAuthorize = async () => {
    if (isInitialized) {
      await authorizeMusicKit();
      const musicInstance = getMusicKitInstance();
      if (musicInstance?.isAuthorized) {
        console.log('User is authorized. error from login-with.tsx: handleAuthorize()');
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
      <Button id='apple-music-authorize'>
        <SiApplemusic className='w-6 h-6' />
        <span className='ml-2'>Login with Apple Music</span>
      </Button>
    </div>
  );
}
