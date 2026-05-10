// ============================================================================
// AuthScreen.js
// ============================================================================

import React, { useState } from 'react';
import logo from '../assets/elite-scholars-logo.png';

import {
  registerProfile,
  loginProfile,
  requestPasswordReset,
  confirmPasswordReset,
} from '../utils/profileApi';

import { logSessionToSheet } from '../utils/auth';
import { saveUser } from '../utils/storage';

const EXAM_TYPES = [
  { id: 'jamb',     label: 'JAMB UTME', icon: '📝' },
  { id: 'waec',     label: 'WAEC',      icon: '📋' },
  { id: 'neco',     label: 'NECO',      icon: '📄' },
  { id: 'postutme', label: 'POST UTME', icon: '🎓' },
  { id: 'gst',      label: 'GST (Uni)', icon: '🏛️' },
];

const STUDENT_TYPES = [
  {
    id:    'senior_school',
    label: 'Senior School Student',
    desc:  'SS1 – SS3 • WAEC • NECO • GCE',
    icon:  '🏫'
  },
  {
    id:    'aspirant',
    label: 'Aspirant',
    desc:  'Preparing for JAMB & Post-UTME',
    icon:  '🎯'
  },
  {
    id:    'university',
    label: 'University Student',
    desc:  '100L – 500L • GST / GNS Courses',
    icon:  '🎓'
  },
];

function validate(fields) {
  if (fields.firstName !== undefined && !fields.firstName.trim())
    return 'Enter your first name.';
  if (fields.lastName !== undefined && !fields.lastName.trim())
    return 'Enter your last name.';
  if (!fields.email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(fields.email))
    return 'Enter a valid email address.';
  if (fields.password !== undefined && fields.password.length < 8)
    return 'Password must be at least 8 characters.';
  if (fields.confirm !== undefined && fields.password !== fields.confirm)
    return 'Passwords do not match.';
  if (fields.studentType !== undefined && !fields.studentType)
    return 'Select your student type.';
  if (fields.selectedExams !== undefined && fields.selectedExams.length === 0)
    return 'Select at least one exam.';
  return null;
}

// ── Network error helper ──────────────────────────────────────────────────────
function getNetworkError(e) {
  if (!navigator.onLine) {
    return 'No internet connection. Please check your network and try again.';
  }
  if (
    e?.message === 'Failed to fetch' ||
    e?.message?.includes('fetch') ||
    e?.name === 'TypeError'
  ) {
    return 'Network error. Please check your connection and try again.';
  }
  return e?.message || 'Something went wrong. Please try again.';
}

export default function AuthScreen({ onDone }) {

  // ─────────────────────────────────────────
  // Views
  // ─────────────────────────────────────────
  const [view, setView]           = useState('login');
  const [step, setStep]           = useState(1);
  const [resetStep, setResetStep] = useState(1);

  // ─────────────────────────────────────────
  // Signup/Login fields
  // ─────────────────────────────────────────
  const [firstName, setFirstName]         = useState('');
  const [lastName, setLastName]           = useState('');
  const [email, setEmail]                 = useState('');
  const [password, setPassword]           = useState('');
  const [confirm, setConfirm]             = useState('');
  const [showPw, setShowPw]               = useState(false);
  const [studentType, setStudentType]     = useState('');
  const [selectedExams, setSelectedExams] = useState([]);

  // ─────────────────────────────────────────
  // Reset Password
  // ─────────────────────────────────────────
  const [resetEmail, setResetEmail] = useState('');
  const [resetCode, setResetCode]   = useState('');
  const [newPw, setNewPw]           = useState('');

  // ─────────────────────────────────────────
  // UI
  // ─────────────────────────────────────────
  const [error, setError]     = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);

  // ─────────────────────────────────────────
  // Helpers
  // ─────────────────────────────────────────
  const err      = (msg) => { setError(msg); setLoading(false); };
  const clear    = ()    => { setError(''); setSuccess(''); };
  const switchView = (v) => { clear(); setView(v); setStep(1); setResetStep(1); };
  const toggleExam = (id) =>
    setSelectedExams(prev =>
      prev.includes(id) ? prev.filter(e => e !== id) : [...prev, id]
    );

  // ─────────────────────────────────────────
  // LOGIN
  // ─────────────────────────────────────────
  const handleLogin = async () => {
    clear();
    const validationError = validate({ email, password });
    if (validationError) return err(validationError);
    if (!navigator.onLine) return err('No internet connection. Please check your network and try again.');
    setLoading(true);
    try {
      const result = await loginProfile({ email: email.trim(), password });
      console.log('LOGIN RESULT:', result);
      if (!result.success) {
        return err(result.message || result.error || 'Invalid email or password.');
      }
      const u = result.profile;
      saveUser({
        name:          `${u.firstName} ${u.lastName}`,
        firstName:     u.firstName,
        lastName:      u.lastName,
        email:         u.email,
        studentType:   u.studentType,
        selectedExams: u.selectedExams || [],
        passwordHash:  u.passwordHash,
      });
      logSessionToSheet(`${u.firstName} ${u.lastName}`, u.email);
      onDone({
        name:               `${u.firstName} ${u.lastName}`,
        firstName:          u.firstName,
        lastName:           u.lastName,
        email:              u.email,
        studentType:        u.studentType,
        selectedExams:      u.selectedExams || [],
        serverStats:        u.stats,
        serverAchievements: u.achievements,
        serverSubjectPerf:  u.subjectPerformance,
        passwordHash:       u.passwordHash,
      });
    } catch (e) {
      console.error('LOGIN ERROR:', e);
      err(getNetworkError(e));
    }
  };

  // ─────────────────────────────────────────
  // SIGNUP STEP 1
  // ─────────────────────────────────────────
  const handleSignupStep1 = () => {
    clear();
    const validationError = validate({ firstName, lastName, email, password, confirm });
    if (validationError) return err(validationError);
    setStep(2);
  };

  // ─────────────────────────────────────────
  // SIGNUP STEP 2
  // ─────────────────────────────────────────
  const handleSignupStep2 = async () => {
    clear();
    const validationError = validate({ email, studentType, selectedExams });
    if (validationError) return err(validationError);
    if (!navigator.onLine) return err('No internet connection. Please check your network and try again.');
    setLoading(true);
    try {
      const result = await registerProfile({
        firstName, lastName,
        email: email.trim(),
        password, studentType, selectedExams,
      });
      console.log('REGISTER RESULT:', result);
      if (!result.success) {
        return err(result.message || result.error || 'Registration failed.');
      }
      const u = result.profile;
      saveUser({
        name:          `${u.firstName} ${u.lastName}`,
        firstName:     u.firstName,
        lastName:      u.lastName,
        email:         u.email,
        studentType:   u.studentType,
        selectedExams: u.selectedExams || [],
        passwordHash:  u.passwordHash,
      });
      logSessionToSheet(`${u.firstName} ${u.lastName}`, u.email);
      onDone({
        name:          `${u.firstName} ${u.lastName}`,
        firstName:     u.firstName,
        lastName:      u.lastName,
        email:         u.email,
        studentType:   u.studentType,
        selectedExams: u.selectedExams || [],
        isNew:         true,
        passwordHash:  u.passwordHash,
      });
    } catch (e) {
      console.error('REGISTER ERROR:', e);
      err(getNetworkError(e));
    }
  };

  // ─────────────────────────────────────────
  // FORGOT PASSWORD
  // ─────────────────────────────────────────
  const handleForgotRequest = async () => {
    clear();
    if (!resetEmail.trim()) return err('Enter your email address.');
    if (!navigator.onLine) return err('No internet connection. Please check your network and try again.');
    setLoading(true);
    try {
      const result = await requestPasswordReset(resetEmail.trim());
      console.log('FORGOT RESULT:', result);
      setLoading(false);
      if (!result.success) {
        return err(result.message || result.error || 'Email not found.');
      }
      setSuccess('A reset code has been sent to your email.');
      setResetStep(2);
    } catch (e) {
      console.error('FORGOT ERROR:', e);
      err(getNetworkError(e));
    }
  };

  // ─────────────────────────────────────────
  // RESET PASSWORD
  // ─────────────────────────────────────────
  const handleResetConfirm = async () => {
    clear();
    if (!resetCode.trim()) return err('Enter the reset code.');
    if (newPw.length < 8)  return err('New password must be at least 8 characters.');
    if (!navigator.onLine) return err('No internet connection. Please check your network and try again.');
    setLoading(true);
    try {
      const result = await confirmPasswordReset({
        email:       resetEmail.trim(),
        code:        resetCode.trim(),
        newPassword: newPw,
      });
      console.log('RESET RESULT:', result);
      setLoading(false);
      if (!result.success) {
        return err(result.message || result.error || 'Invalid or expired code.');
      }
      setSuccess('Password reset! You can now log in.');
      setResetStep(3);
      setTimeout(() => { switchView('login'); }, 2000);
    } catch (e) {
      console.error('RESET ERROR:', e);
      err(getNetworkError(e));
    }
  };

  // ─────────────────────────────────────────
  // FORGOT PASSWORD SCREEN
  // ─────────────────────────────────────────
  if (view === 'forgot') {
    return (
      <div className="auth-screen">
        <div className="auth-card">
          <img src={logo} alt="EliteScholars" className="auth-logo" />
          <h2 className="auth-title">Reset Password</h2>

          {resetStep === 1 && (
            <>
              <p className="auth-sub">
                Enter your registered email to receive a reset code.
              </p>
              <input className="auth-input" placeholder="Email address" type="email"
                value={resetEmail} onChange={e => setResetEmail(e.target.value)} />
              {error   && <div className="auth-error">{error}</div>}
              {success && <div className="auth-success">{success}</div>}
              <button className="auth-btn" onClick={handleForgotRequest} disabled={loading}>
                {loading ? 'Sending…' : 'Send Reset Code'}
              </button>
            </>
          )}

          {resetStep === 2 && (
            <>
              <p className="auth-sub">
                Enter the code from your email and your new password.
              </p>
              <input className="auth-input" placeholder="Reset code"
                value={resetCode} onChange={e => setResetCode(e.target.value)} />
              <input className="auth-input" placeholder="New password (min 8 chars)"
                type="password"
                value={newPw} onChange={e => setNewPw(e.target.value)} />
              {error   && <div className="auth-error">{error}</div>}
              {success && <div className="auth-success">{success}</div>}
              <button className="auth-btn" onClick={handleResetConfirm} disabled={loading}>
                {loading ? 'Resetting…' : 'Reset Password'}
              </button>
            </>
          )}

          {resetStep === 3 && (
            <div className="auth-success" style={{ textAlign: 'center', padding: 20 }}>
              ✓ {success}
            </div>
          )}

          <button className="auth-link-btn" onClick={() => switchView('login')}>
            ← Back to Login
          </button>
        </div>
      </div>
    );
  }

  // ─────────────────────────────────────────
  // SIGNUP SCREEN
  // ─────────────────────────────────────────
  if (view === 'signup') {
    return (
      <div className="auth-screen">
        <div className="auth-card">
          <img src={logo} alt="EliteScholars" className="auth-logo" />
          <div className="auth-steps">
            <div className={`auth-step-dot ${step >= 1 ? 'active' : ''}`} />
            <div className="auth-step-line" />
            <div className={`auth-step-dot ${step >= 2 ? 'active' : ''}`} />
          </div>

          {step === 1 && (
            <>
              <h2 className="auth-title">Create Account</h2>
              <p className="auth-sub">Join millions of Nigerian students preparing smarter.</p>
              <div className="auth-row">
                <input className="auth-input" placeholder="First name"
                  value={firstName} onChange={e => setFirstName(e.target.value)} maxLength={30} />
                <input className="auth-input" placeholder="Last name"
                  value={lastName} onChange={e => setLastName(e.target.value)} maxLength={30} />
              </div>
              <input className="auth-input" placeholder="Email address" type="email"
                value={email} onChange={e => setEmail(e.target.value)} />
              <div className="auth-pw-wrap">
                <input className="auth-input" placeholder="Password (min 8 characters)"
                  type={showPw ? 'text' : 'password'}
                  value={password} onChange={e => setPassword(e.target.value)} />
                <button className="auth-pw-toggle" onClick={() => setShowPw(p => !p)}>
                  {showPw ? '🙈' : '👁️'}
                </button>
              </div>
              <input className="auth-input" placeholder="Confirm password" type="password"
                value={confirm} onChange={e => setConfirm(e.target.value)} />
              {error && <div className="auth-error">{error}</div>}
              <button className="auth-btn" onClick={handleSignupStep1}>Continue →</button>
              <div className="auth-switch">
                Already have an account?{' '}
                <button className="auth-link-btn" onClick={() => switchView('login')}>
                  Log In
                </button>
              </div>
            </>
          )}

          {step === 2 && (
            <>
              <h2 className="auth-title">Your Study Profile</h2>
              <p className="auth-sub">This helps us show the right content for you.</p>
              <div className="auth-section-label">I am a:</div>
              <div className="auth-type-grid">
                {STUDENT_TYPES.map(t => (
                  <button key={t.id}
                    className={`auth-type-card ${studentType === t.id ? 'selected' : ''}`}
                    onClick={() => setStudentType(t.id)}
                  >
                    <span className="auth-type-icon">{t.icon}</span>
                    <span className="auth-type-label">{t.label}</span>
                    <span className="auth-type-desc">{t.desc}</span>
                  </button>
                ))}
              </div>
              <div className="auth-section-label" style={{ marginTop: 18 }}>
                I am preparing for:{' '}
                <span className="auth-required">(select all that apply)</span>
              </div>
              <div className="auth-exam-grid">
                {EXAM_TYPES.map(ex => (
                  <button key={ex.id}
                    className={`auth-exam-chip ${selectedExams.includes(ex.id) ? 'selected' : ''}`}
                    onClick={() => toggleExam(ex.id)}
                  >
                    <span>{ex.icon}</span> {ex.label}
                    {selectedExams.includes(ex.id) && (
                      <span className="auth-exam-check">✓</span>
                    )}
                  </button>
                ))}
              </div>
              {error && <div className="auth-error">{error}</div>}
              <div style={{ display: 'flex', gap: 10 }}>
                <button className="auth-btn auth-btn-outline" onClick={() => setStep(1)}>
                  ← Back
                </button>
                <button className="auth-btn" onClick={handleSignupStep2}
                  disabled={loading} style={{ flex: 1 }}>
                  {loading ? 'Creating account…' : 'Get Started'}
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    );
  }

  // ─────────────────────────────────────────
  // LOGIN SCREEN (default)
  // ─────────────────────────────────────────
  return (
    <div className="auth-screen">
      <div className="auth-card">
        <img src={logo} alt="EliteScholars" className="auth-logo" />
        <h2 className="auth-title">Welcome Back</h2>
        <p className="auth-sub">Log in to continue your streak and progress.</p>
        <input className="auth-input" placeholder="Email address" type="email"
          value={email} onChange={e => setEmail(e.target.value)} />
        <div className="auth-pw-wrap">
          <input className="auth-input" placeholder="Password"
            type={showPw ? 'text' : 'password'}
            value={password} onChange={e => setPassword(e.target.value)}
            onKeyDown={e => e.key === 'Enter' && handleLogin()} />
          <button className="auth-pw-toggle" onClick={() => setShowPw(p => !p)}>
            {showPw ? '🙈' : '👁️'}
          </button>
        </div>
        <button className="auth-forgot-btn" onClick={() => switchView('forgot')}>
          Forgot password?
        </button>
        {error && <div className="auth-error">{error}</div>}
        <button className="auth-btn" onClick={handleLogin} disabled={loading}>
          {loading ? 'Logging in…' : 'Log In →'}
        </button>
        <div className="auth-switch">
          New here?{' '}
          <button className="auth-link-btn" onClick={() => switchView('signup')}>
            Create an account
          </button>
        </div>
      </div>
    </div>
  );
}