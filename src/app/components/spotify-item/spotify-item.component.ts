import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-spotify-item',
  standalone: true,
  imports: [],
  templateUrl: './spotify-item.component.html',
  styleUrl: './spotify-item.component.scss',
})
export class SpotifyItemComponent {
  @Input()
  name: string = '';

  @Input()
  description: string = '';

  @Input()
  image: string = '';
}
