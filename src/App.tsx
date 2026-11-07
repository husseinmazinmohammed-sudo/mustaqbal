/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { BellRing, X, ArrowLeft } from 'lucide-react';
import {
  AppTab,
  PillarId,
  UserRole,
  PocketGuide,
  EducationalModule,
  BookedConsultation,
  AppNotification,
  ProfileTask
} from './types';
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
import { EmailConfirmationModal } from './components/modals/EmailConfirmationModal';
import { POCKET_GUIDES } from './data/guidesData';

export default function App() {
  const [activeTab, setActiveTab] = useState<AppTab>('home');
  const [userRole, setUserRole] = useState<UserRole>('visitor');
  const [selectedPillar, setSelectedPillar] = useState<PillarId | null>(null);
  const [selectedCalculator, setSelectedCalculator] = useState<'radiation' | 'electrical' | 'green' | null>(null);
  const [pendingEmailBooking, setPendingEmailBooking] = useState<BookedConsultation | null>(null);

  // User state
  const [bookmarkedGuideIds, setBookmarkedGuideIds] = useState<string[]>([
    'guide-rad-safety',
    'guide-elec-safety'
  ]);
  const [earnedBadges, setEarnedBadges] = useState<string[]>(['badge-rad']);
  const [bookedConsultations, setBookedConsultations] = useState<BookedConsultation[]>([
    {
      id: 'AMU-829103',
      visitorName: 'فريق فحص الجودة الإكلينيكية',
      visitorEmail: 'quality.bme@mustaqbal-hospital.iq',
      visitorPhone: '07801234567',
      hospitalDepartment: 'غرف العمليات المركبة (Hybrid OR)',
      topic: 'استشارة السلامة الكهربائية ونظام الطاقة المعزول IPS',
      pillar: 'electrical',
      date: '2026-11-12',
      timeSlot: '11:00 صباحاً',
      urgency: 'routine',
      notes: 'التحقق من تيار تسريب أجهزة تخطيط وتبريد القلب في الحالة الطبيعية وفق IEC 60601-1',
      status: 'confirmed',
      emailNotificationSent: true,
      emailSentAt: '10:30 ص',
      reminderActive: true
    }
  ]);

  // Profile Tasks state
  const [profileTasks, setProfileTasks] = useState<ProfileTask[]>([
    {
      id: 'task-1',
      title: 'تجهيز سجل فحص تيار التسريب الكهربائي (Type CF) قبل موعد الاستشارة',
      description: 'تحضير قراءات جهاز محلل السلامة الكهربائية لغرف العمليات المركبة قبل جلسة الاستشارة المؤكدة #AMU-829103.',
      category: 'consultation_prep',
      dueDate: '2026-11-11',
      priority: 'high',
      completed: false,
      pillar: 'electrical',
      linkedTab: 'consultation'
    },
    {
      id: 'task-2',
      title: 'استكمال اختبار الكفاءة المعرفية للسلامة الكهربائية (IEC 60601-1)',
      description: 'اجتياز التقييم التفاعلي في قسم العروض التثقيفية للحصول على وسام محترف الأمان الكهربائي.',
      category: 'badge_completion',
      dueDate: '2026-11-14',
      priority: 'routine',
      completed: false,
      pillar: 'electrical',
      linkedTab: 'modules'
    },
    {
      id: 'task-3',
      title: 'مراجعة وطباعة الفورما الموحدة للوقاية الإشعاعية (AMU-BME-RAD-01)',
      description: 'تصدير الفورما الرسمية بحجم A4 وتوزيعها على الكادر الهندسي والتمريضي في قسم الأشعة التشخيصية.',
      category: 'guide_review',
      dueDate: '2026-11-10',
      priority: 'critical',
      completed: false,
      pillar: 'radiation',
      linkedTab: 'guides',
      linkedGuideId: 'guide-rad-safety'
    }
  ]);

  // In-App Notifications state
  const [notifications, setNotifications] = useState<AppNotification[]>([
    {
      id: 'notif-consult-1',
      title: 'تذكير بموعد استشارة مؤكدة (#AMU-829103)',
      message: 'لديك جلسة استشارة مؤكدة حول "نظام الطاقة المعزول IPS" بتاريخ 2026-11-12 الساعة 11:00 صباحاً في غرف العمليات المركبة.',
      category: 'consultation_reminder',
      timestamp: 'منذ 5 دقائق',
      isRead: false,
      priority: 'high',
      relatedTab: 'profile',
      relatedBookingId: 'AMU-829103',
      actionLabel: 'معاينة التذكرة في البروفايل'
    },
    {
      id: 'notif-task-1',
      title: 'مهمة جديدة في البروفايل: تجهيز سجل تيار التسريب Type CF',
      message: 'يرجى إتمام فحص القبول الأولي وتجهيز القراءات الهندسية قبل موعد الاستشارة القادم لضمان دقة التقييم.',
      category: 'profile_task',
      timestamp: 'منذ 15 دقيقة',
      isRead: false,
      priority: 'urgent',
      relatedTab: 'profile',
      relatedTaskId: 'task-1',
      actionLabel: 'فتح مهام البروفايل'
    },
    {
      id: 'notif-guide-1',
      title: 'اعتماد الفورما الرسمية الموحدة للطباعة (A4) لجامعة المستقبل',
      message: 'تم توحيد جميع الأدلة في فورما قياسية منظمة بجداول رسمية جاهزة للطباعة المباشرة وتصدير PDF.',
      category: 'guide_release',
      timestamp: 'اليوم',
      isRead: false,
      priority: 'normal',
      relatedTab: 'guides',
      relatedGuideId: 'guide-rad-safety',
      actionLabel: 'معاينة وطباعة الفورما'
    }
  ]);

  const [activeToast, setActiveToast] = useState<AppNotification | null>(null);

  // Modals state
  const [activeGuideModal, setActiveGuideModal] = useState<PocketGuide | null>(null);
  const [autoPrintGuideModal, setAutoPrintGuideModal] = useState<boolean>(false);
  const [activeShareCardModal, setActiveShareCardModal] = useState<PocketGuide | null>(null);
  const [activeQuizModule, setActiveQuizModule] = useState<EducationalModule | null>(null);
  const [isHotlineOpen, setIsHotlineOpen] = useState(false);

  const pushNotification = (notif: Omit<AppNotification, 'id' | 'timestamp' | 'isRead'>) => {
    const created: AppNotification = {
      ...notif,
      id: `notif-${Date.now()}-${Math.random().toString(36).slice(2, 6)}`,
      timestamp: 'الآن',
      isRead: false
    };
    setNotifications((prev) => [created, ...prev]);
    setActiveToast(created);
    setTimeout(() => {
      setActiveToast((current) => (current?.id === created.id ? null : current));
    }, 6000);
  };

  const handleMarkNotificationRead = (id: string) => {
    setNotifications((prev) =>
      prev.map((n) => (n.id === id ? { ...n, isRead: true } : n))
    );
  };

  const handleMarkAllNotificationsRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, isRead: true })));
  };

  const handleDeleteNotification = (id: string) => {
    setNotifications((prev) => prev.filter((n) => n.id !== id));
  };

  const handleNotificationNavigate = (notif: AppNotification) => {
    handleMarkNotificationRead(notif.id);
    if (notif.relatedGuideId) {
      const g = POCKET_GUIDES.find((item) => item.id === notif.relatedGuideId);
      if (g) {
        setAutoPrintGuideModal(false);
        setActiveGuideModal(g);
        return;
      }
    }
    if (notif.relatedTab) {
      setActiveTab(notif.relatedTab);
    }
  };

  const handleTriggerConsultationReminder = (booking: BookedConsultation) => {
    setBookedConsultations((prev) =>
      prev.map((b) => (b.id === booking.id ? { ...b, reminderActive: true } : b))
    );
    pushNotification({
      title: `تذكير فوري بموعد الاستشارة المؤكدة (#${booking.id})`,
      message: `تذكير بموعد جلسة "${booking.topic}" لصالح (${booking.visitorName} - ${booking.hospitalDepartment}) بتاريخ ${booking.date} الساعة ${booking.timeSlot}.`,
      category: 'consultation_reminder',
      priority: 'high',
      relatedTab: 'profile',
      relatedBookingId: booking.id,
      actionLabel: 'استعراض التذكرة'
    });
  };

  const handleToggleProfileTask = (taskId: string) => {
    setProfileTasks((prev) =>
      prev.map((task) => {
        if (task.id === taskId) {
          const nextCompleted = !task.completed;
          if (nextCompleted) {
            pushNotification({
              title: 'إنجاز مهمة في ملف الكفاءة المهنية ✓',
              message: `تم إكمال المهمة: "${task.title}" وتحديث سجل الإنجاز في قسم البروفايل.`,
              category: 'profile_task',
              priority: 'normal',
              relatedTab: 'profile',
              actionLabel: 'عرض سجل المهام'
            });
          }
          return { ...task, completed: nextCompleted };
        }
        return task;
      })
    );
  };

  const handleAddProfileTask = (
    title: string,
    description: string,
    dueDate: string,
    priority: ProfileTask['priority'],
    pillar: PillarId
  ) => {
    const newTask: ProfileTask = {
      id: `task-${Date.now()}`,
      title,
      description,
      category: 'safety_audit',
      dueDate,
      priority,
      completed: false,
      pillar,
      linkedTab: 'profile'
    };
    setProfileTasks((prev) => [newTask, ...prev]);
    pushNotification({
      title: `مهمة جديدة مضافة في البروفايل: ${title}`,
      message: `تاريخ الاستحقاق: ${dueDate} — ${description}`,
      category: 'profile_task',
      priority: priority === 'critical' ? 'urgent' : priority === 'high' ? 'high' : 'normal',
      relatedTab: 'profile',
      relatedTaskId: newTask.id,
      actionLabel: 'متابعة المهمة'
    });
  };

  const handleToggleBookmark = (guideId: string) => {
    setBookmarkedGuideIds((prev) =>
      prev.includes(guideId) ? prev.filter((id) => id !== guideId) : [...prev, guideId]
    );
  };

  const handleEarnBadge = (badgeId: string) => {
    setEarnedBadges((prev) => {
      if (prev.includes(badgeId)) return prev;
      pushNotification({
        title: 'تهانينا! وسام كفاءة مهني جديد في البروفايل',
        message: 'تم اجتياز اختبار الكفاءة المعرفية بنجاح وإضافة الوسام إلى سجل الكفاءة المهنية الخاص بك.',
        category: 'profile_task',
        priority: 'high',
        relatedTab: 'profile',
        actionLabel: 'معاينة الأوسمة'
      });
      return [...prev, badgeId];
    });
  };

  const handleOpenCalculator = (calcId: 'radiation' | 'electrical' | 'green') => {
    setSelectedCalculator(calcId);
    setActiveTab('consultation');
  };

  const handleOpenGuideById = (guideId: string) => {
    const found = POCKET_GUIDES.find((g) => g.id === guideId);
    if (found) {
      setAutoPrintGuideModal(false);
      setActiveGuideModal(found);
    }
  };

  const handleOpenGuideByPillar = (pillar: PillarId) => {
    const found = POCKET_GUIDES.find((g) => g.pillar === pillar);
    if (found) {
      setAutoPrintGuideModal(false);
      setActiveGuideModal(found);
    }
  };

  const handleBookConsultation = (newBooking: BookedConsultation) => {
    const bookingWithReminder: BookedConsultation = {
      ...newBooking,
      reminderActive: true,
      emailNotificationSent: true
    };
    setBookedConsultations((prev) => [bookingWithReminder, ...prev]);

    // Also create a preparatory task in ProfileTab and push an In-App Notification
    const prepTask: ProfileTask = {
      id: `task-prep-${newBooking.id}`,
      title: `تحضير بيانات الاستشارة المؤكدة (#${newBooking.id}) - ${newBooking.topic}`,
      description: `موعد الجلسة: ${newBooking.date} (${newBooking.timeSlot}) لقسم ${newBooking.hospitalDepartment}.`,
      category: 'consultation_prep',
      dueDate: newBooking.date,
      priority: newBooking.urgency === 'critical' ? 'critical' : 'high',
      completed: false,
      pillar: newBooking.pillar,
      linkedTab: 'profile'
    };
    setProfileTasks((prev) => [prepTask, ...prev]);

    pushNotification({
      title: `تم تأكيد الحجز (#${newBooking.id}) وإرسال الإشعار التلقائي لبريد المنصة`,
      message: `تم إرسال إشعار الحجز تلقائياً إلى hassinmazin301@gmail.com وتفعيل تذكير الموعد (${newBooking.date} - ${newBooking.timeSlot}) في البروفايل.`,
      category: 'consultation_reminder',
      priority: newBooking.urgency === 'critical' ? 'urgent' : 'high',
      relatedTab: 'profile',
      relatedBookingId: newBooking.id,
      actionLabel: 'عرض في البروفايل'
    });
  };

  const handleEmailSentSuccess = (bookingId: string) => {
    setBookedConsultations((prev) =>
      prev.map((item) =>
        item.id === bookingId
          ? {
              ...item,
              emailNotificationSent: true,
              emailSentAt: new Date().toLocaleTimeString('ar-IQ', { hour: '2-digit', minute: '2-digit' })
            }
          : item
      )
    );
    pushNotification({
      title: `تم إرسال إشعار البريد للتذكرة (#${bookingId}) تلقائياً`,
      message: 'تم إرسال تفاصيل حجز الاستشارة مباشرة إلى البريد المعتمد hassinmazin301@gmail.com بدون تسجيل دخول.',
      category: 'system_update',
      priority: 'normal',
      relatedTab: 'profile',
      actionLabel: 'فتح سجل التذاكر'
    });
  };

  return (
    <div className="min-h-screen bg-[#f6faf8] flex flex-col font-sans text-slate-800 antialiased" dir="rtl">
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
        notifications={notifications}
        onMarkNotificationRead={handleMarkNotificationRead}
        onMarkAllNotificationsRead={handleMarkAllNotificationsRead}
        onDeleteNotification={handleDeleteNotification}
        onNotificationNavigate={handleNotificationNavigate}
      />

      {/* Main Content Full-Width Desktop Workspace Container (hidden during PDF Print so only the Official Document Modal prints) */}
      <main className="no-print flex-1 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
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
            onRequestEmailNotification={(booking) => setPendingEmailBooking(booking)}
          />
        )}

        {activeTab === 'guides' && (
          <GuidesTab
            onOpenGuideModal={(guide, autoPrint = false) => {
              setAutoPrintGuideModal(autoPrint);
              setActiveGuideModal(guide);
            }}
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
            onOpenGuide={(guide, autoPrint = false) => {
              setAutoPrintGuideModal(autoPrint);
              setActiveGuideModal(guide);
            }}
            onOpenHotline={() => setIsHotlineOpen(true)}
            onRequestEmailNotification={(booking) => setPendingEmailBooking(booking)}
            notifications={notifications}
            onMarkNotificationRead={handleMarkNotificationRead}
            onMarkAllNotificationsRead={handleMarkAllNotificationsRead}
            onDeleteNotification={handleDeleteNotification}
            onNotificationNavigate={handleNotificationNavigate}
            onTriggerConsultationReminder={handleTriggerConsultationReminder}
            profileTasks={profileTasks}
            onToggleProfileTask={handleToggleProfileTask}
            onAddProfileTask={handleAddProfileTask}
          />
        )}
      </main>

      {/* Live Floating In-App Notification Toast (Soft Light Clinical Styling) */}
      {activeToast && (
        <div
          className="fixed bottom-5 left-5 z-50 w-80 sm:w-96 bg-white text-slate-800 rounded-2xl p-4 shadow-xl border-2 border-teal-300 flex items-start justify-between gap-3 no-print"
          dir="rtl"
        >
          <div className="flex items-start gap-3">
            <div className="w-9 h-9 rounded-xl bg-teal-50 border border-teal-200 flex items-center justify-center shrink-0 mt-0.5">
              <BellRing className="w-4 h-4 text-teal-700 animate-bounce" />
            </div>
            <div className="space-y-1">
              <span className="text-xs font-semibold text-teal-950 block leading-snug">
                {activeToast.title}
              </span>
              <p className="text-[11px] font-light text-slate-600 leading-relaxed">
                {activeToast.message}
              </p>
              {activeToast.actionLabel && (
                <button
                  onClick={() => {
                    handleNotificationNavigate(activeToast);
                    setActiveToast(null);
                  }}
                  className="pt-1 text-[11px] font-semibold text-teal-700 hover:text-teal-900 flex items-center gap-1 cursor-pointer"
                >
                  <span>{activeToast.actionLabel}</span>
                  <ArrowLeft className="w-3 h-3" />
                </button>
              )}
            </div>
          </div>

          <button
            onClick={() => setActiveToast(null)}
            className="text-slate-400 hover:text-slate-700 p-1 cursor-pointer shrink-0"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      )}

      {/* Desktop Full-Width Footer */}
      <DesktopFooter
        onNavigateTab={setActiveTab}
        onOpenHotline={() => setIsHotlineOpen(true)}
      />

      {/* Modals & Official Printable Documents */}
      <GuideViewerModal
        guide={activeGuideModal}
        autoGeneratePdf={autoPrintGuideModal}
        onClose={() => {
          setActiveGuideModal(null);
          setAutoPrintGuideModal(false);
        }}
        onOpenShareCard={(guide) => {
          setActiveGuideModal(null);
          setAutoPrintGuideModal(false);
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

      <EmailConfirmationModal
        booking={pendingEmailBooking}
        onClose={() => setPendingEmailBooking(null)}
        onEmailSentSuccess={handleEmailSentSuccess}
      />
    </div>
  );
}
