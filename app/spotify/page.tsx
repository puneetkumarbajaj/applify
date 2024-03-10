"use client";
import * as React from 'react';
import { SpotifyHome } from './components/home';

export interface ISpotifyProps {
}

export default class Spotify extends React.Component<ISpotifyProps> {
  public render() {
    return (
      <div className='h-screen w-screen'>
        <SpotifyHome />
      </div>
    );
  }
}
