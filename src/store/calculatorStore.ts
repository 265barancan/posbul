import { create } from "zustand";

interface CalculatorState {
    amount: number;
    installments: number; // 1 (tek çekim), 2, 3, 6, 9, 12
    cardFamily: string | null; // null (tümü), 'Bonus', 'World', 'Maximum', 'Axess', 'CardFinans', 'Paraf'
    setAmount: (amount: number) => void;
    setInstallments: (installments: number) => void;
    setCardFamily: (family: string | null) => void;
    transactionCount: number;
    setTransactionCount: (count: number) => void;
    includeHiddenCosts: boolean;
    setIncludeHiddenCosts: (include: boolean) => void;
    reset: () => void;
}

export const useCalculatorStore = create<CalculatorState>((set) => ({
    amount: 10000,
    installments: 1,
    cardFamily: null,
    transactionCount: 100, // Varsayılan 100 işlem
    includeHiddenCosts: false,
    setAmount: (amount) => set({ amount }),
    setInstallments: (installments) => set({ installments }),
    setCardFamily: (cardFamily) => set({ cardFamily }),
    setTransactionCount: (transactionCount) => set({ transactionCount }),
    setIncludeHiddenCosts: (includeHiddenCosts) => set({ includeHiddenCosts }),
    reset: () => set({ amount: 10000, installments: 1, cardFamily: null, transactionCount: 100, includeHiddenCosts: false }),
}));
