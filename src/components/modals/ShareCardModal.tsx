import React, { useState } from 'react';
import { X, Copy, Check, Download, ShieldCheck, QrCode } from 'lucide-react';
import { PocketGuide } from '../../types';

interface ShareCardModalProps {
  guide: PocketGuide | null;
  onClose: () => void;
}

export const ShareCardModal: React.FC<ShareCardModalProps> = ({ guide, onClose }) => {
  const [copied, setCopied] = useState(false);

  if (!guide) return null;

  const handleCopyText = () => {
    navigator.clipboard.writeText(guide.pdfSummary);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4" dir="rtl">
      <div className="w-full max-w-md bg-white dark:bg-slate-900 rounded-3xl overflow-hidden shadow-2xl border border-slate-200 dark:border-slate-800 flex flex-col max-h-[85vh]">
        {/* Header */}
        <div className="px-5 py-3 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-emerald-600" />
            <span className="text-xs font-bold text-slate-900 dark:text-white">
              بطاقة الجيب الاسترشادية المصغرة
            </span>
          </div>
          <button
            onClick={onClose}
            className="w-7 h-7 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-slate-500 hover:text-slate-800 dark:hover:text-white"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Formatted Pocket Card View */}
        <div className="p-4 overflow-y-auto space-y-3">
          <div className="border border-slate-200 dark:border-slate-700 rounded-2xl p-4 bg-slate-50 dark:bg-slate-950 font-mono text-[11px] leading-relaxed text-slate-800 dark:text-slate-200 whitespace-pre-wrap select-text">
            {guide.pdfSummary}
          </div>

          <div className="bg-emerald-50 dark:bg-emerald-950/30 p-3 rounded-xl border border-emerald-200 dark:border-emerald-800 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <QrCode className="w-8 h-8 text-emerald-600" />
              <div>
                <span className="text-[11px] font-bold text-emerald-900 dark:text-emerald-300 block">
                  كود التحقق الرقمي السريع
                </span>
                <span className="text-[9px] text-slate-500 font-mono">
                  VERIFIED-BME-REF-{guide.arabicCode}
                </span>
              </div>
            </div>
            <span className="text-[10px] font-bold text-emerald-700 bg-emerald-100 dark:bg-emerald-900/50 px-2 py-1 rounded-md">
              معتمد
            </span>
          </div>
        </div>

        {/* Footer with Copy / Print button */}
        <div className="p-4 border-t border-slate-100 dark:border-slate-800 bg-slate-50 dark:bg-slate-900 flex items-center gap-2">
          <button
            onClick={handleCopyText}
            className="flex-1 bg-emerald-600 hover:bg-emerald-700 active:scale-95 text-white text-xs font-bold py-2.5 px-4 rounded-xl flex items-center justify-center gap-1.5 transition-all shadow-xs"
          >
            {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
            <span>{copied ? 'تم نسخ نص البطاقة بنجاح!' : 'نسخ نص بطاقة الجيب'}</span>
          </button>

          <button
            onClick={() => window.print()}
            className="bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 text-xs font-medium py-2.5 px-3 rounded-xl flex items-center justify-center gap-1 transition-colors"
            title="طباعة البطاقة أو حفظها كـ PDF"
          >
            <Download className="w-4 h-4" />
            <span>طباعة</span>
          </button>
        </div>
      </div>
    </div>
  );
};
