import { cn } from '@/lib/utils';
import * as React from 'react';

export interface IListItemType1Props {
    isPlaylist : boolean;
    image: string;
    title: string;
    creator: string;
    duration?: string;
    isPlaying?: boolean;
    isLiked?: boolean;
}

export function ListItemType1 (props: IListItemType1Props) {
  return (
    <div className={cn("w-full px-4 py-2", 
        props.isPlaylist ? "h-[64px] cursor-pointer" : "h-[54px] justify-between"
    )}
    >
      <div className='flex items-center gap-3'>
        <img src={props.image} alt="playlist" className={cn(props.isPlaylist ? "h-[48px] w-[48px]" : "h-[40px] w-[40px]")} />
        <div className='flex flex-col'>
            <p className='text-sm font-semibold text-white'>{props.title}</p>
            <p className='text-xs text-neutral-400'>{props.creator}</p>
        </div>
      </div>
    </div>
  );
}
