import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { interval } from 'rxjs';
import { CounterComponent } from './core/ui/counter/counter.component';
import { Servant } from './core/models/servant.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  imports: [
    CommonModule,
    CounterComponent
  ]
})
export class AppComponent {
  souls: number = 0;
  lastUpdate: number = Date.now();
  // purchaseQuantity: 1, 10, 100 (milestone) ou -1 (max)
  purchaseQuantity: number = 1;

  // Servants iniciais: apenas Cultistas desbloqueado inicialmente
  servants: Servant[] = [
    { name: 'Cultistas', cost: 10, cycleTime: 5, soulsProduced: 1, count: 0, unlocked: true },
    { name: 'Zumbis', cost: 100, cycleTime: 8, soulsProduced: 10, count: 0, unlocked: false },
    { name: 'Aberrações', cost: 1000, cycleTime: 12, soulsProduced: 100, count: 0, unlocked: false }
  ];

  constructor() {
    this.updateGame();
  }

  // Produção total em almas por segundo
  get production(): number {
    return this.servants.reduce((sum, servant) => {
      // Cada servant gera soulsProduced a cada cycleTime segundos
      return sum + (servant.count * (servant.soulsProduced / servant.cycleTime));
    }, 0);
  }

  // Atualiza o jogo em intervalos de 100ms
  updateGame() {
    interval(100).subscribe(() => {
      const now = Date.now();
      const delta = (now - this.lastUpdate) / 1000;
      this.lastUpdate = now;
      this.souls += this.production * delta;
      this.checkUnlocks();
    });
  }

  // Compra servant conforme a quantidade selecionada
  buyServant(servant: Servant) {
    let quantity = this.purchaseQuantity;
    if (this.purchaseQuantity === -1) { // -1 representa "max"
      quantity = Math.floor(this.souls / servant.cost);
    }
    for (let i = 0; i < quantity; i++) {
      if (this.souls >= servant.cost) {
        this.souls -= servant.cost;
        servant.count++;
        // Aumenta o custo com multiplicador (ex.: 1.15)
        servant.cost = Math.floor(servant.cost * 1.15);
      }
    }
  }

  // Desbloqueia o próximo servant se o jogador atingir o valor necessário
  checkUnlocks() {
    for (let i = 0; i < this.servants.length; i++) {
      if (!this.servants[i].unlocked && this.souls >= this.servants[i].cost * 0.8) {
        this.servants[i].unlocked = true;
        break; // desbloqueia um por vez
      }
    }
  }

  // Seleciona a quantidade de compra pelo toggle
  setPurchaseQuantity(quantity: number) {
    this.purchaseQuantity = quantity;
  }
}
