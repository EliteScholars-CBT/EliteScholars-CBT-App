// ============================================================================
// AuthScreen.js
// ============================================================================

import React, { useState, useEffect } from 'react';
import logo from '../assets/elite-scholars-logo.png';

import {
  registerProfile,
  loginProfile,
  requestPasswordReset,
  confirmPasswordReset,
} from '../utils/profileApi';

import { logSessionToSheet } from '../utils/auth';
import { saveUser } from '../utils/storage';
// import { addLog } from "../utils/debugStore";

const EXAM_TYPES = [
  { id: 'jamb',     label: 'JAMB UTME', icon: '📝' },
  { id: 'waec',     label: 'WAEC',      icon: '📋' },
  { id: 'neco',     label: 'NECO',      icon: '📄' },
  { id: 'postutme', label: 'POST UTME', icon: '🎓' },
  { id: 'gst',      label: 'GST (Uni)', icon: '🏛️' },
];

const STUDENT_TYPES = [
  {
    id: 'senior_school',
    label: 'Senior School Student',
    desc: 'SS1 – SS3 • WAEC • NECO • GCE',
    icon: '🏫'
  },
  {
    id: 'aspirant',
    label: 'Aspirant',
    desc: 'Preparing for JAMB & Post-UTME',
    icon: '🎯'
  },
  {
    id: 'university',
    label: 'University Student',
    desc: '100L – 500L • GST / GNS Courses',
    icon: '🎓'
  },
];

function validate(fields) {
  if (
    fields.firstName !== undefined &&
    !fields.firstName.trim()
  ) {
    return 'Enter your first name.';
  }

  if (
    fields.lastName !== undefined &&
    !fields.lastName.trim()
  ) {
    return 'Enter your last name.';
  }

  if (
    !fields.email.trim() ||
    !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(fields.email)
  ) {
    return 'Enter a valid email address.';
  }

  if (
    fields.password !== undefined &&
    fields.password.length < 8
  ) {
    return 'Password must be at least 8 characters.';
  }

  if (
    fields.confirm !== undefined &&
    fields.password !== fields.confirm
  ) {
    return 'Passwords do not match.';
  }

  if (
    fields.studentType !== undefined &&
    !fields.studentType
  ) {
    return 'Select your student type.';
  }

  if (
    fields.selectedExams !== undefined &&
    fields.selectedExams.length === 0
  ) {
    return 'Select at least one exam.';
  }

  return null;
}


useEffect(()=> {

alert('Hi, it is AuthScreen here')

}, [])



export default function AuthScreen({ onDone }) {

  // ─────────────────────────────────────────
  // Views
  // ─────────────────────────────────────────

  const [view, setView] = useState('login');
  const [step, setStep] = useState(1);
  const [resetStep, setResetStep] = useState(1);

  // ─────────────────────────────────────────
  // Signup/Login fields
  // ─────────────────────────────────────────

  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirm, setConfirm] = useState('');

  const [showPw, setShowPw] = useState(false);

  const [studentType, setStudentType] = useState('');
  const [selectedExams, setSelectedExams] = useState([]);

  // ─────────────────────────────────────────
  // Reset Password
  // ─────────────────────────────────────────

  const [resetEmail, setResetEmail] = useState('');
  const [resetCode, setResetCode] = useState('');
  const [newPw, setNewPw] = useState('');

  // ─────────────────────────────────────────
  // UI
  // ─────────────────────────────────────────

  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);

  const err = (msg) => {
    setError(msg);
    setLoading(false);
  };

  const clear = () => {
    setError('');
    setSuccess('');
  };

  const switchView = (v) => {
    clear();
    setView(v);
    setStep(1);
    setResetStep(1);
  };

  const toggleExam = (id) => {
    setSelectedExams(prev =>
      prev.includes(id)
        ? prev.filter(e => e !== id)
        : [...prev, id]
    );
  };


  // ─────────────────────────────────────────
  // LOGIN
  // ─────────────────────────────────────────

  const handleLogin = async () => {

    clear();

    const validationError = validate({
      email,
      password
    });

    if (validationError) {
      return err(validationError);
    }

    setLoading(true);

    try {

      const result = await loginProfile({
        email: email.trim(),
        password
      });

      console.log('LOGIN RESULT:', result);

      if (!result.success) {
        return err(
          result.message ||
          result.error ||
          'Invalid email or password.'
        );
      }

      const u = result.profile;

      saveUser({
        name: `${u.firstName} ${u.lastName}`,
        firstName: u.firstName,
        lastName: u.lastName,
        email: u.email,
        studentType: u.studentType,
        selectedExams: u.selectedExams || [],
        passwordHash: u.passwordHash,
      });

      logSessionToSheet(
        `${u.firstName} ${u.lastName}`,
        u.email
      );

      onDone({
        name: `${u.firstName} ${u.lastName}`,
        firstName: u.firstName,
        lastName: u.lastName,
        email: u.email,
        studentType: u.studentType,
        selectedExams: u.selectedExams || [],
        serverStats: u.stats,
        serverAchievements: u.achievements,
        serverSubjectPerf: u.subjectPerformance,
        passwordHash: u.passwordHash
      });

    } catch (e) {

      console.error('LOGIN ERROR:', e);

      err(
        e?.message ||
        'Network error. Please check your connection.'
      );
    }
  };

  // ─────────────────────────────────────────
  // SIGNUP STEP 1
  // ─────────────────────────────────────────

  const handleSignupStep1 = () => {

    clear();

    const validationError = validate({
      firstName,
      lastName,
      email,
      password,
      confirm
    });

    if (validationError) {
      return err(validationError);
    }

    setStep(2);
  };

  // ─────────────────────────────────────────
  // SIGNUP STEP 2
  // ─────────────────────────────────────────

  const handleSignupStep2 = async () => {

    clear();

    const validationError = validate({
      email,
      studentType,
      selectedExams
    });

    if (validationError) {
      return err(validationError);
    }

    setLoading(true);

    try {

      const result = await registerProfile({
        firstName,
        lastName,
        email: email.trim(),
        password,
        studentType,
        selectedExams,
      });

      console.log('REGISTER RESULT:', result);

      if (!result.success) {
        return err(
          result.message ||
          result.error ||
          'Registration failed.'
        );
      }

      const u = result.profile;

      saveUser({
        name: `${u.firstName} ${u.lastName}`,
        firstName: u.firstName,
        lastName: u.lastName,
        email: u.email,
        studentType: u.studentType,
        selectedExams: u.selectedExams || [],
        passwordHash: u.passwordHash,
      });

      logSessionToSheet(
        `${u.firstName} ${u.lastName}`,
        u.email
      );

      onDone({
        name: `${u.firstName} ${u.lastName}`,
        firstName: u.firstName,
        lastName: u.lastName,
        email: u.email,
        studentType: u.studentType,
        selectedExams: u.selectedExams || [],
        isNew: true,
        passwordHash: u.passwordHash
      });

    } catch (e) {

      console.error('REGISTER ERROR:', e);

      err(
        e?.message ||
        'Network error. Please check your connection.'
      );
    }
  };

  // ─────────────────────────────────────────
  // FORGOT PASSWORD
  // ─────────────────────────────────────────

  const handleForgotRequest = async () => {

    clear();

    if (!resetEmail.trim()) {
      return err('Enter your email address.');
    }

    setLoading(true);

    try {

      const result = await requestPasswordReset(
        resetEmail.trim()
      );

      console.log('FORGOT RESULT:', result);

      setLoading(false);

      if (!result.success) {
        return err(
          result.message ||
          result.error ||
          'Email not found.'
        );
      }

      setSuccess(
        'A reset code has been sent to your email.'
      );

      setResetStep(2);

    } catch (e) {

      console.error('FORGOT ERROR:', e);

      err(
        e?.message ||
        'Network error. Please try again.'
      );
    }
  };

  // ─────────────────────────────────────────
  // RESET PASSWORD
  // ─────────────────────────────────────────

  const handleResetConfirm = async () => {

    clear();

    if (!resetCode.trim()) {
      return err('Enter the reset code.');
    }

    if (newPw.length < 8) {
      return err(
        'New password must be at least 8 characters.'
      );
    }

    setLoading(true);

    try {

      const result = await confirmPasswordReset({
        email: resetEmail.trim(),
        code: resetCode.trim(),
        newPassword: newPw
      });

      console.log('RESET RESULT:', result);

      setLoading(false);

      if (!result.success) {
        return err(
          result.message ||
          result.error ||
          'Invalid or expired code.'
        );
      }

      setSuccess(
        'Password reset! You can now log in.'
      );

      setResetStep(3);

      setTimeout(() => {
        switchView('login');
      }, 2000);

    } catch (e) {

      console.error('RESET ERROR:', e);

      err(
        e?.message ||
        'Network error. Please try again.'
      );
    }
  };
}