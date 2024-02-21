"use client";
import * as React from 'react';
import { Sidebar } from './sidebar';
import { Body } from './body';
import { Header } from './header';

export interface IHomeProps {
}

export function Home (props: IHomeProps) {
  return (
    <div className='w-full h-screen flex'>
        <div className='lg:w-[260px] md:w-[260px] sm:w-0 bg-gray-200'>
            <Sidebar />
        </div>
        <div className='flex-grow flex flex-col bg-gray-100'>
          <div className='lg:h-[54px] sm:h-0 border-b-[0.5px] border-neutral-800'>
            <Header />
          </div>
          <div className='flex-grow w-full h-full'>
            <Body />
          </div>
        </div>
    </div>
  );
}
