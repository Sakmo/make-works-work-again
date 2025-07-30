function getLevelKey(levelText) {
  const clean = levelText.toLowerCase().replace(/[\s,]+/g, '');
  const levels = ["junior", "intermediate", "senior"];
  const found = levels.filter(lvl => clean.includes(lvl));
  return found.sort().join("-");
}

function isUrgent(dateString) {
  const cleanDateStr = dateString.replace(/\s*\(.*?\)\s*/g, "").trim();
  const deadline = new Date(cleanDateStr);

  // If date fails to parse, bail
  if (isNaN(deadline.getTime())) {
    console.warn("Invalid deadline:", dateString);
    return false;
  }

  const now = new Date(); // ← this must be inside every time it's called
  const threeDaysLater = new Date(now.getTime() + 24 * 60 * 60 * 1000);

  return deadline < threeDaysLater;
}


function showBanner({ text, color = "crimson", duration = 4000 }) {
  const banner = document.createElement("div");
  banner.innerText = text;
  banner.style.cssText = `
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    background: ${color};
    color: white;
    text-align: center;
    font-size: 1.5rem;
    font-weight: bold;
    padding: 1rem;
    z-index: 999999;
  `;
  document.body.appendChild(banner);
  setTimeout(() => banner.remove(), duration);
}

function playBeep() {
    const audio = new Audio("https://actions.google.com/sounds/v1/alarms/beep_short.ogg");
    audio.volume = 1;
    audio.play().catch(() => console.warn("User hasn't interacted yet, can't autoplay"));
}

function detectKeywordsInModal() {
  const modal = document.querySelector('.modal__inner--document-overlay');
  if (!modal) return;

  const jobText = modal.innerText.toUpperCase(); // UPPERCASE for easy matching

  const triggers = [
    {
      keyword: "SWPP",
      action: () => {
        showBanner({ text: "❌ SWPP JOB DETECTED ❌", color: "crimson" });
        playBeep();
      }
    },
    {
      keyword: "8 MONTH CONSECUTIVE WORK TERM REQUIRED",
      action: () => {
        showBanner({ text: "❌ 8-MONTH REQUIRED ROLE ❌", color: "green" });
        playBeep();
      }
    }
    // 👇 Add more detections easily here later
  ];

  for (const trigger of triggers) {
    if (jobText.includes(trigger.keyword)) {
      trigger.action();
    }
  }
}







function getColumnIndexes() {
  const headerCells = document.querySelectorAll('tr.table__row--header th');
  let levelIndex = -1, deadlineIndex = -1;

  headerCells.forEach((cell, i) => {
    const text = cell.innerText.toLowerCase();
    if (text.includes("level") || text.includes("type")) {
      levelIndex = i;
      deadlineIndex = i + 2; 
    }
  });

  return { levelIndex, deadlineIndex };
}



function highlightJobs() {

  document.querySelectorAll('tr.table__row--body').forEach((row) => {
    const cells = row.querySelectorAll("td");
    if (cells.length === 0) return;

    const levelText = cells[5]?.innerText?.trim() || '';
    const deadlineText = cells[7]?.innerText?.trim() || '';

    const levelKey = getLevelKey(levelText);
    console.log("Level:", levelText, "Deadline: ", deadlineText);

    // ✅ REMOVE old level- and urgent classes
    row.className = row.className
    .split(" ")
    .filter(cls => !cls.startsWith("level-") && cls !== "urgent")
    .join(" ");

    
    // ✅ ADD level class
    if (levelKey) row.classList.add(`level-${levelKey}`);

    // ✅ HANDLE urgency CLEANLY
    if (isUrgent(deadlineText)) {
      row.classList.add("urgent");
    }
  });
}








function waitForTableAndRun() {
  const interval = setInterval(() => {
    const rows = document.querySelectorAll('tr.table__row--body');
    if (rows.length > 0) {
      clearInterval(interval);
      highlightJobs();
    }
  }, 500);
}



function setupManualReloadButton() {
  try {
    if (document.getElementById("job-highlighter-button")) return;

    const button = document.createElement("button");
    button.id = "job-highlighter-button";
    button.textContent = "🔄 Reload";

    // Make it lowkey and layout-neutral
    button.style.cssText = `
      position: fixed;
      top: 12px;
      right: 12px;
      z-index: 999999;
      padding: 6px 12px;
      background: rgba(252, 186, 3, 1);
      color: #000;
      border: none;
      border-radius: 4px;
      font-size: 13px;
      cursor: pointer;
      opacity: 0.9;
      box-shadow: 0 1px 4px rgba(0,0,0,0.3);
    `;

    button.addEventListener("click", () => {
      console.log("Re-highlighting jobs...");
      highlightJobs();
    });

    document.body.appendChild(button);
  } catch (err) {
    console.warn("Could not create reload button:", err);
  }
}



function observeTableChanges() {
  const table = document.querySelector("table");
  if (!table) return;

  const observer = new MutationObserver(() => {
    highlightJobs();
  });

  observer.observe(table, {
    childList: true,
    subtree: true
  });
}


function detectSWPP() {
  const modal = document.querySelector('.modal__inner--document-overlay');
  if (!modal) return;

  const jobText = modal.innerText || "";
  if (jobText.toUpperCase().includes("SWPP")) {
    swppWarning();
  }
}

console.log("Job Highlighter script injected");

document.addEventListener("click", function (e) {
  const link = e.target.closest('a[href="javascript:void(0)"]');
  if (link) {
    setTimeout(detectKeywordsInModal, 400); // Delay to let modal populate
  }
});


waitForTableAndRun();
setupManualReloadButton();
observeTableChanges();
