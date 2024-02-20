import { Button } from '@/components/ui/button';
import * as React from 'react';
import { FaSpotify } from "react-icons/fa";
import { SiApplemusic } from "react-icons/si";

export interface ILoginWithProps {
}

export function LoginWith (props: ILoginWithProps) {
  return (
    <div className='h-full w-full flex items-center justify-center gap-16'>
      <Button>
        <FaSpotify className='w-6 h-6' />
        <span className='ml-2'>Login with Spotify</span>
      </Button>
      <Button>
        <SiApplemusic className='w-6 h-6' />
        <span className='ml-2'>Login with Apple Music</span>
      </Button>
    </div>
  );
}
