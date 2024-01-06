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

export interface Album {
  _id: string;
  title: string;
  imagelink: string;
  imagename: string;
  originalimagename: string;
  imageextension: string;
  artistOwner: string;
  songs?: Song[];
  color: string;
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

