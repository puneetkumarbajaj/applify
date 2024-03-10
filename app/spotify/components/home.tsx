import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from '@/components/ui/resizable';
import * as React from 'react';
import { SpotifySiderbar } from './sidebar';

export interface ISpotifyHomeProps {
}

export function SpotifyHome (props: ISpotifyHomeProps) {
  return (
    <div className='h-full w-full'>
      <ResizablePanelGroup direction='horizontal'>
        <ResizablePanel defaultSize={22} maxSize={22} minSize={14.5}>
            <div className='h-full w-full bg-blue-200'>
                <SpotifySiderbar/>
            </div>
        </ResizablePanel>
        <ResizableHandle/>
        <ResizablePanel>
            <div className='h-full w-full bg-blue-300'>
                Right panel
            </div>
        </ResizablePanel>
      </ResizablePanelGroup>
    </div>
  );
}
