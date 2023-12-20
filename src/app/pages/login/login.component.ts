import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ButtonComponent } from '../../components/button/button.component';
import { SpotifyService } from '../../services/spotify.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ButtonComponent],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent implements OnInit {
  constructor(private SpotifyService: SpotifyService, private router: Router) {}

  ngOnInit(): void {
    this.verifyTokenUrlCallback();
  }

  handleLogin() {
    window.location.href = this.SpotifyService.getLoginUrl();
  }

  verifyTokenUrlCallback() {
    const token = this.SpotifyService.getTokenUrlCallback();

    if (!!token) {
      this.SpotifyService.setAccessToken(token);
      this.router.navigate(['/player']);
    }
  }
}
