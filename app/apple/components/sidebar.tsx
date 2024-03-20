"use client";
import * as React from "react";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";

import { FaApple } from "react-icons/fa";
import { IoPlayCircleOutline } from "react-icons/io5";
import { MdOutlineGridView, MdMusicVideo  } from "react-icons/md";
import { TbClockHour9, TbPlaylist } from "react-icons/tb";
import { LiaMicrophoneAltSolid } from "react-icons/lia";
import { IoIosAlbums, IoIosMusicalNote, IoIosRadio  } from "react-icons/io";
import { BsFilePerson, BsGrid3X3Gap } from "react-icons/bs";
import { getMusicKitInstance } from "@/app/api/musickit";


export interface ISidebarProps {
  view: string;
  setView: (view: string) => void;
  setGlobalPlaylistId: (id: string) => void;
}

export function Sidebar(props: ISidebarProps) {
const [playlists, setPlaylists] = React.useState<MusicKit.Playlists[]>([]); // Update the type of setPlaylists
let music : MusicKit.MusicKitInstance | null// Update the type of music

React.useEffect(() => {
  const fetchData = async () => {
    music = getMusicKitInstance();
    const data = await music?.api.library.playlists(null, { offset: 100});
    if (data) {
      setPlaylists(data);
      console.log(data);
    }
  };

  fetchData();
}, []); // Add an empty dependency array to useEffect
  return (
    <div className="w-full h-screen flex flex-col border-r-[0.5px] border-neutral-800">
      <div className="flex flex-col gap-7 py-2 px-7 justify-center">
        <div className="flex items-start justify-start ">
          <FaApple className="text-2xl" />
          <div className="text-2xl">Music</div>
        </div>
        <div>
          <Input placeholder="Search" />
        </div>
      </div>
      <ScrollArea className="flex-grow">
        <div>
          <div className="flex items-center gap-4 p-4">
            <IoPlayCircleOutline className="text-2xl" />
            <div>Listen Now</div>
          </div>
          <div className="flex items-center gap-4 p-4">
            <MdOutlineGridView className="text-2xl" />
            <div>Browse</div>
          </div>
          <div className="flex items-center gap-4 p-4">
            <IoIosRadio className="text-2xl" />
            <div>Radio</div>
          </div>
        </div>
        <Separator />
        <div>
          <div className="flex items-center gap-4 p-4">
            <TbClockHour9 className="text-2xl" />
            <div>Recently Played</div>
          </div>
          <div className="flex items-center gap-4 p-4">
            <LiaMicrophoneAltSolid className="text-2xl" />
            <div>Artists</div>
          </div>
          <div className="flex items-center gap-4 p-4">
            <IoIosAlbums className="text-2xl" />
            <div>Albums</div>
          </div>
          <div className="flex items-center gap-4 p-4">
            <IoIosMusicalNote className="text-2xl" />
            <div>Songs</div>
          </div>
          <div className="flex items-center gap-4 p-4">
            <MdMusicVideo className="text-2xl" />
            <div>Music Videos</div>
          </div>
          <div className="flex items-center gap-4 p-4">
            <BsFilePerson className="text-2xl" />
            <div>Made for You</div>
          </div>
        </div>
        <Separator />
        <div>
          <div className="flex items-center gap-4 p-4">
            <BsGrid3X3Gap className="text-2xl" />
            <div>All Playlists</div>
          </div>
          {playlists.map((playlist) => (
            <div className="flex items-center gap-4 p-4"
              onClick={()=>{props.setGlobalPlaylistId(playlist.id); props.setView('playlist');}}
            >
              <TbPlaylist className="text-2xl" />
              <div>{playlist.attributes?.name.toString()}</div>
            </div>
          ))}
        </div>
      </ScrollArea>
    </div>
  );
}
