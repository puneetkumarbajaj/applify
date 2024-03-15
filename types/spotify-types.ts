interface Playlist {
    name: string;
    owner: {
      display_name: string;
    };
    images: [{
      url: string;
    }];
    id : string;
}