import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { interval } from 'rxjs';
import { CounterComponent } from './core/ui/counter/counter.component';
import { Servant } from './core/models/servant.model';
import { ButtonComponent } from './core/ui/button/button.component';
import { ToggleButtonComponent } from './core/ui/toggle-button/toggle-button.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  imports: [
    CommonModule,
    CounterComponent,
    ButtonComponent,
    ToggleButtonComponent
  ]
})
export class AppComponent {
  souls: number = 10;
  lastUpdate: number = Date.now();
  purchaseQuantity: number = 1;

  servants: Servant[] = [
    { name: 'Cultistas', cost: 10, cycleTime: 5, soulsProduced: 1, count: 0, unlocked: true },
    { name: 'Zumbis', cost: 100, cycleTime: 8, soulsProduced: 10, count: 0, unlocked: false },
    { name: 'Aberrações', cost: 1000, cycleTime: 12, soulsProduced: 100, count: 0, unlocked: false }
  ];

  constructor() {
    this.updateGame();
  }

  get production(): number {
    return this.servants.reduce((sum, servant) => {
      return sum + (servant.count * (servant.soulsProduced / servant.cycleTime));
    }, 0);
  }

  updateGame() {
    interval(100).subscribe(() => {
      const now = Date.now();
      const delta = (now - this.lastUpdate) / 1000;
      this.lastUpdate = now;
      this.souls += this.production * delta;
      this.checkUnlocks();
    });
  }

  buyServant(servant: Servant) {
    let quantity = this.purchaseQuantity;
    if (this.purchaseQuantity === -1) {
      quantity = Math.floor(this.souls / servant.cost);
    }
    for (let i = 0; i < quantity; i++) {
      if (this.souls >= servant.cost) {
        this.souls -= servant.cost;
        servant.count++;
        servant.cost = Math.floor(servant.cost * 1.15);
      }
    }
  }

  checkUnlocks() {
    for (let i = 0; i < this.servants.length; i++) {
      if (!this.servants[i].unlocked && this.souls >= this.servants[i].cost * 0.8) {
        this.servants[i].unlocked = true;
        break;
      }
    }
  }
  
  setPurchaseQuantity(quantity: number) {
    this.purchaseQuantity = quantity;
  }

  getSelectedIndex(): number {
    switch (this.purchaseQuantity) {
      case 1: return 0;
      case 10: return 1;
      case 100: return 2;
      case -1: return 3;
      default: return 0;
    }
  }

  onPurchaseToggle(index: number) {
    const quantityMap = [1, 10, 100, -1];
    this.setPurchaseQuantity(quantityMap[index]);
  }
}
