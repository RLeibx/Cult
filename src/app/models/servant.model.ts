export interface Servant {
    name: string;
    cost: number;
    count: number;
    unlocked: boolean;
    cycleTime: number;
    soulsProduced: number;
    cycleProgress?: number;
}