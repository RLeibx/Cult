import { CommonModule } from '@angular/common';
import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-counter',
  templateUrl: './counter.component.html',
  styleUrls: ['./counter.component.scss'],
  imports: [
    CommonModule,
  ]
})
export class CounterComponent implements OnChanges {
  @Input() value: number = 0;
  @Input() minLength: number = 7;
  digits: number[] = [];

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['value'] || changes['minLength']) {
      this.updateDigits();
    }
  }

  updateDigits() {
    const valueStr = String(Math.floor(this.value)).padStart(this.minLength, '0');
    this.digits = valueStr.split('').map(Number);
  }
}