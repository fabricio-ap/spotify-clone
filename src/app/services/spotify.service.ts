import { Injectable } from '@angular/core';
import Spotify from 'spotify-web-api-js';
import { SpotifyConfig } from '../../environments/environment';
import {
  buildSpotifyArtist,
  buildSpotifyCurrentTrack,
  buildSpotifyFavoriteTrack,
  buildSpotifyPlaylist,
  buildSpotifyUser,
  formatLoginParams,
} from '../common/spotifyHelpers';
import { IArtist } from '../interfaces/artists';
import { IPlaylist } from '../interfaces/playlist';
import { ITrack } from '../interfaces/tracks';
import { IUser } from '../interfaces/user';

// O Angular usa o Singleton como recurso para suas classes, ou seja, ele usa sempre a mesma instância todas as vezes que chama uma classe

@Injectable({
  providedIn: 'root',
})
export class SpotifyService {
  spotifyApi: Spotify.SpotifyWebApiJs = null;
  user: IUser;

  constructor() {
    this.spotifyApi = new Spotify();
  }

  getLoginUrl() {
    const { authEndpoint, clientId, redirectUrl, scopes, responseType } =
      formatLoginParams(SpotifyConfig);

    return authEndpoint + clientId + redirectUrl + scopes + responseType;
  }

  getTokenUrlCallback() {
    if (!window.location.hash) return '';
    const params = window.location.hash.substring(1).split('&');
    return params[0].split('=')[1];
  }

  setAccessToken(token: string) {
    this.spotifyApi.setAccessToken(token);
    localStorage.setItem('access_token', token);
  }

  async initUser() {
    if (!!this.user) return true;

    const token = localStorage.getItem('access_token');
    if (!token) return false;

    try {
      this.setAccessToken(token);
      await this.getSpotifyUser();
      return true;
    } catch (error) {
      console.error(error);
      return false;
    }
  }

  async getSpotifyUser() {
    const _user = await this.spotifyApi.getMe();
    this.user = buildSpotifyUser(_user);
  }

  async getSpotifyUserPlaylist(): Promise<IPlaylist[]> {
    const data = await this.spotifyApi.getUserPlaylists(this.user.id);
    return data.items.map((playlist) => buildSpotifyPlaylist(playlist));
  }

  async getMySpotifyTopArtist(limit = 1): Promise<IArtist> {
    const data = await this.spotifyApi.getMyTopArtists({ limit });
    return buildSpotifyArtist(data.items[0]);
  }

  async getMyFavoriteTracks(): Promise<ITrack[]> {
    const data = await this.spotifyApi.getMySavedTracks();

    return data.items.map((track, index) =>
      buildSpotifyFavoriteTrack(track, index)
    );
  }

  async getMyCurrentTrack(): Promise<ITrack> {
    const data = await this.spotifyApi.getMyCurrentPlayingTrack();

    return buildSpotifyCurrentTrack(data);
  }
}
