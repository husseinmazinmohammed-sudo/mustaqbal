/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { AppTab, PillarId, UserRole, PocketGuide, EducationalModule, BookedConsultation } from './types';
import { DesktopNavbar } from './components/DesktopNavbar';
import { DesktopFooter } from './components/DesktopFooter';
import { HomeTab } from './components/tabs/HomeTab';
import { ModulesTab } from './components/tabs/ModulesTab';
import { ConsultationTab } from './components/tabs/ConsultationTab';
import { GuidesTab } from './components/tabs/GuidesTab';
import { ProfileTab } from './components/tabs/ProfileTab';
import { GuideViewerModal } from './components/modals/GuideViewerModal';
import { ShareCardModal } from './components/modals/ShareCardModal';
import { QuizModal } from './components/modals/QuizModal';
import { HotlineModal } from './components/modals/HotlineModal';
import { POCKET_GUIDES } from './data/guidesData';

export default function App() {
  const [activeTab, setActiveTab] = useState<AppTab>('home');
  const [userRole, setUserRole] = useState<UserRole>('visitor');
  const [selectedPillar, setSelectedPillar] = useState<PillarId | null>(null);
  const [selectedCalculator, setSelectedCalculator] = useState<'radiation' | 'electrical' | 'green' | null>(null);

  // User state
  const [bookmarkedGuideIds, setBookmarkedGuideIds] = useState<string[]>([
    'guide-rad-safety',
    'guide-elec-safety'
  ]);
  const [earnedBadges, setEarnedBadges] = useState<string[]>(['badge-rad']);
  const [bookedConsultations, setBookedConsultations] = useState<BookedConsultation[]>([
    {
      id: 'TKT-829103',
      visitorName: 'فريق فحص الجودة الإكلينيكية',
      hospitalDepartment: 'غرف العمليات المركبة (Hybrid OR)',
      topic: 'استشارة السلامة الكهربائية ونظام الطاقة المعزول IPS',
      pillar: 'electrical',
      date: '2026-11-12',
      timeSlot: '11:00 صباحاً',
      urgency: 'routine',
      notes: 'التحقق من تيار تسريب أجهزة تخطيط وتبريد القلب في الحالة الطبيعية',
      status: 'confirmed'
    }
  ]);

  // Modals state
  const [activeGuideModal, setActiveGuideModal] = useState<PocketGuide | null>(null);
  const [activeShareCardModal, setActiveShareCardModal] = useState<PocketGuide | null>(null);
  const [activeQuizModule, setActiveQuizModule] = useState<EducationalModule | null>(null);
  const [isHotlineOpen, setIsHotlineOpen] = useState(false);

  const handleToggleBookmark = (guideId: string) => {
    setBookmarkedGuideIds((prev) =>
      prev.includes(guideId) ? prev.filter((id) => id !== guideId) : [...prev, guideId]
    );
  };

  const handleEarnBadge = (badgeId: string) => {
    setEarnedBadges((prev) => (prev.includes(badgeId) ? prev : [...prev, badgeId]));
  };

  const handleOpenCalculator = (calcId: 'radiation' | 'electrical' | 'green') => {
    setSelectedCalculator(calcId);
    setActiveTab('consultation');
  };

  const handleOpenGuideById = (guideId: string) => {
    const found = POCKET_GUIDES.find((g) => g.id === guideId);
    if (found) {
      setActiveGuideModal(found);
    }
  };

  const handleOpenGuideByPillar = (pillar: PillarId) => {
    const found = POCKET_GUIDES.find((g) => g.pillar === pillar);
    if (found) {
      setActiveGuideModal(found);
    }
  };

  const handleBookConsultation = (newBooking: BookedConsultation) => {
    setBookedConsultations((prev) => [newBooking, ...prev]);
  };

  return (
    <div className="min-h-screen bg-[#f8faf9] flex flex-col font-sans text-slate-800 antialiased" dir="rtl">
      {/* Desktop Top Full-Width Navigation Bar */}
      <DesktopNavbar
        activeTab={activeTab}
        onTabChange={(tab) => {
          setActiveTab(tab);
          if (tab !== 'consultation') setSelectedCalculator(null);
        }}
        currentRole={userRole}
        onRoleChange={setUserRole}
        savedGuidesCount={bookmarkedGuideIds.length}
        onOpenHotline={() => setIsHotlineOpen(true)}
      />

      {/* Main Content Full-Width Desktop Workspace Container (up to 1440px) */}
      <main className="flex-1 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {activeTab === 'home' && (
          <HomeTab
            userRole={userRole}
            onNavigateTab={setActiveTab}
            onSelectPillar={(pillar) => {
              setSelectedPillar(pillar);
              setActiveTab('modules');
            }}
            onOpenCalculator={handleOpenCalculator}
            onOpenGuide={handleOpenGuideById}
          />
        )}

        {activeTab === 'modules' && (
          <ModulesTab
            selectedPillar={selectedPillar}
            onSelectPillar={setSelectedPillar}
            onStartQuiz={(module) => setActiveQuizModule(module)}
            onOpenGuideByPillar={handleOpenGuideByPillar}
          />
        )}

        {activeTab === 'consultation' && (
          <ConsultationTab
            initialCalculator={selectedCalculator}
            onBookConsultation={handleBookConsultation}
            bookedConsultations={bookedConsultations}
          />
        )}

        {activeTab === 'guides' && (
          <GuidesTab
            onOpenGuideModal={(guide) => setActiveGuideModal(guide)}
            onOpenShareCardModal={(guide) => setActiveShareCardModal(guide)}
            bookmarkedGuideIds={bookmarkedGuideIds}
            onToggleBookmark={handleToggleBookmark}
          />
        )}

        {activeTab === 'profile' && (
          <ProfileTab
            userRole={userRole}
            earnedBadges={earnedBadges}
            bookmarkedGuideIds={bookmarkedGuideIds}
            bookedConsultations={bookedConsultations}
            onOpenGuide={(guide) => setActiveGuideModal(guide)}
            onOpenHotline={() => setIsHotlineOpen(true)}
          />
        )}
      </main>

      {/* Desktop Full-Width Footer */}
      <DesktopFooter
        onNavigateTab={setActiveTab}
        onOpenHotline={() => setIsHotlineOpen(false)}
      />

      {/* Modals & Dialogs */}
      <GuideViewerModal
        guide={activeGuideModal}
        onClose={() => setActiveGuideModal(null)}
        onOpenShareCard={(guide) => {
          setActiveGuideModal(null);
          setActiveShareCardModal(guide);
        }}
        isBookmarked={activeGuideModal ? bookmarkedGuideIds.includes(activeGuideModal.id) : false}
        onToggleBookmark={handleToggleBookmark}
      />

      <ShareCardModal
        guide={activeShareCardModal}
        onClose={() => setActiveShareCardModal(null)}
      />

      <QuizModal
        module={activeQuizModule}
        onClose={() => setActiveQuizModule(null)}
        onEarnBadge={handleEarnBadge}
      />

      {isHotlineOpen && <HotlineModal onClose={() => setIsHotlineOpen(false)} />}
    </div>
  );
}
