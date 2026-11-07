import React from 'react';
import { ShieldCheck, PhoneCall, Smartphone, Monitor } from 'lucide-react';
import { UserRole } from '../types';

interface HeaderNavProps {
  currentRole: UserRole;
  onRoleChange: (role: UserRole) => void;
  isIPhoneFrame: boolean;
  onToggleFrame: () => void;
  onOpenHotline: () => void;
}

export const HeaderNav: React.FC<HeaderNavProps> = ({
  currentRole,
  onRoleChange,
  isIPhoneFrame,
  onToggleFrame,
  onOpenHotline
}) => {
  const roles: { id: UserRole; label: string }[] = [
    { id: 'visitor', label: 'زائر المنشأة' },
    { id: 'biomedical_engineer', label: 'مهندس طبي' },
    { id: 'nurse', label: 'كادر تمريضي' },
    { id: 'radiologist', label: 'فني/طبيب أشعة' },
    { id: 'hospital_admin', label: 'إدارة المشفى' }
  ];

  return (
    <header className="sticky top-0 z-30 bg-white/90 dark:bg-slate-900/90 backdrop-blur-md border-b border-slate-200/60 dark:border-slate-800/60 transition-colors">
      <div className="max-w-md mx-auto px-4 py-2.5 flex items-center justify-between gap-3">
        {/* Brand & Emblem */}
        <div className="flex items-center gap-2 shrink-0">
          <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-teal-700 to-teal-500 text-white flex items-center justify-center shadow-xs">
            <ShieldCheck className="w-4 h-4" />
          </div>
          <div>
            <h1 className="text-xs font-semibold text-slate-800 dark:text-slate-100 leading-tight">
              سلامة واستدامة
            </h1>
            <p className="text-[10px] font-light text-slate-500 dark:text-slate-400">
              هندسة الرعاية الصحية والوقاية
            </p>
          </div>
        </div>

        {/* Action Controls: Role Select & Hotline & Device Frame Toggle */}
        <div className="flex items-center gap-2">
          {/* Role selector dropdown */}
          <div className="relative">
            <select
              value={currentRole}
              onChange={(e) => onRoleChange(e.target.value as UserRole)}
              className="appearance-none bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-200 text-[11px] font-medium py-1.5 px-2.5 pr-6 rounded-lg border border-slate-200 dark:border-slate-700 focus:outline-none focus:ring-1 focus:ring-emerald-500 cursor-pointer"
              title="تخصيص العرض حسب دورك"
            >
              {roles.map((r) => (
                <option key={r.id} value={r.id}>
                  {r.label}
                </option>
              ))}
            </select>
            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-1.5 text-slate-400">
              ▼
            </div>
          </div>

          {/* Hotline Trigger */}
          <button
            onClick={onOpenHotline}
            className="w-8 h-8 rounded-lg bg-rose-50 dark:bg-rose-950/40 text-rose-600 dark:text-rose-400 border border-rose-200 dark:border-rose-900 flex items-center justify-center hover:bg-rose-100 transition-colors"
            title="أرقام طوارئ السلامة والإشعاع"
          >
            <PhoneCall className="w-4 h-4" />
          </button>

          {/* Toggle iPhone Frame vs Full Responsive */}
          <button
            onClick={onToggleFrame}
            className="hidden sm:flex w-8 h-8 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-slate-700 items-center justify-center hover:bg-slate-200 transition-colors"
            title={isIPhoneFrame ? 'تبديل إلى العرض الكامل' : 'تبديل إلى مظهر الآيفون'}
          >
            {isIPhoneFrame ? <Monitor className="w-4 h-4" /> : <Smartphone className="w-4 h-4" />}
          </button>
        </div>
      </div>
    </header>
  );
};
