# make-works-work-again
Make WaterlooWorks Work Again!


# 🎯 Job Board Highlighter Extension

Are you tired of endlessly doomscrolling WaterlooWorks just to max out on your applications with 2 interviews (1 of which you're not qualified for)? This Chrome/Edge extension automatically highlights jobs based on their seniority levels and flags SWPP jobs (sorry citizens, I'll make that toggle-able in the next update) and 8-month required jobs.
---

## ✅ Features

- 🔹 **Color-coded job levels**  
  Automatically highlights rows based on job level:
  - Junior
  - Intermediate
  - Senior

- ⏰ **Deadline urgency detection**  
  Jobs with less than 1 days to deadline get visually marked.

- 🧠 **Keyword scanners for job descriptions**
  - Detects “SWPP” and throws a red warning banner + audio cue.
  - Does the same for "8 month consecutive work term required" but with a green banner.
  - Easy to extend for more keywords in code, but I'm planning to let users add their own keyword warnings.

- 🧪 **Manual reload button**  
  Sort or filter the table? Just hit “🔄 Reload” at the top-right to re-highlight. I'm working to make this automatic. 

---

## 💻 Installation

1. Download the extension files from this repo.
2. Open Chrome/Edge and go to `chrome://extensions/` or `edge://extensions/`.
3. Enable **Developer mode**.
4. Click **Load unpacked** and select the folder with the extension files.
5. Since it is an unpacked extension, you will have to redo this process every time and reload the extension every time it updates.

---

## 📂 File Structure
./
├── manifest.json
├── content.js
├── style.css
└── README.md

## ✍️ Customization

To add more keyword alerts:
1. Open `content.js`
2. Scroll to the `triggers` array in `detectKeywordsInModal()`
3. Add a new `{ keyword: "YOUR KEYWORD", action: () => { ... } }`

---

## 🚨 Disclaimer

This extension was made specifically for WaterlooWorks. While it can easily be extended to other sites too, and for WW too for future updates, many features may or may not work as they are hard-coded into WaterlooWorks' structure.

Most of the code was written with assistance from AI tools like ChatGPT, Copilot and Cursor.

---

## 🙌 Contribute

If you’ve got cool ideas or want to bring back features from the old WaterlooWorks, which I never had the privilige of using, feel free to open a PR or issue.

---

## 🔒 License

MIT. Free to use, modify, and share.