import * as React from 'react';
import { MdOutlineArrowBackIos } from "react-icons/md";
import { MdOutlineArrowForwardIos } from "react-icons/md";
import { GoBell } from "react-icons/go";
import { Avatar } from '@/components/ui/avatar';

export interface IHeaderProps {
}

export function Header (props: IHeaderProps) {
  return (
    <div className='h-[64px] w-full flex justify-between p-5'>
      <div className='flex gap-3'>
        <div className=''>
            <MdOutlineArrowBackIos className='text-white' />
        </div>
        <div className="">
            <MdOutlineArrowForwardIos className='text-white' />
        </div>
      </div>
      <div className='flex'>
        <div>
            <GoBell className='text-white' />
        </div>
        <div>
            <Avatar />
        </div>
      </div>
    </div>
  );
}
