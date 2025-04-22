"use client";

import { useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Navbar from "@/components/Navbar";

export default function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const { signup } = useAuth();
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (password !== confirmPassword) {
      setError("Password tidak sama. Silakan periksa kembali.");
      return;
    }

    setLoading(true);

    try {
      await signup(email, password);
      router.push("/dashboard");
    } catch (error) {
      console.error("Gagal mendaftar:", error);
      setError("Gagal mendaftar. Email mungkin sudah terdaftar.");
    }

    setLoading(false);
  };

  return (
    <>
      <Navbar />
      <div className="min-h-screen flex items-center justify-center bg-background px-4">
        <div className="w-full max-w-md">
          <div className="card bg-white">
            <h2 className="text-2xl font-bold mb-6 text-center">Daftar Akun</h2>
            
            {error && (
              <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
                {error}
              </div>
            )}
            
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label className="block text-gray-700 mb-2" htmlFor="email">
                  Email
                </label>
                <input
                  id="email"
                  type="email"
                  className="input-field"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              
              <div className="mb-4">
                <label className="block text-gray-700 mb-2" htmlFor="password">
                  Password
                </label>
                <input
                  id="password"
                  type="password"
                  className="input-field"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  minLength={6}
                />
              </div>
              
              <div className="mb-6">
                <label className="block text-gray-700 mb-2" htmlFor="confirm-password">
                  Konfirmasi Password
                </label>
                <input
                  id="confirm-password"
                  type="password"
                  className="input-field"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                />
              </div>
              
              <button
                type="submit"
                disabled={loading}
                className="btn-primary w-full mb-4"
              >
                {loading ? "Mendaftar..." : "Daftar"}
              </button>
            </form>
            
            <div className="text-center text-gray-600">
              Sudah punya akun?{" "}
              <Link href="/login" className="text-primary hover:underline">
                Masuk di sini
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}