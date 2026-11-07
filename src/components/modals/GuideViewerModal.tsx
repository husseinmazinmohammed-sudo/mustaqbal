import React from 'react';
import { X, Download, Share2, CheckCircle2, Bookmark, BookmarkCheck, Shield, ExternalLink } from 'lucide-react';
import { PocketGuide } from '../../types';

interface GuideViewerModalProps {
  guide: PocketGuide | null;
  onClose: () => void;
  onOpenShareCard: (guide: PocketGuide) => void;
  isBookmarked: boolean;
  onToggleBookmark: (guideId: string) => void;
}

export const GuideViewerModal: React.FC<GuideViewerModalProps> = ({
  guide,
  onClose,
  onOpenShareCard,
  isBookmarked,
  onToggleBookmark
}) => {
  if (!guide) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-end sm:items-center justify-center p-0 sm:p-4" dir="rtl">
      <div className="w-full max-w-lg bg-white dark:bg-slate-900 rounded-t-3xl sm:rounded-3xl max-h-[90vh] flex flex-col overflow-hidden shadow-2xl border border-slate-200 dark:border-slate-800">
        {/* iOS Drag Handle */}
        <div className="w-12 h-1.5 bg-slate-300 dark:bg-slate-700 rounded-full mx-auto my-2 sm:hidden shrink-0"></div>

        {/* Modal Header */}
        <div className="px-5 py-3.5 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-2">
            <span className="font-mono text-[10px] bg-emerald-50 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-400 font-bold px-2 py-0.5 rounded-md border border-emerald-200 dark:border-emerald-800">
              {guide.arabicCode}
            </span>
            <span className="text-xs text-slate-400">
              {guide.pagesCount} صفحة · إصدار {guide.updatedDate}
            </span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => onToggleBookmark(guide.id)}
              className={`p-1.5 rounded-lg border transition-colors ${
                isBookmarked
                  ? 'bg-emerald-50 dark:bg-emerald-950/40 border-emerald-300 text-emerald-600'
                  : 'border-slate-200 dark:border-slate-700 text-slate-400'
              }`}
            >
              {isBookmarked ? <BookmarkCheck className="w-4 h-4" /> : <Bookmark className="w-4 h-4" />}
            </button>
            <button
              onClick={onClose}
              className="w-8 h-8 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-slate-500 hover:text-slate-800 dark:hover:text-white"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Scrollable Guide Content */}
        <div className="p-5 overflow-y-auto space-y-4 text-right">
          <div>
            <h2 className="text-base font-bold text-slate-900 dark:text-white leading-tight">
              {guide.title}
            </h2>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 leading-relaxed">
              {guide.description}
            </p>
          </div>

          {/* Key Takeaways */}
          <div className="bg-emerald-50/70 dark:bg-emerald-950/20 border border-emerald-200/70 dark:border-emerald-800/50 rounded-2xl p-3.5 space-y-2">
            <h3 className="text-xs font-bold text-emerald-800 dark:text-emerald-300 flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4" />
              <span>النقاط الاسترشادية الجوهرية للسلامة</span>
            </h3>
            <ul className="space-y-1.5 pr-2">
              {guide.keyTakeaways.map((item, idx) => (
                <li key={idx} className="text-xs text-slate-700 dark:text-slate-200 leading-normal flex items-start gap-1.5">
                  <span className="text-emerald-600 font-bold shrink-0">▪</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Protocol Sequential Steps */}
          <div className="space-y-2.5">
            <h3 className="text-xs font-bold text-slate-900 dark:text-white">
              خطوات وبروتوكول التطبيق الميداني:
            </h3>

            <div className="space-y-2.5">
              {guide.protocolSteps.map((step) => (
                <div
                  key={step.stepNumber}
                  className="bg-slate-50 dark:bg-slate-800/60 border border-slate-200/80 dark:border-slate-700/80 rounded-2xl p-3.5 space-y-1.5"
                >
                  <div className="flex items-center gap-2">
                    <span className="w-5 h-5 rounded-full bg-emerald-600 text-white text-[11px] font-bold flex items-center justify-center shrink-0">
                      {step.stepNumber}
                    </span>
                    <h4 className="text-xs font-bold text-slate-900 dark:text-white">
                      {step.title}
                    </h4>
                  </div>

                  <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed pr-7">
                    {step.action}
                  </p>

                  <div className="mt-1.5 mr-7 p-2 rounded-lg bg-amber-50/70 dark:bg-amber-950/30 border border-amber-200/60 dark:border-amber-900/40 text-[11px] text-amber-900 dark:text-amber-300">
                    <strong className="font-bold">نقطة التدقيق الحرجة: </strong>
                    <span>{step.criticalCheck}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Standards References */}
          <div className="pt-2">
            <span className="text-[10px] font-bold text-slate-400 block mb-1">
              المراجع والمعايير الدولية المعتمدة:
            </span>
            <div className="flex flex-wrap gap-1.5">
              {guide.standardsReference.map((ref, idx) => (
                <span
                  key={idx}
                  className="text-[10px] bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 font-mono px-2 py-0.5 rounded-md"
                >
                  {ref}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Modal Footer Toolbar */}
        <div className="px-5 py-3 border-t border-slate-100 dark:border-slate-800 bg-slate-50/80 dark:bg-slate-900/80 flex items-center gap-2 shrink-0">
          <button
            onClick={() => onOpenShareCard(guide)}
            className="flex-1 bg-emerald-600 hover:bg-emerald-700 active:scale-95 text-white text-xs font-bold py-2.5 px-4 rounded-xl flex items-center justify-center gap-2 shadow-sm transition-all"
          >
            <Share2 className="w-4 h-4" />
            <span>تصدير بطاقة الجيب الرقمية للطباعة</span>
          </button>
        </div>
      </div>
    </div>
  );
};
