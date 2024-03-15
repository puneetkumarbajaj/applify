"use client";
import * as React from 'react';
import { SpotifyHome } from './components/home';

export interface ISpotifyProps {
}

export function Spotify (props: ISpotifyProps) {

  return (
    <div className='h-screen w-screen'>
        <SpotifyHome />
    </div>
  );
}

export default Spotify;