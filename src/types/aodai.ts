export interface CriterionScore {
  id: string;
  name: string;
  score: number; // 1 to 5
  max: number; // 5
  note: string;
  criteriaDetail?: string;
}

export interface CategoryEvaluation {
  title: string;
  weight: number;
  rawTotal: number;
  weightedScore: number;
  criteria: Record<string, CriterionScore>;
}

export interface TabooCheck {
  id: number;
  rule: string;
  violated: boolean;
  severity: 'danger' | 'warning' | 'safe';
  explanation: string;
}

export interface GoldenQuestion {
  id: number;
  question: string;
  passed: boolean;
  comment: string;
}

export interface ImprovementSuggestion {
  aspect: string;
  currentIssue: string;
  actionStep: string;
  expectedImpact: string;
}

export interface AoDaiAnalysisResult {
  overview: {
    title: string;
    summary: string;
    layoutType: string;
    layoutTypeVi: string;
    flowType: string;
    structureType: string;
    designLevel: 'L1' | 'L2' | 'L3' | 'L4' | 'L5';
    designLevelName: string;
    designLevelDesc: string;
    negativeSpaceRatio: {
      motifPercent: number;
      emptyPercent: number;
      assessment: string;
    };
    colorPalette: {
      primaryColors: string[];
      emotionalTone: string;
      styleCategory: string;
      hackDangEffect: string;
    };
    has3DWrapAround: boolean;
  };
  scores: {
    categoryA: CategoryEvaluation;
    categoryB: CategoryEvaluation;
    categoryC: CategoryEvaluation;
    categoryD: CategoryEvaluation;
    categoryE: CategoryEvaluation;
    totalScore: number;
    rank: {
      name: string;
      badgeColor: string;
      meaning: string;
    };
  };
  tabooChecks: TabooCheck[];
  goldenQuestions: GoldenQuestion[];
  strengths: string[];
  weaknesses: string[];
  improvementSuggestions: ImprovementSuggestion[];
  verdict: {
    overallConclusion: string;
    targetOccasions: string[];
    targetSilhouettes: string;
    recommendedFabric: string;
    commercialViability: string;
  };
}

export interface SampleImage {
  id: string;
  title: string;
  subtitle: string;
  tag: string;
  description: string;
  imageUrl: string;
}

export interface ComparisonSlot {
  id: string;
  label: string;
  imageUrl: string | null;
  mimeType: string;
  note?: string;
  result?: AoDaiAnalysisResult | null;
  isLoading?: boolean;
  error?: string | null;
}

export interface ComparisonSynthesis {
  summary: string;
  similarities: Array<{
    aspect: string;
    description: string;
  }>;
  differences: Array<{
    aspect: string;
    comparisons: Array<{
      slotId: string;
      label: string;
      observation: string;
    }>;
    keyInsight: string;
  }>;
  bestSelections: {
    overallWinnerSlotId: string;
    overallWinnerReason: string;
    bestFlowSlotId: string;
    bestNegativeSpaceSlotId: string;
    bestHackDangSlotId: string;
    bestCraftSlotId: string;
  };
  scenarioRecommendations: Array<{
    scenario: string;
    recommendedSlotId: string;
    reason: string;
  }>;
  verdictAndAdvice: string;
}
