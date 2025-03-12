import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { interval } from 'rxjs';
import { Servant } from './models/servant.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  imports: [CommonModule]
})
export class AppComponent {
  souls: number = 0;
  lastUpdate: number = Date.now();
  purchaseQuantity: number = 1;

  servants: Servant[] = [
    { name: 'Cultistas', cost: 10, cycleTime: 5, soulsProduced: 1, count: 1, unlocked: true },
    { name: 'Byakhees', cost: 100, cycleTime: 8, soulsProduced: 10, count: 0, unlocked: false },
    { name: 'Shoggoths', cost: 1000, cycleTime: 12, soulsProduced: 100, count: 0, unlocked: false }
  ];

  digits: number[] = [];
  minLength: number = 7;
  items: string[] = ['Um', 'Próx', 'Max'];
  selectedIndex: number = 0;

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
      this.updateCycleProgress();
      this.updateDigits();
    });
  }

  updateCycleProgress() {
    this.servants.forEach(servant => {
      if (servant.count > 0) {
        servant.cycleProgress = (Date.now() % (servant.cycleTime * 1000)) / (servant.cycleTime * 10);
      }
    });
  }

  canBuyServant(servant: Servant): boolean {
    return this.souls >= servant.cost;
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

  getBuyServantProgress(servant: Servant): number {
    return Math.min((this.souls / servant.cost) * 100, 100);
  }

  getCycleProgress(servant: Servant): number {
    return servant.cycleProgress || 0;
  }

  updateDigits() {
    const valueStr = String(Math.floor(this.souls)).padStart(this.minLength, '0');
    this.digits = valueStr.split('').map(Number);
  }

  select(index: number) {
    this.selectedIndex = index;
    this.onPurchaseToggle(index);
  }
}
