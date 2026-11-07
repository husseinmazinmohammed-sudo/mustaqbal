import React, { useState } from 'react';
import { 
  Radiation, 
  Zap, 
  Leaf, 
  Stethoscope, 
  Clock, 
  ShieldCheck, 
  ChevronDown, 
  ChevronUp, 
  HelpCircle, 
  AlertOctagon,
  CheckCircle,
  FileBadge,
  Sparkles,
  ArrowLeft
} from 'lucide-react';
import { EDUCATIONAL_MODULES } from '../../data/modulesData';
import { PillarId, EducationalModule } from '../../types';

interface ModulesTabProps {
  selectedPillar: PillarId | null;
  onSelectPillar: (pillar: PillarId | null) => void;
  onStartQuiz: (module: EducationalModule) => void;
  onOpenGuideByPillar: (pillar: PillarId) => void;
}

export const ModulesTab: React.FC<ModulesTabProps> = ({
  selectedPillar,
  onSelectPillar,
  onStartQuiz,
  onOpenGuideByPillar
}) => {
  const [activeModuleId, setActiveModuleId] = useState<string>(
    selectedPillar ? `mod-${selectedPillar === 'radiation' ? 'radiation-safety' : selectedPillar === 'electrical' ? 'electrical-safety' : selectedPillar === 'green_hospital' ? 'green-hospital' : 'healthcare-engineering'}` : 'mod-radiation-safety'
  );

  const filterTabs: { id: PillarId | 'all'; label: string; icon: React.FC<{ className?: string }> }[] = [
    { id: 'all', label: 'كافة المحاور', icon: ShieldCheck },
    { id: 'radiation', label: 'السلامة الإشعاعية', icon: Radiation },
    { id: 'electrical', label: 'السلامة الكهربائية', icon: Zap },
    { id: 'green_hospital', label: 'المستشفيات الخضراء', icon: Leaf },
    { id: 'healthcare_engineering', label: 'هندسة الرعاية الصحية', icon: Stethoscope }
  ];

  const filteredModules = selectedPillar && selectedPillar !== ('all' as any)
    ? EDUCATIONAL_MODULES.filter((m) => m.pillar === selectedPillar)
    : EDUCATIONAL_MODULES;

  const currentModule = EDUCATIONAL_MODULES.find((m) => m.id === activeModuleId) || filteredModules[0] || EDUCATIONAL_MODULES[0];

  const pillarTheme = {
    radiation: {
      accentBg: 'bg-amber-500/10 text-amber-700',
      badge: 'border-amber-200 bg-amber-50 text-amber-800',
      icon: Radiation
    },
    electrical: {
      accentBg: 'bg-sky-500/10 text-sky-700',
      badge: 'border-sky-200 bg-sky-50 text-sky-800',
      icon: Zap
    },
    green_hospital: {
      accentBg: 'bg-teal-500/10 text-teal-700',
      badge: 'border-teal-200 bg-teal-50 text-teal-800',
      icon: Leaf
    },
    healthcare_engineering: {
      accentBg: 'bg-purple-500/10 text-purple-700',
      badge: 'border-purple-200 bg-purple-50 text-purple-800',
      icon: Stethoscope
    }
  }[currentModule.pillar];

  const CurrentIcon = pillarTheme.icon;

  return (
    <div className="space-y-6 text-slate-700" dir="rtl">
      {/* Header and Segmented Filters */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white border border-slate-200/80 rounded-2xl p-5 shadow-2xs">
        <div>
          <h1 className="text-xl font-semibold text-slate-900 flex items-center gap-2">
            <span>العروض التثقيفية التخصصية للأجهزة الطبية</span>
          </h1>
          <p className="text-xs font-light text-slate-500 mt-1">
            محتوى إكلينيكي وهندسي معتمد لتدريب الكوادر والزوار وتطبيق معايير الاعتماد الدولية
          </p>
        </div>

        {/* Filter Tabs */}
        <div className="flex items-center gap-1.5 p-1 bg-slate-100 rounded-xl overflow-x-auto no-scrollbar">
          {filterTabs.map((tab) => {
            const isCurrent = (tab.id === 'all' && !selectedPillar) || selectedPillar === tab.id;
            const Icon = tab.icon;

            return (
              <button
                key={tab.id}
                onClick={() => {
                  const targetPillar = tab.id === 'all' ? null : (tab.id as PillarId);
                  onSelectPillar(targetPillar);
                  if (targetPillar) {
                    const match = EDUCATIONAL_MODULES.find(m => m.pillar === targetPillar);
                    if (match) setActiveModuleId(match.id);
                  }
                }}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs transition-all whitespace-nowrap cursor-pointer ${
                  isCurrent
                    ? 'bg-white text-teal-900 font-semibold shadow-2xs'
                    : 'text-slate-600 hover:text-slate-900 font-light'
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Modern Multi-Column Master-Detail Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left Column (4 cols): Modules Selector Sidebar */}
        <div className="lg:col-span-4 space-y-3">
          <span className="text-xs font-semibold text-slate-400 block px-1">
            المساقات التعليمية المتاحة ({filteredModules.length})
          </span>

          <div className="space-y-2.5">
            {filteredModules.map((module) => {
              const isSelected = activeModuleId === module.id;
              const modulePillar = {
                radiation: { icon: Radiation, color: 'text-amber-700 bg-amber-50' },
                electrical: { icon: Zap, color: 'text-sky-700 bg-sky-50' },
                green_hospital: { icon: Leaf, color: 'text-teal-700 bg-teal-50' },
                healthcare_engineering: { icon: Stethoscope, color: 'text-purple-700 bg-purple-50' }
              }[module.pillar];
              const MIcon = modulePillar.icon;

              return (
                <div
                  key={module.id}
                  onClick={() => setActiveModuleId(module.id)}
                  className={`p-4 rounded-2xl border transition-all cursor-pointer text-right ${
                    isSelected
                      ? 'bg-white border-teal-500 shadow-xs ring-1 ring-teal-500/20'
                      : 'bg-white/80 hover:bg-white border-slate-200/80 hover:border-slate-300'
                  }`}
                >
                  <div className="flex items-start gap-3">
                    <div className={`w-9 h-9 rounded-xl ${modulePillar.color} flex items-center justify-center shrink-0 mt-0.5`}>
                      <MIcon className="w-4 h-4" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between text-[11px] text-slate-400 mb-0.5">
                        <span className="font-mono">{module.standard.split('/')[0]}</span>
                        <span className="font-light">{module.readTime}</span>
                      </div>
                      <h3 className={`text-xs leading-snug line-clamp-1 ${isSelected ? 'font-semibold text-slate-900' : 'font-medium text-slate-700'}`}>
                        {module.title}
                      </h3>
                      <p className="text-[11px] font-light text-slate-500 mt-1 line-clamp-2 leading-relaxed">
                        {module.subtitle}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right Column (8 cols): Active Module Detailed Reader */}
        <div className="lg:col-span-8 space-y-4">
          <div className="bg-white border border-slate-200/80 rounded-3xl p-6 sm:p-8 space-y-6 shadow-2xs">
            {/* Module Header */}
            <div className="space-y-3 border-b border-slate-100 pb-5">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <span className={`text-xs font-mono px-3 py-1 rounded-full border ${pillarTheme.badge}`}>
                  المعيار المرجعي: {currentModule.standard}
                </span>
                <span className="text-xs text-slate-400 font-light flex items-center gap-1">
                  <Clock className="w-3.5 h-3.5" />
                  <span>زمن القراءة المقترح: {currentModule.readTime}</span>
                </span>
              </div>

              <div className="flex items-start gap-3">
                <div className={`w-11 h-11 rounded-2xl ${pillarTheme.accentBg} flex items-center justify-center shrink-0`}>
                  <CurrentIcon className="w-6 h-6" />
                </div>
                <div>
                  <h2 className="text-xl font-semibold text-slate-900 leading-tight">
                    {currentModule.title}
                  </h2>
                  <p className="text-xs font-light text-slate-500 mt-1 leading-relaxed">
                    {currentModule.subtitle}
                  </p>
                </div>
              </div>

              {/* Audience and Scope */}
              <div className="bg-slate-50 rounded-xl p-3 border border-slate-100 text-xs font-light text-slate-600 flex items-center justify-between">
                <span>الفئات المستهدفة: <strong className="font-medium text-slate-800">{currentModule.targetAudience}</strong></span>
              </div>
            </div>

            {/* Overview Abstract */}
            <div className="bg-teal-50/40 border border-teal-200/50 rounded-2xl p-4 text-xs font-light text-teal-900 leading-relaxed">
              <span className="font-semibold text-teal-800 block mb-1">الخلاصة السريرية والهندسية:</span>
              <p>{currentModule.summary}</p>
            </div>

            {/* Content Sections */}
            <div className="space-y-4">
              {currentModule.sections.map((section, idx) => (
                <div
                  key={idx}
                  className="bg-slate-50/50 border border-slate-200/60 rounded-2xl p-5 space-y-2.5 text-right"
                >
                  <h3 className="text-sm font-semibold text-slate-900 flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-teal-600"></span>
                    <span>{section.heading}</span>
                  </h3>

                  <p className="text-xs font-light text-slate-600 leading-relaxed">
                    {section.content}
                  </p>

                  {section.bullets && (
                    <ul className="space-y-1.5 pr-3 pt-1">
                      {section.bullets.map((b, bIdx) => (
                        <li key={bIdx} className="text-xs font-light text-slate-600 leading-relaxed flex items-start gap-2">
                          <span className="text-teal-600 font-bold shrink-0 mt-0.5">▪</span>
                          <span>{b}</span>
                        </li>
                      ))}
                    </ul>
                  )}

                  {section.safeThreshold && (
                    <div className="mt-3 p-3 rounded-xl bg-teal-50/80 border border-teal-200/70 text-xs font-light text-teal-900 flex items-start gap-2.5">
                      <CheckCircle className="w-4 h-4 shrink-0 text-teal-700 mt-0.5" />
                      <div>
                        <strong className="font-semibold text-teal-800">الحد الآمن المعتمد دولياً: </strong>
                        <span>{section.safeThreshold}</span>
                      </div>
                    </div>
                  )}

                  {section.warningNote && (
                    <div className="mt-3 p-3 rounded-xl bg-rose-50/80 border border-rose-200/70 text-xs font-light text-rose-900 flex items-start gap-2.5">
                      <AlertOctagon className="w-4 h-4 shrink-0 text-rose-700 mt-0.5" />
                      <div>
                        <strong className="font-semibold text-rose-800">تنبيه سلامة إلزامي: </strong>
                        <span>{section.warningNote}</span>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>

            {/* Bottom Actions Bar */}
            <div className="pt-4 border-t border-slate-100 flex flex-wrap items-center justify-between gap-3">
              <button
                onClick={() => onStartQuiz(currentModule)}
                className="bg-teal-700 hover:bg-teal-800 active:scale-98 text-white text-xs font-medium py-3 px-6 rounded-xl flex items-center gap-2 shadow-xs transition-all cursor-pointer"
              >
                <HelpCircle className="w-4 h-4" />
                <span>بدء اختبار الكفاءة المعرفية والحصول على الوسام</span>
              </button>

              <button
                onClick={() => onOpenGuideByPillar(currentModule.pillar)}
                className="bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-light py-3 px-5 rounded-xl flex items-center gap-2 transition-colors cursor-pointer border border-slate-200"
              >
                <FileBadge className="w-4 h-4 text-teal-700" />
                <span>استعراض دليل الجيب المطابق</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
