import * as React from 'react';

export interface IPickYourUIProps {
}

export function PickYourUI (props: IPickYourUIProps) {
  return (
    <div className='h-full w-full flex items-center justify-center gap-20'>
        <div className='flex flex-col'>
            <div className='bg-neutral-500 h-[250px] w-[250px] rounded-lg aspect-square'>
            </div>
            <p>Continue with Spotify Like UI</p>
        </div>
        <div className='flex flex-col'>
            <div className='bg-neutral-500 h-[250px] w-[250px] rounded-lg aspect-square'>
            </div>
            <p>Continue with Apple Music Like UI</p>
        </div>
    </div>
  );
}
