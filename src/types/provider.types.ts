export interface Provider {
    id: string;
    name: string;
    subtitle: string;
    logo: string;
    commissionRate: {
        min: number;
        max: number | null;
    };
    installmentRates: {
        3: number;
        6: number;
        12: number;
    };
    currencyRates?: {
        USD?: number;
        EUR?: number;
        GBP?: number;
    };
    cryptoRates?: {
        USDT?: number;
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
    fixedFee: number;
}

export type SortOption = "commission" | "speed" | "popularity";
export type SegmentOption = "bireysel" | "kurumsal";

export interface FilterState {
    segment: SegmentOption;
    sortBy: SortOption;
}
