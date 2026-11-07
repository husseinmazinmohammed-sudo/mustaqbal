import React, { useState } from 'react';
import { X, Mail, Send, CheckCircle2, ShieldCheck, Loader2 } from 'lucide-react';
import { BookedConsultation } from '../../types';
import {
  TARGET_NOTIFICATION_EMAIL,
  buildConsultationEmailDetails,
  sendAutomaticConsultationEmail
} from '../../services/googleWorkspaceAuth';

interface EmailConfirmationModalProps {
  booking: BookedConsultation | null;
  onEmailSentSuccess: (bookingId: string) => void;
  onClose: () => void;
}

export const EmailConfirmationModal: React.FC<EmailConfirmationModalProps> = ({
  booking,
  onEmailSentSuccess,
  onClose
}) => {
  const [isSending, setIsSending] = useState(false);
  const [sentSuccess, setSentSuccess] = useState(false);

  if (!booking) return null;

  const { subject } = buildConsultationEmailDetails(booking);

  const handleSendAutomaticEmail = async () => {
    setIsSending(true);
    try {
      await sendAutomaticConsultationEmail(booking);
      setSentSuccess(true);
      onEmailSentSuccess(booking.id);
    } finally {
      setIsSending(false);
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 bg-slate-900/45 backdrop-blur-xs flex items-center justify-center p-4 no-print"
      dir="rtl"
    >
      <div className="w-full max-w-xl bg-white rounded-3xl overflow-hidden shadow-2xl border border-teal-200/80 flex flex-col">
        {/* Soft Clinical Header */}
        <div className="px-6 py-4 bg-gradient-to-l from-teal-50 via-emerald-50/70 to-sky-50 border-b border-teal-200/80 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-teal-600/10 border border-teal-300 flex items-center justify-center">
              <Mail className="w-4 h-4 text-teal-800" />
            </div>
            <div>
              <h3 className="text-sm font-semibold text-teal-950">
                إشعار الحجز التلقائي إلى البريد الإلكتروني
              </h3>
              <p className="text-[11px] font-light text-teal-800">
                جامعة المستقبل — كلية التقنيات الهندسية — قسم هندسة تقنيات الأجهزة الطبية
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="w-8 h-8 rounded-xl bg-white border border-slate-200 hover:bg-slate-100 flex items-center justify-center text-slate-500 cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Body */}
        <div className="p-6 space-y-4 text-right">
          {!sentSuccess ? (
            <>
              <div className="bg-teal-50/60 border border-teal-200 rounded-2xl p-4 space-y-1.5">
                <p className="text-xs font-semibold text-teal-950 flex items-center gap-1.5">
                  <ShieldCheck className="w-4 h-4 text-teal-700" />
                  <span>إرسال مباشر بدون تسجيل دخول الزائر</span>
                </p>
                <p className="text-xs font-light text-teal-800 leading-relaxed">
                  يتم إرسال بيانات تذكرة الاستشارة رقم ({booking.id}) مباشرة إلى البريد المعتمد للمنصة:
                </p>
                <div className="pt-1 flex items-center gap-2">
                  <span
                    className="text-xs font-mono font-semibold bg-white text-teal-900 px-3 py-1 rounded-lg border border-teal-300"
                    dir="ltr"
                  >
                    {TARGET_NOTIFICATION_EMAIL}
                  </span>
                </div>
              </div>

              {/* Email Preview Summary Box */}
              <div className="bg-slate-50 border border-slate-200 rounded-2xl p-4 space-y-2 text-xs">
                <div className="flex items-center justify-between border-b border-slate-200 pb-2">
                  <span className="text-slate-500 font-light">عنوان الإشعار:</span>
                  <span className="font-semibold text-slate-900">{subject}</span>
                </div>
                <div className="grid grid-cols-2 gap-2 pt-1">
                  <div>
                    <span className="text-slate-400 font-light block text-[11px]">اسم الزائر:</span>
                    <span className="font-medium text-slate-800">{booking.visitorName}</span>
                  </div>
                  <div>
                    <span className="text-slate-400 font-light block text-[11px]">القسم / المستشفى:</span>
                    <span className="font-medium text-slate-800">{booking.hospitalDepartment}</span>
                  </div>
                  <div>
                    <span className="text-slate-400 font-light block text-[11px]">محور الاستشارة:</span>
                    <span className="font-medium text-teal-800">{booking.topic}</span>
                  </div>
                  <div>
                    <span className="text-slate-400 font-light block text-[11px]">الموعد المحدد:</span>
                    <span className="font-medium text-slate-800">
                      {booking.date} · {booking.timeSlot}
                    </span>
                  </div>
                </div>
              </div>
            </>
          ) : (
            <div className="py-6 text-center space-y-3">
              <div className="w-14 h-14 rounded-2xl bg-teal-50 border border-teal-200 text-teal-700 mx-auto flex items-center justify-center">
                <CheckCircle2 className="w-8 h-8" />
              </div>
              <h4 className="text-base font-semibold text-slate-900">
                تم إرسال إشعار حجز الاستشارة تلقائياً!
              </h4>
              <p className="text-xs font-light text-slate-600 max-w-md mx-auto leading-relaxed">
                تم إرسال الإشعار البريدي بتفاصيل التذكرة{' '}
                <strong className="font-mono text-slate-900">{booking.id}</strong> مباشرة إلى{' '}
                <strong className="font-mono text-teal-800">{TARGET_NOTIFICATION_EMAIL}</strong> بدون الحاجة لأي تسجيل دخول.
              </p>
            </div>
          )}
        </div>

        {/* Footer Actions */}
        <div className="px-6 py-4 bg-slate-50 border-t border-slate-200 flex items-center justify-end gap-3">
          {!sentSuccess ? (
            <>
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2.5 rounded-xl border border-slate-200 bg-white hover:bg-slate-100 text-slate-700 text-xs font-medium transition-colors cursor-pointer"
              >
                إغلاق
              </button>

              <button
                type="button"
                disabled={isSending}
                onClick={handleSendAutomaticEmail}
                className="px-5 py-2.5 rounded-xl bg-teal-700 hover:bg-teal-800 disabled:opacity-40 text-white text-xs font-medium flex items-center gap-2 shadow-2xs transition-all cursor-pointer"
              >
                {isSending ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    <span>جاري إرسال الإشعار...</span>
                  </>
                ) : (
                  <>
                    <Send className="w-4 h-4 -scale-x-100" />
                    <span>إرسال الإشعار الفوري إلى {TARGET_NOTIFICATION_EMAIL}</span>
                  </>
                )}
              </button>
            </>
          ) : (
            <button
              type="button"
              onClick={onClose}
              className="px-6 py-2.5 rounded-xl bg-teal-700 hover:bg-teal-800 text-white text-xs font-medium cursor-pointer"
            >
              إغلاق والعودة للمنصة
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
