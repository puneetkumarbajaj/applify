// import * as React from 'react';
// import { Header } from './header';
// import { IoIosPlay } from "react-icons/io";
// import { getMusicKitInstance } from '@/app/api/musickit';

// export interface IPlaylistViewProps {
//     globalPlaylistId: string | null;
//     globalsetCurrentSongId: (id:string) => void;
//     globalsetIsPlaying: (isPlaying: boolean) => void;
// }

// export function PlaylistView (props: IPlaylistViewProps) {
//     const [playlistData, setPlaylistData] = React.useState<MusicKit.Playlists>();
//     const [songData, setSongData] = React.useState<MusicKit.Songs>();

//     let music : MusicKit.MusicKitInstance | null
//     let tracks : (MusicKit.Songs | MusicKit.MusicVideos)[] | null
//     React.useEffect(() => {
//         const fetchData = async () => {
//           music = getMusicKitInstance();
//           const playlistId = props.globalPlaylistId as string;
//           const data = await music?.api.library.playlist(playlistId);
//           if (data) {
//             setPlaylistData(data);
//           }
//           const songData = (await music?.api.library.playlist(playlistId))?.relationships.tracks.data;
//             if (songData) {
//                 tracks = songData;
//             }
//         };
      
//         fetchData();
//       }, []); 

//   return (
//     <div className= 'h-full w-full flex flex-col m-3 rounded-xl bg-neutral-900 text-white overflow-y-scroll'>
//         <div>
//             <Header />
//             <div className='flex p-5 gap-7'>
//                 <div className='h-[232px] w-[232px] shadow-2xl shadow-black'>
//                     <img src={playlistData?} alt="playlist" />
//                 </div>
//                 <div className='mt-20'>
//                     <div className='text-xs'>Playlist</div>
//                     <div className='font-bold text-6xl font-sans'>{playlistData?.attributes?.name}</div>
//                     <div className='text-xs mt-5 text-neutral-300'>{playlistData?.attributes?.curatorName}</div>
//                     <div className='text-xs font-semibold mt-5'>{playlistData?.attributes?.description?.toString()}</div>
//                     <div className='text-xs font-semibold mt-5'>{playlistData?.attributes?.lastModifiedDate}</div>
//                 </div>
//             </div>
//         </div>
//         <div className='py-4 px-10'>
//             <table className='table-auto w-full'>
//                 <thead>
//                     <tr className='border-b-2 border-neutral-700'>
//                         <th className='text-left text-neutral-400 text-xs pb-3'>Song</th>
//                         <th className='text-left text-neutral-400 text-xs pb-3'>Artist</th>
//                         <th className='text-left text-neutral-400 text-xs pb-3'>Album</th>
//                         <th className='text-left text-neutral-400 text-xs pb-3 pr-5'>Time</th>
//                     </tr>
//                 </thead>
//                 <tbody>
//                     {playlistData?.tracks.items.map((track, index) => (
//                         <tr 
//                             key={index} 
//                             className='hover:bg-neutral-800' 
//                             onClick={() => {
//                                 props.globalsetCurrentSongId(track.track.id)
//                                 props.globalsetIsPlaying(true)
//                             }}
//                         >
//                             <td className='flex p-2 pt-3'>
//                                 <div className='mr-2'> 
//                                     <img src={track.track.album.images[0]?.url} alt="Track" className="w-10 h-10" /> 
//                                 </div>
//                                 <div className='flex flex-col justify-center'>
//                                     {track.track.name}
//                                     <div className='flex flex-wrap'>
//                                         {track.track.artists.map((artist, index) => (
//                                             <span key={index} className='text-xs text-neutral-300'>
//                                                 {artist.name}{index < track.track.artists.length - 1 ? ', ' : ''}
//                                             </span>
//                                         ))}
//                                     </div>
//                                 </div>
//                             </td>
//                             <td className='pt-2 text-xs'>{track.track.album.name}</td>
//                             <td className='pt-2 text-xs'>
//                                 {new Intl.DateTimeFormat('en-US', { month: 'short', day: '2-digit', year: 'numeric' }).format(new Date('2024-03-15T20:21:34Z'))}
//                             </td>

//                             <td className='pt-2 text-xs pr-5'>
//                                 {Math.floor(track.track.duration_ms / 60000)}:
//                                 {((track.track.duration_ms % 60000) / 1000).toFixed(0).padStart(2, '0')}
//                             </td>
//                         </tr>
//                     ))}
//                 </tbody>
//             </table>
//         </div>
//     </div>
//   );
// }
