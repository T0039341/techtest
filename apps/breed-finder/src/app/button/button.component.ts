import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-button',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './button.component.html',
  styleUrl: './button.component.scss',
})
export class ButtonComponent {
  @Input() name: string = '';
  @Output() breedSelected = new EventEmitter();


  onClick() {
    this.breedSelected.emit(this.name);
  }
}
