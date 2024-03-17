import * as React from 'react';
import { LuShuffle } from "react-icons/lu";
import { GiPreviousButton, GiNextButton } from "react-icons/gi";
import { IoMdPlay } from "react-icons/io";
import { SlLoop } from "react-icons/sl";
import { Progress } from '@/components/ui/progress';
import { TbMicrophone2 } from "react-icons/tb";
import { HiOutlineQueueList } from "react-icons/hi2";
import { FaComputer } from "react-icons/fa6";
import { HiOutlineVolumeUp } from "react-icons/hi";
import { Slider } from '@/components/ui/slider';
import { useSession } from 'next-auth/react';
import { fetchSongData, getCurrentlyPlaying } from '@/app/api/Spotifymethods';


export interface IPlayerProps {
  globalCurrentSongId: string | null;
  globalsetCurrentSongId: (id:string) => void;
  globalsetIsPlaying: (isPlaying: boolean) => void;
  globalIsPlaying: boolean;
}

export function Player (props: IPlayerProps) {

  const {data:session} = useSession();
  const [songInfo, setSongInfo] = React.useState<Track | null>(null);


  React.useEffect(() => {
    async function fetchData() {
      if (session && session.accessToken) {
        if (!props.globalCurrentSongId) {
          const data = await getCurrentlyPlaying(session.accessToken);
          if(data.item){
            props.globalsetCurrentSongId(data.item.id);
          }
          if (data.is_playing) {
            props.globalsetIsPlaying(true);
          }
          setSongInfo(await fetchSongData(session.accessToken, data.item.id));
        }
        else {
          setSongInfo(await fetchSongData(session.accessToken, props.globalCurrentSongId));
        }
      }
    }
    console.log(props.globalCurrentSongId)
    fetchData();
  }, [session, props.globalCurrentSongId]);

  return (
    <div className='h-full w-full flex justify-between px-5'>
      <div className="flex">
        <div className="flex items-center">
          <img src={songInfo?.album.images[0].url} alt='song' className="h-16 w-16 rounded-lg" />
          <div className="ml-4">
            <div className="text-white text-sm">{songInfo?.name}</div>
            <div className="text-gray-400 text-xs">{songInfo?.artists[0].name}</div>
          </div>
        </div>
      </div>
      <div className="flex flex-col gap-3 justify-center items-center text-lg">
        <div className='flex items-center justify-center gap-3'>
          <LuShuffle 
            className='text-white'  
          />
          <GiPreviousButton className='text-white' />
          <div className="rounded-full bg-white w-8 h-8 flex items-center justify-center">
            <IoMdPlay className='text-black' />
          </div>
          <GiNextButton className='text-white' />
          <SlLoop className='text-white' />
        </div>
        <div className='flex flex-row justify-between'>
          <div className='text-white text-xs'>time spent</div>
          <Progress className='text-white bg-white w-64'/>
          <div className='text-white text-xs'>
            {songInfo && `${Math.floor(songInfo.duration_ms / 60000)}:${((songInfo.duration_ms % 60000) / 1000).toFixed(0).padStart(2, '0')}`}
          </div>
        </div>
      </div>
      <div className='flex gap-3 justify-center items-center'>
        <HiOutlineQueueList className='text-white text-5xl' />
        <FaComputer className='text-white text-5xl' />
        <HiOutlineVolumeUp className='text-white text-5xl' />
        <Slider />
      </div>
    </div>
  );
}
