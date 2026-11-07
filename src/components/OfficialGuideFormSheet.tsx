import React from 'react';
import { ShieldCheck, QrCode, CheckSquare, Square } from 'lucide-react';
import { PocketGuide } from '../types';
import { OfficialUniversityHeader } from './OfficialUniversityHeader';

interface OfficialGuideFormSheetProps {
  guide: PocketGuide;
  checkedSteps?: number[];
  onToggleStep?: (stepNumber: number) => void;
  interactive?: boolean;
}

/**
 * Renders the PocketGuide in a strictly unified, standardized single-page A4 University Form
 * ("فورما رسمية موحدة ومنظمة جداً") using bordered HTML tables so both screen preview and print/PDF
 * output are 100% aligned, clean, and formal.
 */
export const OfficialGuideFormSheet: React.FC<OfficialGuideFormSheetProps> = ({
  guide,
  checkedSteps = [],
  onToggleStep,
  interactive = true
}) => {
  return (
    <div
      className="w-full bg-white text-slate-800 border-2 border-teal-800/75 rounded-xl p-5 sm:p-7 space-y-4 shadow-2xs print-avoid-break"
      dir="rtl"
    >
      {/* 1. Unified University & Document Control Header */}
      <OfficialUniversityHeader
        documentCode={guide.arabicCode}
        issueDate={guide.updatedDate}
        pagesCount={1}
      />

      {/* 2. Section I: Unified Document Identification Table */}
      <div className="space-y-1.5">
        <div className="bg-teal-700 text-white text-xs font-semibold px-3.5 py-1.5 rounded-t-lg flex items-center justify-between">
          <span>القسم الأول: بيانات الوثيقة القياسية والمجال التطبيقي</span>
          <span className="font-mono text-[11px] text-teal-100">SECTION 01 · DOCUMENT IDENTIFICATION</span>
        </div>
        <table className="w-full text-right border-collapse border border-slate-300 text-xs">
          <tbody>
            <tr className="border-b border-slate-300">
              <td className="py-2 px-3 bg-teal-50/70 font-semibold text-teal-950 border-l border-slate-300 w-1/5">
                عنوان الدليل الرسمي:
              </td>
              <td className="py-2 px-3 font-semibold text-slate-900 border-l border-slate-300 w-2/5">
                {guide.title}
              </td>
              <td className="py-2 px-3 bg-teal-50/70 font-semibold text-teal-950 border-l border-slate-300 w-1/6">
                المعايير الدولية:
              </td>
              <td className="py-2 px-3 font-mono text-[11px] text-teal-900">
                {guide.standardsReference.join(' | ')}
              </td>
            </tr>
            <tr className="border-b border-slate-300">
              <td className="py-2 px-3 bg-teal-50/70 font-semibold text-teal-950 border-l border-slate-300">
                العنوان القياسي (EN):
              </td>
              <td colSpan={3} className="py-2 px-3 font-mono text-xs text-slate-700 text-left" dir="ltr">
                {guide.englishTitle}
              </td>
            </tr>
            <tr>
              <td className="py-2 px-3 bg-teal-50/70 font-semibold text-teal-950 border-l border-slate-300">
                النطاق والهدف السريري:
              </td>
              <td colSpan={3} className="py-2 px-3 font-light text-slate-700 leading-relaxed">
                {guide.description}
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      {/* 3. Section II: Mandatory Executive Safety Rules Table */}
      <div className="space-y-1.5">
        <div className="bg-teal-700 text-white text-xs font-semibold px-3.5 py-1.5 rounded-t-lg flex items-center justify-between">
          <span>القسم الثاني: المرتكزات والقواعد الإلزامية للسلامة المهنية والسريرية</span>
          <span className="font-mono text-[11px] text-teal-100">SECTION 02 · MANDATORY SAFETY RULES</span>
        </div>
        <table className="w-full text-right border-collapse border border-slate-300 text-xs">
          <thead>
            <tr className="bg-teal-50/90 text-teal-950 border-b border-slate-300">
              <th className="py-2 px-3 font-semibold border-l border-slate-300 w-14 text-center">رقم القاعدة</th>
              <th className="py-2 px-3 font-semibold border-l border-slate-300">القاعدة الإلزامية المعتمدة في المنشأة الصحية</th>
              <th className="py-2 px-3 font-semibold w-28 text-center">درجة الإلزام</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-300">
            {guide.keyTakeaways.map((rule, idx) => (
              <tr key={idx} className={idx % 2 === 0 ? 'bg-white' : 'bg-slate-50/60'}>
                <td className="py-2 px-3 font-mono font-semibold text-teal-800 border-l border-slate-300 text-center">
                  0{idx + 1}
                </td>
                <td className="py-2 px-3 font-light text-slate-800 border-l border-slate-300 leading-relaxed">
                  {rule}
                </td>
                <td className="py-2 px-3 text-center">
                  <span className="text-[10px] font-semibold bg-emerald-50 text-emerald-800 border border-emerald-200 px-2 py-0.5 rounded-md">
                    إلزامي قياسي
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* 4. Section III: Technical Specification & Permissible Limits Table */}
      <div className="space-y-1.5">
        <div className="bg-teal-700 text-white text-xs font-semibold px-3.5 py-1.5 rounded-t-lg flex items-center justify-between">
          <span>القسم الثالث: {guide.specTable.title}</span>
          <span className="font-mono text-[11px] text-teal-100">SECTION 03 · STANDARD PARAMETERS</span>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-right border-collapse border border-slate-300 text-xs">
            <thead>
              <tr className="bg-teal-50/90 text-teal-950 border-b border-slate-300">
                {guide.specTable.headers.map((header, hIdx) => (
                  <th
                    key={hIdx}
                    className="py-2 px-3 font-semibold border-l border-slate-300 last:border-l-0"
                  >
                    {header}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-300">
              {guide.specTable.rows.map((row, rIdx) => (
                <tr key={rIdx} className={rIdx % 2 === 0 ? 'bg-white' : 'bg-slate-50/60'}>
                  {row.map((cell, cIdx) => (
                    <td
                      key={cIdx}
                      className={`py-2 px-3 border-l border-slate-300 last:border-l-0 leading-relaxed ${
                        cIdx === 0
                          ? 'font-semibold text-slate-900'
                          : cIdx === 1
                          ? 'font-mono font-semibold text-teal-800'
                          : 'font-light text-slate-700'
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
      </div>

      {/* 5. Section IV: Unified Field Execution & Inspection Protocol Table */}
      <div className="space-y-1.5">
        <div className="bg-teal-700 text-white text-xs font-semibold px-3.5 py-1.5 rounded-t-lg flex items-center justify-between">
          <span>القسم الرابع: جدول البروتوكول التنفيذي الميداني وقائمة الفحص الحرجة</span>
          <span className="font-mono text-[11px] text-teal-100">SECTION 04 · SOP EXECUTION MATRIX</span>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-right border-collapse border border-slate-300 text-xs">
            <thead>
              <tr className="bg-teal-50/90 text-teal-950 border-b border-slate-300">
                <th className="py-2 px-2.5 font-semibold border-l border-slate-300 w-12 text-center">ت</th>
                <th className="py-2 px-3 font-semibold border-l border-slate-300 w-1/4">المرحلة / الإجراء القياسي</th>
                <th className="py-2 px-3 font-semibold border-l border-slate-300">التوصيف الهندسي والسريري للتنفيذ</th>
                <th className="py-2 px-3 font-semibold border-l border-slate-300 w-1/4">معيار التدقيق الحرج (القبول)</th>
                <th className="py-2 px-2.5 font-semibold w-16 text-center">المطابقة</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-300">
              {guide.protocolSteps.map((step) => {
                const isChecked = checkedSteps.includes(step.stepNumber);
                return (
                  <tr
                    key={step.stepNumber}
                    onClick={() => interactive && onToggleStep && onToggleStep(step.stepNumber)}
                    className={`${
                      isChecked ? 'bg-teal-50/50' : step.stepNumber % 2 === 1 ? 'bg-white' : 'bg-slate-50/60'
                    } ${interactive && onToggleStep ? 'cursor-pointer hover:bg-teal-50/30' : ''}`}
                  >
                    <td className="py-2 px-2.5 font-mono font-semibold text-slate-900 border-l border-slate-300 text-center">
                      0{step.stepNumber}
                    </td>
                    <td className="py-2 px-3 font-semibold text-slate-900 border-l border-slate-300">
                      {step.title}
                    </td>
                    <td className="py-2 px-3 font-light text-slate-700 border-l border-slate-300 leading-relaxed">
                      {step.action}
                    </td>
                    <td className="py-2 px-3 font-medium text-amber-900 bg-amber-50/40 border-l border-slate-300 leading-relaxed">
                      {step.criticalCheck}
                    </td>
                    <td className="py-2 px-2.5 text-center">
                      <div className="inline-flex items-center justify-center">
                        {isChecked ? (
                          <CheckSquare className="w-4 h-4 text-teal-700" />
                        ) : (
                          <Square className="w-4 h-4 text-slate-400" />
                        )}
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* 6. Section V: Unified Official Approval & Sign-off Table */}
      <div className="pt-1">
        <table className="w-full text-right border-collapse border border-teal-700/60 text-xs bg-[#f4f9f7]">
          <tbody>
            <tr>
              <td className="py-3 px-4 border-l border-teal-700/40 w-1/3 align-top">
                <p className="font-semibold text-teal-950">إعداد وتدقيق المحتوى الهندسي:</p>
                <p className="font-light text-slate-700 mt-0.5">قسم هندسة تقنيات الأجهزة الطبية</p>
                <p className="font-light text-slate-600">كلية التقنيات الهندسية — جامعة المستقبل</p>
                <p className="text-[10px] font-mono text-teal-800 mt-1.5">التوقيع الهندسي المعتمد: ________________</p>
              </td>
              <td className="py-3 px-4 border-l border-teal-700/40 w-1/3 text-center align-middle">
                <div className="inline-flex flex-col items-center justify-center border-2 border-dashed border-teal-700/70 rounded-xl px-4 py-2 bg-white">
                  <div className="flex items-center gap-1 text-teal-800 font-semibold text-[11px]">
                    <ShieldCheck className="w-4 h-4 text-teal-700" />
                    <span>الختم الرسمي الموحد</span>
                  </div>
                  <span className="text-[10px] text-slate-700 font-medium">
                    جامعة المستقبل — الجامعة الأهلية الأولى في العراق
                  </span>
                  <span className="text-[10px] font-mono text-teal-700">
                    FORM-ID: {guide.arabicCode}
                  </span>
                </div>
              </td>
              <td className="py-3 px-4 w-1/3 align-top">
                <div className="flex items-center justify-between gap-2">
                  <div>
                    <p className="font-semibold text-teal-950">مصادقة الجودة والسلامة المهنية:</p>
                    <p className="font-light text-slate-700 mt-0.5">وحدة الوقاية الإشعاعية والسلامة السريرية</p>
                    <p className="text-[10px] font-mono text-teal-800 mt-1.5">اعتماد رئاسة القسم: ________________</p>
                  </div>
                  <QrCode className="w-11 h-11 text-teal-900 shrink-0" />
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};
