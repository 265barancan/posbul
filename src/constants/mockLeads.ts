import type { Lead } from "../types/lead.types";

export const MOCK_LEADS: Lead[] = [
    {
        id: "L-1001",
        providerId: "p1", // PayTR
        companyName: "TechStore Elektronik",
        contactName: "Ahmet Yılmaz",
        phone: "0555 123 4567",
        email: "ahmet@techstore.com",
        volume: "250K - 1M TL",
        status: "YENI",
        createdAt: "2026-03-01T10:30:00Z"
    },
    {
        id: "L-1002",
        providerId: "p1", // PayTR
        companyName: "Giyim Dünyası",
        contactName: "Ayşe Kaya",
        phone: "0532 987 6543",
        email: "ayse@giyimdunyasi.com",
        volume: "50K - 250K TL",
        status: "INCELEMEDE",
        createdAt: "2026-02-28T14:15:00Z"
    },
    {
        id: "L-1003",
        providerId: "p2", // iyzico
        companyName: "Kahvaltı Sepeti",
        contactName: "Mehmet Demir",
        phone: "0543 234 5678",
        email: "mehmet@kahvaltisepeti.com",
        volume: "0 - 50K TL",
        status: "ONAYLANDI",
        createdAt: "2026-02-25T09:00:00Z"
    },
    {
        id: "L-1004",
        providerId: "p1", // PayTR
        companyName: "Mobilya Plus",
        contactName: "Canan Şahin",
        phone: "0505 345 6789",
        email: "canan@mobilyaplus.com",
        volume: "1M+ TL",
        status: "REDDEDILDI",
        createdAt: "2026-02-20T16:45:00Z"
    },
    {
        id: "L-1005",
        providerId: "p3", // Param
        companyName: "Kozmetik Evi",
        contactName: "Zeynep Çelik",
        phone: "0533 456 7890",
        email: "zeynep@kozmetikevi.com",
        volume: "50K - 250K TL",
        status: "YENI",
        createdAt: "2026-03-02T11:20:00Z"
    }
];
