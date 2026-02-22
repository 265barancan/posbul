import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { describe, it, expect, vi, beforeEach } from "vitest";
import { MemoryRouter } from "react-router-dom";
import SmartWizard from "../../../src/components/sections/SmartWizard";
import { useFilterStore } from "../../../src/store/filterStore";

// Mock the router navigation
const navigateMock = vi.fn();
vi.mock("react-router-dom", async () => {
    const actual = await vi.importActual("react-router-dom");
    return {
        ...actual as any,
        useNavigate: () => navigateMock,
    };
});

describe("SmartWizard Component", () => {
    beforeEach(() => {
        vi.clearAllMocks();
        // Reset store
        useFilterStore.setState({ segment: "bireysel", sortBy: "commission", searchQuery: "" });
    });

    it("renders the first step correctly", () => {
        render(
            <MemoryRouter>
                <SmartWizard />
            </MemoryRouter>
        );
        expect(screen.getByText("Aylık Cironuz Ne Kadar?")).toBeInTheDocument();
        expect(screen.getByText("0 - 50.000 TL")).toBeInTheDocument();
    });

    it("navigates through steps and completes the wizard", async () => {
        render(
            <MemoryRouter>
                <SmartWizard />
            </MemoryRouter>
        );

        // Step 1
        fireEvent.click(screen.getByText("0 - 50.000 TL"));

        // Step 2
        const step2Label = await screen.findByText("Firma Tipiniz Nedir?");
        expect(step2Label).toBeInTheDocument();
        fireEvent.click(screen.getByText("Limited / A.Ş."));

        // Step 3
        const step3Label = await screen.findByText("Taksit Seçeneklerine İhtiyacınız Var mı?");
        expect(step3Label).toBeInTheDocument();
        fireEvent.click(screen.getByText("Evet, Müşterilerim Taksit İstiyor"));

        // Wait for final state and complete
        await waitFor(() => {
            expect(useFilterStore.getState().segment).toBe("kurumsal");
            expect(navigateMock).toHaveBeenCalledWith("/karsilastir");
        }, { timeout: 1000 });
    });
});
