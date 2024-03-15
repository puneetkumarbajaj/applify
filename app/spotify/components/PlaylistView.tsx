import { fetchPlaylistData } from '@/app/api/Spotifymethods';
import { useSession } from 'next-auth/react';
import * as React from 'react';
import { Header } from './header';

export interface IPlaylistViewProps {
    globalPlaylistId: string | null;
}

export function PlaylistView (props: IPlaylistViewProps) {

    const {data:session} = useSession();
    const [playlistData, setPlaylistData] = React.useState<Playlist | null>(null);

    React.useEffect(() => {
        async function fetchPlaylist() {
            if(session && session.accessToken){
                try{
                    const items = await fetchPlaylistData(session.accessToken, props.globalPlaylistId as string);
                    setPlaylistData(items);
                    console.log(items);
                  } catch (error) {
                    console.error('Error fetching playlists:', error);
                }
            }
        }
        fetchPlaylist();
    }, [session, props.globalPlaylistId])

  return (
    <div className='h-full w-full'>
        <Header />
    </div>
  );
}
