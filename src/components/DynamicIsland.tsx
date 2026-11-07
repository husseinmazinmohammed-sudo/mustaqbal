import React, { useState } from 'react';
import { ShieldCheck, Activity, AlertTriangle, Sparkles, X } from 'lucide-react';

interface DynamicIslandProps {
  currentPillarName?: string;
  alertsCount?: number;
}

export const DynamicIsland: React.FC<DynamicIslandProps> = ({
  currentPillarName = 'نظام الأمان النشط',
  alertsCount = 0
}) => {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div className="w-full flex justify-center py-2 pointer-events-auto z-50">
      <div
        onClick={() => setIsExpanded(!isExpanded)}
        className={`bg-black text-white cursor-pointer transition-all duration-300 ease-spring shadow-2xl flex items-center justify-between overflow-hidden border border-white/10 ${
          isExpanded
            ? 'w-[92%] max-w-[370px] rounded-[32px] p-4 flex-col gap-3 min-h-[110px]'
            : 'w-[124px] hover:w-[136px] h-[34px] rounded-full px-3.5 flex-row'
        }`}
      >
        {!isExpanded ? (
          <>
            <div className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse"></span>
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
            </div>
            <div className="flex items-center gap-1">
              <Activity className="w-3.5 h-3.5 text-sky-400" />
              <span className="text-[11px] font-mono font-medium text-slate-200">BME</span>
            </div>
          </>
        ) : (
          <div className="w-full text-right" dir="rtl">
            <div className="flex items-center justify-between pb-2 border-b border-white/10">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500"></span>
                <span className="text-xs font-bold text-emerald-400">منظومة السلامة والاستدامة الطبية</span>
              </div>
              <button 
                onClick={(e) => { e.stopPropagation(); setIsExpanded(false); }}
                className="w-5 h-5 rounded-full bg-white/10 flex items-center justify-center text-slate-400 hover:text-white"
              >
                <X className="w-3 h-3" />
              </button>
            </div>
            <div className="pt-1 flex items-center justify-between text-xs text-slate-300">
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>حالة الرقابة: المعايير معتمدة (IEC / ICRP / GGHH)</span>
              </div>
              <span className="text-[10px] bg-emerald-500/20 text-emerald-300 px-2 py-0.5 rounded-md">مستقرة</span>
            </div>
            <div className="text-[11px] text-slate-400 mt-1 flex items-center gap-1">
              <Sparkles className="w-3 h-3 text-amber-400 shrink-0" />
              <span>استشارات الهندسة الطبية والتحقق من الأدلة متاحة فوراً</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
