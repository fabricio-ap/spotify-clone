import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './card.component.html',
  styleUrl: './card.component.scss',
})
export class CardComponent {
  @Input()
  img: string = '';

  @Input()
  title: string = '';

  @Input()
  description: string = '';

  @Input()
  direction?: 'horizontal' | 'vertical' = 'vertical';

  getDirectionCardClass() {
    return this.direction === 'vertical'
      ? 'card__container--vertical'
      : 'card__container--horizontal';
  }
}
