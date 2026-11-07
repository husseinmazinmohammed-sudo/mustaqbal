import React from 'react';
import { Home, BookOpen, MessageSquareText, FileText, UserCheck } from 'lucide-react';
import { AppTab } from '../types';

interface BottomTabBarProps {
  activeTab: AppTab;
  onTabChange: (tab: AppTab) => void;
  savedGuidesCount?: number;
}

export const BottomTabBar: React.FC<BottomTabBarProps> = ({
  activeTab,
  onTabChange,
  savedGuidesCount = 0
}) => {
  const tabs: { id: AppTab; label: string; icon: React.FC<{ className?: string }> }[] = [
    { id: 'home', label: 'الرئيسية', icon: Home },
    { id: 'modules', label: 'عروض تثقيفية', icon: BookOpen },
    { id: 'consultation', label: 'استشارات', icon: MessageSquareText },
    { id: 'guides', label: 'أدلة هندسية', icon: FileText },
    { id: 'profile', label: 'إنجازاتي', icon: UserCheck }
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-40 bg-white/95 dark:bg-slate-900/95 backdrop-blur-md border-t border-slate-200/60 dark:border-slate-800/60 transition-colors">
      <div className="max-w-md mx-auto grid grid-cols-5 items-center h-16 px-1 pb-safe">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;

          return (
            <button
              key={tab.id}
              onClick={() => onTabChange(tab.id)}
              className="relative flex flex-col items-center justify-center py-1 min-h-[44px] text-center focus:outline-none transition-transform active:scale-95"
            >
              <div className="relative">
                <Icon
                  className={`w-5 h-5 transition-colors ${
                    isActive
                      ? 'text-teal-700 dark:text-teal-400 stroke-[2.2]'
                      : 'text-slate-400 dark:text-slate-500 hover:text-slate-600 dark:hover:text-slate-300 stroke-[1.6]'
                  }`}
                />
                {tab.id === 'guides' && savedGuidesCount > 0 && (
                  <span className="absolute -top-1 -right-2 w-3.5 h-3.5 bg-teal-600 text-white text-[8px] font-medium rounded-full flex items-center justify-center">
                    {savedGuidesCount}
                  </span>
                )}
              </div>
              <span
                className={`text-[10px] tracking-tight mt-1 transition-colors ${
                  isActive
                    ? 'text-teal-800 dark:text-teal-300 font-medium'
                    : 'text-slate-500 dark:text-slate-400 font-light'
                }`}
              >
                {tab.label}
              </span>
            </button>
          );
        })}
      </div>
    </nav>
  );
};
