export interface Review {
    id: string;
    providerId: string;
    userName: string;
    rating: number;
    comment: string;
    date: string;
    isVerified?: boolean;
}
