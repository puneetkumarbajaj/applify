// utils/musickit.ts

let musicInstance: MusicKit.MusicKitInstance | null = null;

// Initialize MusicKit
export const initializeMusicKit = async (developerToken: string): Promise<void> => {
  if (window.MusicKit) {
    musicInstance = window.MusicKit.configure({
      developerToken,
      app: {
        name: 'Applify',
        build: '0.1',
      },
    });
    await musicInstance.authorize();
  }
};

// Get the MusicKit Instance
export const getMusicKitInstance = (): MusicKit.MusicKitInstance | null => {
  if (!musicInstance) {
    console.error('MusicKit is not initialized');
    return null;
  }
  return musicInstance;
};
