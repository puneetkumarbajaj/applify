import * as React from 'react';

import { GoHome } from "react-icons/go";
import { CiSearch } from "react-icons/ci";
import { BiLibrary } from "react-icons/bi";
import { IoIosAdd , IoIosList } from "react-icons/io";
import { FiArrowRight } from "react-icons/fi";
import PillContainer from '@/components/ui/pills-container';

export interface ISpotifySiderbarProps {
}

export function SpotifySiderbar (props: ISpotifySiderbarProps) {
  return (
    <div className='h-full w-full flex flex-col gap-5 m-3'>
      <div className='bg-neutral-900 h-[112px] w-full flex flex-col'>
        <div className='h-[56px] w-full flex items-center justify-start p-5 gap-5 text-neutral-300 hover:text-white transition-colors cursor-pointer'>
          <GoHome className='text-2xl'/>
          <p className='font-semibold'>Home</p>
        </div>
        <div className='h-[56px] w-full flex items-center justify-start p-5 gap-5 text-neutral-300 hover:text-white transition-colors cursor-pointer'>
          <CiSearch className='text-white text-2xl'/>
          <p className='font-semibold'>Search</p>
        </div>
      </div>
      <div className='bg-neutral-900 h-full w-full flex flex-col'>
        <div className='w-full flex items-center justify-between p-5 gap-5 text-neutral-300 hover:text-white transition-colors cursor-pointer'>
            <div className='flex gap-5'>
                <BiLibrary className='text-2xl'/>
                <p className='font-semibold'>Your Library</p>
            </div>
            <div className='flex gap-5'>
                <IoIosAdd className='text-2xl'/>
                <FiArrowRight className=' text-2xl'/>
            </div>
        </div>
        <div className='w-full h-10'>
          <PillContainer titles={['Playlists', 'By Spotify', 'By You']} />
        </div>
        <div className='w-full justify-between'>
          <CiSearch className='text-white'/>
        </div>
       </div>
    </div>
  );
}
