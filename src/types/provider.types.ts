export interface Provider {
    id: string;
    name: string;
    subtitle: string;
    logo: string;
    commissionRate: {
        min: number;
        max: number | null;
    };
    paymentSpeed: string;
    paymentSpeedHours: number;
    features: string[];
    isPopular: boolean;
    segment: "bireysel" | "kurumsal" | "her ikisi";
    applyUrl: string;
    rating: number;
    reviewCount: number;
    description: string;
    monthlyFee: number | null;
    setupFee: number | null;
}

export type SortOption = "commission" | "speed" | "popularity";
export type SegmentOption = "bireysel" | "kurumsal";

export interface FilterState {
    segment: SegmentOption;
    sortBy: SortOption;
}
