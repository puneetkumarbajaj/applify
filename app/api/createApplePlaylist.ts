import { NextApiRequest, NextApiResponse } from 'next';
import axios, { AxiosInstance } from 'axios';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    // Only POST method is allowed
    res.setHeader('Allow', ['POST']);
    return res.status(405).end('Method Not Allowed');
  }

  // Extract playlist name, description, and track IDs from the request body
  const { playlistName, description, tracks }: { playlistName: string; description: string; tracks: any[] } = req.body;

  // Authorization with MusicKit should happen client-side, but we use server-side
  // for Apple Music API requests to keep tokens secure
  const musicUserToken = req.headers['music-user-token'];

  if (!musicUserToken || typeof musicUserToken !== 'string') {
    return res.status(400).json({ error: 'Music User Token is required' });
  }

  // Axios instance for Apple Music API
  const apple: AxiosInstance = axios.create({
    baseURL: 'https://api.music.apple.com/v1',
    headers: {
      'Authorization': `Bearer ${process.env.NEXT_PUBLIC_APPLE_SECRET}`,
      'Music-User-Token': musicUserToken
    }
  });

  try {
    const response = await apple.post('/me/library/playlists', {
      attributes: {
        name: playlistName,
        description: description
      },
      relationships: {
        tracks: {
          data: tracks
        }
      }
    });

    // Successfully created playlist
    res.status(201).json(response.data);
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      // Error creating playlist
      res.status(error.response.status).json(error.response.data);
    } else {
      // General error
      res.status(500).json({ error: 'An unexpected error occurred' });
    }
  }
}
