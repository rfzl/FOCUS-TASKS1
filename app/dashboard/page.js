"use client";

import { useEffect, useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import Navbar from "@/components/Navbar";
import TodoItem from "@/components/TodoItem";
import ChartCard from "@/components/ChartCard";
import Notification from "@/components/Notification";
import { db } from "@/lib/firebase";
import {
  collection,
  query,
  where,
  addDoc,
  deleteDoc,
  updateDoc,
  onSnapshot,
  doc,
  serverTimestamp,
  orderBy,
} from "firebase/firestore";

export default function Dashboard() {
  const { user } = useAuth();
  const router = useRouter();
  const [todos, setTodos] = useState([]);
  const [filteredTodos, setFilteredTodos] = useState([]);
  const [newTodo, setNewTodo] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [filter, setFilter] = useState("semua");
  const [loading, setLoading] = useState(true);
  const [notification, setNotification] = useState(null);

  // Redirect jika tidak login
  useEffect(() => {
    if (!user) {
      router.push("/login");
    }
  }, [user, router]);

  // Ambil data todo dari Firestore
  useEffect(() => {
    if (!user) return;

    const todosRef = collection(db, "todos");
    const q = query(
      todosRef, 
      where("userId", "==", user.uid),
      orderBy("createdAt", "desc")
    );

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const todosData = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setTodos(todosData);
      setLoading(false);
    });

    return () => unsubscribe();
  }, [user]);

  // Filter dan pencarian todo
  useEffect(() => {
    if (todos.length === 0) {
      setFilteredTodos([]);
      return;
    }

    let result = [...todos];

    // Filter berdasarkan status
    if (filter === "selesai") {
      result = result.filter(todo => todo.completed);
    } else if (filter === "belum-selesai") {
      result = result.filter(todo => !todo.completed);
    }

    // Filter berdasarkan pencarian
    if (searchTerm) {
      result = result.filter(todo => 
        todo.title.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    setFilteredTodos(result);
  }, [todos, filter, searchTerm]);

  // Fungsi menambah todo
  const addTodo = async (e) => {
    e.preventDefault();
    if (!newTodo.trim() || !user) return;

    try {
      await addDoc(collection(db, "todos"), {
        title: newTodo,
        completed: false,
        userId: user.uid,
        createdAt: serverTimestamp(),
      });
      setNewTodo("");
      showNotification("Tugas berhasil ditambahkan", "success");
    } catch (error) {
      console.error("Gagal menambah tugas:", error);
      showNotification("Gagal menambahkan tugas", "error");
    }
  };

  // Fungsi toggle complete
  const toggleComplete = async (todoId) => {
    const todoRef = doc(db, "todos", todoId);
    const todo = todos.find((t) => t.id === todoId);
    if (!todo) return;

    try {
      await updateDoc(todoRef, {
        completed: !todo.completed,
      });
      showNotification(
        `Tugas ${todo.completed ? "ditandai belum selesai" : "ditandai selesai"}`,
        "success"
      );
    } catch (error) {
      console.error("Gagal mengubah status tugas:", error);
      showNotification("Gagal mengubah status tugas", "error");
    }
  };

  // Fungsi menghapus todo
  const deleteTodo = async (todoId) => {
    try {
      await deleteDoc(doc(db, "todos", todoId));
      showNotification("Tugas berhasil dihapus", "success");
    } catch (error) {
      console.error("Gagal menghapus tugas:", error);
      showNotification("Gagal menghapus tugas", "error");
    }
  };

  // Fungsi mengedit todo
  const editTodo = async (todoId, newTitle) => {
    try {
      const todoRef = doc(db, "todos", todoId);
      await updateDoc(todoRef, {
        title: newTitle,
      });
      showNotification("Tugas berhasil diperbarui", "success");
    } catch (error) {
      console.error("Gagal mengedit tugas:", error);
      showNotification("Gagal mengedit tugas", "error");
    }
  };

  // Fungsi untuk menampilkan notifikasi
  const showNotification = (message, type) => {
    setNotification({ message, type });
  };

  // Fungsi untuk menghapus notifikasi
  const clearNotification = () => {
    setNotification(null);
  };

  if (!user) {
    return null;
  }

  return (
    <>
      <Navbar />
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8 text-center">Dashboard FocusTasks</h1>

        {notification && (
          <Notification
            message={notification.message}
            type={notification.type}
            onClose={clearNotification}
          />
        )}

        <div className="grid md:grid-cols-3 gap-6">
          {/* Form tambah tugas */}
          <div className="md:col-span-2">
            <div className="card bg-white mb-6">
              <h2 className="text-xl font-semibold mb-4">Tambah Tugas Baru</h2>
              <form onSubmit={addTodo} className="flex space-x-2">
                <input
                  type="text"
                  className="input-field flex-grow"
                  placeholder="Masukkan tugas baru..."
                  value={newTodo}
                  onChange={(e) => setNewTodo(e.target.value)}
                />
                <button type="submit" className="btn-primary whitespace-nowrap">
                  Tambah
                </button>
              </form>
            </div>

            {/* Daftar tugas */}
            <div className="card bg-white">
              <h2 className="text-xl font-semibold mb-4">Daftar Tugas</h2>
              
              {/* Filter dan pencarian */}
              <div className="mb-4 flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-2">
                <div className="sm:w-2/3">
                  <input
                    type="text"
                    className="input-field w-full"
                    placeholder="Cari tugas..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
                <div className="sm:w-1/3">
                  <select
                    className="input-field w-full"
                    value={filter}
                    onChange={(e) => setFilter(e.target.value)}
                  >
                    <option value="semua">Semua Tugas</option>
                    <option value="selesai">Selesai</option>
                    <option value="belum-selesai">Belum Selesai</option>
                  </select>
                </div>
              </div>
              
              {loading ? (
                <div className="text-center py-10">Memuat tugas...</div>
              ) : filteredTodos.length > 0 ? (
                <div className="divide-y">
                  {filteredTodos.map((todo) => (
                    <TodoItem
                      key={todo.id}
                      todo={todo}
                      onToggleComplete={toggleComplete}
                      onDelete={deleteTodo}
                      onEdit={editTodo}
                    />
                  ))}
                </div>
              ) : (
                <div className="text-center py-10 text-gray-500">
                  {todos.length > 0 
                    ? "Tidak ada tugas yang cocok dengan filter atau pencarian."
                    : "Belum ada tugas. Tambahkan tugas baru di atas."}
                </div>
              )}
            </div>
          </div>

          {/* Statistik */}
          <div>
            <ChartCard todos={todos} />
          </div>
        </div>
      </div>
    </>
  );
}