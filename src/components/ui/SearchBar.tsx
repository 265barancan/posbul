import { useState, useRef, useEffect, useCallback } from "react";
import { PROVIDERS } from "../../constants/providers";

interface SearchBarProps {
    value: string;
    onChange: (value: string) => void;
}

export default function SearchBar({ value, onChange }: SearchBarProps) {
    const [isFocused, setIsFocused] = useState(false);
    const [localValue, setLocalValue] = useState(value);
    const timeoutRef = useRef<ReturnType<typeof setTimeout>>(undefined);
    const wrapperRef = useRef<HTMLDivElement>(null);

    const suggestions = localValue.length >= 1
        ? PROVIDERS.filter((p) =>
            p.name.toLowerCase().includes(localValue.toLowerCase())
        ).slice(0, 5)
        : [];

    const handleChange = useCallback(
        (val: string) => {
            setLocalValue(val);
            clearTimeout(timeoutRef.current);
            timeoutRef.current = setTimeout(() => {
                onChange(val);
            }, 300);
        },
        [onChange]
    );

    useEffect(() => {
        return () => clearTimeout(timeoutRef.current);
    }, []);

    useEffect(() => {
        const handleClickOutside = (e: MouseEvent) => {
            if (wrapperRef.current && !wrapperRef.current.contains(e.target as Node)) {
                setIsFocused(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    return (
        <div ref={wrapperRef} className="relative">
            <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-[20px] text-slate-400 pointer-events-none">
                search
            </span>
            <input
                type="text"
                value={localValue}
                onChange={(e) => handleChange(e.target.value)}
                onFocus={() => setIsFocused(true)}
                placeholder="Sağlayıcı ara..."
                className="w-full rounded-lg border border-slate-300 bg-white py-2.5 pl-10 pr-4 text-sm text-slate-900 placeholder:text-slate-400 transition-colors focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20 dark:border-slate-600 dark:bg-slate-800 dark:text-slate-100 dark:placeholder:text-slate-500"
                aria-label="Sağlayıcı ara"
            />

            {/* Autocomplete Dropdown */}
            {isFocused && suggestions.length > 0 && localValue.length >= 1 && (
                <div className="absolute top-full left-0 right-0 z-30 mt-1 overflow-hidden rounded-lg border border-slate-200 bg-white shadow-lg dark:border-slate-700 dark:bg-slate-800">
                    {suggestions.map((p) => (
                        <button
                            key={p.id}
                            onClick={() => {
                                setLocalValue(p.name);
                                onChange(p.name);
                                setIsFocused(false);
                            }}
                            className="flex w-full cursor-pointer items-center gap-3 px-4 py-2.5 text-left text-sm text-slate-700 transition-colors hover:bg-slate-50 dark:text-slate-200 dark:hover:bg-slate-700"
                        >
                            <span className="material-symbols-outlined text-[18px] text-primary">account_balance</span>
                            <span className="font-medium">{p.name}</span>
                            <span className="ml-auto text-xs text-slate-400">{p.subtitle}</span>
                        </button>
                    ))}
                </div>
            )}
        </div>
    );
}
