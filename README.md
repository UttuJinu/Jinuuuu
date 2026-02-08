# Valentine's Day Interactive Website (CodeKage)

A cute, interactive web page to ask someone to be your Valentine. Features playful button mechanics, heartwarming GIFs, and heart-shaped confetti.

## How It Works

1. The page presents the question **"Will you be my Valentine?"** alongside a cute GIF.
2. Clicking **No** swaps the GIF, changes the button text to increasingly desperate pleas, and grows the **Yes** button bigger and bigger.
3. Clicking **Yes** celebrates with a special GIF, a victory message, and a burst of heart-shaped confetti.

## Features

- **Growing "Yes" button** -- gets larger with every "No" click, making it impossible to ignore.
- **Desperate messages** -- the "No" button cycles through pleading texts like *"Pookie please"* and *"I'm gonna cry..."*.
- **Animated GIFs** -- seven different GIFs that react to the user's choices.
- **Heart confetti** -- pink heart-shaped confetti explosion on "Yes" using [canvas-confetti](https://www.npmjs.com/package/canvas-confetti).
- **Responsive design** -- looks great on desktop and mobile, powered by [Tailwind CSS](https://tailwindcss.com).

## Getting Started

1. Clone the repository:
   ```bash
   git clone https://github.com/CodeKageHQ/Ask-out-your-Valentine.git
   cd Ask-out-your-Valentine
   ```
2. Install dependencies and run the dev server:
   ```bash
   npm install
   npm run dev
   ```
3. Open the URL shown in the terminal (e.g. `http://localhost:5173`).

**Build for production:** `npm run build` → output in `dist/`. Preview with `npm run preview`.

## Project Structure

```
Ask-out-your-Valentine/
├── public/
│   └── images/
│       ├── image1.gif    # Default greeting
│       ├── image2.gif    # After 1st "No"
│       ├── image3.gif    # After 2nd "No"
│       ├── image4.gif    # After 3rd "No"
│       ├── image5.gif    # After 4th "No"
│       ├── image6.gif    # After 5th "No"
│       └── image7.gif    # "Yes" celebration
├── src/
│   ├── App.jsx          # Main Valentine component
│   ├── main.jsx         # React entry
│   └── index.css        # Tailwind + custom styles
├── index.html           # Vite entry
├── package.json
├── vite.config.js
├── tailwind.config.js
├── LICENSE
└── README.md
```

## Customization

Want to make it your own? Here are some easy tweaks inside `index.html`:

| What | Where | How |
|------|-------|-----|
| GIF images | `public/images/` folder | Replace the GIFs with your own (keep the same filenames) |
| "No" button messages | `NO_BUTTON_MESSAGES` in `src/App.jsx` | Edit the strings to say whatever you like |
| Button growth speed | `GROWTH_PER_CLICK` / `FONT_GROWTH_PER_CLICK` in `src/App.jsx` | Lower the numbers for subtler growth |
| Confetti colors | `colors` in `runHeartConfetti()` in `src/App.jsx` | Swap in any hex color codes |
| Background gradient | `.gradient-background` in `src/index.css` | Change the hex colors |

## Technologies

- **React 18** — UI and state
- **Vite** — build tool and dev server
- **Tailwind CSS** — utility-first styling
- **canvas-confetti** — heart-shaped confetti on "Yes"

## Contributing

Contributions are welcome! Whether it's new GIF suggestions, design tweaks, or code improvements -- fork the repo and open a pull request.

## License

Open source under the [MIT License](LICENSE).

Happy Valentine's Day! ❤️
# Jinuuuu
