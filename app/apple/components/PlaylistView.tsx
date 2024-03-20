import * as React from 'react';
import { Header } from './header';
import { IoIosPlay } from "react-icons/io";
import { getMusicKitInstance } from '@/app/api/musickit';

export interface IPlaylistViewProps {
    globalPlaylistId: string | null;
    globalsetCurrentSongId: (id:string) => void;
    globalsetIsPlaying: (isPlaying: boolean) => void;
}

export function PlaylistView (props: IPlaylistViewProps) {
    const [playlistData, setPlaylistData] = React.useState<MusicKit.Playlists>();
    const [songData, setSongData] = React.useState<MusicKit.Songs>();

    let music : MusicKit.MusicKitInstance | null
    let tracks : (MusicKit.Songs | MusicKit.MusicVideos)[] | null
    React.useEffect(() => {
        const fetchData = async () => {
          music = getMusicKitInstance();
          const playlistId = props.globalPlaylistId as string;
          const data = await music?.api.library.playlist(playlistId);
          if (data) {
            setPlaylistData(data);
            console.log(data);
          }
          const songData = (await music?.api.library.playlist(playlistId))?.relationships.tracks.data;
            if (songData) {
                tracks = songData;
                console.log(tracks);
            }
        };
      
        fetchData();
      }, []); 

  return (
    <div className= 'h-full w-full flex flex-col m-3 rounded-xl bg-neutral-900 text-white overflow-y-scroll'>
    </div>
  );
}
