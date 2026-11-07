import React, { useState, useRef, useEffect } from 'react';
import { 
  ShieldCheck, 
  PhoneCall, 
  Home, 
  BookOpen, 
  MessageSquareText, 
  FileText, 
  UserCheck,
  ChevronDown,
  MailCheck,
  Bell,
  BellRing,
  CheckCheck,
  Calendar,
  ClipboardList,
  Sparkles,
  Trash2,
  ArrowLeft
} from 'lucide-react';
import { AppTab, UserRole, AppNotification } from '../types';
import { TARGET_NOTIFICATION_EMAIL } from '../services/googleWorkspaceAuth';

interface DesktopNavbarProps {
  activeTab: AppTab;
  onTabChange: (tab: AppTab) => void;
  currentRole: UserRole;
  onRoleChange: (role: UserRole) => void;
  savedGuidesCount: number;
  onOpenHotline: () => void;
  notifications: AppNotification[];
  onMarkNotificationRead: (id: string) => void;
  onMarkAllNotificationsRead: () => void;
  onDeleteNotification: (id: string) => void;
  onNotificationNavigate: (notification: AppNotification) => void;
}

export const DesktopNavbar: React.FC<DesktopNavbarProps> = ({
  activeTab,
  onTabChange,
  currentRole,
  onRoleChange,
  savedGuidesCount,
  onOpenHotline,
  notifications,
  onMarkNotificationRead,
  onMarkAllNotificationsRead,
  onDeleteNotification,
  onNotificationNavigate
}) => {
  const [isNotifOpen, setIsNotifOpen] = useState(false);
  const [notifFilter, setNotifFilter] = useState<'all' | 'consultation_reminder' | 'profile_task'>('all');
  const dropdownRef = useRef<HTMLDivElement>(null);

  const unreadCount = notifications.filter((n) => !n.isRead).length;

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setIsNotifOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const roles: { id: UserRole; label: string }[] = [
    { id: 'visitor', label: 'زائر المنشأة' },
    { id: 'biomedical_engineer', label: 'مهندس أجهزة طبية' },
    { id: 'nurse', label: 'كادر تمريضي' },
    { id: 'radiologist', label: 'أخصائي أشعة' },
    { id: 'hospital_admin', label: 'إدارة المستشفى' }
  ];

  const navLinks: { id: AppTab; label: string; icon: React.FC<{ className?: string }> }[] = [
    { id: 'home', label: 'الرئيسية والمحاور', icon: Home },
    { id: 'modules', label: 'العروض التثقيفية', icon: BookOpen },
    { id: 'consultation', label: 'الاستشارات والحاسبات', icon: MessageSquareText },
    { id: 'guides', label: 'أدلة هندسة الرعاية', icon: FileText },
    { id: 'profile', label: 'ملف الكفاءة والتنبيهات', icon: UserCheck }
  ];

  const filteredNotifications = notifications.filter((n) => {
    if (notifFilter === 'all') return true;
    return n.category === notifFilter;
  });

  const getCategoryIcon = (cat: AppNotification['category']) => {
    switch (cat) {
      case 'consultation_reminder':
        return <Calendar className="w-4 h-4 text-purple-700" />;
      case 'profile_task':
        return <ClipboardList className="w-4 h-4 text-amber-700" />;
      default:
        return <Sparkles className="w-4 h-4 text-teal-700" />;
    }
  };

  return (
    <header className="sticky top-0 z-40 w-full clinical-glass border-b border-teal-200/70 transition-all shadow-2xs no-print" dir="rtl">
      {/* Top Gentle Pastel Academic & Clinical Announcement Bar */}
      <div className="w-full bg-gradient-to-l from-teal-50 via-emerald-50/70 to-sky-50 text-teal-950 px-6 py-1.5 text-xs border-b border-teal-200/60">
        <div className="max-w-7xl mx-auto w-full flex flex-wrap items-center justify-between gap-2">
          <div className="flex items-center gap-2.5">
            <span className="w-2 h-2 rounded-full bg-teal-600"></span>
            <span className="text-teal-900 font-semibold">جامعة المستقبل (الجامعة الأهلية الأولى في العراق)</span>
            <span className="text-teal-400 hidden sm:inline">·</span>
            <span className="text-slate-600 font-light hidden sm:inline">
              كلية التقنيات الهندسية — قسم هندسة تقنيات الأجهزة الطبية
            </span>
          </div>

          <div className="flex items-center gap-3 text-xs font-light">
            <span className="text-teal-700 font-mono text-[11px] hidden xl:inline">
              ICRP 103 · IEC 60601-1 · WHO GGHH · AAMI EQ56
            </span>
            <button
              onClick={onOpenHotline}
              className="flex items-center gap-1.5 text-rose-800 hover:text-rose-900 bg-rose-50 hover:bg-rose-100/80 px-2.5 py-0.5 rounded-full border border-rose-200 transition-colors cursor-pointer"
            >
              <PhoneCall className="w-3 h-3 text-rose-600" />
              <span className="font-medium text-[11px]">طوارئ السلامة 24/7</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main Desktop Top Navigation Bar */}
      <div className="max-w-7xl mx-auto px-6 py-3 flex items-center justify-between gap-4">
        {/* Zone 1: Brand & Clinical Logo */}
        <div 
          onClick={() => onTabChange('home')}
          className="flex items-center gap-3 cursor-pointer shrink-0 group select-none"
        >
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-teal-700 to-emerald-600 text-white flex items-center justify-center shadow-2xs group-hover:scale-105 transition-transform">
            <ShieldCheck className="w-5 h-5 text-teal-50" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-base font-semibold text-slate-900 tracking-tight whitespace-nowrap">
                سلامة واستدامة
              </span>
              <span className="text-[10px] bg-teal-50 text-teal-800 font-mono font-medium px-2 py-0.5 rounded-md border border-teal-200/70">
                AMU · BME
              </span>
            </div>
            <p className="text-[11px] font-light text-slate-500 whitespace-nowrap">
              قسم هندسة تقنيات الأجهزة الطبية — جامعة المستقبل
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
                  <span className="w-4 h-4 rounded-full bg-teal-700 text-white text-[10px] font-mono font-semibold flex items-center justify-center">
                    {savedGuidesCount}
                  </span>
                )}
                {tab.id === 'profile' && unreadCount > 0 && (
                  <span className="w-4 h-4 rounded-full bg-amber-500 text-slate-950 text-[10px] font-mono font-semibold flex items-center justify-center">
                    {unreadCount}
                  </span>
                )}
              </button>
            );
          })}
        </nav>

        {/* Zone 3: In-App Notifications Bell, Role Selector & Automatic Email Status Badge */}
        <div className="flex items-center gap-2.5 shrink-0">
          {/* In-App Notifications Dropdown Trigger */}
          <div className="relative" ref={dropdownRef}>
            <button
              type="button"
              onClick={() => setIsNotifOpen((prev) => !prev)}
              className={`relative p-2 rounded-xl border transition-all cursor-pointer flex items-center gap-1.5 ${
                unreadCount > 0
                  ? 'bg-amber-50/90 border-amber-300 text-amber-900 hover:bg-amber-100'
                  : 'bg-white border-slate-200 text-slate-600 hover:bg-slate-50'
              }`}
              title="مركز التنبيهات وتذكير الاستشارات والمهام"
            >
              {unreadCount > 0 ? (
                <BellRing className="w-4 h-4 text-amber-600 animate-pulse" />
              ) : (
                <Bell className="w-4 h-4 text-slate-500" />
              )}
              <span className="text-xs font-medium hidden sm:inline">التنبيهات</span>
              {unreadCount > 0 && (
                <span className="min-w-4 h-4 px-1 rounded-full bg-teal-700 text-white text-[10px] font-mono font-semibold flex items-center justify-center">
                  {unreadCount}
                </span>
              )}
            </button>

            {/* Notifications Popover Panel */}
            {isNotifOpen && (
              <div className="absolute left-0 mt-2 w-80 sm:w-96 bg-white rounded-3xl shadow-2xl border border-teal-200 overflow-hidden z-50 text-right">
                <div className="p-4 bg-gradient-to-l from-teal-50 via-emerald-50/70 to-sky-50 text-teal-950 border-b border-teal-200/80 flex items-center justify-between">
                  <div>
                    <h3 className="text-xs font-semibold flex items-center gap-1.5 text-teal-950">
                      <BellRing className="w-3.5 h-3.5 text-teal-700" />
                      <span>مركز التنبيهات والتذكيرات الفورية</span>
                    </h3>
                    <p className="text-[10px] font-light text-teal-700 mt-0.5">
                      مواعيد الاستشارات المؤكدة وتنبيهات مهام البروفايل
                    </p>
                  </div>

                  {unreadCount > 0 && (
                    <button
                      onClick={onMarkAllNotificationsRead}
                      className="text-[11px] bg-white hover:bg-teal-50 text-teal-800 border border-teal-200 px-2.5 py-1 rounded-lg flex items-center gap-1 transition-colors cursor-pointer"
                    >
                      <CheckCheck className="w-3 h-3" />
                      <span>قراءة الكل</span>
                    </button>
                  )}
                </div>

                {/* Filter Tabs */}
                <div className="px-3 py-2 bg-slate-50 border-b border-slate-200 flex items-center gap-1">
                  {[
                    { id: 'all', label: `الكل (${notifications.length})` },
                    {
                      id: 'consultation_reminder',
                      label: `مواعيد الاستشارات (${notifications.filter((n) => n.category === 'consultation_reminder').length})`
                    },
                    {
                      id: 'profile_task',
                      label: `مهام البروفايل (${notifications.filter((n) => n.category === 'profile_task').length})`
                    }
                  ].map((f) => (
                    <button
                      key={f.id}
                      onClick={() => setNotifFilter(f.id as any)}
                      className={`px-2.5 py-1 rounded-lg text-[11px] transition-colors cursor-pointer ${
                        notifFilter === f.id
                          ? 'bg-teal-700 text-white font-medium'
                          : 'text-slate-600 hover:bg-slate-200/70 font-light'
                      }`}
                    >
                      {f.label}
                    </button>
                  ))}
                </div>

                {/* Notifications List */}
                <div className="max-h-80 overflow-y-auto divide-y divide-slate-100">
                  {filteredNotifications.length === 0 ? (
                    <div className="p-6 text-center text-xs text-slate-400 font-light">
                      لا توجد تنبيهات في هذا التصنيف حالياً.
                    </div>
                  ) : (
                    filteredNotifications.map((notif) => (
                      <div
                        key={notif.id}
                        className={`p-3.5 transition-colors flex items-start justify-between gap-2.5 ${
                          !notif.isRead ? 'bg-teal-50/40 hover:bg-teal-50/70' : 'bg-white hover:bg-slate-50'
                        }`}
                      >
                        <div
                          onClick={() => {
                            onNotificationNavigate(notif);
                            setIsNotifOpen(false);
                          }}
                          className="flex items-start gap-2.5 flex-1 cursor-pointer"
                        >
                          <div className="w-8 h-8 rounded-xl bg-slate-100 border border-slate-200 flex items-center justify-center shrink-0 mt-0.5">
                            {getCategoryIcon(notif.category)}
                          </div>
                          <div className="space-y-1 flex-1 min-w-0">
                            <div className="flex items-center justify-between gap-1">
                              <span className="text-xs font-semibold text-slate-900 leading-snug">
                                {notif.title}
                              </span>
                              {!notif.isRead && (
                                <span className="w-2 h-2 rounded-full bg-teal-600 shrink-0"></span>
                              )}
                            </div>
                            <p className="text-[11px] font-light text-slate-600 leading-relaxed">
                              {notif.message}
                            </p>
                            <div className="flex items-center justify-between pt-1">
                              <span className="text-[10px] font-mono text-slate-400">
                                {notif.timestamp}
                              </span>
                              {notif.actionLabel && (
                                <span className="text-[10px] font-medium text-teal-700 flex items-center gap-0.5">
                                  <span>{notif.actionLabel}</span>
                                  <ArrowLeft className="w-2.5 h-2.5" />
                                </span>
                              )}
                            </div>
                          </div>
                        </div>

                        <button
                          onClick={() => onDeleteNotification(notif.id)}
                          className="text-slate-300 hover:text-rose-600 p-1 cursor-pointer shrink-0"
                          title="حذف التنبيه"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    ))
                  )}
                </div>

                {/* Footer Link to Profile Notification Center */}
                <div className="p-2.5 bg-slate-50 border-t border-slate-200 text-center">
                  <button
                    onClick={() => {
                      onTabChange('profile');
                      setIsNotifOpen(false);
                    }}
                    className="w-full py-1.5 rounded-xl bg-teal-50 hover:bg-teal-100 text-teal-800 text-xs font-medium transition-colors cursor-pointer"
                  >
                    عرض كافة التنبيهات والمهام في قسم البروفايل
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Role switcher */}
          <div className="relative flex items-center bg-white border border-slate-200 rounded-xl px-2.5 py-1.5 shadow-2xs hover:border-slate-300 transition-colors">
            <span className="text-[11px] font-light text-slate-400 ml-1 hidden xl:inline">
              الصفة:
            </span>
            <select
              value={currentRole}
              onChange={(e) => onRoleChange(e.target.value as UserRole)}
              className="appearance-none bg-transparent text-xs font-medium text-slate-800 pr-4 focus:outline-none cursor-pointer"
            >
              {roles.map((r) => (
                <option key={r.id} value={r.id}>
                  {r.label}
                </option>
              ))}
            </select>
            <ChevronDown className="w-3.5 h-3.5 text-slate-400 pointer-events-none absolute left-2" />
          </div>

          {/* Zero-Login Automatic Notification Status Pill */}
          <div
            className="hidden sm:flex items-center gap-1.5 bg-teal-50/90 border border-teal-200/80 px-2.5 py-1.5 rounded-xl text-xs"
            title={`تصفح مباشر للزائر — يتم إرسال إشعارات الحجز تلقائياً إلى ${TARGET_NOTIFICATION_EMAIL}`}
          >
            <MailCheck className="w-3.5 h-3.5 text-teal-700" />
            <span className="text-[11px] font-medium text-teal-900">
              إشعار تلقائي مباشر
            </span>
          </div>
        </div>
      </div>

      {/* Mobile/Tablet Secondary Nav Strip */}
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
              {tab.id === 'profile' && unreadCount > 0 && (
                <span className="w-4 h-4 rounded-full bg-amber-400 text-slate-950 text-[10px] font-mono font-bold flex items-center justify-center">
                  {unreadCount}
                </span>
              )}
            </button>
          );
        })}
      </div>
    </header>
  );
};
