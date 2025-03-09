export interface Servant {
    name: string;          // Nome do grupo (ex.: Cultistas)
    cost: number;          // Custo em almas
    cycleTime: number;     // Tempo do ciclo (segundos)
    soulsProduced: number; // Almas geradas ao fim do ciclo
    count: number;         // Quantidade comprada
    unlocked: boolean;     // Se o servo está desbloqueado
}