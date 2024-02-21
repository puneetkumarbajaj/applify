"use client";
import * as React from 'react';
import { Sidebar } from './sidebar';
import { Body } from './body';

export interface IHomeProps {
}

export function Home (props: IHomeProps) {
  return (
    <div className='w-full h-screen flex'>
        <div className='lg:w-[260px] md:w-[260px] sm:w-0 bg-gray-200'>
            <Sidebar />
        </div>
        <div className='flex-grow bg-gray-100'>
            <Body />
        </div>
    </div>
  );
}
