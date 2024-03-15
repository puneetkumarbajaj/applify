export async function fetchPlaylists(accessToken: string, userId: string): Promise<Playlist[]> {
    try {
      const response = await fetch(`https://api.spotify.com/v1/users/${userId}/playlists`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      return data.items;
    } catch (error) {
      console.error('Error fetching playlists:', error);
      throw error; // Re-throw the error if you want calling code to handle it
    }
}

export async function fetchPlaylistData(accessToken: string, playlistId: string): Promise<Playlist> {
    try {
      const response = await fetch(`https://api.spotify.com/v1/playlists/${playlistId}`, {
        headers: {
            Authorization: `Bearer ${accessToken}`,
            },
        });
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const data = await response.json();
        return data;
    }   catch (error) {
        console.error('Error fetching playlist:', error);
        throw error; // Re-throw the error if you want calling code to handle it
    }
}