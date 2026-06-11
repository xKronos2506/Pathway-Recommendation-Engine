/**
 * Rules-Based Academic Pathway Recommendation Engine
 * Used as primary engine (or fallback if AI call fails).
 *
 * Logic matrix:
 * ┌──────────────────────┬──────────┬──────────────────────────────┐
 * │ Qualification        │ Exp (yr) │ Recommended Pathway          │
 * ├──────────────────────┼──────────┼──────────────────────────────┤
 * │ High School / Diploma│  0 – 4   │ Certification Program        │
 * │ High School / Diploma│  5+      │ Certification Program        │
 * │ Bachelor's           │  0 – 2   │ Certification Program        │
 * │ Bachelor's           │  3 – 6   │ DBA / Master's Pathway       │
 * │ Bachelor's           │  7+      │ DBA                          │
 * │ Master's             │  0 – 4   │ PhD                          │
 * │ Master's             │  5 – 9   │ PhD or DBA                   │
 * │ Master's / PhD       │  15+     │ Honorary Doctorate           │
 * │ PhD                  │  any     │ Honorary Doctorate           │
 * └──────────────────────┴──────────┴──────────────────────────────┘
 * Goal keywords also influence pathway (research → PhD, leadership → DBA).
 */

const PATHWAYS = {
  CERT:     'Certification Program',
  DBA:      'DBA',
  PHD:      'PhD',
  HONORARY: 'Honorary Doctorate',
};

const QUAL_RANK = {
  'high school': 1,
  'diploma':     1,
  "associate's": 2,
  "bachelor's":  3,
  "master's":    4,
  'phd':         5,
  'doctorate':   5,
};

function rankQualification(qual) {
  const q = qual.toLowerCase();
  for (const [key, rank] of Object.entries(QUAL_RANK)) {
    if (q.includes(key)) return rank;
  }
  return 2; // default: associate level
}

function goalHints(goal) {
  const g = goal.toLowerCase();
  if (/(research|academic|professor|scientist|publish)/.test(g)) return 'research';
  if (/(lead|executive|ceo|cto|director|management|mba)/.test(g)) return 'leadership';
  if (/(skill|certif|upskill|career change|switch)/.test(g))       return 'skill';
  if (/(legacy|impact|recognition|honorary)/.test(g))              return 'legacy';
  return 'general';
}

export function generateRecommendation({ qualification, experience, careerGoal }) {
  const rank = rankQualification(qualification);
  const exp  = parseInt(experience, 10) || 0;
  const hint = goalHints(careerGoal);

  let pathway  = PATHWAYS.CERT;
  let reasoning = '';

  if (rank >= 5 || (rank >= 4 && exp >= 15)) {
    pathway   = PATHWAYS.HONORARY;
    reasoning = `With ${hint === 'legacy' ? 'a legacy-focused goal and' : 'a'} ${qualification} and ${exp} years of experience, an Honorary Doctorate recognises outstanding professional contribution.`;
  } else if (rank >= 4) {
    if (hint === 'leadership' || exp >= 5) {
      pathway   = PATHWAYS.DBA;
      reasoning = `A Master's-level background with ${exp} years in the field, combined with leadership aspirations, aligns best with the practical rigour of a DBA.`;
    } else {
      pathway   = PATHWAYS.PHD;
      reasoning = `Your Master's qualification and ${hint === 'research' ? 'research-oriented' : 'academic'} goals make a PhD the natural next step.`;
    }
  } else if (rank === 3) {
    if (exp >= 7 || hint === 'leadership') {
      pathway   = PATHWAYS.DBA;
      reasoning = `${exp} years of hands-on experience post-Bachelor's, especially with leadership goals, is the ideal foundation for a DBA.`;
    } else if (exp >= 3 || hint === 'research') {
      pathway   = PATHWAYS.DBA;
      reasoning = `Your Bachelor's and growing experience signal readiness for postgraduate study — a DBA bridges your practice and theory.`;
    } else {
      pathway   = PATHWAYS.CERT;
      reasoning = `At this stage, targeted certifications will rapidly build the specialist credentials that accelerate your ${careerGoal} goal.`;
    }
  } else {
    pathway   = PATHWAYS.CERT;
    reasoning = `Certification programs are the fastest, most recognised route to advancing toward your goal from your current qualification level.`;
  }

  return {
    pathwayType:    pathway,
    recommendation: `${pathway} — ${reasoning}`,
    reasoning,
  };
}
