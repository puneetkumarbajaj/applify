import * as React from 'react';
import {
    Drawer,
    DrawerClose,
    DrawerContent,
    DrawerDescription,
    DrawerFooter,
    DrawerHeader,
    DrawerTitle,
    DrawerTrigger,
  } from "@/components/ui/drawer"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"  
import { IoIosAdd } from "react-icons/io";
import { getIsrc, getIsrcOfPlaylist } from '../api/Spotifymethods';
import { Session } from 'next-auth';
import { getMusicKitInstance } from '../api/musickit';

export interface ITransferMusicProps {
    session?: Session | null;
}

export function TransferMusic (props: ITransferMusicProps) {
    const [isrcArray, setIsrcArray] = React.useState([]);
    const [playlistLink, setPlaylistLink] = React.useState('');
    const [songs, setSongs] = React.useState<(MusicKit.Songs | undefined)[]>([]);

    const musicKit = getMusicKitInstance();
    
    async function getIsrcArray(playlistLink: string) {
        const playlistId = playlistLink?.split('playlist/')[1].split('?')[0];
        const codeArray = await getIsrcOfPlaylist(props.session?.accessToken ?? '', playlistId);
        setIsrcArray(codeArray);
        console.log('codeArray:', codeArray);
    }

    React.useEffect(() => {
        if (isrcArray.length > 0) {
            console.log('ISRC array:', isrcArray);
            fetchSongsByISRC().then(() => {
                // After fetching songs, create the playlist on Apple Music
                createPlaylistOnAppleMusic('Transferred Playlist', songs);
            });
        }
    }, [isrcArray]); // Trigger actions when isrcArray is updated

    const fetchSongsByISRC = async (storefront = 'us') => {
        try {
            const isrcs = isrcArray.join(',');
            console.log('ISRCs stringified:', isrcs);
            const response = await fetch(`/api/fetchByISRC?isrcs=${isrcs}&storefront=${storefront}`);
            console.log('Response:', response);
            if (!response.ok) throw new Error('Network response was not ok');
    
            const data = await response.json();
            console.log('Songs fetched:', data);
            setSongs(data);
            console.log('song', songs) // Assuming the data format is correct for your needs
        } catch (error) {
            console.error("Error fetching songs by ISRC:", error);
        }
    };

        const createPlaylistOnAppleMusic = async (playlistName: any, tracks: any) => {
            fetch('/api/createApplePlaylist', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Music-User-Token': musicKit?.musicUserToken ?? '',
                },
                body: JSON.stringify({
                    playlistName,
                    description: "Playlist transferred from Spotify.",
                    tracks,
                }),
            })
            .then(response => response.json())
            .then(data => console.log('Playlist created:', data))
            .catch(error => console.error('Error creating playlist:', error));
        };

  return (
    <div>
      <Drawer>
        <DrawerTrigger>
            <IoIosAdd />
        </DrawerTrigger>
        <DrawerContent>
            <div className='mx-auto w-full max-w-xl'>
                <DrawerHeader>
                    <DrawerTitle>So you friend uses the other streaming service huh?</DrawerTitle>
                    <DrawerDescription>Well good thing you can put in the link to their playlist in the box below and enjoy it on your own service</DrawerDescription>
                </DrawerHeader>
                <div className='p-4'>
                    <Input 
                        type="text" 
                        placeholder="Paste the link to the playlist here" 
                        className='w-full p-4 bg-muted rounded-lg' 
                        value={playlistLink} 
                        onInput={e => setPlaylistLink(e.currentTarget.value)}
                    />
                </div>
                <DrawerFooter>
                <Button onClick={()=> {getIsrcArray(playlistLink)}}>Transfer it baby</Button>
                <DrawerClose asChild>
                    <Button 
                        variant="outline"
                        onClick={() => setPlaylistLink('')}
                    >
                        Nevermind not that good
                    </Button>
                </DrawerClose>
                </DrawerFooter>
            </div>
        </DrawerContent>
    </Drawer>
    </div>
  );
}
