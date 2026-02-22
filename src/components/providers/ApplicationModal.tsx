import { useState } from "react";
import { useApplicationStore } from "../../store/applicationStore";
import { useToastStore } from "../../store/toastStore";
import Modal from "../ui/Modal";
import Button from "../ui/Button";

export default function ApplicationModal() {
    const { isOpen, selectedProvider, closeModal } = useApplicationStore();
    const { addToast } = useToastStore();

    const [isLoading, setIsLoading] = useState(false);
    const [formData, setFormData] = useState({
        name: "",
        phone: "",
        companyName: "",
        monthlyVolume: "",
        kvkkCompleted: false,
    });

    if (!isOpen || !selectedProvider) return null;

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!formData.kvkkCompleted) {
            addToast({ message: "Lütfen KVKK metnini onaylayın.", variant: "error" });
            return;
        }

        setIsLoading(true);

        // Simulate API call
        await new Promise((resolve) => setTimeout(resolve, 1500));

        setIsLoading(false);
        addToast({ message: "Başvurunuz başarıyla alındı. En kısa sürede sizinle iletişime geçeceğiz.", variant: "success" });
        closeModal();

        // Reset form
        setFormData({
            name: "",
            phone: "",
            companyName: "",
            monthlyVolume: "",
            kvkkCompleted: false,
        });
    };

    return (
        <Modal isOpen={isOpen} onClose={closeModal} title={`${selectedProvider.name} Hızlı Başvuru`} size="md">
            <div className="mb-6 flex items-center gap-4 rounded-xl bg-primary/5 p-4 dark:bg-primary/10">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-white shadow-sm dark:bg-slate-800">
                    <span className="material-symbols-outlined text-[24px] text-primary">rocket_launch</span>
                </div>
                <div>
                    <h4 className="font-semibold text-slate-900 dark:text-white">Özel Teklif Fırsatı</h4>
                    <p className="text-sm text-slate-600 dark:text-slate-400">
                        Bilgilerinizi bırakın, <strong>{selectedProvider.name}</strong> yetkilileri size özel komisyon oranlarıyla ulaşsın.
                    </p>
                </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label htmlFor="name" className="mb-1.5 block text-sm font-medium text-slate-700 dark:text-slate-300">
                        Ad Soyad
                    </label>
                    <input
                        id="name"
                        required
                        type="text"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        className="w-full rounded-lg border border-slate-300 bg-white px-4 py-2.5 text-slate-900 placeholder:text-slate-400 focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary dark:border-slate-600 dark:bg-slate-800 dark:text-white"
                        placeholder="Örn: Ahmet Yılmaz"
                    />
                </div>

                <div className="grid gap-4 sm:grid-cols-2">
                    <div>
                        <label htmlFor="phone" className="mb-1.5 block text-sm font-medium text-slate-700 dark:text-slate-300">
                            Telefon Numarası
                        </label>
                        <input
                            id="phone"
                            required
                            type="tel"
                            value={formData.phone}
                            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                            className="w-full rounded-lg border border-slate-300 bg-white px-4 py-2.5 text-slate-900 placeholder:text-slate-400 focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary dark:border-slate-600 dark:bg-slate-800 dark:text-white"
                            placeholder="0555 555 55 55"
                        />
                    </div>
                    <div>
                        <label htmlFor="companyName" className="mb-1.5 block text-sm font-medium text-slate-700 dark:text-slate-300">
                            Firma Ünvanı
                        </label>
                        <input
                            id="companyName"
                            required
                            type="text"
                            value={formData.companyName}
                            onChange={(e) => setFormData({ ...formData, companyName: e.target.value })}
                            className="w-full rounded-lg border border-slate-300 bg-white px-4 py-2.5 text-slate-900 placeholder:text-slate-400 focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary dark:border-slate-600 dark:bg-slate-800 dark:text-white"
                            placeholder="Örn: ABC Ltd. Şti."
                        />
                    </div>
                </div>

                <div>
                    <label htmlFor="monthlyVolume" className="mb-1.5 block text-sm font-medium text-slate-700 dark:text-slate-300">
                        Aylık Ortalama Ciro (Opsiyonel)
                    </label>
                    <select
                        id="monthlyVolume"
                        value={formData.monthlyVolume}
                        onChange={(e) => setFormData({ ...formData, monthlyVolume: e.target.value })}
                        className="w-full rounded-lg border border-slate-300 bg-white px-4 py-2.5 text-slate-900 focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary dark:border-slate-600 dark:bg-slate-800 dark:text-white"
                    >
                        <option value="">Seçiniz</option>
                        <option value="0-50k">0 - 50.000 TL</option>
                        <option value="50k-250k">50.000 TL - 250.000 TL</option>
                        <option value="250k-1m">250.000 TL - 1.000.000 TL</option>
                        <option value="1m+">1.000.000 TL ve üzeri</option>
                    </select>
                </div>

                <div className="mt-6 flex items-start gap-3 rounded-lg border border-slate-200 bg-slate-50 p-3 dark:border-slate-700 dark:bg-slate-800/50">
                    <div className="flex h-5 items-center">
                        <input
                            id="kvkk"
                            type="checkbox"
                            checked={formData.kvkkCompleted}
                            onChange={(e) => setFormData({ ...formData, kvkkCompleted: e.target.checked })}
                            className="h-4 w-4 cursor-pointer rounded border-slate-300 text-primary focus:ring-primary dark:border-slate-600 dark:bg-slate-700"
                        />
                    </div>
                    <div className="text-xs text-slate-600 dark:text-slate-400">
                        <label htmlFor="kvkk" className="cursor-pointer font-medium text-slate-700 dark:text-slate-300">
                            KVKK Aydınlatma Metni'ni okudum ve onaylıyorum.
                        </label>{" "}
                        Kişisel verilerim, bana özel teklif sunulabilmesi amacıyla {selectedProvider.name} ile paylaşılacaktır.
                    </div>
                </div>

                <div className="mt-8 flex gap-3">
                    <Button
                        type="submit"
                        variant="primary"
                        className="flex-1"
                        isLoading={isLoading}
                        icon="send"
                    >
                        Başvuruyu Tamamla
                    </Button>
                    <Button type="button" variant="outline" onClick={closeModal}>
                        İptal
                    </Button>
                </div>
            </form>
        </Modal>
    );
}
