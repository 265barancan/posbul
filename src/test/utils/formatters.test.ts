import { describe, it, expect } from "vitest";
import {
    formatCommission,
    formatCurrency,
    formatRating,
    getCurrentMonthYear,
} from "../../utils/formatters";

describe("formatters", () => {
    describe("formatCommission", () => {
        it("formats single rate", () => {
            expect(formatCommission(1.99, null)).toBe("%1.99");
        });

        it("formats rate range", () => {
            expect(formatCommission(1.99, 3.49)).toBe("%1.99 - %3.49");
        });
    });

    describe("formatCurrency", () => {
        it("returns Ücretsiz for null", () => {
            expect(formatCurrency(null)).toBe("Ücretsiz");
        });

        it("returns Ücretsiz for 0", () => {
            expect(formatCurrency(0)).toBe("Ücretsiz");
        });

        it("formats amount with ₺", () => {
            expect(formatCurrency(100)).toContain("₺");
            expect(formatCurrency(100)).toContain("100");
        });
    });

    describe("formatRating", () => {
        it("formats to one decimal", () => {
            expect(formatRating(4.5)).toBe("4.5");
            expect(formatRating(4)).toBe("4.0");
        });
    });

    describe("getCurrentMonthYear", () => {
        it("returns a string with year", () => {
            const result = getCurrentMonthYear();
            expect(result).toContain("2026");
        });
    });
});
