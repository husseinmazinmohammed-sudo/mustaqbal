import React, { useState } from 'react';
import { 
  FileText, 
  Download, 
  Bookmark, 
  BookmarkCheck, 
  Search, 
  Share2, 
  Eye, 
  CheckCircle2, 
  ShieldCheck,
  BookOpen,
  Sparkles,
  ArrowLeft
} from 'lucide-react';
import { POCKET_GUIDES } from '../../data/guidesData';
import { PocketGuide } from '../../types';

interface GuidesTabProps {
  onOpenGuideModal: (guide: PocketGuide) => void;
  onOpenShareCardModal: (guide: PocketGuide) => void;
  bookmarkedGuideIds: string[];
  onToggleBookmark: (guideId: string) => void;
}

export const GuidesTab: React.FC<GuidesTabProps> = ({
  onOpenGuideModal,
  onOpenShareCardModal,
  bookmarkedGuideIds,
  onToggleBookmark
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeFilter, setActiveFilter] = useState<'all' | 'radiation' | 'electrical' | 'green_hospital' | 'healthcare_engineering'>('all');

  const filteredGuides = POCKET_GUIDES.filter((guide) => {
    const matchesFilter = activeFilter === 'all' || guide.pillar === activeFilter;
    const matchesSearch =
      guide.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      guide.arabicCode.toLowerCase().includes(searchQuery.toLowerCase()) ||
      guide.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  return (
    <div className="space-y-6 text-slate-700" dir="rtl">
      {/* Top Banner and Search Bar */}
      <div className="bg-white border border-slate-200/80 rounded-3xl p-6 sm:p-8 shadow-2xs space-y-4">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-xl font-semibold text-slate-900 flex items-center gap-2">
              <span>مكتبة أدلة هندسة الرعاية الصحية الاسترشادية</span>
            </h1>
            <p className="text-xs font-light text-slate-500 mt-1">
              كتيبات جيب ملخصة ومطبوعة، معتمدة للتدريب السريري، التوزيع الميداني، والفحص الوقائي
            </p>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-xs text-slate-400 font-light">المحفوظات:</span>
            <span className="bg-teal-50 text-teal-800 text-xs font-mono font-medium px-2.5 py-1 rounded-lg border border-teal-200/60">
              {bookmarkedGuideIds.length} أدلة محفوظة
            </span>
          </div>
        </div>

        {/* Search and Filters Strip */}
        <div className="flex flex-col sm:flex-row items-center gap-3 pt-2">
          <div className="relative flex-1 w-full">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="ابحث برقم الكود، العنوان، أو المعيار (مثال: BME-RAD-01, IEC 60601, ALARA)..."
              className="w-full bg-slate-50 border border-slate-200 rounded-xl py-2.5 px-4 pl-10 text-xs focus:ring-1 focus:ring-teal-500 focus:bg-white focus:outline-none text-slate-900 transition-colors"
            />
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          </div>

          <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar w-full sm:w-auto">
            {[
              { id: 'all', label: 'كافة الأدلة' },
              { id: 'radiation', label: 'الإشعاعية' },
              { id: 'electrical', label: 'الكهربائية' },
              { id: 'green_hospital', label: 'المستشفيات الخضراء' },
              { id: 'healthcare_engineering', label: 'الهندسة الطبية' }
            ].map((item) => (
              <button
                key={item.id}
                onClick={() => setActiveFilter(item.id as any)}
                className={`py-2 px-3 rounded-xl text-xs whitespace-nowrap transition-colors cursor-pointer ${
                  activeFilter === item.id
                    ? 'bg-teal-700 text-white font-medium shadow-2xs'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200 font-light'
                }`}
              >
                {item.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Guides Desktop Grid: 2 columns on desktop */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-stretch">
        {filteredGuides.map((guide) => {
          const isBookmarked = bookmarkedGuideIds.includes(guide.id);

          return (
            <div
              key={guide.id}
              className="bg-white border border-slate-200/80 rounded-3xl p-6 flex flex-col justify-between shadow-2xs hover:border-teal-400 hover:shadow-xs transition-all text-right"
            >
              <div className="space-y-4">
                {/* Card Top Metadata Strip */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-xs bg-slate-100 text-slate-800 font-medium px-2.5 py-1 rounded-lg border border-slate-200/80">
                      {guide.arabicCode}
                    </span>
                    <span className="text-xs text-slate-400 font-light">
                      {guide.pagesCount} صفحة ملخصة · إصدار {guide.updatedDate}
                    </span>
                  </div>

                  <button
                    onClick={() => onToggleBookmark(guide.id)}
                    className={`p-2 rounded-xl border transition-colors cursor-pointer ${
                      isBookmarked
                        ? 'bg-teal-50 border-teal-300 text-teal-700'
                        : 'border-slate-200 text-slate-400 hover:text-slate-600 hover:bg-slate-50'
                    }`}
                    title={isBookmarked ? 'إزالة من المحفوظات' : 'حفظ في ملف الكفاءة الشخصي'}
                  >
                    {isBookmarked ? <BookmarkCheck className="w-4 h-4" /> : <Bookmark className="w-4 h-4" />}
                  </button>
                </div>

                {/* Title & Description */}
                <div>
                  <h2 className="text-base font-semibold text-slate-900 leading-tight">
                    {guide.title}
                  </h2>
                  <p className="text-xs font-light text-slate-500 mt-2 leading-relaxed">
                    {guide.description}
                  </p>
                </div>

                {/* Protocol Highlights */}
                <div className="bg-slate-50/70 p-3.5 rounded-2xl border border-slate-100 space-y-2">
                  <span className="text-xs font-semibold text-teal-800 block">
                    خلاصة البروتوكول التنفيذي:
                  </span>
                  <ul className="space-y-1.5">
                    {guide.keyTakeaways.slice(0, 3).map((takeaway, tIdx) => (
                      <li key={tIdx} className="text-xs font-light text-slate-600 flex items-start gap-2 leading-relaxed">
                        <span className="text-teal-600 font-bold shrink-0 mt-0.5">✔</span>
                        <span>{takeaway}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="pt-4 border-t border-slate-100 mt-4 flex items-center gap-3">
                <button
                  onClick={() => onOpenGuideModal(guide)}
                  className="flex-1 bg-teal-700 hover:bg-teal-800 active:scale-98 text-white text-xs font-medium py-2.5 px-4 rounded-xl flex items-center justify-center gap-2 shadow-2xs transition-all cursor-pointer"
                >
                  <BookOpen className="w-4 h-4" />
                  <span>تصفح الدليل الشامل</span>
                </button>

                <button
                  onClick={() => onOpenShareCardModal(guide)}
                  className="bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-light py-2.5 px-4 rounded-xl flex items-center justify-center gap-2 transition-colors cursor-pointer border border-slate-200/80"
                  title="مشاركة وتوليد بطاقة الجيب الرقمية للطباعة"
                >
                  <Share2 className="w-4 h-4" />
                  <span>بطاقة الجيب للطباعة</span>
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
