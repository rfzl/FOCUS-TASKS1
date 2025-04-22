"use client";

import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from "recharts";

export default function ChartCard({ todos }) {
  // Hitung jumlah tugas selesai dan belum selesai
  const completedTasks = todos.filter((todo) => todo.completed).length;
  const incompleteTasks = todos.length - completedTasks;

  const data = [
    { name: "Selesai", value: completedTasks },
    { name: "Belum Selesai", value: incompleteTasks },
  ];

  const COLORS = ["#81BFDA", "#FADA7A"];

  return (
    <div className="card bg-secondary">
      <h3 className="text-lg font-semibold mb-4">Statistik Tugas</h3>
      {todos.length > 0 ? (
        <>
          <div className="flex justify-around mb-4">
            <div className="text-center">
              <div className="text-3xl font-bold">{todos.length}</div>
              <div className="text-sm text-gray-600">Total Tugas</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold">{completedTasks}</div>
              <div className="text-sm text-gray-600">Selesai</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold">
                {Math.round((completedTasks / (todos.length || 1)) * 100)}%
              </div>
              <div className="text-sm text-gray-600">Persentase</div>
            </div>
          </div>

          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={data}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                  label={({ name, percent }) => 
                    `${name}: ${(percent * 100).toFixed(0)}%`
                  }
                >
                  {data.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </>
      ) : (
        <div className="text-center py-10 text-gray-500">
          Belum ada tugas. Tambahkan tugas untuk melihat statistik.
        </div>
      )}
    </div>
  );
}