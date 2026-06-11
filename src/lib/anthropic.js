/**
 * Calls the Anthropic Claude API (proxied through /api/recommend).
 * In development, calls the Vercel serverless function locally.
 * Falls back to the rules-based engine if this fails.
 */
export async function getAIRecommendation(profile) {
  try {
    const response = await fetch('/api/recommend', {
      method:  'POST',
      headers: { 'Content-Type': 'application/json' },
      body:    JSON.stringify(profile),
    });

    if (!response.ok) throw new Error(`API error ${response.status}`);

    const data = await response.json();
    return {
      pathwayType:    data.pathwayType,
      recommendation: data.recommendation,
      reasoning:      data.reasoning,
      source:         'ai',
    };
  } catch (err) {
    console.warn('AI recommendation failed, using rules engine:', err.message);
    return null; // caller handles fallback
  }
}
