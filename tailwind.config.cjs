module.exports = {
    content: ["./src/**/*.{html,js,svelte}"],  theme: {
    extend: {},
  },
  plugins: [
    require("daisyui")
  ],
  
  daisyui: {
    themes: [
      {
        mytheme: {
        
"primary": "#228B22",
        
"secondary": "#9ca3af",
        
"accent": "#f3f4f6",
        
"neutral": "#1B1D1D",
        
"base-100": "#212121",
        
"info": "#2563EB",
        
"success": "#16A34A",
        
"warning": "#D97706",
        
"error": "#DC2626",
        },
      },
    ],
  }
}