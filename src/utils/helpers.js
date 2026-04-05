// ============================================================================
// HELPERS
// ============================================================================

export function sfl(arr) {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

export function stopSpeech() {
  if (window.speechSynthesis) window.speechSynthesis.cancel();
}

export function speak(text) {
  if (!window.speechSynthesis) return;
  window.speechSynthesis.cancel();
  const utter = new SpeechSynthesisUtterance(text);
  utter.rate = 0.95;
  utter.pitch = 1.0;
  utter.volume = 1;
  const trySpeak = () => {
    const voices = window.speechSynthesis.getVoices();
    const preferred = ['Google UK English Male', 'Microsoft David Desktop', 'Microsoft Mark Desktop', 'Daniel', 'Fred', 'Thomas', 'Arthur', 'Google US English', 'Alex'];
    const male = voices.find(v => preferred.some(p => v.name.includes(p))) || voices.find(v => v.name.toLowerCase().includes('male')) || null;
    if (male) utter.voice = male;
    window.speechSynthesis.speak(utter);
  };
  if (window.speechSynthesis.getVoices().length > 0) trySpeak();
  else window.speechSynthesis.onvoiceschanged = trySpeak;
  return utter;
}
