import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ButtonComponent } from '../../components/button/button.component';
import { HeaderComponent } from '../../components/header/header.component';
import { PlayerControlComponent } from '../../components/player-control/player-control.component';
import { SidenavComponent } from '../../components/sidenav/sidenav.component';

@Component({
  selector: 'app-player',
  standalone: true,
  imports: [
    SidenavComponent,
    HeaderComponent,
    PlayerControlComponent,
    ButtonComponent,
    RouterModule,
  ],
  templateUrl: './player.component.html',
  styleUrl: './player.component.scss',
})
export class PlayerComponent {}
