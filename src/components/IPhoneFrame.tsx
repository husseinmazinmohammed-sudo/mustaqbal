import React from 'react';
import { IOSStatusBar } from './IOSStatusBar';
import { DynamicIsland } from './DynamicIsland';
import { Smartphone, Monitor } from 'lucide-react';

interface IPhoneFrameProps {
  children: React.ReactNode;
  isIPhoneFrame: boolean;
  onToggleFrame: () => void;
}

export const IPhoneFrame: React.FC<IPhoneFrameProps> = ({
  children,
  isIPhoneFrame,
  onToggleFrame
}) => {
  if (!isIPhoneFrame) {
    return (
      <div className="min-h-screen bg-[#f5f8f7] dark:bg-[#0e1726] flex flex-col justify-between">
        <div className="w-full max-w-md mx-auto min-h-screen bg-[#fafcfb] dark:bg-[#121c2d] shadow-sm relative pb-20 flex flex-col border-x border-slate-200/50 dark:border-slate-800/60">
          <IOSStatusBar />
          <DynamicIsland />
          <main className="flex-1">{children}</main>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-900 via-slate-800 to-slate-900 py-6 px-4 flex flex-col items-center justify-center transition-all">
      {/* Top Banner Toolbar for switching view */}
      <div className="mb-4 flex items-center justify-between w-full max-w-[420px] text-xs text-slate-300">
        <span className="font-normal flex items-center gap-1.5 text-slate-300">
          <span className="w-2 h-2 rounded-full bg-teal-400"></span>
          <span>محاكي آيفون الطبي (ألوان مهدئة وخط مريح)</span>
        </span>
        <button
          onClick={onToggleFrame}
          className="flex items-center gap-1 bg-white/10 hover:bg-white/20 text-white px-2.5 py-1 rounded-lg transition-colors border border-white/10 font-normal"
        >
          <Monitor className="w-3.5 h-3.5" />
          <span>العرض الكامل للمتصفح</span>
        </button>
      </div>

      {/* iPhone 16 Pro Titanium Chassis */}
      <div className="relative w-full max-w-[400px] h-[850px] bg-slate-800/95 rounded-[54px] p-3 shadow-[0_20px_50px_-15px_rgba(0,0,0,0.6)] border-[4px] border-slate-700/70 ring-1 ring-white/10 select-none flex flex-col">
        {/* Left side hardware buttons */}
        <div className="absolute -left-[7px] top-[120px] w-[3px] h-[26px] bg-slate-600 rounded-l-sm" title="Action Button"></div>
        <div className="absolute -left-[7px] top-[165px] w-[3px] h-[50px] bg-slate-600 rounded-l-sm" title="Volume Up"></div>
        <div className="absolute -left-[7px] top-[225px] w-[3px] h-[50px] bg-slate-600 rounded-l-sm" title="Volume Down"></div>

        {/* Right side power button */}
        <div className="absolute -right-[7px] top-[180px] w-[3px] h-[75px] bg-slate-600 rounded-r-sm" title="Power / Siri Button"></div>

        {/* iPhone Screen Area */}
        <div className="relative w-full h-full bg-[#fafcfb] dark:bg-[#121c2d] rounded-[44px] overflow-hidden flex flex-col border border-slate-900/30">
          {/* iOS Status Bar */}
          <IOSStatusBar />

          {/* Dynamic Island */}
          <DynamicIsland />

          {/* Scrollable Content inside iPhone */}
          <div className="flex-1 overflow-y-auto no-scrollbar pb-20 text-slate-800 dark:text-slate-200">
            {children}
          </div>

          {/* iPhone Home Indicator bar */}
          <div className="absolute bottom-2 left-1/2 -translate-x-1/2 w-32 h-1 bg-slate-400 dark:bg-slate-600 rounded-full z-50 pointer-events-none"></div>
        </div>
      </div>
    </div>
  );
};
