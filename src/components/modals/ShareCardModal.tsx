import React, { useState, useRef, useEffect } from 'react';
import { X, Copy, Check, Printer, ShieldCheck, QrCode, CheckCircle2, Download, ExternalLink, Loader2 } from 'lucide-react';
import { PocketGuide } from '../../types';
import { OfficialUniversityHeader } from '../OfficialUniversityHeader';
import {
  generateOfficialGuidePdf,
  downloadGeneratedPdf,
  triggerUnifiedIframePrint,
  GeneratedPdfResult
} from '../../services/pdfExportService';

interface ShareCardModalProps {
  guide: PocketGuide | null;
  onClose: () => void;
}

export const ShareCardModal: React.FC<ShareCardModalProps> = ({ guide, onClose }) => {
  const [copied, setCopied] = useState(false);
  const [isGeneratingPdf, setIsGeneratingPdf] = useState(false);
  const [pdfResult, setPdfResult] = useState<GeneratedPdfResult | null>(null);
  const cardSheetRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setPdfResult((prev) => {
      if (prev?.blobUrl) URL.revokeObjectURL(prev.blobUrl);
      if (prev?.printableHtmlUrl) URL.revokeObjectURL(prev.printableHtmlUrl);
      return null;
    });
  }, [guide?.id]);

  if (!guide) return null;

  const handleCopyText = () => {
    navigator.clipboard.writeText(guide.pdfSummary);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const handleGeneratePocketPdf = async () => {
    setIsGeneratingPdf(true);
    try {
      triggerUnifiedIframePrint(guide);
      await new Promise((r) => setTimeout(r, 100));
      const result = await generateOfficialGuidePdf(cardSheetRef.current, guide);
      const pocketFilename = `AlMustaqbal_PocketForm_${guide.arabicCode}.pdf`;
      const finalResult = { ...result, filename: pocketFilename };
      setPdfResult((prev) => {
        if (prev?.blobUrl) URL.revokeObjectURL(prev.blobUrl);
        if (prev?.printableHtmlUrl) URL.revokeObjectURL(prev.printableHtmlUrl);
        return finalResult;
      });
      downloadGeneratedPdf(finalResult.blobUrl, finalResult.filename);
    } catch (err) {
      console.error('Error generating pocket card PDF:', err);
    } finally {
      setIsGeneratingPdf(false);
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 bg-slate-900/45 backdrop-blur-xs flex items-center justify-center p-4 print-modal-backdrop"
      dir="rtl"
    >
      <div className="w-full max-w-2xl bg-white rounded-3xl overflow-hidden shadow-2xl border border-teal-200/80 flex flex-col max-h-[92vh] print-modal-container">
        {/* Top Bar (Hidden in Print) */}
        <div className="px-6 py-3.5 bg-gradient-to-l from-teal-50 via-emerald-50/70 to-sky-50 border-b border-teal-200/80 flex items-center justify-between no-print">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-teal-700" />
            <span className="text-xs font-semibold text-teal-950">
              بطاقة الجيب الاسترشادية الموحدة (PDF) — جامعة المستقبل
            </span>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-xl bg-white border border-slate-200 flex items-center justify-center text-slate-500 hover:text-slate-900 cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Ready PDF Banner */}
        {pdfResult && (
          <div className="px-6 py-2.5 bg-teal-50 border-b border-teal-200 text-teal-950 flex flex-wrap items-center justify-between gap-2 text-xs no-print">
            <span className="font-semibold text-teal-900">
              تم تجهيز الفورما المختصرة بنجاح ({pdfResult.filename})
            </span>
            <div className="flex items-center gap-2">
              <button
                onClick={() => downloadGeneratedPdf(pdfResult.blobUrl, pdfResult.filename)}
                className="bg-teal-700 hover:bg-teal-800 text-white px-3 py-1 rounded-lg text-[11px] font-medium flex items-center gap-1 cursor-pointer"
              >
                <Download className="w-3 h-3" />
                <span>تنزيل .PDF</span>
              </button>
              <a
                href={pdfResult.printableHtmlUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-emerald-600 hover:bg-emerald-700 text-white px-3 py-1 rounded-lg text-[11px] font-semibold flex items-center gap-1 cursor-pointer"
              >
                <ExternalLink className="w-3 h-3" />
                <span>فتح للطباعة المباشرة</span>
              </a>
            </div>
          </div>
        )}

        {/* Printable Pocket Card Content */}
        <div className="p-6 overflow-y-auto bg-white text-right print-scroll-body">
          <div ref={cardSheetRef} className="space-y-3.5 bg-white p-4 border-2 border-teal-700/70 rounded-xl">
            <OfficialUniversityHeader
              documentCode={guide.arabicCode}
              issueDate={guide.updatedDate}
              compact
            />

            <table className="w-full text-right border-collapse border border-slate-300 text-xs">
              <tbody>
                <tr className="border-b border-slate-300">
                  <td className="py-2 px-3 bg-teal-50/70 font-semibold text-teal-950 border-l border-slate-300 w-1/4">
                    عنوان البطاقة:
                  </td>
                  <td className="py-2 px-3 font-semibold text-slate-900">
                    {guide.title}
                  </td>
                </tr>
                <tr>
                  <td className="py-2 px-3 bg-teal-50/70 font-semibold text-teal-950 border-l border-slate-300">
                    الملخص السريري:
                  </td>
                  <td className="py-2 px-3 font-light text-slate-700 leading-relaxed">
                    {guide.description}
                  </td>
                </tr>
              </tbody>
            </table>

            {/* Key Takeaways Table */}
            <table className="w-full text-right border-collapse border border-slate-300 text-xs">
              <thead>
                <tr className="bg-teal-50/90 text-teal-950 border-b border-slate-300">
                  <th className="py-2 px-3 font-semibold border-l border-slate-300 w-12 text-center">ت</th>
                  <th className="py-2 px-3 font-semibold">ملخص قواعد السلامة السريعة المعتمدة</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-300">
                {guide.keyTakeaways.map((item, idx) => (
                  <tr key={idx} className={idx % 2 === 0 ? 'bg-white' : 'bg-slate-50/60'}>
                    <td className="py-1.5 px-3 font-mono font-semibold text-teal-800 border-l border-slate-300 text-center">
                      0{idx + 1}
                    </td>
                    <td className="py-1.5 px-3 font-light text-slate-800 leading-relaxed">
                      {item}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            {/* Compact Reference Table */}
            <div className="overflow-x-auto">
              <table className="w-full text-right border-collapse border border-slate-300 text-xs">
                <thead>
                  <tr className="bg-teal-50/90 text-teal-950 border-b border-slate-300">
                    {guide.specTable.headers.slice(0, 3).map((h, i) => (
                      <th key={i} className="py-2 px-3 font-semibold border-l border-slate-300 last:border-l-0">
                        {h}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-300">
                  {guide.specTable.rows.map((r, rIdx) => (
                    <tr key={rIdx} className={rIdx % 2 === 0 ? 'bg-white' : 'bg-slate-50/60'}>
                      {r.slice(0, 3).map((cell, cIdx) => (
                        <td
                          key={cIdx}
                          className={`py-1.5 px-3 border-l border-slate-300 last:border-l-0 ${
                            cIdx === 0 ? 'font-medium text-slate-900' : cIdx === 1 ? 'font-mono text-teal-800 font-semibold' : 'font-light text-slate-700'
                          }`}
                        >
                          {cell}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* QR Verification Strip */}
            <div className="bg-[#f4f9f7] p-3 rounded-xl border border-teal-300/80 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <QrCode className="w-9 h-9 text-teal-800 shrink-0" />
                <div>
                  <span className="text-xs font-semibold text-slate-900 block">
                    جامعة المستقبل — كلية التقنيات الهندسية — قسم هندسة تقنيات الأجهزة الطبية
                  </span>
                  <span className="text-[10px] text-teal-700 font-mono">
                    VERIFIED-AMU-BME-{guide.arabicCode}
                  </span>
                </div>
              </div>
              <span className="text-xs font-medium text-teal-800 bg-white px-2.5 py-1 rounded-lg border border-teal-200">
                فورما جيب معتمدة
              </span>
            </div>
          </div>
        </div>

        {/* Footer Buttons (Hidden in Print) */}
        <div className="px-6 py-3.5 border-t border-slate-200 bg-slate-50 flex items-center gap-3 no-print">
          <button
            onClick={handleCopyText}
            className="flex-1 bg-white hover:bg-slate-100 text-slate-800 border border-slate-200 text-xs font-medium py-2.5 px-4 rounded-xl flex items-center justify-center gap-1.5 transition-all cursor-pointer"
          >
            {copied ? <Check className="w-4 h-4 text-teal-700" /> : <Copy className="w-4 h-4 text-slate-500" />}
            <span>{copied ? 'تم نسخ الملخص بنجاح!' : 'نسخ نص الملخص'}</span>
          </button>

          <button
            onClick={handleGeneratePocketPdf}
            disabled={isGeneratingPdf}
            className="flex-1 bg-teal-700 hover:bg-teal-800 active:scale-98 disabled:opacity-60 text-white text-xs font-medium py-2.5 px-4 rounded-xl flex items-center justify-center gap-2 transition-all shadow-2xs cursor-pointer"
          >
            {isGeneratingPdf ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                <span>جاري تجهيز الفورما...</span>
              </>
            ) : (
              <>
                <Printer className="w-4 h-4" />
                <span>طباعة / تحميل البطاقة الموحدة (PDF)</span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};
