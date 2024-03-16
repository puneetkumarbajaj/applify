"use client";
import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from '@/components/ui/resizable';
import * as React from 'react';
import { SpotifySiderbar } from './sidebar';
import { PlaylistView } from './PlaylistView';
import { Library } from './Library';
import { Artist } from './Artist';
import { Home } from './home';
import { Player } from './player';

export interface IBodyProps {
}

export function Body (props: IBodyProps) {

  const [view, setView] = React.useState('home');
  const [globalPlaylistId, globalSetPlaylistId] = React.useState(null);
  const [globalArtistId, globalSetArtistId] = React.useState(null);
  const [globalCurrentSongId, globalSetCurrentSongId] = React.useState(null);
  const [globalIsPlaying, globalSetIsPlaying] = React.useState(false);

  return (
    <div className='h-screen w-full bg-black flex flex-col'>
      <ResizablePanelGroup direction='horizontal'>
        <ResizablePanel defaultSize={22} maxSize={22} minSize={14.5}>
            <div className='h-full w-full'>
                <SpotifySiderbar
                  view={view}
                  setView={setView}
                  setGlobalPlaylistId={globalSetPlaylistId as (id: string | null) => void}
                />
            </div>
        </ResizablePanel>
        <ResizableHandle className='bg-black hover:bg-neutral-400'/>
        <ResizablePanel>
          {
            view === 'playlist' && 
            <PlaylistView 
              globalPlaylistId={globalPlaylistId}
              globalsetCurrentSongId={globalSetCurrentSongId as (id: string | null) => void}
              globalsetIsPlaying={globalSetIsPlaying as (isPlaying: boolean) => void}
              globalsetIsPlaying={globalSetIsPlaying as (isPlaying: boolean) => void}
              globalIsPlaying={globalIsPlaying}
            />
          }
          console.log(view);
          {view === 'library' && <Library />}
          {view === 'artist' && <Artist />}
          {view === 'home' && <Home />}
          {view === 'search' && <div>Search</div>}
        </ResizablePanel>
      </ResizablePanelGroup>
      <div className='h-24 w-full z-20 bottom-0 sticky'>
        <Player 
          globalCurrentSongId={globalCurrentSongId}
          globalsetCurrentSongId={globalSetCurrentSongId as (id: string | null) => void}
        />
      </div>
    </div>
  );
}
