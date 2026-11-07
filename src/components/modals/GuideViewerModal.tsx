import React, { useState, useRef, useEffect } from 'react';
import { 
  X, 
  Printer, 
  Share2, 
  Bookmark, 
  BookmarkCheck, 
  FileText, 
  Download,
  ExternalLink,
  Loader2,
  Sparkles,
  ZoomIn,
  ZoomOut,
  CheckCircle2
} from 'lucide-react';
import { PocketGuide } from '../../types';
import { OfficialGuideFormSheet } from '../OfficialGuideFormSheet';
import {
  generateOfficialGuidePdf,
  downloadGeneratedPdf,
  triggerUnifiedIframePrint,
  GeneratedPdfResult
} from '../../services/pdfExportService';

interface GuideViewerModalProps {
  guide: PocketGuide | null;
  autoGeneratePdf?: boolean;
  onClose: () => void;
  onOpenShareCard: (guide: PocketGuide) => void;
  isBookmarked: boolean;
  onToggleBookmark: (guideId: string) => void;
}

export const GuideViewerModal: React.FC<GuideViewerModalProps> = ({
  guide,
  autoGeneratePdf = false,
  onClose,
  onOpenShareCard,
  isBookmarked,
  onToggleBookmark
}) => {
  const [checkedSteps, setCheckedSteps] = useState<number[]>([]);
  const [isGeneratingPdf, setIsGeneratingPdf] = useState(false);
  const [pdfResult, setPdfResult] = useState<GeneratedPdfResult | null>(null);
  const [sheetZoom, setSheetZoom] = useState<number>(100);

  const printableSheetRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setPdfResult((prev) => {
      if (prev?.blobUrl) URL.revokeObjectURL(prev.blobUrl);
      if (prev?.printableHtmlUrl) URL.revokeObjectURL(prev.printableHtmlUrl);
      return null;
    });
    setSheetZoom(100);

    if (guide && autoGeneratePdf) {
      const timer = setTimeout(() => {
        handlePrintAndExportOfficialForm(true);
      }, 150);
      return () => clearTimeout(timer);
    }
  }, [guide?.id, autoGeneratePdf]);

  if (!guide) return null;

  const toggleStepCheck = (stepNumber: number) => {
    setCheckedSteps((prev) =>
      prev.includes(stepNumber)
        ? prev.filter((s) => s !== stepNumber)
        : [...prev, stepNumber]
    );
  };

  const handlePrintAndExportOfficialForm = async (autoDownload = true) => {
    setIsGeneratingPdf(true);
    try {
      // 1. Trigger unified 1-page A4 iframe print
      triggerUnifiedIframePrint(guide);

      // 2. Also generate the downloadable A4 PDF file & standalone printable HTML URL
      await new Promise((r) => setTimeout(r, 100));
      const result = await generateOfficialGuidePdf(printableSheetRef.current, guide);
      setPdfResult((prev) => {
        if (prev?.blobUrl) URL.revokeObjectURL(prev.blobUrl);
        if (prev?.printableHtmlUrl) URL.revokeObjectURL(prev.printableHtmlUrl);
        return result;
      });
      if (autoDownload) {
        downloadGeneratedPdf(result.blobUrl, result.filename);
      }
    } catch (error) {
      console.error('Error generating unified official PDF:', error);
    } finally {
      setIsGeneratingPdf(false);
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 bg-slate-900/45 backdrop-blur-xs flex items-center justify-center p-2 sm:p-5 print-modal-backdrop"
      dir="rtl"
    >
      <div className="w-full max-w-5xl bg-[#f8fbf9] rounded-3xl max-h-[94vh] flex flex-col overflow-hidden shadow-2xl border border-teal-200/80 print-modal-container">
        {/* Top Action Bar (Hidden when printing) */}
        <div className="px-6 py-3.5 bg-gradient-to-l from-teal-50 via-emerald-50/70 to-sky-50 border-b border-teal-200/80 flex flex-wrap items-center justify-between gap-3 shrink-0 no-print">
          <div className="flex items-center gap-3">
            <span className="font-mono text-xs bg-white text-teal-800 font-semibold px-3 py-1 rounded-lg border border-teal-200 shadow-2xs">
              {guide.arabicCode}
            </span>
            <div className="flex items-center gap-1.5 text-xs font-semibold text-teal-950">
              <FileText className="w-4 h-4 text-teal-700" />
              <span>الفورما الرسمية الموحدة للدليل القياسي (A4) — جامعة المستقبل</span>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {/* Zoom Controls */}
            <div className="hidden md:flex items-center gap-1 bg-white rounded-xl px-2 py-1 border border-teal-200/80">
              <button
                onClick={() => setSheetZoom((z) => Math.max(85, z - 10))}
                className="p-1 text-slate-500 hover:text-teal-800 cursor-pointer"
                title="تصغير الفورما"
              >
                <ZoomOut className="w-3.5 h-3.5" />
              </button>
              <span className="text-[11px] font-mono px-1.5 text-teal-800">{sheetZoom}%</span>
              <button
                onClick={() => setSheetZoom((z) => Math.min(115, z + 10))}
                className="p-1 text-slate-500 hover:text-teal-800 cursor-pointer"
                title="تكبير الفورما"
              >
                <ZoomIn className="w-3.5 h-3.5" />
              </button>
            </div>

            <button
              onClick={() => handlePrintAndExportOfficialForm(true)}
              disabled={isGeneratingPdf}
              className="bg-teal-700 hover:bg-teal-800 disabled:opacity-60 text-white text-xs font-medium px-4 py-2 rounded-xl flex items-center gap-2 shadow-2xs transition-all cursor-pointer"
            >
              {isGeneratingPdf ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span>جاري تجهيز الفورما الموحدة...</span>
                </>
              ) : (
                <>
                  <Printer className="w-4 h-4" />
                  <span>طباعة / تحميل الفورما الموحدة (PDF)</span>
                </>
              )}
            </button>

            <button
              onClick={() => onToggleBookmark(guide.id)}
              className={`p-2 rounded-xl border transition-colors cursor-pointer ${
                isBookmarked
                  ? 'bg-teal-100/80 border-teal-300 text-teal-800'
                  : 'bg-white border-slate-200 text-slate-500 hover:text-slate-800'
              }`}
              title={isBookmarked ? 'محفوظ في المفضلة' : 'حفظ الدليل'}
            >
              {isBookmarked ? <BookmarkCheck className="w-4 h-4" /> : <Bookmark className="w-4 h-4" />}
            </button>

            <button
              onClick={onClose}
              className="w-9 h-9 rounded-xl bg-white border border-slate-200 flex items-center justify-center text-slate-500 hover:text-slate-900 hover:bg-slate-100 transition-colors cursor-pointer"
              title="إغلاق"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Ready PDF & Direct Print Bar (Appears once generated) */}
        {pdfResult && (
          <div className="px-6 py-2.5 bg-teal-50 border-b border-teal-200 flex flex-wrap items-center justify-between gap-3 shrink-0 no-print">
            <div className="flex items-center gap-2 text-xs text-teal-900">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
              <span className="font-semibold">
                تم تجهيز الفورما الرسمية الموحدة بحجم A4 ({pdfResult.filename})
              </span>
              <span className="text-[11px] font-light text-teal-700 hidden sm:inline">
                — منظمة بجدول قياسي موحد لجامعة المستقبل
              </span>
            </div>

            <div className="flex flex-wrap items-center gap-2">
              <button
                onClick={() => downloadGeneratedPdf(pdfResult.blobUrl, pdfResult.filename)}
                className="bg-teal-700 hover:bg-teal-800 text-white text-xs font-medium px-3.5 py-1.5 rounded-xl flex items-center gap-1.5 shadow-2xs transition-all cursor-pointer"
              >
                <Download className="w-3.5 h-3.5" />
                <span>تنزيل ملف PDF الموحد</span>
              </button>

              <a
                href={pdfResult.printableHtmlUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-medium px-3.5 py-1.5 rounded-xl flex items-center gap-1.5 shadow-2xs transition-all cursor-pointer"
              >
                <ExternalLink className="w-3.5 h-3.5" />
                <span>فتح الفورما في نافذة الطباعة المباشرة (A4)</span>
              </a>
            </div>
          </div>
        )}

        {/* Main Scrollable Container showing the Unified Official A4 Form */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-7 bg-[#f2f7f5] flex flex-col items-center print-scroll-body">
          <div
            ref={printableSheetRef}
            style={{
              transform: `scale(${sheetZoom / 100})`,
              transformOrigin: 'top center'
            }}
            className="w-full max-w-[210mm] transition-transform"
          >
            <OfficialGuideFormSheet
              guide={guide}
              checkedSteps={checkedSteps}
              onToggleStep={toggleStepCheck}
              interactive
            />
          </div>
        </div>

        {/* Bottom Modal Footer Bar (Hidden when printing) */}
        <div className="px-6 py-3 border-t border-teal-200/70 bg-white flex flex-wrap items-center justify-between gap-3 shrink-0 no-print">
          <div className="text-xs font-light text-slate-600 flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5 text-teal-600" />
            <span>
              جميع الأدلة مصممة بـ <strong className="font-semibold text-teal-900">فورما رسمية موحدة (A4 SOP Form)</strong> معتمدة لقسم هندسة تقنيات الأجهزة الطبية.
            </span>
          </div>

          <div className="flex items-center gap-2.5">
            <button
              onClick={() => onOpenShareCard(guide)}
              className="bg-slate-50 hover:bg-slate-100 text-slate-700 border border-slate-200 text-xs font-medium py-2 px-4 rounded-xl flex items-center gap-2 transition-colors cursor-pointer"
            >
              <Share2 className="w-3.5 h-3.5 text-teal-700" />
              <span>بطاقة الجيب المختصرة</span>
            </button>

            <button
              onClick={() => handlePrintAndExportOfficialForm(true)}
              disabled={isGeneratingPdf}
              className="bg-teal-700 hover:bg-teal-800 active:scale-98 disabled:opacity-60 text-white text-xs font-medium py-2 px-5 rounded-xl flex items-center gap-2 shadow-2xs transition-all cursor-pointer"
            >
              <Printer className="w-4 h-4" />
              <span>طباعة وتحميل الفورما الموحدة (PDF)</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
