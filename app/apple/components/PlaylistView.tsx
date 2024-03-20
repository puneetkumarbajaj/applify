import * as React from 'react';
import { Header } from './header';
import { IoIosPlay } from "react-icons/io";
import { getMusicKitInstance } from '@/app/api/musickit';
import { formatDistanceToNow } from 'date-fns';

export interface IPlaylistViewProps {
    globalPlaylistId: string | null;
    globalsetCurrentSongId: (id:string) => void;
    globalsetIsPlaying: (isPlaying: boolean) => void;
}

export function PlaylistView (props: IPlaylistViewProps) {
    const [playlistData, setPlaylistData] = React.useState<MusicKit.Playlists>();
    const [songData, setSongData] = React.useState<(MusicKit.Songs | MusicKit.MusicVideos)[]>([]);

    let music : MusicKit.MusicKitInstance | null
    React.useEffect(() => {
        const fetchData = async () => {
          music = getMusicKitInstance();
          const playlistId = props.globalPlaylistId as string;
          const data = await music?.api.library.playlist(playlistId);
          if (data) {
            setPlaylistData(data);
          }
          const trackData = (await music?.api.library.playlist(playlistId))?.relationships.tracks.data;
            if (trackData) {
                setSongData(trackData);
            }
        };
      
        fetchData();
      }, []); 

  return (
    <div className= 'h-full w-full flex flex-col m-3 rounded-xl overflow-y-scroll'>
        <div>
            <div className='flex p-5 gap-7'>
                <div className='h-[232px] w-[232px]'>
                    <img src={playlistData?.attributes?.artwork?.url} alt="playlist" />
                </div>
                <div className='mt-20'>
                    <div className='text-xs'>Playlist</div>
                    <div className='font-bold text-6xl font-sans'>{playlistData?.attributes?.name}</div>
                    <div className='text-xs mt-5 text-neutral-300'>{playlistData?.attributes?.curatorName}</div>
                    <div className='text-xs font-semibold mt-5'>{playlistData?.attributes?.description?.short}</div>
                    <div className='text-xs font-semibold mt-5'>
                        {playlistData?.attributes?.lastModifiedDate ?
                            `${formatDistanceToNow(new Date(playlistData.attributes.lastModifiedDate))} ago` :
                            'Date not available'}
                    </div>
                </div>
            </div>
        </div>
        <div className='py-4 px-10'>
            <table className='table-auto w-full'>
                <thead>
                    <tr className='border-b-2 border-neutral-700'>
                        <th className='text-left text-neutral-400 text-xs pb-3'>Song</th>
                        <th className='text-left text-neutral-400 text-xs pb-3'>Artist</th>
                        <th className='text-left text-neutral-400 text-xs pb-3'>Album</th>
                        <th className='text-left text-neutral-400 text-xs pb-3 pr-5'>Time</th>
                    </tr>
                </thead>
                <tbody>
                    {songData.map((track, index) => (
                        <tr 
                            key={index} 
                            className='hover:bg-accent-foreground' 
                            onClick={() => {
                                props.globalsetCurrentSongId(track.id)
                                props.globalsetIsPlaying(true)
                            }}
                        >
                            <td className='flex p-2 pt-3'>
                                <div className='mr-2'> 
                                    <img src={track.attributes?.artwork?.url} alt="Track" className="w-10 h-10" /> 
                                </div>
                                <div className='flex flex-col justify-center'>
                                    {track.attributes?.name}
                                </div>
                            </td>
                            <td className='pt-2 text-xs'>{track.attributes?.artistName}</td>
                            <td className='pt-2 text-xs'>
                                {track.attributes?.albumName}
                            </td>

                            <td className='pt-2 text-xs pr-5'>
                                {Math.floor((track.attributes?.durationInMillis ?? 0) / 60000)}:
                                {(((track.attributes?.durationInMillis ?? 0) % 60000) / 1000).toFixed(0).padStart(2, '0')}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    </div>
  );
}
