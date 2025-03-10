import { CommonModule } from '@angular/common';
import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-toggle-button',
  templateUrl: './toggle-button.component.html',
  styleUrls: ['./toggle-button.component.scss'],
  standalone: true,
  imports: [CommonModule],
})
export class ToggleButtonComponent {
  @Input() items: string[] = [];
  @Input() selectedIndex: number = 0;
  @Output() selectionChange = new EventEmitter<number>();

  select(index: number) {
    this.selectedIndex = index;
    this.selectionChange.emit(index);
  }
}
