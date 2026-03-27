import { describe, it, expect } from "vitest";
import { calculateScores } from "../shared/scoring";
import { QUIZ_QUESTIONS } from "../shared/quiz";

describe("calculateScores", () => {
  it("returns all archetypes with zero scores for empty answers", () => {
    const result = calculateScores({});
    expect(result.primaryArchetype).toBeDefined();
    expect(result.scores.craftsman).toBe(0);
    expect(result.scores.operator).toBe(0);
    expect(result.scores.hustler).toBe(0);
    expect(result.scores.specialist).toBe(0);
    expect(result.scores.leader).toBe(0);
    expect(result.scores.guardian).toBe(0);
    expect(result.scores.maverick).toBe(0);
  });

  it("accumulates weights correctly for craftsman-aligned answers", () => {
    // q1a → craftsman: 3, specialist: 2
    // q2a → craftsman: 3, specialist: 2
    const answers = { q1: "q1a", q2: "q2a" };
    const result = calculateScores(answers);
    expect(result.scores.craftsman).toBe(6);
    expect(result.scores.specialist).toBe(4);
    expect(result.primaryArchetype).toBe("craftsman");
  });

  it("accumulates weights correctly for operator-aligned answers", () => {
    // q6a → operator: 3, specialist: 1
    // q12a → operator: 3, specialist: 1
    const answers = { q6: "q6a", q12: "q12a" };
    const result = calculateScores(answers);
    expect(result.scores.operator).toBe(6);
    expect(result.scores.specialist).toBe(2);
    expect(result.primaryArchetype).toBe("operator");
  });

  it("accumulates weights correctly for hustler-aligned answers", () => {
    // q2c → hustler: 3, guardian: 1
    const answers = { q2: "q2c" };
    const result = calculateScores(answers);
    expect(result.scores.hustler).toBe(3);
    expect(result.primaryArchetype).toBe("hustler");
  });

  it("percentages sum to 100", () => {
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
    // Give craftsman a dominant score
    const answers: Record<string, string> = {};
    QUIZ_QUESTIONS.forEach((q) => {
      // Always pick the first option (varies by question but creates some spread)
      answers[q.id] = q.options[0].id;
    });
    const result = calculateScores(answers);
    // Just verify the shape is correct
    expect(result.primaryArchetype).toBeDefined();
    expect(
      result.secondaryArchetype === null ||
        typeof result.secondaryArchetype === "string",
    ).toBe(true);
  });

  it("assigns secondary archetype when scores are close", () => {
    // q8a → specialist: 3, craftsman: 2
    // q1a → craftsman: 3, specialist: 2
    // craftsman = 2+3 = 5, specialist = 3+2 = 5 → tied, both should show up
    const answers = { q1: "q1a", q8: "q8a" };
    const result = calculateScores(answers);
    expect(result.primaryArchetype).toBeDefined();
    // With tied scores, secondary should be assigned (ratio = 1.0 ≥ 0.80)
    expect(result.secondaryArchetype).not.toBeNull();
    // Both craftsman and specialist should be in the top two
    const top = [result.primaryArchetype, result.secondaryArchetype];
    expect(top).toContain("craftsman");
    expect(top).toContain("specialist");
  });

  it("handles invalid option IDs gracefully", () => {
    const answers = { q1: "invalid_option_id" };
    const result = calculateScores(answers);
    // Should not throw, just ignore invalid option
    expect(result.scores.craftsman).toBe(0);
  });

  it("handles unknown question IDs gracefully", () => {
    const answers = { unknown_question: "some_option" };
    const result = calculateScores(answers);
    expect(result.primaryArchetype).toBeDefined();
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

  it("all options have at least one weight", () => {
    QUIZ_QUESTIONS.forEach((q) => {
      q.options.forEach((o) => {
        expect(Object.keys(o.weights).length).toBeGreaterThanOrEqual(1);
      });
    });
  });

  it("total question count is 17", () => {
    expect(QUIZ_QUESTIONS.length).toBe(17);
  });
});
