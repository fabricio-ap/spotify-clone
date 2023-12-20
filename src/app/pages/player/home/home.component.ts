import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MatIconModule, MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';
import { ButtonComponent } from '../../../components/button/button.component';
import { CardComponent } from '../../../components/card/card.component';
import { SpotifyItemComponent } from '../../../components/spotify-item/spotify-item.component';
import { IArtist } from '../../../interfaces/artists';
import { ITrack } from '../../../interfaces/tracks';
import { SpotifyService } from '../../../services/spotify.service';

export interface IGallery {
  message: string;
  playlists: { title: string; description: string; image: string }[];
}

const icons = {
  duration: `<svg xmlns="http://www.w3.org/2000/svg" width="25" height="24" viewBox="0 0 25 24" fill="none">
      <path d="M3.12289 11.0826C2.51799 11.0263 1.97621 11.4718 1.98062 12.0793C1.99424 13.9583 2.48924 15.8092 3.42668 17.4518C4.5465 19.414 6.24334 20.9837 8.28657 21.9478C10.3298 22.9118 12.6203 23.2233 14.8468 22.84C17.0732 22.4566 19.1277 21.397 20.7309 19.8052C22.334 18.2134 23.4082 16.1665 23.8073 13.9428C24.2064 11.7191 23.9112 9.42643 22.9617 7.37641C22.0122 5.32639 20.4545 3.61846 18.5003 2.48474C16.8644 1.53567 15.0171 1.02755 13.1382 1.00059C12.5307 0.991879 12.0814 1.53048 12.1334 2.13576C12.1854 2.74105 12.7195 3.18237 13.3265 3.20627C14.7536 3.26246 16.1515 3.66549 17.3963 4.38769C18.9597 5.29466 20.2058 6.66101 20.9654 8.30102C21.725 9.94104 21.9612 11.7752 21.6419 13.5541C21.3226 15.3331 20.4633 16.9706 19.1808 18.244C17.8982 19.5175 16.2547 20.3652 14.4735 20.6719C12.6923 20.9785 10.8599 20.7293 9.22532 19.9581C7.59074 19.1869 6.23327 17.9311 5.33741 16.3613C4.62407 15.1114 4.23096 13.7107 4.18491 12.2833C4.16532 11.6761 3.72779 11.1388 3.12289 11.0826Z" fill="currentColor"/>
      <path d="M9.21715 3.36458C9.21715 4.02602 8.68096 4.56221 8.01952 4.56221C7.35809 4.56221 6.82189 4.02602 6.82189 3.36458C6.82189 2.70315 7.35809 2.16695 8.01952 2.16695C8.68096 2.16695 9.21715 2.70315 9.21715 3.36458Z" fill="currentColor"/>
      <path d="M5.60192 7.05892C5.60192 7.72035 5.06572 8.25655 4.40429 8.25655C3.74285 8.25655 3.20666 7.72035 3.20666 7.05892C3.20666 6.39748 3.74285 5.86129 4.40429 5.86129C5.06572 5.86129 5.60192 6.39748 5.60192 7.05892Z" fill="currentColor"/>
      <path d="M13.1158 5.0483C12.5756 5.0483 12.1373 5.48629 12.1373 6.02681V13.0717H17.0941C17.6559 13.0717 18.1114 12.6167 18.1114 12.0546C18.1114 11.4926 17.6559 11.0371 17.0941 11.0371H14.0946V6.02681C14.0946 5.48629 13.6564 5.0483 13.1158 5.0483Z" fill="currentColor"/>
    </svg>`,
};

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    CardComponent,
    ButtonComponent,
    SpotifyItemComponent,
    CommonModule,
    MatIconModule,
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent implements OnInit {
  artist: IArtist = {
    id: '',
    name: '',
    image: '',
    genre: '',
  };

  favorite: ITrack[] = [];

  constructor(
    private SpotifyService: SpotifyService,
    private iconRegistry: MatIconRegistry,
    private sanitizer: DomSanitizer
  ) {
    iconRegistry.addSvgIconLiteral(
      'duration',
      sanitizer.bypassSecurityTrustHtml(icons.duration)
    );
  }

  ngOnInit(): void {
    this.getMyTopArtist();
    this.getMyFavoriteTracks();
  }

  async getMyTopArtist() {
    this.artist = await this.SpotifyService.getMySpotifyTopArtist();
  }

  async getMyFavoriteTracks() {
    this.favorite = await this.SpotifyService.getMyFavoriteTracks();
  }
}
