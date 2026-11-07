import React from 'react';
import { ShieldCheck, PhoneCall, Heart, Award, ArrowUp } from 'lucide-react';
import { AppTab } from '../types';

interface DesktopFooterProps {
  onNavigateTab: (tab: AppTab) => void;
  onOpenHotline: () => void;
}

export const DesktopFooter: React.FC<DesktopFooterProps> = ({ onNavigateTab, onOpenHotline }) => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="w-full bg-white border-t border-slate-200 mt-16 text-slate-600 text-right" dir="rtl">
      <div className="max-w-7xl mx-auto px-6 py-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          {/* Col 1: Platform Branding & Mission */}
          <div className="space-y-3">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-xl bg-teal-800 text-white flex items-center justify-center shadow-xs">
                <ShieldCheck className="w-4 h-4 text-teal-200" />
              </div>
              <span className="text-sm font-semibold text-slate-900">سلامة واستدامة</span>
            </div>
            <p className="text-xs font-light text-slate-500 leading-relaxed">
              المنصة التخصصية المعتمدة للتوعية بهندسة الرعاية الصحية والسلامة الإشعاعية والكهربائية للأجهزة الطبية واستراتيجيات المستشفيات الخضراء.
            </p>
          </div>

          {/* Col 2: Four Core Pillars Links */}
          <div className="space-y-2.5">
            <h4 className="text-xs font-semibold text-slate-900">المحاور التخصصية</h4>
            <ul className="space-y-1.5 text-xs font-light text-slate-500">
              <li>
                <button onClick={() => onNavigateTab('modules')} className="hover:text-teal-700 transition-colors cursor-pointer">
                  السلامة والوقاية الإشعاعية (ALARA)
                </button>
              </li>
              <li>
                <button onClick={() => onNavigateTab('modules')} className="hover:text-teal-700 transition-colors cursor-pointer">
                  السلامة الكهربائية الطبية (IEC 60601-1)
                </button>
              </li>
              <li>
                <button onClick={() => onNavigateTab('modules')} className="hover:text-teal-700 transition-colors cursor-pointer">
                  المستشفيات الخضراء وإدارة النفايات (GGHH)
                </button>
              </li>
              <li>
                <button onClick={() => onNavigateTab('modules')} className="hover:text-teal-700 transition-colors cursor-pointer">
                  هندسة الرعاية وإدارة الأصول (AAMI)
                </button>
              </li>
            </ul>
          </div>

          {/* Col 3: Rapid Tools & Resources */}
          <div className="space-y-2.5">
            <h4 className="text-xs font-semibold text-slate-900">الأدوات والحاسبات</h4>
            <ul className="space-y-1.5 text-xs font-light text-slate-500">
              <li>
                <button onClick={() => onNavigateTab('consultation')} className="hover:text-teal-700 transition-colors cursor-pointer">
                  المستشار السريري والهندسي الفوري
                </button>
              </li>
              <li>
                <button onClick={() => onNavigateTab('consultation')} className="hover:text-teal-700 transition-colors cursor-pointer">
                  حاسبة تدريع الإشعاع والمسافة
                </button>
              </li>
              <li>
                <button onClick={() => onNavigateTab('consultation')} className="hover:text-teal-700 transition-colors cursor-pointer">
                  مدقق تيار التسريب للمريض Type CF
                </button>
              </li>
              <li>
                <button onClick={() => onNavigateTab('guides')} className="hover:text-teal-700 transition-colors cursor-pointer">
                  مكتبة أدلة الجيب القابلة للطباعة
                </button>
              </li>
            </ul>
          </div>

          {/* Col 4: Rapid Contact & Emergency */}
          <div className="space-y-3">
            <h4 className="text-xs font-semibold text-slate-900">استجابة الطوارئ</h4>
            <p className="text-xs font-light text-slate-500 leading-relaxed">
              خطوط الاتصال المباشرة لمسؤولي الحماية الإشعاعية (RSO) وهندسة المعدات الطبية متاحة على مدار الساعة.
            </p>
            <button
              onClick={onOpenHotline}
              className="w-full bg-rose-50 hover:bg-rose-100/80 text-rose-800 border border-rose-200 py-2 px-3 rounded-xl text-xs font-medium flex items-center justify-center gap-2 transition-colors cursor-pointer"
            >
              <PhoneCall className="w-3.5 h-3.5 text-rose-600" />
              <span>خطوط طوارئ السلامة (24/7)</span>
            </button>
          </div>
        </div>

        {/* Bottom Copyright and Standards Stamp */}
        <div className="pt-6 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-light text-slate-400">
          <div>
            © 2026 منصة التوعية بالاستدامة والسلامة المهنية الطبية. جميع المعايير مطابقة لأحدث إصدارات ICRP وIEC وWHO.
          </div>

          <button
            onClick={scrollToTop}
            className="flex items-center gap-1.5 text-slate-500 hover:text-teal-700 transition-colors cursor-pointer"
          >
            <span>العودة لأعلى الصفحة</span>
            <ArrowUp className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </footer>
  );
};
