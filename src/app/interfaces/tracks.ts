export interface ITrack {
  id: string;
  name: string;
  artists: string;
  duration: string;
  image: string;
  index?: number;
  isPlaying?: boolean;
}
