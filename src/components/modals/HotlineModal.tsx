import React from 'react';
import { X, Phone, AlertTriangle, ShieldCheck, Zap, Radiation, Building2 } from 'lucide-react';

interface HotlineModalProps {
  onClose: () => void;
}

export const HotlineModal: React.FC<HotlineModalProps> = ({ onClose }) => {
  const hotlines = [
    {
      title: 'مسؤول الوقاية الإشعاعية (RSO)',
      number: '9200-RAD-SAFE',
      description: 'طوارئ تسرب الإشعاع، أعطال أجهزة القسطرة والأشعة، وبلاغات التعرض المهني',
      icon: Radiation,
      color: 'text-amber-600 bg-amber-50 dark:bg-amber-950/40 border-amber-200 dark:border-amber-900'
    },
    {
      title: 'طوارئ الهندسة الطبية والأمان الكهربائي',
      number: '9200-BME-ELEC',
      description: 'إنذار أنظمة العزل LIM، تسريب تيار الصدمة، وأعطال أجهزة الإنعاش والعناية',
      icon: Zap,
      color: 'text-sky-600 bg-sky-50 dark:bg-sky-950/40 border-sky-200 dark:border-sky-900'
    },
    {
      title: 'إدارة السلامة البيئية والنفايات الطبية',
      number: '9200-ECO-HOSP',
      description: 'انسكابات كيميائية، تسرب الزئبق، وتكدس نفايات حيوية خطرة',
      icon: Building2,
      color: 'text-emerald-600 bg-emerald-50 dark:bg-emerald-950/40 border-emerald-200 dark:border-emerald-900'
    }
  ];

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4" dir="rtl">
      <div className="w-full max-w-md bg-white dark:bg-slate-900 rounded-3xl overflow-hidden shadow-2xl border border-slate-200 dark:border-slate-800 flex flex-col">
        {/* Header */}
        <div className="px-5 py-3.5 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <AlertTriangle className="w-5 h-5 text-rose-600" />
            <span className="text-xs font-bold text-slate-900 dark:text-white">
              خطوط طوارئ السلامة المهنية والإشعاعية (24/7)
            </span>
          </div>
          <button
            onClick={onClose}
            className="w-7 h-7 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-slate-500 hover:text-slate-800 dark:hover:text-white"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Hotlines List */}
        <div className="p-4 space-y-3">
          {hotlines.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div
                key={idx}
                className={`p-3.5 rounded-2xl border text-right space-y-1.5 ${item.color}`}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Icon className="w-4 h-4" />
                    <h4 className="text-xs font-bold text-slate-900 dark:text-white">
                      {item.title}
                    </h4>
                  </div>
                  <a
                    href={`tel:${item.number}`}
                    className="font-mono text-xs font-bold text-white bg-slate-900 dark:bg-slate-700 px-2.5 py-1 rounded-lg flex items-center gap-1 hover:bg-slate-800"
                  >
                    <Phone className="w-3 h-3" />
                    <span>{item.number}</span>
                  </a>
                </div>
                <p className="text-[11px] text-slate-600 dark:text-slate-300 leading-normal">
                  {item.description}
                </p>
              </div>
            );
          })}
        </div>

        <div className="p-4 border-t border-slate-100 dark:border-slate-800 bg-slate-50 dark:bg-slate-900">
          <button
            onClick={onClose}
            className="w-full bg-slate-900 dark:bg-slate-800 hover:bg-slate-800 text-white text-xs font-bold py-2.5 rounded-xl"
          >
            إغلاق
          </button>
        </div>
      </div>
    </div>
  );
};
