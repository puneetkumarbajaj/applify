
/* eslint-disable */
"use client";
import * as React from 'react';

import { GoHome } from "react-icons/go";
import { CiSearch } from "react-icons/ci";
import { BiLibrary } from "react-icons/bi";
import { IoIosAdd , IoIosList } from "react-icons/io";
import { FiArrowRight } from "react-icons/fi";
import PillContainer from '@/components/ui/pills-container';
import { ScrollArea } from '@/components/ui/scroll-area';
import { ListItemType1 } from './ui/list-item-type-1';
import { useSession } from 'next-auth/react';
import { cn } from '@/lib/utils';
import { fetchPlaylists } from '@/app/api/Spotifymethods';

export interface ISpotifySiderbarProps {
  view: string;
  setView: (view: string) => void;
  setGlobalPlaylistId: (id: string) => void;
}



export function SpotifySiderbar (props: ISpotifySiderbarProps) {

  const {data:session} = useSession();
  const [x, setX] = React.useState("");
  const [playlists, setPlaylists] = React.useState<Playlist[]>([])

  React.useEffect(() => {
    async function fetchData() {
      if (session && session.accessToken) {
        try{
          const items = await fetchPlaylists(session.accessToken, session.user?.id as string);
          setPlaylists(items);
        } catch (error) {
          console.error('Error fetching playlists:', error);
        }
      }
    }
  
    fetchData();
  }, [session]);

  return (
    <div className='max-h-full min-h-full w-full flex flex-col gap-2 pt-3 pl-3'>
      <div className='bg-neutral-900 h-[112px] w-full flex flex-col rounded-lg'>
        <div 
          className={cn('h-[56px] w-full flex items-center justify-start p-5 gap-5 text-neutral-400 hover:text-white transition-colors cursor-pointer',
            props.view === 'home' ?  'text-white' : ''
          )}
          onClick={() => props.setView('home')}
        >
          <GoHome className='text-2xl'/>
          <p className='font-semibold'>Home</p>
        </div>
        <div 
          className={cn('h-[56px] w-full flex items-center justify-start p-5 gap-5 text-neutral-400 hover:text-white transition-colors cursor-pointer',
            props.view === 'search' ? 'text-white' : ''
          )}
          onClick={() => props.setView('search')}
        >
          <CiSearch className='text-white text-2xl'/>
          <p className='font-semibold'>Search</p>
        </div>
      </div>
      <div className='bg-neutral-900 flex flex-col flex-grow max-h-full rounded-lg overflow-y-auto'>
        <div className='w-full flex items-center justify-between p-5 gap-5 text-neutral-400 hover:text-white transition-colors cursor-pointer'>
            <div className='flex gap-5'>
                <BiLibrary className='text-2xl'/>
                <p className='font-semibold'>Your Library</p>
            </div>
            <div className='flex gap-5'>
                <IoIosAdd className='text-2xl'/>
                <FiArrowRight className=' text-2xl' onClick={() => props.setView("library")}/>
            </div>
        </div>
        <div className='w-full h-10'>
          <PillContainer titles={['Playlists', 'By Spotify', 'By You']} />
        </div>
        <ScrollArea className='flex-grow overflow-y-auto max-h-full mt-1'>
          <div className='w-full px-2 gap-2 flex flex-col'>
            <div className='w-full flex justify-between px-4 text-neutral-400'>
              <CiSearch className='text-xl'/>
              <div className='flex gap-1'>
                <p className='text-sm'>Recents</p>
                <IoIosList className='text-xl'/>
              </div>
            </div>
            <div className="max-h-full min-h-full overflow-y-auto">
              {playlists.map((playlist: Playlist) => (
                <div 
                key={playlist.id} 
                className='hover:bg-neutral-800'
                onClick={() => {
                  props.setGlobalPlaylistId(playlist.id);
                  props.setView('playlist');
                }}
                >
                  <ListItemType1  
                    image={playlist.images[0].url} 
                    title={playlist.name} 
                    creator={playlist.owner.display_name} 
                    isPlaylist={true}
                  />
                </div>
              ))
              }
            </div>
          </div>
        </ScrollArea>
       </div>
    </div>
  );
}
