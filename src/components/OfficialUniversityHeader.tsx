import React from 'react';
import { GraduationCap, ShieldCheck } from 'lucide-react';

interface OfficialUniversityHeaderProps {
  documentCode: string;
  issueDate: string;
  pagesCount?: number;
  compact?: boolean;
}

export const OfficialUniversityHeader: React.FC<OfficialUniversityHeaderProps> = ({
  documentCode,
  issueDate,
  compact = false
}) => {
  return (
    <div
      className="w-full bg-[#f4f9f7] border-2 border-teal-700/70 rounded-xl overflow-hidden text-slate-800 print-avoid-break"
      dir="rtl"
    >
      {/* Top Formal Stripe */}
      <div className="h-1.5 w-full bg-gradient-to-l from-teal-700 via-emerald-600 to-amber-500" />

      <div className={`grid grid-cols-1 md:grid-cols-12 items-center ${compact ? 'p-3 gap-3' : 'p-4 gap-4'}`}>
        {/* Right Column (5 cols): Iraqi Ministry & Al-Mustaqbal University Arabic Official Hierarchy */}
        <div className="md:col-span-5 text-right space-y-0.5 border-b md:border-b-0 md:border-l border-teal-200/80 pb-2 md:pb-0 md:pl-3">
          <p className="text-[11px] font-medium text-teal-800">
            جمهورية العراق · وزارة التعليم العالي والبحث العلمي
          </p>
          <h2 className={`${compact ? 'text-sm' : 'text-base'} font-semibold text-slate-900`}>
            جامعة المستقبل — الجامعة الأهلية الأولى في العراق
          </h2>
          <p className="text-xs font-medium text-teal-900">
            كلية التقنيات الهندسية
          </p>
          <p className="text-xs font-semibold text-amber-800">
            قسم هندسة تقنيات الأجهزة الطبية
          </p>
        </div>

        {/* Center Column (3 cols): Official Emblem & Form Type */}
        <div className="md:col-span-3 flex flex-col items-center justify-center text-center py-1">
          <div className="w-11 h-11 rounded-full bg-teal-700/10 border-2 border-teal-700/60 flex items-center justify-center text-teal-800 mb-1">
            <GraduationCap className="w-6 h-6 text-teal-800" />
          </div>
          <span className="text-[11px] font-semibold text-slate-900">
            استمارة الدليل القياسي الموحد
          </span>
          <span className="text-[10px] font-mono text-teal-700">
            AL-MUSTAQBAL UNIVERSITY
          </span>
        </div>

        {/* Left Column (4 cols): Standardized ISO Document Control Table */}
        <div className="md:col-span-4 border-t md:border-t-0 md:border-r border-teal-200/80 pt-2 md:pt-0 md:pr-3">
          <table className="w-full text-[11px] border-collapse border border-teal-300/80 bg-white rounded-lg overflow-hidden">
            <tbody>
              <tr className="border-b border-teal-200/70">
                <td className="py-1 px-2 bg-teal-50/70 font-semibold text-teal-900 border-l border-teal-200/70 w-2/5">
                  رمز الوثيقة:
                </td>
                <td className="py-1 px-2 font-mono font-semibold text-slate-900">
                  {documentCode}
                </td>
              </tr>
              <tr className="border-b border-teal-200/70">
                <td className="py-1 px-2 bg-teal-50/70 font-semibold text-teal-900 border-l border-teal-200/70">
                  تاريخ الإصدار:
                </td>
                <td className="py-1 px-2 font-mono text-slate-700">
                  {issueDate}
                </td>
              </tr>
              <tr className="border-b border-teal-200/70">
                <td className="py-1 px-2 bg-teal-50/70 font-semibold text-teal-900 border-l border-teal-200/70">
                  التصنيف القياسي:
                </td>
                <td className="py-1 px-2 text-teal-800 font-medium">
                  فورما رسمية موحدة (A4)
                </td>
              </tr>
              <tr>
                <td className="py-1 px-2 bg-teal-50/70 font-semibold text-teal-900 border-l border-teal-200/70">
                  حالة الاعتماد:
                </td>
                <td className="py-1 px-2 text-emerald-700 font-semibold flex items-center gap-1">
                  <ShieldCheck className="w-3.5 h-3.5" />
                  <span>معتمد (صفحة 1 / 1)</span>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
