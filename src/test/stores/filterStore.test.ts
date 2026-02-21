import { describe, it, expect, beforeEach } from "vitest";
import { useFilterStore } from "../../store/filterStore";

describe("filterStore", () => {
    beforeEach(() => {
        useFilterStore.setState({
            segment: "bireysel",
            sortBy: "commission",
            searchQuery: "",
        });
    });

    it("has correct initial state", () => {
        const state = useFilterStore.getState();
        expect(state.segment).toBe("bireysel");
        expect(state.sortBy).toBe("commission");
        expect(state.searchQuery).toBe("");
    });

    it("setSegment updates segment", () => {
        useFilterStore.getState().setSegment("kurumsal");
        expect(useFilterStore.getState().segment).toBe("kurumsal");
    });

    it("setSortBy updates sortBy", () => {
        useFilterStore.getState().setSortBy("speed");
        expect(useFilterStore.getState().sortBy).toBe("speed");
    });

    it("setSearchQuery updates searchQuery", () => {
        useFilterStore.getState().setSearchQuery("iyzico");
        expect(useFilterStore.getState().searchQuery).toBe("iyzico");
    });
});
