"use client";
import * as React from 'react';
import { Sidebar } from './sidebar';
import { Home } from './home';
import { Header } from './header';
import { PlaylistView } from './PlaylistView';

export interface IBodyProps {
}

export function Body (props: IBodyProps) {

  const [view, setView] = React.useState('home');
  const [globalPlaylistId, globalSetPlaylistId] = React.useState(null);
  const [globalArtistId, globalSetArtistId] = React.useState(null);
  const [globalCurrentSongId, globalSetCurrentSongId] = React.useState(null);
  const [globalIsPlaying, globalSetIsPlaying] = React.useState(false);

  return (
    <div className='w-full h-screen flex'>
        <div className='lg:w-[260px] md:w-[260px] sm:w-0 bg-gray-200'>
            <Sidebar 
              view={view}
              setView={setView}
              setGlobalPlaylistId={globalSetPlaylistId as (id: string | null) => void}
            />
        </div>
        <div className='flex-grow flex flex-col bg-gray-100'>
          <div className='lg:h-[54px] sm:h-0 border-b-[0.5px] border-neutral-800'>
            <Header />
          </div>
          <div className='flex-grow w-full h-full'>
            {
              view === 'playlist' &&
              <PlaylistView
                globalPlaylistId={globalPlaylistId}
                globalsetCurrentSongId={globalSetCurrentSongId as (id: string | null) => void}
                globalsetIsPlaying={globalSetIsPlaying as (isPlaying: boolean) => void}
              />
            }
            {view === 'library' && <div>Library</div>}
            {view === 'artist' && <div>Artist</div>}
            {view === 'home' && <Home />}
            {view === 'search' && <div>Search</div>}
          </div>
        </div>
    </div>
  );
}
