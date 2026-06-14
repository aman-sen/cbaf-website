"use client";
import { useToast } from "@/hooks/useToast";

export function Toaster() {
  const { toasts } = useToast();
  return (
    <div className="fixed bottom-4 right-4 z-50 flex flex-col gap-2 pointer-events-none">
      {toasts.map((t) => (
        <div key={t.id} className={`px-4 py-3 rounded-xl shadow-lg text-sm font-medium pointer-events-auto transition-all ${
          t.variant === "destructive" ? "bg-red-600 text-white" : "bg-gray-900 text-white"
        }`}>
          {t.title && <div className="font-semibold">{t.title}</div>}
          {t.description && <div className="opacity-80 text-xs mt-0.5">{t.description}</div>}
        </div>
      ))}
    </div>
  );
}
