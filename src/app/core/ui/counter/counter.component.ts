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
  digits: number[] = [];

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['value']) {
      this.updateDigits();
    }
  }

  updateDigits() {
    this.digits = String(Math.floor(this.value)).split('').map(Number);
  }
}


