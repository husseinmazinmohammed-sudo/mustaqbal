import React, { useState, useEffect } from 'react';
import { Wifi, Battery } from 'lucide-react';

export const IOSStatusBar: React.FC = () => {
  const [time, setTime] = useState('09:41');

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const hours = now.getHours().toString().padStart(2, '0');
      const minutes = now.getMinutes().toString().padStart(2, '0');
      setTime(`${hours}:${minutes}`);
    };
    updateTime();
    const interval = setInterval(updateTime, 30000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="w-full flex items-center justify-between px-7 pt-3.5 pb-1 text-slate-900 dark:text-white text-[13px] font-semibold tracking-tight select-none">
      {/* Right side in RTL (Time) */}
      <span className="font-mono text-xs tabular-nums text-right">{time}</span>

      {/* Left side in RTL (Cellular, Wifi, Battery) */}
      <div className="flex items-center gap-2">
        {/* Cellular Signal Bars */}
        <div className="flex items-end gap-0.5 h-3">
          <span className="w-0.5 h-1 bg-current rounded-full"></span>
          <span className="w-0.5 h-1.5 bg-current rounded-full"></span>
          <span className="w-0.5 h-2 bg-current rounded-full"></span>
          <span className="w-0.5 h-2.5 bg-current rounded-full"></span>
        </div>

        {/* WiFi */}
        <Wifi className="w-3.5 h-3.5" />

        {/* Battery with percentage bar */}
        <div className="flex items-center gap-1">
          <span className="text-[10px] font-mono">100%</span>
          <div className="w-5 h-2.5 border border-current rounded-[3px] p-0.5 flex items-center">
            <div className="w-full h-full bg-emerald-500 rounded-[1px]"></div>
          </div>
        </div>
      </div>
    </div>
  );
};
