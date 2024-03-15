"use client";
import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from '@/components/ui/resizable';
import * as React from 'react';
import { SpotifySiderbar } from './sidebar';
import { PlaylistView } from './PlaylistView';
import { Library } from './Library';
import { Artist } from './Artist';
import { Home } from './home';

export interface IBodyProps {
}

export function Body (props: IBodyProps) {

  const [view, setView] = React.useState('home');
  const [globalPlaylistId, globalSetPlaylistId] = React.useState(null);
  const [globalArtistId, globalSetArtistId] = React.useState(null);

  return (
    <div className='h-screen w-full bg-black'>
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
            />
          }
          console.log(view);
          {view === 'library' && <Library />}
          {view === 'artist' && <Artist />}
          {view === 'home' && <Home />}
          {view === 'search' && <div>Search</div>}
        </ResizablePanel>
      </ResizablePanelGroup>
    </div>
  );
}
