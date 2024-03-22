import axios from 'axios';

export default async function handler(req, res) {
  if (req.method === 'POST') {
    // Extract playlist name, description, and track IDs from the request body
    const { playlistName, description, tracks } = req.body;

    // Authorization with MusicKit should happen client-side, but we use server-side
    // for Apple Music API requests to keep tokens secure
    const musicUserToken = req.headers['music-user-token']; // Passed from client

    if (!musicUserToken) {
      return res.status(400).json({ error: 'Music User Token is required' });
    }

    const apple = axios.create({
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
      // Error creating playlist
      res.status(error.response.status).json(error.response.data);
    }
  } else {
    // Handle any requests that aren't POST
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
