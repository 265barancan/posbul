export type LeadStatus = 'YENI' | 'INCELEMEDE' | 'ONAYLANDI' | 'REDDEDILDI';

export interface Lead {
    id: string;
    providerId: string;
    companyName: string;
    contactName: string;
    phone: string;
    email: string;
    volume: string; // Aylık Cihaz Dönüşü (0-50K vb)
    status: LeadStatus;
    createdAt: string;
}
