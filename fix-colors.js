const fs = require('fs');
const path = require('path');
const glob = require('glob');

// Green → Blue replacement map
const replacements = [
  // Gradients
  ["from-green-600 to-blue-600",               "from-blue-600 to-blue-800"],
  ["from-green-700 via-green-800 to-blue-900", "from-blue-700 via-blue-800 to-blue-900"],
  ["from-green-600 via-green-700 to-blue-700", "from-blue-600 via-blue-700 to-blue-800"],
  ["from-slate-900 to-green-950",              "from-slate-900 to-blue-950"],
  ["from-green-50 to-green-100",               "from-blue-50 to-blue-100"],
  ["from-green-50 to-blue-50",                 "from-blue-50 to-blue-100"],
  ["from-green-100 to-blue-100",               "from-blue-100 to-blue-200"],
  ["from-green-100 to-green-200",              "from-blue-100 to-blue-200"],
  ["via-green-950",                            "via-blue-950"],
  ["to-green-950",                             "to-blue-950"],

  // Buttons
  ["bg-green-600 hover:bg-green-700",          "bg-blue-600 hover:bg-blue-700"],
  ["bg-green-600 hover:bg-green-500",          "bg-blue-600 hover:bg-blue-500"],
  ["disabled:bg-green-400",                    "disabled:bg-blue-400"],

  // Text
  ["text-green-600",   "text-blue-600"],
  ["text-green-700",   "text-blue-700"],
  ["text-green-800",   "text-blue-800"],
  ["text-green-900",   "text-blue-900"],
  ["text-green-400",   "text-blue-400"],
  ["text-green-300",   "text-blue-300"],
  ["text-green-500",   "text-blue-500"],

  // Backgrounds
  ["bg-green-600",     "bg-blue-600"],
  ["bg-green-700",     "bg-blue-700"],
  ["bg-green-800",     "bg-blue-800"],
  ["bg-green-50",      "bg-blue-50"],
  ["bg-green-100",     "bg-blue-100"],
  ["bg-green-500",     "bg-blue-500"],
  ["bg-green-400",     "bg-blue-400"],

  // Borders
  ["border-green-600", "border-blue-600"],
  ["border-green-500", "border-blue-500"],
  ["border-green-400", "border-blue-400"],
  ["border-green-300", "border-blue-300"],
  ["border-green-200", "border-blue-200"],
  ["border-green-100", "border-blue-100"],

  // Focus rings
  ["focus:border-green-500", "focus:border-blue-500"],
  ["focus:ring-green-500",   "focus:ring-blue-500"],
  ["ring-green-500",         "ring-blue-500"],

  // Hover
  ["hover:bg-green-600",    "hover:bg-blue-600"],
  ["hover:bg-green-700",    "hover:bg-blue-700"],
  ["hover:bg-green-50",     "hover:bg-blue-50"],
  ["hover:text-green-600",  "hover:text-blue-600"],
  ["hover:text-green-700",  "hover:text-blue-700"],
  ["hover:border-green-400","hover:border-blue-400"],
  ["hover:border-green-300","hover:border-blue-300"],

  // Accent
  ["accent-green-600",      "accent-blue-600"],

  // Inline hex colors (used in email.ts, globals.css)
  ["#16a34a",   "#2563eb"],
  ["#15803d",   "#1d4ed8"],
  ["#166534",   "#1e40af"],
  ["#22c55e",   "#3b82f6"],
  ["#4ade80",   "#60a5fa"],
  ["#86efac",   "#93c5fd"],
  ["#bbf7d0",   "#bfdbfe"],
  ["#dcfce7",   "#dbeafe"],
  ["#f0fdf4",   "#eff6ff"],

  // rgba greens
  ["rgba(34,197,94,",  "rgba(59,130,246,"],
  ["rgba(22,163,74,",  "rgba(37,99,235,"],

  // Scrollbar in CSS
  ["background: #16a34a", "background: #2563eb"],

  // Tailwind config
  ["green-600: \"#16a34a\"", "blue-600: \"#2563eb\""],
];

// Find all relevant files
const patterns = [
  'components/**/*.tsx',
  'components/**/*.ts',
  'app/**/*.tsx',
  'app/**/*.ts',
  'lib/**/*.ts',
  'hooks/**/*.ts',
  'app/globals.css',
];

let totalFiles = 0;

patterns.forEach(pattern => {
  const files = glob.sync(pattern, { ignore: ['node_modules/**', '.next/**'] });
  files.forEach(file => {
    let content = fs.readFileSync(file, 'utf8');
    const original = content;
    replacements.forEach(([from, to]) => {
      content = content.split(from).join(to);
    });
    if (content !== original) {
      fs.writeFileSync(file, content);
      console.log('  ✓ updated:', file);
      totalFiles++;
    }
  });
});

console.log(`\nDone! Updated ${totalFiles} files.`);
console.log('Restart npm run dev to see changes.');