import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ProgressBarComponent } from '../progress-bar/progress-bar.component';
import { IconComponent } from '../icon/icon.component';

@Component({
  imports: [
    CommonModule,
    ProgressBarComponent,
    IconComponent,
  ],
  selector: 'app-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.scss'],
})
export class ButtonComponent {
  @Input() text: string = '';
  @Input() badge?: number;
  @Input() tooltip: string = '';
  @Input() disabled: boolean = false;
  @Input() showProgress: boolean = false;
  @Input() progress: number = 0;
  @Input() icon: string = '';

  @Output() buttonClick = new EventEmitter<void>();

  handleClick(): void {
    this.buttonClick.emit();
  }
}