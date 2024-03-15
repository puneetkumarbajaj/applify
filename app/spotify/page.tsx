"use client";
import * as React from 'react';
import { Body } from './components/body';

export interface ISpotifyProps {
}

export function Spotify (props: ISpotifyProps) {

  return (
    <div className='h-screen w-screen'>
        <Body />
    </div>
  );
}

export default Spotify;