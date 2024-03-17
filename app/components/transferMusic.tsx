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

export interface ITransferMusicProps {
    session: Session | null;
}

export function TransferMusic (props: ITransferMusicProps) {
    const [isrcArray, setIsrcArray] = React.useState([]);
    const [playlistLink, setPlaylistLink] = React.useState('');
    
    async function getIsrcArray(playlistLink: string) {
        const playlistId = playlistLink?.split('playlist/')[1].split('?')[0];
        const codeArray = await getIsrcOfPlaylist(props.session?.accessToken ?? '', playlistId);
        setIsrcArray(codeArray);
        console.log(isrcArray);
    }

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
