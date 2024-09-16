/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,tsx}",
    "./index.html"
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#25233C',  // Fundo Principal (roxo escuro)
          light: '#2F2C48',    // Barra superior (um tom mais claro)
        },
        secondary: {
          DEFAULT: '#3B8EDC',  // Botões/Ações (azul vibrante)
          light: '#4FA0E1',    // Alternativa para botões (azul mais claro)
        },
        accent: {
          DEFAULT: '#E74C3C',  // Cor de destaque para fechar/excluir (vermelho)
        },
        neutral: {
          DEFAULT: '#F2F2F2',  // Texto Principal (cinza quase branco)
          dark: '#999999',     // Ícones/Linhas (cinza escuro)
        },
        background: {
          DEFAULT: '#1E1B2D',  // Fundo geral do app (quase preto)
        },
      },
      fontFamily: {
        sans: ['Nunito', 'sans-serif'],     // Texto normal
        heading: ['Poppins', 'sans-serif'], // Cabeçalhos
      },
    },
  },
  plugins: [],
}