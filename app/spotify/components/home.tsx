"use client";
import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from '@/components/ui/resizable';
import * as React from 'react';
import { SpotifySiderbar } from './sidebar';

export interface ISpotifyHomeProps {
}

export function SpotifyHome (props: ISpotifyHomeProps) {

  const [view, setView] = React.useState('home');
  const [globalPlaylistId, globalSetPlaylistId] = React.useState(null);
  const [globalArtistId, globalSetArtistId] = React.useState(null);

  return (
    <div className='h-screen w-full'>
      <ResizablePanelGroup direction='horizontal'>
        <ResizablePanel defaultSize={22} maxSize={22} minSize={14.5}>
            <div className='h-full w-full bg-black'>
                <SpotifySiderbar
                  view={view}
                  setView={setView}
                  setGlobalPlaylistId={globalSetPlaylistId as (id: string | null) => void}
                />
            </div>
        </ResizablePanel>
        <ResizableHandle className='bg-black hover:bg-neutral-400'/>
        <ResizablePanel>
            <div className='h-full w-full bg-black'>
                Right panel
            </div>
        </ResizablePanel>
      </ResizablePanelGroup>
    </div>
  );
}
