import { describe, it, expect } from "vitest";
import { calculateScores } from "../shared/scoring";
import { QUIZ_QUESTIONS } from "../shared/quiz";

describe("calculateScores", () => {
  it("returns all archetypes with zero scores for empty answers", () => {
    const result = calculateScores({});
    expect(result.primaryArchetype).toBeDefined();
    expect(result.scores.PC).toBe(0);
    expect(result.scores.SO).toBe(0);
    expect(result.scores.HT).toBe(0);
    expect(result.scores.VC).toBe(0);
    expect(result.scores.RB).toBe(0);
  });

  it("accumulates +1 weights correctly for PC-aligned answers", () => {
    // q1a → PC: 1, q2a → PC: 1, q3a → PC: 1
    const answers = { q1: "q1a", q2: "q2a", q3: "q3a" };
    const result = calculateScores(answers);
    expect(result.scores.PC).toBe(3);
    expect(result.primaryArchetype).toBe("PC");
  });

  it("accumulates +1 weights correctly for SO-aligned answers", () => {
    // q1b → SO: 1, q2b → SO: 1, q3b → SO: 1
    const answers = { q1: "q1b", q2: "q2b", q3: "q3b" };
    const result = calculateScores(answers);
    expect(result.scores.SO).toBe(3);
    expect(result.primaryArchetype).toBe("SO");
  });

  it("accumulates +1 weights correctly for HT-aligned answers", () => {
    // q1c → HT: 1, q2c → HT: 1, q3c → HT: 1
    const answers = { q1: "q1c", q2: "q2c", q3: "q3c" };
    const result = calculateScores(answers);
    expect(result.scores.HT).toBe(3);
    expect(result.primaryArchetype).toBe("HT");
  });

  it("percentages sum to ~100", () => {
    const answers: Record<string, string> = {};
    QUIZ_QUESTIONS.forEach((q) => {
      answers[q.id] = q.options[0].id;
    });
    const result = calculateScores(answers);
    const total = Object.values(result.percentages).reduce((a, b) => a + b, 0);
    // Allow ±2 due to rounding
    expect(total).toBeGreaterThanOrEqual(98);
    expect(total).toBeLessThanOrEqual(102);
  });

  it("does not assign secondary archetype when scores are far apart", () => {
    // Give HT a dominant score across all 20 questions
    const answers: Record<string, string> = {};
    QUIZ_QUESTIONS.forEach((q) => {
      // Pick option c (HT) for all questions
      const htOption = q.options.find((o) => o.scores.HT === 1);
      if (htOption) answers[q.id] = htOption.id;
    });
    const result = calculateScores(answers);
    expect(result.primaryArchetype).toBe("HT");
    // Secondary should be null since HT dominates
    expect(result.secondaryArchetype).toBeNull();
  });

  it("assigns secondary archetype when scores are tied", () => {
    // q1a → PC: 1, q1b → SO: 1 (can't both be answered, use separate questions)
    // q1a → PC: 1, q2b → SO: 1 → tied at 1 each
    const answers = { q1: "q1a", q2: "q2b" };
    const result = calculateScores(answers);
    expect(result.primaryArchetype).toBeDefined();
    // With tied scores, secondary should be assigned
    expect(result.secondaryArchetype).not.toBeNull();
  });

  it("handles invalid option IDs gracefully", () => {
    const answers = { q1: "invalid_option_id" };
    const result = calculateScores(answers);
    // Should not throw, just ignore invalid option
    expect(result.scores.PC).toBe(0);
    expect(result.scores.HT).toBe(0);
  });

  it("handles unknown question IDs gracefully", () => {
    const answers = { unknown_question: "some_option" };
    const result = calculateScores(answers);
    expect(result.primaryArchetype).toBeDefined();
  });

  it("tiebreak order: HT beats SO when tied", () => {
    // q1b → SO: 1, q2c → HT: 1 → tied at 1 each
    const answers = { q1: "q1b", q2: "q2c" };
    const result = calculateScores(answers);
    // HT should win tiebreak over SO
    expect(result.primaryArchetype).toBe("HT");
  });
});

describe("quiz questions structure", () => {
  it("all questions have at least 2 options", () => {
    QUIZ_QUESTIONS.forEach((q) => {
      expect(q.options.length).toBeGreaterThanOrEqual(2);
    });
  });

  it("all option IDs are unique within a question", () => {
    QUIZ_QUESTIONS.forEach((q) => {
      const ids = q.options.map((o) => o.id);
      const unique = new Set(ids);
      expect(unique.size).toBe(ids.length);
    });
  });

  it("all options have at least one score weight", () => {
    QUIZ_QUESTIONS.forEach((q) => {
      q.options.forEach((o) => {
        expect(Object.keys(o.scores).length).toBeGreaterThanOrEqual(1);
      });
    });
  });

  it("total question count is 20", () => {
    expect(QUIZ_QUESTIONS.length).toBe(20);
  });
});
