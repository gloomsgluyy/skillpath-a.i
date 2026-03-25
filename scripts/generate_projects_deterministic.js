const fs = require('fs');

const BASE_TEMPLATES = [
  {
    title: "Sistem Manajemen Inventaris Terdistribusi",
    description: "Membangun sistem yang melacak aliran barang di berbagai gudang secara real-time. Proyek ini bertujuan untuk mengurangi selisih pencatatan stok dan memberikan alert ketika inventaris kritis. Anda akan merancang database, membuat RESTful API, serta memvisualisasikan data di antarmuka web, menjadikannya solusi enterprise-ready.",
    difficulty: "Menengah",
    category: "Software Development",
    skills: ["Node.js", "React", "PostgreSQL", "Docker"],
    imageUrl: "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&q=80&w=800",
    targetCareer: "Fullstack Developer",
    checklist: [
      { title: "Desain Skema Database", detail: "Buat ERD untuk tabel users, products, warehouses, dan transactions. Terapkan relasi 1-to-many." },
      { title: "Inisialisasi Backend Service", detail: "Gunakan Express.js untuk membuat service endpoint `/api/inventory` dengan autentikasi JWT." },
      { title: "Integrasi Frontend Dashboard", detail: "Buat halaman UI dengan React. Gunakan Redux atau Context untuk state manajemen keranjang/stok." },
      { title: "Role-based Access Control", detail: "Implementasikan Middleware yang membedakan 'Admin Gudang' dan 'Staff Operasional'." },
      { title: "Containerization", detail: "Buat Dockerfile dan docker-compose.yml untuk membungkus Node.js dan PostgreSQL secara bersamaan." }
    ],
    resources: [
      { title: "REST API Design Best Practices", url: "https://restfulapi.net/" },
      { title: "Docker Networking", url: "https://docs.docker.com/network/" }
    ]
  },
  {
    title: "Predictive Analytics untuk Customer Churn",
    description: "Menggunakan machine learning untuk memprediksi pelanggan mana yang kemungkinan besar akan berhenti berlangganan (churn) bulan ini. Proyek ini sangat krusial bagi tim marketing untuk melakukan retensi. Meliputi Data Cleaning, Exploratory Data Analysis, Training Model, dan penyajian insight melalui dashboard Metabase/Streamlit.",
    difficulty: "Ahli",
    category: "Data & AI",
    skills: ["Python", "Scikit-Learn", "Pandas", "Streamlit"],
    imageUrl: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=800",
    targetCareer: "Data Scientist",
    checklist: [
      { title: "Pengumpulan & Pembersihan Data", detail: "Impor dataset CSV pelanggan. Atasi missing values dan ubah data kategorikal menjadi numerik." },
      { title: "Exploratory Data Analysis (EDA)", detail: "Gunakan Matplotlib atau Seaborn untuk menemukan korelasi antara variabel (seperti durasi langganan vs churn)." },
      { title: "Pemilihan dan Training Model", detail: "Latih model Logistic Regression dan Random Forest. Bandingkan metrik akurasi dan F1-Score." },
      { title: "Hyperparameter Tuning", detail: "Terapkan Grid Search CV pada model terbaik untuk meningkatan akurasi setidaknya 5%." },
      { title: "Deploy Streamlit Dashboard", detail: "Buat file `app.py` sederhana dengan Streamlit agar user non-teknis bisa memasukkan data profil pelanggan dan mendapatkan prediksi." }
    ],
    resources: [
      { title: "Machine Learning Crash Course", url: "https://developers.google.com/machine-learning/crash-course" },
      { title: "Streamlit Documentation", url: "https://docs.streamlit.io/" }
    ]
  },
  {
    title: "Redesign Aplikasi Mobile Perbankan",
    description: "Merancang ulang user interface dan user experience dari aplikasi m-banking jadul agar lebih modern, clean, dan intuitif. Berfokus pada kemudahan transfer dana, melihat mutasi, dan pembukaan rekening baru secara digital tanpa cabang fisik.",
    difficulty: "Menengah",
    category: "Kreatif & Desain",
    skills: ["Figma", "UI/UX", "User Research", "Wireframing"],
    imageUrl: "https://images.unsplash.com/photo-1563986768494-4dee2763ff3f?auto=format&fit=crop&q=80&w=800",
    targetCareer: "UI/UX Designer",
    checklist: [
      { title: "Audit UX & Heuristic Evaluation", detail: "Analisis kelemahan dari 3 screen utama (Home, Transfer, Mutasi) di desain eksisting." },
      { title: "User Persona & User Journey", detail: "Buat 2 persona: Mahasiswa dan Pekerja Kantoran. Buat alur mereka dari login hingga berhasil transfer." },
      { title: "Wireframing (Low Fidelity)", detail: "Buat sketsa wireframe hitam putih untuk struktur dan hierarki informasi penting di layar HP." },
      { title: "High Fidelity UI Design", detail: "Beri styling: Warna, tipografi modern, dan icon set menggunakan Auto-Layout di Figma." },
      { title: "Interactive Prototyping", detail: "Hubungkan frame desain sehingga bisa di-klik seperti aplikasi asli pada presentation mode Figma." }
    ],
    resources: [
      { title: "Laws of UX", url: "https://lawsofux.com/" },
      { title: "Figma Auto Layout Tutorial", url: "https://help.figma.com/hc/en-us/articles/360040451373" }
    ]
  },
  {
    title: "Penetrasi Sistem dan Audit Keamanan Web",
    description: "Melakukan simulasi serangan (Ethical Hacking) terhadap aplikasi web dummy rentan (seperti OWASP Juice Shop). Proyek ini bertujuan menemukan kerentanan seperti SQL Injection, XSS, dan miskonfigurasi keamanan sebelum dieksploitasi oleh hacker jahat.",
    difficulty: "Ahli",
    category: "Cyber Security",
    skills: ["Burp Suite", "Kali Linux", "OWASP", "Nmap"],
    imageUrl: "https://images.unsplash.com/photo-1526304640581-d334cdbbf45e?auto=format&fit=crop&q=80&w=800",
    targetCareer: "Penetration Tester",
    checklist: [
      { title: "Reconnaissance (Pengumpulan Info)", detail: "Gunakan Nmap dan Nikto untuk melakukan pemindaian awal pada server target untuk melihat port terbuka." },
      { title: "Mencegat Lalu Lintas Web", detail: "Gunakan Burp Suite Intercept untuk menangkap request login dan manipulasi nilai cookie/token." },
      { title: "Eksploitasi SQL Injection", detail: "Cari form input yang rentan, lalu injeksikan payload SQL (`' OR 1=1 --`) untuk menembus autentikasi." },
      { title: "Cross-Site Scripting (XSS)", detail: "Masukkan script JS berbahaya ke dalam kolom komentar atau review untuk mencuri cookie simulasi admin." },
      { title: "Pembuatan Laporan Audit", detail: "Tulis Executive Summary dan rekomendasi remediasi teknis (misalnya penggunaan Parametrized Queries)." }
    ],
    resources: [
      { title: "OWASP Top 10", url: "https://owasp.org/Top10/" },
      { title: "PortSwigger Web Security Academy", url: "https://portswigger.net/web-security" }
    ]
  },
  {
    title: "Setup CI/CD Pipeline & Infrastruktur Cloud",
    description: "Membangun pipa integrasi dan deployment berkelanjutan (CI/CD) menggunakan GitHub Actions untuk sebuah aplikasi React. Automasi ini akan memeriksa linters, menjalankan unit testing, dan secara otomatis mendeploy hasil build ke server AWS S3 / Vercel.",
    difficulty: "Ahli",
    category: "Cloud & DevOps",
    skills: ["GitHub Actions", "AWS", "Bash", "Docker"],
    imageUrl: "https://images.unsplash.com/photo-1618401471353-b98afee0b2eb?auto=format&fit=crop&q=80&w=800",
    targetCareer: "DevOps Engineer",
    checklist: [
      { title: "Konfigurasi Repositori", detail: "Buat repo GitHub dan inisialisasi framework dasar. Konfigurasikan secret environment variables." },
      { title: "Workflow Lint & Test", detail: "Tulis folder `.github/workflows/main.yml`. Masukkan job untuk `npm run lint` dan `npm test` saat PR dibuat." },
      { title: "Build Image Docker", detail: "Tambahkan langkah workflow otomatis untuk mem-build Docker image dan melakukan push ke DockerHub." },
      { title: "Automated Deployment", detail: "Gunakan plugin AWS CLI di GitHub actions untuk melakukan komando `aws s3 sync` ke bucket statis." },
      { title: "Notifikasi Slack/Email", detail: "Integrasikan webhook agar setiap kali pipeline gagal atau berhasil, tim developer langsung mendapat notif." }
    ],
    resources: [
      { title: "GitHub Actions Docs", url: "https://docs.github.com/en/actions" },
      { title: "CI/CD Best Practices", url: "https://www.redhat.com/en/topics/devops/what-is-ci-cd" }
    ]
  },
  {
    title: "Optimasi SEO & Digital Campaign Strategy",
    description: "Merancang strategi pemasaran digital konprehensif dari pencarian keywords bervolume tinggi, optimasi struktur On-Page website e-commerce, hingga menyusun blueprint iklan Google Ads untuk mendongkrak penjualan sebesar 30% pada kuartal depan.",
    difficulty: "Menengah",
    category: "Digital Marketing",
    skills: ["SEO", "Google Analytics", "SEM", "Copywriting"],
    imageUrl: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=800",
    targetCareer: "Digital Marketing Specialist",
    checklist: [
      { title: "Keyword Research", detail: "Gunakan Google Keyword Planner atau Ahrefs untuk meriset 50 target kata kunci dengan search volume > 1000." },
      { title: "On-Page SEO Audit", detail: "Analisis meta title, meta description, dan heading H1/H2 pada landing page. Buat saran perbaikan teks." },
      { title: "Pembuatan Content Plan", detail: "Buat kalender editorial untuk 4 artikel blog SEO-friendly selama 1 bulan berdasarkan keywords target." },
      { title: "Setup Campaign Google Ads", detail: "Buat kerangka struktur Campaign, Ad Group, dan tulis 3 variasi Copy Ads untuk A/B testing." },
      { title: "Konfigurasi Tracking Goal", detail: "Atur Google Analytics 4 (GA4) Conversion Events seperti 'Add to Cart' dan 'Purchase'." }
    ],
    resources: [
      { title: "Google Analytics Academy", url: "https://analytics.google.com/analytics/academy/" },
      { title: "Moz Beginners Guide to SEO", url: "https://moz.com/beginners-guide-to-seo" }
    ]
  },
  {
    title: "Membangun MVP Product Roadmap & PRD",
    description: "Sebagai Product Manager, kamu bertanggung jawab menulis Product Requirements Document (PRD) yang jelas untuk aplikasi Ride-Hailing lokal. Kamu akan menyusun MVP roadmap, mendefinisikan User Stories, dan menetapkan metrik keberhasilan (OKRs).",
    difficulty: "Pemula",
    category: "Product & Management",
    skills: ["Jira / Trello", "Product Strategy", "Agile", "User Stories"],
    imageUrl: "https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&q=80&w=800",
    targetCareer: "Product Manager",
    checklist: [
      { title: "Problem Statement", detail: "Tuliskan 1 paragraf 'Elevator Pitch' yang menjelaskan masalah pasar dan solusi dari produk." },
      { title: "Competitor Analysis", detail: "Temukan 2 kompetitor (misal: Gojek/Grab), analisis kelebihan & kekurangan mereka melalui matriks perbandingan." },
      { title: "Menulis Epics & User Stories", detail: "Format agile: 'As a [user], I want [action] so that [benefit]'. Tuliskan minimal 10 fondasi user stories." },
      { title: "Prioritas MVP Roadmap", detail: "Gunakan matriks MoSCoW (Must, Should, Could, Won't have) untuk mendefinisikan fitur Sprint Ke-1." },
      { title: "Tentukan Metrik (KPI/OKR)", detail: "Tentukan 3 metrik kuantitatif keberhasilan tahap awal produk (Contoh: Jumlah user terdaftar per minggu)." }
    ],
    resources: [
      { title: "How to Write a PRD", url: "https://www.atlassian.com/agile/product-management/requirements" },
      { title: "Agile Manifesto", url: "https://agilemanifesto.org/" }
    ]
  },
  {
    title: "Pengembangan Core Gameplay Mechanics",
    description: "Menciptakan sistem mekanisme dasar untuk game Platformer 2D menggunakan Unity atau Godot. Berfokus pada pergerakan karakter, fisika lompatan, deteksi benturan (collision), serta manajemen animasi frame-by-frame.",
    difficulty: "Pemula",
    category: "Game Development",
    skills: ["Unity / Godot", "C# / GDScript", "Physics Engine", "Level Design"],
    imageUrl: "https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&q=80&w=800",
    targetCareer: "Game Developer",
    checklist: [
      { title: "Setup Project 2D", detail: "Buat project baru, atur konfigurasi resolusi dasar, dan impor aset Sprite karakter serta tilemap." },
      { title: "Player Controller Script", detail: "Tulis script untuk menangani input WASD/Arrow, lalu aplikasikan gaya fisik pada komponen Rigidbody." },
      { title: "Mekanik Lompat & Gravitasi", detail: "Implementasikan isGrounded check (Raycast) dan cegah pemain melakukan lompatan di udara jika bukan double jump." },
      { title: "Sistem Animasi Karakter", detail: "Hubungkan Sprite Animator dengan parameter dari script (misal state 'Run', 'Jump', 'Idle')." },
      { title: "Desain Level Interaktif", detail: "Gunakan Tilemap/Grid system untuk membuat level 1 sederhana dengan beberapa obstacle lompatan." }
    ],
    resources: [
      { title: "Unity Learn - 2D Platformer", url: "https://learn.unity.com/" },
      { title: "Game Programming Patterns", url: "https://gameprogrammingpatterns.com/" }
    ]
  },
  {
    title: "Otomasi Perangkat IoT Rumah Cerdas (Smart Home)",
    description: "Merakit prototipe logika Internet of Things (IoT) yang menghubungkan sensor suhu dan lampu pintar via jaringan WiFi/MQTT. Mengatur sistem untuk mengumpulkan data iklim dan mengaktifkan perangkat elektronik berdasarkan ambang batas pemicu secara otonom.",
    difficulty: "Menengah",
    category: "Mobile & IoT",
    skills: ["IoT Protocol", "MQTT", "Python / C++", "Data Processing"],
    imageUrl: "https://images.unsplash.com/photo-1558346490-a72e53ae50b4?auto=format&fit=crop&q=80&w=800",
    targetCareer: "IoT Engineer",
    checklist: [
      { title: "Desain Arsitektur Sistem", detail: "Gambarkan diagram alir antara Sensor -> Edge Device (NodeMCU/Raspberry) -> Broker MQTT -> User App." },
      { title: "Simulasi Pembacaan Sensor", detail: "Tulis script loop yang mensimulasikan nilai suhu dan kelembaban dalam rentang masuk akal (dummy data)." },
      { title: "Koneksi ke Broker MQTT", detail: "Gunakan pustaka MQTT Client untuk melakukan publish pada topik 'home/livingroom/temperature'." },
      { title: "Fungsi Logika Aktuator", detail: "Buat subscribe command. Jika suhu > 30 derajat, kirim perintah JSON aktifkan kipas/AC." },
      { title: "Visualisasi Grafis", detail: "Buat halaman dashboard minimalis atau gunakan Node-RED untuk memantau traffic sinyal MQTT." }
    ],
    resources: [
      { title: "MQTT Protocol Basics", url: "https://mqtt.org/getting-started/" },
      { title: "Node-RED Guide", url: "https://nodered.org/docs/tutorials/" }
    ]
  },
  {
    title: "Analisis Sentimen Opini Publik di Sosial Media",
    description: "Proyek Natural Language Processing (NLP) mengekstrak sentimen positif, netral, atau negatif dari ribuan cuitan atau ulasan produk. Berguna untuk memahami branding dan evaluasi krisis PR suatu organisasi secara cepat melalui grafik linguistik.",
    difficulty: "Ahli",
    category: "Data & AI",
    skills: ["Python", "NLTK / SpaCy", "TensorFlow", "Web Scraping"],
    imageUrl: "https://images.unsplash.com/photo-1504868584819-df8e3b4b8f58?auto=format&fit=crop&q=80&w=800",
    targetCareer: "AI Engineer",
    checklist: [
      { title: "Akuisisi Data Sosial Media", detail: "Gunakan API (Twitter/X API atau teknik scraping) untuk menarik 1000 JSON post dengan hashtag tren tertentu." },
      { title: "Text Pre-Processing", detail: "Lakukan Tokenization, Stopwords Removal, Stemming/Lemmatization, dan ubah huruf ke lowercase semua." },
      { title: "Word Embedding / TF-IDF", detail: "Ubah data teks yang bersih tersebut menjadi vektor numerik matematika yang bisa dipahami mesin." },
      { title: "Model Sentimen Klasifikasi", detail: "Gunakan model pra-terlatih seperti BERT (HuggingFace) atau Neural Net sederhana untuk label sentimen." },
      { title: "Visualisasi Word Cloud", detail: "Identifikasi kata dan frasa kunci yang paling sering muncul dari label sentimen negatif dan buat grafiknya." }
    ],
    resources: [
      { title: "NLTK Documentation", url: "https://www.nltk.org/" },
      { title: "HuggingFace Transformers", url: "https://huggingface.co/course/chapter1/1" }
    ]
  }
];

const INDUSTRIES = [
  "E-Commerce & Retail",
  "FinTech & Perbankan",
  "EdTech & Pendidikan",
  "HealthTech & Rumah Sakit",
  "Logistik & Supply Chain",
  "AgriTech & Pertanian",
  "Travel & Pariwisata",
  "PropTech & Real Estate",
  "Media & Hiburan",
  "Food & Beverage"
];

function generate100Projects() {
  const projects = [];
  
  // Multiply 10 base templates x 10 industries = 100 highly detailed projects
  for (let t = 0; t < BASE_TEMPLATES.length; t++) {
    const template = BASE_TEMPLATES[t];
    
    for (let i = 0; i < INDUSTRIES.length; i++) {
        const industry = INDUSTRIES[i];
        
        // Slightly manipulate title, desc, goals to make it unique per industry
        const newTitle = template.title + " pada Industri " + industry;
        const newDesc = "[" + industry + " Focus] - " + template.description + " Konteks proyek ini terfokus pada skalabilitas dan keamanan spesifik untuk regulasi sektor " + industry + ". Anda wajib mempertimbangkan data privacy dan pola traffic yang volatil pada industri ini.";
        
        // Deep clone checklist
        const newChecklist = template.checklist.map((task) => ({
            title: task.title,
            detail: "[Fokus: " + industry + "] " + task.detail,
            code: ""
        }));

        const proj = {
            id: "proj-" + template.category.replace(/[^a-zA-Z]/g, '').toLowerCase() + "-" + t + "-" + i + "-" + Date.now(),
            title: newTitle,
            description: newDesc,
            difficulty: template.difficulty,
            category: template.category,
            skills: template.skills,
            imageUrl: template.imageUrl,
            targetCareer: template.targetCareer,
            checklist: newChecklist,
            resources: template.resources
        };

        projects.push(proj);
    }
  }

  const fileData = "export const GENERATED_PROJECTS = " + JSON.stringify(projects, null, 2) + ";";
  fs.writeFileSync('./lib/data/generated_projects.js', fileData);
  console.log("Successfully generated 100 enterprise-grade projects!");
}

generate100Projects();
