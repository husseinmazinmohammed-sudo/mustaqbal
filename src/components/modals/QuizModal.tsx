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
      setQuizCompleted(true);
      if (score >= 2) {
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
    <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4 no-print" dir="rtl">
      <div className="w-full max-w-lg bg-white rounded-3xl overflow-hidden shadow-2xl border border-slate-200 flex flex-col">
        {/* Header */}
        <div className="px-6 py-4 bg-slate-50 border-b border-slate-200 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Award className="w-4 h-4 text-amber-600" />
            <span className="text-xs font-semibold text-slate-900">
              اختبار الكفاءة المعرفية — جامعة المستقبل
            </span>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-xl bg-white border border-slate-200 flex items-center justify-center text-slate-500 hover:text-slate-900 cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Content */}
        {!quizCompleted ? (
          <div className="p-6 space-y-4 text-right">
            <div className="flex items-center justify-between text-xs text-slate-400">
              <span>السؤال {currentQuestionIdx + 1} من {module.quiz.length}</span>
              <span className="font-mono text-teal-700 font-semibold">النقاط: {score}</span>
            </div>

            <h3 className="text-sm font-semibold text-slate-900 leading-relaxed">
              {currentQ.question}
            </h3>

            <div className="space-y-2.5">
              {currentQ.options.map((option, idx) => {
                const isSelected = selectedOption === idx;
                const isCorrect = idx === currentQ.correctIndex;

                let optionStyle = 'border-slate-200 bg-slate-50 text-slate-700 hover:bg-slate-100/80';
                if (isSelected && !isAnswerSubmitted) {
                  optionStyle = 'border-teal-600 bg-teal-50 text-teal-950 font-semibold';
                } else if (isAnswerSubmitted) {
                  if (isCorrect) {
                    optionStyle = 'border-teal-600 bg-teal-50 text-teal-950 font-semibold';
                  } else if (isSelected && !isCorrect) {
                    optionStyle = 'border-rose-500 bg-rose-50 text-rose-950';
                  }
                }

                return (
                  <button
                    key={idx}
                    disabled={isAnswerSubmitted}
                    onClick={() => handleSelectOption(idx)}
                    className={`w-full text-right p-3.5 rounded-xl border text-xs transition-all flex items-center justify-between cursor-pointer ${optionStyle}`}
                  >
                    <span>{option}</span>
                    {isAnswerSubmitted && isCorrect && (
                      <CheckCircle className="w-4 h-4 text-teal-700 shrink-0" />
                    )}
                    {isAnswerSubmitted && isSelected && !isCorrect && (
                      <AlertCircle className="w-4 h-4 text-rose-600 shrink-0" />
                    )}
                  </button>
                );
              })}
            </div>

            {isAnswerSubmitted && (
              <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-700 space-y-1">
                <strong className="block font-semibold text-teal-800">التفسير العلمي والهندسي:</strong>
                <p className="leading-relaxed font-light">{currentQ.explanation}</p>
              </div>
            )}

            <div className="pt-2">
              {!isAnswerSubmitted ? (
                <button
                  disabled={selectedOption === null}
                  onClick={handleSubmitAnswer}
                  className="w-full bg-teal-700 hover:bg-teal-800 disabled:opacity-40 text-white text-xs font-medium py-3 px-4 rounded-xl shadow-xs transition-all cursor-pointer"
                >
                  تأكيد الإجابة
                </button>
              ) : (
                <button
                  onClick={handleNextQuestion}
                  className="w-full bg-slate-900 hover:bg-slate-800 text-white text-xs font-medium py-3 px-4 rounded-xl flex items-center justify-center gap-1.5 transition-all cursor-pointer"
                >
                  <span>{isLastQuestion ? 'عرض النتيجة النهائية' : 'السؤال التالي'}</span>
                  <ArrowLeft className="w-4 h-4" />
                </button>
              )}
            </div>
          </div>
        ) : (
          <div className="p-6 text-center space-y-4">
            <div className="w-16 h-16 rounded-2xl bg-amber-50 border border-amber-200 text-amber-600 mx-auto flex items-center justify-center">
              <Award className="w-8 h-8" />
            </div>

            <div className="space-y-1">
              <h3 className="text-base font-semibold text-slate-900">
                {score >= 2 ? 'تهانينا! لقد اجتزت التقييم بنجاح' : 'محاولة جيدة، يمكنك إعادة الاختبار'}
              </h3>
              <p className="text-xs text-slate-500">
                حصلت على <span className="font-semibold text-teal-700 font-mono">{score}</span> من أصل <span className="font-mono">{module.quiz.length}</span> إجابات صحيحة
              </p>
            </div>

            {score >= 2 && (
              <div className="p-3.5 bg-teal-50 border border-teal-200 rounded-xl text-xs text-teal-900">
                تم منحك وسام الكفاءة لهذا المحور وإضافته إلى سجل الكفاءة المهنية الخاص بك.
              </div>
            )}

            <div className="flex items-center gap-2.5 pt-2">
              <button
                onClick={handleResetQuiz}
                className="flex-1 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-medium py-2.5 px-3 rounded-xl flex items-center justify-center gap-1.5 cursor-pointer"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>إعادة الاختبار</span>
              </button>
              <button
                onClick={onClose}
                className="flex-1 bg-teal-700 hover:bg-teal-800 text-white text-xs font-medium py-2.5 px-3 rounded-xl cursor-pointer"
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
