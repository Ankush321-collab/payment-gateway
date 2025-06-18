/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        'gradient-dark-home': 'linear-gradient(135deg, #0c0c0c 0%, #202020 100%)',
      },
      // Add text gradient for Navbar title
      colors: {
        'code-help-start': '#4A2F8D',
        'code-help-end': '#00BFFF',
        'codehelp-box': '#18181b',
        'codehelp-green': '#22d883',
      },
      backgroundClip: {
        'text': 'text',
      },
      textFillColor: {
        'transparent': 'transparent',
      },
      boxShadow: {
        'codehelp-glow': '0 0 24px 2px #22d883',
      },
    },
  },
  plugins: [function ({ addUtilities }) {
    addUtilities({
      '.bg-clip-text': {
        'background-clip': 'text',
      },
      '.text-fill-transparent': {
        '-webkit-text-fill-color': 'transparent',
      },
      '.bg-gradient-code-help': {
        'background-image': 'linear-gradient(to right, var(--tw-gradient-stops))',
      },
      '.codehelp-box': {
        'background-color': '#18181b',
        'border': '1.5px solid #22d883',
        'border-radius': '1.5rem',
        'box-shadow': '0 0 24px 2px #22d88333',
      },
    }, { variants: ['responsive'] })
  }],
} 