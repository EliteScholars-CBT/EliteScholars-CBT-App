// ============================================================================
// api/cron/guardian-reports.js — Weekly guardian report cards
// Runs every Sunday at 6AM WAT (5AM UTC)
// ============================================================================

import { sheetsGet } from '../_helpers/sheets.js';
import { Resend }    from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);
const FROM   = process.env.FROM_EMAIL;

// ── Date helpers ──────────────────────────────────────────────────────────────
function getWeekRange() {
  const now    = new Date();
  const sunday = new Date(now);
  sunday.setDate(now.getDate() - now.getDay());
  const monday = new Date(sunday);
  monday.setDate(sunday.getDate() - 6);

  const fmt = (d) => d.toLocaleDateString('en-GB', {
    day: 'numeric', month: 'long', year: 'numeric'
  });

  return { from: fmt(monday), to: fmt(sunday) };
}

function getGrade(avg) {
  if (avg >= 80) return { grade: 'A', label: 'Excellent',       color: '#28c840' };
  if (avg >= 65) return { grade: 'B', label: 'Good',            color: '#5eb4ff' };
  if (avg >= 50) return { grade: 'C', label: 'Average',         color: '#ffbd2e' };
  if (avg >= 40) return { grade: 'D', label: 'Below Average',   color: '#ff9500' };
  return              { grade: 'F', label: 'Needs Improvement', color: '#ff5f57' };
}

function formatSubjectName(key) {
  return key.replace(/_/g, ' ').replace(/\b\w/g, c => c.toUpperCase());
}

// ── Report card email ─────────────────────────────────────────────────────────
function buildReportEmail({
  wardName,
  stats,
  subjectPerformance,
  achievements,
  weekFrom,
  weekTo,
  plan,
}) {
  const sessions  = stats?.sessions  || 0;
  const streak    = stats?.streak    || 0;
  const allScores = stats?.allScores || [];

  const avg = allScores.length
    ? Math.round(
        allScores.slice(-7).reduce((a, b) => a + b, 0) /
        Math.min(allScores.length, 7)
      )
    : 0;

  const { grade, label, color } = getGrade(avg);

  const subjects = Object.entries(subjectPerformance || {})
    .filter(([, v]) => (v?.total || 0) > 0)
    .sort((a, b) => (b[1]?.total || 0) - (a[1]?.total || 0))
    .slice(0, 6);

  const recentAchievements = (achievements || []).slice(-3);

  // ── Build subject rows ────────────────────────────────────────────────────
  const subjectRows = subjects.map(([key, val]) => {
    const subjAvg   = Math.round(val.averageScore || 0);
    const subjGrade = getGrade(subjAvg);
    return (
      '<tr>' +
      '<td style="padding:10px 14px;border-bottom:1px solid #1e1e3a;color:#c8c8c8;font-size:13px;text-align:left;">' +
        formatSubjectName(key) +
      '</td>' +
      '<td style="padding:10px 14px;border-bottom:1px solid #1e1e3a;color:#9090b0;font-size:13px;text-align:center;">' +
        (val.total || 0) +
      '</td>' +
      '<td style="padding:10px 14px;border-bottom:1px solid #1e1e3a;color:#9090b0;font-size:13px;text-align:center;">' +
        (val.bestScore || 0) + '%' +
      '</td>' +
      '<td style="padding:10px 14px;border-bottom:1px solid #1e1e3a;color:#9090b0;font-size:13px;text-align:center;">' +
        subjAvg + '%' +
      '</td>' +
      '<td style="padding:10px 14px;border-bottom:1px solid #1e1e3a;text-align:center;">' +
        '<span style="color:' + subjGrade.color + ';font-weight:700;font-size:13px;">' +
          subjGrade.grade +
        '</span>' +
      '</td>' +
      '</tr>'
    );
  }).join('');

  // ── Build achievement badges ───────────────────────────────────────────────
  const achievementBadges = recentAchievements.length > 0
    ? recentAchievements.map(a =>
        '<span style="display:inline-block;background:rgba(212,175,55,0.15);' +
        'border:1px solid rgba(212,175,55,0.3);border-radius:20px;padding:4px 12px;' +
        'margin:3px;font-size:11px;color:#D4AF37;">' +
          (a?.icon || '🏆') + ' ' + (a?.name || a?.id || 'Achievement') +
        '</span>'
      ).join('')
    : '<span style="color:#5a5a7a;font-size:12px;">No new achievements this week</span>';

  // ── Extract conditionals before template string ───────────────────────────
  const subjectTableBlock = subjects.length > 0
    ? '<tr><td style="padding:0 32px 24px;">' +
        '<div style="font-size:12px;font-weight:700;color:#9090b0;letter-spacing:1px;' +
        'text-transform:uppercase;margin-bottom:12px;">📚 Subject Performance</div>' +
        '<div style="background:#0f0f1a;border-radius:10px;overflow:hidden;border:1px solid #2a2a4a;">' +
          '<table width="100%" cellpadding="0" cellspacing="0">' +
            '<tr style="background:#111130;">' +
              '<th style="padding:10px 14px;color:#5a5a7a;font-size:10px;letter-spacing:1px;text-transform:uppercase;text-align:left;font-weight:600;">Subject</th>' +
              '<th style="padding:10px 14px;color:#5a5a7a;font-size:10px;letter-spacing:1px;text-transform:uppercase;text-align:center;font-weight:600;">Sessions</th>' +
              '<th style="padding:10px 14px;color:#5a5a7a;font-size:10px;letter-spacing:1px;text-transform:uppercase;text-align:center;font-weight:600;">Best</th>' +
              '<th style="padding:10px 14px;color:#5a5a7a;font-size:10px;letter-spacing:1px;text-transform:uppercase;text-align:center;font-weight:600;">Avg</th>' +
              '<th style="padding:10px 14px;color:#5a5a7a;font-size:10px;letter-spacing:1px;text-transform:uppercase;text-align:center;font-weight:600;">Grade</th>' +
            '</tr>' +
            subjectRows +
          '</table>' +
        '</div>' +
      '</td></tr>'
    : '';

  const progressNote = avg >= 70
    ? wardName + ' is performing excellently this week. Their consistent effort and dedication is showing great results. Keep encouraging them!'
    : avg >= 50
    ? wardName + ' is making steady progress. With continued practice and focus, we expect to see significant improvement in the coming weeks.'
    : wardName + ' needs more practice sessions this week. We encourage you to remind them to study daily — even 15 minutes makes a difference.';

  const planLabel   = plan || 'Premium';
  const borderColor = color + '44';

  // ── HTML email ────────────────────────────────────────────────────────────
  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8"/>
  <meta name="viewport" content="width=device-width,initial-scale=1.0"/>
  <title>Weekly Report</title>
</head>
<body style="margin:0;padding:0;background:#0f0f1a;font-family:'Segoe UI',Arial,sans-serif;">
<table width="100%" cellpadding="0" cellspacing="0" style="background:#0f0f1a;padding:32px 16px;">
  <tr><td align="center">
    <table width="100%" style="max-width:580px;background:#1a1a2e;border-radius:16px;overflow:hidden;border:1px solid #2a2a4a;">

      <!-- HEADER -->
      <tr>
        <td style="background:linear-gradient(135deg,#4B0082,#7B2FBE,#4B0082);padding:28px 32px;text-align:center;">
          <div style="font-size:13px;color:rgba(255,255,255,0.6);letter-spacing:2px;text-transform:uppercase;margin-bottom:6px;">
            EliteScholars · Weekly Report
          </div>
          <h1 style="margin:0;color:#fff;font-size:22px;font-weight:700;">
            📊 Academic Progress Report
          </h1>
          <p style="margin:8px 0 0;color:rgba(255,255,255,0.7);font-size:13px;">
            ${weekFrom} — ${weekTo}
          </p>
        </td>
      </tr>

      <!-- GREETING -->
      <tr>
        <td style="padding:28px 32px 0;">
          <p style="margin:0 0 6px;color:#c8c8c8;font-size:14px;line-height:1.7;">Dear Guardian,</p>
          <p style="margin:0 0 24px;color:#9090b0;font-size:14px;line-height:1.7;">
            Here is a detailed report of <strong style="color:#c8b4f0;">${wardName}</strong>'s
            study activity on EliteScholars this week. This report covers Monday through Saturday.
          </p>
        </td>
      </tr>

      <!-- OVERALL GRADE -->
      <tr>
        <td style="padding:0 32px 24px;">
          <div style="background:#0f0f1a;border:2px solid ${borderColor};border-radius:14px;padding:20px;text-align:center;">
            <div style="font-size:11px;color:#5a5a7a;letter-spacing:2px;text-transform:uppercase;margin-bottom:8px;">
              Overall Weekly Grade
            </div>
            <div style="font-size:64px;font-weight:900;color:${color};line-height:1;margin-bottom:6px;">
              ${grade}
            </div>
            <div style="font-size:14px;color:${color};font-weight:600;">${label}</div>
            <div style="font-size:12px;color:#5a5a7a;margin-top:4px;">
              Based on average score of ${avg}% this week
            </div>
          </div>
        </td>
      </tr>

      <!-- STATS ROW -->
      <tr>
        <td style="padding:0 32px 24px;">
          <table width="100%" cellpadding="0" cellspacing="0">
            <tr>
              <td style="width:33%;text-align:center;background:#0f0f1a;border-radius:10px;padding:16px 8px;border:1px solid #2a2a4a;">
                <div style="font-size:28px;font-weight:900;color:#c8b4f0;">${sessions}</div>
                <div style="font-size:10px;color:#5a5a7a;text-transform:uppercase;letter-spacing:1px;margin-top:4px;">Sessions</div>
              </td>
              <td style="width:4%;"></td>
              <td style="width:33%;text-align:center;background:#0f0f1a;border-radius:10px;padding:16px 8px;border:1px solid #2a2a4a;">
                <div style="font-size:28px;font-weight:900;color:#ffbd2e;">${streak}</div>
                <div style="font-size:10px;color:#5a5a7a;text-transform:uppercase;letter-spacing:1px;margin-top:4px;">Day Streak 🔥</div>
              </td>
              <td style="width:4%;"></td>
              <td style="width:33%;text-align:center;background:#0f0f1a;border-radius:10px;padding:16px 8px;border:1px solid #2a2a4a;">
                <div style="font-size:28px;font-weight:900;color:#28c840;">${avg}%</div>
                <div style="font-size:10px;color:#5a5a7a;text-transform:uppercase;letter-spacing:1px;margin-top:4px;">Avg Score</div>
              </td>
            </tr>
          </table>
        </td>
      </tr>

      <!-- SUBJECT TABLE -->
      ${subjectTableBlock}

      <!-- ACHIEVEMENTS -->
      <tr>
        <td style="padding:0 32px 24px;">
          <div style="font-size:12px;font-weight:700;color:#9090b0;letter-spacing:1px;text-transform:uppercase;margin-bottom:12px;">
            🏆 Recent Achievements
          </div>
          <div style="background:#0f0f1a;border-radius:10px;padding:16px;border:1px solid #2a2a4a;">
            ${achievementBadges}
          </div>
        </td>
      </tr>

      <!-- PROGRESS NOTE -->
      <tr>
        <td style="padding:0 32px 28px;">
          <div style="background:rgba(75,0,130,0.2);border:1px solid rgba(75,0,130,0.4);border-radius:10px;padding:16px 20px;">
            <div style="font-size:12px;font-weight:700;color:#c8b4f0;margin-bottom:8px;">📝 Progress Note</div>
            <p style="margin:0;color:#9090b0;font-size:13px;line-height:1.7;">${progressNote}</p>
          </div>
        </td>
      </tr>

      <!-- DIVIDER -->
      <tr>
        <td style="padding:0 32px 24px;">
          <div style="border-top:1px solid #2a2a4a;"></div>
        </td>
      </tr>

      <!-- FOOTER NOTE -->
      <tr>
        <td style="padding:0 32px 28px;">
          <p style="margin:0;color:#5a5a7a;font-size:11px;line-height:1.7;">
            This report is generated automatically every Sunday for
            <strong style="color:#9090b0;">${wardName}</strong>'s
            EliteScholars <strong style="color:#9090b0;">${planLabel}</strong> account.
            To update or remove your guardian email, ${wardName} can do so in their Profile Settings.
          </p>
        </td>
      </tr>

      <!-- FOOTER -->
      <tr>
        <td style="background:#13132a;padding:20px 32px;text-align:center;border-top:1px solid #2a2a4a;">
          <p style="margin:0 0 4px;color:#5a5a7a;font-size:11px;">© 2026 EliteScholars · Built for Nigerian Students</p>
          <p style="margin:0;color:#3a3a5a;font-size:10px;">JAMB · WAEC · NECO · POST UTME · GST</p>
        </td>
      </tr>

    </table>
  </td></tr>
</table>
</body>
</html>`;
}

// ── Main handler ──────────────────────────────────────────────────────────────
export default async function handler(req, res) {
  const authHeader = req.headers['authorization'];
  if (authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  const { from: weekFrom, to: weekTo } = getWeekRange();

  try {
    const result = await sheetsGet({ action: 'getUsersWithGuardians' });

    if (!result?.success) {
      return res.status(500).json({ error: 'Failed to fetch users with guardians' });
    }

    const users = result.users || [];
    const sent  = { success: 0, errors: 0 };

    for (const user of users) {
      if (!user.guardianEmail || !user.email) continue;

      const wardName = (user.firstName + ' ' + user.lastName).trim() || 'Your Ward';

      try {
        await resend.emails.send({
          from:    'EliteScholars <' + FROM + '>',
          to:      user.guardianEmail,
          subject: '📊 ' + wardName + "'s Weekly Study Report — EliteScholars",
          html:    buildReportEmail({
            wardName,
            stats:              user.stats,
            subjectPerformance: user.subjectPerformance,
            achievements:       user.achievements,
            weekFrom,
            weekTo,
            plan:               user.plan,
          }),
        });
        sent.success++;
        console.log('Report sent for:', user.email, '→', user.guardianEmail);
      } catch (err) {
        console.error('Failed to send report for:', user.email, err.message);
        sent.errors++;
      }
    }

    return res.status(200).json({
      success: true,
      total:   users.length,
      sent,
      week:    weekFrom + ' — ' + weekTo,
    });

  } catch (err) {
    console.error('Guardian reports cron crash:', err.message);
    return res.status(500).json({ error: err.message });
  }
}