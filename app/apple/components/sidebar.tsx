"use client";
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import * as React from 'react';
import { FaApple } from "react-icons/fa";
import { IoPlayCircleOutline } from "react-icons/io5";
import { MdOutlineGridView } from "react-icons/md";
import { IoIosRadio } from "react-icons/io";
import { Separator } from '@/components/ui/separator';
import { TbClockHour9 } from "react-icons/tb";

export interface ISidebarProps {
}

export function Sidebar (props: ISidebarProps) {
  return (
    <div className='w-full h-screen flex flex-col'>
        <div className='flex flex-col gap-7 py-2 px-7 justify-center'>
            <div className='flex items-start justify-start '>
                <FaApple className='text-2xl'/>
                <div className='text-2xl'>Music</div>
            </div>
            <div>
                <Input placeholder='Search' />
            </div>
        </div>
        <ScrollArea className='flex-grow'>
            <div>
                <div className='flex items-center gap-4 p-4'>
                    <IoPlayCircleOutline className='text-2xl'/>
                    <div>Listen Now</div>
                </div>
                <div className='flex items-center gap-4 p-4'>
                    <MdOutlineGridView className='text-2xl'/>
                    <div>Browse</div>
                </div>
                <div className='flex items-center gap-4 p-4'>
                    <IoIosRadio className='text-2xl'/>
                    <div>Radio</div>
                </div>
            </div>
            <Separator />
            <div>
                <div className='flex items-center gap-4 p-4'>
                    <TbClockHour9 className='text-2xl'/>
                    <div>Recently Played</div>
                </div>
            </div>
        </ScrollArea>
    </div>
  );
}
