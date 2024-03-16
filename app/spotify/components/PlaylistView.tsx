import { fetchPlaylistData } from '@/app/api/Spotifymethods';
import { useSession } from 'next-auth/react';
import * as React from 'react';
import { Header } from './header';
import { IoIosPlay } from "react-icons/io";
import { RxDotsHorizontal } from "react-icons/rx";
import { FiClock } from "react-icons/fi";

export interface IPlaylistViewProps {
    globalPlaylistId: string | null;
}

export function PlaylistView (props: IPlaylistViewProps) {

    const {data:session} = useSession();
    const [playlistData, setPlaylistData] = React.useState<Playlist | null>(null);
    const [bgColor, setBgColor] = React.useState<string>('rgb(0,0,0)');

    React.useEffect(() => {
        async function fetchPlaylist() {
            if (session && props.globalPlaylistId) {
                try {
                    const items = await fetchPlaylistData(session.accessToken as string, props.globalPlaylistId as string);
                    setPlaylistData(items);
                    // Ensure getDominantColor is awaited before proceeding
                    await getDominantColor(items);
                    console.log(items);
                } catch (error) {
                    console.error('Error fetching playlists:', error);
                }
            }
        }
        
        function getDominantColor(playlist: Playlist): Promise<void> {
            return new Promise((resolve, reject) => {
                const img = new Image();
                img.src = playlist?.images[0]?.url || '';
                img.setAttribute('crossOrigin', 'anonymous');
                img.onload = () => {
                    const canvas = document.createElement('canvas');
                    canvas.width = img.width;
                    canvas.height = img.height;
                    const ctx = canvas.getContext('2d');
                    if (ctx) {
                        ctx.drawImage(img, 0, 0, img.width, img.height);
                        const data = ctx.getImageData(0, 0, img.width, img.height).data;
                        const color = rgbToHex(data[0], data[1], data[2]);
                        console.log(color);
                        setBgColor(color);
                        resolve();
                    } else {
                        reject(new Error("Failed to get drawing context"));
                    }
                };
                img.onerror = reject;
            });
        }
        

        function rgbToHex(r: number, g: number, b: number) {
            return "#" + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1);
        }

        fetchPlaylist();
    }, [session, props.globalPlaylistId])


  return (
    <div className= 'h-full w-full flex flex-col m-3 rounded-lg bg-neutral-900 text-white'>
        <div
            style={{
                background: `linear-gradient(to bottom, ${bgColor}, #171717)`
            }}
        >
            <Header />
            <div className='flex p-5 gap-7'>
                <div className='h-[232px] w-[232px] shadow-2xl shadow-black'>
                    <img src={playlistData?.images[0]?.url} alt="playlist" />
                </div>
                <div className='mt-20'>
                    <div className='text-xs'>Playlist</div>
                    <div className='font-bold text-6xl font-sans'>{playlistData?.name}</div>
                    <div className='text-xs mt-5 text-neutral-300'>{playlistData?.description}</div>
                    <div className='text-xs font-semibold mt-5'>
                        Created by {playlistData?.owner.display_name}
                        {" • " + playlistData?.followers.total} likes
                        {" • " + playlistData?.tracks.total} songs
                    </div>
                </div>
            </div>
        </div>
        <div className='p-5 flex gap-5 items-center'>
            <div className='h-14 w-14 rounded-full flex items-center justify-center bg-spotify'>
                <IoIosPlay className='text-3xl text-black' />
            </div>
            <RxDotsHorizontal className='text-3xl text-neutral-400' />
        </div>
        <div className='py-4 px-10 overflow-y-scroll'>
            <table className='table-auto w-full'>
                <thead>
                    <tr className='border-b-2 border-neutral-700'>
                        <th className='text-left text-neutral-400 text-xs pb-3 pl-5'>#</th>
                        <th className='text-left text-neutral-400 text-xs pb-3'>Title</th>
                        <th className='text-left text-neutral-400 text-xs pb-3'>Album</th>
                        <th className='text-left text-neutral-400 text-xs pb-3'>Date Added</th>
                        <th className='text-left text-neutral-400 text-xs pb-3 pr-5'>
                            <FiClock className='text-xs inline-block' />
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {playlistData?.tracks.items.map((track, index) => (
                        <tr key={index} className='hover:bg-neutral-800'>
                            <td className='pt-2 text-xs pl-5'>{index + 1}</td>
                            <td className='flex p-2 pt-3'>
                                <div className='mr-2'> 
                                    <img src={track.track.album.images[0]?.url} alt="Track" className="w-10 h-10" /> 
                                </div>
                                <div className='flex flex-col justify-center'>
                                    {track.track.name}
                                    <div className='flex flex-wrap'>
                                        {track.track.artists.map((artist, index) => (
                                            <span key={index} className='text-xs text-neutral-300'>
                                                {artist.name}{index < track.track.artists.length - 1 ? ', ' : ''}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            </td>
                            <td className='pt-2 text-xs'>{track.track.album.name}</td>
                            <td className='pt-2 text-xs'>
                                {new Intl.DateTimeFormat('en-US', { month: 'short', day: '2-digit', year: 'numeric' }).format(new Date('2024-03-15T20:21:34Z'))}
                            </td>

                            <td className='pt-2 text-xs pr-5'>
                                {Math.floor(track.track.duration_ms / 60000)}:
                                {((track.track.duration_ms % 60000) / 1000).toFixed(0).padStart(2, '0')}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    </div>
  );
}
