'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence, Variants } from 'framer-motion';
import { Navbar } from '@/components/layout/Navbar';
import { Brain, Code, Palette, Server, Shield, Activity, Target, X, DollarSign, Check } from 'lucide-react';
import { cn } from '@/lib/utils';
import { CardContainer, CardBody } from '@/components/ui/3d-card';

// ==========================================
// 1. STRUKTUR DATA
// ==========================================
interface Career {
  id: string;
  category: string;
  title: string;
  matchScore: number;
  demandLevel: number;
  salaryRange: string;
  tags: string[];
  iconType: 'code' | 'server' | 'palette' | 'brain' | 'shield' | 'default';
  description: string;
  roadmap: Array<{ label: string; status: 'completed' | 'current' | 'future' }>;
}

const IconMap = ({ type }: { type: Career['iconType'] }) => {
  const IconProps = { className: "w-7 h-7 text-orange-400" };
  switch (type) {
    case 'code': return <Code {...IconProps} />;
    case 'server': return <Server {...IconProps} />;
    case 'palette': return <Palette {...IconProps} />;
    case 'brain': return <Brain {...IconProps} />;
    case 'shield': return <Shield {...IconProps} />;
    default: return <Activity {...IconProps} />;
  }
};

// ==========================================
// 2. DATABASE LOKAL (ANTI-GAGAL)
// ==========================================
const DATABASE_CAREERS: Career[] = [
  { id: 'cloud-eng', category: 'Infrastruktur & Jaringan', title: 'Cloud Architecture Engineer', matchScore: 92, demandLevel: 90, salaryRange: 'Rp 20-40', tags: ['AWS', 'Terraform', 'Docker'], iconType: 'server', description: 'Merancang dan mengelola infrastruktur cloud berkinerja tinggi.', roadmap: [{ label: 'Cloud Fundamentals', status: 'completed' }, { label: 'Kubernetes', status: 'completed' }, { label: 'Security', status: 'current' }, { label: 'Advanced Arch', status: 'future' }] },
  { id: 'net-admin', category: 'Infrastruktur & Jaringan', title: 'Network Administrator', matchScore: 88, demandLevel: 85, salaryRange: 'Rp 10-25', tags: ['Cisco', 'MikroTik', 'Routing'], iconType: 'server', description: 'Mengelola dan mengamankan jaringan internal perusahaan.', roadmap: [{ label: 'Networking Basics', status: 'completed' }, { label: 'Routing & Switching', status: 'completed' }, { label: 'Firewall', status: 'current' }, { label: 'Cloud Net', status: 'future' }] },
  { id: 'cyber-sec', category: 'Infrastruktur & Jaringan', title: 'Cyber Security Specialist', matchScore: 90, demandLevel: 95, salaryRange: 'Rp 18-35', tags: ['Network Security', 'Pentesting', 'Incident Response'], iconType: 'shield', description: 'Melindungi sistem dan jaringan dari serangan siber.', roadmap: [{ label: 'Security Fund.', status: 'completed' }, { label: 'Threat Analysis', status: 'completed' }, { label: 'Vulnerability', status: 'current' }, { label: 'Ethical Hacking', status: 'future' }] },
  { id: 'fullstack', category: 'Software Development', title: 'Full-Stack Developer', matchScore: 95, demandLevel: 95, salaryRange: 'Rp 15-30', tags: ['React', 'Node.js', 'PostgreSQL'], iconType: 'code', description: 'Membangun aplikasi web lengkap dari front-end hingga back-end.', roadmap: [{ label: 'Front-end', status: 'completed' }, { label: 'Back-end', status: 'completed' }, { label: 'Database', status: 'current' }, { label: 'DevOps', status: 'future' }] },
  { id: 'qa-eng', category: 'Software Development', title: 'Quality Assurance Engineer', matchScore: 90, demandLevel: 90, salaryRange: 'Rp 10-20', tags: ['Automation', 'Selenium', 'Testing'], iconType: 'code', description: 'Menguji kualitas perangkat lunak.', roadmap: [{ label: 'Testing Basics', status: 'completed' }, { label: 'Manual Testing', status: 'completed' }, { label: 'Auto Testing', status: 'current' }, { label: 'Performance Test', status: 'future' }] },
  { id: 'data-sci', category: 'Data & AI', title: 'Data Scientist', matchScore: 92, demandLevel: 88, salaryRange: 'Rp 12-30', tags: ['Python', 'Machine Learning', 'SQL'], iconType: 'brain', description: 'Menganalisis data kompleks dan membangun model prediktif.', roadmap: [{ label: 'Python & SQL', status: 'completed' }, { label: 'Statistics', status: 'completed' }, { label: 'ML Models', status: 'current' }, { label: 'Deep Learning', status: 'future' }] },
  { id: 'ai-eng', category: 'Data & AI', title: 'AI Engineer', matchScore: 95, demandLevel: 92, salaryRange: 'Rp 25-45', tags: ['TensorFlow', 'PyTorch', 'NLP'], iconType: 'brain', description: 'Mengembangkan sistem kecerdasan buatan.', roadmap: [{ label: 'Math for AI', status: 'completed' }, { label: 'Model Training', status: 'completed' }, { label: 'Deployment', status: 'current' }, { label: 'Advanced AI', status: 'future' }] },
  { id: 'ux-design', category: 'Kreatif & Desain', title: 'UX Designer', matchScore: 85, demandLevel: 80, salaryRange: 'Rp 10-18', tags: ['Figma', 'Adobe XD', 'Sketch'], iconType: 'palette', description: 'Menciptakan pengalaman pengguna yang intuitif.', roadmap: [{ label: 'User Research', status: 'completed' }, { label: 'Wireframing', status: 'completed' }, { label: 'Design Systems', status: 'current' }, { label: 'Usability Test', status: 'future' }] },
  { id: 'ui-design', category: 'Kreatif & Desain', title: 'UI Designer', matchScore: 88, demandLevel: 82, salaryRange: 'Rp 10-18', tags: ['Visual Design', 'Typography', 'Color'], iconType: 'palette', description: 'Membuat antarmuka visual yang modern.', roadmap: [{ label: 'Design Principles', status: 'completed' }, { label: 'Color Theory', status: 'completed' }, { label: 'Prototyping', status: 'current' }, { label: 'Motion UI', status: 'future' }] }
];


// ==========================================
// KOMPONEN: BACKGROUND BERGERAK (Animated Motif)
// ==========================================
const AnimatedBackground = () => (
  <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
    {/* Cahaya berpendar (Glowing Orbs) yang bergerak */}
    <motion.div animate={{ x: [0, 50, 0], y: [0, -50, 0] }} transition={{ duration: 15, repeat: Infinity, ease: "linear" }} className="absolute top-[-10%] left-[-10%] w-[40rem] h-[40rem] bg-orange-200/30 rounded-full blur-[100px]" />
    <motion.div animate={{ x: [0, -40, 0], y: [0, 60, 0] }} transition={{ duration: 18, repeat: Infinity, ease: "linear" }} className="absolute bottom-[-10%] right-[-10%] w-[35rem] h-[35rem] bg-[#992248]/10 rounded-full blur-[100px]" />

    {/* Motif Jaringan Konstelasi yang bergeser pelan */}
    <motion.svg
      animate={{ x: [0, -30, 0], y: [0, -30, 0] }}
      transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
      className="absolute inset-0 w-[120%] h-[120%] opacity-[0.05]" xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <pattern id="network" width="120" height="120" patternUnits="userSpaceOnUse">
          <circle cx="60" cy="60" r="2.5" fill="#000" />
          <circle cx="10" cy="10" r="1.5" fill="#000" />
          <circle cx="110" cy="90" r="2" fill="#000" />
          <path d="M60 60 L10 10 M60 60 L110 90 M10 10 L-20 40 M110 90 L140 60 M60 60 L60 140" stroke="#000" strokeWidth="0.8" />
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill="url(#network)" />
    </motion.svg>
  </div>
);

// ==========================================
// KOMPONEN: MINI-ROADMAP GRAPH (Gaya Jaringan Interaktif)
// ==========================================
const NetworkRoadmap = ({ roadmap }: { roadmap: Career['roadmap'] }) => {
  // Posisi 4 node agar membentuk zig-zag/jaringan cantik
  const nodes = [
    { cx: 50, cy: 30, align: 'left' },
    { cx: 190, cy: 90, align: 'right' },
    { cx: 50, cy: 160, align: 'left' },
    { cx: 190, cy: 220, align: 'right' }
  ];

  return (
    <div className="relative w-full flex justify-center py-6">
      <div className="relative w-[240px] h-[250px]">

        {/* Garis Konektor Lengkung (Curved Paths) */}
        <svg className="absolute inset-0 w-full h-full pointer-events-none" viewBox="0 0 240 250">
          <defs>
            {/* Gradasi warna agar garis terlihat menyala */}
            <linearGradient id="lineGrad1" x1="0" y1="0" x2="1" y2="0"><stop offset="0%" stopColor="#10b981" /><stop offset="100%" stopColor="#f97316" /></linearGradient>
            <linearGradient id="lineGrad2" x1="1" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="#f97316" /><stop offset="100%" stopColor="#e5e7eb" /></linearGradient>
            <linearGradient id="lineGrad3" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stopColor="#e5e7eb" /><stop offset="100%" stopColor="#e5e7eb" /></linearGradient>
          </defs>

          <path d={`M ${nodes[0].cx} ${nodes[0].cy} C 120 ${nodes[0].cy}, 120 ${nodes[1].cy}, ${nodes[1].cx} ${nodes[1].cy}`} fill="none" stroke="url(#lineGrad1)" strokeWidth="3" />
          <path d={`M ${nodes[1].cx} ${nodes[1].cy} C 120 ${nodes[1].cy}, 120 ${nodes[2].cy}, ${nodes[2].cx} ${nodes[2].cy}`} fill="none" stroke="url(#lineGrad2)" strokeWidth="3" />
          <path d={`M ${nodes[2].cx} ${nodes[2].cy} C 120 ${nodes[2].cy}, 120 ${nodes[3].cy}, ${nodes[3].cx} ${nodes[3].cy}`} fill="none" stroke="url(#lineGrad3)" strokeWidth="3" />

          {/* Garis samar koneksi tambahan (Jaring-jaring) */}
          <line x1={nodes[0].cx} y1={nodes[0].cy} x2={nodes[2].cx} y2={nodes[2].cy} stroke="#f3f4f6" strokeWidth="2" strokeDasharray="5 5" />
        </svg>

        {/* Titik (Nodes) & Label */}
        {roadmap.map((step, i) => (
          <div key={i} className="absolute flex items-center justify-center group" style={{ left: nodes[i].cx, top: nodes[i].cy, transform: 'translate(-50%, -50%)' }}>

            {/* Lingkaran Outer Glow */}
            <div className={cn(
              "absolute w-12 h-12 rounded-full opacity-20 transition-all duration-500",
              step.status === 'completed' ? "bg-emerald-500" :
                step.status === 'current' ? "bg-orange-500 animate-ping opacity-40" : "bg-gray-300"
            )} />

            {/* Lingkaran Titik Utama */}
            <div className={cn(
              "relative w-8 h-8 rounded-full border-[3px] flex items-center justify-center bg-white shadow-md z-10 transition-colors duration-300",
              step.status === 'completed' ? "border-emerald-500" :
                step.status === 'current' ? "border-orange-500 scale-110" : "border-gray-200"
            )}>
              {step.status === 'completed' && <Check size={14} className="text-emerald-500" />}
              {step.status === 'current' && <div className="w-2.5 h-2.5 bg-orange-500 rounded-full" />}
              {step.status === 'future' && <div className="w-1.5 h-1.5 bg-gray-200 rounded-full" />}
            </div>

            {/* Kotak Informasi (Label) */}
            <div className={cn(
              "absolute w-36 px-4 py-2.5 bg-white/95 backdrop-blur-md rounded-xl shadow-[0_5px_20px_rgba(0,0,0,0.06)] border border-white z-20 pointer-events-none transition-transform group-hover:scale-105",
              nodes[i].align === 'left' ? "left-12" : "right-12 text-right"
            )}>
              <span className="block text-[9px] font-bold text-gray-400 uppercase tracking-wider mb-0.5">Tahap {i + 1}</span>
              <span className={cn(
                "block text-xs font-extrabold leading-tight",
                step.status === 'completed' ? "text-slate-700" :
                  step.status === 'current' ? "text-orange-600" : "text-gray-400"
              )}>
                {step.label}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};


export default function ExploreCareers() {
  const router = useRouter();

  // ==========================================
  // 3. STATE REACT & ENGINE FILTER 
  // ==========================================
  const [selectedCategory, setSelectedCategory] = useState("Semua");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCareer, setSelectedCareer] = useState<Career | null>(null);
  const [displayedCareers, setDisplayedCareers] = useState<Career[]>(DATABASE_CAREERS);

  useEffect(() => {
    let result = DATABASE_CAREERS;
    if (selectedCategory !== "Semua") {
      result = result.filter(item => item.category === selectedCategory);
    }
    if (searchQuery.trim() !== "") {
      const lowerQuery = searchQuery.toLowerCase().trim();
      result = result.filter(item =>
        item.title.toLowerCase().includes(lowerQuery) ||
        item.tags.some(tag => tag.toLowerCase().includes(lowerQuery)) ||
        item.description.toLowerCase().includes(lowerQuery)
      );
    }
    setDisplayedCareers(result);
  }, [selectedCategory, searchQuery]);

  const getCount = (cat: string) => {
    if (cat === "Semua") return DATABASE_CAREERS.length;
    return DATABASE_CAREERS.filter(c => c.category === cat).length;
  };

  const handleCreateJourney = () => {
    if (selectedCareer) {
      localStorage.setItem('activeJourney', JSON.stringify(selectedCareer));
      router.push('/journey');
    }
  };

  const StaggeredEntrance: Variants = {
    hidden: { opacity: 0, y: 30 },
    show: { opacity: 1, y: 0, transition: { type: "spring" as const, bounce: 0.4, duration: 0.8 } }
  };

  const SegmentedDemandBar = ({ level }: { level: number }) => {
    const totalSegments = 7;
    const activeSegments = Math.round((level / 100) * totalSegments);
    return (
      <div className="flex gap-1.5 items-center">
        {[...Array(totalSegments)].map((_, i) => (
          <div
            key={i}
            className={cn(
              "h-3 w-3 rounded-[3px] transition-colors duration-500",
              i < activeSegments
                ? "bg-gradient-to-tr from-orange-400 to-yellow-400 shadow-[0_0_8px_rgba(251,146,60,0.4)]"
                : "bg-gray-100"
            )}
          />
        ))}
      </div>
    );
  };

  return (
    <div className="relative min-h-screen bg-[#F8F9FA] text-slate-900 selection:bg-rose-200 overflow-x-hidden">

      {/* MENGGUNAKAN BACKGROUND BERGERAK */}
      <AnimatedBackground />

      <Navbar />

      <main className="pt-32 pb-20 px-6 max-w-7xl mx-auto relative z-10">

        {/* ======================= HEADER & SEARCH ======================= */}
        <section className="mb-12 text-center">
          <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight text-slate-900 mb-8">
            Explore Careers
          </h1>

          <div className="relative max-w-2xl mx-auto mb-10 group">
            <div className="absolute inset-0 bg-white/60 backdrop-blur-xl rounded-full shadow-[0_8px_30px_rgb(0,0,0,0.04)] -z-10 transition-all duration-300 group-hover:shadow-[0_8px_30px_rgb(0,0,0,0.08)]"></div>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search careers..."
              className="w-full h-14 bg-transparent border border-white/80 rounded-full pl-8 pr-16 text-base focus:outline-none focus:ring-2 focus:ring-orange-500/20 text-slate-800 placeholder:text-gray-400"
            />
            <button className="absolute right-2 top-1/2 -translate-y-1/2 p-2.5 bg-gradient-to-r from-[#701a35] to-[#992248] rounded-full transition-transform hover:scale-105 shadow-md">
              <Target size={18} className="text-white" />
            </button>
          </div>

          <div className="flex flex-wrap justify-center gap-3">
            {["Semua", "Software Development", "Data & AI", "Kreatif & Desain", "Infrastruktur & Jaringan"].map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={cn(
                  "px-5 py-2.5 rounded-full text-[13px] font-semibold whitespace-nowrap transition-all duration-300 border backdrop-blur-md",
                  selectedCategory === cat
                    ? "bg-gradient-to-r from-[#701a35] to-[#992248] text-white border-transparent shadow-[0_8px_20px_rgba(153,34,72,0.25)] scale-105"
                    : "bg-white/70 text-gray-500 hover:bg-white hover:text-slate-800 border-white/80 shadow-[0_4px_15px_rgb(0,0,0,0.02)]"
                )}
              >
                {cat} <span className={cn("ml-1 opacity-70 font-normal", selectedCategory === cat ? "text-white" : "text-gray-400")}>[{getCount(cat)}]</span>
              </button>
            ))}
          </div>
        </section>

        {/* ======================= GRID KARTU ======================= */}
        {displayedCareers.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20 min-h-[30vh] bg-white/50 backdrop-blur-md rounded-3xl border border-white shadow-sm">
            <Target size={32} className="text-gray-300 mb-4" />
            <p className="text-gray-500 font-medium">Tidak ada data profesi yang cocok.</p>
          </div>
        ) : (
          <motion.section initial="hidden" animate="show" className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-8">
            {displayedCareers.map((career) => (
              <motion.div
                key={career.id}
                variants={StaggeredEntrance}
                whileHover={{ y: -8 }}
                whileTap={{ scale: 0.98 }}
                className="cursor-pointer h-full"
                onClick={() => setSelectedCareer(career)}
              >
                <CardContainer className="inter-var w-full h-full py-0" containerClassName="py-0 px-0 flex items-stretch">
                  <CardBody className="bg-white/80 backdrop-blur-xl border border-white/90 p-7 rounded-[2rem] relative overflow-hidden group shadow-[0_10px_40px_rgb(0,0,0,0.03)] hover:shadow-[0_20px_50px_rgb(0,0,0,0.08)] transition-all duration-500 flex flex-col h-full">

                    <div className="absolute top-0 right-0 z-20">
                      <div className={cn(
                        "text-white text-[11px] font-bold px-4 py-2.5 rounded-bl-[1.5rem] shadow-[-4px_4px_15px_rgba(0,0,0,0.05)] relative overflow-hidden",
                        career.matchScore >= 90 ? "bg-gradient-to-br from-orange-300 to-orange-400" : "bg-gradient-to-br from-emerald-300 to-emerald-400"
                      )}>
                        {career.matchScore}% Match
                        <div className="absolute inset-0 bg-gradient-to-bl from-white/40 to-transparent opacity-50"></div>
                      </div>
                    </div>

                    <div className="relative z-20 mb-6 w-full mt-2">
                      <div className="w-14 h-14 flex items-center justify-center bg-orange-50/80 rounded-2xl group-hover:scale-110 group-hover:rotate-3 transition-transform duration-500 border border-orange-100/50 shadow-sm">
                        <IconMap type={career.iconType} />
                      </div>
                    </div>

                    <div className="relative z-20 flex-grow w-full mb-8">
                      <h3 className="text-xl font-extrabold tracking-tight text-slate-800 mb-4 leading-tight">{career.title}</h3>
                      <div className="flex flex-wrap gap-2">
                        {career.tags.slice(0, 3).map(tag => (
                          <span key={tag} className="px-3 py-1.5 bg-gray-50/80 rounded-lg text-[10px] font-semibold text-gray-500 border border-gray-200/50 group-hover:bg-gray-100 group-hover:text-slate-700 transition-colors">
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div className="mt-auto pt-6 border-t border-gray-100/80 flex items-end justify-between w-full relative z-20">
                      <div>
                        <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest block mb-1">Salary</span>
                        <span className="text-[14px] font-extrabold text-slate-700">{career.salaryRange} <span className="text-xs font-medium text-gray-400">/mo</span></span>
                      </div>

                      <div className="flex flex-col items-end">
                        <span className="text-[9px] font-bold text-gray-400 uppercase tracking-widest mb-2">Demand</span>
                        <SegmentedDemandBar level={career.demandLevel} />
                      </div>
                    </div>
                  </CardBody>
                </CardContainer>
              </motion.div>
            ))}
          </motion.section>
        )}
      </main>

      {/* ======================= SLIDE OVER PANEL (FROSTED GLASS) ======================= */}
      <AnimatePresence>
        {selectedCareer && (
          <>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setSelectedCareer(null)} className="fixed inset-0 bg-slate-900/10 backdrop-blur-sm z-[100]" />

            <motion.div
              initial={{ x: "100%", opacity: 0.5 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: "100%", opacity: 0.5 }}
              transition={{ type: "spring", damping: 28, stiffness: 200 }}
              className="fixed top-0 right-0 h-full w-full md:w-[450px] bg-white/85 backdrop-blur-2xl border-l border-white z-[110] shadow-[-30px_0_60px_rgba(0,0,0,0.08)] p-8 flex flex-col pt-20 overflow-y-auto"
            >
              <button onClick={() => setSelectedCareer(null)} className="absolute top-6 right-6 p-2 bg-white/50 hover:bg-white rounded-full transition-all shadow-sm border border-gray-100">
                <X size={18} className="text-slate-600" />
              </button>

              <div className="mb-8">
                <span className="inline-block px-3 py-1 bg-gradient-to-r from-orange-400 to-yellow-400 text-white text-[10px] font-bold uppercase tracking-widest rounded-full mb-4 shadow-[0_4px_10px_rgba(251,146,60,0.3)]">
                  {selectedCareer.matchScore}% Profil Match
                </span>
                <h2 className="text-3xl font-extrabold tracking-tight text-slate-900 mb-3 leading-tight">{selectedCareer.title}</h2>
                <p className="text-slate-500 leading-relaxed text-sm font-medium">{selectedCareer.description}</p>
              </div>

              <div className="space-y-8 flex-grow">
                {/* MENGGUNAKAN VISUAL MINI ROADMAP BARU */}
                <div className="bg-white/60 pt-6 pb-2 rounded-[2rem] border border-white shadow-[0_8px_30px_rgb(0,0,0,0.02)]">
                  <h4 className="font-extrabold text-slate-800 text-lg mb-2 text-center">Roadmap Jaringan</h4>
                  <NetworkRoadmap roadmap={selectedCareer.roadmap} />
                </div>
              </div>

              <div className="mt-8 pt-4 pb-2 bg-transparent sticky bottom-0 z-20">
                <button
                  onClick={handleCreateJourney}
                  className="relative w-full py-4 text-sm font-bold text-white rounded-xl shadow-[0_10px_20px_rgba(153,34,72,0.25)] hover:shadow-[0_15px_30px_rgba(153,34,72,0.35)] hover:-translate-y-1 transition-all duration-300 overflow-hidden group"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-[#701a35] via-[#992248] to-[#701a35] bg-[length:200%_auto]"></div>
                  <div className="absolute inset-0 bg-white/20 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                  <span className="relative z-10 flex items-center justify-center gap-2">
                    Buat Learning Journey <Target size={16} className="opacity-70" />
                  </span>
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}