"use client";
import { loginUrl } from "@/utils/spotify";
import Image from "next/image";
import React from "react";
import { LoginWith } from "./components/login-with";
import { PickYourUI } from "./components/pick-your-ui";

export default function Home() {
  const [isrc, setIsrc] = React.useState("");

  // Assuming you have a function to handle the search triggered by a user action

async function handleSearch(isrc: string) {
  const response = await fetch(`/api/search?query=${encodeURIComponent(isrc)}`);
  if (!response.ok) {
    console.error('Failed to search');
    return;
  }
  const data = await response.json();
  console.log(data);
}


  {/* return (
    <div>
      <a href={loginUrl}>Login with Spotify</a>

      <div>
        <input
          type="text"
          value={isrc}
          onChange={(e) => setIsrc(e.target.value)}
          className="border-2 border-gray-300 p-2 rounded-lg text-black" 
        />
        <button onClick={() => handleSearch(isrc)}>Search</button>
      </div>
    </div>
  ); */}

  return (
    <div className="h-screen w-full">
      <PickYourUI />
    </div>
  )
}
