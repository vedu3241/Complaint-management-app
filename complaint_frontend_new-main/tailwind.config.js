// tailwind.config.js
export default {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      boxShadow: { 'custom': '5px 4px 10px 4px #3BB19B', },
       fontFamily: { sans: ['-apple-system', 'BlinkMacSystemFont', '"Segoe UI"', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', '"Helvetica Neue"', 'sans-serif'], mono: ['source-code-pro', 'Menlo', 'Monaco', 'Consolas', '"Courier New"', 'monospace'],
       },
    colour:{
    primary_clr:'#14bb19b',
      }
      },
  },
  plugins: [],
}

