import { describe, it, expect, beforeEach, vi } from "vitest";
import { useToastStore } from "../../store/toastStore";

describe("toastStore", () => {
    beforeEach(() => {
        useToastStore.setState({ toasts: [] });
        vi.useFakeTimers();
    });

    it("addToast adds a toast with auto-generated id", () => {
        useToastStore.getState().addToast({ message: "Test", variant: "success" });
        const toasts = useToastStore.getState().toasts;
        expect(toasts).toHaveLength(1);
        expect(toasts[0].message).toBe("Test");
        expect(toasts[0].variant).toBe("success");
        expect(toasts[0].id).toBeDefined();
    });

    it("removeToast removes specific toast", () => {
        useToastStore.getState().addToast({ message: "A", variant: "info" });
        const id = useToastStore.getState().toasts[0].id;
        useToastStore.getState().removeToast(id);
        expect(useToastStore.getState().toasts).toHaveLength(0);
    });

    it("supports multiple toasts", () => {
        useToastStore.getState().addToast({ message: "A", variant: "success" });
        useToastStore.getState().addToast({ message: "B", variant: "error" });
        expect(useToastStore.getState().toasts).toHaveLength(2);
    });
});
