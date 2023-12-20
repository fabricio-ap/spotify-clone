import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-button',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './button.component.html',
  styleUrl: './button.component.scss',
})
export class ButtonComponent {
  @Input()
  type: 'primary' | null = null;

  @Input()
  align: 'center' | null = null;

  @Output()
  onClick = new EventEmitter<void>();

  getClass() {
    return `
      ${this.type === 'primary' && 'button--primary'}
      ${this.align === 'center' && 'button--center'}
    `;
  }

  handleClick() {
    this.onClick.emit();
  }
}
