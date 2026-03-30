import { useState, useEffect, useCallback } from "react";
import { useLocation } from "wouter";
import { ArrowLeft } from "lucide-react";
import { QUIZ_QUESTIONS } from "../../../shared/quiz";
import { trpc } from "@/lib/trpc";
import { nanoid } from "nanoid";

const TOTAL_QUESTIONS = QUIZ_QUESTIONS.length;

// Stable session ID for this quiz attempt
const SESSION_ID = nanoid();

export default function Quiz() {
  const [, navigate] = useLocation();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [isAnimating, setIsAnimating] = useState(false);

  const submitMutation = trpc.quiz.submit.useMutation({
    onSuccess: (data) => {
      navigate(
        `/results?submissionId=${data.submissionId}&archetype=${data.primaryArchetype}${data.secondaryArchetype ? `&secondary=${data.secondaryArchetype}` : ""}`,
      );
    },
  });

  const currentQuestion = QUIZ_QUESTIONS[currentIndex];
  const progress = ((currentIndex + 1) / TOTAL_QUESTIONS) * 100;
  const isLastQuestion = currentIndex === TOTAL_QUESTIONS - 1;
  const currentAnswer = answers[currentQuestion.id];

  const goNext = useCallback(() => {
    if (!currentAnswer) return;
    if (isLastQuestion) {
      submitMutation.mutate({ sessionId: SESSION_ID, answers });
      return;
    }
    setIsAnimating(true);
    setTimeout(() => {
      setCurrentIndex((i) => i + 1);
      setIsAnimating(false);
    }, 200);
  }, [currentAnswer, isLastQuestion, submitMutation, answers]);

  const goBack = useCallback(() => {
    if (currentIndex === 0) {
      navigate("/");
      return;
    }
    setIsAnimating(true);
    setTimeout(() => {
      setCurrentIndex((i) => i - 1);
      setIsAnimating(false);
    }, 200);
  }, [currentIndex, navigate]);

  const selectAnswer = (optionId: string) => {
    setAnswers((prev) => ({ ...prev, [currentQuestion.id]: optionId }));
  };

  // Auto-advance on selection
  useEffect(() => {
    if (currentAnswer) {
      const timer = setTimeout(() => goNext(), 320);
      return () => clearTimeout(timer);
    }
  }, [currentAnswer, goNext]);

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* TOP BAR */}
      <div className="sticky top-0 z-10 bg-background/95 backdrop-blur border-b border-border">
        <div className="max-w-2xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between mb-3">
            <button
              onClick={goBack}
              className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              <ArrowLeft size={16} />
              {currentIndex === 0 ? "Back" : "Previous"}
            </button>
            <div className="flex flex-col items-end">
              <span className="text-sm font-bold text-foreground">
                {currentIndex + 1}
                <span className="text-muted-foreground/50 font-normal"> / {TOTAL_QUESTIONS}</span>
              </span>
              <span className="text-[10px] text-muted-foreground/50 mt-0.5">
                {Math.round(progress)}% done
              </span>
            </div>
          </div>
          {/* Progress bar */}
          <div className="h-1.5 bg-secondary rounded-full overflow-hidden">
            <div
              className="h-full bg-primary rounded-full transition-all duration-500 ease-out"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>
      </div>

      {/* QUESTION AREA */}
      <div className="flex-1 flex flex-col max-w-2xl mx-auto w-full px-4 py-8 sm:py-12">
        <div
          className={`transition-opacity duration-200 ${isAnimating ? "opacity-0" : "opacity-100"}`}
        >
          {/* Question text */}
          <h2 className="text-xl sm:text-2xl font-bold leading-snug mb-8 text-foreground">
            {currentQuestion.text}
          </h2>

          {/* Options */}
          <div className="space-y-3">
            {currentQuestion.options.map((option) => {
              const isSelected = currentAnswer === option.id;
              return (
                <button
                  key={option.id}
                  onClick={() => selectAnswer(option.id)}
                  className={`quiz-option w-full text-left px-5 py-4 rounded-xl border-2 transition-all duration-150 flex items-start gap-4 group ${
                    isSelected
                      ? "selected border-primary bg-primary/8 text-foreground"
                      : "border-border bg-card hover:border-primary/40 text-foreground"
                  }`}
                >
                  <div
                    className={`mt-0.5 w-5 h-5 rounded-full border-2 flex-shrink-0 flex items-center justify-center transition-all ${
                      isSelected
                        ? "border-primary bg-primary"
                        : "border-border group-hover:border-primary/50"
                    }`}
                  >
                    {isSelected && (
                      <div className="w-2 h-2 rounded-full bg-primary-foreground" />
                    )}
                  </div>
                  <span className="text-sm sm:text-base leading-relaxed">
                    {option.text}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Bottom hint */}
        {!currentAnswer && (
          <p className="mt-8 text-xs text-muted-foreground text-center">
            Select an answer to continue
          </p>
        )}

        {/* Error state */}
        {submitMutation.isError && (
          <div className="mt-6 p-4 bg-destructive/10 border border-destructive/30 rounded-xl text-sm text-destructive text-center">
            Something went wrong. Please try again.
          </div>
        )}
      </div>

      {/* BOTTOM PROGRESS DOTS */}
      <div className="pb-8 flex justify-center gap-1">
        {QUIZ_QUESTIONS.map((q, i) => (
          <div
            key={q.id}
            className={`rounded-full transition-all duration-300 ${
              i < currentIndex
                ? "w-2 h-2 bg-primary"
                : i === currentIndex
                  ? "w-4 h-2 bg-primary"
                  : "w-2 h-2 bg-border"
            }`}
          />
        ))}
      </div>
    </div>
  );
}
