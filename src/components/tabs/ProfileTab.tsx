import React, { useState } from 'react';
import { 
  Award, 
  Bookmark, 
  Ticket, 
  Phone, 
  ShieldCheck, 
  CheckCircle,
  FileText,
  Zap,
  Radiation,
  Leaf,
  Stethoscope,
  Mail,
  Send,
  Bell,
  BellRing,
  ClipboardList,
  Plus,
  CheckCheck,
  Clock,
  Calendar,
  Sparkles,
  CheckSquare,
  Square,
  Trash2,
  Printer,
  ArrowLeft
} from 'lucide-react';
import {
  UserRole,
  BookedConsultation,
  PocketGuide,
  AppNotification,
  ProfileTask,
  PillarId
} from '../../types';
import { POCKET_GUIDES } from '../../data/guidesData';
import { TARGET_NOTIFICATION_EMAIL } from '../../services/googleWorkspaceAuth';

interface ProfileTabProps {
  userRole: UserRole;
  earnedBadges: string[];
  bookmarkedGuideIds: string[];
  bookedConsultations: BookedConsultation[];
  onOpenGuide: (guide: PocketGuide, autoPrintPdf?: boolean) => void;
  onOpenHotline: () => void;
  onRequestEmailNotification: (booking: BookedConsultation) => void;
  notifications: AppNotification[];
  onMarkNotificationRead: (id: string) => void;
  onMarkAllNotificationsRead: () => void;
  onDeleteNotification: (id: string) => void;
  onNotificationNavigate: (notification: AppNotification) => void;
  onTriggerConsultationReminder: (booking: BookedConsultation) => void;
  profileTasks: ProfileTask[];
  onToggleProfileTask: (taskId: string) => void;
  onAddProfileTask: (title: string, description: string, dueDate: string, priority: ProfileTask['priority'], pillar: PillarId) => void;
}

export const ProfileTab: React.FC<ProfileTabProps> = ({
  userRole,
  earnedBadges,
  bookmarkedGuideIds,
  bookedConsultations,
  onOpenGuide,
  onOpenHotline,
  onRequestEmailNotification,
  notifications,
  onMarkNotificationRead,
  onMarkAllNotificationsRead,
  onDeleteNotification,
  onNotificationNavigate,
  onTriggerConsultationReminder,
  profileTasks,
  onToggleProfileTask,
  onAddProfileTask
}) => {
  const [notifCategoryFilter, setNotifCategoryFilter] = useState<'all' | 'consultation_reminder' | 'profile_task'>('all');
  const [showAddTaskForm, setShowAddTaskForm] = useState(false);
  const [newTaskTitle, setNewTaskTitle] = useState('');
  const [newTaskDesc, setNewTaskDesc] = useState('');
  const [newTaskDueDate, setNewTaskDueDate] = useState('2026-11-15');
  const [newTaskPriority, setNewTaskPriority] = useState<ProfileTask['priority']>('high');
  const [newTaskPillar, setNewTaskPillar] = useState<PillarId>('electrical');

  const roleNames: Record<UserRole, string> = {
    visitor: 'زائر المنشأة الصحية',
    biomedical_engineer: 'مهندس أجهزة طبية معتمد',
    nurse: 'كادر تمريض إكلينيكي',
    radiologist: 'أخصائي فيزياء وأشعة تشخيصية',
    hospital_admin: 'إدارة السلامة والجودة بالمستشفى'
  };

  const savedGuidesList = POCKET_GUIDES.filter((g) => bookmarkedGuideIds.includes(g.id));
  const unreadNotifsCount = notifications.filter((n) => !n.isRead).length;
  const pendingTasksCount = profileTasks.filter((t) => !t.completed).length;

  const filteredNotifications = notifications.filter((n) => {
    if (notifCategoryFilter === 'all') return true;
    return n.category === notifCategoryFilter;
  });

  const handleCreateTask = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTaskTitle.trim()) return;
    onAddProfileTask(
      newTaskTitle.trim(),
      newTaskDesc.trim() || 'مهمة متابعة هندسية وسريرية مجدولة في ملف الكفاءة.',
      newTaskDueDate,
      newTaskPriority,
      newTaskPillar
    );
    setNewTaskTitle('');
    setNewTaskDesc('');
    setShowAddTaskForm(false);
  };

  const allPossibleBadges = [
    { 
      id: 'badge-rad', 
      title: 'خبير السلامة الإشعاعية ALARA', 
      desc: 'إتقان ثلاثية الوقاية وفحص سترات الرصاص السنوية',
      icon: Radiation, 
      color: 'text-amber-800 bg-amber-50 border-amber-200' 
    },
    { 
      id: 'badge-elec', 
      title: 'محترف الأمان الكهربائي IEC 60601', 
      desc: 'فحص تيارات التسريب وحماية القلب من الصدمة الميكروية',
      icon: Zap, 
      color: 'text-sky-800 bg-sky-50 border-sky-200' 
    },
    { 
      id: 'badge-green', 
      title: 'سفير المستشفيات الخضراء المستدامة', 
      desc: 'تطبيق الركائز السبع للتحول البيئي وفرز النفايات الطبية',
      icon: Leaf, 
      color: 'text-teal-800 bg-teal-50 border-teal-200' 
    },
    { 
      id: 'badge-eng', 
      title: 'ممارس هندسة الرعاية الصحية PPM', 
      desc: 'إنجاز 100% لفحوصات الأجهزة الداعمة للحياة',
      icon: Stethoscope, 
      color: 'text-purple-800 bg-purple-50 border-purple-200' 
    }
  ];

  return (
    <div className="space-y-6 text-slate-700" dir="rtl">
      {/* Gentle Pastel Clinical Profile Header Card */}
      <div className="bg-gradient-to-l from-teal-50/90 via-emerald-50/50 to-sky-50/90 text-slate-800 rounded-3xl p-6 sm:p-8 shadow-2xs space-y-6 border border-teal-200/80">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-2xl bg-teal-700 text-white flex items-center justify-center font-bold shadow-xs">
              <ShieldCheck className="w-8 h-8 text-white" />
            </div>
            <div>
              <div className="flex flex-wrap items-center gap-2">
                <h1 className="text-xl font-semibold text-slate-900">
                  سجل الكفاءة المهنية والتنبيهات والمهام السريرية
                </h1>
                <span className="text-[10px] bg-white text-teal-800 px-2.5 py-0.5 rounded-full border border-teal-200 font-medium">
                  جامعة المستقبل — قسم هندسة تقنيات الأجهزة الطبية
                </span>
              </div>
              <p className="text-sm font-light text-teal-800 mt-0.5">
                الصفة المعتمدة: {roleNames[userRole]}
              </p>
              <span className="text-xs font-mono text-slate-500">
                الرقم الأكاديمي والمهني: #AMU-BME-2026-HQ
              </span>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={onOpenHotline}
              className="bg-rose-50 hover:bg-rose-100 text-rose-800 border border-rose-200 px-4 py-2.5 rounded-xl text-xs font-medium flex items-center gap-2 transition-colors cursor-pointer"
            >
              <Phone className="w-3.5 h-3.5 text-rose-600" />
              <span>خطوط الطوارئ 24/7</span>
            </button>
          </div>
        </div>

        {/* Desktop 4-Column Metric Cards Strip */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 pt-4 border-t border-teal-200/60 text-right">
          <div className="bg-white/90 rounded-2xl p-4 border border-teal-200/70 shadow-2xs">
            <span className="text-xs font-light text-slate-500 block">التنبيهات النشطة غير المقروءة</span>
            <span className="text-2xl font-semibold font-mono text-amber-700 mt-1 block">
              {unreadNotifsCount} <span className="text-xs text-slate-400 font-normal">تنبيهات فورية</span>
            </span>
            <span className="text-[11px] text-slate-400 block mt-1">مواعيد الاستشارات المؤكدة والتحديثات</span>
          </div>

          <div className="bg-white/90 rounded-2xl p-4 border border-teal-200/70 shadow-2xs">
            <span className="text-xs font-light text-slate-500 block">مهام البروفايل قيد الإنجاز</span>
            <span className="text-2xl font-semibold font-mono text-emerald-700 mt-1 block">
              {pendingTasksCount} <span className="text-xs text-slate-400 font-normal">من {profileTasks.length} مهام</span>
            </span>
            <span className="text-[11px] text-slate-400 block mt-1">متابعة الفحوصات الهندسية والسريرية</span>
          </div>

          <div className="bg-white/90 rounded-2xl p-4 border border-teal-200/70 shadow-2xs">
            <span className="text-xs font-light text-slate-500 block">الأوسمة المكتسبة</span>
            <span className="text-2xl font-semibold font-mono text-teal-800 mt-1 block">
              {earnedBadges.length} <span className="text-xs text-slate-400 font-normal">من 4 أوسمة</span>
            </span>
            <span className="text-[11px] text-slate-400 block mt-1">تمنح باجتياز اختبارات العروض التثقيفية</span>
          </div>

          <div className="bg-white/90 rounded-2xl p-4 border border-teal-200/70 shadow-2xs">
            <span className="text-xs font-light text-slate-500 block">تذاكر الاستشارات المؤكدة</span>
            <span className="text-2xl font-semibold font-mono text-purple-700 mt-1 block">
              {bookedConsultations.length} <span className="text-xs text-slate-400 font-normal">تذاكر مجدولة</span>
            </span>
            <span className="text-[11px] text-slate-400 block mt-1">مرتبطة بـ {TARGET_NOTIFICATION_EMAIL}</span>
          </div>
        </div>
      </div>

      {/* NEW SECTION: In-App Notifications Center & Profile Tasks Hub */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Right Column (6 cols): In-App Notifications & Confirmed Consultation Reminders */}
        <div className="lg:col-span-6 bg-white border border-slate-200/80 rounded-3xl p-6 shadow-2xs space-y-4">
          <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-100 pb-3.5">
            <div>
              <h2 className="text-sm font-semibold text-slate-900 flex items-center gap-2">
                <BellRing className="w-4 h-4 text-amber-600" />
                <span>مركز التنبيهات وتذكير مواعيد الاستشارات المؤكدة</span>
                {unreadNotifsCount > 0 && (
                  <span className="text-[10px] font-mono bg-rose-600 text-white px-2 py-0.5 rounded-full">
                    {unreadNotifsCount} جديد
                  </span>
                )}
              </h2>
              <p className="text-[11px] font-light text-slate-500 mt-0.5">
                تنبيهات فورية داخل التطبيق لضمان عدم ضياع مواعيد الاستشارات أو تحديثات المهام
              </p>
            </div>

            {unreadNotifsCount > 0 && (
              <button
                onClick={onMarkAllNotificationsRead}
                className="text-xs font-medium text-teal-700 hover:text-teal-800 bg-teal-50 hover:bg-teal-100 px-3 py-1.5 rounded-xl flex items-center gap-1.5 transition-colors cursor-pointer"
              >
                <CheckCheck className="w-3.5 h-3.5" />
                <span>تحديد الكل كمقروء</span>
              </button>
            )}
          </div>

          {/* Filter Pills */}
          <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar">
            {[
              { id: 'all', label: `كافة التنبيهات (${notifications.length})` },
              {
                id: 'consultation_reminder',
                label: `تذكيرات الاستشارات (${notifications.filter((n) => n.category === 'consultation_reminder').length})`
              },
              {
                id: 'profile_task',
                label: `تنبيهات المهام (${notifications.filter((n) => n.category === 'profile_task').length})`
              }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setNotifCategoryFilter(tab.id as any)}
                className={`px-3 py-1.5 rounded-xl text-xs transition-colors cursor-pointer ${
                  notifCategoryFilter === tab.id
                    ? 'bg-teal-700 text-white font-medium shadow-2xs'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200 font-light'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Notifications Feed */}
          <div className="space-y-2.5 max-h-[380px] overflow-y-auto pr-0.5">
            {filteredNotifications.length === 0 ? (
              <div className="p-6 bg-slate-50 border border-slate-200/60 rounded-2xl text-center text-xs text-slate-400 font-light">
                لا توجد تنبيهات حالية في هذا القسم.
              </div>
            ) : (
              filteredNotifications.map((notif) => {
                const isUrgent = notif.priority === 'urgent' || notif.priority === 'high';
                return (
                  <div
                    key={notif.id}
                    className={`p-4 rounded-2xl border transition-all text-right space-y-2 ${
                      !notif.isRead
                        ? isUrgent
                          ? 'bg-amber-50/50 border-amber-300 shadow-2xs'
                          : 'bg-teal-50/40 border-teal-300 shadow-2xs'
                        : 'bg-slate-50/70 border-slate-200/80 opacity-85'
                    }`}
                  >
                    <div className="flex items-start justify-between gap-2">
                      <div className="flex items-center gap-2">
                        <span
                          className={`text-[10px] font-medium px-2 py-0.5 rounded-md border ${
                            notif.category === 'consultation_reminder'
                              ? 'bg-purple-50 text-purple-800 border-purple-200'
                              : notif.category === 'profile_task'
                              ? 'bg-amber-50 text-amber-800 border-amber-200'
                              : 'bg-teal-50 text-teal-800 border-teal-200'
                          }`}
                        >
                          {notif.category === 'consultation_reminder'
                            ? 'تذكير موعد استشارة مؤكدة'
                            : notif.category === 'profile_task'
                            ? 'تنبيه مهمة بروفايل جديدة'
                            : 'تحديث رسمي'}
                        </span>
                        {!notif.isRead && (
                          <span className="text-[10px] font-semibold bg-teal-700 text-white px-2 py-0.5 rounded-full">
                            جديد
                          </span>
                        )}
                      </div>

                      <div className="flex items-center gap-1.5">
                        <span className="text-[10px] font-mono text-slate-400 flex items-center gap-1">
                          <Clock className="w-3 h-3" />
                          <span>{notif.timestamp}</span>
                        </span>
                        <button
                          onClick={() => onDeleteNotification(notif.id)}
                          className="text-slate-300 hover:text-rose-600 p-1 cursor-pointer"
                          title="إزالة التنبيه"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>

                    <div>
                      <h4 className="text-xs font-semibold text-slate-900">{notif.title}</h4>
                      <p className="text-xs font-light text-slate-600 mt-1 leading-relaxed">
                        {notif.message}
                      </p>
                    </div>

                    <div className="pt-2 border-t border-slate-200/60 flex items-center justify-between">
                      {!notif.isRead ? (
                        <button
                          onClick={() => onMarkNotificationRead(notif.id)}
                          className="text-[11px] text-slate-500 hover:text-teal-700 font-light cursor-pointer"
                        >
                          تحديد كمقروء ✓
                        </button>
                      ) : (
                        <span className="text-[11px] text-slate-400 font-light">تمت القراءة</span>
                      )}

                      {notif.actionLabel && (
                        <button
                          onClick={() => onNotificationNavigate(notif)}
                          className="text-[11px] font-medium text-teal-700 hover:text-teal-900 flex items-center gap-1 cursor-pointer"
                        >
                          <span>{notif.actionLabel}</span>
                          <ArrowLeft className="w-3 h-3" />
                        </button>
                      )}
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </div>

        {/* Left Column (6 cols): Profile Engineering & Clinical Tasks Tracker */}
        <div className="lg:col-span-6 bg-white border border-slate-200/80 rounded-3xl p-6 shadow-2xs space-y-4">
          <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-100 pb-3.5">
            <div>
              <h2 className="text-sm font-semibold text-slate-900 flex items-center gap-2">
                <ClipboardList className="w-4 h-4 text-teal-700" />
                <span>مهام البروفايل والمتابعة الهندسية الجديدة</span>
              </h2>
              <p className="text-[11px] font-light text-slate-500 mt-0.5">
                إدارة المهام التحضيرية للاستشارات وفحوصات السلامة الدورية
              </p>
            </div>

            <button
              onClick={() => setShowAddTaskForm((prev) => !prev)}
              className="bg-teal-700 hover:bg-teal-800 text-white text-xs font-medium px-3 py-1.5 rounded-xl flex items-center gap-1.5 shadow-2xs transition-colors cursor-pointer"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>{showAddTaskForm ? 'إغلاق النموذج' : 'إضافة مهمة وتنبيه جديد'}</span>
            </button>
          </div>

          {/* Add New Task Form (Triggers an In-App Notification immediately) */}
          {showAddTaskForm && (
            <form
              onSubmit={handleCreateTask}
              className="bg-teal-50/60 border border-teal-200 rounded-2xl p-4 space-y-3"
            >
              <h3 className="text-xs font-semibold text-teal-950">
                إضافة مهمة جديدة في البروفايل (مع إشعار فوري داخل التطبيق)
              </h3>
              <div className="space-y-2">
                <input
                  type="text"
                  required
                  value={newTaskTitle}
                  onChange={(e) => setNewTaskTitle(e.target.value)}
                  placeholder="عنوان المهمة (مثال: فحص تيار التسريب لجهاز الصدمات قبل الاستشارة)..."
                  className="w-full bg-white border border-slate-200 rounded-xl px-3 py-2 text-xs text-slate-900 focus:outline-none focus:border-teal-600"
                />
                <input
                  type="text"
                  value={newTaskDesc}
                  onChange={(e) => setNewTaskDesc(e.target.value)}
                  placeholder="تفاصيل إضافية أو ملاحظات التنفيذ..."
                  className="w-full bg-white border border-slate-200 rounded-xl px-3 py-2 text-xs text-slate-900 focus:outline-none focus:border-teal-600"
                />
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                  <div>
                    <label className="text-[10px] text-slate-500 block mb-0.5">تاريخ الاستحقاق:</label>
                    <input
                      type="date"
                      value={newTaskDueDate}
                      onChange={(e) => setNewTaskDueDate(e.target.value)}
                      className="w-full bg-white border border-slate-200 rounded-xl px-2.5 py-1.5 text-xs text-slate-800"
                    />
                  </div>
                  <div>
                    <label className="text-[10px] text-slate-500 block mb-0.5">الأولوية:</label>
                    <select
                      value={newTaskPriority}
                      onChange={(e) => setNewTaskPriority(e.target.value as ProfileTask['priority'])}
                      className="w-full bg-white border border-slate-200 rounded-xl px-2.5 py-1.5 text-xs text-slate-800"
                    >
                      <option value="routine">روتينية</option>
                      <option value="high">مهمة</option>
                      <option value="critical">حرجة / عاجلة</option>
                    </select>
                  </div>
                  <div>
                    <label className="text-[10px] text-slate-500 block mb-0.5">المحور المرتبط:</label>
                    <select
                      value={newTaskPillar}
                      onChange={(e) => setNewTaskPillar(e.target.value as PillarId)}
                      className="w-full bg-white border border-slate-200 rounded-xl px-2.5 py-1.5 text-xs text-slate-800"
                    >
                      <option value="radiation">السلامة الإشعاعية</option>
                      <option value="electrical">السلامة الكهربائية</option>
                      <option value="green_hospital">المستشفيات الخضراء</option>
                      <option value="healthcare_engineering">هندسة الرعاية الصحية</option>
                    </select>
                  </div>
                </div>
              </div>
              <div className="flex justify-end gap-2">
                <button
                  type="submit"
                  className="bg-teal-700 hover:bg-teal-800 text-white text-xs font-medium px-4 py-2 rounded-xl cursor-pointer"
                >
                  حفظ المهمة وإصدار تنبيه فوري
                </button>
              </div>
            </form>
          )}

          {/* Tasks List */}
          <div className="space-y-2.5 max-h-[380px] overflow-y-auto pr-0.5">
            {profileTasks.map((task) => {
              const priorityBadge = {
                routine: 'bg-slate-100 text-slate-700 border-slate-200',
                high: 'bg-amber-50 text-amber-800 border-amber-200',
                critical: 'bg-rose-50 text-rose-800 border-rose-200'
              }[task.priority];

              const priorityLabel = {
                routine: 'روتينية',
                high: 'أولوية عالية',
                critical: 'حرجة'
              }[task.priority];

              return (
                <div
                  key={task.id}
                  onClick={() => onToggleProfileTask(task.id)}
                  className={`p-4 rounded-2xl border transition-all cursor-pointer text-right flex items-start justify-between gap-3 ${
                    task.completed
                      ? 'bg-emerald-50/30 border-emerald-200/80 opacity-75'
                      : 'bg-white border-slate-200 hover:border-teal-400 shadow-2xs'
                  }`}
                >
                  <div className="flex items-start gap-3 flex-1">
                    <button
                      type="button"
                      className="mt-0.5 text-teal-700 shrink-0"
                    >
                      {task.completed ? (
                        <CheckSquare className="w-4 h-4 text-emerald-600" />
                      ) : (
                        <Square className="w-4 h-4 text-slate-400" />
                      )}
                    </button>
                    <div className="space-y-1 flex-1">
                      <div className="flex flex-wrap items-center gap-2">
                        <h4
                          className={`text-xs font-semibold ${
                            task.completed ? 'line-through text-slate-400' : 'text-slate-900'
                          }`}
                        >
                          {task.title}
                        </h4>
                        <span className={`text-[10px] px-2 py-0.5 rounded-md border ${priorityBadge}`}>
                          {priorityLabel}
                        </span>
                      </div>
                      <p className="text-[11px] font-light text-slate-500 leading-relaxed">
                        {task.description}
                      </p>
                      <div className="flex items-center gap-3 pt-1 text-[10px] font-mono text-slate-400">
                        <span>تاريخ الاستحقاق: {task.dueDate}</span>
                        <span>·</span>
                        <span>{task.completed ? 'مكتملة ✓' : 'قيد التنفيذ'}</span>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Existing Two-Column Section: Badges (6 cols) & Booked Tickets + Saved Guides (6 cols) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Badges Matrix (6 cols) */}
        <div className="lg:col-span-6 bg-white border border-slate-200/80 rounded-3xl p-6 shadow-2xs space-y-4">
          <div className="flex items-center justify-between border-b border-slate-100 pb-3">
            <h2 className="text-sm font-semibold text-slate-900 flex items-center gap-2">
              <Award className="w-4 h-4 text-amber-600" />
              <span>أوسمة التحقق المعرفي والمهني</span>
            </h2>
            <span className="text-xs text-slate-400 font-light">
              نسبة الإنجاز: {Math.round((earnedBadges.length / 4) * 100)}%
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {allPossibleBadges.map((badge) => {
              const isEarned = earnedBadges.includes(badge.id);
              const Icon = badge.icon;

              return (
                <div
                  key={badge.id}
                  className={`p-4 rounded-2xl border text-right transition-all flex flex-col justify-between ${
                    isEarned
                      ? `${badge.color} shadow-2xs`
                      : 'bg-slate-50 border-slate-200 opacity-60'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div className="w-8 h-8 rounded-xl bg-white flex items-center justify-center shadow-2xs">
                      <Icon className="w-4 h-4" />
                    </div>
                    {isEarned ? (
                      <span className="text-[10px] font-medium bg-teal-700 text-white px-2 py-0.5 rounded-full">
                        مكتمل
                      </span>
                    ) : (
                      <span className="text-[10px] text-slate-400 font-light">
                        مغلق (أكمل الاختبار)
                      </span>
                    )}
                  </div>

                  <div className="mt-3">
                    <h3 className="text-xs font-semibold text-slate-900 leading-snug">
                      {badge.title}
                    </h3>
                    <p className="text-[11px] font-light text-slate-600 mt-1 leading-relaxed">
                      {badge.desc}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Tickets and Bookmarked Guides (6 cols) */}
        <div className="lg:col-span-6 space-y-6">
          {/* Booked Consultations with In-App Reminder Trigger & Gmail Notification */}
          <div className="bg-white border border-slate-200/80 rounded-3xl p-6 shadow-2xs space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <h2 className="text-sm font-semibold text-slate-900 flex items-center gap-2">
                <Ticket className="w-4 h-4 text-purple-600" />
                <span>تذاكر الاستشارات المؤكدة والتذكير بالمواعيد</span>
              </h2>
              <span className="text-xs text-slate-400 font-light">
                {bookedConsultations.length} تذاكر
              </span>
            </div>

            {bookedConsultations.length === 0 ? (
              <div className="p-6 bg-slate-50 border border-slate-200/60 rounded-2xl text-center text-xs text-slate-400 font-light">
                لا توجد تذاكر استشارة محجوزة حتى الآن. يمكنك حجز استشارة فورية من تبويب الاستشارات.
              </div>
            ) : (
              <div className="space-y-2.5">
                {bookedConsultations.map((ticket) => (
                  <div
                    key={ticket.id}
                    className="bg-slate-50 border border-slate-200/80 rounded-2xl p-4 space-y-2.5 text-right"
                  >
                    <div className="flex flex-wrap items-center justify-between gap-2 text-xs">
                      <span className="font-mono font-semibold text-purple-700 bg-purple-100 px-2 py-0.5 rounded-md">
                        {ticket.id}
                      </span>
                      <div className="flex flex-wrap items-center gap-1.5">
                        <button
                          onClick={() => onTriggerConsultationReminder(ticket)}
                          className="text-[10px] font-medium text-amber-800 bg-amber-50 hover:bg-amber-100 border border-amber-200 px-2 py-0.5 rounded-md flex items-center gap-1 transition-colors cursor-pointer"
                          title="إرسال تنبيه تذكير فوري داخل التطبيق بموعد هذه الاستشارة"
                        >
                          <BellRing className="w-3 h-3 text-amber-600" />
                          <span>{ticket.reminderActive ? 'تحديث التذكير' : 'تذكير بالموعد'}</span>
                        </button>

                        {ticket.emailNotificationSent ? (
                          <span className="text-[10px] font-medium text-emerald-700 bg-emerald-50 border border-emerald-200 px-2 py-0.5 rounded-md flex items-center gap-1">
                            <Mail className="w-3 h-3" />
                            <span>تم الإشعار للبريد</span>
                          </span>
                        ) : (
                          <button
                            onClick={() => onRequestEmailNotification(ticket)}
                            className="text-[10px] font-medium text-teal-700 hover:text-teal-800 bg-teal-50 hover:bg-teal-100 border border-teal-200 px-2 py-0.5 rounded-md flex items-center gap-1 transition-colors cursor-pointer"
                          >
                            <Send className="w-3 h-3" />
                            <span>إشعار Gmail</span>
                          </button>
                        )}
                        <span className="text-xs font-medium text-teal-700 flex items-center gap-1">
                          <CheckCircle className="w-3.5 h-3.5 text-teal-600" />
                          مؤكدة
                        </span>
                      </div>
                    </div>

                    <div>
                      <h4 className="text-xs font-semibold text-slate-900">{ticket.topic}</h4>
                      <p className="text-[11px] font-light text-slate-500 mt-0.5">
                        {ticket.visitorName} · {ticket.hospitalDepartment}
                      </p>
                    </div>

                    <div className="pt-2 border-t border-slate-200/60 flex items-center justify-between text-[11px] text-slate-500 font-light">
                      <span>التاريخ المجدول: {ticket.date}</span>
                      <span>الوقت: {ticket.timeSlot}</span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Bookmarked Guides list with Direct PDF Print button */}
          <div className="bg-white border border-slate-200/80 rounded-3xl p-6 shadow-2xs space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <h2 className="text-sm font-semibold text-slate-900 flex items-center gap-2">
                <Bookmark className="w-4 h-4 text-teal-600" />
                <span>الأدلة الاسترشادية المحفوظة (جامعة المستقبل PDF)</span>
              </h2>
              <span className="text-xs text-slate-400 font-light">
                {savedGuidesList.length} أدلة
              </span>
            </div>

            {savedGuidesList.length === 0 ? (
              <div className="p-6 bg-slate-50 border border-slate-200/60 rounded-2xl text-center text-xs text-slate-400 font-light">
                لم تقم بحفظ أي أدلة استرشادية بعد. يمكنك الضغط على أيقونة الإشارة المرجعية بأي دليل لحفظه هنا.
              </div>
            ) : (
              <div className="space-y-2">
                {savedGuidesList.map((guide) => (
                  <div
                    key={guide.id}
                    className="p-3 bg-slate-50 hover:bg-slate-100/80 border border-slate-200 rounded-xl flex items-center justify-between gap-2 transition-colors"
                  >
                    <div
                      onClick={() => onOpenGuide(guide, false)}
                      className="flex items-center gap-2.5 flex-1 cursor-pointer"
                    >
                      <FileText className="w-4 h-4 text-teal-700 shrink-0" />
                      <div>
                        <span className="text-xs font-semibold text-slate-800 block">
                          {guide.title}
                        </span>
                        <span className="text-[10px] font-mono text-slate-400">
                          {guide.arabicCode}
                        </span>
                      </div>
                    </div>

                    <button
                      onClick={() => onOpenGuide(guide, true)}
                      className="bg-teal-700 hover:bg-teal-800 text-white text-[11px] font-medium px-3 py-1.5 rounded-lg flex items-center gap-1.5 shrink-0 cursor-pointer"
                    >
                      <Printer className="w-3 h-3" />
                      <span>طباعة PDF</span>
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
