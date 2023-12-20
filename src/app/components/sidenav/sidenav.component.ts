import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MatIconModule, MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { IPlaylist } from '../../interfaces/playlist';
import { SpotifyService } from '../../services/spotify.service';
import { SpotifyItemComponent } from '../spotify-item/spotify-item.component';

const icons = {
  home: `<svg xmlns="http://www.w3.org/2000/svg" width="25" height="24" viewBox="0 0 25 24" fill="none">
      <path d="M12.845 2.51136L3.97285 7.7432C3.94236 7.76118 3.92365 7.79394 3.92365 7.82934V21.4183C3.92365 21.4736 3.96842 21.5183 4.02365 21.5183H10.3464C10.4016 21.5183 10.4464 21.4736 10.4464 21.4183V14.6241C10.4464 14.5689 10.4912 14.5241 10.5464 14.5241H15.4219C15.4771 14.5241 15.5219 14.5689 15.5219 14.6241V21.4183C15.5219 21.4736 15.5667 21.5183 15.6219 21.5183H21.9373C21.9925 21.5183 22.0373 21.4736 22.0373 21.4183V7.82988C22.0373 7.79419 22.0183 7.76121 21.9874 7.74333L12.9459 2.51095C12.9146 2.49287 12.8761 2.49303 12.845 2.51136Z" stroke="currentColor" stroke-width="2"/>
    </svg>`,
  search: `<svg xmlns="http://www.w3.org/2000/svg" width="25" height="24" viewBox="0 0 25 24" fill="none">
      <path fill-rule="evenodd" clip-rule="evenodd" d="M18.9268 16.3972C20.176 14.7888 20.9199 12.7688 20.9199 10.5745C20.9199 5.32788 16.6667 1.07446 11.4199 1.07446C6.1731 1.07446 1.91992 5.32788 1.91992 10.5745C1.91992 15.821 6.1731 20.0745 11.4199 20.0745C13.752 20.0745 15.8877 19.2346 17.541 17.8401L22.334 22.6326C22.7244 23.0232 23.3577 23.0232 23.748 22.6326C24.1387 22.2424 24.1387 21.6091 23.748 21.2185L18.9268 16.3972ZM11.4199 18.1746C7.22266 18.1746 3.81982 14.7717 3.81982 10.5745C3.81982 6.3772 7.22266 2.97437 11.4199 2.97437C15.6172 2.97437 19.02 6.3772 19.02 10.5745C19.02 14.7717 15.6172 18.1746 11.4199 18.1746Z" fill="currentColor" stroke="currentColor" stroke-width="0.5"/>
    </svg>`,
  library: `<svg xmlns="http://www.w3.org/2000/svg" width="25" height="24" viewBox="0 0 25 24" fill="none">
      <path d="M3.00403 1.78516C2.45032 1.78516 2.00134 2.23389 2.00134 2.78809V21.1777C2.00134 21.7319 2.45032 22.1807 3.00403 22.1807C3.55774 22.1807 4.00671 21.7319 4.00671 21.1777V2.78809C4.00671 2.23389 3.55774 1.78516 3.00403 1.78516Z" fill="currentColor"/>
      <path d="M8.04504 2.78809C8.04504 2.23389 8.49402 1.78516 9.04773 1.78516C9.60144 1.78516 10.0504 2.23389 10.0504 2.78809V21.1777C10.0504 21.7319 9.60144 22.1807 9.04773 22.1807C8.49402 22.1807 8.04504 21.7319 8.04504 21.1777V2.78809Z" fill="currentColor"/>
      <path fill-rule="evenodd" clip-rule="evenodd" d="M14.047 3.0083C14.047 2.14941 14.9872 1.62207 15.7203 2.06982L21.5109 5.60547C21.6722 5.7041 21.8024 5.84033 21.8932 5.99902C21.9865 6.1626 22.0377 6.3501 22.0377 6.54443V21.1147C22.0377 21.7222 21.545 22.2148 20.9376 22.2148H15.1471C14.5394 22.2148 14.047 21.7222 14.047 21.1147V3.0083Z" fill="currentColor"/>
    </svg>`,
};

@Component({
  selector: 'app-sidenav',
  standalone: true,
  imports: [
    SpotifyItemComponent,
    RouterLink,
    RouterLinkActive,
    MatIconModule,
    CommonModule,
  ],
  templateUrl: './sidenav.component.html',
  styleUrl: './sidenav.component.scss',
})
export class SidenavComponent implements OnInit {
  menu: { label: string; path: string; icon: keyof typeof icons }[] = [
    {
      label: 'Inicio',
      path: '/player',
      icon: 'home',
    },
    {
      label: 'Buscar',
      path: '/player/search',
      icon: 'search',
    },
  ];

  playlists: IPlaylist[] = [];

  constructor(
    private iconRegistry: MatIconRegistry,
    private sanitizer: DomSanitizer,
    private SpotifyService: SpotifyService
  ) {
    iconRegistry.addSvgIconLiteral(
      'home',
      sanitizer.bypassSecurityTrustHtml(icons.home)
    );
    iconRegistry.addSvgIconLiteral(
      'search',
      sanitizer.bypassSecurityTrustHtml(icons.search)
    );
    iconRegistry.addSvgIconLiteral(
      'library',
      sanitizer.bypassSecurityTrustHtml(icons.library)
    );
  }

  ngOnInit(): void {
    this.getPlaylists();
  }

  async getPlaylists() {
    this.playlists = await this.SpotifyService.getSpotifyUserPlaylist();
  }
}
