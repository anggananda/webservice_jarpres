/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#2563EB", // Biru untuk tombol utama
        secondary: "#F9FAFB", // Latar belakang ringan
        danger: "#EF4444", // Merah untuk tombol hapus
      },
      boxShadow: {
        card: "0 4px 6px rgba(0, 0, 0, 0.1)", // Shadow lembut untuk kartu
      },
    },
  },
  plugins: [],
};
