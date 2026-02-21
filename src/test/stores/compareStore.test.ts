import { describe, it, expect, beforeEach } from "vitest";
import { useCompareStore } from "../../store/compareStore";

describe("compareStore", () => {
    beforeEach(() => {
        useCompareStore.setState({ selectedIds: [] });
    });

    it("starts with empty selection", () => {
        expect(useCompareStore.getState().selectedIds).toEqual([]);
    });

    it("addProvider adds a provider", () => {
        useCompareStore.getState().addProvider("iyzico");
        expect(useCompareStore.getState().selectedIds).toEqual(["iyzico"]);
    });

    it("does not add duplicate", () => {
        useCompareStore.getState().addProvider("iyzico");
        useCompareStore.getState().addProvider("iyzico");
        expect(useCompareStore.getState().selectedIds).toEqual(["iyzico"]);
    });

    it("enforces max 3 providers", () => {
        useCompareStore.getState().addProvider("a");
        useCompareStore.getState().addProvider("b");
        useCompareStore.getState().addProvider("c");
        useCompareStore.getState().addProvider("d");
        expect(useCompareStore.getState().selectedIds).toHaveLength(3);
        expect(useCompareStore.getState().selectedIds).not.toContain("d");
    });

    it("removeProvider removes a provider", () => {
        useCompareStore.getState().addProvider("a");
        useCompareStore.getState().addProvider("b");
        useCompareStore.getState().removeProvider("a");
        expect(useCompareStore.getState().selectedIds).toEqual(["b"]);
    });

    it("clearAll empties selection", () => {
        useCompareStore.getState().addProvider("a");
        useCompareStore.getState().addProvider("b");
        useCompareStore.getState().clearAll();
        expect(useCompareStore.getState().selectedIds).toEqual([]);
    });

    it("isSelected returns correct boolean", () => {
        useCompareStore.getState().addProvider("x");
        expect(useCompareStore.getState().isSelected("x")).toBe(true);
        expect(useCompareStore.getState().isSelected("y")).toBe(false);
    });
});
