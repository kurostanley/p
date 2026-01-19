# Harmonic Gambit: Chess-Driven Generative Music

《諧律博弈：西洋棋局作為生成式音樂的理論框架與實證分析》

An academic research paper presented as an interactive web application, exploring the theoretical framework for translating chess games into generative music through algorithmic composition.

## 🎯 Project Overview

This project presents a novel algorithmic framework that translates the strategic dynamics of chess games into structured generative music. Unlike John Cage's *Reunion* (1968), which used chess as a sound trigger, this system deeply maps the intrinsic logic, psychological dynamics, and power shifts of chess into musical parameters.

### Key Features

- **Interactive Chess Board**: Replay the famous Fischer vs. Spassky 1972 Game 6 move by move
- **Data Visualization**: Dynamic charts showing position evaluation, material balance, and musical layer activity
- **Four-Layer Sonic Hierarchy**: Timeline, Foundation, Groove, and Lead layers inspired by ethnomusicological theory
- **Quantitative Analysis**: Statistical correlation between chess dynamics and musical parameters
- **Responsive Design**: Professional academic paper layout optimized for all devices

## 📊 Technologies Used

- **HTML5** - Semantic structure
- **CSS3** - Academic paper styling with responsive design
- **JavaScript (ES6)** - Application logic and interactivity
- **Chart.js** - Data visualization and charts
- **Chess.js** - Chess game logic
- **Chessboard.js** - Interactive chess board UI
- **jQuery** - DOM manipulation for chessboard

## 🚀 Quick Start

### Local Development

1. Clone the repository:
```bash
git clone https://github.com/kurostanley/Harmonic-Gambit.git
cd Harmonic-Gambit
```

2. Open `index.html` in your web browser:
```bash
open index.html
# or
python3 -m http.server 8000
# then visit http://localhost:8000
```

No build process required - this is a pure static website!

## 📦 Deployment to GitHub Pages

### Method 1: Using GitHub Web Interface

1. Create a new repository on GitHub named `Harmonic-Gambit`
2. Upload all files (`index.html`, `styles.css`, `app.js`, `chess-data.js`)
3. Go to **Settings** → **Pages**
4. Under **Source**, select `main` branch and `/ (root)` folder
5. Click **Save**
6. Your site will be published at `https://YOUR_USERNAME.github.io/Harmonic-Gambit/`

### Method 2: Using Git Command Line

```bash
# Initialize git repository
git init

# Add all files
git add .

# Commit
git commit -m "Initial commit: Harmonic Gambit research paper"

# Add remote repository
git remote add origin https://github.com/kurostanley/Harmonic-Gambit.git

# Push to GitHub
git push -u origin main

# Enable GitHub Pages (do this in GitHub Settings → Pages)
```

### Method 3: Using GitHub Desktop

1. Open GitHub Desktop
2. File → New Repository
3. Name: `Harmonic-Gambit`
4. Create Repository
5. Copy all project files to the repository folder
6. Commit changes with message "Initial commit"
7. Publish repository to GitHub
8. Enable GitHub Pages in repository settings

## 📁 Project Structure

```
Harmonic-Gambit/
│
├── index.html          # Main HTML structure
├── styles.css          # Academic paper styling
├── app.js             # Main application logic
├── chess-data.js      # Game data and analysis
├── README.md          # This file
│
└── Reference_File/
    ├── Brief_concept.txt   # Original concept document
    └── 棋譜.txt            # Chess game notation and analysis
```

## 🎮 Usage

### Interactive Features

1. **Chess Board Navigation**
   - ⏮ Start: Reset to starting position
   - ⏪ Previous: Go back one move
   - ⏩ Next: Advance one move
   - ⏭ End: Jump to final position
   - ▶️ Autoplay: Automatically play through the game

2. **Charts and Visualizations**
   - Position Evaluation: Shows Fischer's growing advantage
   - Material Balance: Demonstrates positional vs. material advantage
   - Musical Layer Activity: Four-layer sonic hierarchy dynamics
   - Event Distribution: Discrete events by game phase

3. **Navigation**
   - Click table of contents links to jump to sections
   - Smooth scrolling throughout the document

## 🔬 Research Highlights

- **Four-Layer Sonic Hierarchy**: Timeline, Foundation, Groove, Lead
- **Parameter Mapping**: Discrete events, continuous values, behavioral density
- **Case Study**: Fischer vs. Spassky 1972 World Championship Game 6
- **Quantitative Analysis**: Statistical correlation (r = -0.78, p < 0.01)
- **Narrative Themes**: "Genius Chooses Discipline", "Power from Option Control"

## 🛠️ Future Enhancements

- [ ] Integrate real-time audio synthesis using Web Audio API
- [ ] Add more historical games (Kasparov, Carlsen, etc.)
- [ ] Implement AI evaluation engine (Stockfish.js)
- [ ] Multi-language support (English/Traditional Chinese toggle)
- [ ] Export functionality (PDF, audio files)
- [ ] Real-time multiplayer chess with live music generation

## 📝 License

This project is open source and available for educational and research purposes.

## 🙏 Acknowledgments

- John Cage & Marcel Duchamp - *Reunion* (1968)
- Gerhard Kubik - Timeline Theory
- Bobby Fischer & Boris Spassky - 1972 World Championship

---

**© 2026 Harmonic Gambit Research Project**
