/// <reference types="react" />
/// <reference types="react-dom" />
import React, { useEffect, useRef, useState } from "react";
import { motion, useInView } from "motion/react";
import {
  Trophy,
  Users,
  Globe,
  Zap,
  Shield,
  TrendingUp,
  GraduationCap,
  Search,
  AlertCircle,
  Github,
  Mail,
  ChevronRight,
  LayoutDashboard,
  Dribbble,
  Menu,
  X,
  ChevronUp,
  Star,
  BarChart3,
  Map,
  Youtube
} from "lucide-react";

// Hook for scroll animations
function SectionAnimation({ children, className = "" }: { children: React.ReactNode, className?: string }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

export default function App() {
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [imageLoaded, setImageLoaded] = useState(false);
  const [news, setNews] = useState<Array<{ id: number; icon: string; title: string; description: string; time: string; active: boolean }>>([]);

  // Load news from localStorage
  useEffect(() => {
    const savedNews = localStorage.getItem("plm-news");
    if (savedNews) {
      setNews(JSON.parse(savedNews).filter((n: any) => n.active !== false));
    } else {
      // Default news
      const defaultNews = [
        { id: 1, icon: "🎮", title: "Nowa wersja beta dostępna!", description: "Gra jest dostępna do testowania na fm26beta.vercel.app. Zgłaszajcie bugi i sugestie!", time: "Dziś", active: true },
        { id: 2, icon: "📺", title: "Zasubskrybuj kanał YouTube", description: "Na naszym kanale publikujemy gameplay, tutoriale i informacje o aktualizacjach.", time: "Trwa", active: true },
        { id: 3, icon: "🚀", title: "Gra jest w ciągłym rozwoju", description: "Pracujemy nad nowymi ligami, zawodnikami i mechanikami. Wkrótce więcej!", time: "Permanentnie", active: true },
      ];
      setNews(defaultNews);
      localStorage.setItem("plm-news", JSON.stringify(defaultNews));
    }
  }, []);

  // Scroll progress tracking
  useEffect(() => {
    const handleScroll = () => {
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = (window.scrollY / totalHeight) * 100;
      setScrollProgress(progress);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const galleryImages = [
    'public/grafika/screens/1 (1).png',
    'public/grafika/screens/1 (2).png',
    'public/grafika/screens/1 (3).png',
    'public/grafika/screens/1 (4).png',
    'public/grafika/screens/1 (5).png',
    'public/grafika/screens/1 (6).png',
    'public/grafika/screens/1 (7).png',
    'public/grafika/screens/1 (8).png',
    'public/grafika/screens/1 (9).png',
    'public/grafika/screens/1 (10).png',
    'public/grafika/screens/1 (11).png',
    'public/grafika/screens/1 (12).png',
    'public/grafika/screens/1 (13).png',
    'public/grafika/screens/1 (14).png',
    'public/grafika/screens/1 (15).png',
    'public/grafika/screens/1 (16).png',
    'public/grafika/screens/1 (17).png',
    'public/grafika/screens/1 (18).png',
  ];

  const navLinks = [
    { label: 'Symulacja', href: '#features' },
    { label: 'Galeria', href: '#simulation' },
    { label: 'Zarządzanie', href: '#management' },
    { label: 'Nota Prawna', href: '#disclaimer' },
  ];

  return (
    <div className="min-h-screen font-sans">
      {/* Scroll Progress Bar */}
      <div 
        className="scroll-progress" 
        style={{ width: `${scrollProgress}%` }}
      />

      {/* Navigation */}
      <nav className="fixed top-0 w-full z-50 glass border-b border-white/5 px-6 py-4">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-gradient-primary rounded-lg flex items-center justify-center glow-green">
              <Trophy className="w-5 h-5 text-black" />
            </div>
            <span className="font-display font-bold text-xl tracking-tight uppercase">
              Manager <span className="text-gradient-green">Polskiej Ligi</span>
            </span>
          </div>
          
          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-8 text-sm font-medium text-white/60">
            {navLinks.map((link) => (
              <a 
                key={link.href} 
                href={link.href} 
                className="hover:text-green-400 transition-colors relative group"
              >
                {link.label}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-green-500 group-hover:w-full transition-all duration-300" />
              </a>
            ))}
          </div>
          
          <button 
            onClick={() => window.open('https://fm26beta.vercel.app', '_blank')} 
            className="hidden md:block bg-gradient-primary text-black px-5 py-2 rounded-full text-sm font-bold hover:opacity-90 transition-all active:scale-95 glow-green"
          >
            Przetestuj wersję betę
          </button>

          {/* Mobile Menu Button */}
          <button 
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden p-2 text-white/80 hover:text-green-400 transition-colors"
          >
            {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Menu */}
        <motion.div
          initial={false}
          animate={{ 
            height: isMobileMenuOpen ? 'auto' : 0,
            opacity: isMobileMenuOpen ? 1 : 0
          }}
          className="md:hidden overflow-hidden bg-black/90 backdrop-blur-lg rounded-b-2xl"
        >
          <div className="px-6 py-4 space-y-4">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setIsMobileMenuOpen(false)}
                className="block text-white/80 hover:text-green-400 transition-colors py-2 text-lg font-medium"
              >
                {link.label}
              </a>
            ))}
            <button 
              onClick={() => window.open('https://fm26beta.vercel.app', '_blank')}
              className="w-full bg-gradient-primary text-black px-5 py-3 rounded-full font-bold mt-4"
            >
              Przetestuj wersję betę
            </button>
          </div>
        </motion.div>
      </nav>

      {/* Hero Section */}
      <section className="relative flex items-center justify-center overflow-hidden" style={{ minHeight: 'calc(100vh - 72px)', marginTop: '72px' }}>
        {/* Animated Background */}
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-black/50 to-[#050505] z-10" />
          <motion.img
            src="/grafika/theme.png"
            alt="Manager Polskiej Ligi - Grafika tła strony głównej"
            className="w-full h-full object-contain object-center"
            initial={{ scale: 1.05 }}
            animate={{ scale: 1 }}
            transition={{ duration: 1.5, ease: "easeOut" }}
          />
          {/* Floating orbs for ambiance */}
          <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-green-500/10 rounded-full blur-3xl animate-float" />
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-500/5 rounded-full blur-3xl animate-float" style={{ animationDelay: '2s' }} />
        </div>

        <div className="relative z-20 max-w-5xl mx-auto px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <span className="inline-block px-4 py-1.5 rounded-full text-xs font-bold tracking-widest uppercase text-green-400 mb-6 glow-green" style={{ marginTop: '50px' }}>
              OPEN SOURCE
            </span>
            <div className="p-4 mb-8">
              <p className="text-lg md:text-xl text-white/70 max-w-2xl mx-auto leading-relaxed font-light">
                Najlepsza darmowa symulacja Polskiej Ligi w grach online.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <a href="https://fm26beta.vercel.app/" target="_blank" rel="noopener noreferrer" className="w-full sm:w-auto px-8 py-4 bg-gradient-primary text-black font-black uppercase tracking-wider rounded-xl hover:opacity-90 transition-all flex items-center justify-center gap-2 group glow-green">
                Przetestuj Wersje Beta na Vercel
                <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </a>
              <a href="#install" className="w-full sm:w-auto px-8 py-4 glass font-bold uppercase tracking-wider rounded-xl hover:bg-white/10 transition-all">
                Instrukcja Uruchomienia
              </a>
            </div>
          </motion.div>
        </div>

        {/* Stats Bar */}
        <div className="absolute bottom-0 w-full glass-dark border-t border-white/5 py-8 z-20">
          <div className="max-w-7xl mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className="text-center md:text-left">
              <Map className="w-6 h-6 text-green-400 mx-auto md:mx-0 mb-2" />
              <div className="text-3xl font-display font-bold text-gradient-green">3</div>
              <div className="text-xs uppercase tracking-widest text-white/40 font-bold">Grywalne Polskie Ligi</div>
            </div>
            <div className="text-center md:text-left">
              <Shield className="w-6 h-6 text-green-400 mx-auto md:mx-0 mb-2" />
              <div className="text-3xl font-display font-bold text-gradient-green">500+</div>
              <div className="text-xs uppercase tracking-widest text-white/40 font-bold">Oryginalnych Klubów</div>
            </div>
            <div className="text-center md:text-left">
              <Users className="w-6 h-6 text-green-400 mx-auto md:mx-0 mb-2" />
              <div className="text-3xl font-display font-bold text-gradient-green">20k</div>
              <div className="text-xs uppercase tracking-widest text-white/40 font-bold">Generowanych Zawodników</div>
            </div>
            <div className="text-center md:text-left">
              <Zap className="w-6 h-6 text-green-400 mx-auto md:mx-0 mb-2" />
              <div className="text-3xl font-display font-bold text-gradient-green">2</div>
              <div className="text-xs uppercase tracking-widest text-white/40 font-bold">Silniki Symulacji</div>
            </div>
          </div>
          <div className="mt-8 text-center">
            <motion.div
              animate={{ opacity: [0.4, 1, 0.4] }}
              transition={{ duration: 3, repeat: Infinity }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-green-500/10 border border-green-500/20 text-green-400 text-xs font-bold uppercase tracking-wider"
            >
              <Zap className="w-3 h-3" />
              Gra jest non-stop ulepszana • Nowe funkcjonalności praktycznie co tydzień
            </motion.div>
          </div>
        </div>
      </section>

      {/* News Section */}
      <SectionAnimation>
      <section className="py-24 px-6 bg-gradient-to-b from-[#050505] to-white/[0.02] border-t border-white/5">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="font-display text-4xl md:text-5xl font-bold uppercase mb-4">
              <span className="text-gradient-green">Newsy</span>
            </h2>
            <p className="text-white/50">Najświeższe informacje o grze</p>
          </div>

          <div className="border border-white/10 rounded-2xl overflow-hidden glass-dark">
            <div className="bg-white/[0.03] px-6 py-4 border-b border-white/5 flex items-center justify-between">
              <p className="text-white/40 text-sm font-medium flex items-center gap-2">
                <Star className="w-4 h-4 text-green-400" />
                Wiadomości ({news.length})
              </p>
              <div className="flex gap-2">
                <span className="text-xs text-green-400 animate-pulse-slow">●</span>
              </div>
            </div>

            <div className="divide-y divide-white/5">
              {news.length > 0 ? news.map((item, idx) => (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ delay: idx * 0.1, duration: 0.5 }}
                  viewport={{ once: true }}
                  className="px-6 py-5 hover:bg-white/[0.05] transition-colors cursor-pointer border-l-4 border-green-500 group"
                >
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1">
                      <h3 className="font-bold text-white mb-1 group-hover:text-green-400 transition-colors">{item.icon} {item.title}</h3>
                      <p className="text-white/60 text-sm">{item.description}</p>
                    </div>
                    <span className="text-xs text-green-400 whitespace-nowrap ml-4 font-medium">{item.time}</span>
                  </div>
                </motion.div>
              )) : (
                <div className="px-6 py-12 text-center text-white/40">
                  <p>Brak newsów do wyświetlenia</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>
      </SectionAnimation>

      {/* Features Section */}
      <SectionAnimation>
      <section id="features" className="py-24 px-6 bg-[#050505] relative" style={{ opacity: 0.9 }}>
        <div className="absolute inset-0 bg-dots opacity-50" />
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
            <div>
              <h2 className="font-display text-4xl md:text-5xl font-bold uppercase mb-4">
                Głębia <span className="text-gradient-green">Symulacji</span>
              </h2>
              <p className="text-white/50 max-w-xl">
                Zanurz się w świecie, gdzie każdy detal ma znaczenie. Od treningów po akademie młodzieżowe.
              </p>
            </div>
            <div className="flex gap-2">
              <div className="w-12 h-1 bg-gradient-primary rounded-full" />
              <div className="w-4 h-1 bg-white/10 rounded-full" />
              <div className="w-4 h-1 bg-white/10 rounded-full" />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <FeatureCard
              icon={<Shield className="w-6 h-6 text-green-400" />}
              title="Polskie Ligi"
              description="3 grywalne polskie ligi: Ekstraklasa, 1 liga i 2 liga. Rozgrywki krajowe w pełni grywalne."
              delay={0}
            />
            <FeatureCard
              icon={<Globe className="w-6 h-6 text-green-400" />}
              title="Kluby i Reprezentacje"
              description="Ponad 500 oryginalnych klubów z Polski i całego Świata oraz wszystkie reprezentacje świata."
              delay={0.1}
            />
            <FeatureCard
              icon={<Users className="w-6 h-6 text-green-400" />}
              title="Baza Zawodników"
              description="Baza danych generuje ok. 20 tys. zawodników. Gra nie używa oryginalnych nazwisk."
              delay={0.2}
            />
          </div>
        </div>
      </section>
      </SectionAnimation>

      {/* Simulation Section */}
      <SectionAnimation>
      <section id="simulation" className="py-24 px-6 relative overflow-hidden bg-gradient-to-b from-[#050505] via-black to-[#050505]">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-green-500/10 rounded-full blur-[120px] -z-10" />
        <div className="absolute top-1/4 right-1/4 w-64 h-64 bg-purple-500/5 rounded-full blur-[100px] -z-10" />

        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div className="order-2 lg:order-1">
            <div className="space-y-6">
              <div className="flex items-center gap-3">
                <Search className="w-5 h-5 text-green-400" />
                <h3 className="font-display text-xl font-bold uppercase tracking-wide">Przejrzyj <span className="text-gradient-green">Galerię</span></h3>
              </div>
              {/* Main Image */}
              <motion.button
                onClick={() => setIsLightboxOpen(true)}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="rounded-2xl overflow-hidden glass p-1 bg-black/40 block w-full cursor-pointer relative group"
              >
                <motion.img 
                  src={galleryImages[selectedImageIndex]} 
                  className="w-full h-auto object-cover rounded-xl" 
                  alt={`Manager Polskiej Ligi - Screenshot z gry numer ${selectedImageIndex + 1}`}
                  key={selectedImageIndex}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.3 }}
                />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-colors flex items-center justify-center">
                  <span className="text-white opacity-0 group-hover:opacity-100 transition-opacity font-bold text-lg">Kliknij, aby powiększyć</span>
                </div>
              </motion.button>

              {/* Thumbnails */}
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
                {galleryImages.slice(0, 8).map((img, index) => (
                  <motion.button
                    key={index}
                    onClick={() => setSelectedImageIndex(index)}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className={`rounded-xl overflow-hidden glass p-0.5 transition-all border-2 ${
                      selectedImageIndex === index 
                        ? 'border-green-500 glow-green' 
                        : 'border-transparent hover:border-white/20'
                    }`}
                  >
                    <img src={img} className="w-full h-full object-cover rounded-lg" alt={`Manager Polskiej Ligi - Miniatura screenshot ${index + 1}`} />
                  </motion.button>
                ))}
              </div>
              
              {galleryImages.length > 8 && (
                <p className="text-center text-white/40 text-xs">
                  + {galleryImages.length - 8} więcej zdjęć
                </p>
              )}
            </div>
          </div>

          <div className="order-1 lg:order-2">
            <h2 className="font-display text-4xl md:text-5xl font-bold uppercase mb-8 leading-tight">
              Symulacja vs <br />
              <span className="text-gradient-green">Rzeczywistość</span>
            </h2>
            <div className="space-y-8">
              {[
                { icon: <LayoutDashboard className="w-6 h-6" />, title: '2 Silniki Symulacji', desc: 'Gra posiada 2 silniki symulacji meczowych dla urozmaicenia gry.' },
                { icon: <Trophy className="w-6 h-6" />, title: 'Klasyczne Puchary Europejskie', desc: 'Jedynie puchary europejskie klubowe zrobione są na starych zasadach. Dlaczego? Ponieważ autor uważa, że nowe zasady pucharów są słabe i nie tak ciekawe jak poprzednie.' },
                { icon: <Globe className="w-6 h-6" />, title: 'Rozgrywki Międzynarodowe', desc: 'Eliminacje Mistrzostw świata, Puchar Europy, Puchar Świata (symulowany w tle).' },
              ].map((item, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, x: 30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ delay: idx * 0.15, duration: 0.6 }}
                  viewport={{ once: true }}
                  className="flex gap-6 group"
                >
                  <div className="flex-shrink-0 w-12 h-12 rounded-xl glass flex items-center justify-center text-green-400 group-hover:bg-green-500/20 transition-colors">
                    {item.icon}
                  </div>
                  <div>
                    <h3 className="text-xl font-bold mb-2 group-hover:text-green-400 transition-colors">{item.title}</h3>
                    <p className="text-white/50">{item.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>
      </SectionAnimation>

      {/* Lightbox Modal */}
      {isLightboxOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/95 z-50 flex items-center justify-center p-4 cursor-pointer backdrop-blur-sm"
          onClick={() => setIsLightboxOpen(false)}
        >
          <motion.button
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2 }}
            onClick={() => setIsLightboxOpen(false)}
            className="absolute top-6 right-6 text-white/60 hover:text-white text-3xl font-bold w-10 h-10 flex items-center justify-center rounded-full bg-white/10 hover:bg-white/20 transition-colors"
          >
            ✕
          </motion.button>
          <motion.img
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            src={galleryImages[selectedImageIndex]}
            className="max-w-full max-h-[90vh] object-contain rounded-lg shadow-2xl"
            alt={`Manager Polskiej Ligi - Powiększony screenshot z gry numer ${selectedImageIndex + 1}`}
            onClick={(e) => e.stopPropagation()}
          />
        </motion.div>
      )}

      {/* Management Section */}
      <SectionAnimation>
      <section id="management" className="py-24 px-6 bg-gradient-to-b from-white/[0.02] to-transparent">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="font-display text-4xl md:text-5xl font-bold uppercase mb-4">
              Zarządzanie <span className="text-gradient-purple">Totalne</span>
            </h2>
            <p className="text-white/50 max-w-2xl mx-auto">
              Nie tylko mecz. To Twoja wizja klubu. Od finansów po rozwój młodzieży.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <ManagementCard
              icon={<TrendingUp className="w-5 h-5" />}
              title="Transfery"
              description="Zarządzaj rynkiem transferowym w świecie 20 tysięcy zawodników."
              delay={0}
            />
            <ManagementCard
              icon={<Zap className="w-5 h-5" />}
              title="Treningi"
              description="Ustalaj plany treningowe, by rozwijać umiejętności swojej kadry."
              delay={0.1}
            />
            <ManagementCard
              icon={<GraduationCap className="w-5 h-5" />}
              title="Akademie"
              description="Buduj przyszłość klubu poprzez rozbudowane systemy akademii."
              delay={0.2}
            />
            <ManagementCard
              icon={<Dribbble className="w-5 h-5" />}
              title="Zanurzenie"
              description="Wiele innych detali, które pozwalają się zanurzyć w świat symulacji na wiele godzin lub dni."
              delay={0.3}
            />
          </div>
        </div>
      </section>
      </SectionAnimation>

      {/* Installation Section */}
      <SectionAnimation>
      <section id="install" className="py-24 px-6 bg-gradient-to-b from-transparent to-white/[0.02]">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="font-display text-4xl md:text-5xl font-bold uppercase mb-4">
              Jak <span className="text-gradient-green">Zagrać?</span>
            </h2>
            <p className="text-white/50">Gra została stworzona w technologii React. Możesz grać bezpośrednio w przeglądarce lub uruchomić ją lokalnie.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
            <motion.div 
              whileHover={{ y: -5 }}
              className="glass p-8 rounded-3xl border-green-500/20 glow-green"
            >
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 rounded-xl bg-green-500/20 flex items-center justify-center">
                  <Globe className="w-6 h-6 text-green-400" />
                </div>
                <h3 className="text-xl font-bold uppercase">Wersja Online</h3>
              </div>
              <p className="text-white/60 mb-6 text-sm">Najszybszy sposób na grę bez instalacji czegokolwiek na komputerze.</p>
              <a href="https://fm26beta.vercel.app/" target="_blank" rel="noopener noreferrer" className="inline-block w-full text-center py-3 bg-gradient-primary text-black font-bold rounded-xl hover:opacity-90 transition-all glow-green">
                Otwórz fm26beta.vercel.app
              </a>
            </motion.div>

            <motion.div 
              whileHover={{ y: -5 }}
              className="glass p-8 rounded-3xl"
            >
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 rounded-xl bg-purple-500/20 flex items-center justify-center">
                  <LayoutDashboard className="w-6 h-6 text-purple-400" />
                </div>
                <h3 className="text-xl font-bold uppercase">Wersja Lokalna <span className="text-sm text-purple-400">(Wkrótce)</span></h3>
              </div>
              <p className="text-white/60 mb-6 text-sm">Pobierz folder <code className="text-green-400 bg-white/5 px-2 py-1 rounded text-xs">FMPL25_26</code> i uruchom grę u siebie.</p>
              <div className="space-y-4 text-sm">
                {[
                  { num: 1, text: 'Pobierz i zainstaluj', link: 'Node.js', url: 'https://nodejs.org', note: 'To środowisko niezbędne do działania gry.' },
                  { num: 2, text: 'Pobierz grę i umieść folder na dysku, np.', code: 'C:\\FMPL25_26' },
                  { num: 3, text: 'Otwórz CMD i wejdź do folderu:', code: 'C:\\Users\\User> cd C:\\FMPL25_26' },
                  { num: 4, text: 'Zainstaluj biblioteki:', code: 'C:\\FMPL25_26> npm install' },
                  { num: 5, text: 'Uruchom grę:', code: 'C:\\FMPL25_26> npm run dev', note: 'Skopiuj adres, który się pojawi (np. http://localhost:5173) do przeglądarki i graj!' },
                ].map((step, idx) => (
                  <div key={idx} className="flex gap-4">
                    <div className="flex-shrink-0 w-6 h-6 rounded-full bg-gradient-primary text-black flex items-center justify-center font-bold text-xs">{step.num}</div>
                    <div>
                      <p className="text-white/70 mb-1">
                        {step.text}{' '}
                        {step.link && <a href={step.url} className="text-green-400 underline">{step.link}</a>}
                        {step.code && <code className="text-green-400 bg-white/5 px-2 py-0.5 rounded text-xs block mt-1 font-mono">{step.code}</code>}
                      </p>
                      {step.note && <p className="text-[10px] text-white/30 italic">{step.note}</p>}
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>
      </SectionAnimation>

      {/* Bug Report Section */}
      <SectionAnimation>
      <section className="py-24 px-6">
        <div className="max-w-4xl mx-auto glass-dark rounded-3xl p-8 md:p-12 text-center border border-green-500/20 glow-green">
          <AlertCircle className="w-12 h-12 text-green-400 mx-auto mb-6" />
          <h2 className="text-3xl font-bold mb-4">Informacja o błędach</h2>
          <p className="text-white/60 mb-8 leading-relaxed">
            Gra jest funkcjonalna i prawdopodobnie nie ma żadnych krytycznych błędów, ale ze względu na ilość opcji i szczegółowość detali bardzo ciężko jest wyłapać wszystkie nieścisłości. Autor będzie wdzięczny za informacje o wyłapanych bugach.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <a href="mailto:trenuje365@gmail.com" className="flex items-center gap-2 px-6 py-3 glass rounded-xl hover:bg-white/10 transition-all hover:scale-105">
              <Mail className="w-5 h-5" />
              Zgłoś Błąd
            </a>
            <div className="flex items-center gap-2 px-6 py-3 glass rounded-xl hover:scale-105 transition-transform">
              <Github className="w-5 h-5" />
              Open Source
            </div>
          </div>
        </div>
      </section>
      </SectionAnimation>

      {/* FAQ Section */}
      <SectionAnimation>
      <section className="py-24 px-6 bg-gradient-to-b from-transparent to-white/[0.02]">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="font-display text-4xl md:text-5xl font-bold uppercase mb-4">
              Częste <span className="text-gradient-green">Pytania</span>
            </h2>
            <p className="text-white/60">Odpowiedzi na najczęściej zadawane pytania o grze</p>
          </div>

          <div className="space-y-4">
            {[
              { q: 'Czy gra jest całkowicie darmowa?', a: 'Tak! Gra jest całkowicie darmowa i taka ma pozostać. Nie ma żadnych ukrytych płatności, premium featur ani pay-to-win mechanik. To 100% fanowski projekt, a my nie zarabiamy na jego tworzeniu. Wszystko robiliśmy z pasji do piłki nożnej i gier symulacyjnych.' },
              { q: 'W jakim języku jest napisana ta gra?', a: '<strong className="text-white">Języki programowania:</strong><ul className="list-disc list-inside space-y-1 ml-2 mt-2"><li><strong className="text-white">TypeScript</strong> - główny język programowania</li><li><strong className="text-white">JavaScript</strong> - na nim działa gra w przeglądarce</li></ul><p className="mt-3 mb-2"><strong className="text-white">Technologie:</strong></p><ul className="list-disc list-inside space-y-1 ml-2"><li><strong className="text-white">React</strong> - framework do budowy interfejsu</li><li><strong className="text-white">Tailwind CSS</strong> - stylizacja</li><li><strong className="text-white">Vite</strong> - narzędzie build</li></ul>' },
              { q: 'Jak uruchomić grę?', a: '<strong className="text-white">Najszybciej:</strong> Wejdź na <a href="https://fm26beta.vercel.app/" className="text-green-400 underline">fm26beta.vercel.app</a> i graj od razu.<br/><br/><strong className="text-white">Lokalnie:</strong> Pobierz grę, zainstaluj Node.js, uruchom <code className="bg-white/10 px-2 rounded text-green-400">npm install</code>, a następnie <code className="bg-white/10 px-2 rounded text-green-400">npm run dev</code>.' },
              { q: 'Czy gra będzie nadal rozwijana?', a: '<strong className="text-white">Tak!</strong> Gra jest w ciągłym rozwoju. Regularnie dodajemy nowe features, poprawiamy AI, dodajemy nowe ligi i zawodników.' },
              { q: 'Czy mogę się dołączyć do tworzenia gry?', a: '<strong className="text-white">Oczywiście!</strong> Gra jest open source. Możesz czytać kod, zgłaszać bugi, tworzyć pull requests. Kontakt: <strong className="text-white">trenuje365@gmail.com</strong>' },
              { q: 'Wymagania systemowe - co potrzebuję?', a: '<strong className="text-white">Online:</strong> Nowoczesna przeglądarka, połączenie internetowe.<br/><br/><strong className="text-white">Lokalnie:</strong> Node.js v16+, ~1.3 GB miejsca. Zalecamy 8GB RAM.' },
            ].map((faq, idx) => (
              <motion.details
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.1 }}
                viewport={{ once: true }}
                className="group glass p-6 rounded-2xl cursor-pointer hover:border-green-500/30 transition-colors"
              >
                <summary className="flex items-center justify-between font-bold text-lg text-white hover:text-green-400 transition-colors">
                  <span>{faq.q}</span>
                  <ChevronUp className="w-5 h-5 text-green-400 rotate-180 group-open:rotate-0 transition-transform" />
                </summary>
                <div 
                  className="pt-4 text-white/70 leading-relaxed"
                  dangerouslySetInnerHTML={{ __html: faq.a }}
                />
              </motion.details>
            ))}
          </div>
        </div>
      </section>
      </SectionAnimation>

      {/* YouTube Section */}
      <SectionAnimation>
      <section className="py-24 px-6 bg-gradient-to-b from-white/[0.02] to-transparent">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="font-display text-4xl md:text-5xl font-bold uppercase mb-4">
              Obejrzyj na <span className="text-red-500">YouTube</span>
            </h2>
            <p className="text-white/60 max-w-2xl mx-auto">Aby dowiedzieć się więcej o grze, obejrzyj nasz film i zasubskrybuj kanał!</p>
          </div>

          <div className="space-y-8">
            {/* Video Embed */}
            <motion.div 
              className="relative w-full rounded-2xl overflow-hidden glass p-1"
              whileHover={{ scale: 1.01 }}
              style={{ paddingBottom: '56.25%' }}
            >
              <iframe
                className="absolute top-0 left-0 w-full h-full rounded-xl"
                src="https://www.youtube.com/embed/XsGTkVzl_QM"
                title="Futbol Manager - Gra Piłkarska"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            </motion.div>

            {/* Subscribe CTA */}
            <div className="text-center">
              <a
                href="https://www.youtube.com/@FutbolPL26"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-3 px-8 py-4 bg-red-600 text-white font-black uppercase tracking-wider rounded-xl hover:bg-red-500 transition-all hover:scale-105"
              >
                <Youtube className="w-6 h-6" />
                Zasubskrybuj Kanał
              </a>
            </div>
          </div>
        </div>
      </section>
      </SectionAnimation>

      {/* Disclaimer Section */}
      <SectionAnimation>
      <section id="disclaimer" className="py-24 px-6 bg-[#050505]">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center gap-3 mb-8">
            <div className="w-10 h-10 rounded-full bg-yellow-500/10 flex items-center justify-center">
              <Shield className="w-5 h-5 text-yellow-400" />
            </div>
            <h3 className="text-xl font-bold uppercase tracking-wider text-yellow-400">Nota Prawna</h3>
          </div>
          <div className="space-y-6 text-sm text-white leading-relaxed font-light glass p-8 rounded-2xl">
            <p>Niniejsza gra „Futbol Manager" jest w całości niekomercyjnym, fanowskim projektem stworzonym dobrowolnie.</p>
            <p>Gra nie służy generowaniu żadnych korzyści finansowych. Twórca nie czerpie i nie zamierza czerpać jakichkolwiek dochodów z jej udostępniania lub użytkowania.</p>
            <p>Znaki towarowe, loga klubów, nazwy drużyn, barwy oraz wszelkie inne oznaczenia należące do rzeczywistych klubów piłkarskich, federacji, lig lub innych podmiotów trzecich zostały użyte wyłącznie w celach niekomercyjnych i bez uzyskania zgody ich prawowitych właścicieli.</p>
            <p>Zbieżność imion i nazwisk rzeczywistych osób, jeśli wystąpi, jest całkowicie przypadkowa, ponieważ gra generuje fikcyjne postaci.</p>
            <p>Kod źródłowy gry jest open-source i może być dowolnie modyfikowany oraz rozbudowywany według potrzeb użytkowników.</p>
            <p>Gra powstała jako dobrowolna, hobbystyczna inicjatywa i jest w całości bezpłatna.</p>
            <p className="font-bold text-white/60">Twórca nie ponosi odpowiedzialności za jakiekolwiek szkody wynikające z użytkowania gry.</p>
            <div className="pt-6 border-t border-white/10 flex flex-col md:flex-row justify-between gap-4">
              <div>
                <span className="font-bold text-white/60">Autor:</span> JayJayBi
              </div>
              <div>
                <span className="font-bold text-white/60">Kontakt:</span> <a href="mailto:trenuje365@gmail.com" className="text-green-400 hover:text-green-300">trenuje365@gmail.com</a>
              </div>
              <div>
                <span className="font-bold text-white/60">Data:</span> Marzec 2026
              </div>
            </div>
          </div>
        </div>
      </section>
      </SectionAnimation>

      {/* Footer */}
      <footer className="py-16 px-6 bg-gradient-to-t from-black to-[#050505] border-t border-white/5">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col items-center gap-6">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-gradient-primary rounded-lg flex items-center justify-center glow-green">
                <Trophy className="w-5 h-5 text-black" />
              </div>
              <span className="font-display font-bold text-xl tracking-tight uppercase">
                Manager <span className="text-gradient-green">Polskiej Ligi</span>
              </span>
            </div>
            
            <div className="flex flex-wrap justify-center gap-6 text-sm text-white/40">
              <a href="#features" className="hover:text-green-400 transition-colors">Symulacja</a>
              <a href="#simulation" className="hover:text-green-400 transition-colors">Galeria</a>
              <a href="#management" className="hover:text-green-400 transition-colors">Zarządzanie</a>
              <a href="#install" className="hover:text-green-400 transition-colors">Jak Zagrać</a>
              <a href="#disclaimer" className="hover:text-green-400 transition-colors">Nota Prawna</a>
            </div>

            <div className="flex items-center gap-4">
              <a href="mailto:trenuje365@gmail.com" className="w-10 h-10 rounded-full glass flex items-center justify-center hover:bg-green-500/20 hover:text-green-400 transition-colors">
                <Mail className="w-4 h-4" />
              </a>
              <a href="https://www.youtube.com/@FutbolPL26" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full glass flex items-center justify-center hover:bg-red-500/20 hover:text-red-400 transition-colors">
                <Youtube className="w-4 h-4" />
              </a>
              <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full glass flex items-center justify-center hover:bg-white/20 transition-colors">
                <Github className="w-4 h-4" />
              </a>
            </div>
          </div>
          
          <div className="mt-8 pt-8 border-t border-white/5 text-center">
            <p className="text-xs text-white/20 uppercase tracking-wider mb-2">
              © 2026 JayJayBi • Wszystkie prawa do oryginalnych znaków towarowych należą do ich właścicieli.
            </p>
            <a href="#/admin" className="text-[10px] text-white/10 hover:text-white/30 transition-colors inline-flex items-center gap-1">
              <Shield className="w-3 h-3" />
              Panel Admina
            </a>
          </div>
        </div>
      </footer>

      {/* Scroll to Top Button */}
      <ScrollToTop />
    </div>
  );
}

// Scroll to Top Button Component
function ScrollToTop() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.scrollY > 500) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener('scroll', toggleVisibility);
    return () => window.removeEventListener('scroll', toggleVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <motion.button
      initial={{ opacity: 0 }}
      animate={{ opacity: isVisible ? 1 : 0 }}
      transition={{ duration: 0.3 }}
      onClick={scrollToTop}
      className="fixed bottom-8 right-8 w-12 h-12 bg-gradient-primary rounded-full flex items-center justify-center text-black shadow-lg hover:scale-110 transition-transform z-40 glow-green"
      style={{ pointerEvents: isVisible ? 'auto' : 'none' }}
    >
      <ChevronUp className="w-6 h-6" />
    </motion.button>
  );
}

function FeatureCard({ icon, title, description, delay = 0 }: { icon: React.ReactNode, title: string, description: string, delay?: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ delay, duration: 0.6 }}
      viewport={{ once: true }}
      whileHover={{ y: -8, boxShadow: '0 0 30px rgba(34, 197, 94, 0.2)' }}
      className="p-8 rounded-3xl glass hover:border-green-500/30 transition-all group"
    >
      <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-green-500/20 to-emerald-600/20 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
        {icon}
      </div>
      <h3 className="text-xl font-bold mb-3 group-hover:text-green-400 transition-colors">{title}</h3>
      <p className="text-white/40 text-sm leading-relaxed">{description}</p>
    </motion.div>
  );
}

function ManagementCard({ icon, title, description, delay = 0 }: { icon: React.ReactNode, title: string, description: string, delay?: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ delay, duration: 0.6 }}
      viewport={{ once: true }}
      whileHover={{ y: -5, borderColor: 'rgba(139, 92, 246, 0.5)' }}
      className="p-6 rounded-2xl glass-dark border border-white/5 hover:glow-purple transition-all"
    >
      <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-purple-500/20 to-violet-600/20 flex items-center justify-center mb-4 text-purple-400">
        {icon}
      </div>
      <h3 className="font-bold mb-2 hover:text-purple-400 transition-colors">{title}</h3>
      <p className="text-white/40 text-xs leading-relaxed">{description}</p>
    </motion.div>
  );
}
