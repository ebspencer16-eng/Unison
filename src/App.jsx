import { useState } from "react";


const C = {
  cream: "#FFFDF9", warm: "#FBF8F3", stone: "#E8DDD0",
  clay: "#C17F47", bark: "#7C4D28", deep: "#14100A",
  text: "#1E1610", muted: "#8C7A68", accent: "#C17F47",
  ink: "#0E0B07",
  // Dimension accent palette -- used on exercise cards
  dAccent: ["#E8673A","#1B5FE8","#2AB07F","#E040A0","#F5A623","#9B5DE5","#00B4CC","#E8503A"],
};
const font = { display: "'Playfair Display', Georgia, serif", body: "'DM Sans', system-ui, sans-serif" };
const FONT_LINK = "https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,600;0,700;1,400;1,600&family=DM+Sans:wght@300;400;500;600;700&display=swap";

// -- 8-DIMENSION PERSONALITY QUESTIONS (5 each = 40 total) --
const DIM_META = {
  energy:         { label: "Energy Style",           emoji: "", ends: ["Inward","Outward"],           color: "#2196F3", bg: "#E8F4FD", dark: "#0D47A1" },
  decision:       { label: "How You Decide",         emoji: "", ends: ["Logic-led","Feeling-led"],    color: "#FF9800", bg: "#FFF3E0", dark: "#E65100" },
  conflict:       { label: "Conflict Style",         emoji: "", ends: ["Resolve now","Process first"], color: "#E91E63", bg: "#FCE4EC", dark: "#880E4F" },
  affection:      { label: "Feeling Loved",          emoji: "", ends: ["Words","Actions"],             color: "#9C27B0", bg: "#F3E5F5", dark: "#4A148C" },
  planning:       { label: "Planning Style",         emoji: "", ends: ["Structure","Flexibility"],    color: "#4CAF50", bg: "#E8F5E9", dark: "#1B5E20" },
  expressiveness: { label: "Expressiveness",         emoji: "", ends: ["Reserved","Open"],             color: "#00BCD4", bg: "#E0F7FA", dark: "#006064" },
  togetherness:   { label: "Togetherness",           emoji: "", ends: ["Independent","Together"],     color: "#FF5722", bg: "#FBE9E7", dark: "#BF360C" },
  change:         { label: "Handling Change",        emoji: "", ends: ["Steady","Adaptable"],          color: "#5C6BC0", bg: "#E8EAF6", dark: "#1A237E" },
};

const DIMS = ["energy","decision","conflict","affection","planning","expressiveness","togetherness","change"];

// Gap -> label system (playful/warm/direct mix by degree)
// Dimension-aware label pool -- each dimension has its own voice

// -- Results font constants --
const RFONT = "'Syne', sans-serif";
const BFONT = "'DM Sans', sans-serif";
const HFONT = "'Playfair Display', Georgia, serif";
const FONT_URL = "https://fonts.googleapis.com/css2?family=Syne:wght@700;800;900&family=Playfair+Display:wght@700;900&family=DM+Sans:wght@300;400;500;600&display=swap";


const PERSONALITY_QUESTIONS = [
  // ENERGY
  { id:"e1", dimension:"energy", text:"After a long week, your ideal way to reset is:", a:"Quiet time alone. You need space to decompress before you feel like yourself again.", b:"Being around people you love. Connection is what recharges you." },
  { id:"e2", dimension:"energy", text:"When you're working through something difficult, you tend to:", a:"Think it through privately first, then share once you've processed.", b:"Talk it out. Saying it out loud is how you figure out what you actually think." },
  { id:"e3", dimension:"energy", text:"In social situations, you:", a:"Enjoy them but feel drained afterward and need recovery time.", b:"Feel energized. More people usually means more fun for you." },
  { id:"e4", dimension:"energy", text:"When you need time to yourself, your partner not understanding that feels:", a:"Really important to address. Alone time is non-negotiable for you.", b:"A little puzzling. You'd rather just be together anyway." },
  { id:"e5", dimension:"energy", text:"Your ideal Saturday with no obligations:", a:"A slow, quiet day: reading, a walk, minimal social contact.", b:"Packed with people, activities, and things happening." },

  // DECISION
  { id:"d1", dimension:"decision", text:"When making an important decision, you primarily rely on:", a:"Logic, data, and what makes objective sense. Feelings can cloud judgment.", b:"How it feels, and what it means to the people involved." },
  { id:"d2", dimension:"decision", text:"When your partner is upset, your first instinct is to:", a:"Help solve the problem. Identify what went wrong and how to fix it.", b:"Sit with them in it first. Make them feel heard before anything else." },
  { id:"d3", dimension:"decision", text:"You believe good decisions are mostly:", a:"Rational. The best choice is the one that makes the most sense on paper.", b:"Intuitive. You trust your gut even without all the facts." },
  { id:"d4", dimension:"decision", text:"When someone shares a problem with you, they probably want:", a:"Honest analysis and a clear path forward. That's what you'd want too.", b:"To feel understood first. Solutions can come later." },
  { id:"d5", dimension:"decision", text:"After a big decision, you feel best when:", a:"You've reviewed all the information and can defend the choice logically.", b:"It just feels right. You trust your instincts over the spreadsheet." },

  // CONFLICT
  { id:"c1", dimension:"conflict", text:"When something feels off between you and your partner, you prefer to:", a:"Address it as soon as possible. Unresolved things sit heavily with you.", b:"Take time to cool down before talking. You need space to process first." },
  { id:"c2", dimension:"conflict", text:"When you're frustrated, you're more likely to:", a:"Bring it up directly, even if the timing isn't perfect.", b:"Wait until you feel calm and ready before saying anything." },
  { id:"c3", dimension:"conflict", text:"After a disagreement, you feel better when:", a:"Things are talked through and fully resolved. You can't move on otherwise.", b:"You've had some space and time. Resolution comes more naturally after that." },
  { id:"c4", dimension:"conflict", text:"When your partner needs space during a conflict, your instinct is:", a:"Concern. Silence feels like things are getting worse, not better.", b:"Relief. Space is exactly what you'd want too." },
  { id:"c5", dimension:"conflict", text:"When something between you and your partner goes unaddressed, it feels like:", a:"Something unfinished. It stays with you until it's resolved.", b:"Something that usually resolves itself given enough time and distance." },

  // AFFECTION
  { id:"a1", dimension:"affection", text:"You feel most appreciated by your partner when they:", a:"Say it out loud. Verbal affirmation means a lot to you.", b:"Show it. Actions, quality time, and physical closeness speak louder than words." },
  { id:"a2", dimension:"affection", text:"Your instinct when someone you love is struggling is to:", a:"Tell them how much they mean to you and offer encouragement.", b:"Do something for them. Show up, help out, be physically present." },
  { id:"a3", dimension:"affection", text:"A perfect evening with your partner looks like:", a:"Meaningful conversation. You want to feel close through words and real connection.", b:"Doing something together. An activity, a walk, or just being in the same space." },
  { id:"a4", dimension:"affection", text:"When you haven't felt connected to your partner lately, you tend to:", a:"Tell them directly that you've been missing closeness.", b:"Suggest something to do together. Proximity usually takes care of the rest." },
  { id:"a5", dimension:"affection", text:"The most romantic gestures, to you, are:", a:"Thoughtful words. A letter, a message, something said out loud.", b:"Thoughtful acts. Something planned, prepared, or done without being asked." },

  // PLANNING
  { id:"p1", dimension:"planning", text:"When it comes to the future, you feel most at ease when:", a:"You have a clear plan. Knowing what's coming helps you feel grounded.", b:"Things are open. You prefer flexibility and adapting as you go." },
  { id:"p2", dimension:"planning", text:"Your approach to shared finances and goals is:", a:"Structured. Budgets, timelines, and clear targets give you peace of mind.", b:"Flexible. You'd rather stay loose and adjust to life as it happens." },
  { id:"p3", dimension:"planning", text:"Spontaneity in a relationship feels:", a:"Fun occasionally, but you need a baseline of structure to feel secure.", b:"Essential. You thrive when life has room to surprise you." },
  { id:"p4", dimension:"planning", text:"When plans change last minute, you typically feel:", a:"Frustrated. You had mentally prepared and now need to re-calibrate.", b:"Fine, or even a little excited. Change keeps things interesting." },
  { id:"p5", dimension:"planning", text:"For a vacation, you'd rather:", a:"Have an itinerary. Knowing what's happening each day is part of the fun.", b:"Book the flights and figure out the rest as you go." },

  // EXPRESSIVENESS
  { id:"x1", dimension:"expressiveness", text:"When you're feeling emotional, you tend to:", a:"Keep it mostly to yourself. You process internally and share when it matters.", b:"Let people know. You express feelings as they come and feel better for it." },
  { id:"x2", dimension:"expressiveness", text:"In your relationship, you'd describe your emotional communication as:", a:"Private. You share when it's important, but not every feeling needs to be said.", b:"Open. You'd rather over-share than leave your partner wondering." },
  { id:"x3", dimension:"expressiveness", text:"When your partner seems off but doesn't say anything:", a:"You give them space. They'll share when they're ready.", b:"You gently press. You'd rather draw it out than sit with the uncertainty." },
  { id:"x4", dimension:"expressiveness", text:"Sharing feelings out loud feels:", a:"Something you do when necessary, not a default mode.", b:"Natural and relieving. Keeping things inside actually takes more energy." },
  { id:"x5", dimension:"expressiveness", text:"In terms of emotional openness, you're:", a:"More reserved. You trust your partner but don't need to narrate every inner state.", b:"Quite open. Your partner usually knows exactly how you're feeling." },

  // TOGETHERNESS
  { id:"t1", dimension:"togetherness", text:"In a relationship, you picture your social lives as:", a:"Mostly separate. Your own friends, your own time, coming together by choice.", b:"Largely shared. You want to do most things together and build a life that overlaps." },
  { id:"t2", dimension:"togetherness", text:"A weekend where you each do your own thing and reconvene for dinner feels:", a:"Ideal. Independence within a relationship is healthy.", b:"A little lonely. You'd rather be side by side even when doing your own thing." },
  { id:"t3", dimension:"togetherness", text:"When it comes to personal hobbies and friendships, you believe:", a:"Each person should have a full life of their own. That makes the relationship stronger.", b:"Shared interests and mutual friends are part of what makes a partnership feel close." },
  { id:"t4", dimension:"togetherness", text:"If your partner wanted to spend most evenings together, you'd feel:", a:"A little crowded. You need solo time to feel like yourself.", b:"Happy. That's pretty close to what you'd want anyway." },
  { id:"t5", dimension:"togetherness", text:"Your idea of a healthy relationship has:", a:"Clear individual space. Each person keeps their own identity and pursuits.", b:"A lot of overlap. You want to be each other's primary companion in most things." },

  // CHANGE TOLERANCE
  { id:"ch1", dimension:"change", text:"When a major unexpected change hits your life, you tend to:", a:"Feel unsettled. You need time to adjust and find your footing again.", b:"Adapt fairly quickly. Change is uncomfortable but you move through it." },
  { id:"ch2", dimension:"change", text:"The idea of relocating to a new city for an opportunity feels:", a:"Daunting. Stability and roots matter a lot to you.", b:"Exciting, or at least manageable. You trust you'd land on your feet." },
  { id:"ch3", dimension:"change", text:"During periods of uncertainty (job, finances, housing), you:", a:"Worry more than average. The unknown is genuinely hard for you.", b:"Stay relatively even-keeled. Things tend to work out, and you believe that." },
  { id:"ch4", dimension:"change", text:"When your partner handles upheaval more calmly than you do:", a:"It can feel invalidating. You need acknowledgment, not just reassurance.", b:"It's usually helpful. Their steadiness grounds you." },
  { id:"ch5", dimension:"change", text:"Your relationship with uncertainty is:", a:"You prefer to minimize it. Clear plans, steady routines, predictable rhythms.", b:"You tolerate it well. Life's surprises don't derail you for long." },
];


const DIM_GAP_LABELS = {
  energy: [
    { max: 0.4,  text: "Recharge the same way" },
    { max: 0.9,  text: "Very similar rhythm" },
    { max: 1.4,  text: "Compatible pacing" },
    { max: 1.9,  text: "Slightly different speeds" },
    { max: 2.4,  text: "One craves quiet, one craves people" },
    { max: 3.0,  text: "Different recharge styles" },
    { max: 3.5,  text: "Introvert meets extrovert" },
    { max: 4.0,  text: "Opposite ends of the dial" },
  ],
  decision: [
    { max: 0.4,  text: "Think the same way" },
    { max: 0.9,  text: "Very aligned approach" },
    { max: 1.4,  text: "Similar instincts" },
    { max: 1.9,  text: "Mostly alike here" },
    { max: 2.4,  text: "Head vs. heart" },
    { max: 3.0,  text: "Different lenses" },
    { max: 3.5,  text: "Logic meets intuition" },
    { max: 4.0,  text: "Fundamentally different modes" },
  ],
  conflict: [
    { max: 0.4,  text: "Same rhythm when things get hard" },
    { max: 0.9,  text: "Very similar approach" },
    { max: 1.4,  text: "Same general rhythm" },
    { max: 1.9,  text: "Slightly different pacing" },
    { max: 2.4,  text: "One resolves, one processes" },
    { max: 3.0,  text: "Different rhythms when things get hard" },
    { max: 3.5,  text: "Different paces when it's hard" },
    { max: 4.0,  text: "Different approaches to tough conversations" },
  ],
  affection: [
    { max: 0.4,  text: "Love the same language" },
    { max: 0.9,  text: "Very compatible here" },
    { max: 1.4,  text: "Similar love styles" },
    { max: 1.9,  text: "Close but not identical" },
    { max: 2.4,  text: "Words vs. actions" },
    { max: 3.0,  text: "Different love languages" },
    { max: 3.5,  text: "Speaking different dialects" },
    { max: 4.0,  text: "Completely different registers" },
  ],
  planning: [
    { max: 0.4,  text: "Plan-or-don't twins" },
    { max: 0.9,  text: "Very similar approach" },
    { max: 1.4,  text: "Comfortable with the same level" },
    { max: 1.9,  text: "Mostly on the same page" },
    { max: 2.4,  text: "One plans, one flows" },
    { max: 3.0,  text: "Structure meets spontaneity" },
    { max: 3.5,  text: "Very different rhythms" },
    { max: 4.0,  text: "Spreadsheets vs. wing-it" },
  ],
  expressiveness: [
    { max: 0.4,  text: "Same emotional openness" },
    { max: 0.9,  text: "Very similar style" },
    { max: 1.4,  text: "Comparable openness" },
    { max: 1.9,  text: "Slightly different comfort zones" },
    { max: 2.4,  text: "One shares more, one less" },
    { max: 3.0,  text: "Different emotional styles" },
    { max: 3.5,  text: "Open book meets private person" },
    { max: 4.0,  text: "Opposite ends of openness" },
  ],
  togetherness: [
    { max: 0.4,  text: "Want the exact same thing" },
    { max: 0.9,  text: "Very similar needs" },
    { max: 1.4,  text: "Compatible rhythms" },
    { max: 1.9,  text: "Mostly aligned here" },
    { max: 2.4,  text: "Slightly different needs" },
    { max: 3.0,  text: "Independent meets intertwined" },
    { max: 3.5,  text: "Very different comfort zones" },
    { max: 4.0,  text: "Solo time vs. always together" },
  ],
  change: [
    { max: 0.4,  text: "Handle uncertainty the same" },
    { max: 0.9,  text: "Very similar resilience" },
    { max: 1.4,  text: "Compatible adaptability" },
    { max: 1.9,  text: "Mostly similar here" },
    { max: 2.4,  text: "One anchors, one adapts" },
    { max: 3.0,  text: "Different tolerances" },
    { max: 3.5,  text: "Roots vs. wings" },
    { max: 4.0,  text: "Opposite ends entirely" },
  ],
};

function gapLabel(gap, dim) {
  const pool = dim && DIM_GAP_LABELS[dim] ? DIM_GAP_LABELS[dim] : null;
  if (pool) {
    const entry = pool.find(e => gap <= e.max) || pool[pool.length - 1];
    return { text: entry.text };
  }
  // Fallback generic
  if (gap <= 0.5)  return { text: "Cut from the same cloth" };
  if (gap <= 1.0)  return { text: "Two of a kind" };
  if (gap <= 1.5)  return { text: "Same wavelength" };
  if (gap <= 2.0)  return { text: "More alike than not" };
  if (gap <= 2.5)  return { text: "Interesting contrast" };
  if (gap <= 3.0)  return { text: "Beautifully different" };
  if (gap <= 3.5)  return { text: "Opposite ends" };
  return             { text: "Your own people" };
}

function overallPairingLabel(avgGap) {
  if (avgGap < 0.75)  return { word: "Mirror Images",       sub: "How you each show up is remarkably similar — a rare degree of sync.", color: "#4CAF50" };
  if (avgGap < 1.25)  return { word: "Deeply Compatible",   sub: "The way you each tend to operate aligns on nearly everything that matters.", color: "#4CAF50" };
  if (avgGap < 1.75)  return { word: "Well Matched",        sub: "More overlap than difference. A genuinely strong foundation to build from.", color: "#2196F3" };
  if (avgGap < 2.25)  return { word: "Complementary",       sub: "Where one of you tends one way, the other tends the other. Worth understanding how.", color: "#2196F3" };
  if (avgGap < 2.75)  return { word: "Richly Different",    sub: "You bring genuinely distinct orientations to this relationship — there's a lot here worth exploring.", color: "#9C27B0" };
  if (avgGap < 3.25)  return { word: "Beautifully Opposite", sub: "Your orientations differ across nearly every dimension. That can be clarifying — and it makes this comparison especially valuable.", color: "#FF9800" };
  return                { word: "Unique Individuals",        sub: "Your differences are significant — and naming them clearly is exactly what Attune is for.", color: "#E91E63" };
}

function calcDimScores(answers) {
  const scores = {};
  DIMS.forEach(dim => {
    const qs = PERSONALITY_QUESTIONS.filter(q => q.dimension === dim);
    scores[dim] = qs.reduce((s,q) => s + (answers[q.id] || 3), 0) / qs.length;
  });
  return scores;
}

// -- PERSONALITY TYPING QUESTIONS (12 questions, 4 axes) --
// Axes: Energy (I/E), Information (N/S), Decisions (T/F), Structure (J/P)
const TYPE_QUESTIONS = [
  // Energy axis (E vs I)
  { id:"ty1", axis:"energy", textA:"I feel energized after spending time with a group of people.", textB:"I feel drained after too much social time and need quiet to recharge." },
  { id:"ty2", axis:"energy", textA:"I tend to think out loud. Talking helps me process.", textB:"I prefer to think things through before I speak." },
  { id:"ty3", axis:"energy", textA:"I like having lots of plans and social commitments on the calendar.", textB:"I'm happiest with open time and fewer obligations." },
  // Information axis (N vs S)
  { id:"ty4", axis:"info", textA:"I'm more drawn to the big picture, patterns, and what could be.", textB:"I prefer concrete facts, details, and what actually is." },
  { id:"ty5", axis:"info", textA:"I often think about the future and what things could become.", textB:"I'm more focused on the present and what's in front of me." },
  { id:"ty6", axis:"info", textA:"I trust hunches and instincts, even without hard evidence.", textB:"I trust what I can see, measure, or experience directly." },
  // Decisions axis (T vs F)
  { id:"ty7", axis:"decisions", textA:"When making decisions, I lead with logic and analysis.", textB:"When making decisions, I lead with how it affects people and relationships." },
  { id:"ty8", axis:"decisions", textA:"I'd rather be honest and direct, even if it's uncomfortable.", textB:"I tend to prioritize harmony and tact when there's tension." },
  { id:"ty9", axis:"decisions", textA:"I find it easier to give feedback than to receive it.", textB:"I care more about being understood than being right." },
  // Structure axis (J vs P)
  { id:"ty10", axis:"structure", textA:"I like to have things decided and settled. Ambiguity stresses me.", textB:"I like to keep options open and adapt as I go." },
  { id:"ty11", axis:"structure", textA:"I feel better when I have a plan and stick to it.", textB:"I get energy from being spontaneous and flexible." },
  { id:"ty12", axis:"structure", textA:"I work best when I finish one thing before moving to the next.", textB:"I prefer to juggle multiple things and follow what feels right." },
];

// Derive 4-letter type from answers (ty1-ty12)
// Each axis: score 1-5 where 1=strongly A, 5=strongly B
// A-side = E/N/T/J, B-side = I/S/F/P
function deriveType(answers) {
  const axes = { energy: [], info: [], decisions: [], structure: [] };
  TYPE_QUESTIONS.forEach(q => { if (answers[q.id]) axes[q.axis].push(answers[q.id]); });
  const avg = arr => arr.length ? arr.reduce((s,v) => s+v, 0) / arr.length : 3;
  const e = avg(axes.energy) < 3 ? "E" : "I";
  const n = avg(axes.info)    < 3 ? "N" : "S";
  const t = avg(axes.decisions) < 3 ? "T" : "F";
  const j = avg(axes.structure) < 3 ? "J" : "P";
  return e + n + t + j;
}

// Type strength descriptions -- name, tagline, 3 strengths, 1 blind spot
const TYPE_PROFILES = {
  ENTJ: { name: "The Architect", tag: "You tend to think in systems, move decisively, and take the relationship's long-term health seriously.", strengths: ["Thinks in systems and long-term plans", "Takes charge clearly when direction is needed", "Keeps relationships moving forward intentionally"], blind: "Can move too fast for partners who need space to process." },
  ENTP: { name: "The Challenger", tag: "You tend to think quickly, stay curious, and bring energy to every conversation.", strengths: ["Loves intellectual depth in conversation", "Brings fresh angles to stuck problems", "Keeps the relationship mentally alive"], blind: "Can debate for sport when a partner just wants to be heard." },
  ENFJ: { name: "The Advocate", tag: "You tend to read what your partner needs before they say it — and show up for them before being asked.", strengths: ["Reads partner's needs before they're spoken", "Builds deep emotional intimacy naturally", "Champions partner's growth actively"], blind: "Can take on too much of a partner's emotional weight." },
  ENFP: { name: "The Connector", tag: "You tend to be all-in — imaginative, warm, and energizing to be around.", strengths: ["Creates warmth and energy in the relationship", "Sees the best version of their partner", "Brings creativity to how love gets expressed"], blind: "Can let difficult things linger rather than addressing them directly." },
  ESTJ: { name: "The Organizer", tag: "You tend to create stability through follow-through — reliable, structured, and clear.", strengths: ["Creates stability and predictability at home", "Follows through on commitments consistently", "Handles logistics so partners can exhale"], blind: "Can prioritize efficiency over emotional attunement." },
  ESTP: { name: "The Activator", tag: "You tend to be action-first — bold, present, and comfortable moving toward difficulty head-on.", strengths: ["Brings energy and spontaneity to daily life", "Handles conflict head-on without dragging it out", "Keeps things from going stale"], blind: "May undervalue the slower, quieter emotional work." },
  ESFJ: { name: "The Caretaker", tag: "You tend to hold the relationship together through consistency — attentive to what matters most to your partner.", strengths: ["Remembers what matters to a partner", "Creates warmth and belonging at home", "Shows up fully, without being asked"], blind: "Can give a great deal without asking for much in return — until it builds up." },
  ESFP: { name: "The Attune", tag: "You tend to make the ordinary feel meaningful — generous, joyful, and fully present.", strengths: ["Makes ordinary moments feel special", "Loves physically and affectionately", "Brings joy into hard times"], blind: "Can avoid difficult conversations until they become unavoidable." },
  INTJ: { name: "The Strategist", tag: "You tend to show love through reliability and thoughtful action — independent, devoted in your own way.", strengths: ["Shows love through reliability and thoughtful action", "Brings intellectual depth and genuine respect", "Protects the relationship's long-term health seriously"], blind: "Emotional expression can feel effortful. Partner may feel guessed-at." },
  INTP: { name: "The Deep Thinker", tag: "You tend to be curious and honest, bringing genuine intellectual respect to how you love.", strengths: ["Brings genuine intellectual respect to a partner", "Thinks deeply about how to improve the relationship", "Honest even when it's uncomfortable"], blind: "Can get lost in analysis when a partner needs presence." },
  INFJ: { name: "The Visionary", tag: "You tend to form rare emotional depth — perceptive, purposeful, and quietly intense in how you invest.", strengths: ["Forms rare emotional depth quickly", "Sees a partner's patterns more clearly than they do", "Committed to growth in self and partner"], blind: "High standards can tip into idealism under stress." },
  INFP: { name: "The Idealist", tag: "You tend to love with unusual depth and sincerity — values-driven, imaginative, and fully present to meaning.", strengths: ["Loves with unusual depth and sincerity", "Creates space for a partner to be fully themselves", "Brings meaning to the everyday"], blind: "Tends to internalize rather than surface what's bothering them, which can create quiet distance." },
  ISTJ: { name: "The Anchor", tag: "You tend to provide steady reliability — doing what you say, protecting what matters, showing up every time.", strengths: ["Does what they say, every time", "Provides emotional and practical security", "Remembers and respects what matters to a partner"], blind: "May resist change even when it would strengthen the relationship." },
  ISTP: { name: "The Steady Hand", tag: "You tend to stay calm and capable under pressure — showing love through presence and doing.", strengths: ["Stays composed when everything else is chaotic", "Shows love through doing, showing up, and presence", "Doesn't overcomplicate what doesn't need it"], blind: "Emotional availability can take real effort to access." },
  ISFJ: { name: "The Nurturer", tag: "You tend to notice every small thing that matters to your partner — devoted, observant, quietly strong.", strengths: ["Remembers every small thing a partner values", "Creates a home that feels safe and cared-for", "Shows up completely, without needing recognition"], blind: "Rarely asks for what they need until it's overdue." },
  ISFP: { name: "The Harmonist", tag: "You tend to love gently and without conditions — present, sensory, and accepting of your partner as they are.", strengths: ["Brings beauty and calm to shared life", "Accepts a partner as they are, not as they should be", "Expresses love through gesture, touch, and presence"], blind: "Hard conversations can stay unspoken too long." },
};

// Per-type best practice for navigating a specific partner type
// Format: TYPE_PRACTICES[myType][partnerType] = 2-3 sentence personal insight
function getTypePractice(myType, partnerType) {
  const my = TYPE_PROFILES[myType] || TYPE_PROFILES["INFP"];
  const partner = TYPE_PROFILES[partnerType] || TYPE_PROFILES["ENFP"];
  // Generate based on axis pairs
  const myE = myType[0] === "E", myN = myType[1] === "N", myT = myType[2] === "T", myJ = myType[3] === "J";
  const pE = partnerType[0] === "E", pN = partnerType[1] === "N", pT = partnerType[2] === "T", pJ = partnerType[3] === "J";

  const tips = [];

  if (myE && !pE) tips.push(((partnerName) + " needs quiet time to reset. What can feel like pulling away is usually recharging. Giving that space without reading distance into it, is one of the most useful things you can do."));
  if (!myE && pE) tips.push(((partnerName) + " thinks out loud. Talking is how they figure out what they actually think. Let them process verbally without assuming every sentence is a final position."));
  if (myT && !pT) tips.push(((partnerName) + " often needs to feel understood before they can engage with solutions. Sitting with them in what's hard first, before moving toward action — lands better than it might feel natural."));
  if (!myT && pT) tips.push("Your partner's directness is care, not coldness. Ask for the logic behind their position. It's usually more thoughtful than it sounds.");
  if (myJ && !pJ) tips.push("Your partner's flexibility isn't avoidance. They genuinely think better when things aren't locked in. Build in structured check-ins rather than expecting shared plans by default.");
  if (!myJ && pJ) tips.push("Your partner feels secure when things are decided. Giving them early closure on logistics frees them up emotionally for the things that matter.");
  if (myN && !pN) tips.push("Your partner is grounded in the concrete and practical. Connect your ideas to real examples. It's not skepticism, it's how they trust what they can't yet see.");
  if (!myN && pN) tips.push("Your partner lives partly in future possibility. Make space for their hypotheticals. Engaging them builds intimacy even if the ideas never happen.");

  if (tips.length === 0) tips.push("Your types are closely matched in how you process and communicate. The growth edge here is staying curious about subtle differences rather than assuming full alignment.");

  return tips.slice(0, 2).join(" ");
}

// -- RESPONSIBILITY CATEGORIES -- focused, high-signal items --
const RESPONSIBILITY_CATEGORIES = [
  { id:"home", label:"Home & Daily Life", emoji:"", items:["Cook weeknight dinners","Grocery shopping","Keep the house tidy day-to-day","Do the laundry","Manage home repairs","Plan meals for the week","Buy household supplies"] },
  { id:"finance", label:"Finances", emoji:"💰", items:["Pay monthly bills","Manage the household budget","Make major purchase decisions","Handle savings and investments","File taxes"] },
  { id:"family", label:"Family & Social", emoji:"👩", items:["Plan visits with family","Manage holiday logistics","Plan date nights","Plan vacations","Maintain friendships as a couple"] },
  { id:"career", label:"Career & Ambition", emoji:"", items:["Be the primary income earner","Prioritize career flexibility for family needs","Make career sacrifices when children arrive"] },
  { id:"parenting", label:"Parenting", emoji:"", items:["Handle nighttime wake-ups with young children","Do school drop-off and pick-up","Manage children's schedules","Be the primary caregiver","Handle pediatric appointments"] },
  { id:"emotional", label:"Emotional Life", emoji:"", items:["Initiate difficult conversations","Maintain emotional intimacy during stressful periods","Be the one who reaches out first after a conflict","Support a partner through hard times","Carry the mental load of the household"] },
];

const RESP_OPTIONS = (nameA, nameB) => [nameA, nameB, "Both of us", "Not applicable"];

// -- LIFE QUESTIONS -- curated to highest-impact, one at a time --
const LIFE_QUESTIONS = [
  { id:"lq1",  category:"Children",        text:"How many children do you want?",                                                                    options:["None","1","2","3 or more","Open to discussion","Haven't decided"] },
  { id:"lq3",  category:"Family",          text:"As your parents age, how much would you expect to support them?",                                  options:["A great deal — they may live with us","Significant help when needed","Some support, but they're independent","Minimal — they have their own means","Too early to know"] },
  { id:"lq4",  category:"Family",          text:"If your parents and your partner had an ongoing conflict, you'd:",                                 options:["Side with my partner — they come first","Mediate and defend both fairly","Side with my family if I think they're right","Keep the peace regardless of fault","It would depend entirely on the situation"] },
  { id:"lq6",  category:"Extended Family", text:"In-laws who want close, regular involvement in your household feels:",                             options:["Wonderful — family closeness matters","Fine as long as boundaries are respected","Somewhat uncomfortable — I need my space","Genuinely difficult for me","This would be a real challenge in the relationship"] },
  { id:"lq8",  category:"Where You Live",  text:"Where do you picture building your life long-term?",                                              options:["Where we are now","Close to my family","Close to my partner's family","Wherever the best opportunity is","Somewhere entirely new"] },
  { id:"lq9",  category:"Where You Live",  text:"Relocating for a partner's career:",                                                              options:["I'm fully open — I'd go","Open with conditions — it would need to benefit us both","Reluctant — roots matter a lot to me","Very unlikely — I wouldn't uproot my life","Completely depends on the circumstances"] },
  { id:"lq10", category:"Faith & Values",  text:"How much of a role will religion or spirituality play in your home?",                             options:["Central — it shapes how we live","Important but personal","Present, but not defining","Minimal","None at all"] },
  { id:"lq12", category:"Money",           text:"Finances in a relationship should be:",                                                            options:["Fully combined — one pot, total transparency","Mostly combined with personal spending money","Mostly separate with shared expenses split","Fully separate — each manages their own","Not sure yet"] },
  { id:"lq13", category:"Money",           text:"When it comes to money, you naturally lean:",                                                      options:["Toward saving — security comes first","Steadily saving while living well","Neither way strongly","Toward spending — experiences matter","Living fully in the present — life is short"] },
  { id:"lq17", category:"Trust",           text:"Close friendships with people your partner finds attractive:",                                     options:["Completely fine — trust is the foundation","Fine with transparency and openness","Somewhat uncomfortable — context matters","Difficult for me — I'd want to talk about it","This is a dealbreaker for me"] },
  { id:"lq19", category:"Closeness",       text:"Physical affection in daily life — touch, hugs, presence — feels:",                               options:["Essential — I need it constantly","Very important to me","Nice, but not a daily need","I'm comfortable with less of it","I tend to be quite reserved about physical closeness"] },
  { id:"lq20", category:"Closeness",       text:"When life gets stressful, your need for closeness:",                                              options:["Goes up — I need more connection during hard times","Stays about the same","Goes down — I pull back and need space","Varies a lot","I honestly don't know"] },
  { id:"lq21", category:"How You Decide",  text:"Major decisions in a relationship should be made:",                                               options:["Together always — full consensus","By whoever has more relevant expertise","By whoever cares more about the outcome","By dividing domains — each person has their areas","Still figuring this out"] },
];

// -- FEEDBACK ENGINE -- 8 DIMENSIONS --
function getDimFeedback(dim, userName, partnerName, myScore, theirScore) {
  const gap = Math.abs(myScore - theirScore);
  const close = gap <= 1, moderate = gap > 1 && gap <= 2, wide = gap > 2;
  const lowName  = myScore <= theirScore ? userName : partnerName;
  const highName = myScore <= theirScore ? partnerName : userName;
  const m = DIM_META[dim];

  const copy = {
    energy: {
      strength: close ? ((userName) + " and " + (partnerName) + " share a similar rhythm. You both recharge in compatible ways and likely want the same kind of downtime. This alignment reduces a specific category of low-grade friction that many couples never recognize as a pattern.") : null,
      insight: wide
        ? ((lowName) + " tends toward inward processing, needing solitude to return to themselves before they can be fully present. " + (highName) + " recharges through connection and togetherness. Without a shared framework, " + (lowName) + "'s need for quiet can read as withdrawal, and " + (highName) + "'s reach for connection can land differently. Neither is a misread of the relationship. It's a difference in how each person's nervous system works.")
        : moderate ? ((userName) + " and " + (partnerName) + " recharge a little differently. One needs slightly more solitude, the other slightly more connection. This tends to surface most after high-stimulation periods: a busy week, a big social event, or travel.") : null,
      advice: wide
        ? ("When " + (lowName) + " pulls back, " + (highName) + " should resist the instinct to follow. That space isn't a signal about the relationship. It's how " + (lowName) + " returns to it. " + (lowName) + ": naming it in advance (\"I need an hour, then I'm all yours\") removes the guesswork that tends to fill those silences.")
        : moderate ? "A simple signal does most of the work: \"I need some quiet time\" vs. \"I want to be close right now.\" The absence of that signal is usually where the friction lives."
        : "Lean into your shared rhythm. Check in occasionally to make sure neither of you is quietly accommodating the other at the cost of your own needs.",
    },
    decision: {
      strength: close ? ((userName) + " and " + (partnerName) + " process decisions through a comparable lens. When both partners weight logic and intuition similarly, decision-making feels collaborative rather than adversarial — a structural advantage when navigating anything consequential together.") : null,
      insight: wide
        ? ((lowName) + " leads with analysis, evaluating options against objective criteria before a conclusion feels sound. " + (highName) + " tends to arrive at positions through intuition and felt resonance. In practice, this often presents as " + (lowName) + " wanting more information while " + (highName) + " already knows what they want. The tension isn't about the decision itself. It's about feeling like the other person is operating from an entirely different mode.")
        : moderate ? ((userName) + " and " + (partnerName) + " have some natural differnce in how you weight logic and feeling. Used deliberately, this is an asset where each compensates for the other's blind spots.") : null,
      advice: wide
        ? ("When deciding together, create space for both modes: run the analysis and sit with the feeling. " + (lowName) + ", " + (highName) + "'s emotional response to an option is data, not noise. " + (highName) + ", " + (lowName) + "'s need to examine the logic isn't skepticism; it's how they build confidence.")
        : moderate ? "Try naming which mode you're in: \"I need to think through this\" vs. \"I already know how I feel.\" That signal lets your partner meet you where you are."
        : "Your shared decision orientation is a quiet structural asset. Consensus tends to come naturally when both partners process through compatible frameworks.",
    },
    conflict: {
      strength: close ? ((userName) + " and " + (partnerName) + " handle tension in a comparable way. This symmetry substantially reduces the risk of a pursuer-withdrawer dynamic. One of the most persistent dynamics in long-term relationships, and one that depends entirely on asymmetry to sustain itself.") : null,
      insight: wide
        ? ((lowName) + " tends to sit with difficult feelings internally until there's space to address them. " + (highName) + " needs emotional regulation before they can engage productively; being asked to talk before that happens tends to close things down rather than open them up. When " + (lowName) + " pursues and " + (highName) + " withdraws, both are behaving in ways that feel self-evidently correct. That's why this pattern is so persistent without an explicit framework.")
        : moderate ? ((userName) + " and " + (partnerName) + " have some difference in pacing around conflict. One tends toward earlier resolution, the other needs slightly more time. This rarely causes lasting problems, but benefits from an explicit agreement made before you're in the middle of something tense.") : null,
      advice: wide
        ? ("The most effective intervention is a shared protocol established in a calm moment: " + (highName) + " signals \"I need time. Can we talk in an hour?\" and " + (lowName) + " accepts the pause without interpreting it as avoidance. A bounded pause, not an indefinite deferral.")
        : moderate ? ("A brief explicit signal: \"I'm not ready yet, but I will be\" — prevents " + (lowName) + " from reading " + (highName) + "'s pause as indifference, and " + (highName) + " from feeling pursued before they're regulated.")
        : "Your matched pacing around tough conversations is a real asset. The push-pull dynamic that strains many couples depends on asymmetry, and you have less of it than most couples.",
    },
    affection: {
      strength: close ? ((userName) + " and " + (partnerName) + " give and receive affection through compatible channels. When partners express and receive love in the same register, the emotional signal lands without translation — a subtler advantage than it sounds, since mismatched expression styles can create sustained low-grade disconnection in otherwise healthy relationships.") : null,
      insight: wide
        ? ((lowName) + " feels most loved through verbal expression: being told, acknowledged, and affirmed in words. " + (highName) + " experiences love primarily through presence, shared experience, and physical closeness. This isn't about a lack of care. It's care being expressed in a language the other person doesn't fully receive. Both may be genuinely loving each other in the way that feels natural, while the other quietly experiences a deficit.")
        : moderate ? ((userName) + " and " + (partnerName) + " have some difference in how you each prefer affection expressed. You're likely both doing the right things, but they may just not always land with the weight you intend.") : null,
      advice: wide
        ? ("The practical move is deliberate bilingualism: continue expressing in the way that comes naturally, and also learn to speak " + (partnerName) + "'s primary language. Ask directly: \"What does it feel like when I show you I care?\" Revisit that answer periodically. It can shift.")
        : moderate ? ("Notice what resonates with " + (partnerName) + " vs. what you'd want in the same situation. Small calibrations (more words, or more presence) can produce disproportionate results in how loved someone feels day-to-day.")
        : ("You're operating in the same register. Keep paying attention to what specifically resonates for " + (partnerName) + ", and name it when you notice it working."),
    },
    planning: {
      strength: close ? ((userName) + " and " + (partnerName) + " share a similar orientation toward structure and spontaneity. When partners sit at comparable points on this spectrum, the ongoing negotiation over how to plan, how much to commit in advance, and how to handle the unexpected tends to be lower-friction — which compounds meaningfully over time.") : null,
      insight: wide
        ? ((lowName) + " finds stability in structure. Clear plans and defined timelines reduce cognitive load and produce groundedness. " + (highName) + " finds freedom in flexibility. Premature commitment feels constraining, and adaptability is a value, not a deficiency. This surfaces across micro-decisions (what are we doing this weekend?) and macro ones (what's the five-year plan?).")
        : moderate ? ((userName) + " and " + (partnerName) + " have some natural differnce in how much structure feels comfortable. This mostly surfaces around planning, budgeting, and navigating significant change.") : null,
      advice: wide
        ? ("The goal isn't convergence. It's negotiated structure. Identify which domains need clear planning (finances, major decisions) and which can carry more flexibility (weekends, social life). " + (lowName) + " gets enough groundedness to feel secure; " + (highName) + " retains enough openness to feel free.")
        : moderate ? "Consider designating certain areas as \"structured\" and others as \"flexible\". It reduces the back-and-forth of case-by-case negotiation and gives each of you a domain where your instinct is the default."
        : "Your matched planning orientation means you'll navigate logistics and uncertainty with less internal negotiation than couples at opposite ends of this spectrum.",
    },
    expressiveness: {
      strength: close ? ((userName) + " and " + (partnerName) + " share a similar comfort level with emotional openness. When partners are matched here, neither tends to feel overwhelmed by too much sharing or starved by too little — a quiet but meaningful calibration.") : null,
      insight: wide
        ? ((lowName) + " tends to process emotions internally and shares selectively, not because of distance, but because internal processing is simply how they work. " + (highName) + " processes by expressing. Sharing feelings as they arise feels natural and necessary. In practice: " + (highName) + " may read " + (lowName) + "'s silence as emotional unavailability, while " + (lowName) + " may experience " + (highName) + "'s expressiveness as intensity or pressure.")
        : moderate ? ((userName) + " and " + (partnerName) + " sit at slightly different points on the emotional openness spectrum. This is workable, but benefits from explicit conversations about what each person actually needs — not assumptions.") : null,
      advice: wide
        ? ((lowName) + ", naming what you're experiencing, even briefly, goes a long way for " + (highName) + ". \"I'm processing something, I'll share when I have it\" is far more reassuring than silence. " + (highName) + ", respect that " + (lowName) + "'s quieter mode isn't a closed door. It's a different pace.")
        : moderate ? "Try a simple check-in: \"I'm feeling X. Just wanted you to know.\" It's a lower-stakes way to stay emotionally connected without requiring a full conversation every time."
        : "Your matched expressiveness means emotional check-ins tend to feel natural rather than forced. Protect that. It's not guaranteed.",
    },
    togetherness: {
      strength: close ? ((userName) + " and " + (partnerName) + " want a similar balance of togetherness and independence. This means fewer negotiations about how much time to spend together, and less of the slow accumulation of unspoken resentment that mismatched togetherness needs can create.") : null,
      insight: wide
        ? ((lowName) + " values a more independent structure within the relationship, maintaining separate pursuits and social lives as a source of identity and vitality. " + (highName) + " gravitates toward deep togetherness: shared experiences, joint social lives, and consistent proximity as the foundation of closeness. Neither orientation is more loving than the other. But without discussion, " + (lowName) + " may feel crowded and " + (highName) + " may feel like they have a roommate.")
        : moderate ? ((userName) + " and " + (partnerName) + " have a slight difference in how much togetherness feels right. This tends to surface most around evenings, weekends, and social life — and usually responds well to explicit negotiation.") : null,
      advice: wide
        ? ("Try designating some time as explicitly \"together time\" and some as explicitly \"apart time\", not as a compromise, but as a structure you both designed. " + (lowName) + " gets guaranteed space; " + (highName) + " gets guaranteed closeness. The structure removes the constant negotiation.")
        : moderate ? ("A standing weekly ritual (a shared dinner, a walk, something consistent) gives " + (highName) + " reliable closeness while keeping the rest flexible enough for " + (lowName) + ".")
        : "Your matched togetherness orientation is a real structural asset. Shared proximity tends to feel natural rather than negotiated. don't take it for granted.",
    },
    change: {
      strength: close ? ((userName) + " and " + (partnerName) + " navigate uncertainty with a similar emotional register. When a disruption hits (job change, relocation, unexpected news) you're likely to respond in compatible ways, which reduces the secondary stress of feeling emotionally out of sync with each other.") : null,
      insight: wide
        ? ((lowName) + " finds significant life change genuinely difficult. The unpredictability and loss of footing produce real anxiety, not just discomfort. " + (highName) + " moves through uncertainty more fluidly and may struggle to understand why " + (lowName) + " is still unsettled after things seem to have stabilized. The dynamic isn't that one of them handles change wrong. It's that " + (highName) + "'s equanimity can feel dismissive to " + (lowName) + ", and " + (lowName) + "'s need for reassurance can be hard for " + (highName) + " to sustain.")
        : moderate ? ((userName) + " and " + (partnerName) + " handle uncertainty with slightly different levels of ease. This mostly surfaces during major transitions: moves, career changes, family shifts — rather than day-to-day.") : null,
      advice: wide
        ? ("During major transitions, " + (highName) + " should resist the urge to reassure " + (lowName) + " with \"it'll be fine\". Even when it's true, that can feel dismissive. What tends to help more: \"I know this is hard for you, and I'm not going anywhere.\" " + (lowName) + ": naming what specifically feels uncertain (not just the overall anxiety) gives " + (highName) + " something concrete to address.")
        : moderate ? "During periods of flux, check in explicitly: \"How are you sitting with this?\" The difference in tolerance can otherwise become invisible until it's created real distance."
        : "Your shared resilience to uncertainty is a genuine advantage during transitions. You're more likely to move through upheaval as a unit, each other's stress during already difficult moments.",
    },
  };

  const e = copy[dim];
  return {
    dim, gap, myScore, theirScore,
    isStrength: close, isOpportunity: wide, isNote: moderate,
    strengthText: e.strength, insightText: e.insight, adviceText: e.advice,
  };
}

function generatePersonalityFeedback(myScores, partnerScores, userName, partnerName) {
  return DIMS.map(dim => getDimFeedback(dim, userName, partnerName, myScores[dim], partnerScores[dim]));
}


// -- RESULTS: COLOR SYSTEM --

// -- RESULTS SHARED UI --

function ResultsSlide({ children, bg = "#fff" }) {
  return (
    <div style={{ background: bg, borderRadius: 20, padding: "1.75rem 1.5rem", animation: "slideUp 0.4s cubic-bezier(0.16,1,0.3,1)", position: "relative", minHeight: "calc(100vh - 160px)" }}>
      <style dangerouslySetInnerHTML={{__html: "@keyframes slideUp{from{opacity:0;transform:translateY(20px)}to{opacity:1;transform:translateY(0)}} @keyframes fadeIn{from{opacity:0}to{opacity:1}}"}} />
      {children}
    </div>
  );
}

function ScreenDots({ total, current, onGo }) {
  return (
    <div style={{ display: "flex", gap: "0.5rem", justifyContent: "center", margin: "1.75rem 0 0.25rem" }}>
      {Array.from({ length: total }).map((_, i) => (
        <button key={i} onClick={() => i !== current && onGo(i)}
          style={{ width: i === current ? 24 : 8, height: 8, borderRadius: 4,
            background: i === current ? "#1a1a2e" : "#aaa",
            border: "none", cursor: i !== current ? "pointer" : "default",
            padding: 0, transition: "all 0.3s ease" }} />
      ))}
    </div>
  );
}

function NavButtons({ onBack, onNext, nextLabel = "Next ->", backDisabled, nextDisabled }) {
  return (
    <div style={{ display: "flex", justifyContent: "space-between", marginTop: "1.5rem" }}>
      <button onClick={onBack} disabled={backDisabled} style={{ background: "transparent", border: (backDisabled ? "1.5px solid transparent" : "1.5px solid rgba(255,255,255,0.25)"), color: backDisabled ? "transparent" : "rgba(255,255,255,0.6)", padding: "0.7rem 1.5rem", borderRadius: 10, fontSize: "0.82rem", cursor: backDisabled ? "default" : "pointer", fontFamily: BFONT, fontWeight: 500 }}>← Back</button>
      <button onClick={onNext} disabled={nextDisabled} style={{ background: nextDisabled ? "rgba(255,255,255,0.1)" : "rgba(255,255,255,0.15)", color: nextDisabled ? "rgba(255,255,255,0.3)" : "white", backdropFilter: "blur(8px)", border: "none", padding: "0.7rem 1.75rem", borderRadius: 10, fontSize: "0.82rem", cursor: nextDisabled ? "default" : "pointer", fontFamily: BFONT, fontWeight: 600, boxShadow: nextDisabled ? "none" : "0 4px 14px rgba(0,0,0,0.15)" }}>{nextLabel}</button>
    </div>
  );
}

function DimTrackViz({ myScore, theirScore, color, userName, partnerName }) {
  const myPct = (((myScore - 1) / 4) * 90 + 5) + "%";
  const theirPct = (((theirScore - 1) / 4) * 90 + 5) + "%";
  return (
    <div style={{ margin: "1rem 0" }}>
      <div style={{ height: 6, background: "rgba(0,0,0,0.08)", borderRadius: 3, position: "relative" }}>
        <div style={{ position: "absolute", top: "50%", left: myPct, transform: "translate(-50%,-50%)", width: 22, height: 22, borderRadius: "50%", background: color, border: "3px solid white", boxShadow: "0 2px 8px rgba(0,0,0,0.2)", zIndex: 2, transition: "left 0.5s" }} />
        <div style={{ position: "absolute", top: "50%", left: theirPct, transform: "translate(-50%,-50%)", width: 22, height: 22, borderRadius: "50%", background: "rgba(0,0,0,0.2)", border: "3px solid white", boxShadow: "0 2px 8px rgba(0,0,0,0.1)", zIndex: 1, transition: "left 0.5s" }} />
      </div>
      <div style={{ display: "flex", justifyContent: "space-between", marginTop: "0.6rem" }}>
        <span style={{ fontSize: "0.7rem", color, fontWeight: 700, fontFamily: BFONT }}>{userName}</span>
        <span style={{ fontSize: "0.7rem", color: "rgba(255,255,255,0.45)", fontWeight: 500, fontFamily: BFONT }}>{partnerName}</span>
      </div>
    </div>
  );
}

// ------------------------------------------------------
// SIDE NAV -- frozen left panel for results experiences
// ------------------------------------------------------
function SideNav({ items, currentStep, onGo, accent }) {
  const ac = accent || "#E8673A";
  return (
    <div style={{
      width: 160, minWidth: 160, flexShrink: 0,
      position: "sticky", top: 16, alignSelf: "flex-start",
      display: "flex", flexDirection: "column",
      background: "rgba(0,0,0,0.25)",
      borderRadius: 12,
      border: ("1px solid " + (ac) + "30"),
      paddingTop: "0.5rem",
      paddingBottom: "0.5rem",
      gap: 0,
      maxHeight: "calc(100vh - 80px)",
      overflowY: "auto",
    }}>
      {items.map(({ label, step, sub, isSection, isChild, onClick: customClick }) => {
        const isString = typeof step === "string";
        const isDimSection = step === "dims" || step === "convos-section";
        const active = !isString
          ? currentStep === step
          : (step === "dims" && currentStep >= 1 && currentStep <= (items.find(i => i.step === "dims")?.endStep || 8));
        return (
          <div key={step + "-" + label}
            onClick={() => { if (isDimSection) return; if (customClick) customClick(); else if (!isString) onGo(step); }}
            style={{
              padding: isSection ? "0.55rem 0.85rem 0.2rem" : isChild ? "0.28rem 0.85rem 0.28rem 1.4rem" : "0.42rem 0.85rem 0.42rem 0.85rem",
              background: active ? (ac + "28") : "transparent",
              borderLeft: active ? ("3px solid " + ac) : "3px solid transparent",
              cursor: isDimSection ? "default" : "pointer",
              transition: "all 0.12s",
            }}
            onMouseEnter={e => { if (!isDimSection && !active) e.currentTarget.style.background = "rgba(255,255,255,0.07)"; }}
            onMouseLeave={e => { if (!active) e.currentTarget.style.background = "transparent"; }}>
            <div style={{
              fontSize: isSection ? "0.58rem" : isChild ? "0.62rem" : "0.72rem",
              fontWeight: isSection ? 700 : isChild ? 400 : active ? 700 : 600,
              fontStyle: isChild ? "italic" : "normal",
              color: active ? "white" : isSection ? (ac + "cc") : isChild ? "rgba(255,255,255,0.38)" : "rgba(255,255,255,0.7)",
              fontFamily: BFONT,
              lineHeight: 1.3,
              letterSpacing: isSection ? "0.1em" : 0,
              textTransform: isSection ? "uppercase" : "none",
              whiteSpace: "nowrap",
              overflow: "hidden",
              textOverflow: "ellipsis",
            }}>{label}</div>
          </div>
        );
      })}
    </div>
  );
}

// Wrapper that adds the side nav layout
function WithSideNav({ children, navItems, currentStep, onGo, accent }) {
  return (
    <div style={{ display: "flex", gap: "1rem", alignItems: "flex-start" }}>
      <SideNav items={navItems} currentStep={currentStep} onGo={onGo} accent={accent} />
      <div style={{ flex: 1, minWidth: 0, overflow: "hidden" }}>{children}</div>
    </div>
  );
}

// -- JOINT OVERVIEW -- unified landing page for both exercises --


function ProgressBar({ current, total, label }) {
  return (
    <div style={{ marginBottom: "2rem" }}>
      <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "0.5rem" }}>
        <span style={{ fontSize: "0.68rem", letterSpacing: "0.15em", textTransform: "uppercase", color: C.clay }}>{label}</span>
        <span style={{ fontSize: "0.68rem", color: C.muted }}>{current} of {total}</span>
      </div>
      <div style={{ background: C.stone, height: 2, borderRadius: 2 }}>
        <div style={{ height: "100%", background: C.clay, borderRadius: 2, width: (((current / total) * 100) + "%"), transition: "width 0.4s ease" }} />
      </div>
    </div>
  );
}

// -- SCALE QUESTION --
function ScaleQuestion({ question, value, onChange }) {
  const selectedA = value === 1 || value === 2;
  const selectedB = value === 4 || value === 5;
  const scaleLabels = ["Strongly A","Lean A","Neutral","Lean B","Strongly B"];
  return (
    <div style={{ marginBottom: "2rem" }}>
      <p style={{ fontFamily: font.display, fontSize: "1.2rem", fontWeight: 400, color: C.deep, lineHeight: 1.45, marginBottom: "1.75rem" }}>{question.text}</p>
      <div style={{ padding: "0.85rem 1.5rem", marginBottom: "1.25rem" }}>
        <div style={{ display: "flex", alignItems: "center", position: "relative" }}>
          <div style={{ position: "absolute", left: "10%", right: "10%", top: "50%", transform: "translateY(-50%)", height: 1, background: C.stone, zIndex: 0 }} />
          {[1,2,3,4,5].map(v => (
            <div key={v} onClick={() => onChange(v)} style={{ flex: 1, display: "flex", justifyContent: "center", position: "relative", zIndex: 1 }}>
              <button style={{ width: v === value ? 32 : 24, height: v === value ? 32 : 24, borderRadius: "50%", border: ("2px solid " + (v === value ? C.clay : C.stone)), background: v === value ? C.clay : C.warm, cursor: "pointer", transition: "all 0.15s", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                {v === value && <div style={{ width: 8, height: 8, borderRadius: "50%", background: "white" }} />}
              </button>
            </div>
          ))}
        </div>
        {value
          ? <p style={{ textAlign: "center", fontSize: "0.68rem", color: C.clay, letterSpacing: "0.12em", textTransform: "uppercase", marginTop: "0.75rem" }}>{scaleLabels[value-1]}</p>
          : <p style={{ textAlign: "center", fontSize: "0.68rem", color: C.stone, letterSpacing: "0.1em", marginTop: "0.75rem" }}>← More like A &nbsp;.&nbsp; Neutral &nbsp;.&nbsp; More like B →</p>
        }
      </div>
      <div onClick={() => onChange(1)} style={{ padding: "1.25rem 1.5rem", borderRadius: 3, marginBottom: "0.75rem", cursor: "pointer", transition: "all 0.15s", border: ("1.5px solid " + (selectedA ? C.clay : C.stone)), background: selectedA ? "rgba(184,150,110,0.1)" : C.warm, display: "flex", alignItems: "flex-start", gap: "1rem" }}>
        <div style={{ flexShrink: 0, width: 22, height: 22, borderRadius: "50%", border: ("2px solid " + (selectedA ? C.clay : C.stone)), background: selectedA ? C.clay : "transparent", marginTop: 2, display: "flex", alignItems: "center", justifyContent: "center" }}>
          {selectedA && <div style={{ width: 8, height: 8, borderRadius: "50%", background: "white" }} />}
        </div>
        <div>
          <p style={{ fontSize: "0.62rem", letterSpacing: "0.15em", textTransform: "uppercase", color: selectedA ? C.clay : C.muted, marginBottom: "0.35rem" }}>Option A</p>
          <p style={{ fontSize: "0.88rem", color: selectedA ? C.text : C.muted, lineHeight: 1.65, fontWeight: selectedA ? 400 : 300 }}>{question.a}</p>
        </div>
      </div>
      <div onClick={() => onChange(5)} style={{ padding: "1.25rem 1.5rem", borderRadius: 3, cursor: "pointer", transition: "all 0.15s", border: ("1.5px solid " + (selectedB ? C.clay : C.stone)), background: selectedB ? "rgba(184,150,110,0.1)" : C.warm, display: "flex", alignItems: "flex-start", gap: "1rem" }}>
        <div style={{ flexShrink: 0, width: 22, height: 22, borderRadius: "50%", border: ("2px solid " + (selectedB ? C.clay : C.stone)), background: selectedB ? C.clay : "transparent", marginTop: 2, display: "flex", alignItems: "center", justifyContent: "center" }}>
          {selectedB && <div style={{ width: 8, height: 8, borderRadius: "50%", background: "white" }} />}
        </div>
        <div>
          <p style={{ fontSize: "0.62rem", letterSpacing: "0.15em", textTransform: "uppercase", color: selectedB ? C.clay : C.muted, marginBottom: "0.35rem" }}>Option B</p>
          <p style={{ fontSize: "0.88rem", color: selectedB ? C.text : C.muted, lineHeight: 1.65, fontWeight: selectedB ? 400 : 300 }}>{question.b}</p>
        </div>
      </div>
    </div>
  );
}

// -- EXERCISE 1 --
function PersonalityExercise({ userName, onComplete }) {
  const [currentQ, setCurrentQ] = useState(0);
  const [dimAnswers, setDimAnswers] = useState({});
  const [started, setStarted] = useState(false);

  // Intro screen
  if (!started) return (
    <div style={{ maxWidth: 480, margin: "0 auto", padding: "3rem 0 2rem", animation: "fadeIn 0.5s ease" }}>
      <link href={FONT_LINK} rel="stylesheet" />
      <style>{'@keyframes fadeIn{from{opacity:0;transform:translateY(12px)}to{opacity:1;transform:translateY(0)}}'}</style>
      <p style={{ fontSize: "0.62rem", letterSpacing: "0.2em", textTransform: "uppercase", color: C.clay, marginBottom: "1.25rem", fontFamily: font.body }}>Exercise 01 . How You Communicate</p>
      <h2 style={{ fontFamily: font.display, fontSize: "clamp(2rem,5vw,2.8rem)", fontWeight: 700, color: C.ink, lineHeight: 1.1, marginBottom: "1.5rem" }}>
        How you're wired<br /><em style={{ fontStyle: "italic", color: C.clay }}>shows up in everything.</em>
      </h2>
      <p style={{ fontSize: "0.95rem", color: C.muted, lineHeight: 1.85, fontFamily: font.body, fontWeight: 300, marginBottom: "1.75rem" }}>
        40 questions. 8 dimensions — how you recharge, make decisions, handle conflict, show love, and navigate uncertainty. Answer for yourself only. Your partner does the same, separately.
      </p>
      <p style={{ fontSize: "0.88rem", color: C.muted, lineHeight: 1.75, fontFamily: font.body, fontWeight: 300, marginBottom: "2.5rem", borderLeft: ("3px solid " + (C.stone)), paddingLeft: "1rem" }}>
        There are no right answers — and no better or worse styles. Every couple brings a different mix of orientations. The point isn't to match perfectly; it's to understand each other clearly.
      </p>
      {/* Dimension preview */}
      <div style={{ display: "flex", gap: "0.4rem", flexWrap: "wrap", marginBottom: "1.75rem" }}>
        {Object.entries(DIM_META).map(([key, m]) => (
          <div key={key} style={{ display: "flex", alignItems: "center", gap: "0.3rem", background: m.bg || "#f5f0eb", borderRadius: 6, padding: "0.25rem 0.55rem" }}>
            <span style={{ fontSize: "0.7rem" }}>{m.emoji}</span>
            <span style={{ fontSize: "0.58rem", color: m.color, fontWeight: 600, letterSpacing: "0.06em", textTransform: "uppercase", fontFamily: font.body }}>{m.label}</span>
          </div>
        ))}
      </div>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", borderTop: ("1px solid " + (C.stone)), paddingTop: "1.5rem" }}>
        <p style={{ fontSize: "0.72rem", color: C.muted, fontFamily: font.body }}>~10 minutes · 40 questions · 8 dimensions</p>
        <button onClick={() => setStarted(true)}
          style={{ background: "linear-gradient(135deg, #E8673A, #d4592f)", color: "white", border: "none", padding: "0.9rem 2.25rem", fontSize: "0.75rem", letterSpacing: "0.1em", textTransform: "uppercase", cursor: "pointer", fontFamily: font.body, borderRadius: 10, fontWeight: 600, boxShadow: "0 4px 16px rgba(232,103,58,0.35)" }}>
          Begin Exercise →
        </button>
      </div>
    </div>
  );

  const dimQs = (() => {
    const byDim = {};
    PERSONALITY_QUESTIONS.forEach(q => { if (!byDim[q.dimension]) byDim[q.dimension] = []; byDim[q.dimension].push(q); });
    const dims = ["energy","decision","conflict","affection","planning","expressiveness","togetherness","change"];
    const maxLen = Math.max(...dims.map(d => byDim[d]?.length || 0));
    const interleaved = [];
    for (let i = 0; i < maxLen; i++) dims.forEach(d => { if (byDim[d]?.[i]) interleaved.push(byDim[d][i]); });
    return interleaved;
  })();
  const dimTotal = dimQs.length;

  const q = dimQs[currentQ];
    const val = dimAnswers[q.id];
    const isLast = currentQ === dimTotal - 1;
    const dimMeta = DIM_META[q.dimension];
    const dimColor = dimMeta?.color || C.clay;
    const dimBg = dimMeta?.bg || C.warm;
    const progress = (currentQ + 1) / dimTotal;

    return (
      <div>
        <link href={FONT_LINK} rel="stylesheet" />
        {/* Progress — segmented by dimension */}
        <div style={{ marginBottom: "1.75rem" }}>
          <div style={{ display: "flex", gap: "3px", marginBottom: "0.85rem" }}>
            {["energy","decision","conflict","affection","planning","expressiveness","togetherness","change"].map((d, i) => {
              const dColor = DIM_META[d]?.color || "#ccc";
              const dQs = dimQs.filter(q => q.dimension === d);
              const dAnswered = dQs.filter(q => dimAnswers[q.id] !== undefined).length;
              const isCurrent = d === q.dimension;
              return (
                <div key={d} style={{ flex: 1, height: isCurrent ? 6 : 4, borderRadius: 3, background: dAnswered === dQs.length ? dColor : isCurrent ? dColor + "80" : C.stone, transition: "all 0.3s", alignSelf: "flex-end" }} title={DIM_META[d]?.label} />
              );
            })}
          </div>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
              <div style={{ width: 28, height: 28, borderRadius: 8, background: dimColor, display: "flex", alignItems: "center", justifyContent: "center", fontSize: "0.9rem" }}>{dimMeta?.emoji}</div>
              <div>
                <div style={{ fontSize: "0.58rem", letterSpacing: "0.15em", textTransform: "uppercase", color: C.muted, fontFamily: font.body }}>{dimMeta?.label}</div>
                <div style={{ fontSize: "0.68rem", color: dimColor, fontWeight: 600, fontFamily: font.body }}>{dimMeta?.ends?.[0]} ↔ {dimMeta?.ends?.[1]}</div>
              </div>
            </div>
            <span style={{ fontSize: "0.65rem", color: C.muted, fontFamily: font.body }}>{currentQ + 1} of {dimTotal}</span>
          </div>
        </div>

        {/* Question */}
        <p style={{ fontFamily: font.display, fontSize: "1.25rem", fontWeight: 400, color: C.ink, lineHeight: 1.6, marginBottom: "1.75rem" }}>{q.text}</p>

        {/* A/B options */}
        <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem", marginBottom: "1.25rem" }}>
          {[{score:1,label:"A",text:q.a},{score:5,label:"B",text:q.b}].map(({score,label,text}) => {
            const isSel = val === score || (score === 1 && val === 2) || (score === 5 && val === 4);
            const isExact = val === score;
            return (
              <div key={score} onClick={() => { setDimAnswers(a => ({ ...a, [q.id]: score })); if (!isLast) setTimeout(() => setCurrentQ(n => n+1), 380); }}
                style={{ display: "flex", alignItems: "flex-start", gap: "1rem", padding: "1.1rem 1.25rem", borderRadius: 14, border: ("2px solid " + (isExact ? dimColor : isSel ? dimColor+"66" : C.stone)), background: isExact ? dimColor+"12" : "white", cursor: "pointer", transition: "all 0.18s ease", borderLeft: isExact ? ("4px solid " + dimColor) : ("2px solid " + (isSel ? dimColor+"66" : C.stone)) }}
                onMouseEnter={e => { if (!isExact) e.currentTarget.style.borderColor = dimColor+"88"; e.currentTarget.style.background = isExact ? dimColor+"15" : dimColor+"08"; }}
                onMouseLeave={e => { e.currentTarget.style.borderColor = isExact ? dimColor : isSel ? dimColor+"66" : C.stone; e.currentTarget.style.background = isExact ? dimColor+"15" : "white"; }}>
                <div style={{ width: 28, height: 28, borderRadius: "50%", border: ("2px solid " + (isExact ? dimColor : C.stone)), background: isExact ? dimColor : "transparent", flexShrink: 0, display: "flex", alignItems: "center", justifyContent: "center", marginTop: 1 }}>
                  {isExact && <div style={{ width: 8, height: 8, borderRadius: "50%", background: "white" }} />}
                </div>
                <p style={{ fontSize: "0.92rem", color: isExact ? C.ink : C.muted, lineHeight: 1.6, margin: 0, fontWeight: isExact ? 500 : 300, fontFamily: font.body, transition: "color 0.18s" }}>{text}</p>
              </div>
            );
          })}
        </div>

        {/* Nav */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <button onClick={() => currentQ > 0 && setCurrentQ(n => n-1)} disabled={currentQ === 0}
            style={{ background: "transparent", border: ("1.5px solid " + (C.stone)), color: C.muted, padding: "0.7rem 1.4rem", fontSize: "0.72rem", letterSpacing: "0.1em", textTransform: "uppercase", cursor: currentQ === 0 ? "default" : "pointer", fontFamily: font.body, borderRadius: 8, opacity: currentQ === 0 ? 0.35 : 1 }}>
            ← Back
          </button>
          {/* Show what's next to create momentum */}
          {!isLast ? (() => {
            const nextQ = dimQs[currentQ + 1];
            const isDimChange = nextQ && nextQ.dimension !== q.dimension;
            const nextMeta = isDimChange ? DIM_META[nextQ?.dimension] : null;
            return (
              <button onClick={() => val !== undefined && setCurrentQ(n => n+1)}
                style={{ background: val !== undefined ? dimColor : C.stone, color: "white", border: "none", padding: "0.7rem 1.8rem", fontSize: "0.72rem", letterSpacing: "0.1em", textTransform: "uppercase", cursor: val !== undefined ? "pointer" : "default", fontFamily: font.body, borderRadius: 8, transition: "background 0.2s", boxShadow: val !== undefined ? ("0 3px 12px " + dimColor + "40") : "none" }}>
                {isDimChange && nextMeta ? ((nextMeta.emoji) + " " + (nextMeta.label) + " ->") : "Next →"}
              </button>
            );
          })()
            : <button onClick={() => val !== undefined && onComplete(dimAnswers)}
                style={{ background: val !== undefined ? "#4CAF50" : C.stone, color: "white", border: "none", padding: "0.7rem 2rem", fontSize: "0.72rem", letterSpacing: "0.1em", textTransform: "uppercase", cursor: val !== undefined ? "pointer" : "default", fontFamily: font.body, borderRadius: 8, transition: "background 0.2s", boxShadow: val !== undefined ? "0 3px 16px rgba(76,175,80,0.45)" : "none", fontWeight: 600 }}>
                All done →
              </button>
          }
        </div>
      </div>
    );
}

// -- INLINE CHOICE (replaces dropdowns) --
function InlineChoice({ options, value, onChange }) {
  return (
    <div style={{ display: "flex", gap: "0.3rem", flexWrap: "wrap" }}>
      {options.map(opt => {
        const sel = value === opt;
        const short = opt.replace(" did it","").replace("Not applicable","N/A").replace("Both of us","Both");
        return <button key={opt} onClick={() => onChange(opt)} style={{ padding: "0.22rem 0.55rem", border: ("1px solid " + (sel ? C.clay : C.stone)), background: sel ? "rgba(184,150,110,0.12)" : "transparent", color: sel ? C.deep : C.muted, fontSize: "0.7rem", cursor: "pointer", fontFamily: font.body, borderRadius: 2, whiteSpace: "nowrap", fontWeight: sel ? 500 : 300, transition: "all 0.12s" }}>{short}</button>;
      })}
    </div>
  );
}

// -- EXERCISE 2 --
function ExpectationsExercise({ partnerName, userName = "Partner A", onComplete }) {
  const [phase, setPhase] = useState("intro");
  const [catIndex, setCatIndex] = useState(0);
  const [answers, setAnswers] = useState({ responsibilities: {}, life: {} });
  const [lifeQ, setLifeQ] = useState(0);
  const setLife = (id, value) => setAnswers(a => ({ ...a, life: { ...a.life, [id]: value } }));
  const lifeAnswered = LIFE_QUESTIONS.every(q => answers.life?.[q.id]);

  if (phase === "intro") return (
    <div style={{ maxWidth: 480, margin: "0 auto", padding: "3rem 0 2rem", animation: "fadeIn 0.5s ease" }}>
      <link href={FONT_LINK} rel="stylesheet" />
      <style>{'@keyframes fadeIn{from{opacity:0;transform:translateY(12px)}to{opacity:1;transform:translateY(0)}}'}</style>
      <p style={{ fontSize: "0.62rem", letterSpacing: "0.2em", textTransform: "uppercase", color: "#1B5FE8", marginBottom: "1.25rem", fontFamily: font.body }}>Exercise 02 . What You Expect</p>
      <h2 style={{ fontFamily: font.display, fontSize: "clamp(2rem,5vw,2.8rem)", fontWeight: 700, color: C.ink, lineHeight: 1.1, marginBottom: "1.5rem" }}>
        The assumptions you've<br /><em style={{ fontStyle: "italic", color: "#1B5FE8" }}>never said out loud.</em>
      </h2>
      <p style={{ fontSize: "0.95rem", color: C.muted, lineHeight: 1.85, fontFamily: font.body, fontWeight: 300, marginBottom: "1.75rem" }}>
        Two parts. First, who handles what — across home, finances, family, and health. Then, how you think about bigger things: children, money, where you live, closeness.
      </p>
      <p style={{ fontSize: "0.88rem", color: C.muted, lineHeight: 1.75, fontFamily: font.body, fontWeight: 300, marginBottom: "2.5rem", borderLeft: ("3px solid " + (C.stone)), paddingLeft: "1rem" }}>
        Every couple carries different assumptions into a relationship — shaped by how they were raised, what they've seen, what they've never had to say out loud. This makes those visible while they're still easy to talk about.
      </p>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", borderTop: ("1px solid " + (C.stone)), paddingTop: "1.5rem" }}>
        <p style={{ fontSize: "0.72rem", color: C.muted, fontFamily: font.body }}>~15 minutes . 2 parts</p>
        <button onClick={() => setPhase("responsibilities")}
          style={{ background: "#1B5FE8", color: "white", border: "none", padding: "0.9rem 2.25rem", fontSize: "0.75rem", letterSpacing: "0.1em", textTransform: "uppercase", cursor: "pointer", fontFamily: font.body, borderRadius: 10, fontWeight: 600 }}>
          Start →
        </button>
      </div>
    </div>
  );

  if (phase === "responsibilities") {
    const progress = (catIndex + 1) / RESPONSIBILITY_CATEGORIES.length;
    const cat = RESPONSIBILITY_CATEGORIES[catIndex];
    const isLastCat = catIndex === RESPONSIBILITY_CATEGORIES.length - 1;
    const setResp = (item, value) => {
      const key = ((cat.id) + "__" + (item));
      setAnswers(a => ({ ...a, responsibilities: { ...a.responsibilities, [key]: value } }));
    };
    const getResp = (item) => answers.responsibilities?.[((cat.id) + "__" + (item))];
    const catAnswered = cat.items.every(item => getResp(item));

    return (
      <div>
        <link href={FONT_LINK} rel="stylesheet" />
        {/* Progress */}
        <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", marginBottom: "2rem" }}>
          <div style={{ flex: 1, height: 3, background: C.stone, borderRadius: 2 }}>
            <div style={{ height: "100%", width: ((progress * 100) + "%"), background: C.clay, borderRadius: 2, transition: "width 0.4s ease" }} />
          </div>
          <span style={{ fontSize: "0.7rem", color: C.muted, fontFamily: font.body, whiteSpace: "nowrap" }}>{catIndex + 1} / {RESPONSIBILITY_CATEGORIES.length}</span>
        </div>

        {/* Category header */}
        <div style={{ marginBottom: "1.75rem" }}>
          <p style={{ fontSize: "0.6rem", letterSpacing: "0.2em", textTransform: "uppercase", color: C.clay, marginBottom: "0.35rem", fontFamily: font.body }}>Your Expectations — Part 1 of 2</p>
          <h2 style={{ fontFamily: font.display, fontSize: "1.5rem", fontWeight: 700, color: C.ink, marginBottom: "0.3rem", lineHeight: 1.2 }}>{cat.emoji} {cat.label}</h2>
          <p style={{ fontSize: "0.78rem", color: C.muted, fontFamily: font.body, fontWeight: 300 }}>In an ideal world, who handles each of these — you, {partnerName}, or both of you together?</p>
        </div>

        {/* Responsibility items */}
        <div style={{ display: "flex", flexDirection: "column", gap: "0.6rem", marginBottom: "1.75rem" }}>
          {cat.items.map((item) => {
            const val = getResp(item);
            return (
              <div key={item} style={{ borderRadius: 12, border: ("1.5px solid " + (val ? C.clay+"66" : C.stone)), background: val ? "rgba(184,150,110,0.05)" : "white", padding: "0.85rem 1rem", transition: "all 0.15s" }}>
                <p style={{ fontSize: "0.88rem", color: C.text, fontFamily: font.body, marginBottom: "0.65rem", lineHeight: 1.4 }}>{item}</p>
                <div style={{ display: "flex", gap: "0.4rem" }}>
                  {RESP_OPTIONS(userName, partnerName).map(opt => {
                    const isSel = val === opt;
                    const col = opt === userName ? "#E8673A" : opt === partnerName ? "#1B5FE8" : opt === "Both of us" ? "#2AB07F" : C.stone;
                    return (
                      <button key={opt} onClick={() => setResp(item, opt)}
                        style={{ padding: "0.3rem 0.65rem", border: ("1.5px solid " + (isSel ? col : C.stone)), background: isSel ? col : "transparent", color: isSel ? "white" : C.muted, fontSize: "0.7rem", borderRadius: 999, cursor: "pointer", fontFamily: font.body, transition: "all 0.15s", fontWeight: isSel ? 600 : 300, whiteSpace: "nowrap" }}>
                        {opt}
                      </button>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>

        {/* Nav */}
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <button onClick={() => catIndex > 0 && setCatIndex(n => n-1)} disabled={catIndex === 0}
            style={{ background: "transparent", border: ("1.5px solid " + (C.stone)), color: C.muted, padding: "0.7rem 1.4rem", fontSize: "0.72rem", letterSpacing: "0.1em", textTransform: "uppercase", cursor: catIndex === 0 ? "default" : "pointer", fontFamily: font.body, borderRadius: 8, opacity: catIndex === 0 ? 0.35 : 1 }}>
            ← Back
          </button>
          <button onClick={() => catAnswered && (isLastCat ? setPhase("life") : setCatIndex(n => n+1))}
            style={{ background: catAnswered ? C.ink : C.stone, color: "white", border: "none", padding: "0.7rem 1.8rem", fontSize: "0.72rem", letterSpacing: "0.1em", textTransform: "uppercase", cursor: catAnswered ? "pointer" : "default", fontFamily: font.body, borderRadius: 8, transition: "background 0.2s" }}>
            {isLastCat ? "Continue to Part 2 ->" : ("Next: " + (RESPONSIBILITY_CATEGORIES[catIndex+1]?.label) + " →")}
          </button>
        </div>
      </div>
    );
  }
  // -- Life questions phase state (moved to top to obey React hooks rules) --
  const lq = LIFE_QUESTIONS[lifeQ];
  const lqSel = answers.life?.[lq?.id];
  const lqIsLast = lifeQ === LIFE_QUESTIONS.length - 1;
  const lqProgress = (lifeQ + 1) / LIFE_QUESTIONS.length;

  return (
    <div>
      <link href={FONT_LINK} rel="stylesheet" />
      {/* Progress */}
      <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", marginBottom: "2rem" }}>
        <div style={{ flex: 1, height: 3, background: C.stone, borderRadius: 2 }}>
          <div style={{ height: "100%", width: ((lqProgress * 100) + "%"), background: C.clay, borderRadius: 2, transition: "width 0.4s ease" }} />
        </div>
        <span style={{ fontSize: "0.7rem", color: C.muted, fontFamily: font.body, whiteSpace: "nowrap" }}>{lifeQ + 1} / {LIFE_QUESTIONS.length}</span>
      </div>

      {/* Category + question */}
      <p style={{ fontSize: "0.6rem", letterSpacing: "0.2em", textTransform: "uppercase", color: C.clay, marginBottom: "0.25rem", fontFamily: font.body }}>Your Expectations — Part 2 of 2</p>
      <p style={{ fontSize: "0.6rem", letterSpacing: "0.12em", textTransform: "uppercase", color: C.muted, marginBottom: "0.85rem", fontFamily: font.body }}>{lq.category}</p>
      <p style={{ fontFamily: font.display, fontSize: "1.25rem", fontWeight: 400, color: C.ink, lineHeight: 1.6, marginBottom: "1.75rem" }}>{lq.text}</p>

      {/* Options */}
      <div style={{ display: "flex", flexDirection: "column", gap: "0.6rem", marginBottom: "2rem" }}>
        {lq.options.map(opt => {
          const isSel = lqSel === opt;
          return (
            <button key={opt} onClick={() => { setLife(lq.id, opt); if (!lqIsLast) setTimeout(() => setLifeQ(n => n+1), 260); }}
              style={{ padding: "0.9rem 1.25rem", border: ("2px solid " + (isSel ? C.clay : C.stone)), background: isSel ? "rgba(184,150,110,0.12)" : "white", color: isSel ? C.ink : C.muted, fontSize: "0.88rem", cursor: "pointer", fontFamily: font.body, borderRadius: 12, transition: "all 0.15s", fontWeight: isSel ? 500 : 300, textAlign: "left" }}
              onMouseEnter={e => { if (!isSel) { e.currentTarget.style.borderColor = C.clay+"66"; e.currentTarget.style.background = "rgba(184,150,110,0.05)"; }}}
              onMouseLeave={e => { if (!isSel) { e.currentTarget.style.borderColor = C.stone; e.currentTarget.style.background = "white"; }}}>
              {opt}
            </button>
          );
        })}
      </div>

      {/* Nav */}
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <button onClick={() => lifeQ > 0 ? setLifeQ(n => n-1) : setPhase("responsibilities")}
          style={{ background: "transparent", border: ("1.5px solid " + (C.stone)), color: C.muted, padding: "0.7rem 1.4rem", fontSize: "0.72rem", letterSpacing: "0.1em", textTransform: "uppercase", cursor: "pointer", fontFamily: font.body, borderRadius: 8 }}>
          ← Back
        </button>
        {lqIsLast
          ? <button onClick={() => lqSel && onComplete(answers)}
              style={{ background: lqSel ? "#4CAF50" : C.stone, color: "white", border: "none", padding: "0.7rem 1.8rem", fontSize: "0.72rem", letterSpacing: "0.1em", textTransform: "uppercase", cursor: lqSel ? "pointer" : "default", fontFamily: font.body, borderRadius: 8, fontWeight: 600, boxShadow: lqSel ? "0 3px 16px rgba(76,175,80,0.45)" : "none" }}>
              All done →
            </button>
          : <button onClick={() => lqSel && setLifeQ(n => n+1)}
              style={{ background: lqSel ? C.ink : C.stone, color: "white", border: "none", padding: "0.7rem 1.8rem", fontSize: "0.72rem", letterSpacing: "0.1em", textTransform: "uppercase", cursor: lqSel ? "pointer" : "default", fontFamily: font.body, borderRadius: 8 }}>
              Next →
            </button>
        }
      </div>
    </div>
  );
}


// -- JOINT OVERVIEW -- unified landing page for both exercises --
function JointOverview({ ex1Answers, partnerEx1, ex2Answers, partnerEx2, ex3Answers, partnerEx3, hasAnniversary, userName, partnerName, onGoPersonality, onGoExpectations, onGoAnniversary }) {
  const myS = calcDimScores(ex1Answers);
  const partS = calcDimScores(partnerEx1);
  const feedback = generatePersonalityFeedback(myS, partS, userName, partnerName);
  const sortedFeedback = [...feedback].sort((a, b) => a.gap - b.gap);
  const avgGap = feedback.reduce((s, f) => s + f.gap, 0) / feedback.length;
  const pairing = overallPairingLabel(avgGap);
  const topStrengths = sortedFeedback.filter(f => f.gap <= 1).slice(0, 3);
  const topOpportunities = sortedFeedback.filter(f => f.gap > 2).slice(0, 2);

  // Expectations summary
  const rows = [];
  RESPONSIBILITY_CATEGORIES.forEach(cat => {
    cat.items.forEach(item => {
      const key = ((cat.id) + "__" + (item));
      const mine = ex2Answers.responsibilities?.[key];
      const theirs = partnerEx2.responsibilities?.[key];
      if (!mine || !theirs) return;
      rows.push({ category: cat.label, item, mine, theirs, aligned: mine === theirs });
    });
  });
  const lifeRows = LIFE_QUESTIONS.map(q => ({
    category: q.category, item: q.text,
    mine: ex2Answers.life?.[q.id], theirs: partnerEx2.life?.[q.id],
    aligned: ex2Answers.life?.[q.id] === partnerEx2.life?.[q.id],
  })).filter(r => r.mine && r.theirs);
  const allRows = [...rows, ...lifeRows];
  const alignedCount = allRows.filter(r => r.aligned).length;
  const gapCount = allRows.filter(r => !r.aligned).length;
  const alignPct = allRows.length ? Math.round((alignedCount / allRows.length) * 100) : 0;

  const myType = deriveType(ex1Answers);
  const theirType = deriveType(partnerEx1);
  const myProfile = TYPE_PROFILES[myType] || TYPE_PROFILES["INFP"];
  const theirProfile = TYPE_PROFILES[theirType] || TYPE_PROFILES["INFP"];

  // Conversation starters -- pre-computed to avoid IIFE in JSX
  const startersList = [];
  topOpportunities.forEach(f => {
    const meta = DIM_META[f.dim];
    if (!meta) return;
    const prompts = {
      energy: `When one of us needs alone time to recharge and the other wants to connect — how do we handle that without it feeling like rejection?`,
      decision: `Walk me through the last big decision you made. What did that feel like from the inside?`,
      conflict: `After a disagreement, what does "being okay again" actually feel like for you?`,
      affection: `What's something I do that makes you feel really loved — that I might not realize has that effect?`,
      planning: `How much certainty do you need before you feel comfortable with a plan? What does uncertainty feel like for you?`,
      expressiveness: `Is there something you've wanted to share with me but haven't found the right way to bring up?`,
      togetherness: `What's your ideal ratio of time together vs. time doing your own thing in a given week?`,
      change: `Tell me about a time a big change went really well for you. What made it feel okay?`,
    };
    if (prompts[f.dim]) startersList.push({ dim: meta.label, prompt: prompts[f.dim], color: meta.color });
  });
  const topExpGap = allRows.filter(r => !r.aligned)[0];
  if (topExpGap) {
    startersList.push({ dim: topExpGap.category, prompt: `We had different answers on "${topExpGap.item}" — what's the thinking behind yours? I want to understand where you're coming from.`, color: "#1B5FE8" });
  }
  const conversationStarters = startersList.length > 0 ? (
    <div style={{ marginTop: "2rem", background: "#FBF8F3", border: "1.5px solid #E8DDD0", borderRadius: 18, padding: "1.5rem 1.5rem 1.25rem" }}>
      <div style={{ display: "flex", alignItems: "center", gap: "0.6rem", marginBottom: "1.1rem" }}>
        <div style={{ fontSize: "0.6rem", letterSpacing: "0.22em", textTransform: "uppercase", color: "#E8673A", fontFamily: BFONT, fontWeight: 700 }}>Start here</div>
        <div style={{ flex: 1, height: 1, background: "#E8DDD0" }} />
      </div>
      <div style={{ fontFamily: HFONT, fontSize: "1.05rem", fontWeight: 700, color: "#0E0B07", marginBottom: "0.35rem", lineHeight: 1.2 }}>3 conversations worth having</div>
      <p style={{ fontSize: "0.8rem", color: "#8C7A68", fontFamily: BFONT, fontWeight: 300, marginBottom: "1.25rem", lineHeight: 1.65 }}>Based on where your answers differd most — framed to open a conversation, not start an argument.</p>
      <div style={{ display: "flex", flexDirection: "column", gap: "0.85rem" }}>
        {startersList.slice(0, 3).map((s, i) => (
          <div key={i} style={{ background: "white", border: "1.5px solid #E8DDD0", borderRadius: 14, padding: "1rem 1.1rem", borderLeft: `3px solid ${s.color}` }}>
            <div style={{ fontSize: "0.58rem", letterSpacing: "0.16em", textTransform: "uppercase", color: s.color, fontFamily: BFONT, fontWeight: 700, marginBottom: "0.4rem" }}>{s.dim}</div>
            <p style={{ fontSize: "0.84rem", color: "#0E0B07", fontFamily: BFONT, fontWeight: 400, lineHeight: 1.65, margin: 0, fontStyle: "italic" }}>"{s.prompt}"</p>
          </div>
        ))}
      </div>
    </div>
  ) : null;

  // Anniversary card -- pre-computed to avoid IIFE in JSX
  let anniversaryCard = null;
  if (hasAnniversary && ex3Answers && partnerEx3) {
    const scaleQs = ANNIVERSARY_QUESTIONS.filter(q => q.type === "scale");
    const overallQ = scaleQs.find(q => q.id === "a0");
    const myOverall = ex3Answers.a0 ?? 3;
    const theirOverall = partnerEx3.a0 ?? 3;
    const avgOverall = (myOverall + theirOverall) / 2;
    const overallLabel = overallQ ? overallQ.scaleLabels[Math.round(avgOverall)] : "Really good";
    const annGap = Math.abs(myOverall - theirOverall);
    anniversaryCard = (
      <div onClick={onGoAnniversary}
        style={{ background: "white", borderRadius: 18, overflow: "hidden", border: "1.5px solid #E8DDD0", cursor: "pointer", transition: "all 0.18s", boxShadow: "0 2px 12px rgba(0,0,0,0.06)", marginTop: "1rem" }}
        onMouseEnter={e => { e.currentTarget.style.transform = "translateY(-3px)"; e.currentTarget.style.boxShadow = "0 8px 32px rgba(16,185,129,0.18)"; e.currentTarget.style.borderColor = "#10b98166"; }}
        onMouseLeave={e => { e.currentTarget.style.transform = ""; e.currentTarget.style.boxShadow = "0 2px 12px rgba(0,0,0,0.06)"; e.currentTarget.style.borderColor = "#E8DDD0"; }}>
        <div style={{ background: "linear-gradient(135deg, #059669, #10b981)", padding: "1.1rem 1.25rem", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <div>
            <div style={{ fontSize: "0.6rem", letterSpacing: "0.15em", textTransform: "uppercase", color: "rgba(255,255,255,0.75)", fontFamily: BFONT, marginBottom: "0.25rem" }}>Exercise 03</div>
            <div style={{ fontSize: "1.1rem", fontWeight: 700, color: "white", fontFamily: HFONT }}>Relationship Reflection</div>
          </div>
          <div style={{ background: "rgba(255,255,255,0.15)", borderRadius: 10, padding: "0.5rem 0.75rem", textAlign: "center" }}>
            <div style={{ fontSize: "0.6rem", color: "rgba(255,255,255,0.65)", fontFamily: BFONT, marginBottom: "0.15rem" }}>Overall feel</div>
            <div style={{ fontSize: "0.82rem", fontWeight: 700, color: "white", fontFamily: BFONT }}>{overallLabel}</div>
          </div>
        </div>
        <div style={{ padding: "1rem 1.25rem" }}>
          <div style={{ marginBottom: "0.75rem" }}>
            {scaleQs.filter(q => q.id !== "a0").map(q => {
              const myVal = ex3Answers[q.id] ?? 2;
              const theirVal = partnerEx3[q.id] ?? 2;
              const qGap = Math.abs(myVal - theirVal);
              const shortLabel = q.text.replace(/How (well |much |connected )?(do I feel |do we )?/i,"").split("?")[0];
              return (
                <div key={q.id} style={{ display: "flex", alignItems: "center", gap: "0.5rem", marginBottom: "0.35rem" }}>
                  <div style={{ width: 6, height: 6, borderRadius: "50%", background: qGap >= 2 ? "#F59E0B" : "#10b981", flexShrink: 0 }} />
                  <div style={{ fontSize: "0.7rem", color: "var(--text)", fontFamily: BFONT, flex: 1 }}>{shortLabel}</div>
                  <div style={{ fontSize: "0.65rem", color: qGap >= 2 ? "#F59E0B" : "#10b981", fontFamily: BFONT, fontWeight: 600 }}>{qGap >= 2 ? "Gap" : "Aligned"}</div>
                </div>
              );
            })}
          </div>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <div style={{ fontSize: "0.7rem", color: "#8C7A68", fontFamily: BFONT }}>{annGap >= 1 ? "Different perspectives on how things feel" : "Shared sense of where you are"}</div>
            <span style={{ fontSize: "0.7rem", color: "#10b981", fontWeight: 700, fontFamily: BFONT }}>Explore results →</span>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div style={{ animation: "slideUp 0.4s cubic-bezier(0.16,1,0.3,1)" }}>
      <style>{'@keyframes slideUp{from{opacity:0;transform:translateY(20px)}to{opacity:1;transform:translateY(0)}}'}</style>
      <link href={FONT_URL} rel="stylesheet" />

      {/* Hero */}
      <div style={{ background: "linear-gradient(145deg, #0f0c29, #302b63, #24243e)", borderRadius: 20, padding: "2.25rem 2rem", marginBottom: "1.25rem", color: "white", position: "relative", overflow: "hidden" }}>
        <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 3, background: "linear-gradient(90deg, #E8673A, #1B5FE8)" }} />
        <div style={{ fontSize: "0.62rem", letterSpacing: "0.22em", textTransform: "uppercase", color: "rgba(255,255,255,0.4)", marginBottom: "0.5rem", fontFamily: BFONT }}>Your Joint Picture</div>
        <div style={{ fontSize: "clamp(2rem,6vw,3rem)", fontWeight: 700, fontFamily: HFONT, lineHeight: 1.0, marginBottom: "0.75rem" }}>{userName} & {partnerName}</div>
        <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", flexWrap: "wrap", marginBottom: "1.25rem" }}>
          <div style={{ background: pairing.color, padding: "0.3rem 0.9rem", borderRadius: 999 }}>
            <span style={{ fontSize: "0.8rem", fontWeight: 700, fontFamily: HFONT }}>{pairing.word}</span>
          </div>
          <span style={{ fontSize: "0.82rem", color: "rgba(255,255,255,0.5)", fontFamily: BFONT, fontWeight: 300 }}>{pairing.sub}</span>
        </div>
        <div style={{ display: "flex", gap: "0.6rem", flexWrap: "wrap", marginBottom: "0.75rem" }}>
          {[
            { label: "8 dimensions mapped" },
            { label: (allRows.length + " topics compared") },
            { label: (alignPct + "% aligned") },
          ].map(({ label }) => (
            <div key={label} style={{ background: "rgba(255,255,255,0.07)", border: "1px solid rgba(255,255,255,0.1)", borderRadius: 8, padding: "0.35rem 0.75rem" }}>
              <span style={{ fontSize: "0.65rem", color: "rgba(255,255,255,0.55)", fontFamily: BFONT }}>{label}</span>
            </div>
          ))}
        </div>
        <p style={{ fontSize: "0.78rem", color: "rgba(255,255,255,0.4)", fontFamily: BFONT, fontWeight: 300, lineHeight: 1.6 }}>
          Completed independently. Built entirely from your own answers.
        </p>
        {/* Profile chips */}
        <div style={{ display: "flex", gap: "0.75rem", marginTop: "1.25rem", flexWrap: "wrap" }}>
          {[[userName, myType, myProfile, "#E8673A"],[partnerName, theirType, theirProfile, "#3B5BDB"]].map(([name, type, profile, color]) => (
            <div key={name} style={{ background: ((color) + "20"), border: ("1px solid " + (color) + "40"), borderRadius: 12, padding: "0.65rem 1rem", minWidth: 140 }}>
              <div style={{ fontSize: "0.6rem", textTransform: "uppercase", letterSpacing: "0.12em", color, fontWeight: 700, marginBottom: "0.35rem", fontFamily: BFONT }}>{name}</div>
              <div style={{ fontSize: "0.78rem", color: "rgba(255,255,255,0.65)", fontFamily: BFONT, lineHeight: 1.45 }}>{profile.tag}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Two report cards */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem", marginBottom: "1.25rem" }}>
        {/* Communication card */}
        <div onClick={onGoPersonality}
          style={{ background: "white", borderRadius: 18, overflow: "hidden", border: "1.5px solid #E8DDD0", cursor: "pointer", transition: "all 0.18s", boxShadow: "0 2px 12px rgba(0,0,0,0.06)" }}
          onMouseEnter={e => { e.currentTarget.style.transform = "translateY(-3px)"; e.currentTarget.style.boxShadow = "0 8px 32px rgba(232,103,58,0.18)"; e.currentTarget.style.borderColor = "#E8673A66"; }}
          onMouseLeave={e => { e.currentTarget.style.transform = ""; e.currentTarget.style.boxShadow = "0 2px 12px rgba(0,0,0,0.06)"; e.currentTarget.style.borderColor = "#E8DDD0"; }}>
          <div style={{ background: "linear-gradient(135deg, #E8673A, #d4592f)", padding: "1.1rem 1.25rem" }}>
            <div style={{ fontSize: "0.6rem", letterSpacing: "0.15em", textTransform: "uppercase", color: "rgba(255,255,255,0.75)", fontFamily: BFONT, marginBottom: "0.25rem" }}>Exercise 01</div>
            <div style={{ fontSize: "1.1rem", fontWeight: 700, color: "white", fontFamily: HFONT }}>How You Communicate</div>
          </div>
          <div style={{ padding: "1rem 1.25rem" }}>
            {/* Dimension bar */}
            <div style={{ marginBottom: "0.85rem" }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "0.4rem" }}>
                <div style={{ fontSize: "0.68rem", color: C.muted, fontFamily: BFONT }}>8 dimensions mapped</div>
                <div style={{ fontSize: "0.68rem", color: "#4CAF50", fontWeight: 600, fontFamily: BFONT }}>{sortedFeedback.filter(f => f.gap <= 1).length} aligned</div>
              </div>
              <div style={{ display: "flex", gap: "3px" }}>
                {sortedFeedback.map((f) => {
                  const m = DIM_META[f.dim];
                  const close = f.gap <= 1;
                  return <div key={f.dim} title={m.label} style={{ flex: 1, height: 7, borderRadius: 2, background: close ? m.color : m.color + "40" }} />;
                })}
              </div>
            </div>
            {/* Strengths */}
            {topStrengths.length > 0 && (
              <div style={{ marginBottom: "0.65rem" }}>
                <div style={{ fontSize: "0.6rem", textTransform: "uppercase", letterSpacing: "0.1em", color: "#4CAF50", fontWeight: 700, marginBottom: "0.35rem", fontFamily: BFONT }}>Strong alignment</div>
                {topStrengths.slice(0, 2).map(f => (
                  <div key={f.dim} style={{ display: "flex", alignItems: "center", gap: "0.4rem", marginBottom: "0.2rem" }}>
                    <span style={{ fontSize: "0.75rem" }}>{DIM_META[f.dim].emoji}</span>
                    <span style={{ fontSize: "0.73rem", color: C.text, fontFamily: BFONT }}>{DIM_META[f.dim].label}</span>
                  </div>
                ))}
              </div>
            )}
            {/* Opportunities */}
            {topOpportunities.length > 0 && (
              <div style={{ marginBottom: "0.65rem" }}>
                <div style={{ fontSize: "0.6rem", textTransform: "uppercase", letterSpacing: "0.1em", color: "#FF9800", fontWeight: 700, marginBottom: "0.35rem", fontFamily: BFONT }}>Notable differences</div>
                {topOpportunities.slice(0, 2).map(f => (
                  <div key={f.dim} style={{ display: "flex", alignItems: "center", gap: "0.4rem", marginBottom: "0.2rem" }}>
                    <span style={{ fontSize: "0.75rem" }}>{DIM_META[f.dim].emoji}</span>
                    <span style={{ fontSize: "0.73rem", color: C.muted, fontFamily: BFONT }}>{DIM_META[f.dim].label}</span>
                  </div>
                ))}
              </div>
            )}
            <div style={{ display: "flex", justifyContent: "flex-end", marginTop: "0.5rem" }}>
              <span style={{ fontSize: "0.7rem", color: "#E8673A", fontWeight: 700, fontFamily: BFONT }}>Explore results →</span>
            </div>
          </div>
        </div>

        {/* Expectations card */}
        <div onClick={onGoExpectations}
          style={{ background: "white", borderRadius: 18, overflow: "hidden", border: "1.5px solid #E8DDD0", cursor: "pointer", transition: "all 0.18s", boxShadow: "0 2px 12px rgba(0,0,0,0.06)" }}
          onMouseEnter={e => { e.currentTarget.style.transform = "translateY(-3px)"; e.currentTarget.style.boxShadow = "0 8px 32px rgba(91,109,248,0.18)"; e.currentTarget.style.borderColor = "#1B5FE866"; }}
          onMouseLeave={e => { e.currentTarget.style.transform = ""; e.currentTarget.style.boxShadow = "0 2px 12px rgba(0,0,0,0.06)"; e.currentTarget.style.borderColor = "#E8DDD0"; }}>
          <div style={{ background: "linear-gradient(135deg, #1B5FE8, #4a5ce8)", padding: "1.1rem 1.25rem" }}>
            <div style={{ fontSize: "0.6rem", letterSpacing: "0.15em", textTransform: "uppercase", color: "rgba(255,255,255,0.75)", fontFamily: BFONT, marginBottom: "0.25rem" }}>Exercise 02</div>
            <div style={{ fontSize: "1.1rem", fontWeight: 700, color: "white", fontFamily: HFONT }}>What You Expect</div>
          </div>
          <div style={{ padding: "1rem 1.25rem" }}>
            <div style={{ marginBottom: "0.85rem" }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "0.35rem" }}>
                <div style={{ fontSize: "0.68rem", color: C.muted, fontFamily: BFONT }}>{alignedCount} of {allRows.length} topics</div>
                <div style={{ fontSize: "0.75rem", fontWeight: 700, color: alignPct >= 70 ? "#4CAF50" : alignPct >= 50 ? "#FF9800" : "#E91E63", fontFamily: BFONT }}>{alignPct}% aligned</div>
              </div>
              <div style={{ height: 6, background: C.stone, borderRadius: 3 }}>
                <div style={{ height: "100%", width: ((alignPct) + "%"), background: alignPct >= 70 ? "#4CAF50" : alignPct >= 50 ? "#FF9800" : "#E91E63", borderRadius: 3, transition: "width 0.8s" }} />
              </div>
            </div>
            <div>
              <div style={{ fontSize: "0.62rem", textTransform: "uppercase", letterSpacing: "0.1em", color: gapCount > 0 ? "#FF9800" : "#4CAF50", fontWeight: 700, marginBottom: "0.35rem", fontFamily: BFONT }}>{gapCount > 0 ? ((gapCount) + " conversation" + (gapCount !== 1 ? "s" : "") + " worth having") : "Fully aligned"}</div>
              <div style={{ fontSize: "0.74rem", color: C.muted, fontFamily: BFONT, lineHeight: 1.55 }}>{gapCount > 0 ? "Worth naming now, while the conversation is still easy." : "You share expectations across all major areas."}</div>
            </div>
            <div style={{ display: "flex", justifyContent: "flex-end", marginTop: "0.85rem" }}>
              <span style={{ fontSize: "0.7rem", color: "#1B5FE8", fontWeight: 700, fontFamily: BFONT }}>Explore results →</span>
            </div>
          </div>
        </div>
      </div>

      {/* 3 key insights */}
      <div style={{ background: "#FFFDF9", border: "1px solid #E8DDD0", borderRadius: 18, padding: "1.5rem", marginBottom: "1.25rem" }}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "1rem" }}><div style={{ fontSize: "0.62rem", textTransform: "uppercase", letterSpacing: "0.15em", color: C.clay, fontWeight: 700, fontFamily: BFONT }}>Three things to know about you two</div><div style={{ fontSize: "0.6rem", color: C.muted, fontFamily: BFONT }}>Based on your answers</div></div>
        <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
          {/* Insight 1: communication pairing */}
          <div style={{ display: "flex", gap: "1rem", alignItems: "flex-start" }}>
            <div style={{ width: 36, height: 36, borderRadius: 10, background: pairing.color, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, fontSize: "0.8rem", fontWeight: 700, color: "white", fontFamily: BFONT }}>01</div>
            <div>
              <div style={{ fontSize: "0.82rem", fontWeight: 700, color: C.ink, marginBottom: "0.2rem", fontFamily: BFONT }}>
                {topStrengths.length >= 2
                  ? ("You move in sync on " + topStrengths[0].dim === "energy" ? "how you recharge" : DIM_META[topStrengths[0].dim].label.toLowerCase()) + (topOpportunities.length > 0 ? (". And there's real room to grow on " + DIM_META[topOpportunities[0].dim].label.toLowerCase()) : " across the board")
                  : (pairing.word + " — " + pairing.sub)}
              </div>
              <div style={{ fontSize: "0.78rem", color: C.muted, fontFamily: BFONT, lineHeight: 1.6, fontWeight: 300 }}>
                {topStrengths.length > 0
                  ? ((userName) + " and " + (partnerName) + " are naturally in sync on " + topStrengths.slice(0,2).map(f => DIM_META[f.dim].label.toLowerCase()).join(" and ") + (topOpportunities.length > 0 ? (", and furthest apart on " + DIM_META[topOpportunities[0].dim].label.toLowerCase() + ". That gap is worth understanding, not fixing.") : ". That kind of alignment means fewer surprises."))
                  : pairing.sub}
              </div>
            </div>
          </div>
          {/* Insight 2: expectations */}
          <div style={{ display: "flex", gap: "1rem", alignItems: "flex-start" }}>
            <div style={{ width: 36, height: 36, borderRadius: 10, background: "#1B5FE8", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, fontSize: "0.8rem", fontWeight: 700, color: "white", fontFamily: BFONT }}>02</div>
            <div>
              <div style={{ fontSize: "0.82rem", fontWeight: 700, color: C.ink, marginBottom: "0.2rem", fontFamily: BFONT }}>
                {gapCount === 0
                  ? "Rare alignment: you share expectations across every area mapped"
                  : gapCount <= 3
                    ? (gapCount + " unspoken expectation" + (gapCount === 1 ? "" : "s") + " surfaced. Worth naming while the conversation is easy")
                    : (gapCount + " places where your assumptions differ. Getting ahead of them is the whole point")}
              </div>
              <div style={{ fontSize: "0.78rem", color: C.muted, fontFamily: BFONT, lineHeight: 1.6, fontWeight: 300 }}>
                {(userName) + " and " + (partnerName) + " are aligned on " + alignedCount + " of " + allRows.length + " areas. " + (gapCount > 0 ? "The gaps here aren't red flags. They're the conversations most couples never think to have in advance." : "That's a genuinely strong foundation, and now it's documented.")}
              </div>
            </div>
          </div>
          {/* Insight 3: how you fit */}
          <div style={{ display: "flex", gap: "1rem", alignItems: "flex-start" }}>
            <div style={{ width: 36, height: 36, borderRadius: 10, background: "#E8673A", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, fontSize: "0.8rem", fontWeight: 700, color: "white", fontFamily: BFONT }}>03</div>
            <div>
              <div style={{ fontSize: "0.82rem", fontWeight: 700, color: C.ink, marginBottom: "0.2rem", fontFamily: BFONT }}>
                {topOpportunities.length > 0
                  ? (avgGap < 1.0
                    ? "Highly compatible wiring. Your differences are features, not bugs"
                    : ("The way you each handle " + DIM_META[topOpportunities[0].dim].label.toLowerCase() + " is your most important dynamic to understand"))
                  : "You're more closely matched than most couples who take this"}
              </div>
              <div style={{ fontSize: "0.78rem", color: C.muted, fontFamily: BFONT, lineHeight: 1.6, fontWeight: 300 }}>
                {topOpportunities.length > 0
                  ? (avgGap < 1.0
                    ? ("Small differences in " + DIM_META[topOpportunities[0].dim].label.toLowerCase() + " are worth staying curious about. Not because they're problems, but because they'll show up quietly over time.")
                    : ("This difference shapes how you each read situations. Understanding it is exactly what this is for."))
                  : ((userName) + " and " + (partnerName) + " are closely matched across the board. The work now is staying curious rather than assuming you already know how the other person is wired.")}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Anniversary card — shown when pkg.hasAnniversary */}
      {anniversaryCard}

      {/* ── CONVERSATION STARTERS — drawn from their biggest gaps ── */}
      {conversationStarters}

    {/* ── POST-RESULTS: What's next + upsell ── */}
    <div style={{ marginTop: "2.5rem", borderTop: `1px solid ${C.stone}`, paddingTop: "2.5rem" }}>
      <div style={{ fontSize: "0.6rem", letterSpacing: "0.22em", textTransform: "uppercase", color: C.muted, fontFamily: BFONT, marginBottom: "1.25rem", fontWeight: 700 }}>What comes next</div>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: "1rem" }}>

        {/* Share with partner */}
        <div style={{ background: C.warm, border: `1.5px solid ${C.stone}`, borderRadius: 16, padding: "1.25rem", display: "flex", flexDirection: "column", gap: "0.6rem" }}>
          <div style={{ fontSize: "1.25rem" }}>🔗</div>
          <div style={{ fontFamily: BFONT, fontWeight: 700, fontSize: "0.88rem", color: C.ink }}>Share with {partnerName}</div>
          <p style={{ fontSize: "0.78rem", color: C.muted, lineHeight: 1.6, fontFamily: BFONT, margin: 0 }}>Send {partnerName} a link to your joint results — explore them together at your own pace.</p>
          <button onClick={() => { navigator.clipboard?.writeText(window.location.href); alert(`Link copied! Share it with ${partnerName}.`); }} style={{ marginTop: "auto", background: C.ink, color: "white", border: "none", borderRadius: 10, padding: "0.55rem 1rem", fontSize: "0.75rem", fontWeight: 700, cursor: "pointer", fontFamily: BFONT, transition: "opacity .15s" }} onMouseOver={e=>e.target.style.opacity='.8'} onMouseOut={e=>e.target.style.opacity='1'}>Copy results link →</button>
        </div>

        {/* Book LMFT upsell — show for non-premium */}
        <div style={{ background: "linear-gradient(135deg, #1a1740, #201d52)", border: "1.5px solid rgba(91,109,248,.35)", borderRadius: 16, padding: "1.25rem", display: "flex", flexDirection: "column", gap: "0.6rem", position: "relative", overflow: "hidden" }}>
          <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: "2px", background: "linear-gradient(90deg,#E8673A,#1B5FE8)" }} />
          <div style={{ fontSize: "1.25rem" }}>🧠</div>
          <div style={{ fontFamily: BFONT, fontWeight: 700, fontSize: "0.88rem", color: "white" }}>Review with a therapist</div>
          <p style={{ fontSize: "0.78rem", color: "rgba(255,255,255,.5)", lineHeight: 1.6, fontFamily: BFONT, margin: 0 }}>A licensed LMFT reviews your joint results before your session — comes prepared with observations specific to you. 60 minutes, both partners.</p>
          <div style={{ fontSize: "0.7rem", color: "rgba(255,255,255,.35)", fontFamily: BFONT }}>$175 session value · included in Premium</div>
          <a href="/offerings#pkg-premium" style={{ marginTop: "auto", display: "block", background: "rgba(232,103,58,.85)", color: "white", borderRadius: 10, padding: "0.55rem 1rem", fontSize: "0.75rem", fontWeight: 700, cursor: "pointer", fontFamily: BFONT, textDecoration: "none", textAlign: "center", transition: "background .15s" }} onMouseOver={e=>e.target.style.background='#E8673A'} onMouseOut={e=>e.target.style.background='rgba(232,103,58,.85)'}>Add LMFT session →</a>
        </div>

        {/* Workbook upsell */}
        <div style={{ background: "#FFFBF0", border: "1.5px solid rgba(245,158,11,.35)", borderRadius: 16, padding: "1.25rem", display: "flex", flexDirection: "column", gap: "0.6rem" }}>
          <div style={{ fontSize: "1.25rem" }}>📓</div>
          <div style={{ fontFamily: BFONT, fontWeight: 700, fontSize: "0.88rem", color: "#1A1208" }}>Your Personalized Workbook</div>
          <p style={{ fontSize: "0.78rem", color: "#6B5030", lineHeight: 1.6, fontFamily: BFONT, margin: 0 }}>Conversation starters, reflection activities, and guided exercises built from your specific results — the places you differ, in a format you can actually work through together.</p>
          <div style={{ fontSize: "0.7rem", color: "#B07820", fontFamily: BFONT, fontWeight: 600 }}>Digital PDF $19 · Printed &amp; shipped $39</div>
          <a href="/offerings" style={{ marginTop: "auto", display: "block", background: "#F59E0B", color: "white", borderRadius: 10, padding: "0.55rem 1rem", fontSize: "0.75rem", fontWeight: 700, cursor: "pointer", fontFamily: BFONT, textDecoration: "none", textAlign: "center" }}>Get your workbook →</a>
        </div>

      </div>
    </div>

    {/* ── HOW WAS YOUR EXPERIENCE ── */}
    <ExperienceFeedback userName={userName} />

  </div>

  );
}

// ── EXPERIENCE FEEDBACK COMPONENT ──
function ExperienceFeedback({ userName }) {
  const [phase, setPhase] = useState("idle"); // idle | form | thanks
  const [rating, setRating] = useState(null);
  const [answers, setAnswers] = useState({});
  const [submitting, setSubmitting] = useState(false);

  const questions = [
    { id: "q_clear",    label: "The results felt clear and easy to understand",       type: "scale" },
    { id: "q_accurate", label: "The results felt accurate for me personally",          type: "scale" },
    { id: "q_useful",   label: "I learned something useful about myself or my partner", type: "scale" },
    { id: "q_conv",     label: "This made me want to have a real conversation with my partner", type: "scale" },
    { id: "q_stage",    label: "Where are you in your relationship?",                  type: "choice",
      options: ["Just started dating", "In a relationship (1–3 yrs)", "Long-term (3+ yrs)", "Engaged", "Married"] },
    { id: "q_source",   label: "How did you hear about Attune?",                        type: "choice",
      options: ["Friend or partner", "Social media", "Google / search", "Gift", "Other"] },
    { id: "q_open",     label: "Anything else you'd like us to know?",                 type: "text" },
  ];

  const scaleLabels = ["Strongly disagree", "Disagree", "Neutral", "Agree", "Strongly agree"];
  const scaleColors = ["#ef4444","#f97316","#eab308","#22c55e","#10b981"];

  function handleSubmit() {
    setSubmitting(true);
    // POST to feedback API with non-PII demographic context
    const payload = {
      source: 'app_experience',
      rating,
      questionAnswers: answers,
      // Demographic context (non-PII)
      pkgType: demoPkg || 'unknown',
      exercisesComplete: [myAnswers, partAnswers].filter(a => a && Object.keys(a).length > 0).length,
      stage: answers['q_stage'] || null,
      howHeard: answers['q_source'] || null,
      message: answers['q_open'] || null,
    };
    fetch('/api/send-feedback', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    }).catch(() => {}); // non-blocking
    setTimeout(() => { setPhase("thanks"); setSubmitting(false); }, 600);
  }

  const allScaleAnswered = questions.filter(q => q.type === "scale").every(q => answers[q.id] != null);

  if (phase === "idle") {
    return (
      <div style={{ marginTop: "2.5rem", background: "linear-gradient(135deg,#0f0c29,#1d1a4e)", borderRadius: 18, padding: "2rem", textAlign: "center", position: "relative", overflow: "hidden" }}>
        <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 3, background: "linear-gradient(90deg,#E8673A,#1B5FE8)" }} />
        <div style={{ fontSize: "1.5rem", marginBottom: "0.6rem" }}>💬</div>
        <div style={{ fontFamily: HFONT, fontSize: "1.1rem", fontWeight: 700, color: "white", marginBottom: "0.4rem" }}>How was your experience?</div>
        <p style={{ fontSize: "0.78rem", color: "rgba(255,255,255,.45)", lineHeight: 1.65, marginBottom: "1.25rem", maxWidth: 400, margin: "0 auto 1.25rem" }}>Tell us how it went — it takes 2 minutes and helps us make Attune better for every couple after you.</p>
        <div style={{ display: "flex", gap: "0.75rem", justifyContent: "center", flexWrap: "wrap", marginBottom: "1rem" }}>
          {["😕 Not great","😐 It was okay","🙂 Pretty good","😍 Loved it"].map((label, i) => (
            <button key={i} onClick={() => { setRating(i); setPhase("form"); }}
              style={{ background: "rgba(255,255,255,.08)", border: "1.5px solid rgba(255,255,255,.15)", borderRadius: 10, padding: "0.55rem 1rem", fontSize: "0.8rem", color: "rgba(255,255,255,.75)", cursor: "pointer", fontFamily: BFONT, fontWeight: 500, transition: "all .15s" }}
              onMouseEnter={e => { e.currentTarget.style.background = "rgba(255,255,255,.14)"; e.currentTarget.style.borderColor = "rgba(255,255,255,.3)"; }}
              onMouseLeave={e => { e.currentTarget.style.background = "rgba(255,255,255,.08)"; e.currentTarget.style.borderColor = "rgba(255,255,255,.15)"; }}>
              {label}
            </button>
          ))}
        </div>
        <button onClick={() => setPhase("form")}
          style={{ fontSize: "0.7rem", color: "rgba(255,255,255,.3)", background: "transparent", border: "none", cursor: "pointer", fontFamily: BFONT, textDecoration: "underline" }}>
          Skip rating and give detailed feedback
        </button>
      </div>
    );
  }

  if (phase === "thanks") {
    return (
      <div style={{ marginTop: "2.5rem", background: "linear-gradient(135deg,#071a10,#0d3320)", borderRadius: 18, padding: "2rem", textAlign: "center" }}>
        <div style={{ fontSize: "1.75rem", marginBottom: "0.5rem" }}>💚</div>
        <div style={{ fontFamily: HFONT, fontSize: "1.05rem", fontWeight: 700, color: "white", marginBottom: "0.4rem" }}>Thank you{userName ? `, ${userName}` : ""}.</div>
        <p style={{ fontSize: "0.78rem", color: "rgba(255,255,255,.4)", lineHeight: 1.65 }}>Your feedback goes directly to the people building Attune. It genuinely matters.</p>
      </div>
    );
  }

  // form phase
  return (
    <div style={{ marginTop: "2.5rem", background: "white", border: `1.5px solid ${C.stone}`, borderRadius: 18, overflow: "hidden" }}>
      {/* Header */}
      <div style={{ background: "linear-gradient(135deg,#0f0c29,#1d1a4e)", padding: "1.25rem 1.5rem", position: "relative" }}>
        <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 3, background: "linear-gradient(90deg,#E8673A,#1B5FE8)" }} />
        <div style={{ fontFamily: HFONT, fontSize: "1rem", fontWeight: 700, color: "white" }}>Tell us how it was</div>
        <div style={{ fontSize: "0.72rem", color: "rgba(255,255,255,.4)", marginTop: "0.25rem", fontFamily: BFONT }}>Anonymous · 2 minutes · helps us improve Attune for everyone</div>
        {rating !== null && (
          <div style={{ marginTop: "0.6rem", display: "inline-block", background: "rgba(255,255,255,.1)", borderRadius: 8, padding: "0.3rem 0.75rem", fontSize: "0.78rem", color: "rgba(255,255,255,.7)", fontFamily: BFONT }}>
            You said: {["😕 Not great","😐 It was okay","🙂 Pretty good","😍 Loved it"][rating]}
          </div>
        )}
      </div>

      {/* Questions */}
      <div style={{ padding: "1.5rem" }}>
        {/* Scale questions */}
        <div style={{ marginBottom: "1.5rem" }}>
          <div style={{ fontSize: "0.6rem", letterSpacing: "0.18em", textTransform: "uppercase", color: C.muted, fontFamily: BFONT, fontWeight: 700, marginBottom: "1rem" }}>Rate each statement</div>
          {questions.filter(q => q.type === "scale").map(q => (
            <div key={q.id} style={{ marginBottom: "1.1rem" }}>
              <div style={{ fontSize: "0.8rem", color: C.text, fontFamily: BFONT, fontWeight: 500, marginBottom: "0.5rem", lineHeight: 1.4 }}>{q.label}</div>
              <div style={{ display: "flex", gap: "0.4rem" }}>
                {scaleLabels.map((lbl, i) => (
                  <button key={i} onClick={() => setAnswers(prev => ({ ...prev, [q.id]: i }))}
                    style={{ flex: 1, background: answers[q.id] === i ? scaleColors[i] : C.warm, border: `1.5px solid ${answers[q.id] === i ? scaleColors[i] : C.stone}`, borderRadius: 8, padding: "0.4rem 0.25rem", fontSize: "0.6rem", color: answers[q.id] === i ? "white" : C.muted, cursor: "pointer", fontFamily: BFONT, fontWeight: answers[q.id] === i ? 700 : 400, transition: "all .15s", lineHeight: 1.3 }}>
                    {lbl}
                  </button>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Choice questions */}
        {questions.filter(q => q.type === "choice").map(q => (
          <div key={q.id} style={{ marginBottom: "1.1rem" }}>
            <div style={{ fontSize: "0.8rem", color: C.text, fontFamily: BFONT, fontWeight: 500, marginBottom: "0.5rem" }}>{q.label}</div>
            <div style={{ display: "flex", gap: "0.4rem", flexWrap: "wrap" }}>
              {q.options.map(opt => (
                <button key={opt} onClick={() => setAnswers(prev => ({ ...prev, [q.id]: opt }))}
                  style={{ background: answers[q.id] === opt ? "#1B5FE8" : C.warm, border: `1.5px solid ${answers[q.id] === opt ? "#1B5FE8" : C.stone}`, borderRadius: 999, padding: "0.35rem 0.75rem", fontSize: "0.72rem", color: answers[q.id] === opt ? "white" : C.muted, cursor: "pointer", fontFamily: BFONT, fontWeight: answers[q.id] === opt ? 700 : 400, transition: "all .15s" }}>
                  {opt}
                </button>
              ))}
            </div>
          </div>
        ))}

        {/* Open text */}
        {questions.filter(q => q.type === "text").map(q => (
          <div key={q.id} style={{ marginBottom: "1.25rem" }}>
            <div style={{ fontSize: "0.8rem", color: C.text, fontFamily: BFONT, fontWeight: 500, marginBottom: "0.5rem" }}>{q.label}</div>
            <textarea
              value={answers[q.id] || ""}
              onChange={e => setAnswers(prev => ({ ...prev, [q.id]: e.target.value }))}
              placeholder="Optional — anything at all..."
              style={{ width: "100%", minHeight: 90, padding: "0.75rem", borderRadius: 10, border: `1.5px solid ${C.stone}`, fontFamily: BFONT, fontSize: "0.82rem", color: C.text, resize: "vertical", outline: "none", boxSizing: "border-box", lineHeight: 1.65 }}
              onFocus={e => e.target.style.borderColor = "#1B5FE8"}
              onBlur={e => e.target.style.borderColor = C.stone}
            />
          </div>
        ))}

        <button onClick={handleSubmit} disabled={!allScaleAnswered || submitting}
          style={{ width: "100%", background: allScaleAnswered ? "linear-gradient(135deg,#E8673A,#1B5FE8)" : C.stone, color: allScaleAnswered ? "white" : C.muted, border: "none", borderRadius: 12, padding: "0.85rem", fontSize: "0.82rem", fontWeight: 700, cursor: allScaleAnswered ? "pointer" : "default", fontFamily: BFONT, letterSpacing: "0.04em", transition: "opacity .2s" }}>
          {submitting ? "Sending..." : "Submit feedback →"}
        </button>
        <div style={{ fontSize: "0.68rem", color: C.muted, textAlign: "center", marginTop: "0.6rem", fontFamily: BFONT }}>Your feedback is anonymous and never linked to your name or email.</div>
      </div>
    </div>
  );
}

// -- PERSONALITY RESULTS --
// Per-dimension headline copy - unique per dim, 3 tiers by gap
const DIM_HEADLINES = {
  energy: [
    "You recharge the same way.",
    "Your energy rhythms are close.",
    "You each restore in your own way.",
  ],
  decision: [
    "You think through decisions the same way.",
    "Your thinking styles complement each other.",
    "You each bring a distinct perspective to decisions.",
  ],
  conflict: [
    "You move through hard moments at a similar pace.",
    "You approach hard conversations in a similar way.",
    "You each have your own pace when things get hard.",
  ],
  affection: [
    "You speak the same love language.",
    "Your ways of showing care mostly overlap.",
    "You each express and receive love in your own register.",
  ],
  planning: [
    "You're wired the same way around structure.",
    "You mostly see eye to eye on planning.",
    "One of you finds comfort in structure; the other in flexibility.",
  ],
  expressiveness: [
    "You're equally open with each other.",
    "Your comfort with sharing is closely matched.",
    "You each have your own relationship with emotional openness.",
  ],
  togetherness: [
    "You want the same balance of together and apart.",
    "Your togetherness needs are closely matched.",
    "You each have your own sense of how close to stay.",
  ],
  change: [
    "Change lands the same way for both of you.",
    "You handle uncertainty with similar ease.",
    "You each move through change at your own pace.",
  ],
};

function dimHeadline(dim, gap) {
  const tier = gap <= 1 ? 0 : gap <= 2.5 ? 1 : 2;
  return DIM_HEADLINES[dim]?.[tier] || "You each bring something distinct here.";
}

function PersonalityResults({ myAnswers, partnerAnswers, userName, partnerName }) {
  const [step, setStep] = useState(0);
  const [showRaw, setShowRaw] = useState(false);

  const myS = calcDimScores(myAnswers);
  const partS = calcDimScores(partnerAnswers);
  const feedback = generatePersonalityFeedback(myS, partS, userName, partnerName);

  // Sort by gap ascending -- most similar first (items 1 & 4, 6 & 7 use this order)
  const sortedFeedback = [...feedback].sort((a, b) => a.gap - b.gap);
  const avgGap = feedback.reduce((s, f) => s + f.gap, 0) / feedback.length;
  const pairing = overallPairingLabel(avgGap);
  const byDim = Object.fromEntries(feedback.map(f => [f.dim, f]));

  // Ordered dims follow sorted order for step navigation (item 1)
  const orderedDims = sortedFeedback.map(f => f.dim);
  const TOTAL = orderedDims.length + 4; // overview + N dims + action plan + 2 individual + summary

  const go = s => { setStep(s); const sc = document.querySelector("[data-results-scroll]"); if (sc) sc.scrollTop = 0; else window.scrollTo({ top: 0, behavior: "smooth" }); };

  const protocols = [];
  if (byDim.conflict?.isOpportunity || byDim.conflict?.isNote) protocols.push({ emoji: "", title: "Create a pause protocol", body: byDim.conflict.adviceText });
  if (byDim.affection?.isOpportunity || byDim.affection?.isNote) protocols.push({ emoji: "", title: "Ask, then revisit", body: byDim.affection.adviceText });
  if (byDim.energy?.isOpportunity || byDim.energy?.isNote) protocols.push({ emoji: "", title: "Name your needs first", body: byDim.energy.adviceText });
  if (byDim.planning?.isOpportunity || byDim.planning?.isNote) protocols.push({ emoji: "", title: "Divide domains by default", body: byDim.planning.adviceText });
  if (byDim.togetherness?.isOpportunity || byDim.togetherness?.isNote) protocols.push({ emoji: "", title: "Design your together-apart rhythm", body: byDim.togetherness.adviceText });
  if (byDim.expressiveness?.isOpportunity || byDim.expressiveness?.isNote) protocols.push({ emoji: "💭", title: "Build toward more openness", body: byDim.expressiveness.adviceText });
  if (byDim.change?.isOpportunity || byDim.change?.isNote) protocols.push({ emoji: "", title: "Navigate change as a team", body: byDim.change.adviceText });
  if (byDim.decision?.isOpportunity || byDim.decision?.isNote) protocols.push({ emoji: "", title: "Name your mode", body: byDim.decision.adviceText });
  if (protocols.length === 0) {
    protocols.push({ emoji: "", title: "Keep checking in", body: ((userName) + " and " + (partnerName) + " are closely aligned across all eight dimensions. The work here isn't about catching up. It's about staying connected. Couples who stay curious about each other's inner experience — even when things feel stable, tend to stay that way longer.") });
    protocols.push({ emoji: "", title: "Stay curious as things change", body: "When two people are this in sync, it's easy to assume the picture stays the same. But what each of you needs, values, and envisions can shift gradually. A brief intentional check-in every few months keeps you current with each other." });
    protocols.push({ emoji: "", title: "Name what's working", body: ("Most couples only talk about their relationship when something feels off. " + (userName) + " and " + (partnerName) + " have something worth naming explicitly: real alignment. Talking about what you're doing well, not just what feels hard, reinforces it.") });
  }

  const scaleLabels = ["Strongly A","Lean A","Neutral","Lean B","Strongly B"];

  // -- SIDE NAV ITEMS --
  const personalityNavItems = [
    { label: "Overview", step: 0 },
    { label: "Area Breakdown", step: "dims", endStep: orderedDims.length, isSection: true },
    ...orderedDims.map((dim, i) => ({ label: DIM_META[dim].label, step: i + 1, isChild: true })),
    { label: ((userName) + "'s Profile"), step: orderedDims.length + 1 },
    { label: ((partnerName) + "'s Profile"), step: orderedDims.length + 2 },
    { label: "Your Action Plan", step: orderedDims.length + 3 },
    { label: "Full Picture", step: orderedDims.length + 4 },
  ];

  // -- STEP 0: OVERVIEW --
  if (step === 0) return (
    <WithSideNav navItems={personalityNavItems} currentStep={step} onGo={go} accent="#E8673A">
      <ResultsSlide bg="linear-gradient(145deg, #0f0c29, #302b63, #24243e)">
      <link href={FONT_URL} rel="stylesheet" />
      <div style={{ color: "white" }}>
        {/* Header */}
        <div style={{ marginBottom: "1rem" }}>
          <div style={{ fontSize: "0.65rem", letterSpacing: "0.2em", textTransform: "uppercase", color: "rgba(255,255,255,0.4)", marginBottom: "0.5rem", fontFamily: BFONT }}>How You Communicate</div>
          <div style={{ fontSize: "clamp(1.8rem,6vw,2.8rem)", fontWeight: 700, fontFamily: HFONT, lineHeight: 1.0, marginBottom: "0.6rem" }}>{userName} & {partnerName}</div>
          <div style={{ display: "flex", alignItems: "center", gap: "0.6rem" }}>
            <div style={{ display: "inline-block", background: pairing.color, padding: "0.35rem 1rem", borderRadius: 999 }}>
              <span style={{ fontSize: "0.82rem", fontWeight: 700, fontFamily: HFONT }}>{pairing.word}</span>
            </div>
            <span style={{ fontSize: "0.78rem", color: "rgba(255,255,255,0.45)", fontFamily: BFONT, fontWeight: 300 }}>{pairing.sub}</span>
          </div>
        </div>

        {/* Item 5 — methodology blurb */}
        <div style={{ marginBottom: "1rem" }}>
          <p style={{ fontSize: "0.8rem", color: "rgba(255,255,255,0.55)", fontFamily: BFONT, fontWeight: 300, lineHeight: 1.7, margin: 0, fontStyle: "italic" }}>
            Different styles aren't signs of incompatibility — they're the material you work with. The couples who navigate differences well aren't the ones without them; they're the ones who see them clearly.
          </p>
        </div>

        {/* Ranked areas — 2x4 grid */}
        <div style={{ marginBottom: "1rem" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "0.55rem" }}>
            <span style={{ fontSize: "0.72rem", fontWeight: 600, color: "rgba(255,255,255,0.75)", fontFamily: BFONT }}>8 dimensions — where you stand</span>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0.4rem", maxWidth: 340, margin: "0 auto" }}>
            {sortedFeedback.map((f, i) => {
              const m = DIM_META[f.dim];
              const gl = gapLabel(f.gap, f.dim);
              return (
                <div key={f.dim} onClick={() => go(i + 1)}
                  style={{ display: "flex", alignItems: "center", gap: "0.5rem", padding: "0.45rem 0.6rem", borderRadius: 9, background: ((m.color) + "1e"), border: ("1px solid " + (m.color) + "55"), cursor: "pointer", transition: "background 0.15s" }}
                  onMouseEnter={e => e.currentTarget.style.background = ((m.color) + "38")}
                  onMouseLeave={e => e.currentTarget.style.background = ((m.color) + "1e")}>
                  <div style={{ width: 24, height: 24, borderRadius: "50%", background: m.color, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                    <span style={{ fontSize: "0.75rem" }}>{m.emoji}</span>
                  </div>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ fontSize: "0.68rem", fontWeight: 600, color: "rgba(255,255,255,0.88)", fontFamily: BFONT, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{m.label}</div>
                    <div style={{ fontSize: "0.6rem", color: m.color, fontFamily: BFONT, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis", opacity: 0.85 }}>{gl.text}</div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* TOC with clear value language */}
        <div style={{ borderTop: "1px solid rgba(255,255,255,0.1)", paddingTop: "1rem" }}>
          <div style={{ fontSize: "0.72rem", fontWeight: 600, color: "rgba(255,255,255,0.75)", fontFamily: BFONT, marginBottom: "0.6rem" }}>Explore the full report</div>
          <div style={{ display: "flex", flexDirection: "column", gap: "0.3rem" }}>
            {[
              { label: "Area-by-area breakdown", sub: "Deep analysis of how you each communicate across 8 areas, with what it means for your relationship", step: 1 },
              { label: ((userName) + "'s communication profile"), sub: ("How " + (userName) + " is wired, what they bring, and how to work well with " + (partnerName)), step: orderedDims.length + 1 },
              { label: ((partnerName) + "'s communication profile"), sub: ("How " + (partnerName) + " is wired, what they bring, and how to work well with " + (userName)), step: orderedDims.length + 2 },
              { label: "Couple action plan", sub: "Specific practices built from your combined results, not generic advice", step: orderedDims.length + 3 },
              { label: "Full picture", sub: "Your shared strengths, growth areas, and next moves at a glance", step: orderedDims.length + 4 },
            ].map(({ label, sub, step }) => (
              <div key={step} onClick={() => go(step)}
                style={{ display: "flex", alignItems: "center", gap: "0.75rem", padding: "0.6rem 0.75rem", borderRadius: 9, background: "rgba(255,255,255,0.05)", cursor: "pointer", transition: "all 0.15s", border: "1px solid rgba(255,255,255,0.06)" }}
                onMouseEnter={e => e.currentTarget.style.background = "rgba(255,255,255,0.1)"}
                onMouseLeave={e => e.currentTarget.style.background = "rgba(255,255,255,0.05)"}>
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: "0.8rem", fontWeight: 600, color: "rgba(255,255,255,0.85)", fontFamily: BFONT }}>{label}</div>
                  <div style={{ fontSize: "0.64rem", color: "rgba(255,255,255,0.38)", fontFamily: BFONT, marginTop: "0.1rem", lineHeight: 1.45 }}>{sub}</div>
                </div>
                <span style={{ fontSize: "1.1rem", color: "rgba(232,103,58,0.85)", fontFamily: BFONT, flexShrink: 0, lineHeight: 1 }}>→</span>
              </div>
            ))}
          </div>
        </div>
      </div>
      <NavButtons onBack={() => {}} backDisabled nextLabel="Start the Breakdown ->" onNext={() => go(1)} />
    </ResultsSlide>
    </WithSideNav>
  );

  // -- STEPS 1-N: ONE DIMENSION PER SCREEN (sorted order) --
  if (step >= 1 && step <= orderedDims.length) {
    const dim = orderedDims[step - 1];
    const f = byDim[dim];
    const m = DIM_META[dim];
    const headline = dimHeadline(dim, f.gap); // unique per dim + gap tier (items 3 & 4)
    const isLast = step === orderedDims.length;
    const nextDim = orderedDims[step]; // next in sorted order

    return (
    <WithSideNav navItems={personalityNavItems} currentStep={step} onGo={go} accent="#E8673A">
      <ResultsSlide bg={"linear-gradient(145deg, " + m.dark + "ee, " + m.dark + "cc, #1a1a2e)"}>
        <link href={FONT_URL} rel="stylesheet" />
        {/* Dim label only — no badge chip (item 4: merged into headline) */}
        <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", marginBottom: "0.75rem" }}>
          <div style={{ width: 36, height: 36, borderRadius: 10, background: ((m.color) + "40"), border: ("1px solid " + (m.color) + "80"), display: "flex", alignItems: "center", justifyContent: "center", fontSize: "1.2rem" }}>{m.emoji}</div>
          <div style={{ fontSize: "0.62rem", textTransform: "uppercase", letterSpacing: "0.15em", color: ((m.color) + "cc"), fontWeight: 700, fontFamily: BFONT }}>{m.label}</div>
          <div style={{ marginLeft: "auto", fontSize: "0.68rem", color: "rgba(255,255,255,0.3)", fontFamily: BFONT }}>{step} of {orderedDims.length}</div>
        </div>
        <div style={{ fontSize: "clamp(1.5rem,5vw,2rem)", fontWeight: 700, color: "white", lineHeight: 1.1, marginBottom: "1.25rem", fontFamily: HFONT }}>{headline}</div>

        {/* Track */}
        <div style={{ background: "rgba(255,255,255,0.08)", borderRadius: 14, padding: "1.25rem 1.5rem", marginBottom: "1rem", border: "1px solid rgba(255,255,255,0.12)" }}>
          <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "0.1rem" }}>
            <span style={{ fontSize: "0.7rem", fontWeight: 600, color: "rgba(255,255,255,0.5)", fontFamily: BFONT }}>{m.ends[0]}</span>
            <span style={{ fontSize: "0.7rem", fontWeight: 600, color: "rgba(255,255,255,0.5)", fontFamily: BFONT }}>{m.ends[1]}</span>
          </div>
          <DimTrackViz myScore={myS[dim]} theirScore={partS[dim]} color={m.color} userName={userName} partnerName={partnerName} />
        </div>

        {/* What this means */}
        {(f.strengthText || f.insightText) && (
          <div style={{ background: "rgba(255,255,255,0.07)", borderRadius: 14, padding: "1.25rem 1.5rem", marginBottom: "1rem", border: "1px solid rgba(255,255,255,0.1)" }}>
            <p style={{ fontSize: "0.87rem", color: "rgba(255,255,255,0.82)", lineHeight: 1.78, margin: 0, fontFamily: BFONT, fontWeight: 300 }}>{f.strengthText || f.insightText}</p>
          </div>
        )}

        {/* Try this / Keep this in mind */}
        {f.adviceText && (
          <div style={{ background: (m.color + (f.isStrength ? "28" : "45")), borderRadius: 14, padding: "1.25rem 1.5rem", border: ("1px solid " + (m.color) + (f.isStrength ? "50" : "80")) }}>
            <div style={{ fontSize: "0.62rem", textTransform: "uppercase", letterSpacing: "0.12em", color: "rgba(255,255,255,0.65)", fontWeight: 700, marginBottom: "0.5rem", fontFamily: BFONT }}>{f.isStrength ? "Worth protecting" : "One shift that helps"}</div>
            <p style={{ fontSize: "0.87rem", color: "rgba(255,255,255,0.9)", lineHeight: 1.78, margin: 0, fontFamily: BFONT, fontWeight: f.isStrength ? 300 : 400 }}>{f.adviceText}</p>
          </div>
        )}

        <NavButtons
          onBack={() => go(step - 1)}
          onNext={() => go(step + 1)}
          nextLabel={isLast ? ((userName) + "'s Profile ->") : ((DIM_META[nextDim]?.label) + " →")}
        />
      </ResultsSlide>
    </WithSideNav>
    );
  }

  // -- ACTION PLAN (now step N+3) --
  if (step === orderedDims.length + 3) return (
    <WithSideNav navItems={personalityNavItems} currentStep={step} onGo={go} accent="#E8673A">
      <ResultsSlide bg="linear-gradient(145deg, #1a0d00, #2d1a06, #1e1535)">
      <link href={FONT_URL} rel="stylesheet" />
      <div style={{ fontSize: "0.65rem", textTransform: "uppercase", letterSpacing: "0.18em", color: "rgba(255,168,50,0.8)", fontWeight: 700, marginBottom: "0.4rem", fontFamily: BFONT }}>Couple Action Plan</div>
      <div style={{ fontSize: "clamp(1.6rem,5vw,2.2rem)", fontWeight: 700, color: "white", lineHeight: 1.1, marginBottom: "0.6rem", fontFamily: HFONT }}>{protocols[0]?.title === "Keep checking in" ? "Remarkably well matched." : "Built from your answers."}</div>
      <p style={{ fontSize: "0.85rem", color: "rgba(255,255,255,0.55)", marginBottom: "1.75rem", lineHeight: 1.7, fontFamily: BFONT, fontWeight: 300 }}>{protocols[0]?.title === "Keep checking in" ? ((userName) + " and " + (partnerName) + " are closely aligned across all eight communication dimensions. That's genuinely rare, and worth knowing.") : "These aren't generic tips. Each one comes directly from where your answers differd. The specific places worth a shift."}</p>
      <div style={{ display: "flex", flexDirection: "column", gap: "0.85rem", marginBottom: "0.5rem" }}>
        {protocols.map((p, i) => (
          <div key={i} style={{ background: "rgba(255,255,255,0.07)", borderRadius: 16, padding: "1.1rem 1.4rem", border: "1px solid rgba(255,255,255,0.1)", display: "flex", gap: "1rem", alignItems: "flex-start" }}>
            <div style={{ fontSize: "1.5rem", flexShrink: 0, marginTop: "0.1rem" }}>{p.emoji}</div>
            <div>
              <div style={{ fontSize: "0.88rem", fontWeight: 700, color: "rgba(255,200,100,0.95)", marginBottom: "0.3rem", fontFamily: BFONT }}>{p.title}</div>
              <div style={{ fontSize: "0.82rem", color: "rgba(255,255,255,0.72)", lineHeight: 1.72, fontFamily: BFONT, fontWeight: 300 }}>{p.body}</div>
            </div>
          </div>
        ))}
      </div>
      <NavButtons onBack={() => go(step - 1)} onNext={() => go(step + 1)} nextLabel="See the Full Picture →" />

      {/* Add-ons row */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0.75rem", marginTop: "1.25rem" }}>
        <div style={{ background: "rgba(245,158,11,.13)", border: "1px solid rgba(245,158,11,.3)", borderRadius: 14, padding: "1rem" }}>
          <div style={{ fontSize: "1.1rem", marginBottom: "0.4rem" }}>📓</div>
          <div style={{ fontSize: "0.82rem", fontWeight: 700, color: "rgba(255,210,90,1)", marginBottom: "0.3rem", fontFamily: BFONT }}>Personalized Workbook</div>
          <p style={{ fontSize: "0.72rem", color: "rgba(255,255,255,.82)", lineHeight: 1.6, fontFamily: BFONT, margin: "0 0 0.6rem" }}>Guided exercises and conversation prompts built directly from these action items.</p>
          <a href="/offerings" style={{ fontSize: "0.7rem", color: "#FCD34D", fontFamily: BFONT, fontWeight: 700, textDecoration: "none" }}>Get the workbook →</a>
        </div>
        <div style={{ background: "rgba(91,109,248,.08)", border: "1px solid rgba(91,109,248,.25)", borderRadius: 14, padding: "1rem" }}>
          <div style={{ fontSize: "1.1rem", marginBottom: "0.4rem" }}>🧠</div>
          <div style={{ fontSize: "0.82rem", fontWeight: 700, color: "rgba(160,170,255,.95)", marginBottom: "0.3rem", fontFamily: BFONT }}>LMFT Session</div>
          <p style={{ fontSize: "0.72rem", color: "rgba(255,255,255,.5)", lineHeight: 1.6, fontFamily: BFONT, margin: "0 0 0.6rem" }}>A licensed therapist reviews your results and joins you for a 60-min session built around exactly this.</p>
          <a href="/offerings#pkg-premium" style={{ fontSize: "0.7rem", color: "#818CF8", fontFamily: BFONT, fontWeight: 700, textDecoration: "none" }}>Learn more →</a>
        </div>
      </div>
    </ResultsSlide>
    </WithSideNav>
  );

  // -- INDIVIDUAL PAGES (now steps N+1 and N+2) --
  if (step === orderedDims.length + 1 || step === orderedDims.length + 2) {
    const isMyPage = step === orderedDims.length + 1;
    const personName = isMyPage ? userName : partnerName;
    const personAnswers = isMyPage ? myAnswers : partnerAnswers;
    const partnerAnswersForPage = isMyPage ? partnerAnswers : myAnswers;
    const myType = deriveType(personAnswers);
    const theirType = deriveType(partnerAnswersForPage);
    const myProfile = TYPE_PROFILES[myType] || TYPE_PROFILES["INFP"];
    const practice = getTypePractice(myType, theirType);
    const partnerProfile = TYPE_PROFILES[theirType] || TYPE_PROFILES["INFP"];
    const pageColor = isMyPage ? "#E8673A" : "#3B5BDB";
    const pageBg = isMyPage ? "linear-gradient(145deg, #0d1a33, #1a2d50, #0f1e38)" : "linear-gradient(145deg, #150b2e, #261548, #150b2e)";

    // Dims where this person is the outlier (their score far from neutral)
    const personScores = isMyPage ? myS : partS;
    const partnerScores = isMyPage ? partS : myS;
    const distinctDims = DIMS.filter(d => Math.abs(personScores[d] - 3) >= 1.5)
      .sort((a,b) => Math.abs(personScores[b]-3) - Math.abs(personScores[a]-3))
      .slice(0,3);

    return (
    <WithSideNav navItems={personalityNavItems} currentStep={step} onGo={go} accent="#E8673A">
      <ResultsSlide bg={pageBg}>
        <link href={FONT_URL} rel="stylesheet" />
        <div style={{ color: "white" }}>
          {/* Header */}
          <div style={{ marginBottom: "1.75rem" }}>
            <div style={{ fontSize: "0.68rem", textTransform: "uppercase", letterSpacing: "0.2em", color: "rgba(255,255,255,0.4)", marginBottom: "0.5rem", fontFamily: BFONT }}>Communication Profile</div>
            <div style={{ fontSize: "clamp(1.8rem,6vw,2.8rem)", fontWeight: 700, fontFamily: HFONT, lineHeight: 1.05, marginBottom: "0.5rem" }}>{personName}</div>

          </div>

          {/* With [partner] specifically — FIRST, most valuable */}
          <div style={{ background: ((pageColor) + "18"), borderRadius: 16, padding: "1.25rem", marginBottom: "0.85rem", border: ("1px solid " + (pageColor) + "40") }}>
            <div style={{ fontSize: "0.62rem", textTransform: "uppercase", letterSpacing: "0.15em", color: pageColor, fontWeight: 700, marginBottom: "0.5rem", fontFamily: BFONT }}>With {isMyPage ? partnerName : userName} specifically</div>
            <p style={{ fontSize: "0.88rem", color: "rgba(255,255,255,0.88)", fontFamily: BFONT, fontWeight: 400, lineHeight: 1.72, margin: 0 }}>{practice}</p>
          </div>

          {/* Strengths you bring */}
          <div style={{ background: "rgba(255,255,255,0.06)", borderRadius: 16, padding: "1.25rem", marginBottom: "0.85rem", border: ("1px solid " + (pageColor) + "20") }}>
            <div style={{ fontSize: "0.62rem", textTransform: "uppercase", letterSpacing: "0.15em", color: pageColor, fontWeight: 700, marginBottom: "0.75rem", fontFamily: BFONT }}>* What you bring to this relationship</div>
            <p style={{ fontSize: "0.78rem", color: "rgba(255,255,255,0.5)", fontFamily: BFONT, fontWeight: 300, marginBottom: "0.85rem", fontStyle: "italic" }}>{myProfile.tag}</p>
            {myProfile.strengths.map((s, i) => (
              <div key={i} style={{ display: "flex", gap: "0.65rem", marginBottom: i < myProfile.strengths.length - 1 ? "0.55rem" : 0 }}>
                <span style={{ color: pageColor, flexShrink: 0, fontSize: "0.9rem" }}>→</span>
                <span style={{ fontSize: "0.84rem", color: "rgba(255,255,255,0.85)", fontFamily: BFONT, lineHeight: 1.5 }}>{s}</span>
              </div>
            ))}
          </div>

          {/* Blind spot */}
          <div style={{ background: "rgba(255,255,255,0.04)", borderRadius: 16, padding: "1.1rem 1.25rem", marginBottom: "0.85rem", borderLeft: "3px solid rgba(255,152,0,0.6)" }}>
            <div style={{ fontSize: "0.62rem", textTransform: "uppercase", letterSpacing: "0.15em", color: "#FFA726", fontWeight: 700, marginBottom: "0.4rem", fontFamily: BFONT }}>Worth knowing about yourself</div>
            <p style={{ fontSize: "0.84rem", color: "rgba(255,255,255,0.7)", fontFamily: BFONT, fontWeight: 300, lineHeight: 1.65, margin: 0 }}>{myProfile.blind}</p>
          </div>

          {/* Standout traits */}
          {distinctDims.length > 0 && (
            <div style={{ background: "rgba(255,255,255,0.04)", borderRadius: 16, padding: "1.1rem 1.25rem" }}>
              <div style={{ fontSize: "0.62rem", textTransform: "uppercase", letterSpacing: "0.15em", color: "rgba(255,255,255,0.4)", fontWeight: 700, marginBottom: "0.65rem", fontFamily: BFONT }}>Your strongest orientations</div>
              {distinctDims.map(d => {
                const m = DIM_META[d];
                const score = personScores[d];
                const label = score < 3 ? m.ends[0] : m.ends[1];
                return (
                  <div key={d} style={{ display: "flex", alignItems: "center", gap: "0.65rem", marginBottom: "0.45rem" }}>
                    <span style={{ fontSize: "1rem" }}>{m.emoji}</span>
                    <span style={{ fontSize: "0.82rem", color: "rgba(255,255,255,0.75)", fontFamily: BFONT, fontWeight: 500 }}>{m.label}</span>
                    <span style={{ fontSize: "0.72rem", color: m.color, fontFamily: BFONT, marginLeft: "auto" }}>{label}</span>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        <NavButtons
          onBack={() => go(step - 1)}
          onNext={() => go(step + 1)}
          nextLabel={isMyPage ? ((partnerName) + "'s Profile ->") : "Couple Action Plan →"}
        />
      </ResultsSlide>
    </WithSideNav>
    );
  }

  // -- SUMMARY -- dark navy, mirrors overview --
  const coupleStrengths = sortedFeedback.filter(f => f.gap <= 1);
  const coupleGrowth = sortedFeedback.filter(f => f.gap > 1);

  // Each person's most distinct orientation (furthest from 3 = neutral)
  const myStrongest = [...DIMS].sort((a,b) => Math.abs(myS[b]-3) - Math.abs(myS[a]-3))[0];
  const partnerStrongest = [...DIMS].sort((a,b) => Math.abs(partS[b]-3) - Math.abs(partS[a]-3))[0];
  const myOrientation = myS[myStrongest] < 3 ? DIM_META[myStrongest].ends[0] : DIM_META[myStrongest].ends[1];
  const partnerOrientation = partS[partnerStrongest] < 3 ? DIM_META[partnerStrongest].ends[0] : DIM_META[partnerStrongest].ends[1];

  return (
    <WithSideNav navItems={personalityNavItems} currentStep={step} onGo={go} accent="#E8673A">
      <ResultsSlide bg="linear-gradient(145deg, #0f0c29, #302b63, #24243e)">
      <link href={FONT_URL} rel="stylesheet" />
      <div style={{ color: "white" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", marginBottom: "1rem" }}>
          <div style={{ flex: 1 }}>
            <div style={{ fontSize: "0.65rem", letterSpacing: "0.2em", textTransform: "uppercase", color: "rgba(255,255,255,0.4)", marginBottom: "0.3rem", fontFamily: BFONT }}>How You Work as a Couple</div>
            <div style={{ fontSize: "clamp(1.6rem,5vw,2.2rem)", fontWeight: 700, fontFamily: HFONT, lineHeight: 1.0 }}>{userName} & {partnerName}</div>
          </div>
          <div style={{ background: pairing.color, padding: "0.35rem 0.9rem", borderRadius: 999, flexShrink: 0 }}>
            <span style={{ fontSize: "0.78rem", fontWeight: 700, fontFamily: HFONT }}>{pairing.word}</span>
          </div>
        </div>

        {/* Strengths — green tinted tiles */}
        {coupleStrengths.length > 0 && (
          <div style={{ background: "rgba(76,175,80,0.12)", borderRadius: 16, padding: "1.1rem 1.25rem", marginBottom: "0.75rem", border: "1px solid rgba(76,175,80,0.25)" }}>
            <div style={{ fontSize: "0.62rem", letterSpacing: "0.15em", textTransform: "uppercase", color: "#66BB6A", fontWeight: 700, marginBottom: "0.85rem", fontFamily: BFONT }}>* Your shared strengths</div>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0.5rem" }}>
              {coupleStrengths.map(f => {
                const m = DIM_META[f.dim];
                return (
                  <div key={f.dim} onClick={() => go(sortedFeedback.indexOf(f) + 1)}
                    style={{ background: "rgba(255,255,255,0.07)", borderRadius: 10, padding: "0.75rem 0.85rem", cursor: "pointer", transition: "background 0.15s" }}
                    onMouseEnter={e => e.currentTarget.style.background = "rgba(255,255,255,0.14)"}
                    onMouseLeave={e => e.currentTarget.style.background = "rgba(255,255,255,0.07)"}>
                    <div style={{ fontSize: "1.1rem", marginBottom: "0.25rem" }}>{m.emoji}</div>
                    <div style={{ fontSize: "0.72rem", fontWeight: 700, color: "white", fontFamily: BFONT, lineHeight: 1.2, marginBottom: "0.2rem" }}>{m.label}</div>
                    <div style={{ fontSize: "0.65rem", color: "#66BB6A", fontFamily: BFONT, lineHeight: 1.35 }}>{dimHeadline(f.dim, f.gap)}</div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* Growth — amber tinted tiles */}
        {coupleGrowth.length > 0 && (
          <div style={{ background: "rgba(255,152,0,0.1)", borderRadius: 16, padding: "1.1rem 1.25rem", marginBottom: "0.75rem", border: "1px solid rgba(255,152,0,0.2)" }}>
            <div style={{ fontSize: "0.62rem", letterSpacing: "0.15em", textTransform: "uppercase", color: "#FFA726", fontWeight: 700, marginBottom: "0.85rem", fontFamily: BFONT }}>* Where you can grow</div>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0.5rem" }}>
              {coupleGrowth.map(f => {
                const m = DIM_META[f.dim];
                const matchingProtocol = protocols.find(p => {
                  const dimToProtocol = { conflict: "pause protocol", affection: "Ask, then revisit", energy: "Name your needs", planning: "Divide domains", togetherness: "together-apart", expressiveness: "openness gap", change: "Navigate change", decision: "Name your mode" };
                  return p.title.toLowerCase().includes((dimToProtocol[f.dim] || "").toLowerCase());
                });
                const tipText = matchingProtocol ? matchingProtocol.body.split('.')[0] + '.' : dimHeadline(f.dim, f.gap);
                return (
                  <div key={f.dim} onClick={() => go(sortedFeedback.indexOf(f) + 1)}
                    style={{ background: "rgba(255,255,255,0.07)", borderRadius: 10, padding: "0.75rem 0.85rem", cursor: "pointer", transition: "background 0.15s" }}
                    onMouseEnter={e => e.currentTarget.style.background = "rgba(255,255,255,0.14)"}
                    onMouseLeave={e => e.currentTarget.style.background = "rgba(255,255,255,0.07)"}>
                    <div style={{ fontSize: "1.1rem", marginBottom: "0.25rem" }}>{m.emoji}</div>
                    <div style={{ fontSize: "0.72rem", fontWeight: 700, color: "white", fontFamily: BFONT, lineHeight: 1.2, marginBottom: "0.3rem" }}>{m.label}</div>
                    <div style={{ fontSize: "0.63rem", color: "#FFA726", fontFamily: BFONT, lineHeight: 1.45 }}>{tipText}</div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* Individual profiles — 2 & 4: clear label, clickable */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0.6rem", marginBottom: "0.75rem" }}>
          {[[userName, myStrongest, myOrientation, myS, "#2196F3"],[partnerName, partnerStrongest, partnerOrientation, partS, "#9C27B0"]].map(([name, strongDim, orient, scores, color]) => (
            <div key={name}
              onClick={() => go(sortedFeedback.indexOf(sortedFeedback.find(f => f.dim === strongDim)) + 1)}
              style={{ background: "rgba(255,255,255,0.07)", borderRadius: 14, padding: "1rem", cursor: "pointer", transition: "background 0.15s" }}
              onMouseEnter={e => e.currentTarget.style.background = "rgba(255,255,255,0.13)"}
              onMouseLeave={e => e.currentTarget.style.background = "rgba(255,255,255,0.07)"}>
              <div style={{ fontSize: "0.65rem", textTransform: "uppercase", letterSpacing: "0.1em", color, fontWeight: 700, marginBottom: "0.5rem", fontFamily: BFONT }}>{name}</div>
              <div style={{ fontSize: "1.3rem", marginBottom: "0.25rem" }}>{DIM_META[strongDim].emoji}</div>
              <div style={{ fontSize: "0.75rem", fontWeight: 700, color: "white", fontFamily: BFONT, lineHeight: 1.25, marginBottom: "0.15rem" }}>{orient}</div>
            </div>
          ))}
        </div>

        {/* Action plan strip */}
        <div style={{ background: "rgba(255,255,255,0.05)", borderRadius: 14, padding: "1rem 1.25rem" }}>
          <div style={{ fontSize: "0.62rem", textTransform: "uppercase", letterSpacing: "0.12em", color: "rgba(255,255,255,0.4)", fontWeight: 700, marginBottom: "0.6rem", fontFamily: BFONT }}>Your next moves</div>
          {protocols.slice(0,3).map((p, i) => (
            <div key={i} style={{ display: "flex", alignItems: "center", gap: "0.6rem", marginBottom: i < protocols.slice(0,3).length - 1 ? "0.5rem" : 0 }}>
              <span style={{ fontSize: "1rem", flexShrink: 0 }}>{p.emoji}</span>
              <span style={{ fontSize: "0.8rem", color: "rgba(255,255,255,0.75)", fontFamily: BFONT, fontWeight: 500 }}>{p.title}</span>
            </div>
          ))}
          {protocols.length > 3 && <div style={{ fontSize: "0.7rem", color: "rgba(255,255,255,0.3)", marginTop: "0.5rem", fontFamily: BFONT }}>+ {protocols.length - 3} more in your action plan</div>}
        </div>
      </div>

      {/* Raw responses */}
      <div style={{ border: "1px solid rgba(255,255,255,0.1)", borderRadius: 14, overflow: "hidden", marginTop: "1rem" }}>
        <button onClick={() => setShowRaw(s => !s)} style={{ width: "100%", background: "rgba(255,255,255,0.05)", border: "none", padding: "1rem 1.4rem", display: "flex", justifyContent: "space-between", alignItems: "center", cursor: "pointer", fontFamily: BFONT }}>
          <span style={{ fontSize: "0.8rem", fontWeight: 600, color: "rgba(255,255,255,0.6)" }}>Individual responses</span>
          <span style={{ fontSize: "0.85rem", color: "rgba(255,255,255,0.4)", fontWeight: 700 }}>{showRaw ? "^" : "v"}</span>
        </button>
        {showRaw && (
          <div style={{ background: "rgba(255,255,255,0.03)", padding: "0 1.4rem 1.4rem" }}>
            {PERSONALITY_QUESTIONS.map(q => {
              const myV = myAnswers[q.id], theirV = partnerAnswers[q.id];
              const m = DIM_META[q.dimension];
              return (
                <div key={q.id} style={{ borderBottom: "1px solid rgba(255,255,255,0.06)", padding: "0.9rem 0" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: "0.4rem", marginBottom: "0.5rem" }}>
                    <span style={{ fontSize: "0.8rem" }}>{m.emoji}</span>
                    <p style={{ fontSize: "0.8rem", color: "rgba(255,255,255,0.6)", margin: 0, lineHeight: 1.45, fontFamily: BFONT }}>{q.text}</p>
                  </div>
                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0.5rem" }}>
                    {[[userName, myV, "rgba(255,255,255,0.08)"],[partnerName, theirV, "rgba(255,255,255,0.05)"]].map(([name, v, bg]) => (
                      <div key={name} style={{ background: bg, padding: "0.55rem 0.8rem", borderRadius: 8 }}>
                        <p style={{ fontSize: "0.6rem", textTransform: "uppercase", letterSpacing: "0.1em", color: "rgba(255,255,255,0.35)", marginBottom: "0.2rem", fontFamily: BFONT }}>{name}</p>
                        <p style={{ fontSize: "0.75rem", color: "rgba(255,255,255,0.85)", fontWeight: 500, fontFamily: BFONT, lineHeight: 1.4 }}>{v ? (v <= 2 ? ("A — " + (q.a.split(" — ")[0] || q.a.substring(0,40)) + "...") : v === 3 ? "Neutral" : ("B — " + (q.b.split(" — ")[0] || q.b.substring(0,40)) + "...")) : " — "}</p>
                      </div>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
      <NavButtons onBack={() => go(step - 1)} onNext={() => {}} nextLabel="Done" nextDisabled />
    </ResultsSlide>
    </WithSideNav>
  );
}


// -- EXPECTATIONS// -- EXPECTATIONS RESULTS -- VISUAL FLOW --
const EXP_CAT_COLORS = ["#2196F3","#FF9800","#E91E63","#9C27B0","#4CAF50","#FF5722","#00BCD4","#795548","#FFC107","#3F51B5"];
const EXP_CAT_BGS    = ["#E8F4FD","#FFF3E0","#FCE4EC","#F3E5F5","#E8F5E9","#FBE9E7","#E0F7FA","#EFEBE9","#FFFDE7","#E8EAF6"];

// Category importance weight -- higher = more significant conversations (item 8)
const CAT_WEIGHT = {
  "Intimacy": 5, "Parenting": 5, "Career": 4, "Extended Family": 4,
  "Money Values": 4, "Finances": 3, "Social Life": 3,
  "Family Life": 2, "Home": 2, "Health": 2,
};

// Unique origin context per gap -- avoids repeated phrases (item 12)
function buildOriginNote(g, userName, partnerName, gapIdx) {
  return null; // Origin tracking removed from simplified exercise
}
function ExpectationsResults({ myAnswers, partnerAnswers, userName, partnerName }) {
  const [step, setStep] = useState(0);
  const [catStep, setCatStep] = useState(0); // which category we're on in conversations
  const [showRaw, setShowRaw] = useState(false);
  const [gapInCatIdx, setGapInCatIdx] = useState(-1);

  const rows = [];
  RESPONSIBILITY_CATEGORIES.forEach(cat => {
    cat.items.forEach(item => {
      const key = ((cat.id) + "__" + (item));
      const mine = myAnswers.responsibilities?.[key];
      const theirs = partnerAnswers.responsibilities?.[key];
      if (!mine || !theirs) return;
      rows.push({ category: cat.label, catId: cat.id, item, mine, theirs, aligned: mine === theirs });
    });
  });
  // Resolve "Partner A/B" to actual names for display
  const resolveLabel = (val) => {
    if (!val) return val;
    if (val === "Partner A") return userName;
    if (val === "Partner B") return partnerName;
    return val;
  };

    const lifeRows = LIFE_QUESTIONS.map(q => ({
    category: q.category, item: q.text,
    mine: myAnswers.life?.[q.id], theirs: partnerAnswers.life?.[q.id],
    aligned: myAnswers.life?.[q.id] === partnerAnswers.life?.[q.id],
  })).filter(r => r.mine && r.theirs);

  const allRows = [...rows, ...lifeRows];
  const gaps = allRows.filter(r => !r.aligned);
  const aligned = allRows.filter(r => r.aligned);
  const catNames = [...new Set(allRows.map(r => r.category))];
  const catColorMap = Object.fromEntries(catNames.map((cat, i) => [cat, { color: EXP_CAT_COLORS[i % EXP_CAT_COLORS.length], bg: EXP_CAT_BGS[i % EXP_CAT_BGS.length] }]));

  // Category stats -- sorted by weight x gap density (item 8: most important first)
  const catStats = catNames.map(cat => {
    const cr = allRows.filter(r => r.category === cat);
    const cg = cr.filter(r => !r.aligned);
    const pct = cr.length ? cg.length / cr.length : 0;
    const weight = CAT_WEIGHT[cat] || 2;
    return { cat, total: cr.length, gaps: cg.length, pct, score: pct * weight, ...catColorMap[cat] };
  });
  const catStatsAligned = [...catStats].sort((a,b) => b.pct - a.pct); // conversations: most gaps first
  const catStatsCommon  = [...catStats].sort((a,b) => (b.total - b.gaps) - (a.total - a.gaps)); // common: most aligned first (item 10)

  // Gap categories with actual gaps, sorted by importance x density (item 8)
  const gapCats = catStatsAligned.filter(c => c.gaps > 0);
  // Bucket: "similar mindset" = pct < 0.3, "conversations worth having" = pct >= 0.3 (item 8)
  const similarMindsetCats = catStatsAligned.filter(c => c.gaps > 0 && c.pct < 0.3);
  const conversationCats   = catStatsAligned.filter(c => c.pct >= 0.3);
  const fullyAlignedCats   = catStatsAligned.filter(c => c.gaps === 0);

  // Flat gap list for conversations, sorted by category importance then within cat
  const sortedGaps = gapCats.flatMap(cs => gaps.filter(g => g.category === cs.cat));

  // (catStep drives step 3 navigation)

  const STEPS = 5;
  const go = s => { setStep(s); setCatStep(0); const sc = document.querySelector("[data-results-scroll]"); if (sc) sc.scrollTop = 0; else window.scrollTo({ top: 0, behavior: "smooth" }); };

  const expGoWithCat = (stepNum, catIdx) => { setCatStep(catIdx); setStep(stepNum); window.scrollTo({ top: 0, behavior: "smooth" }); };

  // -- EXPECTATIONS SIDE NAV ITEMS --
  const expectationsNavItems = [
    { label: "Overview", step: 0 },
    { label: "Common Ground", step: 1, sub: ((aligned.length) + " areas in sync") },
    ...(gapCats.length > 0 ? [
      { label: "Conversations", step: "convos-section", isSection: true },
      ...gapCats.map((cs, i) => ({ label: cs.cat, step: ("convo-" + (i)), isChild: true, onClick: () => expGoWithCat(3, i) })),
    ] : []),
    { label: "Summary", step: 4 },
  ];

  // -- STEP 0: OVERVIEW (item 8 -- no score feel) --
  if (step === 0) {
    const hasManyConvos = conversationCats.length >= 2;
    const hasSomeSimilar = similarMindsetCats.length >= 1;
    return (
    <WithSideNav navItems={expectationsNavItems} currentStep={step} onGo={go} accent="#1B5FE8">
      <ResultsSlide bg="linear-gradient(145deg, #0f0c29, #302b63, #24243e)">
        <link href={FONT_URL} rel="stylesheet" />
        <div style={{ color: "white" }}>
          <div style={{ marginBottom: "1.5rem" }}>
            <div style={{ fontSize: "0.65rem", letterSpacing: "0.2em", textTransform: "uppercase", color: "rgba(255,255,255,0.4)", marginBottom: "0.75rem", fontFamily: BFONT }}>What You Expect</div>
            <div style={{ fontSize: "clamp(2rem,7vw,3.2rem)", fontWeight: 700, fontFamily: HFONT, lineHeight: 1.05, marginBottom: "0.75rem" }}>{userName} & {partnerName}</div>
            <p style={{ fontSize: "0.85rem", color: "rgba(255,255,255,0.55)", fontFamily: BFONT, fontWeight: 300, lineHeight: 1.65, maxWidth: 340, margin: "0 auto 1.5rem" }}>
              {hasManyConvos
                ? "Unspoken expectations are behind most relationship tension, not incompatibility. You share real common ground. And where you differ? Those are exactly the conversations worth having now, when they're easy, not later when life makes them harder to talk about."
                : hasSomeSimilar
                ? "Most couples never discuss these things until they have to. You're getting ahead of it. A few areas are worth a real conversation. Doing it now, while everything is open, is how you build a relationship on a solid foundation."
                : "You're starting from a genuinely strong foundation. The conversations ahead of you aren't about what's missing. They're about building something intentional together, while it's easy."}
            </p>
          </div>

          {/* TOC — three sections, each clickable */}
          <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>

            {/* Section 1: Common Ground */}
            <div onClick={() => go(1)}
              style={{ background: "rgba(76,175,80,0.12)", border: "1px solid rgba(76,175,80,0.25)", borderRadius: 14, padding: "1rem 1.1rem", cursor: "pointer", transition: "background 0.15s" }}
              onMouseEnter={e => e.currentTarget.style.background = "rgba(76,175,80,0.2)"}
              onMouseLeave={e => e.currentTarget.style.background = "rgba(76,175,80,0.12)"}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "0.5rem" }}>
                <span style={{ fontSize: "0.62rem", letterSpacing: "0.15em", textTransform: "uppercase", color: "#66BB6A", fontWeight: 700, fontFamily: BFONT }}>* Common Ground</span>
                <span style={{ fontSize: "1.1rem", color: "rgba(255,255,255,0.5)", fontFamily: BFONT, lineHeight: 1 }}>→</span>
              </div>
              <div style={{ fontSize: "0.82rem", color: "rgba(255,255,255,0.8)", fontFamily: BFONT, marginBottom: "0.5rem" }}>{aligned.length} things you already agree on</div>
              <div style={{ display: "flex", flexWrap: "wrap", gap: "0.35rem" }}>
                {[...fullyAlignedCats, ...similarMindsetCats].map(cs => (
                  <span key={cs.cat} style={{ fontSize: "0.65rem", color: "#66BB6A", fontFamily: BFONT, background: "rgba(76,175,80,0.15)", borderRadius: 999, padding: "0.15rem 0.5rem" }}>{cs.cat}</span>
                ))}
              </div>
            </div>

            {/* Section 2: Conversations Worth Having — one row per category, clickable to that category */}
            {gapCats.length > 0 && (
              <div style={{ background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.1)", borderRadius: 14, padding: "1rem 1.1rem" }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "0.75rem" }}>
                  <span style={{ fontSize: "0.62rem", letterSpacing: "0.15em", textTransform: "uppercase", color: "#FF9800", fontWeight: 700, fontFamily: BFONT }}>* Conversations Worth Having</span>
                  <span style={{ fontSize: "0.68rem", color: "rgba(255,255,255,0.3)", fontFamily: BFONT }}>{sortedGaps.length} total</span>
                </div>
                <div style={{ display: "flex", flexDirection: "column", gap: "0.35rem" }}>
                  {gapCats.map((cs, i) => (
                    <div key={cs.cat}
                      onClick={e => { e.stopPropagation(); setCatStep(i); setStep(3); const _sc=document.querySelector("[data-results-scroll]");if(_sc)_sc.scrollTop=0;else window.scrollTo({top:0}); }}
                      style={{ display: "flex", alignItems: "center", gap: "0.75rem", padding: "0.55rem 0.75rem", borderRadius: 9, background: "rgba(255,255,255,0.05)", cursor: "pointer", transition: "background 0.15s" }}
                      onMouseEnter={e => e.currentTarget.style.background = "rgba(255,255,255,0.12)"}
                      onMouseLeave={e => e.currentTarget.style.background = "rgba(255,255,255,0.05)"}>
                      <div style={{ width: 8, height: 8, borderRadius: "50%", background: cs.color, flexShrink: 0 }} />
                      <span style={{ fontSize: "0.82rem", color: "rgba(255,255,255,0.82)", fontFamily: BFONT, flex: 1 }}>{cs.cat}</span>
                      <span style={{ fontSize: "0.68rem", color: cs.color, fontWeight: 600, fontFamily: BFONT }}>{cs.gaps} topic{cs.gaps !== 1 ? "s" : ""}</span>
                      <span style={{ fontSize: "1.1rem", color: cs.color, fontFamily: BFONT, lineHeight: 1 }}>→</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Section 3: Summary */}
            <div onClick={() => go(4)}
              style={{ background: "rgba(156,39,176,0.1)", border: "1px solid rgba(156,39,176,0.2)", borderRadius: 14, padding: "1rem 1.1rem", cursor: "pointer", transition: "background 0.15s" }}
              onMouseEnter={e => e.currentTarget.style.background = "rgba(156,39,176,0.18)"}
              onMouseLeave={e => e.currentTarget.style.background = "rgba(156,39,176,0.1)"}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "0.35rem" }}>
                <span style={{ fontSize: "0.62rem", letterSpacing: "0.15em", textTransform: "uppercase", color: "#CE93D8", fontWeight: 700, fontFamily: BFONT }}>o Your Summary</span>
                <span style={{ fontSize: "1.1rem", color: "rgba(255,255,255,0.5)", fontFamily: BFONT, lineHeight: 1 }}>→</span>
              </div>
              <div style={{ fontSize: "0.82rem", color: "rgba(255,255,255,0.75)", fontFamily: BFONT }}>Personalized direction for your relationship</div>
            </div>

          </div>
        </div>
        <NavButtons onBack={() => {}} backDisabled onNext={() => go(1)} nextLabel="Common Ground →" />
      </ResultsSlide>
    </WithSideNav>
    );
  }

  // -- STEP 1: COMMON GROUND -- sorted most to least aligned (item 10) --
  if (step === 1) {
    const byCat = catStatsCommon
      .map(cs => ({ cat: cs.cat, color: catColorMap[cs.cat]?.color, items: aligned.filter(r => r.category === cs.cat) }))
      .filter(c => c.items.length > 0);
    return (
    <WithSideNav navItems={expectationsNavItems} currentStep={step} onGo={go} accent="#1B5FE8">
      <ResultsSlide bg="linear-gradient(135deg, #f0fff4, #e8f5e9)">
        <link href={FONT_URL} rel="stylesheet" />
        <div style={{ fontSize: "0.68rem", textTransform: "uppercase", letterSpacing: "0.15em", color: "#4CAF50", fontWeight: 700, marginBottom: "0.4rem", fontFamily: BFONT }}>Common Ground</div>
        <div style={{ fontSize: "clamp(1.6rem,5vw,2.2rem)", fontWeight: 700, color: "#1a1a2e", lineHeight: 1.1, marginBottom: "0.5rem", fontFamily: HFONT }}>{aligned.length} things you already agree on.</div>
        <p style={{ fontSize: "0.85rem", color: "#555", marginBottom: "1.75rem", lineHeight: 1.72, fontFamily: BFONT, fontWeight: 300 }}>These are the expectations you already hold in common — no negotiation needed. This is your foundation.</p>
        <div style={{ display: "flex", flexDirection: "column", gap: "0.85rem", marginBottom: "0.5rem" }}>
          {byCat.map(({ cat, color, items }) => (
            <div key={cat} style={{ background: "white", borderRadius: 16, overflow: "hidden", boxShadow: "0 2px 12px rgba(0,0,0,0.06)" }}>
              <div style={{ background: color, padding: "0.55rem 1.25rem", display: "flex", justifyContent: "space-between" }}>
                <span style={{ fontSize: "0.72rem", fontWeight: 700, color: "white", textTransform: "uppercase", letterSpacing: "0.08em", fontFamily: BFONT }}>{cat}</span>
                <span style={{ fontSize: "0.72rem", color: "rgba(255,255,255,0.85)", fontFamily: BFONT }}>{items.length} aligned</span>
              </div>
              {items.map((r, i) => (
                <div key={r.item} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "0.62rem 1.25rem", borderBottom: i < items.length - 1 ? "1px solid #f5f5f5" : "none" }}>
                  <span style={{ fontSize: "0.82rem", color: "#333", fontFamily: BFONT }}>{r.item}</span>
                  <span style={{ fontSize: "0.75rem", color, fontWeight: 600, fontFamily: BFONT, whiteSpace: "nowrap", marginLeft: "0.5rem" }}>done {resolveLabel(r.mine)}</span>
                </div>
              ))}
            </div>
          ))}
        </div>
        <NavButtons onBack={() => go(0)} onNext={() => go(2)} nextLabel={sortedGaps.length > 0 ? "Start the Conversations ->" : "Summary →"} />
      </ResultsSlide>
    </WithSideNav>
    );
  }

  // -- STEP 2: CONVERSATIONS LANDING --
  if (step === 2) {
    if (sortedGaps.length === 0) return (
    <WithSideNav navItems={expectationsNavItems} currentStep={step} onGo={go} accent="#1B5FE8">
      <ResultsSlide bg="linear-gradient(145deg, #0f0c29, #302b63, #24243e)">
        <link href={FONT_URL} rel="stylesheet" />
        <div style={{ color: "white" }}>
          <div style={{ fontSize: "0.65rem", textTransform: "uppercase", letterSpacing: "0.2em", color: "rgba(255,255,255,0.4)", marginBottom: "0.75rem", fontFamily: BFONT }}>What You Expect</div>
          <div style={{ fontSize: "clamp(1.8rem,6vw,2.6rem)", fontWeight: 700, fontFamily: HFONT, lineHeight: 1.05, marginBottom: "0.75rem" }}>{userName} & {partnerName}</div>
          <div style={{ display: "inline-block", background: "rgba(76,175,80,0.25)", border: "1px solid rgba(76,175,80,0.5)", padding: "0.35rem 1rem", borderRadius: 999, marginBottom: "1.25rem" }}>
            <span style={{ fontSize: "0.82rem", fontWeight: 700, color: "#66BB6A", fontFamily: BFONT }}>Fully aligned on expectations</span>
          </div>
          <p style={{ fontSize: "0.88rem", color: "rgba(255,255,255,0.65)", fontFamily: BFONT, fontWeight: 300, lineHeight: 1.75, marginBottom: "1.5rem" }}>
            {userName} and {partnerName} are on the same page across every area — home, finances, family, parenting, and the bigger life questions. That's not common. It means you're working from the same assumptions, which removes an entire category of slow-burn friction before it starts.
          </p>
          <div style={{ background: "rgba(76,175,80,0.1)", border: "1px solid rgba(76,175,80,0.2)", borderRadius: 16, padding: "1.25rem", marginBottom: "0.85rem" }}>
            <div style={{ fontSize: "0.62rem", textTransform: "uppercase", letterSpacing: "0.15em", color: "#66BB6A", fontWeight: 700, marginBottom: "0.75rem", fontFamily: BFONT }}>* What this means in practice</div>
            {[
              "You're more likely to work through differences while they're still easy to talk about.",
              "Shared expectations tend to create shared effort, which reduces the resentment that builds when one person quietly carries more.",
              "The work for an aligned couple isn't catching up. It's staying current as life changes."
            ].map((s, i) => (
              <div key={i} style={{ display: "flex", gap: "0.65rem", marginBottom: i < 2 ? "0.55rem" : 0 }}>
                <span style={{ color: "#66BB6A", flexShrink: 0 }}>→</span>
                <span style={{ fontSize: "0.84rem", color: "rgba(255,255,255,0.8)", fontFamily: BFONT, lineHeight: 1.55, fontWeight: 300 }}>{s}</span>
              </div>
            ))}
          </div>
          <div style={{ background: "rgba(255,255,255,0.05)", borderRadius: 14, padding: "1rem 1.25rem" }}>
            <p style={{ fontSize: "0.78rem", color: "rgba(255,255,255,0.45)", fontFamily: BFONT, fontWeight: 300, lineHeight: 1.65, margin: 0, fontStyle: "italic" }}>
              Most couples find 5-10 meaningful gaps here. The fact that you didn't is worth sitting with.
            </p>
          </div>
        </div>
        <NavButtons onBack={() => go(1)} onNext={() => go(4)} nextLabel="Summary →" />
      </ResultsSlide>
    </WithSideNav>
    );
    return (
    <WithSideNav navItems={expectationsNavItems} currentStep={step} onGo={go} accent="#1B5FE8">
      <ResultsSlide bg="linear-gradient(145deg, #1a0a2e, #2d1b4e, #1e1535)">
        <link href={FONT_URL} rel="stylesheet" />
        <div style={{ color: "white" }}>
          <div style={{ fontSize: "0.68rem", textTransform: "uppercase", letterSpacing: "0.2em", color: "rgba(255,255,255,0.45)", marginBottom: "1rem", fontFamily: BFONT }}>Time to talk</div>
          <div style={{ fontSize: "clamp(2rem,7vw,3rem)", fontWeight: 700, fontFamily: HFONT, lineHeight: 1.0, marginBottom: "0.85rem" }}>Conversations<br />Worth Having.</div>
          <p style={{ fontSize: "0.85rem", color: "rgba(255,255,255,0.5)", fontFamily: BFONT, fontWeight: 300, lineHeight: 1.65, marginBottom: "1.75rem" }}>These aren't warning signs — they're openings. Each one is a place where getting on the same page now makes things easier later.</p>
          <div style={{ display: "flex", flexDirection: "column", gap: "0.6rem" }}>
            {gapCats.map((cs, i) => (
              <div key={cs.cat}
                onClick={() => { setCatStep(i); setGapInCatIdx(-1); setStep(3); const _sc=document.querySelector("[data-results-scroll]");if(_sc)_sc.scrollTop=0;else window.scrollTo({top:0}); }}
                style={{ display: "flex", alignItems: "center", gap: "1rem", background: "rgba(255,255,255,0.07)", borderRadius: 14, padding: "1rem 1.25rem", cursor: "pointer", transition: "background 0.15s" }}
                onMouseEnter={e => e.currentTarget.style.background = "rgba(255,255,255,0.13)"}
                onMouseLeave={e => e.currentTarget.style.background = "rgba(255,255,255,0.07)"}>
                <div style={{ width: 10, height: 10, borderRadius: "50%", background: cs.color, flexShrink: 0 }} />
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: "0.88rem", fontWeight: 700, color: "white", fontFamily: BFONT }}>{cs.cat}</div>
                  <div style={{ fontSize: "0.7rem", color: "rgba(255,255,255,0.4)", fontFamily: BFONT }}>{cs.gaps} conversation{cs.gaps !== 1 ? "s" : ""} to have</div>
                </div>
                <span style={{ fontSize: "1.3rem", color: cs.color, lineHeight: 1 }}>→</span>
              </div>
            ))}
          </div>
        </div>
        <NavButtons onBack={() => go(1)} onNext={() => { setCatStep(0); setGapInCatIdx(-1); setStep(3); const _sc=document.querySelector("[data-results-scroll]");if(_sc)_sc.scrollTop=0;else window.scrollTo({top:0}); }} nextLabel={"Start with " + (gapCats[0]?.cat || "") + " ->"} />
      </ResultsSlide>
    </WithSideNav>
    );
  }

  // -- STEP 3: CONVERSATIONS -- one page per category, all gaps shown together --
  if (step === 3) {
    if (gapCats.length === 0) { go(4); return null; }

    const currentCatStat = gapCats[catStep];
    const cc = catColorMap[currentCatStat.cat] || { color: "#666", bg: "#f5f5f5" };
    const thisCatGaps = sortedGaps.filter(g => g.category === currentCatStat.cat);
    const isLastCat = catStep === gapCats.length - 1;

    const catNarration = {
      "Intimacy": "How you each experience closeness, and what it means when that shifts, is one of the most personal things you can discuss. These aren't scores. They're invitations.",
      "Parenting": "Whether or not children are part of your plan yet, expectations in this area shape how you think about your future. Approach these with curiosity rather than conclusion.",
      "Career": "How you think about work, ambition, and sacrifice for each other's careers will evolve. These conversations lay groundwork before the hard moments arrive.",
      "Extended Family": "Few things test a relationship more quietly than unspoken expectations around family. These help you build a shared stance before situations arise.",
      "Money Values": "Beneath every money disagreement is usually a difference in values, not just numbers. These questions get at the deeper layer.",
      "Finances": "The logistics of money are learnable. Agreeing on how decisions get made is the more important conversation.",
      "Social Life": "How much of your lives you share with others, and how you make those calls, reflects some of the most personal expectations in a partnership.",
      "Family Life": "Family rhythms and logistics are easy to assume rather than discuss. These help you get aligned before the moments that matter.",
      "Home": "Day-to-day domestic expectations are easy to assume rather than discuss. Getting explicit about them early is one of the most practical things a couple can dobalances build up.",
      "Health": "How you support each other through health and lifestyle choices reveals a lot about what kind of partner each of you wants to be.",
    };
    const narration = catNarration[currentCatStat.cat] || ("These expectations in " + (currentCatStat.cat) + " are worth looking at together.");

    return (
    <WithSideNav navItems={expectationsNavItems} currentStep={step} onGo={go} accent="#1B5FE8">
      <ResultsSlide bg={cc.bg}>
        <link href={FONT_URL} rel="stylesheet" />

        {/* Header */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1rem" }}>
          <div style={{ background: cc.color, borderRadius: 999, padding: "0.3rem 1rem" }}>
            <span style={{ fontSize: "0.7rem", fontWeight: 700, color: "white", fontFamily: BFONT, textTransform: "uppercase", letterSpacing: "0.08em" }}>{currentCatStat.cat}</span>
          </div>
          <span style={{ fontSize: "0.75rem", color: "#aaa", fontFamily: BFONT }}>{catStep + 1} of {gapCats.length}</span>
        </div>

        {/* Progress bar across categories */}
        <div style={{ height: 3, background: "rgba(0,0,0,0.08)", borderRadius: 2, marginBottom: "1.25rem" }}>
          <div style={{ height: "100%", background: cc.color, borderRadius: 2, width: ((((catStep+1)/gapCats.length)*100) + "%"), transition: "width 0.3s" }} />
        </div>

        {/* Why it matters */}
        <p style={{ fontSize: "0.83rem", color: "#555", lineHeight: 1.72, marginBottom: "1.25rem", fontFamily: BFONT, fontWeight: 300, fontStyle: "italic" }}>{narration}</p>

        {/* All gaps in this category */}
        <div style={{ display: "flex", flexDirection: "column", gap: "0.85rem", marginBottom: "0.5rem" }}>
          {thisCatGaps.map((g, gi) => {
            const originNote = buildOriginNote(g, userName, partnerName, sortedGaps.indexOf(g));
            return (
              <div key={gi} style={{ background: "white", borderRadius: 16, overflow: "hidden", boxShadow: "0 2px 12px rgba(0,0,0,0.07)" }}>
                {/* Topic header */}
                <div style={{ background: cc.color + "15", borderBottom: ("2px solid " + (cc.color) + "30"), padding: "0.75rem 1.1rem" }}>
                  <div style={{ fontSize: "0.88rem", fontWeight: 700, color: "#1a1a2e", fontFamily: BFONT, lineHeight: 1.3 }}>{g.item}</div>
                </div>
                {/* Side by side answers */}
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0", padding: "0" }}>
                  <div style={{ padding: "0.85rem 1.1rem", borderRight: "1px solid #f0f0f0" }}>
                    <div style={{ fontSize: "0.6rem", textTransform: "uppercase", letterSpacing: "0.1em", color: cc.color, fontWeight: 700, marginBottom: "0.3rem", fontFamily: BFONT }}>{userName}</div>
                    <div style={{ fontSize: "0.88rem", fontWeight: 700, color: "#1a1a2e", fontFamily: BFONT, lineHeight: 1.3 }}>{resolveLabel(g.mine)}</div>
                  </div>
                  <div style={{ padding: "0.85rem 1.1rem" }}>
                    <div style={{ fontSize: "0.6rem", textTransform: "uppercase", letterSpacing: "0.1em", color: "#aaa", fontWeight: 700, marginBottom: "0.3rem", fontFamily: BFONT }}>{partnerName}</div>
                    <div style={{ fontSize: "0.88rem", fontWeight: 700, color: "#1a1a2e", fontFamily: BFONT, lineHeight: 1.3 }}>{resolveLabel(g.theirs)}</div>
                  </div>
                </div>
                {/* Origin note if present */}
                {originNote && (
                  <div style={{ borderTop: ("1px solid " + (cc.color) + "20"), padding: "0.75rem 1.1rem", background: cc.color + "08" }}>
                    <div style={{ fontSize: "0.6rem", textTransform: "uppercase", letterSpacing: "0.1em", color: cc.color, fontWeight: 700, marginBottom: "0.3rem", fontFamily: BFONT }}>Where this may come from</div>
                    <p style={{ fontSize: "0.8rem", color: "#666", lineHeight: 1.65, margin: 0, fontStyle: "italic", fontFamily: BFONT, fontWeight: 300 }}>{originNote}</p>
                  </div>
                )}
              </div>
            );
          })}
        </div>
        <NavButtons
          onBack={() => catStep > 0 ? (setCatStep(n => n-1)) : go(2)}
          onNext={() => isLastCat ? go(4) : setCatStep(n => n+1)}
          nextLabel={isLastCat ? "See Summary ->" : ("Next: " + (gapCats[catStep+1]?.cat) + " →")}
        />
      </ResultsSlide>
    </WithSideNav>
    );
  }

  // -- STEP 4: SUMMARY --
  const foundationWord = aligned.length === 0 ? "Emerging"
    : fullyAlignedCats.length >= catNames.length * 0.7 ? "Rock-solid"
    : aligned.length > gaps.length * 2 ? "Strong"
    : aligned.length > gaps.length ? "Solid"
    : "Growing";

  // Build a personalized paragraph based on actual gap data
  const topConvoCat = conversationCats[0];
  const topAlignedCat = fullyAlignedCats[0] || similarMindsetCats[0];
  const hasIntimacyGap = conversationCats.some(c => c.cat === "Intimacy");
  const hasMoneyGap = conversationCats.some(c => c.cat === "Money Values" || c.cat === "Finances");
  const hasFamilyGap = conversationCats.some(c => c.cat === "Extended Family" || c.cat === "Family Life");
  const hasParentingGap = conversationCats.some(c => c.cat === "Parenting");

  const buildPersonalizedPara = () => {
    const parts = [];
    if (conversationCats.length === 0) {
      parts.push(((userName) + " and " + (partnerName) + " are aligned on every expectation across home, finances, family, parenting, and the bigger life questions."));
      parts.push("That's genuinely rare. Most couples find meaningful gaps in at least a few areas. The fact that you don't means you're already working from shared assumptions rather than discovering mismatches when they become harder to name.");
      parts.push("The work for a couple this aligned is staying current with each other, because what you each want and need will evolve, and the expectations that feel obvious today may need revisiting as they do.");
      parts.push("Choosing to understand each other at this level of honesty is itself the practice. That doesn't stop here.");
      return parts.join(" ");
    }
    if (topAlignedCat) {
      parts.push(("You've already built real alignment in areas like " + (topAlignedCat.cat.toLowerCase()) + ". That's not a small thing."));
    }
    parts.push("The conversations ahead of you aren't about what's missing. They're about closing the distance between what each of you assumes and what you've actually agreed on.");
    if (topConvoCat) {
      parts.push(("The area that's likely to reward your attention most is " + (topConvoCat.cat.toLowerCase()) + ": that's where your expectations differ most right now."));
    }
    if (hasIntimacyGap) parts.push("Conversations about intimacy can feel vulnerable. Couples who talk about closeness explicitly tend to maintain it longer than those who assume it will figure itself out.");
    if (hasMoneyGap) parts.push("Money conversations are rarely actually about money. When you sit down on finances, try to start with what each of you wants the money to make possible — not just who manages what.");
    if (hasFamilyGap) parts.push("Family and extended family expectations are often the last to get named. Getting aligned early gives you a shared foundation before those moments arrive.");
    if (hasParentingGap) parts.push("Parenting expectations shaped by how you were each raised are worth surfacing now, long before they arrive as live decisions.");
    parts.push("Couples who regularly name their expectations, not just when things are hard but as a practice, tend to stay more in sync as life shifts around them.");
    parts.push("Having different expectations isn't a sign that something is off. It's normal, and naming them is exactly what being intentional about a relationship looks like.");
    return parts.join(" ");
  };

  return (
    <WithSideNav navItems={expectationsNavItems} currentStep={step} onGo={go} accent="#1B5FE8">
      <ResultsSlide bg="linear-gradient(145deg, #0f0c29, #302b63, #24243e)">
      <link href={FONT_URL} rel="stylesheet" />
      <div style={{ color: "white" }}>
        <div style={{ marginBottom: "1.5rem" }}>
          <div style={{ fontSize: "0.65rem", letterSpacing: "0.2em", textTransform: "uppercase", color: "rgba(255,255,255,0.4)", marginBottom: "0.75rem", fontFamily: BFONT }}>What You Expect</div>
          <div style={{ fontSize: "clamp(2rem,7vw,3rem)", fontWeight: 700, fontFamily: HFONT, lineHeight: 1.0, marginBottom: "0.75rem" }}>{userName} & {partnerName}</div>
          <div style={{ display: "inline-block", background: "rgba(156,39,176,0.35)", border: "1px solid rgba(156,39,176,0.6)", padding: "0.35rem 1rem", borderRadius: 999, marginBottom: "1.25rem" }}>
            <span style={{ fontSize: "0.82rem", fontWeight: 700, color: "#CE93D8", fontFamily: BFONT }}>{foundationWord} foundation</span>
          </div>
          {/* Personalized paragraph */}
          <p style={{ fontSize: "0.84rem", color: "rgba(255,255,255,0.65)", fontFamily: BFONT, fontWeight: 300, lineHeight: 1.75, margin: 0 }}>{buildPersonalizedPara()}</p>
        </div>

        {/* Built together — green tinted */}
        {(fullyAlignedCats.length > 0 || similarMindsetCats.length > 0) && (
          <div style={{ background: "rgba(76,175,80,0.12)", borderRadius: 16, padding: "1.1rem 1.25rem", marginBottom: "0.75rem", border: "1px solid rgba(76,175,80,0.25)" }}>
            <div style={{ fontSize: "0.62rem", letterSpacing: "0.15em", textTransform: "uppercase", color: "#66BB6A", fontWeight: 700, marginBottom: "0.75rem", fontFamily: BFONT }}>* What you've built together</div>
            <div style={{ display: "flex", flexDirection: "column", gap: "0.4rem" }}>
              {[...fullyAlignedCats, ...similarMindsetCats].map(cs => (
                <div key={cs.cat} style={{ display: "flex", alignItems: "center", gap: "0.75rem", background: "rgba(255,255,255,0.06)", borderRadius: 9, padding: "0.55rem 0.9rem" }}>
                  <div style={{ width: 7, height: 7, borderRadius: "50%", background: cs.gaps === 0 ? "#4CAF50" : "#8BC34A", flexShrink: 0 }} />
                  <span style={{ fontSize: "0.82rem", fontWeight: 600, color: "rgba(255,255,255,0.85)", flex: 1, fontFamily: BFONT }}>{cs.cat}</span>
                  <span style={{ fontSize: "0.7rem", color: "#66BB6A", fontWeight: 600, fontFamily: BFONT }}>{cs.gaps === 0 ? "fully aligned" : "mostly in sync"}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Focus next — amber tinted, clickable */}
        {conversationCats.length > 0 && (
          <div style={{ background: "rgba(255,152,0,0.1)", borderRadius: 16, padding: "1.1rem 1.25rem", marginBottom: "0.75rem", border: "1px solid rgba(255,152,0,0.2)" }}>
            <div style={{ fontSize: "0.62rem", letterSpacing: "0.15em", textTransform: "uppercase", color: "#FFA726", fontWeight: 700, marginBottom: "0.75rem", fontFamily: BFONT }}>* Where to focus next</div>
            <div style={{ display: "flex", flexDirection: "column", gap: "0.4rem" }}>
              {conversationCats.map((cs, i) => (
                <div key={cs.cat}
                  onClick={() => { setCatStep(gapCats.indexOf(cs)); setGapInCatIdx(-1); setStep(3); const _sc=document.querySelector("[data-results-scroll]");if(_sc)_sc.scrollTop=0;else window.scrollTo({top:0}); }}
                  style={{ display: "flex", alignItems: "center", gap: "0.75rem", background: "rgba(255,255,255,0.07)", borderRadius: 9, padding: "0.55rem 0.9rem", cursor: "pointer", transition: "background 0.15s" }}
                  onMouseEnter={e => e.currentTarget.style.background = "rgba(255,255,255,0.13)"}
                  onMouseLeave={e => e.currentTarget.style.background = "rgba(255,255,255,0.07)"}>
                  <div style={{ width: 7, height: 7, borderRadius: "50%", background: cs.color, flexShrink: 0 }} />
                  <span style={{ fontSize: "0.82rem", fontWeight: 600, color: "rgba(255,255,255,0.85)", flex: 1, fontFamily: BFONT }}>{cs.cat}</span>
                  <span style={{ fontSize: "0.7rem", color: cs.color, fontWeight: 600, fontFamily: BFONT }}>{cs.gaps} topic{cs.gaps !== 1 ? "s" : ""} →</span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Raw responses drawer */}
      <div style={{ border: "1px solid rgba(255,255,255,0.1)", borderRadius: 14, overflow: "hidden", marginTop: "0.25rem" }}>
        <button onClick={() => setShowRaw(s => !s)} style={{ width: "100%", background: "rgba(255,255,255,0.05)", border: "none", padding: "1rem 1.4rem", display: "flex", justifyContent: "space-between", alignItems: "center", cursor: "pointer", fontFamily: BFONT }}>
          <span style={{ fontSize: "0.8rem", fontWeight: 600, color: "rgba(255,255,255,0.55)" }}>All individual responses</span>
          <span style={{ fontSize: "0.85rem", color: "rgba(255,255,255,0.4)", fontWeight: 700 }}>{showRaw ? "^" : "v"}</span>
        </button>
        {showRaw && (
          <div>
            <div style={{ display: "grid", gridTemplateColumns: "1.8fr 1fr 1fr", padding: "0.5rem 1.25rem", background: "#f5f5f5", gap: "0.5rem" }}>
              {["", userName, partnerName].map(n => <span key={n} style={{ fontSize: "0.63rem", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.08em", color: "#888", fontFamily: BFONT }}>{n}</span>)}
            </div>
            {RESPONSIBILITY_CATEGORIES.map(cat => {
              const cr = cat.items.map(item => { const key = ((cat.id) + "__" + (item)); return { item, mine: myAnswers.responsibilities?.[key], theirs: partnerAnswers.responsibilities?.[key]  }; }).filter(r => r.mine || r.theirs);
              if (!cr.length) return null;
              const cc = catColorMap[cat.label] || { color: "#666" };
              return (
                <div key={cat.id}>
                  <div style={{ background: "#fafafa", padding: "0.38rem 1.25rem", borderBottom: "1px solid #f0f0f0" }}>
                    <span style={{ fontSize: "0.63rem", fontWeight: 700, textTransform: "uppercase", color: cc.color, fontFamily: BFONT }}>{cat.label}</span>
                  </div>
                  {cr.map(({ item, mine, theirs }) => (
                    <div key={item} style={{ display: "grid", gridTemplateColumns: "1.8fr 1fr 1fr", padding: "0.52rem 1.25rem", borderBottom: "1px solid #f5f5f5", gap: "0.5rem", alignItems: "center", background: mine === theirs ? "transparent" : "#fffbf0" }}>
                      <span style={{ fontSize: "0.78rem", color: "#333", fontFamily: BFONT }}>{item}</span>
                      <span style={{ fontSize: "0.72rem", color: "#666", fontFamily: BFONT }}>{resolveLabel(mine) || " — "}</span>
                      <span style={{ fontSize: "0.72rem", color: "#666", fontFamily: BFONT }}>{resolveLabel(theirs) || " — "}</span>
                    </div>
                  ))}
                </div>
              );
            })}
            <div style={{ background: "#fafafa", padding: "0.38rem 1.25rem" }}><span style={{ fontSize: "0.63rem", fontWeight: 700, textTransform: "uppercase", color: "#9C27B0", fontFamily: BFONT }}>Life Questions</span></div>
            {LIFE_QUESTIONS.map(q => {
              const mine = myAnswers.life?.[q.id], theirs = partnerAnswers.life?.[q.id];
              return (
                <div key={q.id} style={{ display: "grid", gridTemplateColumns: "1.8fr 1fr 1fr", padding: "0.6rem 1.25rem", borderBottom: "1px solid #f5f5f5", gap: "0.5rem", alignItems: "start", background: mine === theirs ? "transparent" : "#fffbf0" }}>
                  <span style={{ fontSize: "0.78rem", color: "#333", lineHeight: 1.4, fontFamily: BFONT }}>{q.text}</span>
                  <span style={{ fontSize: "0.72rem", color: "#666", fontFamily: BFONT }}>{resolveLabel(mine) || " — "}</span>
                  <span style={{ fontSize: "0.72rem", color: "#666", fontFamily: BFONT }}>{resolveLabel(theirs) || " — "}</span>
                </div>
              );
            })}
          </div>
        )}
      </div>
      <NavButtons onBack={() => go(3)} onNext={() => {}} nextLabel="Done" nextDisabled />
    </ResultsSlide>
    </WithSideNav>
  );
}



// ======================================================
// ANNIVERSARY EXERCISE -- Exercise 3
// ======================================================
const ANNIVERSARY_QUESTIONS = [
  // Warm-up: light, accessible
  { id: "a0", category: "Getting Started", type: "scale", text: "Right now, how would you describe the overall feel of our relationship?", scaleLabels: ["Needs real work", "Going through a rough patch", "Solid and steady", "Really good", "Better than ever"], scaleColors: ["#ef4444","#f97316","#eab308","#22c55e","#10b981"] },
  { id: "a_memory", category: "Getting Started", type: "text", text: "Something small that happened recently that made me smile about us:", placeholder: "e.g. A quiet moment, something you said, something we laughed about..." },
  // Milestones
  { id: "a1", category: "Milestones", type: "text", text: "The moment I felt most proud of us as a couple:", placeholder: "e.g. When we navigated something hard together, or when we supported each other through..." },
  { id: "a2", category: "Milestones", type: "text", text: "A challenge we faced together that made our relationship stronger:", placeholder: "e.g. Moving cities, a hard year, a disagreement we worked through..." },
  // Satisfaction scales
  { id: "a_sat_conn", category: "How We're Doing", type: "scale", text: "How connected do I feel to you day-to-day right now?", scaleLabels: ["Not very connected", "A bit distant", "Somewhat connected", "Quite connected", "Very connected"], scaleColors: ["#ef4444","#f97316","#eab308","#22c55e","#10b981"] },
  { id: "a_sat_comm", category: "How We're Doing", type: "scale", text: "How well do I feel we communicate when something is bothering one of us?", scaleLabels: ["We avoid it", "It's hard", "We manage", "Pretty well", "Really well"], scaleColors: ["#ef4444","#f97316","#eab308","#22c55e","#10b981"] },
  { id: "a_sat_fun", category: "How We're Doing", type: "scale", text: "How much do we prioritize fun and lightness together?", scaleLabels: ["Not enough", "Less than I'd like", "About right", "Quite a bit", "A lot"], scaleColors: ["#ef4444","#f97316","#eab308","#22c55e","#10b981"] },
  // What matters
  { id: "a3", category: "What Matters", type: "text", text: "The part of our relationship I'm most grateful for:", placeholder: "e.g. How you make me feel safe, the way we laugh together, the life we've built..." },
  { id: "a4", category: "What Matters", type: "text", text: "Something I want to do more of together in the next year:", placeholder: "e.g. Travel, slow weekends, have the big conversations, invest in our friendship..." },
  // Looking forward
  { id: "a5", category: "Looking Forward", type: "text", text: "Where I see us in 5 years — what matters most to me about that picture:", placeholder: "e.g. Financially stable and adventurous, close to family, in a home we love..." },
  { id: "a6", category: "Looking Forward", type: "text", text: "One thing I want to work on — in myself or in how I show up for you:", placeholder: "e.g. Being more present, communicating when I'm stressed, showing appreciation more..." },
];


function AnniversaryExercise({ userName, partnerName, onComplete, onBack }) {
  const [answers, setAnswers] = useState({});
  const [step, setStep] = useState(0);
  const total = ANNIVERSARY_QUESTIONS.length;
  const q = ANNIVERSARY_QUESTIONS[step];
  // Scale questions are answered when they have a numeric value; text questions need non-empty string
  const isAnswered = (q, answers) => q.type === "scale" ? answers[q.id] !== undefined : !!answers[q.id]?.trim();
  const allDone = ANNIVERSARY_QUESTIONS.every(q => isAnswered(q, answers));

  const handleNext = () => {
    if (step < total - 1) setStep(step + 1);
  };
  const handleBack = () => {
    if (step > 0) setStep(step - 1);
    else onBack();
  };

  if (allDone && step >= total) {
    return (
      <div style={{ textAlign: "center", padding: "4rem 1rem" }}>
        <div style={{ width: 72, height: 72, borderRadius: "50%", background: "linear-gradient(135deg, #10b981, #059669)", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 1.25rem", fontSize: "1.8rem" }}>✓</div>
        <p style={{ fontFamily: font.display, fontSize: "1.8rem", fontWeight: 700, color: C.ink, marginBottom: "0.5rem" }}>Reflection Complete.</p>
        <p style={{ fontSize: "0.82rem", color: C.muted, fontFamily: font.body, marginBottom: "1.75rem", lineHeight: 1.7 }}>Your answers are saved. When {partnerName} completes theirs, you'll see a side-by-side view of your shared story.</p>
        <button onClick={() => onComplete(answers)} style={{ background: "linear-gradient(135deg, #10b981, #059669)", color: "white", border: "none", padding: "0.85rem 2.25rem", fontSize: "0.75rem", letterSpacing: "0.1em", textTransform: "uppercase", cursor: "pointer", fontFamily: font.body, borderRadius: 10, fontWeight: 600 }}>View My Results →</button>
      </div>
    );
  }

  const currentAnswered = isAnswered(q, answers);

  return (
    <div style={{ maxWidth: 560, margin: "0 auto" }}>
      <div style={{ marginBottom: "2rem" }}>
        <button onClick={handleBack} style={{ background: "transparent", border: "none", color: C.muted, fontSize: "0.72rem", letterSpacing: "0.1em", textTransform: "uppercase", cursor: "pointer", fontFamily: font.body, padding: 0, marginBottom: "1.5rem", display: "block" }}>← Back</button>
        <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", marginBottom: "0.5rem" }}>
          <span style={{ fontSize: "0.6rem", letterSpacing: "0.2em", textTransform: "uppercase", color: "#10b981", fontWeight: 700, fontFamily: font.body }}>Exercise 03 · Our Relationship Story</span>
        </div>
        <div style={{ background: C.stone + "40", borderRadius: 999, height: 4, marginBottom: "2rem" }}>
          <div style={{ background: "#10b981", height: 4, borderRadius: 999, width: (((step) / total) * 100) + "%", transition: "width 0.3s" }} />
        </div>
        <span style={{ fontSize: "0.6rem", color: "#10b981", fontWeight: 700, fontFamily: font.body, letterSpacing: "0.15em", textTransform: "uppercase" }}>{q.category}</span>
        <h2 style={{ fontFamily: font.display, fontSize: "1.35rem", fontWeight: 700, color: C.ink, margin: "0.5rem 0 1.5rem", lineHeight: 1.35 }}>{q.text}</h2>

        {q.type === "scale" ? (
          <div style={{ display: "flex", flexDirection: "column", gap: "0.6rem" }}>
            {q.scaleLabels.map((label, i) => {
              const selected = answers[q.id] === i;
              const color = q.scaleColors[i];
              return (
                <button key={i} onClick={() => setAnswers({ ...answers, [q.id]: i })}
                  style={{ display: "flex", alignItems: "center", gap: "0.85rem", background: selected ? color + "18" : "white", border: "1.5px solid " + (selected ? color : C.stone), borderRadius: 12, padding: "0.85rem 1.1rem", cursor: "pointer", textAlign: "left", transition: "all 0.15s" }}>
                  <div style={{ width: 20, height: 20, borderRadius: "50%", border: "2px solid " + (selected ? color : C.stone), background: selected ? color : "white", flexShrink: 0, display: "flex", alignItems: "center", justifyContent: "center" }}>
                    {selected && <div style={{ width: 8, height: 8, borderRadius: "50%", background: "white" }} />}
                  </div>
                  <span style={{ fontSize: "0.88rem", color: selected ? color : C.text, fontFamily: font.body, fontWeight: selected ? 600 : 400 }}>{label}</span>
                </button>
              );
            })}
          </div>
        ) : (
          <textarea
            value={answers[q.id] || ""}
            onChange={e => setAnswers({ ...answers, [q.id]: e.target.value })}
            placeholder={q.placeholder}
            style={{ width: "100%", minHeight: 120, padding: "0.85rem 1rem", borderRadius: 12, border: "1.5px solid " + C.stone, fontFamily: font.body, fontSize: "0.88rem", color: C.text, background: "white", resize: "vertical", outline: "none", lineHeight: 1.6, boxSizing: "border-box" }}
          />
        )}
      </div>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <span style={{ fontSize: "0.72rem", color: C.muted, fontFamily: font.body }}>{step + 1} of {total}</span>
        <div style={{ display: "flex", gap: "0.75rem" }}>
          {step > 0 && <button onClick={handleBack} style={{ background: "transparent", border: "1.5px solid " + C.stone, color: C.muted, padding: "0.6rem 1.1rem", fontSize: "0.72rem", cursor: "pointer", fontFamily: font.body, borderRadius: 8 }}>← Back</button>}
          {step < total - 1 ? (
            <button onClick={handleNext} disabled={!currentAnswered} style={{ background: currentAnswered ? "#10b981" : C.stone, color: currentAnswered ? "white" : C.muted, border: "none", padding: "0.6rem 1.5rem", fontSize: "0.72rem", letterSpacing: "0.08em", textTransform: "uppercase", cursor: currentAnswered ? "pointer" : "default", fontFamily: font.body, borderRadius: 8, fontWeight: 600 }}>Continue →</button>
          ) : (
            <button onClick={() => { if (allDone) { onComplete(answers); } }} disabled={!currentAnswered} style={{ background: currentAnswered ? "linear-gradient(135deg, #10b981, #059669)" : C.stone, color: currentAnswered ? "white" : C.muted, border: "none", padding: "0.6rem 1.75rem", fontSize: "0.72rem", letterSpacing: "0.08em", textTransform: "uppercase", cursor: currentAnswered ? "pointer" : "default", fontFamily: font.body, borderRadius: 8, fontWeight: 600 }}>Complete Reflection →</button>
          )}
        </div>
      </div>
    </div>
  );
}

// ======================================================
// STARTING OUT CHECKLIST
// ======================================================
const CHECKLIST_AREAS = [
  { id: "finances", label: "Merging Finances", icon: "💳", color: "#E8673A", items: ["Open a joint bank account", "Review and align on a monthly budget", "Set up automatic bill payment from joint account", "Update direct deposit allocations", "Decide on individual spending allowances", "Create an emergency fund goal together"] },
  { id: "namechange", label: "Name Change", icon: "✍", color: "#1B5FE8", items: ["Apply for updated Social Security card", "Update driver's license / state ID", "Update passport (or apply if needed)", "Notify employer HR for payroll records", "Update bank and financial accounts", "Update voter registration"] },
  { id: "insurance", label: "Insurance & Benefits", icon: "🛡", color: "#10b981", items: ["Add spouse to health insurance plan", "Update life insurance beneficiaries", "Update car insurance to joint policy", "Review home/renters insurance together", "Update employer benefits forms"] },
  { id: "estate", label: "Estate Basics", icon: "📋", color: "#F59E0B", items: ["Create or update your wills", "Set up healthcare proxies / medical directives", "Designate beneficiaries on retirement accounts", "Consider a durable power of attorney", "Store important documents in one place"] },
  { id: "taxes", label: "Taxes", icon: "🧾", color: "#8B5CF6", items: ["Decide on tax filing status (MFJ vs MFS)", "Update W-4 withholding at work", "Plan for any marriage tax penalty or bonus", "Start tracking deductible expenses", "Discuss approach with a tax professional if needed"] },
  { id: "home", label: "Household Setup", icon: "🏠", color: "#EC4899", items: ["Consolidate or organize household subscriptions", "Set up shared calendar for household tasks", "Establish a system for shared errands", "Inventory and organize important documents", "Set up an emergency contact system"] },
  { id: "social", label: "Social & Admin", icon: "📬", color: "#06B6D4", items: ["Update address with USPS if applicable", "Notify key contacts of name / address changes", "Update social media and professional profiles", "Merge or update streaming/subscription accounts", "Update contact info on important accounts"] },
];

function StartingOutChecklist({ userName, partnerName, onBack, checklistState, setChecklistState }) {
  const totalItems = CHECKLIST_AREAS.reduce((s, a) => s + a.items.length, 0);
  const checkedCount = Object.values(checklistState).filter(Boolean).length;
  const pct = Math.round((checkedCount / totalItems) * 100);

  const toggle = (key) => setChecklistState({ ...checklistState, [key]: !checklistState[key] });

  return (
    <div style={{ maxWidth: 620, margin: "0 auto" }}>
      <button onClick={onBack} style={{ background: "transparent", border: "none", color: C.muted, fontSize: "0.72rem", letterSpacing: "0.1em", textTransform: "uppercase", cursor: "pointer", fontFamily: font.body, padding: 0, marginBottom: "1.5rem", display: "block" }}>← Back to Dashboard</button>
      <div style={{ marginBottom: "1.75rem" }}>
        <div style={{ fontSize: "0.6rem", letterSpacing: "0.22em", textTransform: "uppercase", color: "#E8673A", fontWeight: 700, fontFamily: font.body, marginBottom: "0.35rem" }}>Starting Out Collection</div>
        <h1 style={{ fontFamily: font.display, fontSize: "1.8rem", fontWeight: 700, color: C.ink, lineHeight: 1.1, marginBottom: "0.6rem" }}>Starting Out Checklist</h1>
        <p style={{ fontSize: "0.85rem", color: C.muted, fontFamily: font.body, fontWeight: 300, lineHeight: 1.65, marginBottom: "1.25rem" }}>The real-world logistics of merging your lives. Check things off as you go — no rush, just a clear picture of what's done and what's next.</p>
        <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
          <div style={{ flex: 1, background: C.stone + "60", borderRadius: 999, height: 6 }}>
            <div style={{ background: "linear-gradient(90deg, #E8673A, #1B5FE8)", height: 6, borderRadius: 999, width: pct + "%", transition: "width 0.3s" }} />
          </div>
          <span style={{ fontSize: "0.72rem", color: C.muted, fontFamily: font.body, flexShrink: 0 }}>{checkedCount}/{totalItems} complete</span>
        </div>
      </div>
      {CHECKLIST_AREAS.map(area => {
        const areaChecked = area.items.filter(item => checklistState[area.id + "__" + item]).length;
        return (
          <div key={area.id} style={{ background: "white", border: "1.5px solid " + C.stone, borderRadius: 14, marginBottom: "0.75rem", overflow: "hidden" }}>
            <div style={{ padding: "1rem 1.25rem", borderBottom: "1px solid " + C.stone + "60", display: "flex", alignItems: "center", gap: "0.75rem", background: area.color + "08" }}>
              <span style={{ fontSize: "1.2rem" }}>{area.icon}</span>
              <div style={{ flex: 1 }}>
                <div style={{ fontFamily: font.display, fontSize: "0.95rem", fontWeight: 700, color: C.ink }}>{area.label}</div>
                <div style={{ fontSize: "0.65rem", color: C.muted, fontFamily: font.body }}>{areaChecked}/{area.items.length} complete</div>
              </div>
              {areaChecked === area.items.length && <span style={{ fontSize: "0.7rem", color: area.color, fontWeight: 700, fontFamily: font.body }}>✓ Done</span>}
            </div>
            <div style={{ padding: "0.75rem 1.25rem" }}>
              {area.items.map(item => {
                const key = area.id + "__" + item;
                const checked = checklistState[key];
                return (
                  <div key={item} onClick={() => toggle(key)} style={{ display: "flex", alignItems: "flex-start", gap: "0.75rem", padding: "0.5rem 0", cursor: "pointer", borderBottom: "1px solid " + C.stone + "40" }}>
                    <div style={{ width: 18, height: 18, borderRadius: 5, border: "2px solid " + (checked ? area.color : C.stone), background: checked ? area.color : "white", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, marginTop: "0.05rem", transition: "all 0.15s" }}>
                      {checked && <span style={{ color: "white", fontSize: "0.7rem", fontWeight: 700, lineHeight: 1 }}>✓</span>}
                    </div>
                    <span style={{ fontSize: "0.82rem", color: checked ? C.muted : C.text, fontFamily: font.body, textDecoration: checked ? "line-through" : "none", lineHeight: 1.45 }}>{item}</span>
                  </div>
                );
              })}
            </div>
          </div>
        );
      })}
    </div>
  );
}

// ======================================================
// BUDGET TOOL -- Premium
// ======================================================
const BUDGET_CATEGORIES = [
  { id: "housing", label: "Housing", icon: "🏠", items: ["Rent / Mortgage", "Utilities (electric, gas, water)", "Internet & phone", "Home insurance / renters insurance", "Home maintenance / repairs"] },
  { id: "food", label: "Food & Dining", icon: "🍽", items: ["Groceries", "Dining out", "Coffee & snacks", "Meal delivery services"] },
  { id: "transport", label: "Transportation", icon: "🚗", items: ["Car payment(s)", "Car insurance", "Gas", "Parking & tolls", "Public transit / rideshare"] },
  { id: "savings", label: "Savings & Investments", icon: "💰", items: ["Emergency fund contribution", "Retirement (401k/IRA)", "Joint savings goal", "Individual savings"] },
  { id: "health", label: "Health & Wellness", icon: "💊", items: ["Health insurance premiums", "Gym / fitness", "Medical copays", "Prescriptions", "Mental health / therapy"] },
  { id: "lifestyle", label: "Lifestyle & Fun", icon: "✨", items: ["Streaming & subscriptions", "Hobbies & activities", "Vacations / travel fund", "Gifts & celebrations", "Personal spending money (each)"] },
  { id: "debt", label: "Debt Payments", icon: "📊", items: ["Student loans", "Credit card minimums", "Personal loans"] },
];

function BudgetTool({ userName, partnerName, onBack, budgetState, setBudgetState }) {
  const [budget, setBudget] = useState(budgetState || {});
  const [incomes, setIncomes] = useState({ [userName]: "", [partnerName]: "" });
  const [activeTab, setActiveTab] = useState("income");

  const totalIncome = Object.values(incomes).reduce((s, v) => s + (parseFloat(v) || 0), 0);
  const totalExpenses = Object.values(budget).reduce((s, v) => s + (parseFloat(v) || 0), 0);
  const remaining = totalIncome - totalExpenses;

  const tabs = [{ id: "income", label: "Income" }, ...BUDGET_CATEGORIES.map(c => ({ id: c.id, label: c.label }))];

  return (
    <div style={{ maxWidth: 620, margin: "0 auto" }}>
      <button onClick={onBack} style={{ background: "transparent", border: "none", color: C.muted, fontSize: "0.72rem", letterSpacing: "0.1em", textTransform: "uppercase", cursor: "pointer", fontFamily: font.body, padding: 0, marginBottom: "1.5rem", display: "block" }}>← Back to Dashboard</button>
      <div style={{ fontSize: "0.6rem", letterSpacing: "0.22em", textTransform: "uppercase", color: "#1B5FE8", fontWeight: 700, fontFamily: font.body, marginBottom: "0.35rem" }}>Attune Premium</div>
      <h1 style={{ fontFamily: font.display, fontSize: "1.8rem", fontWeight: 700, color: C.ink, lineHeight: 1.1, marginBottom: "0.5rem" }}>Shared Budget Tool</h1>
      <p style={{ fontSize: "0.85rem", color: C.muted, fontFamily: font.body, fontWeight: 300, lineHeight: 1.65, marginBottom: "1.5rem" }}>Build your real shared budget together. Your answers from the expectations exercise are reflected here.</p>

      {/* Summary bar */}
      <div style={{ background: "linear-gradient(135deg, #0f0c29, #1d1a4e)", borderRadius: 14, padding: "1.25rem 1.5rem", marginBottom: "1.5rem", color: "white", display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "1rem" }}>
        {[
          { label: "Monthly Income", value: "$" + totalIncome.toLocaleString(), color: "#34d399" },
          { label: "Monthly Expenses", value: "$" + totalExpenses.toLocaleString(), color: "#E8673A" },
          { label: remaining >= 0 ? "Surplus" : "Deficit", value: (remaining >= 0 ? "+" : "") + "$" + Math.abs(remaining).toLocaleString(), color: remaining >= 0 ? "#34d399" : "#f87171" },
        ].map(({ label, value, color }) => (
          <div key={label}>
            <div style={{ fontSize: "0.58rem", color: "rgba(255,255,255,0.45)", letterSpacing: "0.15em", textTransform: "uppercase", fontFamily: font.body, marginBottom: "0.25rem" }}>{label}</div>
            <div style={{ fontFamily: font.display, fontSize: "1.25rem", fontWeight: 700, color }}>{value}</div>
          </div>
        ))}
      </div>

      {/* Tabs */}
      <div style={{ display: "flex", gap: "0.4rem", flexWrap: "wrap", marginBottom: "1.25rem" }}>
        {tabs.map(tab => (
          <button key={tab.id} onClick={() => setActiveTab(tab.id)}
            style={{ background: activeTab === tab.id ? "#1B5FE8" : "white", color: activeTab === tab.id ? "white" : C.muted, border: "1.5px solid " + (activeTab === tab.id ? "#1B5FE8" : C.stone), padding: "0.35rem 0.75rem", borderRadius: 999, fontSize: "0.68rem", cursor: "pointer", fontFamily: font.body, fontWeight: activeTab === tab.id ? 600 : 400, transition: "all 0.15s" }}>{tab.label}</button>
        ))}
      </div>

      {/* Income tab */}
      {activeTab === "income" && (
        <div style={{ background: "white", border: "1.5px solid " + C.stone, borderRadius: 14, padding: "1.25rem" }}>
          <h3 style={{ fontFamily: font.display, fontSize: "1rem", fontWeight: 700, color: C.ink, marginBottom: "1rem" }}>Monthly Take-Home Income</h3>
          {[userName, partnerName].map(name => (
            <div key={name} style={{ marginBottom: "1rem" }}>
              <label style={{ fontSize: "0.72rem", fontWeight: 700, color: C.ink, fontFamily: font.body, display: "block", marginBottom: "0.35rem", letterSpacing: "0.06em", textTransform: "uppercase" }}>{name}'s monthly income</label>
              <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
                <span style={{ fontSize: "1rem", color: C.muted, fontFamily: font.body }}>$</span>
                <input type="number" value={incomes[name]} onChange={e => setIncomes({ ...incomes, [name]: e.target.value })} placeholder="0" style={{ flex: 1, padding: "0.65rem 0.85rem", borderRadius: 8, border: "1.5px solid " + C.stone, fontFamily: font.body, fontSize: "0.95rem", color: C.ink, outline: "none" }} />
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Expense tabs */}
      {BUDGET_CATEGORIES.map(cat => activeTab === cat.id && (
        <div key={cat.id} style={{ background: "white", border: "1.5px solid " + C.stone, borderRadius: 14, padding: "1.25rem" }}>
          <h3 style={{ fontFamily: font.display, fontSize: "1rem", fontWeight: 700, color: C.ink, marginBottom: "1rem" }}>{cat.icon} {cat.label}</h3>
          {cat.items.map(item => (
            <div key={item} style={{ display: "flex", alignItems: "center", gap: "1rem", marginBottom: "0.75rem", justifyContent: "space-between" }}>
              <label style={{ fontSize: "0.8rem", color: C.text, fontFamily: font.body, flex: 1 }}>{item}</label>
              <div style={{ display: "flex", alignItems: "center", gap: "0.4rem", flexShrink: 0 }}>
                <span style={{ fontSize: "0.9rem", color: C.muted }}>$</span>
                <input type="number" value={budget[cat.id + "__" + item] || ""} onChange={e => setBudget({ ...budget, [cat.id + "__" + item]: e.target.value })} placeholder="0" style={{ width: 90, padding: "0.45rem 0.6rem", borderRadius: 8, border: "1.5px solid " + C.stone, fontFamily: font.body, fontSize: "0.82rem", color: C.ink, outline: "none", textAlign: "right" }} />
              </div>
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}

// ======================================================
// OUR NOTES -- private conversation log
// ======================================================
function NotesView({ userName, partnerName, notesState, setNotesState, onBack }) {
  const font = { display: HFONT, body: BFONT };
  const [tab, setTab] = useState("shared");
  const tabs = [
    { id: "shared", label: "Shared Notes", emoji: "🤝", desc: "Things you want to remember together" },
    { id: "partner1", label: userName + "'s Notes", emoji: "👤", desc: "Your private reflections" },
    { id: "partner2", label: partnerName + "'s Notes", emoji: "👤", desc: partnerName + "'s private reflections" },
  ];
  const prompts = [
    "What surprised you most from the results?",
    "Where do you feel most aligned?",
    "What conversation do you most want to have?",
    "What did you learn about yourself?",
    "What do you want to revisit in a few months?",
  ];
  return (
    <div style={{ padding: "2.5rem 2rem", maxWidth: 680, margin: "0 auto" }}>
      <button onClick={onBack} style={{ background: "transparent", border: "none", color: C.muted, fontSize: "0.72rem", letterSpacing: "0.1em", textTransform: "uppercase", cursor: "pointer", fontFamily: font.body, padding: 0, marginBottom: "1.75rem" }}>← Back</button>
      <div style={{ marginBottom: "2rem" }}>
        <div style={{ fontSize: "0.6rem", letterSpacing: "0.22em", textTransform: "uppercase", color: C.muted, fontFamily: font.body, marginBottom: "0.4rem" }}>Your private notebook</div>
        <h1 style={{ fontFamily: font.display, fontSize: "1.9rem", fontWeight: 700, color: C.ink, lineHeight: 1.1, marginBottom: "0.5rem" }}>Our Notes</h1>
        <p style={{ fontSize: "0.82rem", color: C.muted, fontFamily: font.body, lineHeight: 1.7 }}>Log reflections, things you want to come back to, and conversations you've had. Saved to this device only.</p>
      </div>

      {/* Tab bar */}
      <div style={{ display: "flex", gap: "0.5rem", marginBottom: "1.75rem", flexWrap: "wrap" }}>
        {tabs.map(t => (
          <button key={t.id} onClick={() => setTab(t.id)}
            style={{ background: tab === t.id ? "#10b981" : C.warm, border: tab === t.id ? "1.5px solid #10b981" : "1.5px solid " + C.stone, color: tab === t.id ? "white" : C.muted, padding: "0.45rem 1rem", borderRadius: 999, fontSize: "0.72rem", fontWeight: tab === t.id ? 700 : 500, cursor: "pointer", fontFamily: font.body, transition: "all .15s", display: "flex", alignItems: "center", gap: "0.35rem" }}>
            <span>{t.emoji}</span> {t.label}
          </button>
        ))}
      </div>

      {/* Note area */}
      <div style={{ background: C.warm, border: "1.5px solid " + C.stone, borderRadius: 16, padding: "1.5rem", marginBottom: "1.5rem" }}>
        <p style={{ fontSize: "0.7rem", color: C.muted, fontFamily: font.body, marginBottom: "0.75rem" }}>{tabs.find(t => t.id === tab)?.desc}</p>
        <textarea
          value={notesState[tab]}
          onChange={e => setNotesState(prev => ({ ...prev, [tab]: e.target.value }))}
          placeholder={"Start writing..."}
          style={{ width: "100%", minHeight: 220, background: "white", border: "1.5px solid " + C.stone, borderRadius: 10, padding: "1rem", fontSize: "0.85rem", color: C.text, fontFamily: font.body, lineHeight: 1.75, resize: "vertical", outline: "none", boxSizing: "border-box" }}
          onFocus={e => e.target.style.borderColor = "#10b981"}
          onBlur={e => e.target.style.borderColor = C.stone}
        />
        <div style={{ fontSize: "0.65rem", color: C.muted, fontFamily: font.body, marginTop: "0.5rem", textAlign: "right" }}>
          {notesState[tab]?.length > 0 ? `${notesState[tab].length} characters · auto-saved` : "Nothing written yet"}
        </div>
      </div>

      {/* Conversation prompts */}
      <div style={{ background: "linear-gradient(135deg, rgba(16,185,129,.05), rgba(16,185,129,.02))", border: "1px solid rgba(16,185,129,.2)", borderRadius: 14, padding: "1.25rem" }}>
        <div style={{ fontSize: "0.65rem", letterSpacing: "0.15em", textTransform: "uppercase", color: "#10b981", fontWeight: 700, fontFamily: font.body, marginBottom: "0.85rem" }}>Prompts to get you started</div>
        <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
          {prompts.map((p, i) => (
            <button key={i} onClick={() => setNotesState(prev => ({ ...prev, [tab]: prev[tab] ? prev[tab] + "\n\n" + p + "\n" : p + "\n" }))}
              style={{ background: "white", border: "1px solid rgba(16,185,129,.2)", borderRadius: 8, padding: "0.6rem 0.85rem", fontSize: "0.78rem", color: C.text, fontFamily: font.body, cursor: "pointer", textAlign: "left", transition: "all .15s" }}
              onMouseEnter={e => { e.target.style.borderColor = "#10b981"; e.target.style.background = "rgba(16,185,129,.04)"; }}
              onMouseLeave={e => { e.target.style.borderColor = "rgba(16,185,129,.2)"; e.target.style.background = "white"; }}>
              + {p}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

// ======================================================
// LMFT SESSION -- Premium
// ======================================================
function LMFTSession({ userName, partnerName, onBack }) {
  const [selected, setSelected] = useState(null);
  const [confirmed, setConfirmed] = useState(false);

  const slots = [
    { id: "s1", day: "Tuesday", date: "Mar 18", time: "10:00 AM EST", therapist: "Dr. Maya Reyes", speciality: "Relationship transitions, communication, couples development" },
    { id: "s2", day: "Wednesday", date: "Mar 19", time: "2:00 PM EST", therapist: "Dr. Marcus Chen", speciality: "Premarital counseling, financial communication, life planning" },
    { id: "s3", day: "Thursday", date: "Mar 20", time: "11:00 AM EST", therapist: "Dr. Sofia Ortega", speciality: "Communication styles, values alignment, relationship growth" },
    { id: "s4", day: "Friday", date: "Mar 21", time: "4:00 PM EST", therapist: "Dr. Maya Reyes", speciality: "Relationship transitions, communication, couples development" },
    { id: "s5", day: "Monday", date: "Mar 24", time: "9:00 AM EST", therapist: "Dr. Marcus Chen", speciality: "Premarital counseling, financial communication, life planning" },
    { id: "s6", day: "Tuesday", date: "Mar 25", time: "3:00 PM EST", therapist: "Dr. Sofia Ortega", speciality: "Communication styles, values alignment, relationship growth" },
  ];

  if (confirmed) {
    const slot = slots.find(s => s.id === selected);
    return (
      <div style={{ maxWidth: 520, margin: "0 auto", textAlign: "center" }}>
        <button onClick={onBack} style={{ background: "transparent", border: "none", color: C.muted, fontSize: "0.72rem", letterSpacing: "0.1em", textTransform: "uppercase", cursor: "pointer", fontFamily: font.body, padding: 0, marginBottom: "2rem", display: "block", textAlign: "left" }}>← Back to Dashboard</button>
        <div style={{ width: 72, height: 72, borderRadius: "50%", background: "linear-gradient(135deg, #0f0c29, #1d1a4e)", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 1.25rem", fontSize: "1.8rem" }}>✓</div>
        <p style={{ fontFamily: font.display, fontSize: "1.8rem", fontWeight: 700, color: C.ink, marginBottom: "0.75rem", lineHeight: 1.1 }}>Session Confirmed.</p>
        <div style={{ background: "linear-gradient(135deg, #0f0c29, #1d1a4e)", borderRadius: 14, padding: "1.5rem", color: "white", marginBottom: "1.5rem", textAlign: "left" }}>
          <div style={{ fontSize: "0.58rem", letterSpacing: "0.2em", textTransform: "uppercase", color: "rgba(255,255,255,0.45)", marginBottom: "0.75rem", fontFamily: font.body }}>Your session details</div>
          <div style={{ fontFamily: font.display, fontSize: "1.1rem", fontWeight: 700, marginBottom: "0.35rem" }}>{slot.therapist}</div>
          <div style={{ fontSize: "0.82rem", color: "rgba(255,255,255,0.6)", fontFamily: font.body, marginBottom: "0.85rem" }}>{slot.speciality}</div>
          <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap" }}>
            {[{ label: "Date", val: slot.day + ", " + slot.date }, { label: "Time", val: slot.time }, { label: "Format", val: "Virtual · Zoom" }, { label: "Duration", val: "60 minutes" }].map(({ label, val }) => (
              <div key={label} style={{ background: "rgba(255,255,255,0.06)", borderRadius: 8, padding: "0.5rem 0.85rem" }}>
                <div style={{ fontSize: "0.55rem", color: "rgba(255,255,255,0.38)", letterSpacing: "0.15em", textTransform: "uppercase", fontFamily: font.body }}>{label}</div>
                <div style={{ fontSize: "0.82rem", color: "rgba(255,255,255,0.85)", fontFamily: font.body, marginTop: "0.15rem" }}>{val}</div>
              </div>
            ))}
          </div>
        </div>
        <p style={{ fontSize: "0.82rem", color: C.muted, fontFamily: font.body, fontWeight: 300, lineHeight: 1.7 }}>A calendar invite has been sent to both {userName} and {partnerName}. Your therapist will receive your joint results 24 hours before the session.</p>
      </div>
    );
  }

  return (
    <div style={{ maxWidth: 620, margin: "0 auto" }}>
      <button onClick={onBack} style={{ background: "transparent", border: "none", color: C.muted, fontSize: "0.72rem", letterSpacing: "0.1em", textTransform: "uppercase", cursor: "pointer", fontFamily: font.body, padding: 0, marginBottom: "1.5rem", display: "block" }}>← Back to Dashboard</button>
      <div style={{ fontSize: "0.6rem", letterSpacing: "0.22em", textTransform: "uppercase", color: "#3B5BDB", fontWeight: 700, fontFamily: font.body, marginBottom: "0.35rem" }}>Attune Premium</div>
      <h1 style={{ fontFamily: font.display, fontSize: "1.8rem", fontWeight: 700, color: C.ink, lineHeight: 1.1, marginBottom: "0.5rem" }}>Schedule Your LMFT Session</h1>
      <p style={{ fontSize: "0.85rem", color: C.muted, fontFamily: font.body, fontWeight: 300, lineHeight: 1.65, marginBottom: "0.35rem" }}>Your therapist will review your joint results before the session — so the hour is focused, specific to you, and actually useful. Not a first appointment. A real conversation about what your results mean.</p>
      <p style={{ fontSize: "0.78rem", color: C.muted, fontFamily: font.body, fontWeight: 300, lineHeight: 1.55, marginBottom: "1.75rem" }}>Both {userName} and {partnerName} attend together. 60 minutes, virtual.</p>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0.75rem", marginBottom: "1.5rem" }}>
        {slots.map(slot => (
          <div key={slot.id} onClick={() => setSelected(slot.id)}
            style={{ border: "1.5px solid " + (selected === slot.id ? "#3B5BDB" : C.stone), borderRadius: 12, padding: "1rem", cursor: "pointer", background: selected === slot.id ? "#F6F5FF" : "white", transition: "all 0.15s", boxShadow: selected === slot.id ? "0 4px 16px rgba(124,107,248,0.18)" : "none" }}>
            <div style={{ fontSize: "0.62rem", color: selected === slot.id ? "#3B5BDB" : C.muted, fontFamily: font.body, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: "0.25rem" }}>{slot.day}, {slot.date}</div>
            <div style={{ fontFamily: font.display, fontSize: "1rem", fontWeight: 700, color: C.ink, marginBottom: "0.25rem" }}>{slot.time}</div>
            <div style={{ fontSize: "0.72rem", color: selected === slot.id ? "#3B5BDB" : C.ink, fontFamily: font.body, fontWeight: 600, marginBottom: "0.2rem" }}>{slot.therapist}</div>
            <div style={{ fontSize: "0.68rem", color: C.muted, fontFamily: font.body, lineHeight: 1.4 }}>{slot.speciality.split(",")[0]}</div>
          </div>
        ))}
      </div>

      <button onClick={() => { if (selected) setConfirmed(true); }} disabled={!selected}
        style={{ width: "100%", background: selected ? "linear-gradient(135deg, #0f0c29, #1d1a4e)" : C.stone, color: selected ? "white" : C.muted, border: "none", padding: "1rem", fontSize: "0.78rem", letterSpacing: "0.1em", textTransform: "uppercase", cursor: selected ? "pointer" : "default", fontFamily: font.body, borderRadius: 12, fontWeight: 600 }}>
        Confirm Session {selected ? "→" : "— Select a Time First"}
      </button>
    </div>
  );
}

// ======================================================
// ANNIVERSARY RESULTS VIEW
// ======================================================
const SARAH_ANNIVERSARY_DEMO = {
  a0: 3,  // "Really good"
  a_memory: "You made coffee exactly how I like it this morning without me asking. Tiny thing. Noticed it.",
  a1: "Our first trip together to the coast. We got completely lost, laughed about it the whole way, and I remember thinking — this is someone I can be lost with forever.",
  a2: "The year we navigated the job change together. That was the first time I really felt like we were a team, not just two people in a relationship.",
  a_sat_conn: 3,  // "Quite connected"
  a_sat_comm: 2,  // "We manage"
  a_sat_fun: 2,   // "About right"
  a3: "The way you always notice when I'm struggling before I say anything. And how you've learned exactly when to give me space and when to pull me in.",
  a4: "More spontaneous adventures, even small ones. And I'd love for us to carve out real time each month that's just about us.",
  a5: "I want us to feel financially stable but still adventurous — not trapped by our own lives. And I want to still be choosing each other, obviously.",
  a6: "Being more present when I'm home. I catch myself half-somewhere-else too often. You deserve someone who's actually in the room.",
};
const JAMES_ANNIVERSARY_DEMO = {
  a0: 4,  // "Better than ever"
  a_memory: "You laughed at something I said in the car last week — actually laughed, not politely — and I thought, still got it.",
  a1: "That weekend in the mountains where we cooked every meal together and didn't look at our phones. It was the first time I remember feeling like we had a real home together, even in a rental cabin.",
  a2: "When you pushed me to go back to grad school. You believed I'd get in before I did. I think about that a lot.",
  a_sat_conn: 4,  // "Very connected"
  a_sat_comm: 3,  // "Pretty well"
  a_sat_fun: 1,   // "Less than I'd like"
  a3: "Your curiosity. You make me more interested in things I'd otherwise ignore. And the fact that you still laugh at my jokes.",
  a4: "I want to start some kind of shared ritual — something small and weekly that's just ours. A walk, a dinner, something consistent.",
  a5: "Somewhere with more space — a home we actually love. And a version of us that's less reactive and more intentional about the time we have.",
  a6: "I'm more willing to say what I need. I used to just hint around things and hope you'd catch it. I've gotten better at just saying it.",
};

// Derive insights from anniversary answers
function deriveAnniversaryInsights(mine, theirs, userName, partnerName) {
  const insights = [];
  const scaleQ = ANNIVERSARY_QUESTIONS.filter(q => q.type === "scale");

  // --- SCALE ALIGNMENT ---
  const scaleGaps = scaleQ.map(q => ({
    q,
    myVal: mine[q.id] ?? 2,
    theirVal: theirs[q.id] ?? 2,
    gap: Math.abs((mine[q.id] ?? 2) - (theirs[q.id] ?? 2)),
    avgVal: ((mine[q.id] ?? 2) + (theirs[q.id] ?? 2)) / 2,
  }));
  const overallGap = scaleGaps.filter(s=>s.q.id!=='a0').reduce((sum,s)=>sum+s.gap,0) / Math.max(scaleGaps.filter(s=>s.q.id!=='a0').length, 1);
  const biggestGap = scaleGaps.filter(s=>s.q.id!=='a0').sort((a,b)=>b.gap-a.gap)[0];
  const overallFeelGap = Math.abs((mine.a0 ?? 2) - (theirs.a0 ?? 2));
  const overallQ = ANNIVERSARY_QUESTIONS.find(q=>q.id==='a0');

  // Overall feel perception gap
  if (overallFeelGap >= 1 && overallQ) {
    const myLabel = overallQ.scaleLabels[mine.a0 ?? 2];
    const theirLabel = overallQ.scaleLabels[theirs.a0 ?? 2];
    insights.push({
      type: "explore",
      title: "You're experiencing this relationship from different vantage points",
      body: `${userName} describes the overall feel as "${myLabel}" — ${partnerName} says "${theirLabel}." Neither is wrong, and the gap doesn't mean one of you isn't paying attention. But it's worth understanding what's shaping each perspective.`,
      priority: "Have this conversation gently",
      action: `Ask each other: what would make this feel even better from where you're standing right now? Don't defend your own rating — get curious about theirs first.`,
    });
  } else if (overallQ) {
    const sharedLabel = overallQ.scaleLabels[Math.round(((mine.a0 ?? 2) + (theirs.a0 ?? 2)) / 2)];
    insights.push({
      type: "strength",
      title: "You're on the same page about how the relationship feels",
      body: `Both of you independently described the relationship as something close to "${sharedLabel}." Shared perception of where you are is a meaningful starting point — it means you're reading the same room.`,
      priority: "Build on this",
      action: `Name it together. When you both feel good about things but don't say it out loud, that warmth stays private. Saying "I feel like things are really good between us right now" creates a shared moment instead of parallel ones.`,
    });
  }

  // Fun gap
  const funQ = scaleGaps.find(s=>s.q.id==='a_sat_fun');
  if (funQ && funQ.gap >= 2) {
    const wantMoreFun = (mine.a_sat_fun ?? 2) < (theirs.a_sat_fun ?? 2) ? userName : partnerName;
    insights.push({
      type: "explore",
      title: "You're not aligned on how much lightness and fun you're getting",
      body: `${wantMoreFun} feels like you could be having more fun together than you currently are. This isn't a complaint about the relationship — it's a signal about what's been deprioritized.`,
      priority: "Easy win to act on",
      action: `Block something deliberately fun in the next two weeks — not a big trip, just something that has no productive purpose whatsoever. Fun doesn't usually happen by accident when life gets full.`,
    });
  } else if (funQ && funQ.avgVal >= 3) {
    insights.push({
      type: "strength",
      title: "You both feel like there's real lightness in what you have",
      body: `Both of you rate the fun and levity in your relationship positively. That matters more than it sounds — couples who laugh together regularly tend to weather hard periods better than those who save fun for vacations.`,
      priority: "Keep prioritizing it",
      action: `Don't let busyness quietly crowd out the small pleasures. Whatever's been creating lightness lately — protect it.`,
    });
  }

  // Communication gap
  const commQ = scaleGaps.find(s=>s.q.id==='a_sat_comm');
  if (commQ && commQ.gap >= 2) {
    const lowPerson = (mine.a_sat_comm ?? 2) < (theirs.a_sat_comm ?? 2) ? userName : partnerName;
    insights.push({
      type: "explore",
      title: "One of you finds hard conversations easier than the other does",
      body: `${lowPerson} rates how well you handle difficult conversations more cautiously than their partner does. This asymmetry is common — usually it means one person absorbs more friction before raising something, while the other thinks things resolve smoothly.`,
      priority: "Worth naming explicitly",
      action: `${lowPerson}: try naming one thing that's been sitting unspoken — not a criticism, just something you've been carrying. The other person likely doesn't know it's there.`,
    });
  }

  // --- SHARED FOUNDATION ---
  const bothMentionHome = (mine.a1 + mine.a2 + theirs.a1 + theirs.a2).toLowerCase();
  const homeWords = ["home","together","team","cabin","cook","cooked","space","belong","real"];
  const homeCount = homeWords.filter(w => bothMentionHome.includes(w)).length;
  if (homeCount >= 3) {
    insights.push({
      type: "strength",
      title: "You both anchor to the same thing",
      body: `Your defining moments both center on a felt sense of home — not a place, but a feeling you create together. That's harder to build than most couples realize, and you've already got it.`,
      priority: "Foundation to build from",
      action: "Name it explicitly. The next time one of you feels it — that this-is-home feeling — say it out loud. Making it visible keeps it alive.",
    });
  }

  // --- GRATITUDE RECIPROCITY ---
  const sarahGrateful = mine.a3.toLowerCase();
  const jamesGrateful = theirs.a3.toLowerCase();
  const noticeWords = ["notice","see","understand","get me","gets me","knows","space","pull"];
  const sarahFeelsKnown = noticeWords.some(w => sarahGrateful.includes(w));
  const jamesFeelsSeen = ["curiosity","curious","interest","interested","make me","laugh"].some(w => jamesGrateful.includes(w));
  if (sarahFeelsKnown || jamesFeelsSeen) {
    insights.push({
      type: "strength",
      title: "You each feel genuinely seen",
      body: `${userName} values being noticed before she has to say anything. ${partnerName} values the way she expands his world. These aren't just nice things to say — they're descriptions of how each of you is actually showing up for the other.`,
      priority: "Preserve intentionally",
      action: `${userName}: keep noticing. ${partnerName}: keep sharing what you find interesting. These are the things that decay quietly when life gets busy — protect them with the same intention you'd give to anything you don't want to lose.`,
    });
  }

  // --- WHAT THEY WANT NEXT ---
  const sarahNext = mine.a4.toLowerCase();
  const jamesNext = theirs.a4.toLowerCase();
  const adventureWords = ["adventure","spontaneous","trip","travel","explore","new","something different"];
  const ritualWords = ["ritual","routine","regular","weekly","walk","dinner","consistent","monthly","carve","time"];
  const sarahWantsAdventure = adventureWords.some(w => sarahNext.includes(w));
  const jamesWantsRitual = ritualWords.some(w => jamesNext.includes(w));

  if (sarahWantsAdventure && jamesWantsRitual) {
    insights.push({
      type: "explore",
      title: "You want the same closeness through different things",
      body: `${userName} is reaching for spontaneity and new experiences together. ${partnerName} is reaching for consistency and ritual. These aren't opposites — they're two different answers to the same underlying need: more intentional time that feels like us.`,
      priority: "Resolve this together",
      action: `Try this: pick one small weekly ritual (${partnerName}'s instinct) and one slightly bigger spontaneous thing per month (${userName}'s instinct). You're not compromising — you're combining. Start with what's easier to plan.`,
    });
  }

  // --- FIVE-YEAR PICTURE ---
  const sarahFive = mine.a5.toLowerCase();
  const jamesFive = theirs.a5.toLowerCase();
  const financialWords = ["stable","financial","money","save","security","secure","trapped"];
  const spaceWords = ["space","home","house","somewhere","live","room","intentional"];
  const sarahFinancial = financialWords.some(w => sarahFive.includes(w));
  const jamesSpace = spaceWords.some(w => jamesFive.includes(w));

  if (sarahFinancial && jamesSpace) {
    insights.push({
      type: "explore",
      title: "Your 5-year pictures share a theme — with different textures",
      body: `${userName} pictures financial stability that still leaves room for adventure. ${partnerName} pictures a home you genuinely love — more space, more intentionality about where you live. These visions are compatible but haven't been fully reconciled into a shared plan yet.`,
      priority: "Build a shared map",
      action: `Block an evening to talk about this specifically: what does "financially stable and still adventurous" look like in numbers and choices? What does "a home we love" mean in terms of location and timeline? The answers will shape a lot of smaller decisions you're probably already making independently.`,
    });
  }

  // --- GROWTH EDGES ---
  const sarahGrowth = mine.a6.toLowerCase();
  const jamesGrowth = theirs.a6.toLowerCase();
  const presenceWords = ["present","here","in the room","phone","distracted","somewhere else","half"];
  const expressionWords = ["say","tell","hint","communicate","speak","need","express","directly"];
  const sarahWorksOnPresence = presenceWords.some(w => sarahGrowth.includes(w));
  const jamesWorksOnExpression = expressionWords.some(w => jamesGrowth.includes(w));

  if (sarahWorksOnPresence && jamesWorksOnExpression) {
    insights.push({
      type: "strength",
      title: "Your growth edges are exactly what the other one needs",
      body: `${userName} is working on being more present. ${partnerName} is working on saying what he needs directly. Notice what's happening: each of you independently identified the thing that would most benefit the other person. That's rare.`,
      priority: "Make this mutual",
      action: `Tell each other. ${userName}: "I know I disappear sometimes — I'm working on it, and I want you to tell me when it's happening." ${partnerName}: "I'm going to try to say what I actually need instead of waiting for you to notice." Saying it out loud creates accountability and removes the guesswork.`,
    });
  }

  return insights;
}

const INSIGHT_COLORS = {
  strength: { bg: "#EDFAF5", border: "#10b981", label: "rgba(5,150,105,0.9)", labelBg: "#D1FAE5", dot: "#10b981" },
  explore:  { bg: "#FFF7ED", border: "#F59E0B", label: "rgba(180,83,9,0.9)",  labelBg: "#FEF3C7", dot: "#F59E0B" },
};

function AnniversaryResultsView({ userName, partnerName, myAnswers, onBack }) {
  const mine = myAnswers || SARAH_ANNIVERSARY_DEMO;
  const theirs = JAMES_ANNIVERSARY_DEMO;
  const [activeSection, setActiveSection] = useState("insights");
  const insights = deriveAnniversaryInsights(mine, theirs, userName, partnerName);

  const questions = [
    { id: "a1", label: "A moment that defined us", category: "Milestones" },
    { id: "a2", label: "Something that made us stronger", category: "Milestones" },
    { id: "a3", label: "What I'm most grateful for", category: "What matters" },
    { id: "a4", label: "What I want more of together", category: "What matters" },
    { id: "a5", label: "Where I see us in 5 years", category: "Looking forward" },
    { id: "a6", label: "What I want to work on", category: "Looking forward" },
  ];

  const sections = [
    { id: "insights", label: "Insights & Next Steps" },
    { id: "story",    label: "Side by Side" },
  ];

  return (
    <div style={{ animation: "slideUp 0.4s cubic-bezier(0.16,1,0.3,1)" }}>
      <style>{'@keyframes slideUp{from{opacity:0;transform:translateY(20px)}to{opacity:1;transform:translateY(0)}}'}</style>
      <link href={FONT_URL} rel="stylesheet" />

      {/* Hero */}
      <div style={{ background: "linear-gradient(145deg, #071a10, #0d3320, #0f3d26)", borderRadius: 20, padding: "2rem 2rem 1.75rem", marginBottom: "1.25rem", color: "white", position: "relative", overflow: "hidden" }}>
        <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 3, background: "linear-gradient(90deg, #10b981, #34d399)" }} />
        <div style={{ position: "absolute", bottom: -40, right: -20, width: 160, height: 160, borderRadius: "50%", background: "radial-gradient(circle, rgba(16,185,129,0.1), transparent 70%)", pointerEvents: "none" }} />
        <div style={{ fontSize: "0.6rem", letterSpacing: "0.22em", textTransform: "uppercase", color: "rgba(52,211,153,0.55)", marginBottom: "0.5rem", fontFamily: BFONT }}>Anniversary Collection · Relationship Reflection</div>
        <div style={{ fontSize: "clamp(1.8rem,5vw,2.4rem)", fontWeight: 700, fontFamily: HFONT, lineHeight: 1.1, marginBottom: "0.6rem" }}>
          {userName} & {partnerName}
        </div>
        <p style={{ fontSize: "0.8rem", color: "rgba(255,255,255,0.38)", fontFamily: BFONT, fontWeight: 300, lineHeight: 1.65, maxWidth: 460 }}>Both of you reflected independently. What follows draws out what's most meaningful — and what's worth prioritizing together next.</p>

        {/* Section tabs */}
        <div style={{ display: "flex", gap: "0.4rem", marginTop: "1.25rem" }}>
          {sections.map(s => (
            <button key={s.id} onClick={() => setActiveSection(s.id)}
              style={{ background: activeSection === s.id ? "rgba(52,211,153,0.18)" : "rgba(255,255,255,0.06)", border: "1px solid " + (activeSection === s.id ? "rgba(52,211,153,0.45)" : "rgba(255,255,255,0.1)"), color: activeSection === s.id ? "#34d399" : "rgba(255,255,255,0.4)", padding: "0.35rem 0.9rem", fontSize: "0.68rem", cursor: "pointer", fontFamily: BFONT, borderRadius: 999, fontWeight: activeSection === s.id ? 600 : 400, transition: "all 0.15s" }}>
              {s.label}
            </button>
          ))}
        </div>
      </div>

      {/* INSIGHTS TAB */}
      {activeSection === "insights" && (
        <div>
          {/* Scale snapshot */}
          <div style={{ background: "white", border: "1.5px solid " + C.stone, borderRadius: 16, padding: "1.25rem 1.25rem 1rem", marginBottom: "1.25rem", overflow: "hidden" }}>
            <div style={{ fontSize: "0.6rem", fontWeight: 700, color: C.clay, textTransform: "uppercase", letterSpacing: "0.18em", fontFamily: BFONT, marginBottom: "1rem" }}>How you're each feeling right now</div>
            {ANNIVERSARY_QUESTIONS.filter(q => q.type === "scale").map(q => {
              const myVal = mine[q.id] ?? 2;
              const theirVal = theirs[q.id] ?? 2;
              return (
                <div key={q.id} style={{ marginBottom: "0.85rem" }}>
                  <div style={{ fontSize: "0.72rem", color: C.ink, fontWeight: 500, fontFamily: BFONT, marginBottom: "0.45rem" }}>{q.text}</div>
                  <div style={{ display: "flex", flexDirection: "column", gap: "0.3rem" }}>
                    {[[userName, myVal, "#E8673A"], [partnerName, theirVal, "#1B5FE8"]].map(([name, val, color]) => (
                      <div key={name} style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
                        <div style={{ fontSize: "0.6rem", fontWeight: 700, color, width: 44, flexShrink: 0, fontFamily: BFONT }}>{name}</div>
                        <div style={{ display: "flex", gap: 3, flex: 1 }}>
                          {q.scaleLabels.map((_, i) => (
                            <div key={i} style={{ flex: 1, height: 7, borderRadius: 3, background: i <= val ? color : color + "22" }} />
                          ))}
                        </div>
                        <div style={{ fontSize: "0.62rem", color: C.muted, fontFamily: BFONT, width: 90, flexShrink: 0, textAlign: "right" }}>{q.scaleLabels[val]}</div>
                      </div>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>

          {/* Summary bar */}
          <div style={{ display: "flex", gap: "0.6rem", marginBottom: "1.25rem", flexWrap: "wrap" }}>
            {[
              { label: `${insights.filter(i=>i.type==="strength").length} strengths identified`, color: "#10b981", bg: "#EDFAF5" },
              { label: `${insights.filter(i=>i.type==="explore").length} areas to explore`, color: "#F59E0B", bg: "#FEF9EE" },
              { label: "11 questions · 2 voices", color: "#1B5FE8", bg: "#EEF0FF" },
            ].map(b => (
              <div key={b.label} style={{ background: b.bg, borderRadius: 8, padding: "0.3rem 0.7rem", display: "flex", alignItems: "center", gap: "0.3rem" }}>
                <div style={{ width: 6, height: 6, borderRadius: "50%", background: b.color, flexShrink: 0 }} />
                <span style={{ fontSize: "0.65rem", color: b.color, fontWeight: 600, fontFamily: BFONT }}>{b.label}</span>
              </div>
            ))}
          </div>

          {/* Insight cards */}
          {insights.map((ins, i) => {
            const col = INSIGHT_COLORS[ins.type] || INSIGHT_COLORS.explore;
            return (
              <div key={i} style={{ background: "white", border: "1.5px solid " + C.stone, borderRadius: 16, marginBottom: "1rem", overflow: "hidden" }}>
                {/* Card header */}
                <div style={{ padding: "0.85rem 1.25rem", borderBottom: "1px solid " + C.stone + "50", background: col.bg, display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: "0.75rem" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", flex: 1 }}>
                    <div style={{ width: 8, height: 8, borderRadius: "50%", background: col.dot, flexShrink: 0, marginTop: 1 }} />
                    <span style={{ fontFamily: font.display, fontSize: "0.9rem", fontWeight: 700, color: C.ink, lineHeight: 1.3 }}>{ins.title}</span>
                  </div>
                  <div style={{ background: col.labelBg, borderRadius: 999, padding: "0.2rem 0.6rem", flexShrink: 0 }}>
                    <span style={{ fontSize: "0.58rem", fontWeight: 700, color: col.label, fontFamily: BFONT, letterSpacing: "0.06em", textTransform: "uppercase" }}>
                      {ins.type === "strength" ? "Strength" : "Worth exploring"}
                    </span>
                  </div>
                </div>

                {/* Card body */}
                <div style={{ padding: "1.1rem 1.25rem" }}>
                  <p style={{ fontSize: "0.84rem", color: C.text, fontFamily: BFONT, fontWeight: 300, lineHeight: 1.75, marginBottom: "1rem" }}>{ins.body}</p>

                  {/* Action block */}
                  <div style={{ background: "#F9F7F4", borderRadius: 10, padding: "0.85rem 1rem", borderLeft: "3px solid " + col.dot }}>
                    <div style={{ fontSize: "0.58rem", fontWeight: 700, color: col.label, textTransform: "uppercase", letterSpacing: "0.1em", fontFamily: BFONT, marginBottom: "0.4rem" }}>
                      {ins.priority}
                    </div>
                    <p style={{ fontSize: "0.8rem", color: C.text, fontFamily: BFONT, fontWeight: 400, lineHeight: 1.7, margin: 0 }}>{ins.action}</p>
                  </div>
                </div>
              </div>
            );
          })}

          {/* Closing card */}
          <div style={{ background: "linear-gradient(145deg, #071a10, #0d3320)", borderRadius: 16, padding: "2rem", color: "white", textAlign: "center", marginTop: "0.5rem" }}>
            <div style={{ fontSize: "1.4rem", marginBottom: "0.75rem" }}>💚</div>
            <p style={{ fontFamily: font.display, fontSize: "1.15rem", fontWeight: 700, color: "white", marginBottom: "0.75rem", lineHeight: 1.3 }}>You're not starting from scratch. You're building on something real.</p>
            <p style={{ fontSize: "0.8rem", color: "rgba(255,255,255,0.4)", fontFamily: BFONT, fontWeight: 300, lineHeight: 1.75, maxWidth: 420, margin: "0 auto" }}>These reflections are yours to keep. Come back to them. The conversations they point to are the ones that matter — not because they're hard, but because they're about choosing each other with more intention.</p>
          </div>
        </div>
      )}

      {/* SIDE BY SIDE TAB */}
      {activeSection === "story" && (
        <div>
          {/* Group by category */}
          {["Milestones", "What matters", "Looking forward"].map(cat => {
            const catQs = questions.filter(q => q.category === cat);
            return (
              <div key={cat} style={{ marginBottom: "1.5rem" }}>
                <div style={{ fontSize: "0.6rem", letterSpacing: "0.2em", textTransform: "uppercase", color: "#10b981", fontWeight: 700, fontFamily: BFONT, marginBottom: "0.6rem" }}>{cat}</div>
                {catQs.map(q => (
                  <div key={q.id} style={{ background: "white", border: "1.5px solid " + C.stone, borderRadius: 14, marginBottom: "0.65rem", overflow: "hidden" }}>
                    <div style={{ padding: "0.7rem 1.1rem", borderBottom: "1px solid " + C.stone + "50", background: "#FAFAF8" }}>
                      <span style={{ fontFamily: font.display, fontSize: "0.82rem", fontWeight: 700, color: C.ink }}>{q.label}</span>
                    </div>
                    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr" }}>
                      {[[userName, mine[q.id], "#E8673A"], [partnerName, theirs[q.id], "#1B5FE8"]].map(([name, ans, col], i) => (
                        <div key={name} style={{ padding: "0.9rem 1.1rem", borderRight: i === 0 ? "1px solid " + C.stone + "40" : "none" }}>
                          <div style={{ fontSize: "0.58rem", letterSpacing: "0.14em", textTransform: "uppercase", color: col, fontWeight: 700, fontFamily: BFONT, marginBottom: "0.45rem" }}>{name}</div>
                          <p style={{ fontSize: "0.79rem", color: C.text, fontFamily: BFONT, fontWeight: 300, lineHeight: 1.72, margin: 0, fontStyle: "italic" }}>"{ans || "—"}"</p>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

// -- MAIN --
export default function App() {
  const params = new URLSearchParams(window.location.search);
  const initialView = params.get("view") || "home";
  const demoPkg = params.get("pkg") || "core"; // core | newlywed | anniversary | premium
  const [view, setView] = useState(initialView);
  const [activeResult, setActiveResult] = useState("overview");
  const userName = "Sarah", partnerName = "James";

  // Sarah's pre-populated answers (8 dimensions, 5 questions each)
  const sarahEx1 = {
    e1:2,e2:2,e3:1,e4:2,e5:1,
    d1:5,d2:5,d3:4,d4:5,d5:4,
    c1:2,c2:2,c3:1,c4:2,c5:1,
    a1:1,a2:2,a3:1,a4:2,a5:1,
    p1:2,p2:1,p3:2,p4:2,p5:1,
    x1:4,x2:5,x3:5,x4:4,x5:4,
    t1:4,t2:5,t3:4,t4:4,t5:4,
    ch1:2,ch2:2,ch3:2,ch4:1,ch5:2,
    ty1:2,ty2:1,ty3:2,ty4:4,ty5:5,ty6:4,
    ty7:5,ty8:5,ty9:4,ty10:2,ty11:1,ty12:2,
  };
  const sarahEx2 = {
    responsibilities: {
      "home__Cook weeknight dinners": "Both of us",
      "home__Grocery shopping": "Both of us",
      "home__Keep the house tidy day-to-day": "Both of us",
      "home__Do the laundry": "Both of us",
      "home__Manage home repairs": "Both of us",
      "home__Plan meals for the week": "Both of us",
      "home__Buy household supplies": "Both of us",
      "finance__Pay monthly bills": "James",
      "finance__Manage the household budget": "Both of us",
      "finance__Make major purchase decisions": "Both of us",
      "finance__Handle savings and investments": "James",
      "finance__File taxes": "James",
      "family__Plan visits with family": "Both of us",
      "family__Manage holiday logistics": "Both of us",
      "family__Plan date nights": "James",
      "family__Plan vacations": "Both of us",
      "family__Maintain friendships as a couple": "Both of us",
      "career__Be the primary income earner": "Both of us",
      "career__Prioritize career flexibility for family needs": "Both of us",
      "career__Make career sacrifices when children arrive": "Both of us",
      "parenting__Handle nighttime wake-ups with young children": "Both of us",
      "parenting__Do school drop-off and pick-up": "Both of us",
      "parenting__Manage children's schedules": "Both of us",
      "parenting__Be the primary caregiver": "Both of us",
      "parenting__Handle pediatric appointments": "Both of us",
      "emotional__Initiate difficult conversations": "Both of us",
      "emotional__Maintain emotional intimacy during stressful periods": "Both of us",
      "emotional__Be the one who reaches out first after a conflict": "Both of us",
      "emotional__Support a partner through hard times": "Both of us",
      "emotional__Carry the mental load of the household": "Both of us",
    },
    life: {
      lq1: "2",
      lq3: "Significant help when needed",
      lq4: "Side with my partner — they come first",
      lq6: "Fine as long as boundaries are respected",
      lq8: "Where we are now",
      lq9: "Open with conditions — it would need to benefit us both",
      lq10: "Present, but not defining",
      lq12: "Mostly combined with personal spending money",
      lq13: "Steadily saving while living well",
      lq17: "Fine with transparency and openness",
      lq19: "Essential — I need it constantly",
      lq20: "Goes up — I need more connection during hard times",
      lq21: "Together always — full consensus",
    }
  };
  const jamesEx1 = {
    e1:4,e2:5,e3:4,e4:5,e5:4,
    d1:2,d2:1,d3:2,d4:2,d5:1,
    c1:4,c2:4,c3:5,c4:5,c5:4,
    a1:4,a2:5,a3:4,a4:5,a5:4,
    p1:4,p2:4,p3:5,p4:4,p5:5,
    x1:2,x2:1,x3:2,x4:2,x5:2,
    t1:3,t2:2,t3:3,t4:3,t5:3,
    ch1:4,ch2:5,ch3:4,ch4:5,ch5:4,
    ty1:4,ty2:5,ty3:4,ty4:2,ty5:1,ty6:2,
    ty7:1,ty8:2,ty9:1,ty10:4,ty11:5,ty12:4,
  };

  const jamesEx2 = {
    responsibilities: {
      "home__Cook weeknight dinners": "Both of us",
      "home__Grocery shopping": "Both of us",
      "home__Keep the house tidy day-to-day": "Both of us",
      "home__Do the laundry": "Both of us",
      "home__Manage home repairs": "James",
      "home__Plan meals for the week": "Both of us",
      "home__Buy household supplies": "Both of us",
      "finance__Pay monthly bills": "Both of us",
      "finance__Manage the household budget": "Both of us",
      "finance__Make major purchase decisions": "Both of us",
      "finance__Handle savings and investments": "Both of us",
      "finance__File taxes": "Both of us",
      "family__Plan visits with family": "Both of us",
      "family__Manage holiday logistics": "Both of us",
      "family__Plan date nights": "Both of us",
      "family__Plan vacations": "Both of us",
      "family__Maintain friendships as a couple": "Both of us",
      "career__Be the primary income earner": "Both of us",
      "career__Prioritize career flexibility for family needs": "Both of us",
      "career__Make career sacrifices when children arrive": "Both of us",
      "parenting__Handle nighttime wake-ups with young children": "Both of us",
      "parenting__Do school drop-off and pick-up": "Both of us",
      "parenting__Manage children's schedules": "Both of us",
      "parenting__Be the primary caregiver": "Both of us",
      "parenting__Handle pediatric appointments": "Both of us",
      "emotional__Initiate difficult conversations": "Both of us",
      "emotional__Maintain emotional intimacy during stressful periods": "Both of us",
      "emotional__Be the one who reaches out first after a conflict": "Both of us",
      "emotional__Support a partner through hard times": "Both of us",
      "emotional__Carry the mental load of the household": "Both of us",
    },
    life: {
      lq1: "2",
      lq3: "Significant help when needed",
      lq4: "Side with my partner — they come first",
      lq6: "Fine as long as boundaries are respected",
      lq8: "Where we are now",
      lq9: "Open with conditions — it would need to benefit us both",
      lq10: "Present, but not defining",
      lq12: "Mostly combined with personal spending money",
      lq13: "Steadily saving while living well",
      lq17: "Completely fine — trust is the foundation",
      lq19: "Nice, but not a daily need",
      lq20: "Goes down — I pull back and need space",
      lq21: "Together always — full consensus",
    }
  };
  // Demo: start with pre-populated answers to show results immediately.
  // In production, these would be null until the user completes each exercise.
  // Demo pre-populated Sarah answers so all exercises and Results are accessible
  const sarahEx1Demo = {
    e1:1,e2:2,e3:1,e4:1,e5:1,
    d1:4,d2:5,d3:4,d4:5,d5:4,
    c1:1,c2:1,c3:2,c4:1,c5:1,
    a1:4,a2:4,a3:5,a4:4,a5:5,
    p1:1,p2:2,p3:1,p4:2,p5:1,
    x1:4,x2:5,x3:4,x4:5,x5:4,
    t1:4,t2:5,t3:4,t4:5,t5:4,
    ch1:2,ch2:1,ch3:2,ch4:1,ch5:2,
    ty1:1,ty2:2,ty3:1,ty4:4,ty5:5,ty6:4,
    ty7:5,ty8:4,ty9:5,ty10:1,ty11:2,ty12:1,
  };
  const sarahEx2Demo = {
    responsibilities: Object.fromEntries(Object.keys(jamesEx2.responsibilities).map(k => [k, "Both of us"])),
    life: {
      lq1:"1",lq3:"Significant help when needed",lq4:"Side with my partner — they come first",
      lq6:"Fine as long as boundaries are respected",lq8:"Where we are now",
      lq9:"Open with conditions — it would need to benefit us both",lq10:"Present, but not defining",
      lq12:"Mostly combined with personal spending money",lq13:"Steadily saving while living well",
      lq17:"Completely fine — trust is the foundation",lq19:"Very important to me",
      lq20:"Goes up — I need more connection during hard times",lq21:"Together always — full consensus",
    }
  };
  const sarahEx3Demo = demoPkg === "anniversary" ? Object.fromEntries(ANNIVERSARY_QUESTIONS.map(q => [q.id, q.type==="scale" ? 3 : (q.options?.[1] ?? "")])) : null;
  const [ex1Answers, setEx1State] = useState(sarahEx1Demo);
  const [ex2Answers, setEx2State] = useState(sarahEx2Demo);
  const [ex3Answers, setEx3State] = useState(sarahEx3Demo); // Anniversary exercise
  const [checklistState, setChecklistState] = useState({}); // Starting Out checklist
  const [budgetState, setBudgetState] = useState(null); // Premium budget tool
  const [notesState, setNotesState] = useState({ partner1: "", partner2: "", shared: "" }); // Conversation notes
  const partnerEx1 = jamesEx1;
  const partnerEx2 = jamesEx2;
  const bothDone = ex1Answers && ex2Answers;
  // Package config
  const pkgConfig = {
    core:        { label: "The Attune Assessment",     color: "#E8673A", hasChecklist: false, hasAnniversary: false, hasBudget: false, hasLMFT: false },
    newlywed:    { label: "Starting Out Collection",   color: "#E8673A", hasChecklist: true,  hasAnniversary: false, hasBudget: false, hasLMFT: false },
    anniversary: { label: "Anniversary Collection",    color: "#1B5FE8", hasChecklist: false, hasAnniversary: true,  hasBudget: false, hasLMFT: false },
    premium:     { label: "Attune Premium",            color: "#3B5BDB", hasChecklist: false, hasAnniversary: false, hasBudget: true,  hasLMFT: true  },
  };
  const pkg = pkgConfig[demoPkg] || pkgConfig.core;

  return (
    <div style={{ minHeight: "100vh", background: C.warm, fontFamily: font.body }}>
      <link href={FONT_LINK} rel="stylesheet" />
      {/* Top Nav */}
      <div style={{ position: "sticky", top: 0, zIndex: 100, background: "rgba(255,253,249,0.97)", backdropFilter: "blur(12px)", borderBottom: ("1px solid " + (C.stone)), padding: "0 1.5rem", height: 56, display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <div onClick={() => window.location.href = "/home"} style={{ display: "flex", alignItems: "center", gap: "0.5rem", cursor: "pointer" }}>
          <svg width="36" height="26" viewBox="0 0 103 76" fill="none" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <linearGradient id="appNavGrad" x1="0" y1="0" x2="103" y2="76" gradientUnits="userSpaceOnUse">
                <stop offset="0%" stopColor="#E8673A"/><stop offset="100%" stopColor="#1B5FE8"/>
              </linearGradient>
            </defs>
            {/* Left bubble: filled gradient, tail bottom-left, white heart */}
            <path d="M14,4 L44,4 A9,9 0 0,1 53,13 L53,42 A9,9 0 0,1 44,51 L20,51 L6,61 L11,51 A6,6 0 0,1 5,45 L5,13 A9,9 0 0,1 14,4 Z" fill="url(#appNavGrad)"/>
            <g transform="translate(13.16,11.3) scale(0.72)">
              <path d="M22 11 C20 8.5 16.5 5 11.5 5 C5.5 5 2 9.5 2 14.5 C2 23 11 30 22 40 C33 30 42 23 42 14.5 C42 9.5 38.5 5 32.5 5 C27.5 5 24 8.5 22 11 Z" fill="white" opacity="0.93"/>
            </g>
            {/* Right bubble: outline only, offset lower-right, tail bottom-right, gradient heart */}
            <path d="M89,14 L59,14 A9,9 0 0,0 50,23 L50,52 A9,9 0 0,0 59,61 L83,61 L97,71 L92,61 A6,6 0 0,0 98,55 L98,23 A9,9 0 0,0 89,14 Z" fill="none" stroke="url(#appNavGrad)" strokeWidth="2.2" strokeLinejoin="round"/>
            <g transform="translate(58.16,21.3) scale(0.72)">
              <path d="M22 11 C20 8.5 16.5 5 11.5 5 C5.5 5 2 9.5 2 14.5 C2 23 11 30 22 40 C33 30 42 23 42 14.5 C42 9.5 38.5 5 32.5 5 C27.5 5 24 8.5 22 11 Z" fill="url(#appNavGrad)"/>
            </g>
          </svg>
          <span style={{ fontFamily: font.display, fontSize: "0.95rem", fontWeight: 700, color: C.ink }}>Attune</span>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
          {[
            { ex: "exercise1", label: "Ex 01 ✓", color: "#E8673A" },
            { ex: "exercise2", label: "Ex 02 ✓", color: "#1B5FE8" },
            ...(pkg.hasAnniversary ? [{ ex: "exercise3", label: "Reflection ✓", color: "#10b981" }] : []),
          ].map(({ ex, label, color }) => (
            <button key={ex}
              onClick={() => setView(ex)}
              style={{ background: view === ex ? color + "15" : "transparent", border: "none", cursor: "pointer", display: "flex", alignItems: "center", gap: "0.35rem", padding: "0.3rem 0.6rem", borderRadius: 6, opacity: view === ex ? 1 : 0.65, transition: "all .15s" }}>
              <div style={{ width: 6, height: 6, borderRadius: "50%", background: color }} />
              <span style={{ fontSize: "0.68rem", color: C.text, fontFamily: font.body, letterSpacing: "0.03em", fontWeight: view === ex ? 600 : 400 }}>{label}</span>
            </button>
          ))}
          {pkg.hasChecklist && (
            <button onClick={() => setView("checklist")}
              style={{ background: view === "checklist" ? "#E8673A15" : "transparent", border: "none", cursor: "pointer", display: "flex", alignItems: "center", gap: "0.35rem", padding: "0.3rem 0.6rem", borderRadius: 6, opacity: view === "checklist" ? 1 : 0.65, transition: "all .15s" }}>
              <div style={{ width: 6, height: 6, borderRadius: "50%", background: "#E8673A" }} />
              <span style={{ fontSize: "0.68rem", color: C.text, fontFamily: font.body, letterSpacing: "0.03em" }}>Checklist</span>
            </button>
          )}
          {pkg.hasBudget && (
            <button onClick={() => setView("budget")}
              style={{ background: view === "budget" ? "#1B5FE815" : "transparent", border: "none", cursor: "pointer", display: "flex", alignItems: "center", gap: "0.35rem", padding: "0.3rem 0.6rem", borderRadius: 6, opacity: view === "budget" ? 1 : 0.65, transition: "all .15s" }}>
              <div style={{ width: 6, height: 6, borderRadius: "50%", background: "#1B5FE8" }} />
              <span style={{ fontSize: "0.68rem", color: C.text, fontFamily: font.body, letterSpacing: "0.03em" }}>Budget Tool</span>
            </button>
          )}
          {pkg.hasLMFT && (
            <button onClick={() => setView("lmft")}
              style={{ background: view === "lmft" ? "#3B5BDB15" : "transparent", border: "none", cursor: "pointer", display: "flex", alignItems: "center", gap: "0.35rem", padding: "0.3rem 0.6rem", borderRadius: 6, opacity: view === "lmft" ? 1 : 0.65, transition: "all .15s" }}>
              <div style={{ width: 6, height: 6, borderRadius: "50%", background: "#3B5BDB" }} />
              <span style={{ fontSize: "0.68rem", color: C.text, fontFamily: font.body, letterSpacing: "0.03em" }}>LMFT Session</span>
            </button>
          )}
          <button onClick={() => setView("notes")}
            style={{ background: view === "notes" ? "#10b98115" : "transparent", border: "none", cursor: "pointer", display: "flex", alignItems: "center", gap: "0.35rem", padding: "0.3rem 0.6rem", borderRadius: 6, opacity: view === "notes" ? 1 : 0.65, transition: "all .15s" }}>
            <div style={{ width: 6, height: 6, borderRadius: "50%", background: "#10b981" }} />
            <span style={{ fontSize: "0.68rem", color: C.text, fontFamily: font.body, letterSpacing: "0.03em" }}>Our Notes</span>
          </button>
          <button
            onClick={() => setView("results")}
            style={{ background: "linear-gradient(135deg, #E8673A, #1B5FE8)", color: "white", border: "none", padding: "0.38rem 0.9rem", fontSize: "0.65rem", letterSpacing: "0.08em", textTransform: "uppercase", cursor: "pointer", fontFamily: font.body, borderRadius: 999, marginLeft: "0.35rem", fontWeight: 600, transition: "opacity .2s" }}>
            Results ✓
          </button>
          <button onClick={() => window.location.href = "/portal"} style={{ width: 32, height: 32, borderRadius: "50%", background: C.stone, border: "none", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", marginLeft: "0.25rem", fontSize: "0.95rem" }} title="Your Profile">👤</button>
        </div>
      </div>

      <div style={{ maxWidth: 860, margin: "0 auto", padding: view === "results" ? 0 : "3rem 2rem" }}>
        {view === "home" && (
          <div style={{ maxWidth: 620, margin: "0 auto" }}>
            {/* Package badge + greeting */}
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "1.5rem", flexWrap: "wrap", gap: "0.75rem" }}>
              <div>
                <div style={{ fontSize: "0.6rem", letterSpacing: "0.22em", textTransform: "uppercase", color: C.muted, fontFamily: font.body, marginBottom: "0.25rem" }}>Welcome back</div>
                <div style={{ fontFamily: font.display, fontSize: "1.6rem", fontWeight: 700, color: C.ink, lineHeight: 1.1 }}>{userName}</div>
              </div>
              <div style={{ background: pkg.color + "12", border: "1px solid " + pkg.color + "30", borderRadius: 999, padding: "0.35rem 0.85rem" }}>
                <span style={{ fontSize: "0.65rem", fontWeight: 700, color: pkg.color, letterSpacing: "0.08em", textTransform: "uppercase", fontFamily: font.body }}>{pkg.label}</span>
              </div>
            </div>

            {/* Exercise cards */}
            {[
              { num:"01", title:"How You Communicate", sub:"Your energy, conflict style, how love lands, and how you show up in a relationship", time:"~10 min · 40 questions", done:true, ex:"exercise1", color:"#E8673A", bg:"#FFF0EB" },
              { num:"02", title:"What You Expect", sub:"Responsibilities, finances, family, and the assumptions that quietly shape everything", time:"~15 min · 2 parts", done:true, ex:"exercise2", color:"#1B5FE8", bg:"#EEF0FF" },
              ...(pkg.hasAnniversary ? [{ num:"03", title:"Our Relationship Story", sub:"The moments that shaped you, what's been most meaningful, and where you're headed next", time:"~12 min · reflection", done:!!ex3Answers, ex:"exercise3", color:"#10b981", bg:"#EDFAF5" }] : []),
            ].map(({ num, title, sub, time, done, ex, color, bg }) => (
              <div key={ex} onClick={() => setView(ex)}
                style={{ border: "1.5px solid " + (done ? color + "50" : C.stone), borderRadius: 14, cursor: "pointer", background: done ? bg : "white", overflow: "hidden", marginBottom: "0.85rem", transition: "all 0.15s", boxShadow: done ? "0 2px 16px " + color + "18" : "0 1px 6px rgba(0,0,0,0.04)", display: "flex", alignItems: "stretch" }}
                onMouseEnter={e => { e.currentTarget.style.transform = "translateY(-2px)"; e.currentTarget.style.boxShadow = "0 6px 24px " + color + "25"; }}
                onMouseLeave={e => { e.currentTarget.style.transform = ""; e.currentTarget.style.boxShadow = done ? "0 2px 16px " + color + "18" : "0 1px 6px rgba(0,0,0,0.04)"; }}>
                <div style={{ background: done ? color : C.stone + "80", width: 52, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                  <span style={{ fontFamily: font.display, fontSize: "1.1rem", fontWeight: 700, color: done ? "rgba(255,255,255,0.9)" : C.muted }}>{done ? "✓" : num}</span>
                </div>
                <div style={{ padding: "0.9rem 1.1rem", flex: 1 }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
                    <h3 style={{ fontFamily: font.display, fontSize: "0.98rem", fontWeight: 700, color: C.ink, marginBottom: "0.18rem", lineHeight: 1.2 }}>{title}</h3>
                    <span style={{ fontSize: "0.68rem", color: done ? color : C.clay, fontWeight: 700, fontFamily: font.body, marginLeft: "1rem", flexShrink: 0 }}>{done ? "Retake →" : "Begin →"}</span>
                  </div>
                  <p style={{ fontSize: "0.75rem", color: done ? color + "cc" : C.muted, fontFamily: font.body, marginBottom: "0.35rem", fontWeight: done ? 500 : 300, lineHeight: 1.45 }}>{sub}</p>
                  <span style={{ fontSize: "0.63rem", color: C.muted, fontFamily: font.body, letterSpacing: "0.04em" }}>{time}</span>
                </div>
              </div>
            ))}

            {/* Checklist — Starting Out */}
            {pkg.hasChecklist && (
              <div onClick={() => setView("checklist")}
                style={{ border: "1.5px solid #E8673A40", borderRadius: 14, cursor: "pointer", background: "#FFF8F5", marginBottom: "0.85rem", transition: "all 0.15s", display: "flex", alignItems: "stretch" }}
                onMouseEnter={e => { e.currentTarget.style.transform = "translateY(-2px)"; e.currentTarget.style.boxShadow = "0 6px 24px #E8673A18"; }}
                onMouseLeave={e => { e.currentTarget.style.transform = ""; e.currentTarget.style.boxShadow = ""; }}>
                <div style={{ background: "#E8673A", width: 52, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, borderRadius: "14px 0 0 14px" }}>
                  <span style={{ fontSize: "1.1rem" }}>☑</span>
                </div>
                <div style={{ padding: "0.9rem 1.1rem", flex: 1 }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
                    <h3 style={{ fontFamily: font.display, fontSize: "0.98rem", fontWeight: 700, color: C.ink, marginBottom: "0.18rem" }}>Starting Out Checklist</h3>
                    <span style={{ fontSize: "0.68rem", color: "#E8673A", fontWeight: 700, fontFamily: font.body, marginLeft: "1rem" }}>Open →</span>
                  </div>
                  <p style={{ fontSize: "0.75rem", color: "#E8673Acc", fontFamily: font.body, fontWeight: 500, lineHeight: 1.45, marginBottom: "0.35rem" }}>Finances, name changes, estate basics, and the real-world logistics of building a life together</p>
                  <span style={{ fontSize: "0.63rem", color: C.muted, fontFamily: font.body, letterSpacing: "0.04em" }}>7 checklist areas · included with your package</span>
                </div>
              </div>
            )}

            {/* Budget Tool — Premium */}
            {pkg.hasBudget && (
              <div onClick={() => setView("budget")}
                style={{ border: "1.5px solid #1B5FE840", borderRadius: 14, cursor: "pointer", background: "#F6F7FF", marginBottom: "0.85rem", transition: "all 0.15s", display: "flex", alignItems: "stretch" }}
                onMouseEnter={e => { e.currentTarget.style.transform = "translateY(-2px)"; e.currentTarget.style.boxShadow = "0 6px 24px #1B5FE818"; }}
                onMouseLeave={e => { e.currentTarget.style.transform = ""; e.currentTarget.style.boxShadow = ""; }}>
                <div style={{ background: "#1B5FE8", width: 52, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, borderRadius: "14px 0 0 14px" }}>
                  <span style={{ fontSize: "1.1rem" }}>💰</span>
                </div>
                <div style={{ padding: "0.9rem 1.1rem", flex: 1 }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
                    <h3 style={{ fontFamily: font.display, fontSize: "0.98rem", fontWeight: 700, color: C.ink, marginBottom: "0.18rem" }}>Shared Budget Tool</h3>
                    <span style={{ fontSize: "0.68rem", color: "#1B5FE8", fontWeight: 700, fontFamily: font.body, marginLeft: "1rem" }}>Open →</span>
                  </div>
                  <p style={{ fontSize: "0.75rem", color: "#1B5FE8cc", fontFamily: font.body, fontWeight: 500, lineHeight: 1.45, marginBottom: "0.35rem" }}>Build a real shared budget together — with context from your expectations results</p>
                  <span style={{ fontSize: "0.63rem", color: C.muted, fontFamily: font.body, letterSpacing: "0.04em" }}>Interactive · collaborative · Premium exclusive</span>
                </div>
              </div>
            )}

            {/* LMFT Session — Premium */}
            {pkg.hasLMFT && (
              <div onClick={() => setView("lmft")}
                style={{ border: "1.5px solid rgba(124,107,248,0.35)", borderRadius: 14, cursor: "pointer", background: "linear-gradient(135deg, rgba(15,12,41,0.04), rgba(29,26,78,0.06))", marginBottom: "0.85rem", transition: "all 0.15s", display: "flex", alignItems: "stretch" }}
                onMouseEnter={e => { e.currentTarget.style.transform = "translateY(-2px)"; e.currentTarget.style.boxShadow = "0 6px 24px rgba(124,107,248,0.15)"; }}
                onMouseLeave={e => { e.currentTarget.style.transform = ""; e.currentTarget.style.boxShadow = ""; }}>
                <div style={{ background: "linear-gradient(135deg, #0f0c29, #1d1a4e)", width: 52, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, borderRadius: "14px 0 0 14px" }}>
                  <span style={{ fontSize: "1.1rem" }}>🎙</span>
                </div>
                <div style={{ padding: "0.9rem 1.1rem", flex: 1 }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
                    <h3 style={{ fontFamily: font.display, fontSize: "0.98rem", fontWeight: 700, color: C.ink, marginBottom: "0.18rem" }}>LMFT Session</h3>
                    <span style={{ fontSize: "0.68rem", color: "#3B5BDB", fontWeight: 700, fontFamily: font.body, marginLeft: "1rem" }}>Schedule →</span>
                  </div>
                  <p style={{ fontSize: "0.75rem", color: "#3B5BDBbb", fontFamily: font.body, fontWeight: 500, lineHeight: 1.45, marginBottom: "0.35rem" }}>60-min virtual session with a licensed therapist who reviews your results beforehand</p>
                  <span style={{ fontSize: "0.63rem", color: C.muted, fontFamily: font.body, letterSpacing: "0.04em" }}>$175 value · included · schedule anytime</span>
                </div>
              </div>
            )}

            {/* Notes card — always visible */}
            <div onClick={() => setView("notes")}
              style={{ border: "1.5px solid rgba(16,185,129,.3)", borderRadius: 14, cursor: "pointer", background: "rgba(16,185,129,.04)", marginBottom: "0.85rem", transition: "all 0.15s", display: "flex", alignItems: "stretch" }}
              onMouseEnter={e => { e.currentTarget.style.transform = "translateY(-2px)"; e.currentTarget.style.boxShadow = "0 6px 24px rgba(16,185,129,.12)"; }}
              onMouseLeave={e => { e.currentTarget.style.transform = ""; e.currentTarget.style.boxShadow = ""; }}>
              <div style={{ background: "#10b981", width: 52, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, borderRadius: "14px 0 0 14px" }}>
                <span style={{ fontSize: "1.1rem" }}>📝</span>
              </div>
              <div style={{ padding: "0.9rem 1.1rem", flex: 1 }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
                  <h3 style={{ fontFamily: font.display, fontSize: "0.98rem", fontWeight: 700, color: C.ink, marginBottom: "0.18rem" }}>Our Notes</h3>
                  <span style={{ fontSize: "0.68rem", color: "#10b981", fontWeight: 700, fontFamily: font.body, marginLeft: "1rem" }}>Open →</span>
                </div>
                <p style={{ fontSize: "0.75rem", color: "rgba(16,185,129,.8)", fontFamily: font.body, fontWeight: 500, lineHeight: 1.45, marginBottom: "0.35rem" }}>Log reflections and conversations as you work through your results together</p>
                <span style={{ fontSize: "0.63rem", color: C.muted, fontFamily: font.body, letterSpacing: "0.04em" }}>Private · saved to your device · yours to keep</span>
              </div>
            </div>

            {/* Results CTA */}
            <div style={{ background: "linear-gradient(145deg, #0f0c29, #1d1a4e, #24243e)", padding: "2rem 2rem 1.75rem", borderRadius: 18, position: "relative", overflow: "hidden", marginTop: "1.25rem", boxShadow: "0 8px 40px rgba(15,12,41,0.25)" }}>
              <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 3, background: "linear-gradient(90deg, #E8673A, #1B5FE8)" }} />
              <div style={{ position: "absolute", bottom: -60, right: -30, width: 200, height: 200, borderRadius: "50%", background: "radial-gradient(circle, rgba(91,109,248,0.12), transparent 70%)", pointerEvents: "none" }} />
              <div style={{ fontSize: "0.58rem", letterSpacing: "0.22em", textTransform: "uppercase", color: "rgba(232,103,58,0.65)", fontFamily: font.body, marginBottom: "0.5rem" }}>Ready to explore</div>
              <div style={{ fontFamily: font.display, fontSize: "1.45rem", fontWeight: 700, color: "white", lineHeight: 1.1, marginBottom: "0.6rem" }}>{userName} & {partnerName}</div>
              <p style={{ fontSize: "0.82rem", color: "rgba(245,239,230,0.4)", fontWeight: 300, marginBottom: "1.5rem", lineHeight: 1.7, fontFamily: font.body, maxWidth: 340 }}>Built entirely from your independent answers. Nobody performed. What you'll see is how you actually are — together.</p>
              <button onClick={() => setView("results")}
                style={{ background: "linear-gradient(135deg, #E8673A, #d4592f)", color: "white", border: "none", padding: "0.85rem 2.25rem", fontSize: "0.75rem", letterSpacing: "0.1em", textTransform: "uppercase", cursor: "pointer", fontFamily: font.body, borderRadius: 12, boxShadow: "0 6px 24px rgba(232,103,58,0.4)", fontWeight: 600, transition: "all 0.2s" }}
                onMouseEnter={e => { e.currentTarget.style.transform = "translateY(-2px)"; e.currentTarget.style.boxShadow = "0 10px 32px rgba(232,103,58,0.5)"; }}
                onMouseLeave={e => { e.currentTarget.style.transform = ""; e.currentTarget.style.boxShadow = "0 6px 24px rgba(232,103,58,0.4)"; }}>
                See Your Results →
              </button>
            </div>
          </div>
        )}
        {view === "exercise1" && (
          <div>
            {ex1Answers
              ? <div style={{ textAlign: "center", padding: "4rem 1rem 3rem", maxWidth: 440, margin: "0 auto" }}>
                  <div style={{ width: 72, height: 72, borderRadius: "50%", background: "linear-gradient(135deg, #E8673A, #1B5FE8)", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 1.25rem", fontSize: "1.8rem" }}>✓</div>
                  <p style={{ fontFamily: font.display, fontSize: "2rem", fontWeight: 700, color: C.ink, marginBottom: "0.5rem", lineHeight: 1.1 }}>Exercise 1 Complete.</p>
                  <p style={{ fontSize: "0.78rem", letterSpacing: "0.1em", textTransform: "uppercase", color: "#4CAF50", fontWeight: 700, fontFamily: font.body, marginBottom: "1.25rem" }}>Your communication profile is mapped</p>
                  <div style={{ display: "flex", gap: "0.35rem", flexWrap: "wrap", justifyContent: "center", marginBottom: "1.5rem" }}>
                    {Object.entries(DIM_META).map(([key, m]) => (
                      <div key={key} style={{ background: m.color + "20", border: ("1px solid " + m.color + "40"), borderRadius: 6, padding: "0.2rem 0.5rem", display: "flex", alignItems: "center", gap: "0.25rem" }}>
                        <span style={{ fontSize: "0.65rem" }}>{m.emoji}</span>
                        <span style={{ fontSize: "0.55rem", color: m.color, fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.05em", fontFamily: font.body }}>{m.label}</span>
                      </div>
                    ))}
                  </div>
                  <p style={{ fontSize: "0.88rem", color: C.muted, fontFamily: font.body, fontWeight: 300, marginBottom: "2rem", lineHeight: 1.75 }}>{bothDone ? ("Both exercises complete. Your results are ready.") : ("Now complete Exercise 2, then invite " + partnerName + " to do the same.")}</p>
                  <div style={{ display: "flex", gap: "0.75rem", justifyContent: "center", flexWrap: "wrap" }}>
                    <button onClick={() => setEx1State(null)} style={{ background: "transparent", border: ("1.5px solid " + (C.stone)), color: C.muted, padding: "0.6rem 1.25rem", fontSize: "0.7rem", letterSpacing: "0.1em", textTransform: "uppercase", cursor: "pointer", fontFamily: font.body, borderRadius: 8 }}>Retake</button>
                    {bothDone
                      ? <button onClick={() => setView("results")} style={{ background: "linear-gradient(135deg, #E8673A, #1B5FE8)", color: "white", border: "none", padding: "0.6rem 1.75rem", fontSize: "0.7rem", letterSpacing: "0.1em", textTransform: "uppercase", cursor: "pointer", fontFamily: font.body, borderRadius: 8, fontWeight: 600 }}>See Your Results →</button>
                      : <button onClick={() => setView("home")} style={{ background: C.ink, color: "white", border: "none", padding: "0.6rem 1.5rem", fontSize: "0.7rem", letterSpacing: "0.1em", textTransform: "uppercase", cursor: "pointer", fontFamily: font.body, borderRadius: 8 }}>Back to Dashboard →</button>
                    }
                  </div>
                </div>
              : <PersonalityExercise userName={userName} onComplete={a => { setEx1State(a); }} />
            }
          </div>
        )}

        {view === "exercise2" && (
          <div>
            {ex2Answers
              ? <div style={{ textAlign: "center", padding: "4rem 1rem 3rem", maxWidth: 440, margin: "0 auto" }}>
                  <div style={{ width: 72, height: 72, borderRadius: "50%", background: "linear-gradient(135deg, #E8673A, #1B5FE8)", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 1.25rem", fontSize: "1.8rem" }}>✓</div>
                  <p style={{ fontFamily: font.display, fontSize: "2rem", fontWeight: 700, color: C.ink, marginBottom: "0.5rem", lineHeight: 1.1 }}>Exercise 2 Complete.</p>
                  <p style={{ fontSize: "0.78rem", letterSpacing: "0.1em", textTransform: "uppercase", color: "#1B5FE8", fontWeight: 700, fontFamily: font.body, marginBottom: "1.25rem" }}>Your expectations are recorded</p>
                  <p style={{ fontSize: "0.92rem", color: C.muted, fontFamily: font.body, fontWeight: 300, marginBottom: "0.75rem", lineHeight: 1.75 }}>That took honesty. Most couples never have these conversations until they have to.</p>
                  <p style={{ fontSize: "0.88rem", color: C.muted, fontFamily: font.body, fontWeight: 300, marginBottom: "2rem", lineHeight: 1.75 }}>{bothDone ? ("Both exercises complete. Your results are ready.") : ("Now invite " + partnerName + " to complete both exercises independently.")}</p>
                  <div style={{ display: "flex", gap: "0.75rem", justifyContent: "center", flexWrap: "wrap" }}>
                    <button onClick={() => setEx2State(null)} style={{ background: "transparent", border: ("1.5px solid " + (C.stone)), color: C.muted, padding: "0.6rem 1.25rem", fontSize: "0.7rem", letterSpacing: "0.1em", textTransform: "uppercase", cursor: "pointer", fontFamily: font.body, borderRadius: 8 }}>Retake</button>
                    {bothDone
                      ? <button onClick={() => setView("results")} style={{ background: "linear-gradient(135deg, #E8673A, #1B5FE8)", color: "white", border: "none", padding: "0.6rem 1.75rem", fontSize: "0.7rem", letterSpacing: "0.1em", textTransform: "uppercase", cursor: "pointer", fontFamily: font.body, borderRadius: 8, fontWeight: 600 }}>See Your Results →</button>
                      : <button onClick={() => setView("home")} style={{ background: C.ink, color: "white", border: "none", padding: "0.6rem 1.5rem", fontSize: "0.7rem", letterSpacing: "0.1em", textTransform: "uppercase", cursor: "pointer", fontFamily: font.body, borderRadius: 8 }}>Back to Dashboard →</button>
                    }
                  </div>
                </div>
              : <ExpectationsExercise userName={userName} partnerName={partnerName} onComplete={a => { setEx2State(a); }} />
            }
          </div>
        )}

      </div>

        {/* ── EXERCISE 3: Anniversary Reflection ── */}
        {view === "exercise3" && pkg.hasAnniversary && (
          <div style={{ maxWidth: 620, margin: "0 auto" }}>
            {ex3Answers ? (
              <div style={{ textAlign: "center", padding: "4rem 1rem 3rem", maxWidth: 440, margin: "0 auto" }}>
                <div style={{ width: 72, height: 72, borderRadius: "50%", background: "linear-gradient(135deg, #10b981, #059669)", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 1.25rem", fontSize: "1.8rem" }}>✓</div>
                <p style={{ fontFamily: font.display, fontSize: "1.8rem", fontWeight: 700, color: C.ink, marginBottom: "0.5rem", lineHeight: 1.1 }}>Reflection Complete.</p>
                <p style={{ fontSize: "0.78rem", letterSpacing: "0.1em", textTransform: "uppercase", color: "#10b981", fontWeight: 700, fontFamily: font.body, marginBottom: "1.5rem" }}>Your relationship story is captured</p>
                <div style={{ display: "flex", gap: "0.75rem", justifyContent: "center", flexWrap: "wrap" }}>
                  <button onClick={() => setEx3State(null)} style={{ background: "transparent", border: "1.5px solid " + C.stone, color: C.muted, padding: "0.6rem 1.25rem", fontSize: "0.7rem", letterSpacing: "0.1em", textTransform: "uppercase", cursor: "pointer", fontFamily: font.body, borderRadius: 8 }}>Retake</button>
                  <button onClick={() => setView("results")} style={{ background: "linear-gradient(135deg, #10b981, #059669)", color: "white", border: "none", padding: "0.6rem 1.75rem", fontSize: "0.7rem", letterSpacing: "0.1em", textTransform: "uppercase", cursor: "pointer", fontFamily: font.body, borderRadius: 8, fontWeight: 600 }}>See Your Results →</button>
                </div>
              </div>
            ) : (
              <AnniversaryExercise userName={userName} partnerName={partnerName} onComplete={a => setEx3State(a)} onBack={() => setView("home")} />
            )}
          </div>
        )}

        {/* ── CHECKLIST: Starting Out ── */}
        {view === "checklist" && pkg.hasChecklist && (
          <StartingOutChecklist userName={userName} partnerName={partnerName} onBack={() => setView("home")} checklistState={checklistState} setChecklistState={setChecklistState} />
        )}

        {/* ── BUDGET TOOL: Premium ── */}
        {view === "budget" && pkg.hasBudget && (
          <BudgetTool userName={userName} partnerName={partnerName} onBack={() => setView("home")} budgetState={budgetState} setBudgetState={setBudgetState} />
        )}

        {/* ── LMFT SESSION: Premium ── */}
        {view === "lmft" && pkg.hasLMFT && (
          <LMFTSession userName={userName} partnerName={partnerName} onBack={() => setView("home")} />
        )}

        {/* ── OUR NOTES ── */}
        {view === "notes" && (
          <NotesView userName={userName} partnerName={partnerName} notesState={notesState} setNotesState={setNotesState} onBack={() => setView("home")} />
        )}

    {view === "results" && (
          <div style={{ position: "fixed", top: 56, left: 0, right: 0, bottom: 0, display: "flex", flexDirection: "column", overflow: "hidden", zIndex: 50, background: C.warm }}>
            <div style={{ background: "rgba(255,253,249,0.97)", backdropFilter: "blur(12px)", borderBottom: ("1px solid " + (C.stone)), padding: "0.65rem 1.5rem", flexShrink: 0, display: "flex", alignItems: "center", gap: "0.5rem" }}>
              <button onClick={() => setView("home")} style={{ background: "transparent", border: "none", color: C.clay, fontSize: "0.72rem", letterSpacing: "0.1em", textTransform: "uppercase", cursor: "pointer", fontFamily: font.body, padding: 0, fontWeight: 600 }}>← Profile</button>
              {activeResult !== "overview" && (
                <>
                  <span style={{ color: C.clay, fontSize: "1rem", fontWeight: 700, lineHeight: 1, margin: "0 4px", opacity: 0.7 }}>›</span>
                  <button onClick={() => { setActiveResult("overview"); document.querySelector("[data-results-scroll]") && (document.querySelector("[data-results-scroll]").scrollTop = 0); }}
                    style={{ background: "transparent", border: "none", color: C.clay, fontSize: "0.72rem", letterSpacing: "0.1em", textTransform: "uppercase", cursor: "pointer", fontFamily: font.body, padding: 0, fontWeight: 600 }}>Overview</button>
                  <span style={{ color: C.clay, fontSize: "1rem", fontWeight: 700, lineHeight: 1, margin: "0 4px", opacity: 0.7 }}>›</span>
                  <span style={{ fontSize: "0.72rem", letterSpacing: "0.1em", textTransform: "uppercase", color: C.ink, fontFamily: font.body, fontWeight: 700 }}>
                    {activeResult === "personality" ? "Communication" : activeResult === "expectations" ? "Expectations" : "Relationship Reflection"}
                  </span>
                </>
              )}
            </div>
            <div data-results-scroll style={{ flex: 1, overflowY: "auto" }}>
              <div style={{ maxWidth: 920, margin: "0 auto", padding: "1.25rem 1.5rem 0" }}>
                {activeResult === "overview" && <JointOverview
                  ex1Answers={ex1Answers || sarahEx1} partnerEx1={partnerEx1}
                  ex2Answers={ex2Answers || sarahEx2} partnerEx2={partnerEx2}
                  ex3Answers={ex3Answers || (pkg.hasAnniversary ? SARAH_ANNIVERSARY_DEMO : null)}
                  partnerEx3={pkg.hasAnniversary ? JAMES_ANNIVERSARY_DEMO : null}
                  hasAnniversary={pkg.hasAnniversary}
                  userName={userName} partnerName={partnerName}
                  onGoPersonality={() => setActiveResult("personality")}
                  onGoExpectations={() => setActiveResult("expectations")}
                  onGoAnniversary={() => setActiveResult("anniversary")}
                />}
                {activeResult === "personality" && <PersonalityResults myAnswers={ex1Answers || sarahEx1} partnerAnswers={partnerEx1} userName={userName} partnerName={partnerName} />}
                {activeResult === "expectations" && <ExpectationsResults myAnswers={ex2Answers || sarahEx2} partnerAnswers={partnerEx2} userName={userName} partnerName={partnerName} />}
                {activeResult === "anniversary" && pkg.hasAnniversary && <AnniversaryResultsView userName={userName} partnerName={partnerName} myAnswers={ex3Answers} onBack={() => setActiveResult("overview")} />}
              </div>
              {/* Dark footer banner */}
              <div style={{ marginTop: "3rem", background: "#0E0B07", width: "100%" }}>
                <div style={{ maxWidth: 920, margin: "0 auto", padding: "3rem 1.5rem 0" }}>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 2fr", gap: "3rem", paddingBottom: "2.5rem", borderBottom: "1px solid rgba(255,255,255,.08)" }}>
                  <div>
                    <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", marginBottom: "0.75rem" }}>
                      <svg width="36" height="26" viewBox="0 0 103 76" fill="none"><defs><linearGradient id="ftGrad" x1="0" y1="0" x2="103" y2="76" gradientUnits="userSpaceOnUse"><stop offset="0%" stopColor="#E8673A"/><stop offset="100%" stopColor="#1B5FE8"/></linearGradient></defs><path d="M14,4 L44,4 A9,9 0 0,1 53,13 L53,42 A9,9 0 0,1 44,51 L20,51 L6,61 L11,51 A6,6 0 0,1 5,45 L5,13 A9,9 0 0,1 14,4 Z" fill="url(#ftGrad)"/><path d="M22 11 C20 8.5 16.5 5 11.5 5 C5.5 5 2 9.5 2 14.5 C2 23 11 30 22 40 C33 30 42 23 42 14.5 C42 9.5 38.5 5 32.5 5 C27.5 5 24 8.5 22 11 Z" fill="white" opacity="0.93" transform="translate(13.16,11.3) scale(0.72)"/><path d="M89,14 L59,14 A9,9 0 0,0 50,23 L50,52 A9,9 0 0,0 59,61 L83,61 L97,71 L92,61 A6,6 0 0,0 98,55 L98,23 A9,9 0 0,0 89,14 Z" fill="none" stroke="url(#ftGrad)" strokeWidth="2.2" strokeLinejoin="round"/><path d="M22 11 C20 8.5 16.5 5 11.5 5 C5.5 5 2 9.5 2 14.5 C2 23 11 30 22 40 C33 30 42 23 42 14.5 C42 9.5 38.5 5 32.5 5 C27.5 5 24 8.5 22 11 Z" fill="url(#ftGrad)" transform="translate(58.16,21.3) scale(0.72)"/></svg>
                      <span style={{ fontFamily: HFONT, fontSize: "1.05rem", fontWeight: 700, color: "white" }}>Attune</span>
                    </div>
                    <p style={{ fontSize: "0.82rem", color: "rgba(255,255,255,.4)", lineHeight: 1.7, fontFamily: BFONT, fontWeight: 300 }}>Understand each other deeply.<br/>And how to grow together.</p>
                  </div>
                  <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "1.5rem" }}>
                    {[
                      { title: "Product", links: [["Home", "/home"], ["How it works", "/how-it-works"], ["Gifts & Packages", "/offerings"], ["Get started", "/portal"]] },
                      { title: "Learn", links: [["How it works", "/how-it-works"], ["What's included", "/whats-included"], ["Resources", "/resources"], ["FAQs", "/faq"], ["Reviews", "/reviews"]] },
                      { title: "Support", links: [["FAQs", "/faq"], ["Contact us", "mailto:hello@attune.com"], ["Privacy policy", "/legal"], ["Terms of service", "/legal#terms"]] },
                    ].map(({ title, links }) => (
                      <div key={title}>
                        <div style={{ fontSize: "0.6rem", letterSpacing: "0.2em", textTransform: "uppercase", color: "rgba(255,255,255,.3)", fontFamily: BFONT, fontWeight: 700, marginBottom: "0.85rem" }}>{title}</div>
                        {links.map(([label, href]) => (
                          <a key={label} href={href} style={{ display: "block", fontSize: "0.82rem", color: "rgba(255,255,255,.5)", textDecoration: "none", marginBottom: "0.5rem", fontFamily: BFONT, transition: "color .15s" }}
                            onMouseOver={e => e.target.style.color = "rgba(255,255,255,.85)"}
                            onMouseOut={e => e.target.style.color = "rgba(255,255,255,.5)"}
                          >{label}</a>
                        ))}
                      </div>
                    ))}
                  </div>
                </div>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "1.25rem 0", flexWrap: "wrap", gap: "0.5rem" }}>
                  <p style={{ fontSize: "0.75rem", color: "rgba(255,255,255,.25)", fontFamily: BFONT, margin: 0 }}>© 2025 Attune.</p>
                  <p style={{ fontSize: "0.75rem", color: "rgba(255,255,255,.25)", fontFamily: BFONT, margin: 0 }}>hello@attune.com</p>
                </div>
                </div>
              </div>
            </div>
          </div>
        )}

    </div>
  );
}

