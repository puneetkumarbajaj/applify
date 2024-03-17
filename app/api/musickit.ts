// utils/musickit.ts

let musicInstance: MusicKit.MusicKitInstance | null = null;

// Initialize MusicKit without automatically authorizing the user
export const initializeMusicKit = async (developerToken: string): Promise<MusicKit.MusicKitInstance | null> => {
  if (window.MusicKit) {
    musicInstance = window.MusicKit.configure({
      developerToken,
      app: {
        name: 'Applify',
        build: '0.1',
      },
    });
    return musicInstance;
  }
  return null;
};

// Function to trigger the authorization process
export const authorizeMusicKit = async (): Promise<void> => {
  if (!musicInstance) {
    console.error('MusicKit is not initialized');
    return;
  }
  try {
    await musicInstance.authorize();
    console.log('User is authorized:', musicInstance.isAuthorized);
  } catch (error) {
    console.error('Error authorizing MusicKit:', error);
  }
};

export const getMusicKitInstance = (): MusicKit.MusicKitInstance | null => musicInstance;
