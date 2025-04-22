import Link from "next/link";
import Navbar from "@/components/Navbar";

export default function Home() {
  return (
    <main>
      <Navbar />
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl font-bold mb-6">
            Selamat Datang di FocusTasks
          </h1>
          <p className="text-xl mb-8">
            Aplikasi to-do list simpel namun powerful untuk meningkatkan produktivitas Anda
          </p>
          
          <div className="grid md:grid-cols-3 gap-6 mb-12">
            <div className="card bg-secondary">
              <h3 className="text-lg font-semibold mb-2">Kelola Tugas</h3>
              <p>Tambah, edit, dan tandai tugas yang sudah selesai dengan mudah</p>
            </div>
            <div className="card bg-secondary">
              <h3 className="text-lg font-semibold mb-2">Visualisasi Progres</h3>
              <p>Lihat statistik progres tugas Anda dengan tampilan grafik yang informatif</p>
            </div>
            <div className="card bg-secondary">
              <h3 className="text-lg font-semibold mb-2">Sinkronisasi Cloud</h3>
              <p>Akses tugas Anda dari mana saja dengan penyimpanan berbasis cloud</p>
            </div>
          </div>
          
          <div className="space-x-4">
            <Link href="/login" className="btn-primary">
              Mulai Sekarang
            </Link>
            <Link href="/register" className="bg-white hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 rounded-md shadow-sm transition-all">
              Daftar Akun
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}