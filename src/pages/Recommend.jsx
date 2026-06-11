import { useState }               from 'react';
import { supabase, isSupabaseConfigured } from '../lib/supabase';
import { getAIRecommendation }    from '../lib/anthropic';
import { generateRecommendation } from '../lib/recommendationEngine';
import ProfileForm                from '../components/ProfileForm';
import RecommendationCard         from '../components/RecommendationCard';
import StepIndicator              from '../components/StepIndicator';
import LoadingSpinner             from '../components/LoadingSpinner';
import toast                      from 'react-hot-toast';

// step: 1 = form, 2 = generating, 3 = result
export default function Recommend() {
  const [step,    setStep]    = useState(1);
  const [result,  setResult]  = useState(null);
  const [profile, setProfile] = useState(null);

  async function handleSubmit(formData) {
    setProfile(formData);
    setStep(2);

    try {
      // 1. Try AI recommendation
      let rec = await getAIRecommendation(formData);

      // 2. Fallback to rules engine
      if (!rec) {
        rec = generateRecommendation({
          qualification: formData.qualification,
          experience:    formData.experience,
          careerGoal:    formData.careerGoal,
        });
        rec.source = 'rules';
      }

      // 3. Store in Supabase (only if env vars are configured)
      if (isSupabaseConfigured) {
        const { error: dbError } = await supabase.from('submissions').insert({
          full_name:      formData.fullName,
          email:          formData.email,
          qualification:  formData.qualification,
          experience:     parseInt(formData.experience, 10),
          profession:     formData.profession,
          career_goal:    formData.careerGoal,
          recommendation: rec.recommendation,
          pathway_type:   rec.pathwayType,
          reasoning:      rec.reasoning,
        });

        if (dbError) {
          console.error('Supabase insert error:', dbError);
          toast.error('Saved locally but database write failed.');
        } else {
          toast.success('Pathway saved successfully!');
        }
      } else {
        console.warn('Supabase not configured — skipping database save.');
        toast.success('Pathway generated! (Add Supabase keys to .env.local to save results)');
      }

      setResult(rec);
      setStep(3);
    } catch (err) {
      console.error('Recommendation error:', err);
      toast.error('Something went wrong. Please try again.');
      setStep(1);
    }
  }

  function handleReset() {
    setStep(1);
    setResult(null);
    setProfile(null);
  }

  return (
    <div className="max-w-2xl mx-auto px-4 sm:px-6 py-12">
      <div className="text-center mb-8">
        <h1 className="font-display text-3xl sm:text-4xl font-bold text-slate-900">
          Academic Pathway Assessment
        </h1>
        <p className="text-slate-500 mt-2">
          Fill in your profile and we'll recommend the right academic credential for you.
        </p>
      </div>

      <StepIndicator current={step} />

      {step === 1 && (
        <div className="card">
          <ProfileForm onSubmit={handleSubmit} loading={false} />
        </div>
      )}

      {step === 2 && (
        <div className="card py-20 flex flex-col items-center gap-6">
          <LoadingSpinner size="lg" label="" />
          <div className="text-center">
            <p className="font-semibold text-slate-700 text-lg">Analysing your profile…</p>
            <p className="text-slate-400 text-sm mt-1">Our AI is evaluating your background and goals</p>
          </div>
        </div>
      )}

      {step === 3 && result && (
        <RecommendationCard result={result} profile={profile} onReset={handleReset} />
      )}
    </div>
  );
}
