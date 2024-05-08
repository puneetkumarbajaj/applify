import { NextApiRequest, NextApiResponse } from 'next';
import axios from 'axios';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'GET') {
    return res.status(405).end('Method Not Allowed');
  }

  const { isrcs, storefront } = req.query;

  if (typeof isrcs !== 'string' || typeof storefront !== 'string') {
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

    console.log('API URL:', appleMusicApiUrl);
    console.log('Request Parameters:', response.config.params);
    console.log('Response Data:', response.data);
    
    return res.status(200).json(response.data);
  } catch (error: any) {
    console.error('Failed to fetch songs from Apple Music:', error);
    console.log('Failed URL:', appleMusicApiUrl);
    console.log('HTTP Status:', error.response?.status);
    console.log('Error Message:', error.message);
    
    return res.status(error.response?.status || 500).json({ error: error.message });
  }
}
