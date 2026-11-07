import React from 'react';
import { 
  ShieldCheck, 
  PhoneCall, 
  Activity, 
  Home, 
  BookOpen, 
  MessageSquareText, 
  FileText, 
  UserCheck,
  Sparkles,
  ChevronDown
} from 'lucide-react';
import { AppTab, UserRole } from '../types';

interface DesktopNavbarProps {
  activeTab: AppTab;
  onTabChange: (tab: AppTab) => void;
  currentRole: UserRole;
  onRoleChange: (role: UserRole) => void;
  savedGuidesCount: number;
  onOpenHotline: () => void;
}

export const DesktopNavbar: React.FC<DesktopNavbarProps> = ({
  activeTab,
  onTabChange,
  currentRole,
  onRoleChange,
  savedGuidesCount,
  onOpenHotline
}) => {
  const roles: { id: UserRole; label: string; desc: string }[] = [
    { id: 'visitor', label: 'زائر المنشأة', desc: 'إرشادات السلامة العامة' },
    { id: 'biomedical_engineer', label: 'مهندس أجهزة طبية', desc: 'معايير IEC & PPM' },
    { id: 'nurse', label: 'كادر تمريضي', desc: 'سلامة الأجهزة والمريض' },
    { id: 'radiologist', label: 'أخصائي أشعة', desc: 'بروتوكولات ALARA' },
    { id: 'hospital_admin', label: 'إدارة المستشفى', desc: 'مؤشرات الاستدامة GGHH' }
  ];

  const navLinks: { id: AppTab; label: string; icon: React.FC<{ className?: string }> }[] = [
    { id: 'home', label: 'الرئيسية والمحاور', icon: Home },
    { id: 'modules', label: 'العروض التثقيفية', icon: BookOpen },
    { id: 'consultation', label: 'الاستشارات والحاسبات', icon: MessageSquareText },
    { id: 'guides', label: 'أدلة هندسة الرعاية', icon: FileText },
    { id: 'profile', label: 'ملف الكفاءة والأوسمة', icon: UserCheck }
  ];

  return (
    <header className="sticky top-0 z-40 w-full clinical-glass border-b border-slate-200/80 transition-all shadow-xs" dir="rtl">
      {/* Top Announcement Bar: Live Safety Standard Telemetry */}
      <div className="w-full bg-slate-900 text-slate-200 px-6 py-1.5 text-xs border-b border-slate-800 flex items-center justify-between">
        <div className="max-w-7xl mx-auto w-full flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="flex items-center gap-1.5 font-light text-slate-300">
              <span className="w-2 h-2 rounded-full bg-teal-400 animate-pulse"></span>
              <span className="text-teal-300 font-medium">المنصة المعتمدة:</span>
              <span>معايير الأمان الإشعاعي والكهربائي والمستشفيات الخضراء 2026</span>
            </span>
            <span className="text-slate-600 hidden md:inline">|</span>
            <span className="text-slate-400 font-mono text-[11px] hidden md:inline">
              ICRP 103 · IEC 60601-1 · WHO GGHH · AAMI EQ56
            </span>
          </div>

          <div className="flex items-center gap-4 text-xs font-light">
            <span className="text-slate-400 hidden sm:inline">نظام الاستجابة الطبية الموحد</span>
            <button
              onClick={onOpenHotline}
              className="flex items-center gap-1.5 text-rose-300 hover:text-white bg-rose-500/20 hover:bg-rose-500/30 px-2.5 py-0.5 rounded-full border border-rose-500/30 transition-colors cursor-pointer"
            >
              <PhoneCall className="w-3 h-3 text-rose-400" />
              <span className="font-medium text-[11px]">طوارئ السلامة 24/7</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main Desktop Top Navigation Bar */}
      <div className="max-w-7xl mx-auto px-6 py-3 flex items-center justify-between gap-6">
        {/* Zone 1: Brand & Clinical Logo */}
        <div 
          onClick={() => onTabChange('home')}
          className="flex items-center gap-3 cursor-pointer shrink-0 group select-none"
        >
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-teal-800 to-teal-600 text-white flex items-center justify-center shadow-sm group-hover:scale-105 transition-transform">
            <ShieldCheck className="w-5 h-5 text-teal-100" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-base font-semibold text-slate-900 tracking-tight">
                سلامة واستدامة
              </span>
              <span className="text-[10px] bg-teal-50 text-teal-700 font-mono font-medium px-2 py-0.5 rounded-full border border-teal-200/60">
                رعاية ذكية
              </span>
            </div>
            <p className="text-xs font-light text-slate-500">
              منصة التوعية المهنية وهندسة الرعاية الصحية
            </p>
          </div>
        </div>

        {/* Zone 2: Navigation Links (Desktop 5 Destinations) */}
        <nav className="hidden lg:flex items-center gap-1">
          {navLinks.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;

            return (
              <button
                key={tab.id}
                onClick={() => onTabChange(tab.id)}
                className={`relative flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs transition-all cursor-pointer whitespace-nowrap ${
                  isActive
                    ? 'bg-teal-50 text-teal-900 font-semibold shadow-2xs border border-teal-200/80'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100/70 font-light'
                }`}
              >
                <Icon className={`w-4 h-4 ${isActive ? 'text-teal-700' : 'text-slate-400'}`} />
                <span>{tab.label}</span>
                {tab.id === 'guides' && savedGuidesCount > 0 && (
                  <span className="w-4 h-4 rounded-full bg-teal-700 text-white text-[10px] font-bold flex items-center justify-center">
                    {savedGuidesCount}
                  </span>
                )}
              </button>
            );
          })}
        </nav>

        {/* Zone 3: Role Selector & Direct Actions */}
        <div className="flex items-center gap-3 shrink-0">
          {/* Role switcher for personalized clinical content */}
          <div className="relative flex items-center bg-white border border-slate-200 rounded-xl px-2.5 py-1.5 shadow-2xs hover:border-slate-300 transition-colors">
            <span className="text-[11px] font-light text-slate-400 ml-1.5 hidden sm:inline">
              عرض مخصص لـ:
            </span>
            <select
              value={currentRole}
              onChange={(e) => onRoleChange(e.target.value as UserRole)}
              className="appearance-none bg-transparent text-xs font-medium text-slate-800 pr-5 focus:outline-none cursor-pointer"
            >
              {roles.map((r) => (
                <option key={r.id} value={r.id}>
                  {r.label}
                </option>
              ))}
            </select>
            <ChevronDown className="w-3.5 h-3.5 text-slate-400 pointer-events-none absolute left-2" />
          </div>

          {/* Quick CTA to Ask Specialist or Book */}
          <button
            onClick={() => onTabChange('consultation')}
            className="hidden sm:flex items-center gap-2 bg-teal-700 hover:bg-teal-800 active:scale-98 text-white px-4 py-2 rounded-xl text-xs font-medium shadow-xs transition-all cursor-pointer"
          >
            <Sparkles className="w-3.5 h-3.5 text-teal-200" />
            <span>طلب استشارة فورية</span>
          </button>
        </div>
      </div>

      {/* Mobile/Tablet Secondary Nav Strip (when screen is under lg) */}
      <div className="lg:hidden flex items-center gap-1 px-4 pb-2.5 overflow-x-auto no-scrollbar border-t border-slate-100 pt-2">
        {navLinks.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;

          return (
            <button
              key={tab.id}
              onClick={() => onTabChange(tab.id)}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs whitespace-nowrap transition-all ${
                isActive
                  ? 'bg-teal-700 text-white font-medium shadow-2xs'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              <Icon className="w-3.5 h-3.5" />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>
    </header>
  );
};
