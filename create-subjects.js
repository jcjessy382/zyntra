
const fs = require("fs");

const subjects = [
  {
    file: "kiswahili.html",
    name: "Kiswahili",
    icon: "🗣️",
    topics: ["Sarufi", "Insha", "Fasihi", "Ufahamu", "Matumizi ya Lugha", "Methali na Nahau"]
  },
  {
    file: "geography.html",
    name: "Geography",
    icon: "🌍",
    topics: ["Map Work", "Weather and Climate", "Rocks", "Landforms", "Vegetation", "Population"]
  },
  {
    file: "history.html",
    name: "History and Government",
    icon: "🏛️",
    topics: ["Early Civilisations", "Trade", "Colonisation", "Independence", "Government", "Citizenship"]
  },
  {
    file: "business.html",
    name: "Business Studies",
    icon: "💼",
    topics: ["Business and Its Environment", "Entrepreneurship", "Commerce", "Banking", "Insurance", "Bookkeeping"]
  },
  {
    file: "agriculture.html",
    name: "Agriculture",
    icon: "🌱",
    topics: ["Soil", "Crop Production", "Livestock", "Farm Tools", "Farm Records", "Agricultural Economics"]
  },
  {
    file: "cre.html",
    name: "Christian Religious Education",
    icon: "📖",
    topics: ["Creation", "Faith and Trust", "The Life of Jesus", "Christian Values", "The Church", "Contemporary Issues"]
  },
  {
    file: "french.html",
    name: "French",
    icon: "🇫🇷",
    topics: ["Greetings", "Grammar", "Vocabulary", "Reading", "Writing", "Conversation"]
  },
  {
    file: "arabic.html",
    name: "Arabic",
    icon: "🌙",
    topics: ["Arabic Alphabet", "Greetings", "Vocabulary", "Grammar", "Reading", "Writing"]
  },
  {
    file: "accounting.html",
    name: "Accounting",
    icon: "🧾",
    topics: ["Accounting Principles", "Source Documents", "Journals", "Ledgers", "Trial Balance", "Financial Statements"]
  },
  {
    file: "social-studies.html",
    name: "Social Studies",
    icon: "🌐",
    topics: ["Our Community", "Citizenship", "Culture", "Environment", "Leadership", "Human Rights"]
  },
  {
    file: "general-science.html",
    name: "General Science",
    icon: "🔬",
    topics: ["Scientific Method", "Matter", "Energy", "Living Things", "Forces", "Environment"]
  },
  {
    file: "art.html",
    name: "Art and Design",
    icon: "🎨",
    topics: ["Elements of Art", "Drawing", "Colour Theory", "Painting", "Design", "Art Appreciation"]
  },
  {
    file: "music.html",
    name: "Music",
    icon: "🎵",
    topics: ["Musical Elements", "Rhythm", "Melody", "Notation", "Instruments", "Singing"]
  },
  {
    file: "home-science.html",
    name: "Home Science",
    icon: "🏡",
    topics: ["Nutrition", "Food Preparation", "Clothing", "Home Management", "Hygiene", "Consumer Education"]
  },
  {
    file: "physical-education.html",
    name: "Physical Education",
    icon: "🏃",
    topics: ["Physical Fitness", "Athletics", "Team Sports", "Gymnastics", "Health and Safety", "Rules of Games"]
  }
];

function escapeHTML(value) {
  return value.replace(/[&<>"']/g, char => ({
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': "&quot;",
    "'": "&#39;"
  })[char]);
}

function makePage(subject) {
  const cards = subject.topics.map((topic, index) => `
    <article class="topic">
      <div class="topic-icon">${index + 1}</div>
      <h2>${escapeHTML(topic)}</h2>
      <p>Explore the key concepts, important definitions and examples in ${escapeHTML(topic)}.</p>
      <button type="button" onclick="toggleTopic(${index})"
        aria-expanded="false" id="button${index}">
        Explore Topic
      </button>
      <div class="notes" id="notes${index}" hidden>
        <h3>Introduction to ${escapeHTML(topic)}</h3>
        <p>This topic introduces ${escapeHTML(topic)} and its importance in ${escapeHTML(subject.name)}.</p>
        <p>As you study, write down key terms, understand their meanings, review examples and practise questions from your class notes.</p>
        <p><strong>Study task:</strong> Write three things you have learned about ${escapeHTML(topic)} and create two revision questions.</p>
      </div>
    </article>
  `).join("");

  return `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>ZYNTRA | ${escapeHTML(subject.name)}</title>
<style>
*{box-sizing:border-box;margin:0;padding:0}
body{background:#070711;color:#fff;font-family:Arial,sans-serif;min-height:100vh}
header{padding:18px 5%;border-bottom:1px solid #292744;display:flex;justify-content:space-between;align-items:center;gap:15px;flex-wrap:wrap;background:#0b0b19}
.logo{font-size:24px;font-weight:900;letter-spacing:2px;text-decoration:none;background:linear-gradient(90deg,#a78bfa,#60a5fa);background-clip:text;-webkit-background-clip:text;color:transparent}
nav{display:flex;gap:15px;flex-wrap:wrap}
nav a{color:#c5c5dc;text-decoration:none;font-size:14px}
nav a:hover{color:#fff}
main{width:90%;max-width:1150px;margin:auto}
.hero{text-align:center;padding:55px 10px 35px}
.icon{font-size:48px;margin-bottom:15px}
.tag{display:inline-block;padding:8px 13px;border:1px solid #3d2b68;background:#17132b;color:#c4b5fd;border-radius:25px;font-size:12px;margin-bottom:17px}
h1{font-size:clamp(30px,5vw,45px);margin-bottom:15px}
h1 span{background:linear-gradient(90deg,#a78bfa,#60a5fa);background-clip:text;-webkit-background-clip:text;color:transparent}
.hero p{color:#aaaac5;line-height:1.8;max-width:700px;margin:auto}
.actions{display:flex;justify-content:center;gap:12px;flex-wrap:wrap;margin-top:24px}
.actions a{padding:12px 18px;border-radius:10px;text-decoration:none;font-weight:bold;background:linear-gradient(90deg,#8b5cf6,#3b82f6);color:white}
.actions a.secondary{background:#151526;border:1px solid #292744}
.section-title{margin:25px 0 20px}
.section-title h2{font-size:25px;margin-bottom:8px}
.section-title p{color:#aaaac5;line-height:1.7}
.topics{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:18px;padding-bottom:60px}
.topic{align-self:start;background:linear-gradient(145deg,#111124,#0c0c18);border:1px solid #292744;border-radius:16px;padding:22px}
.topic-icon{width:38px;height:38px;display:grid;place-items:center;border-radius:11px;background:#20173a;color:#c4b5fd;font-weight:bold;margin-bottom:15px}
.topic h2{font-size:19px;margin-bottom:10px}
.topic p{font-size:14px;line-height:1.7;color:#aaaac5;margin-bottom:16px}
button{width:100%;padding:12px;border:0;border-radius:9px;background:linear-gradient(90deg,#8b5cf6,#3b82f6);color:white;font-weight:bold;cursor:pointer}
.notes{border-top:1px solid #292744;margin-top:18px;padding-top:17px}
.notes h3{font-size:16px;margin-bottom:12px}
.notes p{margin-bottom:12px}
footer{text-align:center;padding:25px;border-top:1px solid #292744;color:#aaaac5;font-size:13px}
@media(max-width:800px){.topics{grid-template-columns:repeat(2,minmax(0,1fr))}}
@media(max-width:540px){.topics{grid-template-columns:1fr}header{justify-content:center}nav{justify-content:center}.hero{padding-top:35px}}
</style>
</head>
<body>
<header>
<a href="index.html" class="logo">ZYNTRA</a>
<nav>
<a href="index.html">Home</a>
<a href="study.html">Smart Study</a>
<a href="ai.html">ZYNTRA AI</a>
<a href="community.html">Community</a>
</nav>
</header>
<main>
<section class="hero">
<div class="icon">${subject.icon}</div>
<div class="tag">ZYNTRA SMART STUDY</div>
<h1>Study <span>${escapeHTML(subject.name)}</span></h1>
<p>Explore your topics, review the introductions and build your understanding step by step.</p>
<div class="actions">
<a href="study.html">← Back to Smart Study</a>
<a class="secondary" href="index.html">Go to Home</a>
</div>
</section>
<section>
<div class="section-title">
<h2>Topics to Explore</h2>
<p>Select a topic to reveal its introduction and a study task.</p>
</div>
<div class="topics">${cards}</div>
</section>
</main>
<footer>© 2026 ZYNTRA | Learn, practise and improve.</footer>
<script>
function toggleTopic(index) {
  const notes = document.getElementById("notes" + index);
  const button = document.getElementById("button" + index);
  const opening = notes.hidden;
  notes.hidden = !opening;
  button.textContent = opening ? "Close Topic" : "Explore Topic";
  button.setAttribute("aria-expanded", String(opening));
}
</script>
</body>
</html>`;
}

let created = 0;

for (const subject of subjects) {
  if (!fs.existsSync(subject.file)) {
    console.log("Skipped missing file: " + subject.file);
    continue;
  }

  if (fs.statSync(subject.file).size > 0) {
    console.log("Protected existing page: " + subject.file);
    continue;
  }

  fs.writeFileSync(subject.file, makePage(subject), "utf8");
  console.log("Created subject page: " + subject.file);
  created++;
}

console.log("\nFinished. Created " + created + " subject pages.");
