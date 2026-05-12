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
  Edit3,
  Download
} from "lucide-react";
import newsData from "./data/news.json";

const TIME_OPTIONS = ["Dziś", "Wczoraj", "Trwa", "Permanentnie", "Wkrótce"];
const STORAGE_KEY = "fm26_news";

function createEmptyFormData() {
  return {
    icon: "🎮",
    title: "",
    description: "",
    time: "Dziś",
  };
}

export default function AdminPanel() {
  const [news, setNews] = useState<Array<{ id: number; icon: string; title: string; description: string; time: string; active: boolean }>>([]);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [formData, setFormData] = useState(createEmptyFormData);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const ADMIN_PASSWORD = "admin123";

  // Load news from API
  useEffect(() => {
    if (isAuthenticated) {
      loadNews();
    }
  }, [isAuthenticated]);

  const loadNews = async () => {
    try {
      const response = await fetch("/api/news");
      if (response.ok) {
        const data = await response.json();
        setNews(data);
      } else {
        setError("Nie udało się załadować newsów");
      }
    } catch (err) {
      setError("Nie udało się załadować newsów. Sprawdź czy serwer jest uruchomiony.");
    }
  };

  const saveNews = async (updatedNews: typeof news) => {
    try {
      const response = await fetch("/api/news", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updatedNews)
      });

      if (response.ok) {
        setNews(updatedNews);
        setError("");
      } else {
        setError("Nie udało się zapisać zmian");
      }
    } catch (err) {
      setError("Błąd serwera. Sprawdź czy serwer jest uruchomiony.");
    }
  };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === ADMIN_PASSWORD) {
      setIsAuthenticated(true);
      setPassword("");
    } else {
      setError("Nieprawidłowe hasło!");
      setTimeout(() => setError(""), 3000);
    }
  };

  const handleAddNews = async () => {
    if (!formData.title || !formData.description) {
      setError("Wypełnij tytuł i opis!");
      return;
    }

    setLoading(true);
    try {
      const newNews = {
        id: Date.now(),
        ...formData,
        active: true
      };

      const updatedNews = [newNews, ...news];
      await saveNews(updatedNews);
      setFormData(createEmptyFormData());
      setShowForm(false);
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteNews = async (id: number) => {
    if (!confirm("Na pewno chcesz usunąć ten news?")) return;

    setLoading(true);
    try {
      const updatedNews = news.filter(n => n.id !== id);
      await saveNews(updatedNews);
    } finally {
      setLoading(false);
    }
  };

  const handleEditNews = (newsItem: typeof news[0]) => {
    setEditingId(newsItem.id);
    setFormData({
      icon: newsItem.icon,
      title: newsItem.title,
      description: newsItem.description,
      time: newsItem.time,
    });
    setShowForm(true);
  };

  const handleUpdateNews = async () => {
    if (!formData.title || !formData.description) {
      setError("Wypełnij tytuł i opis!");
      return;
    }

    setLoading(true);
    try {
      const updatedNews = news.map(n => 
        n.id === editingId ? { ...n, ...formData } : n
      );
      await saveNews(updatedNews);
      setFormData(createEmptyFormData());
      setEditingId(null);
      setShowForm(false);
    } finally {
      setLoading(false);
    }
  };

  const handleToggleActive = async (id: number) => {
    setLoading(true);
    try {
      const updatedNews = news.map(n => 
        n.id === id ? { ...n, active: !n.active } : n
      );
      await saveNews(updatedNews);
    } finally {
      setLoading(false);
    }
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
            <div className="w-16 h-16 bg-gradient-to-r from-green-500 to-emerald-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <Shield className="w-8 h-8 text-black" />
            </div>
            <h1 className="font-display text-3xl font-bold uppercase mb-2">
              Panel <span className="text-green-400">Admina</span>
            </h1>
            <p className="text-white/50">Wprowadź hasło aby kontynuować</p>
          </div>

          <form onSubmit={handleLogin} className="bg-white/5 backdrop-blur p-8 rounded-2xl border border-white/10">
            {error && (
              <div className="mb-4 p-3 bg-red-500/20 border border-red-500/50 rounded-lg text-red-200 text-sm">
                {error}
              </div>
            )}
            <label className="block text-sm font-medium text-white/70 mb-2">
              Hasło
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Wpisz hasło"
              className="w-full bg-black/50 border border-white/10 rounded-lg px-4 py-2 text-white placeholder-white/30 focus:outline-none focus:border-green-500/50 mb-4"
              autoFocus
            />
            <button
              type="submit"
              className="w-full bg-gradient-to-r from-green-500 to-emerald-600 text-black font-bold py-2 rounded-lg hover:from-green-400 hover:to-emerald-500 transition-all"
            >
              Zaloguj się
            </button>
          </form>
        </motion.div>
      </div>
    );
  }

  // Admin Panel Screen
  return (
    <div className="min-h-screen bg-[#050505]">
      {/* Header */}
      <div className="border-b border-white/10 backdrop-blur">
        <div className="max-w-6xl mx-auto px-6 py-6 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-emerald-600 rounded-xl flex items-center justify-center">
              <Shield className="w-6 h-6 text-black" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-white">Panel Admina</h1>
              <p className="text-xs text-white/50">Zarządzanie newsami</p>
            </div>
          </div>
          <button
            onClick={() => setIsAuthenticated(false)}
            className="flex items-center gap-2 text-white/50 hover:text-white/80 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Wyloguj
          </button>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-6xl mx-auto px-6 py-8">
        {error && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-6 p-4 bg-red-500/20 border border-red-500/50 rounded-lg text-red-200"
          >
            {error}
          </motion.div>
        )}

        {/* Add News Button */}
        <div className="mb-8">
          {!showForm ? (
            <button
              onClick={() => {
                setShowForm(true);
                setEditingId(null);
                setFormData(createEmptyFormData());
              }}
              className="flex items-center gap-2 bg-gradient-to-r from-green-500 to-emerald-600 text-black font-bold px-6 py-3 rounded-lg hover:from-green-400 hover:to-emerald-500 transition-all"
            >
              <Plus className="w-5 h-5" />
              Dodaj nowy news
            </button>
          ) : (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white/5 backdrop-blur p-6 rounded-2xl border border-white/10"
            >
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-lg font-bold text-white">
                  {editingId ? "Edytuj news" : "Nowy news"}
                </h2>
                <button
                  onClick={() => {
                    setShowForm(false);
                    setEditingId(null);
                    setFormData(createEmptyFormData());
                  }}
                  className="text-white/50 hover:text-white/80"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-white/70 mb-2">
                    Ikona (emoji)
                  </label>
                  <input
                    type="text"
                    value={formData.icon}
                    onChange={(e) => setFormData({ ...formData, icon: e.target.value })}
                    placeholder="🎮"
                    className="w-full bg-black/50 border border-white/10 rounded-lg px-4 py-2 text-white placeholder-white/30 focus:outline-none focus:border-green-500/50"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-white/70 mb-2">
                    Tytuł
                  </label>
                  <input
                    type="text"
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    placeholder="Wpisz tytuł newsa"
                    className="w-full bg-black/50 border border-white/10 rounded-lg px-4 py-2 text-white placeholder-white/30 focus:outline-none focus:border-green-500/50"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-white/70 mb-2">
                    Opis
                  </label>
                  <textarea
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    placeholder="Wpisz opis newsa"
                    rows={3}
                    className="w-full bg-black/50 border border-white/10 rounded-lg px-4 py-2 text-white placeholder-white/30 focus:outline-none focus:border-green-500/50"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-white/70 mb-2">
                    Czas
                  </label>
                  <select
                    value={formData.time}
                    onChange={(e) => setFormData({ ...formData, time: e.target.value })}
                    className="w-full bg-black/50 border border-white/10 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-green-500/50"
                  >
                    {TIME_OPTIONS.map(opt => (
                      <option key={opt} value={opt}>{opt}</option>
                    ))}
                  </select>
                </div>

                <div className="flex gap-3 pt-4">
                  <button
                    onClick={editingId ? handleUpdateNews : handleAddNews}
                    disabled={loading}
                    className="flex items-center gap-2 flex-1 bg-gradient-to-r from-green-500 to-emerald-600 text-black font-bold px-6 py-2 rounded-lg hover:from-green-400 hover:to-emerald-500 transition-all disabled:opacity-50"
                  >
                    <Save className="w-4 h-4" />
                    {loading ? "Zapisywanie..." : "Zapisz"}
                  </button>
                  <button
                    onClick={() => {
                      setShowForm(false);
                      setEditingId(null);
                      setFormData(createEmptyFormData());
                    }}
                    className="flex-1 bg-white/10 text-white font-bold px-6 py-2 rounded-lg hover:bg-white/20 transition-all"
                  >
                    Anuluj
                  </button>
                </div>
              </div>
            </motion.div>
          )}
        </div>

        {/* News List */}
        <div>
          <h2 className="text-lg font-bold text-white mb-6">Newsy ({news.length})</h2>
          <div className="grid gap-4">
            {news.map((item, idx) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.05 }}
                className="bg-white/5 backdrop-blur p-6 rounded-2xl border border-white/10 hover:border-white/20 transition-all"
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <span className="text-2xl">{item.icon}</span>
                      <h3 className="text-lg font-bold text-white">{item.title}</h3>
                    </div>
                    <p className="text-white/70 mb-2">{item.description}</p>
                    <p className="text-xs text-white/50">{item.time}</p>
                  </div>
                  <div className="flex items-center gap-2 ml-4">
                    <button
                      onClick={() => handleToggleActive(item.id)}
                      disabled={loading}
                      className={`p-2 rounded-lg transition-all ${
                        item.active
                          ? "bg-green-500/20 text-green-400 hover:bg-green-500/30"
                          : "bg-white/10 text-white/50 hover:bg-white/20"
                      }`}
                      title={item.active ? "Aktywny" : "Nieaktywny"}
                    >
                      <Eye className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => handleEditNews(item)}
                      disabled={loading}
                      className="p-2 rounded-lg bg-white/10 text-white/70 hover:bg-white/20 transition-all"
                    >
                      <Edit3 className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => handleDeleteNews(item.id)}
                      disabled={loading}
                      className="p-2 rounded-lg bg-red-500/10 text-red-400/70 hover:bg-red-500/20 transition-all"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
            {news.length === 0 && (
              <div className="text-center py-12">
                <p className="text-white/50">Brak newsów. Dodaj pierwszy!</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
