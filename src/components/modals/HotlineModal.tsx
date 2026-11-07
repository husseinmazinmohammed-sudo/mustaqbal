import React from 'react';
import { X, Phone, AlertTriangle, Zap, Radiation, Building2 } from 'lucide-react';

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
      color: 'text-amber-700 bg-amber-50 border-amber-200'
    },
    {
      title: 'طوارئ الهندسة الطبية والأمان الكهربائي',
      number: '9200-BME-ELEC',
      description: 'إنذار أنظمة العزل LIM، تسريب تيار الصدمة، وأعطال أجهزة الإنعاش والعناية',
      icon: Zap,
      color: 'text-sky-700 bg-sky-50 border-sky-200'
    },
    {
      title: 'إدارة السلامة البيئية والنفايات الطبية',
      number: '9200-ECO-HOSP',
      description: 'انسكابات كيميائية، تسرب الزئبق، وتكدس نفايات حيوية خطرة',
      icon: Building2,
      color: 'text-teal-700 bg-teal-50 border-teal-200'
    }
  ];

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4 no-print" dir="rtl">
      <div className="w-full max-w-md bg-white rounded-3xl overflow-hidden shadow-2xl border border-slate-200 flex flex-col">
        {/* Header */}
        <div className="px-6 py-4 bg-slate-50 border-b border-slate-200 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <AlertTriangle className="w-5 h-5 text-rose-600" />
            <span className="text-xs font-semibold text-slate-900">
              خطوط طوارئ السلامة المهنية والإشعاعية (24/7)
            </span>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-xl bg-white border border-slate-200 flex items-center justify-center text-slate-500 hover:text-slate-900 cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Hotlines List */}
        <div className="p-5 space-y-3">
          {hotlines.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div
                key={idx}
                className={`p-4 rounded-2xl border text-right space-y-1.5 ${item.color}`}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Icon className="w-4 h-4" />
                    <h4 className="text-xs font-semibold text-slate-900">
                      {item.title}
                    </h4>
                  </div>
                  <a
                    href={`tel:${item.number}`}
                    className="font-mono text-xs font-semibold text-white bg-slate-900 px-3 py-1 rounded-lg flex items-center gap-1.5 hover:bg-slate-800"
                  >
                    <Phone className="w-3 h-3" />
                    <span>{item.number}</span>
                  </a>
                </div>
                <p className="text-xs font-light text-slate-600 leading-relaxed">
                  {item.description}
                </p>
              </div>
            );
          })}
        </div>

        <div className="p-4 border-t border-slate-200 bg-slate-50">
          <button
            onClick={onClose}
            className="w-full bg-slate-900 hover:bg-slate-800 text-white text-xs font-medium py-2.5 rounded-xl cursor-pointer"
          >
            إغلاق
          </button>
        </div>
      </div>
    </div>
  );
};
