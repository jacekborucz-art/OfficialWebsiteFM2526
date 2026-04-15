import React, { useState, useEffect } from "react";
import { motion } from "motion/react";
import {
  Plus,
  Trash2,
  ArrowLeft,
  Save,
  X,
  Shield,
  Eye,
  Edit3
} from "lucide-react";

// Default news data
const defaultNews = [
  {
    id: 1,
    icon: "🎮",
    title: "Nowa wersja beta dostępna!",
    description: "Gra jest dostępna do testowania na fm26beta.vercel.app. Zgłaszajcie bugi i sugestie!",
    time: "Dziś",
    active: true
  },
  {
    id: 2,
    icon: "📺",
    title: "Zasubskrybuj kanał YouTube",
    description: "Na naszym kanale publikujemy gameplay, tutoriale i informacje o aktualizacjach.",
    time: "Trwa",
    active: true
  },
  {
    id: 3,
    icon: "🚀",
    title: "Gra jest w ciągłym rozwoju",
    description: "Pracujemy nad nowymi ligami, zawodnikami i mechanikami. Wkrótce więcej!",
    time: "Permanentnie",
    active: true
  }
];

export default function AdminPanel() {
  const [news, setNews] = useState<typeof defaultNews>([]);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [formData, setFormData] = useState({
    icon: "🎮",
    title: "",
    description: "",
    time: "Dziś"
  });

  // Proste hasło (w produkcji użyj czegoś lepszego)
  const ADMIN_PASSWORD = "admin123";

  useEffect(() => {
    // Load news from localStorage or use default
    const savedNews = localStorage.getItem("plm-news");
    if (savedNews) {
      setNews(JSON.parse(savedNews));
    } else {
      setNews(defaultNews);
      localStorage.setItem("plm-news", JSON.stringify(defaultNews));
    }
  }, []);

  useEffect(() => {
    // Save news to localStorage whenever it changes
    if (news.length > 0) {
      localStorage.setItem("plm-news", JSON.stringify(news));
    }
  }, [news]);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === ADMIN_PASSWORD) {
      setIsAuthenticated(true);
    } else {
      alert("Nieprawidłowe hasło!");
    }
  };

  const handleAddNews = () => {
    if (!formData.title || !formData.description) {
      alert("Wypełnij tytuł i opis!");
      return;
    }

    const newNews = {
      id: Date.now(),
      ...formData,
      active: true
    };

    setNews([newNews, ...news]);
    setFormData({ icon: "🎮", title: "", description: "", time: "Dziś" });
    setShowForm(false);
  };

  const handleDeleteNews = (id: number) => {
    if (confirm("Na pewno chcesz usunąć ten news?")) {
      setNews(news.filter(n => n.id !== id));
    }
  };

  const handleEditNews = (news: typeof newsData[0]) => {
    setEditingId(news.id);
    setFormData({
      icon: news.icon,
      title: news.title,
      description: news.description,
      time: news.time
    });
    setShowForm(true);
  };

  const handleUpdateNews = () => {
    if (!formData.title || !formData.description) {
      alert("Wypełnij tytuł i opis!");
      return;
    }

    setNews(news.map(n => 
      n.id === editingId ? { ...n, ...formData } : n
    ));
    setFormData({ icon: "🎮", title: "", description: "", time: "Dziś" });
    setEditingId(null);
    setShowForm(false);
  };

  const handleToggleActive = (id: number) => {
    setNews(news.map(n => 
      n.id === id ? { ...n, active: !n.active } : n
    ));
  };

  // Login Screen
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-[#050505] flex items-center justify-center px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-md w-full"
        >
          <div className="text-center mb-8">
            <div className="w-16 h-16 bg-gradient-to-r from-green-500 to-emerald-600 rounded-2xl flex items-center justify-center mx-auto mb-4 glow-green">
              <Shield className="w-8 h-8 text-black" />
            </div>
            <h1 className="font-display text-3xl font-bold uppercase mb-2">
              Panel <span className="text-gradient-green">Admina</span>
            </h1>
            <p className="text-white/50">Wprowadź hasło aby kontynuować</p>
          </div>

          <form onSubmit={handleLogin} className="glass-dark p-8 rounded-2xl border border-white/10">
            <label className="block text-sm font-medium text-white/70 mb-2">
              Hasło
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-green-500 transition-colors mb-4"
              placeholder="Wpisz hasło..."
            />
            <button
              type="submit"
              className="w-full bg-gradient-primary text-black font-bold py-3 rounded-xl hover:opacity-90 transition-all glow-green"
            >
              Zaloguj się
            </button>
            <p className="text-xs text-white/30 text-center mt-4">
              Domyślne hasło: admin123
            </p>
          </form>
        </motion.div>
      </div>
    );
  }

  // Admin Panel
  return (
    <div className="min-h-screen bg-[#050505] px-6 py-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="font-display text-3xl font-bold uppercase mb-2">
              Zarządzaj <span className="text-gradient-green">Newsami</span>
            </h1>
            <p className="text-white/50">Dodawaj, edytuj i usuwaj newsy ze strony głównej</p>
          </div>
          <div className="flex gap-3">
            <a
              href="#/"
              className="flex items-center gap-2 px-4 py-2 glass rounded-xl hover:bg-white/10 transition-colors text-sm"
            >
              <ArrowLeft className="w-4 h-4" />
              Wróć do strony
            </a>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-4 mb-8">
          <div className="glass p-4 rounded-xl text-center">
            <div className="text-2xl font-bold text-gradient-green">{news.length}</div>
            <div className="text-xs text-white/40 uppercase">Wszystkie</div>
          </div>
          <div className="glass p-4 rounded-xl text-center">
            <div className="text-2xl font-bold text-gradient-green">{news.filter(n => n.active).length}</div>
            <div className="text-xs text-white/40 uppercase">Aktywne</div>
          </div>
          <div className="glass p-4 rounded-xl text-center">
            <div className="text-2xl font-bold text-gradient-green">{news.filter(n => !n.active).length}</div>
            <div className="text-xs text-white/40 uppercase">Nieaktywne</div>
          </div>
        </div>

        {/* Add Button */}
        <div className="flex justify-end mb-6">
          <button
            onClick={() => {
              setShowForm(true);
              setEditingId(null);
              setFormData({ icon: "🎮", title: "", description: "", time: "Dziś" });
            }}
            className="flex items-center gap-2 bg-gradient-primary text-black font-bold px-6 py-3 rounded-xl hover:opacity-90 transition-all glow-green"
          >
            <Plus className="w-5 h-5" />
            Dodaj News
          </button>
        </div>

        {/* Form Modal */}
        {showForm && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-6"
            onClick={() => setShowForm(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="max-w-lg w-full glass-dark p-8 rounded-2xl border border-white/10"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold">
                  {editingId ? "Edytuj News" : "Nowy News"}
                </h2>
                <button
                  onClick={() => setShowForm(false)}
                  className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-white/10 transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="space-y-4">
                {/* Icon */}
                <div>
                  <label className="block text-sm font-medium text-white/70 mb-2">
                    Ikona (emoji)
                  </label>
                  <div className="flex gap-2 flex-wrap">
                    {["🎮", "📺", "🚀", "⚽", "🏆", "📢", "🎉", "🔥", "💡", "📝", "🎯", "⭐"].map(emoji => (
                      <button
                        key={emoji}
                        onClick={() => setFormData({ ...formData, icon: emoji })}
                        className={`w-10 h-10 rounded-lg text-xl flex items-center justify-center transition-all ${
                          formData.icon === emoji 
                            ? "bg-green-500/30 border-2 border-green-500 scale-110" 
                            : "bg-white/5 border-2 border-transparent hover:border-white/20"
                        }`}
                      >
                        {emoji}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Title */}
                <div>
                  <label className="block text-sm font-medium text-white/70 mb-2">
                    Tytuł
                  </label>
                  <input
                    type="text"
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-green-500 transition-colors"
                    placeholder="Wpisz tytuł newsa..."
                  />
                </div>

                {/* Description */}
                <div>
                  <label className="block text-sm font-medium text-white/70 mb-2">
                    Opis
                  </label>
                  <textarea
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    rows={4}
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-green-500 transition-colors resize-none"
                    placeholder="Wpisz opis newsa..."
                  />
                </div>

                {/* Time Label */}
                <div>
                  <label className="block text-sm font-medium text-white/70 mb-2">
                    Etykieta czasu
                  </label>
                  <div className="flex gap-2">
                    {["Dziś", "Wczoraj", "Trwa", "Permanentnie", "Wkrótce"].map(time => (
                      <button
                        key={time}
                        onClick={() => setFormData({ ...formData, time })}
                        className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                          formData.time === time 
                            ? "bg-green-500/30 border-2 border-green-500 text-green-400" 
                            : "bg-white/5 border-2 border-transparent hover:border-white/20 text-white/60"
                        }`}
                      >
                        {time}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Buttons */}
                <div className="flex gap-3 pt-4">
                  <button
                    onClick={() => setShowForm(false)}
                    className="flex-1 glass py-3 rounded-xl font-bold hover:bg-white/10 transition-colors"
                  >
                    Anuluj
                  </button>
                  <button
                    onClick={editingId ? handleUpdateNews : handleAddNews}
                    className="flex-1 bg-gradient-primary text-black font-bold py-3 rounded-xl hover:opacity-90 transition-all flex items-center justify-center gap-2 glow-green"
                  >
                    <Save className="w-5 h-5" />
                    {editingId ? "Aktualizuj" : "Dodaj"}
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}

        {/* News List */}
        <div className="space-y-3">
          {news.map((item, idx) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.05 }}
              className={`glass-dark p-6 rounded-2xl border-l-4 transition-all ${
                item.active ? "border-green-500" : "border-white/20 opacity-50"
              }`}
            >
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <span className="text-2xl">{item.icon}</span>
                    <h3 className="font-bold text-lg text-white">{item.title}</h3>
                  </div>
                  <p className="text-white/60 text-sm mb-2">{item.description}</p>
                  <span className="text-xs text-green-400 font-medium">{item.time}</span>
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() => handleToggleActive(item.id)}
                    className="w-10 h-10 rounded-lg bg-white/5 flex items-center justify-center hover:bg-white/10 transition-colors"
                    title={item.active ? "Dezaktywuj" : "Aktywuj"}
                  >
                    <Eye className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => handleEditNews(item)}
                    className="w-10 h-10 rounded-lg bg-white/5 flex items-center justify-center hover:bg-white/10 transition-colors"
                    title="Edytuj"
                  >
                    <Edit3 className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => handleDeleteNews(item.id)}
                    className="w-10 h-10 rounded-lg bg-red-500/10 flex items-center justify-center hover:bg-red-500/20 text-red-400 transition-colors"
                    title="Usuń"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {news.length === 0 && (
          <div className="text-center py-16 glass-dark rounded-2xl">
            <p className="text-white/50 text-lg">Brak newsów. Dodaj pierwszy!</p>
          </div>
        )}

        {/* Footer */}
        <div className="mt-12 text-center text-xs text-white/20">
          <p>Panel Admina • Manager Polskiej Ligi • 2026</p>
          <p className="mt-2">Hasło można zmienić w kodzie (AdminPanel.tsx)</p>
        </div>
      </div>
    </div>
  );
}
