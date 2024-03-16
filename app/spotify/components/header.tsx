import * as React from 'react';
import { MdOutlineArrowBackIos } from "react-icons/md";
import { MdOutlineArrowForwardIos } from "react-icons/md";
import { GoBell } from "react-icons/go";
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { useSession } from 'next-auth/react';
import { AvatarImage } from '@radix-ui/react-avatar';

export interface IHeaderProps {
}

export function Header (props: IHeaderProps) {
    const {data:session} = useSession();
  return (
    <div className='h-[64px] w-full flex justify-between p-5'>
      <div className='flex gap-3'>
        <div className='rounded-full bg-black bg-opacity-50 w-8 h-8 items-center flex justify-center'>
            <MdOutlineArrowBackIos className='text-white' />
        </div>
        <div className="rounded-full bg-black bg-opacity-50 w-8 h-8 flex items-center justify-center">
            <MdOutlineArrowForwardIos className='text-white' />
        </div>
      </div>
      <div className='flex'>
        <div className='rounded-full bg-black bg-opacity-50 w-8 h-8 flex items-center justify-center'>
            <GoBell className='text-white' />
        </div>
        <div className='flex items-center justify-center'>
            <Avatar>
                <AvatarImage src={session?.user?.image as string} alt="avatar" />
                <AvatarFallback/>
            </Avatar>
        </div>
      </div>
    </div>
  );
}
