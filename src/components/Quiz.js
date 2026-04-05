import React, { useState, useEffect, useRef } from 'react';
import { QB } from '../QB';
import { SUBJ } from '../data/subjects';
import { ROUND_SIZE, getTimerSecs, SHOW_ADS } from '../utils/constants';
import { DPURP, PURPLE, BG, LGRAY, WHITE, GRAY, LGOLD, GREEN, LGREEN, RED, LRED } from '../utils/colors';
import { SFX, speak, stopSpeech } from '../utils/sounds';
import { sfl } from '../utils/helpers';

export default function Quiz({ subjectId, onAllDone, score, setScore, correct, setCorrect, totalQ, setTotalQ, onHome, triggerAdRefresh }) {
  const [shuffled] = useState(() => sfl(QB[subjectId] || QB.economics));
  const [qi, setQi] = useState(0);
  const [sel, setSel] = useState(-1);
  const [done, setDone] = useState(false);
  const [modal, setModal] = useState(false);
  const [timeLeft, setTL] = useState(() => getTimerSecs(subjectId, ROUND_SIZE));
  const [usedF, setUF] = useState(false);
  const [usedH, setUH] = useState(false);
  const [hidden, setHid] = useState([]);
  const [showHint, setSHint] = useState(false);
  const [voiceEnabled, setVoiceEnabled] = useState(true);
  const [speaking, setSpeaking] = useState(false);
  const [ansAnim, setAnsAnim] = useState('');
  const timerRef = useRef(null);
  const bodyRef = useRef(null);
  const utterRef = useRef(null);
  const roundSecs = getTimerSecs(subjectId, ROUND_SIZE);

  const q = shuffled[qi];
  const isLastQ = qi >= shuffled.length - 1;
  const isRoundEnd = (qi + 1) % ROUND_SIZE === 0;
  const isLast = isLastQ || isRoundEnd;
  const roundNum = Math.floor(qi / ROUND_SIZE);
  const meta = SUBJ[subjectId] || SUBJ.economics;

  useEffect(() => {
    if (!q || !voiceEnabled) return;
    const txt = q.q + '. Options: ' + q.o.map((opt, i) => ['A', 'B', 'C', 'D'][i] + '. ' + opt).join('. ');
    stopSpeech();
    const u = speak(txt);
    if (u) { utterRef.current = u; setSpeaking(true); u.onend = () => setSpeaking(false); }
  }, [qi, voiceEnabled, q]);

  useEffect(() => {
    setTL(roundSecs);
    if (
