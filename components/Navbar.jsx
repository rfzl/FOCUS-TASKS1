"use client";

import { useAuth } from "@/context/AuthContext";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function Navbar() {
  const { user, logout } = useAuth();
  const router = useRouter();

  const handleLogout = async () => {
    try {
      await logout();
      router.push("/login");
    } catch (error) {
      console.error("Gagal logout:", error);
    }
  };

  return (
    <nav className="bg-primary text-white shadow-md">
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        <Link href="/" className="text-xl font-bold">
          FocusTasks
        </Link>
        <div>
          {user ? (
            <div className="flex items-center space-x-4">
              <span>Halo, {user.email}</span>
              <button
                onClick={handleLogout}
                className="bg-accent text-gray-800 px-3 py-1 rounded-md hover:bg-yellow-400 transition-colors"
              >
                Logout
              </button>
            </div>
          ) : (
            <div className="space-x-4">
              <Link
                href="/login"
                className="bg-accent text-gray-800 px-3 py-1 rounded-md hover:bg-yellow-400 transition-colors"
              >
                Masuk
              </Link>
              <Link
                href="/register"
                className="bg-white text-gray-800 px-3 py-1 rounded-md hover:bg-gray-100 transition-colors"
              >
                Daftar
              </Link>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}