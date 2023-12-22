import { IArtist } from '../interfaces/artists';
import { IPlaylist } from '../interfaces/playlist';
import { ITrack } from '../interfaces/tracks';
import { IUser } from '../interfaces/user';

export const formatLoginParams = (config: {
  authEndpoint: string;
  clientId: string;
  redirectUrl: string;
  scopes: string[];
}) => ({
  authEndpoint: `${config.authEndpoint}?`,
  clientId: `client_id=${config.clientId}&`,
  redirectUrl: `redirect_uri=${config.redirectUrl}&`,
  scopes: `scope=${config.scopes.join('%20')}&`,
  responseType: `response_type=token&show_dialog=true`,
});

export const buildSpotifyUser = (
  user: SpotifyApi.CurrentUsersProfileResponse
): IUser => ({
  id: user.id,
  name: user.display_name,
  image: user.images.pop().url,
});

export const buildSpotifyPlaylist = (
  playlist: SpotifyApi.PlaylistObjectSimplified
): IPlaylist => ({
  id: playlist.id,
  name: playlist.name,
  description: playlist.description,
  owner: playlist.owner.display_name,
  image: playlist.images.pop().url,
});

export const buildSpotifyArtist = (
  artist: SpotifyApi.ArtistObjectFull
): IArtist => ({
  id: artist.id,
  name: artist.name,
  image: artist.images.length ? artist.images.pop().url : '',
  genre: artist.genres.join(', '),
});

export const buildSpotifyFavoriteTrack = (
  { track }: SpotifyApi.SavedTrackObject,
  index: number
): ITrack => {
  const _duration = new Date(track.duration_ms);

  const minutes = _duration.getMinutes();
  const seconds = _duration.getSeconds();

  return {
    id: track.id,
    index: index + 1,
    name: track.name,
    artists: track.artists.map((artist) => artist.name).join(', '),
    duration: `${minutes}:${seconds < 10 ? `${0}${seconds}` : seconds}`,
    image: track.album.images.pop().url,
  };
};

export const buildSpotifyCurrentTrack = (
  track: SpotifyApi.CurrentlyPlayingResponse
) => {
  const _duration = new Date(track.item.duration_ms);

  const minutes = _duration.getMinutes();
  const seconds = _duration.getSeconds();

  return {
    id: track.item.id,
    name: track.item.name,
    artists: track.item.artists.map((artist) => artist.name).join(', '),
    duration: `${minutes}:${seconds < 10 ? `${0}${seconds}` : seconds}`,
    image: track.item.album.images.pop().url,
    isPlaying: track.is_playing,
  };
};
