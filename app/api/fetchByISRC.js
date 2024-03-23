// pages/api/fetchByISRC.js
import axios from 'axios';

export default async function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).end('Method Not Allowed');
  }

  const { isrcs, storefront } = req.query;
  if (!isrcs || !storefront) {
    return res.status(400).json({ error: 'Missing required query parameters: isrcs, storefront' });
  }

  const appleMusicApiUrl = `https://api.music.apple.com/v1/catalog/${storefront}/songs`;
  try {
    const response = await axios.get(appleMusicApiUrl, {
      headers: {
        'Authorization': `Bearer ${process.env.NEXT_PUBLIC_APPLE_SECRET}`,
      },
      params: {
        'filter[isrc]': isrcs,
      },
    });
    console.log('response fetchISRC.js', response);
    return res.status(200).json(response.data);
  } catch (error) {
    console.error('Failed to fetch songs from Apple Music:', error);
    return res.status(error.response?.status || 500).json({ error: error.message });
  }
}
