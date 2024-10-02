/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,tsx}", "./index.html"],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: "#25233C", // Fundo Principal (roxo escuro)
          light: "#2F2C48", // Barra superior (um tom mais claro)
          foreground: "#F2F2F2", // Text color on primary backgrounds
        },
        secondary: {
          DEFAULT: "#3B8EDC", // Botões/Ações (azul vibrante)
          light: "#4FA0E1", // Alternativa para botões (azul mais claro)
          foreground: "#F2F2F2", // Text color on secondary backgrounds
        },
        accent: {
          DEFAULT: "#E74C3C", // Cor de destaque para fechar/excluir (vermelho)
          foreground: "#FFFFFF", // Text color on accent backgrounds
        },
        neutral: {
          DEFAULT: "#F2F2F2", // Texto Principal (cinza quase branco)
          dark: "#999999", // Ícones/Linhas (cinza escuro)
          foreground: "#1E1B2D", // Darker neutral for text
        },
        background: {
          DEFAULT: "#1E1B2D", // Main background color
          light: "#2E354F", // Lighter background shade
        },
      },
      fontFamily: {
        sans: ["Nunito", "sans-serif"], // Texto normal
        heading: ["Poppins", "sans-serif"], // Cabeçalhos
      },
    },
  },
  plugins: [
    ({addUtilities})=>{
      const newUtilities = {
        ".scrollbar-thin":{
          scrollBarWidth : "thin",
          scrollBarColor: "#2f2c48",
        },
        ".scrollbar-webkit":{
          "&::-webkit-scrollbar":{
            width: "8px"
          },
          "&::-webkit-scrollbar-track":{
            background: "#25233C"
          },
          "&::-webkit-scrollbar-thumb":{
            backgroundColor : "#1E1B2D",
            borderRadius: "20px",
            border: "none"
          }
        }

      }

      addUtilities(newUtilities, ["responsive", "hover"])
    }
  ],
};
