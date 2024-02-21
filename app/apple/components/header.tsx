import * as React from 'react';
import { BsShuffle, BsChatSquareQuote } from "react-icons/bs";
import { TbPlayerTrackPrevFilled, TbPlayerTrackNextFilled } from "react-icons/tb";
import { IoIosPlay, IoIosRepeat, IoIosVolumeHigh, IoIosVolumeLow, IoIosVolumeOff, IoIosList } from "react-icons/io";
import { Player } from './player';
import { Slider } from '@/components/ui/slider';
import { Avatar } from '@/components/ui/avatar';

export interface IHeaderProps {
}

export function Header (props: IHeaderProps) {
  return (
    <div className='w-full flex justify-between items-center'>
      <div className='flex justify-between items-center'>
        <BsShuffle className='text-lg mx-2'/>
        <TbPlayerTrackPrevFilled className='text-lg mx-2'/>
        <IoIosPlay className='text-xl mx-2'/>
        <TbPlayerTrackNextFilled className='text-lg mx-2'/>
        <IoIosRepeat className='text-lg mx-2'/>
      </div>
      <Player />
      <div className='flex justify-between items-center'>
        <IoIosVolumeHigh className='text-5xl mx-2'/>
        <Slider />
      </div>
      <div className='flex justify-between items-center'>
        <IoIosList className='text-lg mx-2'/>
        <BsChatSquareQuote className='text-lg mx-2'/>
        <Avatar/>
      </div>
    </div>
  );
}
