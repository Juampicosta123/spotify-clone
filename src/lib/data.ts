import { colors } from './colors';

export interface Playlist {
  _id: string;
  title: string;
  color: (typeof colors)[keyof typeof colors];
  imagelink: string;
  owner: string;
  artists: string[];
  songs?: Song[];
}

export interface Song {
  _id: number;
  albumId: number;
  title: string;
  image: string;
  artists: string[];
  album: string;
  duration: string;
}

export const playlists: Playlist[] = [
  {
    id: '1',
    albumId: 1,
    title: 'Chill Lo-Fi Music',
    color: colors.yellow,
    cover:
      'https://vinyl.lofirecords.com/cdn/shop/products/VINYL_MORNING_COFFEE_4-min.png?v=1680526353',
    owner: 'juampicosta81',
    artists: ['NoSpirit', 'Casiio']
  },
  {
    id: '2',
    albumId: 2,
    title: 'Lo-Fi Chill Session',
    color: colors.green,
    cover:
      'https://vinyl.lofirecords.com/cdn/shop/files/2amsynth-vinyl.png?v=1693312187',
    owner: 'juampicosta81',
    artists: ['Kupla', 'Blue Fox']
  },
  {
    id: '3',
    albumId: 3,
    title: 'Study Session',
    color: colors.rose,
    cover: 'https://f4.bcbits.com/img/a1435058381_65.jpg',
    owner: 'vickimuñoz',
    artists: ['Tenno', 'xander', 'Team Astro']
  },
  {
    id: '4',
    albumId: 4,
    title: 'Blue Note Study Time',
    color: colors.blue,
    cover: 'https://f4.bcbits.com/img/a1962013209_16.jpg',
    owner: 'vickimuñoz',
    artists: ['Raimu', 'Yasumu']
  },
  {
    id: '5',
    albumId: 5,
    title: 'Chau Saura Session',
    color: colors.purple,
    cover: 'https://f4.bcbits.com/img/a2793859494_16.jpg',
    owner: 'juampicosta81',
    artists: ['Chau Saura', 'amies', 'kyu']
  },
  {
    id: '6',
    albumId: 6,
    title: 'Like a Necessity',
    color: colors.orange,
    cover: 'https://f4.bcbits.com/img/a0363730459_16.jpg',
    owner: 'juampicosta81',
    artists: ['WFS', 'Nadav Cohen']
  }
];

export const morePlaylists = playlists.map((item) => ({
  ...item,
  id: item.id + '_more'
}));

export const sidebarPlaylists = playlists.map((item) => ({
  ...item,
  id: item.id + '_side'
}));

export const allPlaylists = [
  ...playlists,
  ...morePlaylists,
  ...sidebarPlaylists
];

export const songs: Song[] = [
  {
    id: 1,
    albumId: 1,
    title: 'Moonlit Walk',
    image: `https://vinyl.lofirecords.com/cdn/shop/products/VINYL_MORNING_COFFEE_4-min.png?v=1680526353`,
    artists: ['LoFi Dreamer'],
    album: 'Chill Lo-Fi Music',
    duration: '2:57'
  },
  {
    id: 2,
    albumId: 1,
    title: 'Coffee Daze',
    image: `https://vinyl.lofirecords.com/cdn/shop/products/VINYL_MORNING_COFFEE_4-min.png?v=1680526353`,
    artists: ['LoFi Dreamer'],
    album: 'Chill Lo-Fi Music',
    duration: '3:40'
  },
  {
    id: 3,
    albumId: 1,
    title: 'Skyline Serenade',
    image: `https://vinyl.lofirecords.com/cdn/shop/products/VINYL_MORNING_COFFEE_4-min.png?v=1680526353`,
    artists: ['LoFi Dreamer'],
    album: 'Chill Lo-Fi Music',
    duration: '3:30'
  },
  {
    id: 4,
    albumId: 1,
    title: 'Urban Echoes',
    image: `https://vinyl.lofirecords.com/cdn/shop/products/VINYL_MORNING_COFFEE_4-min.png?v=1680526353`,
    artists: ['LoFi Dreamer'],
    album: 'Chill Lo-Fi Music',
    duration: '2:12'
  },
  {
    id: 5,
    albumId: 1,
    title: "Night's End",
    image: `https://vinyl.lofirecords.com/cdn/shop/products/VINYL_MORNING_COFFEE_4-min.png?v=1680526353`,
    artists: ['LoFi Dreamer'],
    album: 'Chill Lo-Fi Music',
    duration: '2:26'
  },
  {
    id: 6,
    albumId: 2,
    title: 'Silent Rain',
    image: `https://vinyl.lofirecords.com/cdn/shop/files/2amsynth-vinyl.png?v=1693312187`,
    artists: ['Urban Nocturne'],
    album: 'Midnight Tales',
    duration: '2:38'
  },
  {
    id: 7,
    albumId: 2,
    title: 'Lost Pages',
    image: `https://vinyl.lofirecords.com/cdn/shop/files/2amsynth-vinyl.png?v=1693312187`,
    artists: ['Urban Nocturne'],
    album: 'Midnight Tales',
    duration: '2:40'
  },
  {
    id: 8,
    albumId: 2,
    title: 'Midnight Tales',
    image: `https://vinyl.lofirecords.com/cdn/shop/files/2amsynth-vinyl.png?v=1693312187`,
    artists: ['Urban Nocturne'],
    album: 'Midnight Tales',
    duration: '2:54'
  },
  {
    id: 9,
    albumId: 2,
    title: 'City Lights',
    image: `https://vinyl.lofirecords.com/cdn/shop/files/2amsynth-vinyl.png?v=1693312187`,
    artists: ['Urban Nocturne'],
    album: 'Midnight Tales',
    duration: '3:30'
  },
  {
    id: 10,
    albumId: 2,
    title: 'Night Drive',
    image: `https://vinyl.lofirecords.com/cdn/shop/files/2amsynth-vinyl.png?v=1693312187`,
    artists: ['Urban Nocturne'],
    album: 'Midnight Tales',
    duration: '4:20'
  },
  {
    id: 11,
    albumId: 3,
    title: 'Lunar',
    image: `https://f4.bcbits.com/img/a1435058381_65.jpg`,
    artists: ['Tenno'],
    album: 'Study Session',
    duration: '3:40'
  },
  {
    id: 12,
    albumId: 3,
    title: 'Go go go!',
    image: `https://f4.bcbits.com/img/a1435058381_65.jpg`,
    artists: ['Tenno'],
    album: 'Study Session',
    duration: '3:20'
  },
  {
    id: 13,
    albumId: 3,
    title: 'Keep focus!',
    image: `https://f4.bcbits.com/img/a1435058381_65.jpg`,
    artists: ['Tenno'],
    album: 'Study Session',
    duration: '2:40'
  },
  {
    id: 14,
    albumId: 3,
    title: 'JavaScript is the way',
    image: `https://f4.bcbits.com/img/a1435058381_65.jpg`,
    artists: ['Tenno'],
    album: 'Study Session',
    duration: '3:10'
  },
  {
    id: 15,
    albumId: 3,
    title: 'No more TypeScript for me',
    image: `https://f4.bcbits.com/img/a1435058381_65.jpg`,
    artists: ['Tenno'],
    album: 'Study Session',
    duration: '2:10'
  },
  {
    id: 16,
    albumId: 4,
    title: 'Lunar',
    image: 'https://f4.bcbits.com/img/a1962013209_16.jpg',
    artists: ['Tenno'],
    album: 'Study Session',
    duration: '3:40'
  },
  {
    id: 17,
    albumId: 4,
    title: 'Go go go!',
    image: 'https://f4.bcbits.com/img/a1962013209_16.jpg',
    artists: ['Tenno'],
    album: 'Study Session',
    duration: '3:20'
  },
  {
    id: 18,
    albumId: 4,
    title: 'Keep focus!',
    image: 'https://f4.bcbits.com/img/a1962013209_16.jpg',
    artists: ['Tenno'],
    album: 'Study Session',
    duration: '2:40'
  },
  {
    id: 19,
    albumId: 4,
    title: 'JavaScript is the way',
    image: 'https://f4.bcbits.com/img/a1962013209_16.jpg',
    artists: ['Tenno'],
    album: 'Study Session',
    duration: '3:10'
  },
  {
    id: 20,
    albumId: 4,
    title: 'No more TypeScript for me',
    image: 'https://f4.bcbits.com/img/a1962013209_16.jpg',
    artists: ['Tenno'],
    album: 'Study Session',
    duration: '2:10'
  },
  {
    id: 21,
    albumId: 5,
    title: 'Moonlit Walk',
    image: 'https://f4.bcbits.com/img/a2793859494_16.jpg',
    artists: ['LoFi Dreamer'],
    album: 'Chill Lo-Fi Music',
    duration: '3:12'
  },
  {
    id: 22,
    albumId: 5,
    title: 'Coffee Daze',
    image: 'https://f4.bcbits.com/img/a2793859494_16.jpg',
    artists: ['LoFi Dreamer'],
    album: 'Chill Lo-Fi Music',
    duration: '4:07'
  },
  {
    id: 23,
    albumId: 5,
    title: 'Skyline Serenade',
    image: 'https://f4.bcbits.com/img/a2793859494_16.jpg',
    artists: ['LoFi Dreamer'],
    album: 'Chill Lo-Fi Music',
    duration: '3:50'
  },
  {
    id: 24,
    albumId: 5,
    title: 'Urban Echoes',
    image: 'https://f4.bcbits.com/img/a2793859494_16.jpg',
    artists: ['LoFi Dreamer'],
    album: 'Chill Lo-Fi Music',
    duration: '3:30'
  },
  {
    id: 25,
    albumId: 5,
    title: "Night's End",
    image: 'https://f4.bcbits.com/img/a2793859494_16.jpg',
    artists: ['LoFi Dreamer'],
    album: 'Chill Lo-Fi Music',
    duration: '4:20'
  },
  {
    id: 26,
    albumId: 6,
    title: "Night's End",
    image: 'https://f4.bcbits.com/img/a2793859494_16.jpg',
    artists: ['LoFi Dreamer'],
    album: 'Chill Lo-Fi Music',
    duration: '4:20'
  }
];
