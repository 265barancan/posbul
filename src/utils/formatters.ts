export function formatCommission(min: number, max: number | null): string {
    if (max === null) {
        return `%${min.toFixed(2)}`;
    }
    return `%${min.toFixed(2)} - %${max.toFixed(2)}`;
}

export function formatCurrency(amount: number | null): string {
    if (amount === null || amount === 0) return "Ücretsiz";
    return `₺${amount.toLocaleString("tr-TR")}`;
}

export function formatRating(rating: number): string {
    return rating.toFixed(1);
}

export function getCurrentMonthYear(): string {
    const months = [
        "Ocak", "Şubat", "Mart", "Nisan", "Mayıs", "Haziran",
        "Temmuz", "Ağustos", "Eylül", "Ekim", "Kasım", "Aralık",
    ];
    const now = new Date();
    return `${months[now.getMonth()]} ${now.getFullYear()}`;
}
