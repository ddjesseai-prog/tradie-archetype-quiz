import type { ArchetypeId } from "./archetypes";
import { ARCHETYPE_ORDER } from "./archetypes";
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
 * Returns primary archetype, optional secondary, raw scores, and percentages.
 */
export function calculateScores(answers: Record<string, string>): QuizResult {
  // Initialise all scores to 0
  const scores: ScoreMap = {
    craftsman: 0,
    operator: 0,
    hustler: 0,
    specialist: 0,
    leader: 0,
    guardian: 0,
    maverick: 0,
  };

  // Accumulate weights for each answered question
  for (const question of QUIZ_QUESTIONS) {
    const selectedOptionId = answers[question.id];
    if (!selectedOptionId) continue;

    const option = question.options.find((o) => o.id === selectedOptionId);
    if (!option) continue;

    for (const [archetypeId, weight] of Object.entries(option.weights) as [
      ArchetypeId,
      number,
    ][]) {
      scores[archetypeId] += weight;
    }
  }

  // Calculate total score for percentage normalisation
  const totalScore = (Object.values(scores) as number[]).reduce((sum: number, s: number) => sum + s, 0);

  const percentages = Object.fromEntries(
    ARCHETYPE_ORDER.map((id) => [
      id,
      totalScore > 0 ? Math.round((scores[id] / totalScore) * 100) : 0,
    ]),
  ) as Record<ArchetypeId, number>;

  // Sort archetypes by score descending
  const sorted = [...ARCHETYPE_ORDER].sort((a, b) => scores[b] - scores[a]);

  const primaryArchetype = sorted[0];
  const secondaryScore = scores[sorted[1]];
  const primaryScore = scores[primaryArchetype];

  // Show secondary archetype only if it's within 15% of the primary score
  // and has at least 10% of the total score
  const secondaryArchetype =
    primaryScore > 0 &&
    secondaryScore >= primaryScore * 0.85 &&
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
