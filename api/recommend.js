// Vercel serverless function — keeps Anthropic API key server-side
export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { fullName, qualification, experience, profession, careerGoal } = req.body;

  const prompt = `You are an academic pathway advisor. Based on the profile below, recommend ONE pathway from this list:
- Certification Program
- DBA (Doctor of Business Administration)
- PhD
- Honorary Doctorate

Profile:
- Highest Qualification: ${qualification}
- Years of Work Experience: ${experience}
- Current Profession: ${profession}
- Career Goal: ${careerGoal}

Respond ONLY with a valid JSON object in this exact format (no markdown, no extra text):
{
  "pathwayType": "<exact pathway name from the list>",
  "recommendation": "<one sentence recommendation>",
  "reasoning": "<two to three sentences explaining why this pathway fits this person>"
}`;

  try {
    const aiRes = await fetch('https://api.anthropic.com/v1/messages', {
      method:  'POST',
      headers: {
        'Content-Type':      'application/json',
        'x-api-key':         process.env.ANTHROPIC_API_KEY,
        'anthropic-version': '2023-06-01',
      },
      body: JSON.stringify({
        model:      'claude-sonnet-4-20250514',
        max_tokens: 512,
        messages:   [{ role: 'user', content: prompt }],
      }),
    });

    if (!aiRes.ok) throw new Error(`Anthropic error ${aiRes.status}`);

    const aiData  = await aiRes.json();
    const content = aiData.content[0].text.trim();

    // Strip markdown fences if present
    const clean   = content.replace(/```json|```/g, '').trim();
    const parsed  = JSON.parse(clean);

    return res.status(200).json(parsed);
  } catch (err) {
    console.error('Anthropic API error:', err);
    return res.status(500).json({ error: err.message });
  }
}
