import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, it, expect, beforeEach, vi } from "vitest";
import ApplicationModal from "../../components/providers/ApplicationModal";
import { useApplicationStore } from "../../store/applicationStore";
import { useToastStore } from "../../store/toastStore";
import { PROVIDERS } from "../../constants/providers";

describe("ApplicationModal", () => {
    const mockProvider = PROVIDERS[0]; // iyzico

    beforeEach(() => {
        // Reset stores before each test
        useApplicationStore.getState().closeModal();
        useToastStore.setState({ toasts: [] });
    });

    it("does not render when closed", () => {
        render(<ApplicationModal />);
        expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
    });

    it("renders correctly when open", () => {
        useApplicationStore.getState().openModal(mockProvider);
        render(<ApplicationModal />);

        const dialog = screen.getByRole("dialog");
        expect(dialog).toBeInTheDocument();
        expect(screen.getByText(`${mockProvider.name} Hızlı Başvuru`)).toBeInTheDocument();
        // Check form elements exist
        expect(screen.getByLabelText(/Ad Soyad/i)).toBeInTheDocument();
        expect(screen.getByLabelText(/Telefon Numarası/i)).toBeInTheDocument();
        expect(screen.getByLabelText(/Firma Ünvanı/i)).toBeInTheDocument();
    });

    it("shows error toast if KVKK is not accepted on submit", async () => {
        const user = userEvent.setup();
        useApplicationStore.getState().openModal(mockProvider);
        render(<ApplicationModal />);

        // Fill required fields but not KVKK
        await user.type(screen.getByLabelText(/Ad Soyad/i), "John Doe");
        await user.type(screen.getByLabelText(/Telefon Numarası/i), "05555555555");
        await user.type(screen.getByLabelText(/Firma Ünvanı/i), "Test AS");

        const submitBtn = screen.getByRole("button", { name: /Başvuruyu Tamamla/i });
        await user.click(submitBtn);

        // Check if error toast was added
        const toasts = useToastStore.getState().toasts;
        expect(toasts.length).toBe(1);
        expect(toasts[0].variant).toBe("error");
        expect(toasts[0].message).toContain("KVKK");
    });

    it("submits successfully when form is filled and KVKK is accepted", async () => {
        const user = userEvent.setup();

        useApplicationStore.getState().openModal(mockProvider);
        render(<ApplicationModal />);

        // Fill form
        await user.type(screen.getByLabelText(/Ad Soyad/i), "Jane Doe");
        await user.type(screen.getByLabelText(/Telefon Numarası/i), "05321234567");
        await user.type(screen.getByLabelText(/Firma Ünvanı/i), "Jane LLC");

        // accept KVKK
        const kvkkCheckbox = screen.getByRole("checkbox");
        await user.click(kvkkCheckbox);

        // Submit form
        const submitBtn = screen.getByRole("button", { name: /Başvuruyu Tamamla/i });
        await user.click(submitBtn);

        await waitFor(() => {
            const toasts = useToastStore.getState().toasts;
            const successToast = toasts.find(t => t.variant === "success");
            expect(successToast).toBeDefined();
            expect(successToast?.message).toContain("başarıyla");
        }, { timeout: 3000 });

        // Ensure modal is closed
        expect(useApplicationStore.getState().isOpen).toBe(false);
    });
});
