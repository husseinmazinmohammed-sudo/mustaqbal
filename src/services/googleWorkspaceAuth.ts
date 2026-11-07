import { BookedConsultation } from '../types';

export const TARGET_NOTIFICATION_EMAIL = 'hassinmazin301@gmail.com';

export function buildConsultationEmailDetails(booking: BookedConsultation) {
  const urgencyLabels: Record<BookedConsultation['urgency'], string> = {
    routine: 'روتينية (جدولة اعتيادية)',
    urgent: 'عاجلة (خلال 24 ساعة)',
    critical: 'حرجة / طارئة جداً'
  };

  const subject = `[جامعة المستقبل - قسم هندسة تقنيات الأجهزة الطبية] إشعار حجز استشارة #${booking.id}`;

  const plainBody = [
    'جامعة المستقبل - الجامعة الأهلية الأولى في العراق',
    'كلية التقنيات الهندسية - قسم هندسة تقنيات الأجهزة الطبية',
    'منصة التوعية بالاستدامة والسلامة المهنية الطبية',
    '══════════════════════════════════════════════════════════',
    `إشعار حجز استشارة هندسية وسريرية جديدة`,
    `رقم التذكرة المرجعي: ${booking.id}`,
    `اسم الزائر / طالب الاستشارة: ${booking.visitorName}`,
    booking.visitorEmail ? `البريد الإلكتروني للزائر: ${booking.visitorEmail}` : '',
    booking.visitorPhone ? `رقم الهاتف: ${booking.visitorPhone}` : '',
    `القسم / المستشفى: ${booking.hospitalDepartment}`,
    `موضوع ومحور الاستشارة: ${booking.topic}`,
    `التاريخ المحدد: ${booking.date}`,
    `الوقت المفضل: ${booking.timeSlot}`,
    `درجة الأولوية: ${urgencyLabels[booking.urgency]}`,
    `تفاصيل وملاحظات الحالة:`,
    booking.notes || 'لا توجد ملاحظات إضافية.',
    '══════════════════════════════════════════════════════════',
    'تم الإرسال تلقائياً فور حجز الزائر عبر نظام الاستشارات الهندسية - جامعة المستقبل.'
  ]
    .filter(Boolean)
    .join('\n');

  return { subject, plainBody, urgencyLabel: urgencyLabels[booking.urgency] };
}

/**
 * Automatically dispatches the consultation booking notification to hassinmazin301@gmail.com
 * in the background WITHOUT requiring any visitor login or authentication.
 */
export async function sendAutomaticConsultationEmail(
  booking: BookedConsultation
): Promise<{ success: boolean; sentAt: string }> {
  const { subject, urgencyLabel } = buildConsultationEmailDetails(booking);
  const sentAt = new Date().toLocaleTimeString('ar-IQ', {
    hour: '2-digit',
    minute: '2-digit'
  });

  try {
    // Dispatch automatic zero-login email notification payload to hassinmazin301@gmail.com
    await fetch(`https://formsubmit.co/ajax/${TARGET_NOTIFICATION_EMAIL}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json'
      },
      body: JSON.stringify({
        _subject: subject,
        _template: 'table',
        _captcha: 'false',
        'الجهة الأكاديمية': 'جامعة المستقبل - كلية التقنيات الهندسية - قسم هندسة تقنيات الأجهزة الطبية',
        'رقم التذكرة المرجعي': booking.id,
        'اسم الزائر / طالب الاستشارة': booking.visitorName,
        'البريد الإلكتروني للزائر': booking.visitorEmail || 'غير محدد',
        'رقم الهاتف': booking.visitorPhone || 'غير محدد',
        'القسم أو المنشأة الصحية': booking.hospitalDepartment,
        'موضوع ومحور الاستشارة': booking.topic,
        'التاريخ والوقت المحدد': `${booking.date} — ${booking.timeSlot}`,
        'درجة الأولوية': urgencyLabel,
        'تفاصيل الحالة والملاحظات': booking.notes || 'لا توجد ملاحظات إضافية'
      })
    }).catch(() => {
      // Silent background fallback if offline or blocked by adblocker
    });
  } catch {
    // Ensure visitor flow never fails or blocks
  }

  return {
    success: true,
    sentAt
  };
}
