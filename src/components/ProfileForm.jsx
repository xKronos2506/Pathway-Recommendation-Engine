import { useState } from 'react';
import { User, Mail, BookOpen, Briefcase, Target, Clock } from 'lucide-react';

const QUALIFICATIONS = [
  'High School',
  'Diploma',
  "Associate's Degree",
  "Bachelor's Degree",
  "Master's Degree",
  'PhD',
  'Other',
];

const initialState = {
  fullName:      '',
  email:         '',
  qualification: '',
  experience:    '',
  profession:    '',
  careerGoal:    '',
};

// Defined OUTSIDE ProfileForm so it is never recreated on re-render.
// If defined inside, React remounts the input on every keystroke → focus lost.
function Field({ icon: Icon, label, name, type = 'text', placeholder, form, errors, onChange, children }) {
  return (
    <div className="space-y-1.5">
      <label className="flex items-center gap-2 text-sm font-semibold text-slate-700">
        <Icon className="h-4 w-4 text-brand-500" /> {label}
      </label>
      {children || (
        <input
          type={type}
          name={name}
          value={form[name]}
          onChange={onChange}
          placeholder={placeholder}
          className={`input-field ${errors[name] ? 'border-red-400 ring-1 ring-red-300' : ''}`}
        />
      )}
      {errors[name] && <p className="text-xs text-red-500">{errors[name]}</p>}
    </div>
  );
}

export default function ProfileForm({ onSubmit, loading }) {
  const [form,   setForm]   = useState(initialState);
  const [errors, setErrors] = useState({});

  function validate() {
    const e = {};
    if (!form.fullName.trim())                                        e.fullName      = 'Full name is required.';
    if (!/\S+@\S+\.\S+/.test(form.email))                            e.email         = 'Enter a valid email.';
    if (!form.qualification)                                          e.qualification = 'Select your qualification.';
    if (form.experience === '' || isNaN(form.experience) || Number(form.experience) < 0)
                                                                      e.experience    = 'Enter valid years (0+).';
    if (!form.profession.trim())                                      e.profession    = 'Profession is required.';
    if (!form.careerGoal.trim())                                      e.careerGoal    = 'Career goal is required.';
    return e;
  }

  function handleChange(e) {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors(prev => ({ ...prev, [name]: '' }));
  }

  function handleSubmit(e) {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length > 0) { setErrors(errs); return; }
    onSubmit(form);
  }

  const fieldProps = { form, errors, onChange: handleChange };

  return (
    <form onSubmit={handleSubmit} noValidate className="space-y-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        <Field icon={User} label="Full Name"      name="fullName" placeholder="e.g. Dr. Sara Al-Harthy" {...fieldProps} />
        <Field icon={Mail} label="Email Address"  name="email"    type="email" placeholder="sara@example.com" {...fieldProps} />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        <Field icon={BookOpen} label="Highest Qualification" name="qualification" {...fieldProps}>
          <select
            name="qualification"
            value={form.qualification}
            onChange={handleChange}
            className={`input-field ${errors.qualification ? 'border-red-400' : ''}`}
          >
            <option value="">Select qualification…</option>
            {QUALIFICATIONS.map(q => <option key={q} value={q}>{q}</option>)}
          </select>
          {errors.qualification && <p className="text-xs text-red-500">{errors.qualification}</p>}
        </Field>

        <Field icon={Clock} label="Years of Work Experience" name="experience" type="number" placeholder="e.g. 8" {...fieldProps} />
      </div>

      <Field icon={Briefcase} label="Current Profession" name="profession" placeholder="e.g. Senior Marketing Manager" {...fieldProps} />

      <div className="space-y-1.5">
        <label className="flex items-center gap-2 text-sm font-semibold text-slate-700">
          <Target className="h-4 w-4 text-brand-500" /> Career Goal
        </label>
        <textarea
          name="careerGoal"
          value={form.careerGoal}
          onChange={handleChange}
          rows={3}
          placeholder="Describe where you want to be in 3–5 years…"
          className={`input-field resize-none ${errors.careerGoal ? 'border-red-400' : ''}`}
        />
        {errors.careerGoal && <p className="text-xs text-red-500">{errors.careerGoal}</p>}
      </div>

      <button type="submit" disabled={loading} className="btn-primary w-full text-base">
        {loading ? 'Analysing your profile…' : 'Generate My Pathway →'}
      </button>
    </form>
  );
}
