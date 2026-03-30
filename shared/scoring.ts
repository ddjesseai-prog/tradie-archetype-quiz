// Tradie Quiz — Master Execution Spec v2
// Deterministic +1 scoring, tiebreak: HT > SO > PC > RB > VC

import type { ArchetypeId } from "./archetypes";
import { ARCHETYPE_ORDER, TIEBREAK_ORDER } from "./archetypes";
import { QUIZ_QUESTIONS } from "./quiz";

export interface ScoreMap extends Record<ArchetypeId, number> {}

export interface QuizResult {
  primaryArchetype: ArchetypeId;
  secondaryArchetype: ArchetypeId | null;
  scores: ScoreMap;
  percentages: Record<ArchetypeId, number>;
}

/**
 * Calculate archetype scores from a map of questionId → optionId answers.
 * Each selected option contributes +1 to the archetype(s) it maps to.
 * Tiebreak order: HT > SO > PC > RB > VC
 */
export function calculateScores(answers: Record<string, string>): QuizResult {
  // Initialise all scores to 0
  const scores: ScoreMap = {
    PC: 0,
    SO: 0,
    HT: 0,
    VC: 0,
    RB: 0,
  };

  // Accumulate +1 scores for each answered question
  for (const question of QUIZ_QUESTIONS) {
    const selectedOptionId = answers[question.id];
    if (!selectedOptionId) continue;

    const option = question.options.find((o) => o.id === selectedOptionId);
    if (!option) continue;

    for (const [archetypeId, weight] of Object.entries(option.scores) as [
      ArchetypeId,
      number,
    ][]) {
      scores[archetypeId] += weight;
    }
  }

  // Calculate total score for percentage normalisation
  const totalScore = (Object.values(scores) as number[]).reduce(
    (sum: number, s: number) => sum + s,
    0,
  );

  const percentages = Object.fromEntries(
    ARCHETYPE_ORDER.map((id) => [
      id,
      totalScore > 0 ? Math.round((scores[id] / totalScore) * 100) : 0,
    ]),
  ) as Record<ArchetypeId, number>;

  // Sort archetypes by score descending, apply tiebreak order for equal scores
  const sorted = [...ARCHETYPE_ORDER].sort((a, b) => {
    const scoreDiff = scores[b] - scores[a];
    if (scoreDiff !== 0) return scoreDiff;
    // Tiebreak: lower index in TIEBREAK_ORDER wins
    return TIEBREAK_ORDER.indexOf(a) - TIEBREAK_ORDER.indexOf(b);
  });

  const primaryArchetype = sorted[0];
  const secondaryScore = scores[sorted[1]];
  const primaryScore = scores[primaryArchetype];

  // Show secondary archetype only if it is within 20% of the primary score
  // and has at least 10% of the total score
  const secondaryArchetype =
    primaryScore > 0 &&
    secondaryScore >= primaryScore * 0.8 &&
    percentages[sorted[1]] >= 10
      ? sorted[1]
      : null;

  return {
    primaryArchetype,
    secondaryArchetype,
    scores,
    percentages,
  };
}
