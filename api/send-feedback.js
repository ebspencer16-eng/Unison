/**
 * Vercel Serverless Function: /api/send-feedback
 *
 * Receives feedback from:
 *   1. Footer "Love it / Pretty good / Suggest something" buttons (all pages)
 *   2. End-of-experience questionnaire in the app (App.jsx)
 *
 * Sends a formatted email to SUPPORT_EMAIL with all context.
 * Non-PII demographic data (package type, completion state, etc.) is attached.
 *
 * Required env vars:
 *   RESEND_API_KEY
 *   FROM_EMAIL       — e.g. hello@attune.com
 *   SUPPORT_EMAIL    — where feedback lands, e.g. hello@attune.com
 */

export const config = { runtime: 'edge' };

export default async function handler(req) {
  if (req.method !== 'POST') {
    return new Response('Method not allowed', { status: 405 });
  }

  let body;
  try { body = await req.json(); }
  catch { return new Response('Invalid JSON', { status: 400 }); }

  const {
    source,       // 'footer_quick' | 'app_experience'
    rating,       // 0-3 for quick, 0-3 emoji for app
    message,      // free-text (suggestion or open answer)
    // Demographic context (non-PII)
    pkgType,      // 'core' | 'newlywed' | 'anniversary' | 'premium'
    exercisesComplete, // number 0-3
    alignmentLevel,    // 'high' | 'medium' | 'low' | null
    stage,        // relationship stage from questionnaire
    howHeard,     // acquisition source
    questionAnswers, // full questionnaire answers object (app_experience)
  } = body;

  const apiKey = process.env.RESEND_API_KEY;
  const toEmail = process.env.SUPPORT_EMAIL || process.env.FROM_EMAIL || 'hello@attune.com';
  const fromEmail = process.env.FROM_EMAIL || 'hello@attune.com';

  if (!apiKey) {
    // Graceful fallback — log and return OK so UX isn't broken
    console.log('Feedback (no email service):', body);
    return new Response(JSON.stringify({ ok: true }), { status: 200 });
  }

  const ratingLabels = ['Not great 😕', 'It was okay 😐', 'Pretty good 🙂', 'Loved it 😍'];
  const ratingLabel = typeof rating === 'number' ? (ratingLabels[rating] || 'N/A') : rating || 'N/A';

  const subject = source === 'footer_quick'
    ? `Attune quick feedback: ${ratingLabel}`
    : `Attune experience feedback: ${ratingLabel}${pkgType ? ` · ${pkgType}` : ''}`;

  const contextRows = [
    pkgType           && `<tr><td>Package</td><td>${pkgType}</td></tr>`,
    exercisesComplete !== undefined && `<tr><td>Exercises complete</td><td>${exercisesComplete} of 3</td></tr>`,
    alignmentLevel    && `<tr><td>Alignment level</td><td>${alignmentLevel}</td></tr>`,
    stage             && `<tr><td>Relationship stage</td><td>${stage}</td></tr>`,
    howHeard          && `<tr><td>How they heard</td><td>${howHeard}</td></tr>`,
  ].filter(Boolean).join('');

  const qRows = questionAnswers
    ? Object.entries(questionAnswers).map(([k,v]) => `<tr><td>${k}</td><td>${v}</td></tr>`).join('')
    : '';

  const html = `<!DOCTYPE html><html><body style="font-family:Arial,sans-serif;max-width:600px;margin:0 auto;padding:1.5rem;color:#1E1610">
    <h2 style="color:#E8673A;margin-bottom:1rem">Attune Feedback</h2>
    <table style="border-collapse:collapse;width:100%;margin-bottom:1.5rem">
      <tr style="background:#FBF8F3"><td style="padding:.6rem .85rem;border:1px solid #E8DDD0;font-weight:700;width:160px">Source</td><td style="padding:.6rem .85rem;border:1px solid #E8DDD0">${source}</td></tr>
      <tr><td style="padding:.6rem .85rem;border:1px solid #E8DDD0;font-weight:700">Rating</td><td style="padding:.6rem .85rem;border:1px solid #E8DDD0">${ratingLabel}</td></tr>
      ${message ? `<tr style="background:#FBF8F3"><td style="padding:.6rem .85rem;border:1px solid #E8DDD0;font-weight:700">Message</td><td style="padding:.6rem .85rem;border:1px solid #E8DDD0">${message}</td></tr>` : ''}
    </table>
    ${contextRows ? `<h3 style="color:#8C7A68;font-size:.85rem;letter-spacing:.1em;text-transform:uppercase;margin-bottom:.75rem">Context</h3>
    <table style="border-collapse:collapse;width:100%;margin-bottom:1.5rem">
      ${contextRows.replace(/<tr>/g,'<tr style="background:#FBF8F3">').replace(/<\/tr><tr style/g,'</tr><tr style="background:white"><td').replace(/<td>/g,'<td style="padding:.6rem .85rem;border:1px solid #E8DDD0">')}
    </table>` : ''}
    ${qRows ? `<h3 style="color:#8C7A68;font-size:.85rem;letter-spacing:.1em;text-transform:uppercase;margin-bottom:.75rem">Full questionnaire</h3>
    <table style="border-collapse:collapse;width:100%">${qRows.replace(/<tr>/g,'<tr>').replace(/<td>/g,'<td style="padding:.6rem .85rem;border:1px solid #E8DDD0">')}</table>` : ''}
    <p style="color:#C17F47;font-size:.75rem;margin-top:1.5rem">Submitted at ${new Date().toISOString()}</p>
  </body></html>`;

  try {
    const res = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: { 'Authorization': `Bearer ${apiKey}`, 'Content-Type': 'application/json' },
      body: JSON.stringify({ from: `Attune Feedback <${fromEmail}>`, to: [toEmail], subject, html }),
    });
    const data = await res.json();
    if (!res.ok) throw new Error(JSON.stringify(data));
  } catch (err) {
    console.error('Feedback email failed:', err);
    return new Response(JSON.stringify({ ok: false, error: String(err) }), { status: 500 });
  }

  return new Response(JSON.stringify({ ok: true }), {
    status: 200,
    headers: { 'Content-Type': 'application/json' },
  });
}
