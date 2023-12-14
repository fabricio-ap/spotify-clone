import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SpotifyService } from '../../services/spotify.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent implements OnInit {
  constructor(private spotifyService: SpotifyService, private router: Router) {}

  ngOnInit(): void {
    this.verifyTokenUrlCallback();
  }

  handleLogin() {
    window.location.href = this.spotifyService.getUrlLogin();
  }

  verifyTokenUrlCallback() {
    const token = this.spotifyService.getTokenUrlCallback();

    if (!!token) {
      this.spotifyService.setAccessToken(token);
      this.router.navigate(['/player']);
    }
  }
}
