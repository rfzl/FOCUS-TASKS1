import { AuthContextProvider } from "@/context/AuthContext";
import "./globals.css";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "FocusTasks - Aplikasi To-Do List Produktivitas",
  description: "Aplikasi to-do list untuk meningkatkan produktivitas",
};

export default function RootLayout({ children }) {
  return (
    <html lang="id">
      <body className={inter.className}>
        <AuthContextProvider>{children}</AuthContextProvider>
      </body>
    </html>
  );
}