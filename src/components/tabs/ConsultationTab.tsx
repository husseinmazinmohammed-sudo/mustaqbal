import React, { useState } from 'react';
import { 
  Send, 
  Calculator, 
  Calendar, 
  ShieldCheck, 
  AlertTriangle, 
  CheckCircle, 
  Clock, 
  Sparkles,
  Zap,
  Radiation,
  Leaf,
  Stethoscope,
  Activity,
  FileCheck
} from 'lucide-react';
import { PREDEFINED_ADVISORIES, getSmartAdvisoryResponse } from '../../data/advisoryKnowledge';
import { ConsultationMessage, BookedConsultation, PillarId } from '../../types';

interface ConsultationTabProps {
  initialCalculator?: 'radiation' | 'electrical' | 'green' | null;
  onBookConsultation: (consultation: BookedConsultation) => void;
  bookedConsultations: BookedConsultation[];
}

export const ConsultationTab: React.FC<ConsultationTabProps> = ({
  initialCalculator = null,
  onBookConsultation,
  bookedConsultations
}) => {
  // Chat Advisor State
  const [messages, setMessages] = useState<ConsultationMessage[]>([
    {
      id: 'welcome-msg',
      sender: 'specialist',
      text: 'أهلاً بك في منصة الاستشارات الهندسية والسريرية المباشرة لسطح المكتب. يمكنك طرح أي استفسار يخص معايير الوقاية الإشعاعية ALARA، تيارات التسريب الكهربائي وفق IEC 60601-1، إدارة الصيانة الوقائية للأجهزة الطبية، أو متطلبات التحول للمستشفيات الخضراء.',
      timestamp: 'الآن',
      specialistRole: 'استشاري السلامة وهندسة الرعاية الصحية',
      tags: ['IEC 60601', 'ICRP 103', 'GGHH', 'NFPA 99']
    }
  ]);
  const [inputQuery, setInputQuery] = useState('');
  const [isTyping, setIsTyping] = useState(false);

  // Active Tool in Second Column: Calculators vs Booking
  const [activeSideTool, setActiveSideTool] = useState<'calculators' | 'booking'>(
    initialCalculator ? 'calculators' : 'calculators'
  );

  // Calculator State
  const [activeCalc, setActiveCalc] = useState<'radiation' | 'electrical' | 'green'>(
    initialCalculator || 'radiation'
  );

  // Radiation Calc inputs
  const [initialDose, setInitialDose] = useState<number>(100); // µSv/h at 1 meter
  const [distance, setDistance] = useState<number>(2); // meters
  const [leadThickness, setLeadThickness] = useState<number>(0.5); // mm Pb

  // Electrical Calc inputs
  const [appliedPartType, setAppliedPartType] = useState<'B' | 'BF' | 'CF'>('CF');
  const [faultCondition, setFaultCondition] = useState<'NC' | 'SFC'>('NC');
  const [measuredCurrent, setMeasuredCurrent] = useState<number>(8); // µA

  // Green Hospital Audit inputs
  const [energyScore, setEnergyScore] = useState<number>(75);
  const [wasteScore, setWasteScore] = useState<number>(70);
  const [waterScore, setWaterScore] = useState<number>(65);
  const [procurementScore, setProcurementScore] = useState<number>(80);
  const [buildingScore, setBuildingScore] = useState<number>(75);

  // Booking Form State
  const [bookName, setBookName] = useState('');
  const [bookDept, setBookDept] = useState('قسم الأشعة التشخيصية والقسطرة');
  const [bookPillar, setBookPillar] = useState<PillarId>('radiation');
  const [bookUrgency, setBookUrgency] = useState<'routine' | 'urgent' | 'critical'>('routine');
  const [bookDate, setBookDate] = useState('2026-11-10');
  const [bookTime, setBookTime] = useState('10:00 صباحاً');
  const [bookNotes, setBookNotes] = useState('');
  const [bookingSuccess, setBookingSuccess] = useState(false);

  // Send Advisor Query
  const handleSendQuery = (textToSend?: string) => {
    const query = textToSend || inputQuery;
    if (!query.trim()) return;

    const userMsg: ConsultationMessage = {
      id: `usr-${Date.now()}`,
      sender: 'user',
      text: query,
      timestamp: 'الآن'
    };

    setMessages((prev) => [...prev, userMsg]);
    if (!textToSend) setInputQuery('');
    setIsTyping(true);

    setTimeout(() => {
      const response = getSmartAdvisoryResponse(query);
      const specialistMsg: ConsultationMessage = {
        id: `spec-${Date.now()}`,
        sender: 'specialist',
        text: response.reply,
        timestamp: 'الآن',
        specialistRole: 'استشاري الهندسة الإكلينيكية والسلامة المهنية',
        recommendations: response.recommendations,
        tags: [response.referenceStandard]
      };
      setMessages((prev) => [...prev, specialistMsg]);
      setIsTyping(false);
    }, 500);
  };

  // Calculations
  const distanceFactor = 1 / Math.pow(Math.max(distance, 0.1), 2);
  const hvl = 0.25;
  const leadAttenuation = Math.pow(0.5, leadThickness / hvl);
  const finalCalculatedDose = (initialDose * distanceFactor * leadAttenuation).toFixed(2);
  const doseReductionPercent = (((initialDose - parseFloat(finalCalculatedDose)) / initialDose) * 100).toFixed(1);

  const getElectricalLimit = (part: 'B' | 'BF' | 'CF', cond: 'NC' | 'SFC') => {
    if (part === 'CF') return cond === 'NC' ? 10 : 50;
    return cond === 'NC' ? 100 : 500;
  };
  const currentLimit = getElectricalLimit(appliedPartType, faultCondition);
  const isElectricalSafe = measuredCurrent <= currentLimit;

  const overallGreenScore = Math.round(
    (energyScore + wasteScore + waterScore + procurementScore + buildingScore) / 5
  );
  const getGreenRating = (score: number) => {
    if (score >= 85) return { label: 'مستشفى أخضر نموذجي (بلاتيني)', color: 'text-teal-700', bg: 'bg-teal-50 border-teal-200' };
    if (score >= 70) return { label: 'مستشفى صديق للبيئة (ذهبي)', color: 'text-emerald-700', bg: 'bg-emerald-50 border-emerald-200' };
    if (score >= 50) return { label: 'استدامة متوسطة (فضي)', color: 'text-amber-700', bg: 'bg-amber-50 border-amber-200' };
    return { label: 'بحاجة لخطة تحول بيئي عاجلة', color: 'text-rose-700', bg: 'bg-rose-50 border-rose-200' };
  };
  const greenRating = getGreenRating(overallGreenScore);

  // Booking Submit
  const handleBookingSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!bookName.trim()) return;

    const newBooking: BookedConsultation = {
      id: `TKT-${Math.floor(100000 + Math.random() * 900000)}`,
      visitorName: bookName,
      hospitalDepartment: bookDept,
      topic: bookPillar === 'radiation' ? 'استشارة السلامة الإشعاعية والتدريع' : bookPillar === 'electrical' ? 'استشارة السلامة الكهربائية ونظام IPS' : bookPillar === 'green_hospital' ? 'استشارة المستشفيات الخضراء وإدارة النفايات' : 'استشارة هندسة الأجهزة الطبية وPPM',
      pillar: bookPillar,
      date: bookDate,
      timeSlot: bookTime,
      urgency: bookUrgency,
      notes: bookNotes,
      status: 'confirmed'
    };

    onBookConsultation(newBooking);
    setBookingSuccess(true);
    setTimeout(() => {
      setBookingSuccess(false);
      setBookName('');
      setBookNotes('');
    }, 4000);
  };

  return (
    <div className="space-y-6 text-slate-700" dir="rtl">
      {/* Header */}
      <div className="bg-white border border-slate-200/80 rounded-2xl p-5 shadow-2xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl font-semibold text-slate-900 flex items-center gap-2">
            <span>مركز الاستشارات الهندسية والحاسبات السريرية</span>
          </h1>
          <p className="text-xs font-light text-slate-500 mt-1">
            إجابات فورية مدعومة بالمعايير، حاسبات أمان دقيقة، وحجز جلسات استشارية مع مهندسي الأجهزة الطبية
          </p>
        </div>

        {/* Side Tool Switcher */}
        <div className="flex items-center gap-1.5 p-1 bg-slate-100 rounded-xl">
          <button
            onClick={() => setActiveSideTool('calculators')}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg text-xs transition-all cursor-pointer ${
              activeSideTool === 'calculators'
                ? 'bg-white text-teal-900 font-semibold shadow-2xs'
                : 'text-slate-600 hover:text-slate-900 font-light'
            }`}
          >
            <Calculator className="w-3.5 h-3.5 text-teal-600" />
            <span>الحاسبات والمدققات</span>
          </button>
          <button
            onClick={() => setActiveSideTool('booking')}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg text-xs transition-all cursor-pointer ${
              activeSideTool === 'booking'
                ? 'bg-white text-teal-900 font-semibold shadow-2xs'
                : 'text-slate-600 hover:text-slate-900 font-light'
            }`}
          >
            <Calendar className="w-3.5 h-3.5 text-purple-600" />
            <span>حجز استشارة تخصصية</span>
          </button>
        </div>
      </div>

      {/* Modern Multi-Column Grid: Left Column = Chat Advisor (7 cols) | Right Column = Calculators/Booking (5 cols) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left Column (7 cols): Smart Chat Advisor */}
        <div className="lg:col-span-7 bg-white border border-slate-200/80 rounded-3xl p-6 shadow-2xs space-y-4">
          <div className="flex items-center justify-between border-b border-slate-100 pb-3">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-xl bg-teal-50 text-teal-700 flex items-center justify-center">
                <Sparkles className="w-4 h-4" />
              </div>
              <div>
                <h2 className="text-sm font-semibold text-slate-900">المستشار الهندسي والسريري الفوري</h2>
                <span className="text-[11px] text-slate-400 font-light">معتمد وفق المعايير العالمية</span>
              </div>
            </div>
            <span className="text-[11px] font-mono bg-teal-50 text-teal-700 px-2 py-0.5 rounded-full border border-teal-200/50">
              متصل 24/7
            </span>
          </div>

          {/* Quick Consultation Question Chips */}
          <div className="space-y-1.5">
            <span className="text-xs font-light text-slate-400">
              استشارات ونماذج شائعة بنقرة واحدة:
            </span>
            <div className="flex gap-2 overflow-x-auto no-scrollbar pb-1">
              {PREDEFINED_ADVISORIES.map((adv) => (
                <button
                  key={adv.id}
                  onClick={() => handleSendQuery(adv.question)}
                  className="bg-slate-50 hover:bg-teal-50 border border-slate-200/80 hover:border-teal-300 text-slate-700 text-xs font-light py-1.5 px-3 rounded-xl whitespace-nowrap transition-colors shrink-0 cursor-pointer"
                >
                  {adv.shortTitle}
                </button>
              ))}
            </div>
          </div>

          {/* Messages Feed */}
          <div className="bg-slate-50/60 border border-slate-200/60 rounded-2xl p-4 min-h-[380px] max-h-[500px] overflow-y-auto space-y-3.5 text-right">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex flex-col ${
                  msg.sender === 'user' ? 'items-start' : 'items-end'
                }`}
              >
                {msg.sender === 'specialist' && (
                  <div className="flex items-center gap-1.5 text-xs text-teal-800 font-medium mb-1">
                    <ShieldCheck className="w-3.5 h-3.5 text-teal-600" />
                    <span>{msg.specialistRole}</span>
                  </div>
                )}

                <div
                  className={`max-w-[90%] rounded-2xl px-4 py-3 text-xs font-light leading-relaxed ${
                    msg.sender === 'user'
                      ? 'bg-teal-700 text-white rounded-br-none shadow-2xs'
                      : 'bg-white border border-slate-200/80 text-slate-700 rounded-bl-none shadow-2xs'
                  }`}
                >
                  <p>{msg.text}</p>

                  {/* Bullet recommendations */}
                  {msg.recommendations && (
                    <div className="mt-3 pt-2.5 border-t border-slate-100 space-y-1.5">
                      <strong className="text-[11px] text-slate-500 block font-medium">
                        التوصيات الفنية المعتمدة للتطبيق:
                      </strong>
                      <ul className="space-y-1 pr-1">
                        {msg.recommendations.map((rec, rIdx) => (
                          <li key={rIdx} className="text-xs leading-relaxed flex items-start gap-1.5">
                            <span className="text-teal-600 font-bold shrink-0">✔</span>
                            <span>{rec}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {/* Standards Reference */}
                  {msg.tags && msg.tags.length > 0 && (
                    <div className="mt-2 text-[10px] text-slate-400 font-mono flex items-center gap-1">
                      <span>المرجع:</span>
                      <span>{msg.tags.join(' · ')}</span>
                    </div>
                  )}
                </div>
              </div>
            ))}

            {isTyping && (
              <div className="flex items-center gap-2 text-xs text-slate-400 p-2 font-light">
                <span className="w-2 h-2 rounded-full bg-teal-500 animate-pulse"></span>
                <span>جاري استدعاء المعايير الهندسية والتحليل السريري...</span>
              </div>
            )}
          </div>

          {/* Query Input Bar */}
          <div className="flex items-center gap-2 pt-1">
            <input
              type="text"
              value={inputQuery}
              onChange={(e) => setInputQuery(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSendQuery()}
              placeholder="اكتب استفسارك الطبي أو الهندسي هنا..."
              className="flex-1 bg-slate-50 border border-slate-200 text-xs py-3 px-4 rounded-xl focus:outline-none focus:ring-1 focus:ring-teal-500 focus:bg-white text-slate-800 transition-colors"
            />
            <button
              onClick={() => handleSendQuery()}
              disabled={!inputQuery.trim()}
              className="bg-teal-700 hover:bg-teal-800 disabled:opacity-40 text-white px-5 py-3 rounded-xl text-xs font-medium flex items-center gap-1.5 shrink-0 transition-transform active:scale-98 cursor-pointer shadow-xs"
            >
              <Send className="w-4 h-4 -scale-x-100" />
              <span>إرسال</span>
            </button>
          </div>
        </div>

        {/* Right Column (5 cols): Calculators or Booking Form */}
        <div className="lg:col-span-5 space-y-4">
          {activeSideTool === 'calculators' && (
            <div className="bg-white border border-slate-200/80 rounded-3xl p-6 shadow-2xs space-y-5">
              {/* Calculator Subtabs */}
              <div className="grid grid-cols-3 gap-1 bg-slate-100 p-1 rounded-xl text-center">
                <button
                  onClick={() => setActiveCalc('radiation')}
                  className={`py-2 px-2 text-xs font-medium rounded-lg transition-all cursor-pointer ${
                    activeCalc === 'radiation'
                      ? 'bg-amber-600 text-white shadow-2xs'
                      : 'text-slate-600 hover:text-slate-900 font-light'
                  }`}
                >
                  تدريع الإشعاع
                </button>
                <button
                  onClick={() => setActiveCalc('electrical')}
                  className={`py-2 px-2 text-xs font-medium rounded-lg transition-all cursor-pointer ${
                    activeCalc === 'electrical'
                      ? 'bg-sky-600 text-white shadow-2xs'
                      : 'text-slate-600 hover:text-slate-900 font-light'
                  }`}
                >
                  الأمان الكهربائي
                </button>
                <button
                  onClick={() => setActiveCalc('green')}
                  className={`py-2 px-2 text-xs font-medium rounded-lg transition-all cursor-pointer ${
                    activeCalc === 'green'
                      ? 'bg-teal-700 text-white shadow-2xs'
                      : 'text-slate-600 hover:text-slate-900 font-light'
                  }`}
                >
                  تدقيق الاستدامة
                </button>
              </div>

              {/* CALC 1: Radiation Shielding */}
              {activeCalc === 'radiation' && (
                <div className="space-y-4">
                  <div className="flex items-center gap-2 pb-2 border-b border-slate-100">
                    <div className="w-8 h-8 rounded-lg bg-amber-50 text-amber-700 flex items-center justify-center">
                      <Radiation className="w-4 h-4" />
                    </div>
                    <div>
                      <h3 className="text-xs font-semibold text-slate-800">حاسبة تدريع الإشعاع وقانون التربيع العكسي</h3>
                      <span className="text-[10px] text-slate-400 font-mono">ICRP 103 / NCRP 147</span>
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <div className="flex justify-between text-xs">
                      <span className="text-slate-600 font-light">المسافة عن المصدر (Distance):</span>
                      <span className="font-mono font-medium text-teal-700">{distance} متر</span>
                    </div>
                    <input
                      type="range"
                      min="0.5"
                      max="6"
                      step="0.5"
                      value={distance}
                      onChange={(e) => setDistance(parseFloat(e.target.value))}
                      className="w-full accent-amber-600 cursor-pointer"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <div className="flex justify-between text-xs">
                      <span className="text-slate-600 font-light">سمك حاجز الرصاص (Lead Shield):</span>
                      <span className="font-mono font-medium text-amber-700">{leadThickness} مم Pb</span>
                    </div>
                    <input
                      type="range"
                      min="0"
                      max="2.5"
                      step="0.25"
                      value={leadThickness}
                      onChange={(e) => setLeadThickness(parseFloat(e.target.value))}
                      className="w-full accent-amber-600 cursor-pointer"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <div className="flex justify-between text-xs">
                      <span className="text-slate-600 font-light">شدة المصدر الأصلية (على بعد 1م):</span>
                      <span className="font-mono font-medium text-slate-700">{initialDose} µSv/h</span>
                    </div>
                    <input
                      type="range"
                      min="20"
                      max="500"
                      step="20"
                      value={initialDose}
                      onChange={(e) => setInitialDose(parseInt(e.target.value))}
                      className="w-full accent-amber-600 cursor-pointer"
                    />
                  </div>

                  <div className="bg-amber-50/70 border border-amber-200/80 rounded-2xl p-4 space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-medium text-amber-900">الجرعة المتبقية المقاسة:</span>
                      <span className="text-base font-semibold font-mono text-amber-800">{finalCalculatedDose} µSv/h</span>
                    </div>
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-slate-600 font-light">نسبة التخفيض الإجمالية:</span>
                      <span className="font-medium text-teal-700 font-mono">%{doseReductionPercent} خفض</span>
                    </div>
                    <p className="text-[11px] font-light text-slate-600 pt-1 leading-relaxed">
                      {parseFloat(finalCalculatedDose) < 2.5 
                        ? 'الجرعة تقع في النطاق الآمن تماماً للكوادر والجمهور وفق المعايير الدولية.' 
                        : 'تنبيه: الجرعة مرتفعة نسبياً؛ ينصح بزيادة المسافة أو استخدام تدريع رصاصي إضافي.'}
                    </p>
                  </div>
                </div>
              )}

              {/* CALC 2: Electrical Safety Evaluator */}
              {activeCalc === 'electrical' && (
                <div className="space-y-4">
                  <div className="flex items-center gap-2 pb-2 border-b border-slate-100">
                    <div className="w-8 h-8 rounded-lg bg-sky-50 text-sky-700 flex items-center justify-center">
                      <Zap className="w-4 h-4" />
                    </div>
                    <div>
                      <h3 className="text-xs font-semibold text-slate-800">مدقق الأمان الكهربائي للأجهزة الطبية</h3>
                      <span className="text-[10px] text-slate-400 font-mono">IEC 60601-1 / IEC 62353</span>
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-light text-slate-600 block">تصنيف الجزء الملامس (Applied Part):</label>
                    <div className="grid grid-cols-3 gap-2">
                      {(['B', 'BF', 'CF'] as const).map((type) => (
                        <button
                          key={type}
                          onClick={() => setAppliedPartType(type)}
                          className={`py-2 px-2 rounded-xl text-xs font-medium border transition-all cursor-pointer ${
                            appliedPartType === type
                              ? 'bg-sky-50 border-sky-400 text-sky-800 font-semibold'
                              : 'border-slate-200 text-slate-600 hover:bg-slate-50'
                          }`}
                        >
                          {type === 'B' ? 'Type B (عام)' : type === 'BF' ? 'Type BF (عازل)' : 'Type CF (قلبي)'}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-light text-slate-600 block">حالة الاختبار (Testing Condition):</label>
                    <div className="grid grid-cols-2 gap-2">
                      <button
                        onClick={() => setFaultCondition('NC')}
                        className={`py-2 px-2 rounded-xl text-xs transition-all cursor-pointer border ${
                          faultCondition === 'NC'
                            ? 'bg-sky-50 border-sky-400 text-sky-800 font-semibold'
                            : 'border-slate-200 text-slate-600 hover:bg-slate-50'
                        }`}
                      >
                        حالة طبيعية (NC)
                      </button>
                      <button
                        onClick={() => setFaultCondition('SFC')}
                        className={`py-2 px-2 rounded-xl text-xs transition-all cursor-pointer border ${
                          faultCondition === 'SFC'
                            ? 'bg-sky-50 border-sky-400 text-sky-800 font-semibold'
                            : 'border-slate-200 text-slate-600 hover:bg-slate-50'
                        }`}
                      >
                        عطل أحادي (SFC)
                      </button>
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <div className="flex justify-between text-xs">
                      <span className="text-slate-600 font-light">تيار تسريب المريض المقاس بمحلل السلامة:</span>
                      <span className="font-mono font-medium text-sky-800">{measuredCurrent} µA</span>
                    </div>
                    <input
                      type="range"
                      min="1"
                      max="150"
                      step="1"
                      value={measuredCurrent}
                      onChange={(e) => setMeasuredCurrent(parseInt(e.target.value))}
                      className="w-full accent-sky-600 cursor-pointer"
                    />
                  </div>

                  <div className={`p-4 rounded-2xl border space-y-1.5 ${
                    isElectricalSafe
                      ? 'bg-teal-50/70 border-teal-200/80'
                      : 'bg-rose-50/70 border-rose-200/80'
                  }`}>
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-semibold">
                        {isElectricalSafe ? 'النتيجة: مطابق للاستخدام السريري (PASS)' : 'النتيجة: خطر وغير مطابق (FAIL)'}
                      </span>
                      <span className="text-xs font-mono font-medium">الحد: {currentLimit} µA</span>
                    </div>
                    <p className="text-[11px] font-light leading-relaxed">
                      {isElectricalSafe
                        ? `التيار المقاس (${measuredCurrent} µA) أدنى من الحد المسموح (${currentLimit} µA). الجهاز آمن طبياً.`
                        : `تحذير: التيار المقاس (${measuredCurrent} µA) يتجاوز الحد (${currentLimit} µA). اعزل الجهاز فوراً وصنه.`}
                    </p>
                  </div>
                </div>
              )}

              {/* CALC 3: Green Hospital Audit */}
              {activeCalc === 'green' && (
                <div className="space-y-4">
                  <div className="flex items-center gap-2 pb-2 border-b border-slate-100">
                    <div className="w-8 h-8 rounded-lg bg-teal-50 text-teal-700 flex items-center justify-center">
                      <Leaf className="w-4 h-4" />
                    </div>
                    <div>
                      <h3 className="text-xs font-semibold text-slate-800">مقياس وتدقيق استدامة المستشفى الأخضر</h3>
                      <span className="text-[10px] text-slate-400 font-mono">GGHH / WHO</span>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <div className="space-y-1">
                      <div className="flex justify-between text-xs font-light">
                        <span>كفاءة الطاقة والإنارة:</span>
                        <span className="font-mono font-medium text-teal-700">%{energyScore}</span>
                      </div>
                      <input
                        type="range"
                        min="10"
                        max="100"
                        value={energyScore}
                        onChange={(e) => setEnergyScore(parseInt(e.target.value))}
                        className="w-full accent-teal-600 cursor-pointer"
                      />
                    </div>

                    <div className="space-y-1">
                      <div className="flex justify-between text-xs font-light">
                        <span>فرز وتدوير النفايات الطبية:</span>
                        <span className="font-mono font-medium text-teal-700">%{wasteScore}</span>
                      </div>
                      <input
                        type="range"
                        min="10"
                        max="100"
                        value={wasteScore}
                        onChange={(e) => setWasteScore(parseInt(e.target.value))}
                        className="w-full accent-teal-600 cursor-pointer"
                      />
                    </div>

                    <div className="space-y-1">
                      <div className="flex justify-between text-xs font-light">
                        <span>ترشيد واستخدام المياه:</span>
                        <span className="font-mono font-medium text-teal-700">%{waterScore}</span>
                      </div>
                      <input
                        type="range"
                        min="10"
                        max="100"
                        value={waterScore}
                        onChange={(e) => setWaterScore(parseInt(e.target.value))}
                        className="w-full accent-teal-600 cursor-pointer"
                      />
                    </div>

                    <div className="space-y-1">
                      <div className="flex justify-between text-xs font-light">
                        <span>الشراء الأخضر واستبعاد الزئبق:</span>
                        <span className="font-mono font-medium text-teal-700">%{procurementScore}</span>
                      </div>
                      <input
                        type="range"
                        min="10"
                        max="100"
                        value={procurementScore}
                        onChange={(e) => setProcurementScore(parseInt(e.target.value))}
                        className="w-full accent-teal-600 cursor-pointer"
                      />
                    </div>
                  </div>

                  <div className={`p-4 rounded-2xl border ${greenRating.bg} space-y-1.5`}>
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-semibold text-slate-800">مؤشر الاستدامة الإجمالي:</span>
                      <span className={`text-xl font-semibold font-mono ${greenRating.color}`}>{overallGreenScore} / 100</span>
                    </div>
                    <div className="text-xs font-medium text-slate-700">
                      التصنيف: <span className={greenRating.color}>{greenRating.label}</span>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Booking Subtool */}
          {activeSideTool === 'booking' && (
            <div className="bg-white border border-slate-200/80 rounded-3xl p-6 shadow-2xs space-y-4">
              <div>
                <h3 className="text-sm font-semibold text-slate-900 flex items-center gap-2">
                  <Calendar className="w-4 h-4 text-purple-600" />
                  <span>حجز استشارة تخصصية مع مهندس أجهزة طبية</span>
                </h3>
                <p className="text-xs font-light text-slate-500 mt-1">
                  جلسة ميدانية أو افتراضية للتدقيق السريري واشتراطات الأمان
                </p>
              </div>

              {bookingSuccess && (
                <div className="p-3.5 bg-teal-50 border border-teal-200 text-teal-900 rounded-2xl text-xs font-light flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-teal-700 shrink-0" />
                  <span>تم تأكيد حجز الاستشارة وإصدار التذكرة الهندسية بنجاح!</span>
                </div>
              )}

              <form onSubmit={handleBookingSubmit} className="space-y-3">
                <div>
                  <label className="text-xs font-medium text-slate-700 block mb-1">اسم المستفيد / الجهة:</label>
                  <input
                    type="text"
                    required
                    placeholder="مثال: د. مازن حسان / قسم الأشعة"
                    value={bookName}
                    onChange={(e) => setBookName(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl py-2 px-3 text-xs focus:ring-1 focus:ring-teal-500 focus:outline-none"
                  />
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="text-xs font-medium text-slate-700 block mb-1">المحور:</label>
                    <select
                      value={bookPillar}
                      onChange={(e) => setBookPillar(e.target.value as PillarId)}
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl py-2 px-2 text-xs focus:outline-none"
                    >
                      <option value="radiation">السلامة الإشعاعية</option>
                      <option value="electrical">السلامة الكهربائية</option>
                      <option value="green_hospital">المستشفيات الخضراء</option>
                      <option value="healthcare_engineering">هندسة الأجهزة</option>
                    </select>
                  </div>

                  <div>
                    <label className="text-xs font-medium text-slate-700 block mb-1">الأولوية:</label>
                    <select
                      value={bookUrgency}
                      onChange={(e) => setBookUrgency(e.target.value as any)}
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl py-2 px-2 text-xs focus:outline-none"
                    >
                      <option value="routine">روتينية (أسبوع)</option>
                      <option value="urgent">عاجلة (24 ساعة)</option>
                      <option value="critical">حرجة / طارئة</option>
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="text-xs font-medium text-slate-700 block mb-1">تاريخ الجلسة:</label>
                    <input
                      type="date"
                      value={bookDate}
                      onChange={(e) => setBookDate(e.target.value)}
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl py-2 px-2 text-xs focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="text-xs font-medium text-slate-700 block mb-1">الوقت:</label>
                    <select
                      value={bookTime}
                      onChange={(e) => setBookTime(e.target.value)}
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl py-2 px-2 text-xs focus:outline-none"
                    >
                      <option value="09:00 صباحاً">09:00 صباحاً</option>
                      <option value="11:00 صباحاً">11:00 صباحاً</option>
                      <option value="01:00 ظهراً">01:00 ظهراً</option>
                      <option value="03:00 مساءً">03:00 مساءً</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="text-xs font-medium text-slate-700 block mb-1">تفاصيل الاستفسار:</label>
                  <textarea
                    rows={2}
                    placeholder="اكتب التحدي الهندسي أو الجهاز المطلوب تدقيقه..."
                    value={bookNotes}
                    onChange={(e) => setBookNotes(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl py-2 px-3 text-xs focus:ring-1 focus:ring-teal-500 focus:outline-none"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full bg-purple-700 hover:bg-purple-800 active:scale-98 text-white font-medium text-xs py-2.5 px-4 rounded-xl shadow-xs transition-all flex items-center justify-center gap-2 cursor-pointer"
                >
                  <FileCheck className="w-4 h-4" />
                  <span>تأكيد الحجز وإصدار التذكرة</span>
                </button>
              </form>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
