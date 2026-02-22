import { describe, it, expect, beforeEach } from "vitest";
import { useCalculatorStore } from "../../store/calculatorStore";

describe("calculatorStore", () => {
    beforeEach(() => {
        useCalculatorStore.getState().reset();
    });

    it("has correct initial state", () => {
        const state = useCalculatorStore.getState();
        expect(state.amount).toBe(10000);
        expect(state.installments).toBe(1);
        expect(state.cardFamily).toBeNull();
        expect(state.transactionCount).toBe(100);
        expect(state.includeHiddenCosts).toBe(false);
    });

    it("setAmount updates amount", () => {
        useCalculatorStore.getState().setAmount(50000);
        expect(useCalculatorStore.getState().amount).toBe(50000);
    });

    it("setInstallments updates installments", () => {
        useCalculatorStore.getState().setInstallments(6);
        expect(useCalculatorStore.getState().installments).toBe(6);
    });

    it("setCardFamily updates card family", () => {
        useCalculatorStore.getState().setCardFamily("Bonus");
        expect(useCalculatorStore.getState().cardFamily).toBe("Bonus");
    });

    it("setTransactionCount updates transaction count", () => {
        useCalculatorStore.getState().setTransactionCount(500);
        expect(useCalculatorStore.getState().transactionCount).toBe(500);
    });

    it("setIncludeHiddenCosts updates toggle", () => {
        useCalculatorStore.getState().setIncludeHiddenCosts(true);
        expect(useCalculatorStore.getState().includeHiddenCosts).toBe(true);
    });

    it("reset restores initial state", () => {
        const store = useCalculatorStore.getState();
        store.setAmount(20000);
        store.setInstallments(3);
        store.setCardFamily("World");
        store.setTransactionCount(250);
        store.setIncludeHiddenCosts(true);

        // Actually calling reset on the current exact state reference might be slightly off if we don't grab it fresh, but zustand handles it.
        useCalculatorStore.getState().reset();

        const resetState = useCalculatorStore.getState();
        expect(resetState.amount).toBe(10000);
        expect(resetState.installments).toBe(1);
        expect(resetState.cardFamily).toBeNull();
        expect(resetState.transactionCount).toBe(100);
        expect(resetState.includeHiddenCosts).toBe(false);
    });
});
