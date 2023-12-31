import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MatIconModule, MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';
import { InputComponent } from '../../../components/input/input.component';
import { SpotifyService } from '../../../services/spotify.service';

const icons = {
  search: `<svg xmlns="http://www.w3.org/2000/svg" width="25" height="24" viewBox="0 0 25 24" fill="none">
      <path fill-rule="evenodd" clip-rule="evenodd" d="M18.9268 16.3972C20.176 14.7888 20.9199 12.7688 20.9199 10.5745C20.9199 5.32788 16.6667 1.07446 11.4199 1.07446C6.1731 1.07446 1.91992 5.32788 1.91992 10.5745C1.91992 15.821 6.1731 20.0745 11.4199 20.0745C13.752 20.0745 15.8877 19.2346 17.541 17.8401L22.334 22.6326C22.7244 23.0232 23.3577 23.0232 23.748 22.6326C24.1387 22.2424 24.1387 21.6091 23.748 21.2185L18.9268 16.3972ZM11.4199 18.1746C7.22266 18.1746 3.81982 14.7717 3.81982 10.5745C3.81982 6.3772 7.22266 2.97437 11.4199 2.97437C15.6172 2.97437 19.02 6.3772 19.02 10.5745C19.02 14.7717 15.6172 18.1746 11.4199 18.1746Z" fill="currentColor" stroke="currentColor" stroke-width="0.5"/>
    </svg>`,
};

type TGallery = { title: string; description: string; image: string }[];

@Component({
  selector: 'app-search',
  standalone: true,
  imports: [InputComponent, CommonModule, MatIconModule],
  templateUrl: './search.component.html',
  styleUrl: './search.component.scss',
})
export class SearchComponent implements OnInit {
  artists: TGallery;
  playlists: TGallery;

  constructor(
    private iconRegistry: MatIconRegistry,
    private sanitizer: DomSanitizer,
    private SpotifyService: SpotifyService
  ) {
    iconRegistry.addSvgIconLiteral(
      'search',
      sanitizer.bypassSecurityTrustHtml(icons.search)
    );
  }

  ngOnInit(): void {}
}
