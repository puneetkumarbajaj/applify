// pages/api/search.ts (if using TypeScript, ensure the file extension is .ts)

// import { getTokenFromUrl } from '@/utils/spotify';
// import type { NextApiRequest, NextApiResponse } from 'next';

// export default async function handler(
//   req: NextApiRequest,
//   res: NextApiResponse
// ) {
//   const { query } = req.query;
//   const accessToken = getTokenFromUrl; // This should be obtained securely

//   if (!query) {
//     return res.status(400).json({ error: 'Query parameter is missing' });
//   }

//   const spotifyResponse = await fetch(`https://api.spotify.com/v1/search?q=isrc:${encodeURIComponent(query as string)}&type=track&include_external=audio`, {
//     method: 'GET',
//     headers: {
//       Authorization: `Bearer ${accessToken}`,
//       'Content-Type': 'application/json',
//     },
//   });

//   if (!spotifyResponse.ok) {
//     return res.status(spotifyResponse.status).json({ error: 'Failed to fetch from Spotify API' });
//   }

//   const data = await spotifyResponse.json();
//   res.status(200).json(data);
// }
