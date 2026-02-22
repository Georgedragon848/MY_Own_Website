# George Jojo — Cybersecurity Portfolio

A hacker-style cybersecurity portfolio featuring a cinematic Matrix intro animation
that transitions into a fully interactive Linux-like terminal interface.

Built with **pure HTML, CSS, and Vanilla JavaScript** — zero dependencies.

---

## 🗂 Project Structure

```
cyber-portfolio/
 ├── index.html   — Page structure & canvas/terminal layout
 ├── style.css    — Dark hacker theme, neon green, animations
 └── script.js    — Matrix rain, terminal engine, command system
```

---

## 🚀 Deploy on Vercel

### Method 1 — Drag & Drop (Easiest)

1. Go to [vercel.com](https://vercel.com) and sign in (free account).
2. On the dashboard, click **"Add New → Project"**.
3. Drag the entire `cyber-portfolio/` folder into the upload zone.
4. Vercel auto-detects it as a static site. Click **Deploy**.
5. Your live URL appears in seconds. ✅

### Method 2 — GitHub Integration

1. Push `cyber-portfolio/` to a GitHub repository.
2. On Vercel, click **"Add New → Project"** → import from GitHub.
3. Select your repo. Vercel detects the static files automatically.
4. Click **Deploy**. Every `git push` auto-deploys.

### Method 3 — Vercel CLI

```bash
npm install -g vercel
cd cyber-portfolio
vercel
```

Follow the prompts. Your site goes live instantly.

---

## 🖥 Terminal Commands

| Command    | Description                     |
|------------|---------------------------------|
| `help`     | Show available commands         |
| `whoami`   | About George Jojo               |
| `ls`       | List project directories        |
| `projects` | Detailed project descriptions   |
| `contact`  | Email & Twitter info            |
| `clear`    | Clear the terminal              |

**Keyboard shortcuts:** `↑` / `↓` arrow keys for command history.

---

## ✏️ Customization

Open `script.js` and edit the `COMMANDS` object to update your personal info,
add new commands, or change any output text.
