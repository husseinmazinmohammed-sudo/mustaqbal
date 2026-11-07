import React, { useState } from 'react';
import { 
  Radiation, 
  Zap, 
  Leaf, 
  Stethoscope, 
  ArrowLeft, 
  ShieldAlert, 
  CheckCircle2, 
  Calculator, 
  Download, 
  Sparkles,
  ExternalLink,
  Activity,
  FileBadge,
  Clock,
  ShieldCheck,
  ChevronRight
} from 'lucide-react';
import { AppTab, PillarId, UserRole } from '../../types';

interface HomeTabProps {
  onNavigateTab: (tab: AppTab) => void;
  onSelectPillar: (pillar: PillarId) => void;
  userRole: UserRole;
  onOpenCalculator: (calcId: 'radiation' | 'electrical' | 'green') => void;
  onOpenGuide: (guideId: string) => void;
}

export const HomeTab: React.FC<HomeTabProps> = ({
  onNavigateTab,
  onSelectPillar,
  userRole,
  onOpenCalculator,
  onOpenGuide
}) => {
  const [alertDismissed, setAlertDismissed] = useState(false);

  const roleGreetings: Record<UserRole, { title: string; subtitle: string; tip: string }> = {
    visitor: {
      title: 'أهلاً بك في منصة السلامة والاستدامة السريرية',
      subtitle: 'دليلك الشامل لسلامتك وسلامة مرافقيك من مخاطر الإشعاع والكهرباء الطبية والمستشفيات الخضراء',
      tip: 'انتبه دوماً للإشارات التحذيرية وأضواء التنبيه الحمراء خارج غرف الأشعة والتحكم.'
    },
    biomedical_engineer: {
      title: 'مرحباً بالزميل المهندس الطبي الإكلينيكي',
      subtitle: 'أحدث معايير IEC 60601-1، برامج الصيانة الوقائية PPM، وتقييم الاستدامة الخضراء للأجهزة',
      tip: 'تأكد من عدم تجاوز تيار تسريب المريض 10µA في أجهزة Type CF الحيوية.'
    },
    nurse: {
      title: 'أهلاً بملائكة الرحمة والكادر التمريضي',
      subtitle: 'بروتوكولات الأمان السريع للأجهزة الحيوية وفرز النفايات الطبية عند نقطة التوليد',
      tip: 'فرز الأكياس الصفراء للنفايات المعدية فقط يخفض تكاليف المستشفى البيئية بنسبة 40%.'
    },
    radiologist: {
      title: 'مرحباً بالكوادر الإشعاعية والتشخيصية',
      subtitle: 'مبادئ ALARA، فحص واقيات الرصاص الدورية، ومراقبة مؤشرات DAP والجرعات التراكمية',
      tip: 'مضاعفة المسافة عن أنبوب الأشعة تخفض التعرض إلى الربع (قانون التربيع العكسي).'
    },
    hospital_admin: {
      title: 'مرحباً بقيادة المستشفى وإدارة الجودة',
      subtitle: 'استراتيجيات تحويل المنشأة إلى مستشفى أخضر وخفض التكاليف التشغيلية بنسبة تصل إلى 30%',
      tip: 'التحول لأنظمة الطاقة المعزولة والاستبدال الخالي من الزئبق يرفع تصنيف الاعتماد الدولي.'
    }
  };

  const currentGreeting = roleGreetings[userRole];

  return (
    <div className="space-y-6 text-slate-700" dir="rtl">
      {/* Hero Banner: Gentle Pastel Clinical Canvas */}
      <div className="bg-gradient-to-l from-teal-50/90 via-emerald-50/50 to-sky-50/90 text-slate-800 rounded-3xl p-8 shadow-2xs relative overflow-hidden border border-teal-200/80">
        <div className="absolute -left-16 -bottom-16 w-72 h-72 bg-teal-300/15 rounded-full blur-3xl pointer-events-none"></div>
        <div className="absolute right-10 top-0 w-60 h-60 bg-sky-300/15 rounded-full blur-2xl pointer-events-none"></div>

        <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          <div className="max-w-3xl space-y-3">
            <div className="flex flex-wrap items-center gap-2 text-xs text-teal-800 font-light">
              <span className="w-2 h-2 rounded-full bg-teal-600"></span>
              <span className="font-semibold text-teal-900">جامعة المستقبل — الجامعة الأهلية الأولى في العراق</span>
              <span className="text-teal-400">·</span>
              <span className="text-slate-600">كلية التقنيات الهندسية / قسم هندسة تقنيات الأجهزة الطبية</span>
              <span className="bg-white/90 border border-teal-200 px-2.5 py-0.5 rounded-full text-[11px] text-teal-800 font-medium">
                الإصدار الأكاديمي السريري 2026
              </span>
            </div>

            <h1 className="text-2xl lg:text-3xl font-semibold leading-tight text-slate-900">
              {currentGreeting.title}
            </h1>

            <p className="text-sm font-light text-slate-600 leading-relaxed max-w-2xl">
              {currentGreeting.subtitle}
            </p>

            <div className="pt-2 flex flex-wrap items-center gap-3">
              <button
                onClick={() => onNavigateTab('consultation')}
                className="bg-teal-700 hover:bg-teal-800 active:scale-98 text-white text-xs font-medium py-3 px-5 rounded-xl flex items-center gap-2 shadow-2xs transition-all cursor-pointer"
              >
                <Sparkles className="w-4 h-4 text-teal-100" />
                <span>حجز استشارة فورية (إشعار تلقائي للبريد)</span>
                <ArrowLeft className="w-3.5 h-3.5" />
              </button>

              <button
                onClick={() => onNavigateTab('modules')}
                className="bg-white hover:bg-teal-50/70 text-teal-900 text-xs font-medium py-3 px-5 rounded-xl flex items-center gap-2 transition-colors border border-teal-200/80 shadow-2xs cursor-pointer"
              >
                <span>استعراض العروض التثقيفية</span>
              </button>

              <button
                onClick={() => onNavigateTab('guides')}
                className="bg-white/80 hover:bg-white text-slate-700 text-xs font-light py-3 px-5 rounded-xl flex items-center gap-2 transition-colors border border-slate-200/80 cursor-pointer"
              >
                <Download className="w-3.5 h-3.5 text-teal-700" />
                <span>الفورما الرسمية الموحدة (PDF)</span>
              </button>
            </div>
          </div>

          {/* Quick Metrics KPI Strip on Hero */}
          <div className="hidden lg:grid grid-cols-2 gap-3 shrink-0 w-80">
            <div className="bg-white/90 backdrop-blur-md border border-teal-200/70 rounded-2xl p-4 text-right shadow-2xs">
              <span className="text-xs text-slate-500 block font-light">المعايير المفعلة</span>
              <span className="text-xl font-semibold text-teal-800 font-mono">4 محاور</span>
              <span className="text-[11px] text-slate-400 block mt-1">مطابقة لـ ICRP & IEC</span>
            </div>

            <div className="bg-white/90 backdrop-blur-md border border-teal-200/70 rounded-2xl p-4 text-right shadow-2xs">
              <span className="text-xs text-slate-500 block font-light">معدل خفض المخاطر</span>
              <span className="text-xl font-semibold text-emerald-700 font-mono">98.4%</span>
              <span className="text-[11px] text-slate-400 block mt-1">بالتطبيق الصارم لـ PPM</span>
            </div>

            <div className="bg-white/90 backdrop-blur-md border border-teal-200/70 rounded-2xl p-4 text-right shadow-2xs">
              <span className="text-xs text-slate-500 block font-light">توفير النفايات</span>
              <span className="text-xl font-semibold text-sky-700 font-mono">-40%</span>
              <span className="text-[11px] text-slate-400 block mt-1">بإدارة المستشفى الأخضر</span>
            </div>

            <div className="bg-white/90 backdrop-blur-md border border-teal-200/70 rounded-2xl p-4 text-right shadow-2xs">
              <span className="text-xs text-slate-500 block font-light">زمن الاستجابة للطوارئ</span>
              <span className="text-xl font-semibold text-amber-700 font-mono">&lt; 15 دقيقة</span>
              <span className="text-[11px] text-slate-400 block mt-1">للأجهزة الداعمة للحياة</span>
            </div>
          </div>
        </div>
      </div>

      {/* Clinical Safety Tip Alert */}
      {!alertDismissed && (
        <div className="bg-amber-50/70 border border-amber-200/70 rounded-2xl p-4 flex items-center justify-between gap-4">
          <div className="flex items-center gap-3.5">
            <div className="w-9 h-9 rounded-xl bg-amber-500/15 text-amber-800 flex items-center justify-center shrink-0">
              <ShieldAlert className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-xs font-semibold text-amber-900">
                  توجيه سريري عاجل لدورك الحالي ({userRole}):
                </h3>
                <span className="text-[10px] bg-amber-200/60 text-amber-900 px-2 py-0.5 rounded-full font-mono">
                  معتمد
                </span>
              </div>
              <p className="text-xs font-light text-amber-900/80 mt-0.5 leading-relaxed">
                {currentGreeting.tip}
              </p>
            </div>
          </div>

          <button
            onClick={() => setAlertDismissed(true)}
            className="text-slate-400 hover:text-slate-600 text-xs px-2 py-1 rounded-lg hover:bg-amber-100/50 transition-colors cursor-pointer"
          >
            إغلاق
          </button>
        </div>
      )}

      {/* Main Multi-Column Section: 4 Core Pillars Grid (Left/Center) + Rapid Calculators Panel (Right) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left/Center Column (8 cols): 4 Core Pillars */}
        <div className="lg:col-span-8 space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-base font-semibold text-slate-900 flex items-center gap-2">
                <span className="w-2 h-4 bg-teal-600 rounded-full"></span>
                <span>المحاور التوعوية التخصصية الأربعة</span>
              </h2>
              <p className="text-xs font-light text-slate-500 mt-0.5">
                عروض تفاعلية متعمقة تغطي السلامة السريرية والهندسية والبيئية
              </p>
            </div>

            <button
              onClick={() => onNavigateTab('modules')}
              className="text-xs font-normal text-teal-700 hover:text-teal-800 hover:underline flex items-center gap-1 cursor-pointer"
            >
              <span>استعراض كافة المساقات</span>
              <ArrowLeft className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Pillar 1: Radiation Safety */}
            <div
              onClick={() => {
                onSelectPillar('radiation');
                onNavigateTab('modules');
              }}
              className="group bg-white border border-slate-200/80 rounded-2xl p-5 flex flex-col justify-between hover:border-amber-400 hover:shadow-xs transition-all cursor-pointer text-right"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="w-11 h-11 rounded-xl bg-amber-500/10 text-amber-700 flex items-center justify-center">
                    <Radiation className="w-6 h-6" />
                  </div>
                  <span className="text-[11px] font-mono font-medium text-slate-400 bg-slate-50 px-2 py-0.5 rounded-md border border-slate-100">
                    ICRP 103 / IAEA
                  </span>
                </div>

                <div>
                  <h3 className="text-sm font-semibold text-slate-900 group-hover:text-amber-800 transition-colors">
                    السلامة والوقاية الإشعاعية
                  </h3>
                  <p className="text-xs font-light text-slate-500 mt-1 leading-relaxed">
                    منظومة حماية المرضى والكوادر الطبية، تطبيق مبادئ ALARA الصارمة (الوقت، المسافة، والتدريع)، حسابات سمك الرصاص، والفحص السنوي لسترات الوقاية.
                  </p>
                </div>
              </div>

              <div className="pt-4 border-t border-slate-100 mt-3 flex items-center justify-between text-xs text-slate-400">
                <span className="font-light">اختبار كفاءة + وسام مهني</span>
                <span className="text-amber-700 font-medium group-hover:translate-x-1 transition-transform flex items-center gap-1">
                  <span>بدء العرض</span>
                  <ArrowLeft className="w-3.5 h-3.5" />
                </span>
              </div>
            </div>

            {/* Pillar 2: Electrical Safety */}
            <div
              onClick={() => {
                onSelectPillar('electrical');
                onNavigateTab('modules');
              }}
              className="group bg-white border border-slate-200/80 rounded-2xl p-5 flex flex-col justify-between hover:border-sky-400 hover:shadow-xs transition-all cursor-pointer text-right"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="w-11 h-11 rounded-xl bg-sky-500/10 text-sky-700 flex items-center justify-center">
                    <Zap className="w-6 h-6" />
                  </div>
                  <span className="text-[11px] font-mono font-medium text-slate-400 bg-slate-50 px-2 py-0.5 rounded-md border border-slate-100">
                    IEC 60601-1 / NFPA 99
                  </span>
                </div>

                <div>
                  <h3 className="text-sm font-semibold text-slate-900 group-hover:text-sky-800 transition-colors">
                    السلامة الكهربائية للأجهزة الطبية
                  </h3>
                  <p className="text-xs font-light text-slate-500 mt-1 leading-relaxed">
                    الوقاية من التيارات المتسربة والصدمات الميكروية في العناية المركزة، تصنيف الأجزاء الملامسة (B, BF, CF)، وأنظمة الطاقة المعزولة (IPS) ومراقبة العزل (LIM).
                  </p>
                </div>
              </div>

              <div className="pt-4 border-t border-slate-100 mt-3 flex items-center justify-between text-xs text-slate-400">
                <span className="font-light">اختبار كفاءة + وسام مهني</span>
                <span className="text-sky-700 font-medium group-hover:translate-x-1 transition-transform flex items-center gap-1">
                  <span>بدء العرض</span>
                  <ArrowLeft className="w-3.5 h-3.5" />
                </span>
              </div>
            </div>

            {/* Pillar 3: Green Hospital */}
            <div
              onClick={() => {
                onSelectPillar('green_hospital');
                onNavigateTab('modules');
              }}
              className="group bg-white border border-slate-200/80 rounded-2xl p-5 flex flex-col justify-between hover:border-teal-400 hover:shadow-xs transition-all cursor-pointer text-right"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="w-11 h-11 rounded-xl bg-teal-500/10 text-teal-700 flex items-center justify-center">
                    <Leaf className="w-6 h-6" />
                  </div>
                  <span className="text-[11px] font-mono font-medium text-slate-400 bg-slate-50 px-2 py-0.5 rounded-md border border-slate-100">
                    GGHH / WHO Health
                  </span>
                </div>

                <div>
                  <h3 className="text-sm font-semibold text-slate-900 group-hover:text-teal-800 transition-colors">
                    المستشفيات الخضراء والاستدامة
                  </h3>
                  <p className="text-xs font-light text-slate-500 mt-1 leading-relaxed">
                    استراتيجيات خفض البصمة الكربونية، فرز النفايات الطبية والحيوية عند المصدر، استبدال المحارق بتقنية الأوتوكلاف، وسلاسل التوريد والشراء الأخضر الخالي من الزئبق.
                  </p>
                </div>
              </div>

              <div className="pt-4 border-t border-slate-100 mt-3 flex items-center justify-between text-xs text-slate-400">
                <span className="font-light">اختبار كفاءة + وسام مهني</span>
                <span className="text-teal-700 font-medium group-hover:translate-x-1 transition-transform flex items-center gap-1">
                  <span>بدء العرض</span>
                  <ArrowLeft className="w-3.5 h-3.5" />
                </span>
              </div>
            </div>

            {/* Pillar 4: Healthcare Engineering */}
            <div
              onClick={() => {
                onSelectPillar('healthcare_engineering');
                onNavigateTab('modules');
              }}
              className="group bg-white border border-slate-200/80 rounded-2xl p-5 flex flex-col justify-between hover:border-purple-400 hover:shadow-xs transition-all cursor-pointer text-right"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="w-11 h-11 rounded-xl bg-purple-500/10 text-purple-700 flex items-center justify-center">
                    <Stethoscope className="w-6 h-6" />
                  </div>
                  <span className="text-[11px] font-mono font-medium text-slate-400 bg-slate-50 px-2 py-0.5 rounded-md border border-slate-100">
                    AAMI EQ56 / JCI FMS
                  </span>
                </div>

                <div>
                  <h3 className="text-sm font-semibold text-slate-900 group-hover:text-purple-800 transition-colors">
                    هندسة الرعاية الصحية وإدارة الأصول
                  </h3>
                  <p className="text-xs font-light text-slate-500 mt-1 leading-relaxed">
                    برامج الصيانة الوقائية الدورية (PPM)، فحص استلام التوريد، معايرة الأجهزة الحساسة الداعمة للحياة، وإدارة بلاغات الأعطال واستجابة الطوارئ السريرية.
                  </p>
                </div>
              </div>

              <div className="pt-4 border-t border-slate-100 mt-3 flex items-center justify-between text-xs text-slate-400">
                <span className="font-light">اختبار كفاءة + وسام مهني</span>
                <span className="text-purple-700 font-medium group-hover:translate-x-1 transition-transform flex items-center gap-1">
                  <span>بدء العرض</span>
                  <ArrowLeft className="w-3.5 h-3.5" />
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column (4 cols): Rapid Calculators & Pocket Guides Widget */}
        <div className="lg:col-span-4 space-y-4">
          {/* Quick Calculators Widget */}
          <div className="bg-white border border-slate-200/80 rounded-2xl p-5 space-y-4 shadow-2xs">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-semibold text-slate-900 flex items-center gap-2">
                <Calculator className="w-4 h-4 text-teal-600" />
                <span>حاسبات الفحص السريع</span>
              </h3>
              <span className="text-[11px] text-slate-400 font-light">أدوات فورية</span>
            </div>

            <div className="space-y-2.5">
              <button
                onClick={() => onOpenCalculator('radiation')}
                className="w-full bg-slate-50 hover:bg-slate-100/80 border border-slate-200/70 rounded-xl p-3 text-right flex items-center justify-between transition-colors cursor-pointer group"
              >
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-amber-50 text-amber-700 flex items-center justify-center shrink-0">
                    <Radiation className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="text-xs font-semibold text-slate-800 group-hover:text-amber-700 transition-colors">
                      حاسبة تدريع الإشعاع
                    </h4>
                    <p className="text-[11px] font-light text-slate-400">
                      حساب انخفاض الجرعة بالمسافة والـ HVL
                    </p>
                  </div>
                </div>
                <ArrowLeft className="w-3.5 h-3.5 text-slate-300 group-hover:text-amber-700 group-hover:translate-x-0.5 transition-all" />
              </button>

              <button
                onClick={() => onOpenCalculator('electrical')}
                className="w-full bg-slate-50 hover:bg-slate-100/80 border border-slate-200/70 rounded-xl p-3 text-right flex items-center justify-between transition-colors cursor-pointer group"
              >
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-sky-50 text-sky-700 flex items-center justify-center shrink-0">
                    <Zap className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="text-xs font-semibold text-slate-800 group-hover:text-sky-700 transition-colors">
                      مدقق السلامة الكهربائية
                    </h4>
                    <p className="text-[11px] font-light text-slate-400">
                      فحص تيار تسريب المريض Type CF
                    </p>
                  </div>
                </div>
                <ArrowLeft className="w-3.5 h-3.5 text-slate-300 group-hover:text-sky-700 group-hover:translate-x-0.5 transition-all" />
              </button>

              <button
                onClick={() => onOpenCalculator('green')}
                className="w-full bg-slate-50 hover:bg-slate-100/80 border border-slate-200/70 rounded-xl p-3 text-right flex items-center justify-between transition-colors cursor-pointer group"
              >
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-teal-50 text-teal-700 flex items-center justify-center shrink-0">
                    <Leaf className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="text-xs font-semibold text-slate-800 group-hover:text-teal-700 transition-colors">
                      تدقيق المستشفى الأخضر
                    </h4>
                    <p className="text-[11px] font-light text-slate-400">
                      مؤشر الاستدامة والنفايات الطبية
                    </p>
                  </div>
                </div>
                <ArrowLeft className="w-3.5 h-3.5 text-slate-300 group-hover:text-teal-700 group-hover:translate-x-0.5 transition-all" />
              </button>
            </div>
          </div>

          {/* Featured Pocket Guide Box (Gentle Pastel Clinical Style) */}
          <div className="bg-gradient-to-br from-teal-50 via-emerald-50/60 to-sky-50 text-slate-800 border border-teal-200/80 rounded-2xl p-5 space-y-3 relative overflow-hidden shadow-2xs">
            <div className="flex items-center justify-between text-teal-800 text-xs font-medium">
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-teal-700" />
                <span>فورما رسمية موحدة للطباعة (A4 PDF)</span>
              </span>
              <span className="text-[10px] font-mono bg-white text-teal-900 border border-teal-200 px-2 py-0.5 rounded-md">
                AMU-BME-MGMT-04
              </span>
            </div>

            <div>
              <h4 className="text-sm font-semibold text-slate-900 leading-tight">
                أطلس هندسة الرعاية وإدارة الأجهزة الطبية
              </h4>
              <p className="text-xs font-light text-slate-600 mt-1 leading-relaxed">
                إصدار قسم هندسة تقنيات الأجهزة الطبية بجامعة المستقبل لبروتوكولات الصيانة الوقائية وفحص القبول الاستلامي.
              </p>
            </div>

            <div className="pt-2 flex items-center gap-2">
              <button
                onClick={() => onOpenGuide('guide-clinical-eng')}
                className="flex-1 bg-teal-700 hover:bg-teal-800 active:scale-98 text-white text-xs font-medium py-2.5 px-3 rounded-xl flex items-center justify-center gap-1.5 transition-all cursor-pointer shadow-2xs"
              >
                <FileBadge className="w-3.5 h-3.5" />
                <span>تصفح وطباعة الفورما الموحدة</span>
              </button>

              <button
                onClick={() => onNavigateTab('guides')}
                className="bg-white hover:bg-teal-50 text-teal-900 border border-teal-200 text-xs font-medium py-2.5 px-3 rounded-xl transition-colors cursor-pointer"
              >
                <span>جميع الأدلة</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
