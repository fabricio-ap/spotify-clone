import { Component, OnInit } from '@angular/core';
import { MatIconModule, MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';
import { IUser } from '../../interfaces/user';
import { SpotifyService } from '../../services/spotify.service';
import { ButtonComponent } from '../button/button.component';

const icons = {
  back: `<svg xmlns="http://www.w3.org/2000/svg" width="25" height="24" viewBox="0 0 25 24" fill="none">
      <path d="M18.3141 2.48096C17.9235 2.09033 17.2905 2.09033 16.8998 2.48096L8.79498 10.5859L8.76813 10.5591L7.35394 11.9731L7.3808 12L7.35394 12.0269L8.76813 13.4414L8.7951 13.4146L16.8998 21.519C17.2903 21.9097 17.9235 21.9097 18.314 21.519C18.5663 21.2666 18.6557 20.9131 18.5821 20.5894C18.5417 20.4121 18.4523 20.2432 18.314 20.105L10.2093 12L18.3141 3.89502C18.7047 3.50488 18.7047 2.87158 18.3141 2.48096Z" fill="currentColor"/>
    </svg>`,
  next: `<svg xmlns="http://www.w3.org/2000/svg" width="25" height="24" viewBox="0 0 25 24" fill="none">
      <path d="M7.64679 2.48096C8.03741 2.09033 8.67047 2.09033 9.0611 2.48096L17.166 10.5859L17.1928 10.5591L18.607 11.9731L18.5801 12L18.607 12.0269L17.1928 13.4414L17.1658 13.4146L9.0611 21.519C8.67059 21.9097 8.03741 21.9097 7.64691 21.519C7.39459 21.2666 7.30524 20.9131 7.37885 20.5894C7.41925 20.4121 7.50861 20.2432 7.64691 20.105L15.7516 12L7.64679 3.89502C7.25629 3.50488 7.25629 2.87158 7.64679 2.48096Z" fill="currentColor"/>
    </svg>`,
};

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [ButtonComponent, MatIconModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent implements OnInit {
  user: IUser;

  constructor(
    private iconRegistry: MatIconRegistry,
    private sanitizer: DomSanitizer,
    private SpotifyService: SpotifyService
  ) {
    iconRegistry.addSvgIconLiteral(
      'back',
      sanitizer.bypassSecurityTrustHtml(icons.back)
    );
    iconRegistry.addSvgIconLiteral(
      'next',
      sanitizer.bypassSecurityTrustHtml(icons.next)
    );
  }

  ngOnInit(): void {
    this.user = this.SpotifyService.user;
  }
}
