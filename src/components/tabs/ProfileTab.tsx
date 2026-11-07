import React from 'react';
import { 
  Award, 
  Bookmark, 
  Ticket, 
  Phone, 
  ShieldCheck, 
  CheckCircle,
  FileText,
  AlertTriangle,
  Zap,
  Radiation,
  Leaf,
  Stethoscope,
  ExternalLink,
  Calendar
} from 'lucide-react';
import { UserRole, BookedConsultation, PocketGuide } from '../../types';
import { POCKET_GUIDES } from '../../data/guidesData';

interface ProfileTabProps {
  userRole: UserRole;
  earnedBadges: string[];
  bookmarkedGuideIds: string[];
  bookedConsultations: BookedConsultation[];
  onOpenGuide: (guide: PocketGuide) => void;
  onOpenHotline: () => void;
}

export const ProfileTab: React.FC<ProfileTabProps> = ({
  userRole,
  earnedBadges,
  bookmarkedGuideIds,
  bookedConsultations,
  onOpenGuide,
  onOpenHotline
}) => {
  const roleNames: Record<UserRole, string> = {
    visitor: 'زائر المنشأة الصحية',
    biomedical_engineer: 'مهندس أجهزة طبية معتمد',
    nurse: 'كادر تمريض إكلينيكي',
    radiologist: 'أخصائي فيزياء وأشعة تشخيصية',
    hospital_admin: 'إدارة السلامة والجودة بالمستشفى'
  };

  const savedGuidesList = POCKET_GUIDES.filter((g) => bookmarkedGuideIds.includes(g.id));

  const allPossibleBadges = [
    { 
      id: 'badge-rad', 
      title: 'خبير السلامة الإشعاعية ALARA', 
      desc: 'إتقان ثلاثية الوقاية وفحص سترات الرصاص السنوية',
      icon: Radiation, 
      color: 'text-amber-800 bg-amber-50 border-amber-200' 
    },
    { 
      id: 'badge-elec', 
      title: 'محترف الأمان الكهربائي IEC 60601', 
      desc: 'فحص تيارات التسريب وحماية القلب من الصدمة الميكروية',
      icon: Zap, 
      color: 'text-sky-800 bg-sky-50 border-sky-200' 
    },
    { 
      id: 'badge-green', 
      title: 'سفير المستشفيات الخضراء المستدامة', 
      desc: 'تطبيق الركائز السبع للتحول البيئي وفرز النفايات الطبية',
      icon: Leaf, 
      color: 'text-teal-800 bg-teal-50 border-teal-200' 
    },
    { 
      id: 'badge-eng', 
      title: 'ممارس هندسة الرعاية الصحية PPM', 
      desc: 'إنجاز 100% لفحوصات الأجهزة الداعمة للحياة',
      icon: Stethoscope, 
      color: 'text-purple-800 bg-purple-50 border-purple-200' 
    }
  ];

  return (
    <div className="space-y-6 text-slate-700" dir="rtl">
      {/* Executive Profile Desktop Header Card */}
      <div className="bg-gradient-to-l from-slate-900 via-teal-950 to-slate-900 text-white rounded-3xl p-6 sm:p-8 shadow-sm space-y-6 border border-slate-800">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-2xl bg-teal-600 text-white flex items-center justify-center font-bold shadow-md shadow-teal-500/20">
              <ShieldCheck className="w-8 h-8 text-white" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-xl font-semibold text-white">
                  ملف الكفاءة المهنية والسلامة السريرية
                </h1>
                <span className="text-[10px] bg-teal-400/20 text-teal-300 px-2.5 py-0.5 rounded-full border border-teal-400/30">
                  سجل نشط
                </span>
              </div>
              <p className="text-sm font-light text-teal-200 mt-0.5">
                الصفة المعتمدة: {roleNames[userRole]}
              </p>
              <span className="text-xs font-mono text-slate-400">
                الرقم التسلسلي المهني: #MED-SAFE-2026-HQ
              </span>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={onOpenHotline}
              className="bg-rose-500/20 hover:bg-rose-500/30 text-rose-200 border border-rose-500/30 px-4 py-2.5 rounded-xl text-xs font-medium flex items-center gap-2 transition-colors cursor-pointer"
            >
              <Phone className="w-3.5 h-3.5 text-rose-400" />
              <span>خطوط الطوارئ 24/7</span>
            </button>
          </div>
        </div>

        {/* Desktop Metric Cards Strip */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4 border-t border-white/10 text-right">
          <div className="bg-white/5 rounded-2xl p-4 border border-white/5">
            <span className="text-xs font-light text-slate-300 block">الأوسمة المكتسبة</span>
            <span className="text-2xl font-semibold font-mono text-teal-300 mt-1 block">
              {earnedBadges.length} <span className="text-xs text-slate-400 font-normal">من 4 أوسمة</span>
            </span>
            <span className="text-[11px] text-slate-400 block mt-1">تمنح باجتياز اختبارات العروض التثقيفية</span>
          </div>

          <div className="bg-white/5 rounded-2xl p-4 border border-white/5">
            <span className="text-xs font-light text-slate-300 block">الأدلة المحفوظة في السجل</span>
            <span className="text-2xl font-semibold font-mono text-sky-300 mt-1 block">
              {bookmarkedGuideIds.length} <span className="text-xs text-slate-400 font-normal">أدلة مفعلة</span>
            </span>
            <span className="text-[11px] text-slate-400 block mt-1">جاهزة للمراجعة والطباعة بدون إنترنت</span>
          </div>

          <div className="bg-white/5 rounded-2xl p-4 border border-white/5">
            <span className="text-xs font-light text-slate-300 block">تذاكر الاستشارات الهندسية</span>
            <span className="text-2xl font-semibold font-mono text-purple-300 mt-1 block">
              {bookedConsultations.length} <span className="text-xs text-slate-400 font-normal">تذاكر مؤكدة</span>
            </span>
            <span className="text-[11px] text-slate-400 block mt-1">متابعة مواعيد الفحص الميداني</span>
          </div>
        </div>
      </div>

      {/* Modern Desktop Two-Column Section: Badges (6 cols) & Booked Tickets + Saved Guides (6 cols) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Badges Matrix (6 cols) */}
        <div className="lg:col-span-6 bg-white border border-slate-200/80 rounded-3xl p-6 shadow-2xs space-y-4">
          <div className="flex items-center justify-between border-b border-slate-100 pb-3">
            <h2 className="text-sm font-semibold text-slate-900 flex items-center gap-2">
              <Award className="w-4 h-4 text-amber-600" />
              <span>أوسمة التحقق المعرفي والمهني</span>
            </h2>
            <span className="text-xs text-slate-400 font-light">
              نسبة الإنجاز: {Math.round((earnedBadges.length / 4) * 100)}%
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {allPossibleBadges.map((badge) => {
              const isEarned = earnedBadges.includes(badge.id);
              const Icon = badge.icon;

              return (
                <div
                  key={badge.id}
                  className={`p-4 rounded-2xl border text-right transition-all flex flex-col justify-between ${
                    isEarned
                      ? `${badge.color} shadow-2xs`
                      : 'bg-slate-50 border-slate-200 opacity-60'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div className="w-8 h-8 rounded-xl bg-white flex items-center justify-center shadow-2xs">
                      <Icon className="w-4 h-4" />
                    </div>
                    {isEarned ? (
                      <span className="text-[10px] font-medium bg-teal-700 text-white px-2 py-0.5 rounded-full">
                        مكتمل
                      </span>
                    ) : (
                      <span className="text-[10px] text-slate-400 font-light">
                        مغلق (أكمل الاختبار)
                      </span>
                    )}
                  </div>

                  <div className="mt-3">
                    <h3 className="text-xs font-semibold text-slate-900 leading-snug">
                      {badge.title}
                    </h3>
                    <p className="text-[11px] font-light text-slate-600 mt-1 leading-relaxed">
                      {badge.desc}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Tickets and Bookmarked Guides (6 cols) */}
        <div className="lg:col-span-6 space-y-6">
          {/* Booked Consultations */}
          <div className="bg-white border border-slate-200/80 rounded-3xl p-6 shadow-2xs space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <h2 className="text-sm font-semibold text-slate-900 flex items-center gap-2">
                <Ticket className="w-4 h-4 text-purple-600" />
                <span>تذاكر الاستشارات الهندسية المحجوزة</span>
              </h2>
              <span className="text-xs text-slate-400 font-light">
                {bookedConsultations.length} تذاكر
              </span>
            </div>

            {bookedConsultations.length === 0 ? (
              <div className="p-6 bg-slate-50 border border-slate-200/60 rounded-2xl text-center text-xs text-slate-400 font-light">
                لا توجد تذاكر استشارة محجوزة حتى الآن. يمكنك حجز استشارة فورية من تبويب الاستشارات.
              </div>
            ) : (
              <div className="space-y-2.5">
                {bookedConsultations.map((ticket) => (
                  <div
                    key={ticket.id}
                    className="bg-slate-50 border border-slate-200/80 rounded-2xl p-4 space-y-2 text-right"
                  >
                    <div className="flex items-center justify-between text-xs">
                      <span className="font-mono font-semibold text-purple-700 bg-purple-100 px-2 py-0.5 rounded-md">
                        {ticket.id}
                      </span>
                      <span className="text-xs font-medium text-teal-700 flex items-center gap-1">
                        <CheckCircle className="w-3.5 h-3.5 text-teal-600" />
                        جلسة مؤكدة
                      </span>
                    </div>

                    <div>
                      <h4 className="text-xs font-semibold text-slate-900">{ticket.topic}</h4>
                      <p className="text-[11px] font-light text-slate-500 mt-0.5">
                        {ticket.visitorName} · {ticket.hospitalDepartment}
                      </p>
                    </div>

                    <div className="pt-2 border-t border-slate-200/60 flex items-center justify-between text-[11px] text-slate-500 font-light">
                      <span>التاريخ المجدول: {ticket.date}</span>
                      <span>الوقت: {ticket.timeSlot}</span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Bookmarked Guides list */}
          <div className="bg-white border border-slate-200/80 rounded-3xl p-6 shadow-2xs space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <h2 className="text-sm font-semibold text-slate-900 flex items-center gap-2">
                <Bookmark className="w-4 h-4 text-teal-600" />
                <span>أدلة الجيب المحفوظة للوصول السريع</span>
              </h2>
              <span className="text-xs text-slate-400 font-light">
                {savedGuidesList.length} أدلة
              </span>
            </div>

            {savedGuidesList.length === 0 ? (
              <div className="p-6 bg-slate-50 border border-slate-200/60 rounded-2xl text-center text-xs text-slate-400 font-light">
                لم تقم بحفظ أي أدلة استرشادية بعد. يمكنك الضغط على أيقونة الإشارة المرجعية بأي دليل لحفظه هنا.
              </div>
            ) : (
              <div className="space-y-2">
                {savedGuidesList.map((guide) => (
                  <div
                    key={guide.id}
                    onClick={() => onOpenGuide(guide)}
                    className="p-3 bg-slate-50 hover:bg-slate-100/80 border border-slate-200 rounded-xl flex items-center justify-between cursor-pointer transition-colors"
                  >
                    <div className="flex items-center gap-2.5">
                      <FileText className="w-4 h-4 text-teal-700" />
                      <span className="text-xs font-semibold text-slate-800">
                        {guide.title}
                      </span>
                    </div>
                    <span className="text-[11px] font-mono font-medium text-slate-500 bg-white px-2 py-0.5 rounded-md border border-slate-200">
                      {guide.arabicCode}
                    </span>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
