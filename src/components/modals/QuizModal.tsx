import React, { useState } from 'react';
import { X, Award, CheckCircle, AlertCircle, ArrowLeft, RotateCcw } from 'lucide-react';
import { EducationalModule } from '../../types';

interface QuizModalProps {
  module: EducationalModule | null;
  onClose: () => void;
  onEarnBadge: (badgeId: string) => void;
}

export const QuizModal: React.FC<QuizModalProps> = ({ module, onClose, onEarnBadge }) => {
  const [currentQuestionIdx, setCurrentQuestionIdx] = useState(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [isAnswerSubmitted, setIsAnswerSubmitted] = useState(false);
  const [score, setScore] = useState(0);
  const [quizCompleted, setQuizCompleted] = useState(false);

  if (!module) return null;

  const currentQ = module.quiz[currentQuestionIdx];
  const isLastQuestion = currentQuestionIdx === module.quiz.length - 1;

  const handleSelectOption = (idx: number) => {
    if (isAnswerSubmitted) return;
    setSelectedOption(idx);
  };

  const handleSubmitAnswer = () => {
    if (selectedOption === null) return;
    setIsAnswerSubmitted(true);
    if (selectedOption === currentQ.correctIndex) {
      setScore((prev) => prev + 1);
    }
  };

  const handleNextQuestion = () => {
    if (isLastQuestion) {
      const finalScore = score + (selectedOption === currentQ.correctIndex ? 0 : 0);
      setQuizCompleted(true);
      if (finalScore >= 2 || score >= 2) {
        const badgeMap: Record<string, string> = {
          radiation: 'badge-rad',
          electrical: 'badge-elec',
          green_hospital: 'badge-green',
          healthcare_engineering: 'badge-eng'
        };
        onEarnBadge(badgeMap[module.pillar] || 'badge-rad');
      }
    } else {
      setCurrentQuestionIdx((prev) => prev + 1);
      setSelectedOption(null);
      setIsAnswerSubmitted(false);
    }
  };

  const handleResetQuiz = () => {
    setCurrentQuestionIdx(0);
    setSelectedOption(null);
    setIsAnswerSubmitted(false);
    setScore(0);
    setQuizCompleted(false);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4" dir="rtl">
      <div className="w-full max-w-md bg-white dark:bg-slate-900 rounded-3xl overflow-hidden shadow-2xl border border-slate-200 dark:border-slate-800 flex flex-col">
        {/* Header */}
        <div className="px-5 py-3 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Award className="w-4 h-4 text-amber-500" />
            <span className="text-xs font-bold text-slate-900 dark:text-white">
              اختبار التحقق المعرفي السريع
            </span>
          </div>
          <button
            onClick={onClose}
            className="w-7 h-7 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-slate-500 hover:text-slate-800 dark:hover:text-white"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Content */}
        {!quizCompleted ? (
          <div className="p-5 space-y-4 text-right">
            {/* Progress indicator */}
            <div className="flex items-center justify-between text-xs text-slate-400">
              <span>السؤال {currentQuestionIdx + 1} من {module.quiz.length}</span>
              <span className="font-mono text-emerald-600 font-bold">النقاط: {score}</span>
            </div>

            {/* Question Text */}
            <h3 className="text-sm font-bold text-slate-900 dark:text-white leading-relaxed">
              {currentQ.question}
            </h3>

            {/* Options List */}
            <div className="space-y-2">
              {currentQ.options.map((option, idx) => {
                const isSelected = selectedOption === idx;
                const isCorrect = idx === currentQ.correctIndex;

                let optionStyle = 'border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/60 text-slate-700 dark:text-slate-200';
                if (isSelected && !isAnswerSubmitted) {
                  optionStyle = 'border-emerald-500 bg-emerald-50 dark:bg-emerald-950/40 text-emerald-900 dark:text-emerald-200 font-bold';
                } else if (isAnswerSubmitted) {
                  if (isCorrect) {
                    optionStyle = 'border-emerald-500 bg-emerald-50 dark:bg-emerald-950/40 text-emerald-900 dark:text-emerald-200 font-bold';
                  } else if (isSelected && !isCorrect) {
                    optionStyle = 'border-rose-500 bg-rose-50 dark:bg-rose-950/40 text-rose-900 dark:text-rose-200';
                  }
                }

                return (
                  <button
                    key={idx}
                    disabled={isAnswerSubmitted}
                    onClick={() => handleSelectOption(idx)}
                    className={`w-full text-right p-3 rounded-xl border text-xs transition-all flex items-center justify-between ${optionStyle}`}
                  >
                    <span>{option}</span>
                    {isAnswerSubmitted && isCorrect && (
                      <CheckCircle className="w-4 h-4 text-emerald-600 shrink-0" />
                    )}
                    {isAnswerSubmitted && isSelected && !isCorrect && (
                      <AlertCircle className="w-4 h-4 text-rose-600 shrink-0" />
                    )}
                  </button>
                );
              })}
            </div>

            {/* Explanation box after submit */}
            {isAnswerSubmitted && (
              <div className="p-3 rounded-xl bg-slate-100 dark:bg-slate-800 text-[11px] text-slate-700 dark:text-slate-300 space-y-1">
                <strong className="block font-bold text-emerald-600">التفسير العلمي والهندسي:</strong>
                <p className="leading-relaxed">{currentQ.explanation}</p>
              </div>
            )}

            {/* Bottom Button */}
            <div className="pt-2">
              {!isAnswerSubmitted ? (
                <button
                  disabled={selectedOption === null}
                  onClick={handleSubmitAnswer}
                  className="w-full bg-emerald-600 hover:bg-emerald-700 disabled:opacity-50 text-white text-xs font-bold py-2.5 px-4 rounded-xl shadow-xs transition-all"
                >
                  تأكيد الإجابة
                </button>
              ) : (
                <button
                  onClick={handleNextQuestion}
                  className="w-full bg-slate-900 dark:bg-slate-700 hover:bg-slate-800 text-white text-xs font-bold py-2.5 px-4 rounded-xl flex items-center justify-center gap-1.5 transition-all"
                >
                  <span>{isLastQuestion ? 'عرض النتيجة النهائية' : 'السؤال التالي'}</span>
                  <ArrowLeft className="w-4 h-4" />
                </button>
              )}
            </div>
          </div>
        ) : (
          /* Result Screen */
          <div className="p-6 text-center space-y-4">
            <div className="w-16 h-16 rounded-3xl bg-amber-100 dark:bg-amber-950/60 text-amber-600 mx-auto flex items-center justify-center">
              <Award className="w-8 h-8" />
            </div>

            <div className="space-y-1">
              <h3 className="text-base font-bold text-slate-900 dark:text-white">
                {score >= 2 ? 'تهانينا! لقد اجتزت التقييم بنجاح' : 'محاولة جيدة، يمكنك إعادة الاختبار'}
              </h3>
              <p className="text-xs text-slate-500">
                حصلت على <span className="font-bold text-emerald-600 font-mono">{score}</span> من أصل <span className="font-mono">{module.quiz.length}</span> إجابات صحيحة
              </p>
            </div>

            {score >= 2 && (
              <div className="p-3 bg-emerald-50 dark:bg-emerald-950/30 border border-emerald-300 rounded-xl text-xs text-emerald-800 dark:text-emerald-300">
                🎉 تم منحك وسام الكفاءة لهذا المحور وتمت إضافته إلى ملف إنجازاتك الشخصي!
              </div>
            )}

            <div className="flex items-center gap-2 pt-2">
              <button
                onClick={handleResetQuiz}
                className="flex-1 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 text-slate-700 dark:text-slate-300 text-xs font-medium py-2.5 px-3 rounded-xl flex items-center justify-center gap-1"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>إعادة الاختبار</span>
              </button>
              <button
                onClick={onClose}
                className="flex-1 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold py-2.5 px-3 rounded-xl"
              >
                إنهاء وإغلاق
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
