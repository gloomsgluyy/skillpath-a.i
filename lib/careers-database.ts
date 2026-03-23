// SkillPath AI — Comprehensive Career Database
// Each career has matching metadata for dynamic profile-based scoring

export interface Career {
  id: string;
  title: string;
  category: string;
  skills: string[];
  salary: string;
  demand: number;
  desc: string;
  relatedRoles: string[];
  relatedArchetypes: string[];
  relatedJurusan: string[];
}

export const CATEGORIES = [
  "Semua",
  "Kreatif & Desain",
  "Software Development",
  "Infrastruktur & Jaringan",
  "Data & AI",
  "Cyber Security",
  "Mobile & IoT",
  "Game Development",
  "Product & Management",
  "Digital Marketing",
  "Cloud & DevOps",
  "Blockchain & Fintech",
  "Healthcare IT",
  "Education Tech",
  "E-Commerce",
  "Media & Content",
];

export const CAREERS: Career[] = [
  // ===== KREATIF & DESAIN =====
  { id:"uiux-designer", title:"UI/UX Product Designer", category:"Kreatif & Desain", skills:["Figma","Design System","User Research"], salary:"Rp 10-20 Jt", demand:85, desc:"Menyulap ide rumit menjadi tampilan aplikasi yang cantik, intuitif, dan membuat pengguna betah.", relatedRoles:["UI/UX Designer","Frontend Developer","Product Manager"], relatedArchetypes:["kreatif","komunikator","inovator"], relatedJurusan:["dkv","desain komunikasi visual","desain","multimedia","seni rupa"] },
  { id:"frontend-engineer", title:"Frontend Web Engineer", category:"Kreatif & Desain", skills:["React","TailwindCSS","TypeScript"], salary:"Rp 10-18 Jt", demand:90, desc:"Mewujudkan desain UI/UX menjadi kode interaktif yang hidup di browser.", relatedRoles:["Frontend Developer","UI/UX Designer","Full-Stack Developer"], relatedArchetypes:["kreatif","logis","builder"], relatedJurusan:["dkv","desain komunikasi visual","teknik informatika","multimedia"] },
  { id:"graphic-designer", title:"Graphic Designer", category:"Kreatif & Desain", skills:["Adobe Illustrator","Photoshop","Branding"], salary:"Rp 6-15 Jt", demand:75, desc:"Membuat identitas visual brand, poster, dan aset grafis untuk media cetak dan digital.", relatedRoles:["UI/UX Designer","Content Creator","Video Editor"], relatedArchetypes:["kreatif","komunikator"], relatedJurusan:["dkv","desain komunikasi visual","desain","seni rupa","multimedia"] },
  { id:"motion-designer", title:"Motion Graphics Designer", category:"Kreatif & Desain", skills:["After Effects","Cinema 4D","Lottie"], salary:"Rp 8-18 Jt", demand:80, desc:"Membuat animasi visual yang menghidupkan brand dan produk digital.", relatedRoles:["UI/UX Designer","Video Editor","Content Creator"], relatedArchetypes:["kreatif","inovator"], relatedJurusan:["dkv","desain komunikasi visual","multimedia","animasi","film"] },
  { id:"ux-researcher", title:"UX Researcher", category:"Kreatif & Desain", skills:["User Interview","A/B Testing","Analytics"], salary:"Rp 10-22 Jt", demand:78, desc:"Meneliti perilaku pengguna untuk menciptakan pengalaman produk yang lebih baik.", relatedRoles:["UI/UX Designer","Product Manager","Data Analyst"], relatedArchetypes:["komunikator","data","inovator"], relatedJurusan:["dkv","psikologi","desain","ilmu komunikasi","multimedia"] },
  { id:"brand-designer", title:"Brand Identity Designer", category:"Kreatif & Desain", skills:["Logo Design","Typography","Color Theory"], salary:"Rp 8-16 Jt", demand:70, desc:"Membangun identitas visual merek dari logo hingga panduan brand lengkap.", relatedRoles:["UI/UX Designer","Content Creator"], relatedArchetypes:["kreatif","komunikator"], relatedJurusan:["dkv","desain komunikasi visual","desain","seni rupa"] },
  { id:"3d-artist", title:"3D Artist & Modeler", category:"Kreatif & Desain", skills:["Blender","Maya","ZBrush"], salary:"Rp 8-20 Jt", demand:72, desc:"Membuat model dan environment 3D untuk game, film, dan produk digital.", relatedRoles:["Game Developer","Video Editor","UI/UX Designer"], relatedArchetypes:["kreatif","builder","inovator"], relatedJurusan:["dkv","animasi","multimedia","desain","seni rupa"] },
  { id:"illustration-artist", title:"Digital Illustrator", category:"Kreatif & Desain", skills:["Procreate","Clip Studio","Character Design"], salary:"Rp 6-14 Jt", demand:65, desc:"Membuat ilustrasi digital untuk buku, game, iklan, dan konten media sosial.", relatedRoles:["UI/UX Designer","Content Creator","Game Developer"], relatedArchetypes:["kreatif","inovator"], relatedJurusan:["dkv","desain komunikasi visual","seni rupa","animasi","multimedia"] },
  { id:"interaction-designer", title:"Interaction Designer", category:"Kreatif & Desain", skills:["Prototyping","Micro-interactions","Framer"], salary:"Rp 12-22 Jt", demand:82, desc:"Merancang interaksi detail antara pengguna dan antarmuka produk digital.", relatedRoles:["UI/UX Designer","Frontend Developer"], relatedArchetypes:["kreatif","logis","inovator"], relatedJurusan:["dkv","desain komunikasi visual","teknik informatika","multimedia"] },
  { id:"design-system-lead", title:"Design System Lead", category:"Kreatif & Desain", skills:["Component Library","Tokens","Documentation"], salary:"Rp 15-30 Jt", demand:80, desc:"Membangun dan memelihara sistem desain yang konsisten untuk seluruh produk.", relatedRoles:["UI/UX Designer","Frontend Developer","Product Manager"], relatedArchetypes:["kreatif","logis","pemimpin"], relatedJurusan:["dkv","teknik informatika","desain","multimedia"] },

  // ===== SOFTWARE DEVELOPMENT =====
  { id:"fullstack-dev", title:"Full-Stack Developer", category:"Software Development", skills:["Next.js","Node.js","PostgreSQL"], salary:"Rp 12-22 Jt", demand:95, desc:"Membangun fitur aplikasi dari frontend hingga logika database di backend.", relatedRoles:["Full-Stack Developer","Frontend Developer","Backend Developer"], relatedArchetypes:["logis","builder","inovator"], relatedJurusan:["teknik informatika","ilmu komputer","sistem informasi"] },
  { id:"backend-dev", title:"Backend Developer", category:"Software Development", skills:["Go","REST API","Microservices"], salary:"Rp 12-25 Jt", demand:92, desc:"Membangun server, API, dan arsitektur di balik layar aplikasi.", relatedRoles:["Backend Developer","Full-Stack Developer","DevOps Engineer"], relatedArchetypes:["logis","builder","data"], relatedJurusan:["teknik informatika","ilmu komputer","sistem informasi","matematika"] },
  { id:"software-architect", title:"Software Architect", category:"Software Development", skills:["System Design","DDD","Event-Driven"], salary:"Rp 25-50 Jt", demand:85, desc:"Merancang arsitektur sistem berskala besar yang handal dan scalable.", relatedRoles:["Backend Developer","Full-Stack Developer","DevOps Engineer"], relatedArchetypes:["logis","pemimpin","builder"], relatedJurusan:["teknik informatika","ilmu komputer","sistem informasi"] },
  { id:"qa-engineer", title:"QA Engineer", category:"Software Development", skills:["Selenium","Cypress","Jest"], salary:"Rp 8-18 Jt", demand:80, desc:"Menjamin kualitas software dengan pengujian otomatis dan manual.", relatedRoles:["Full-Stack Developer","Backend Developer","DevOps Engineer"], relatedArchetypes:["logis","protector","data"], relatedJurusan:["teknik informatika","ilmu komputer","sistem informasi"] },
  { id:"embedded-dev", title:"Embedded Systems Developer", category:"Software Development", skills:["C/C++","RTOS","ARM"], salary:"Rp 12-25 Jt", demand:75, desc:"Memprogram chip dan mikrokontroler untuk perangkat keras IoT dan robotika.", relatedRoles:["Mobile Developer","Backend Developer"], relatedArchetypes:["logis","builder"], relatedJurusan:["teknik elektro","teknik informatika","ilmu komputer","mekatronika"] },
  { id:"api-developer", title:"API Developer", category:"Software Development", skills:["GraphQL","gRPC","OpenAPI"], salary:"Rp 12-22 Jt", demand:88, desc:"Membangun dan mendokumentasikan API yang menghubungkan berbagai sistem.", relatedRoles:["Backend Developer","Full-Stack Developer"], relatedArchetypes:["logis","builder"], relatedJurusan:["teknik informatika","ilmu komputer","sistem informasi"] },
  { id:"low-code-dev", title:"Low-Code Developer", category:"Software Development", skills:["Mendix","OutSystems","Power Apps"], salary:"Rp 8-16 Jt", demand:82, desc:"Membangun aplikasi bisnis cepat dengan platform low-code/no-code.", relatedRoles:["Full-Stack Developer","Product Manager"], relatedArchetypes:["builder","inovator","komunikator"], relatedJurusan:["teknik informatika","sistem informasi","manajemen informatika"] },
  { id:"compiler-engineer", title:"Compiler Engineer", category:"Software Development", skills:["LLVM","Rust","Parsing"], salary:"Rp 20-45 Jt", demand:60, desc:"Membangun dan mengoptimalkan compiler dan bahasa pemrograman.", relatedRoles:["Backend Developer"], relatedArchetypes:["logis","inovator"], relatedJurusan:["ilmu komputer","teknik informatika","matematika"] },
  { id:"desktop-dev", title:"Desktop App Developer", category:"Software Development", skills:["Electron","Qt","WPF"], salary:"Rp 10-20 Jt", demand:65, desc:"Membuat aplikasi desktop native dan cross-platform.", relatedRoles:["Full-Stack Developer","Frontend Developer"], relatedArchetypes:["logis","builder"], relatedJurusan:["teknik informatika","ilmu komputer","sistem informasi"] },

  // ===== INFRASTRUKTUR & JARINGAN =====
  { id:"cloud-architect", title:"Cloud Architecture Engineer", category:"Infrastruktur & Jaringan", skills:["AWS/GCP","Kubernetes","Terraform"], salary:"Rp 15-25 Jt", demand:90, desc:"Mendesain dan memelihara infrastruktur server berbasis cloud.", relatedRoles:["Cloud Engineer","DevOps Engineer","Backend Developer"], relatedArchetypes:["logis","builder","data"], relatedJurusan:["teknik informatika","sistem informasi","ilmu komputer"] },
  { id:"network-engineer", title:"Network System Engineer", category:"Infrastruktur & Jaringan", skills:["Cisco","Mikrotik","Routing"], salary:"Rp 10-20 Jt", demand:80, desc:"Membangun tulang punggung komunikasi data perusahaan.", relatedRoles:["Cloud Engineer","DevOps Engineer"], relatedArchetypes:["builder","logis","protector"], relatedJurusan:["teknik informatika","teknik elektro","sistem informasi"] },
  { id:"sysadmin", title:"System Administrator", category:"Infrastruktur & Jaringan", skills:["Linux","Windows Server","VMware"], salary:"Rp 8-18 Jt", demand:78, desc:"Mengelola dan memelihara server dan infrastruktur IT perusahaan.", relatedRoles:["Cloud Engineer","DevOps Engineer"], relatedArchetypes:["builder","protector","logis"], relatedJurusan:["teknik informatika","sistem informasi","ilmu komputer"] },
  { id:"site-reliability", title:"Site Reliability Engineer", category:"Infrastruktur & Jaringan", skills:["Prometheus","Grafana","Incident Management"], salary:"Rp 18-35 Jt", demand:88, desc:"Memastikan uptime dan keandalan layanan produksi skala besar.", relatedRoles:["DevOps Engineer","Cloud Engineer","Backend Developer"], relatedArchetypes:["logis","protector","builder"], relatedJurusan:["teknik informatika","ilmu komputer","sistem informasi"] },
  { id:"database-admin", title:"Database Administrator", category:"Infrastruktur & Jaringan", skills:["PostgreSQL","MongoDB","Redis"], salary:"Rp 10-22 Jt", demand:75, desc:"Mengelola, mengoptimalkan, dan mengamankan database perusahaan.", relatedRoles:["Backend Developer","Data Analyst","Cloud Engineer"], relatedArchetypes:["data","logis","protector"], relatedJurusan:["teknik informatika","ilmu komputer","sistem informasi"] },
  { id:"telecom-engineer", title:"Telecommunications Engineer", category:"Infrastruktur & Jaringan", skills:["5G","VoIP","Fiber Optics"], salary:"Rp 10-22 Jt", demand:70, desc:"Merancang dan memelihara sistem telekomunikasi dan jaringan seluler.", relatedRoles:["Cloud Engineer"], relatedArchetypes:["builder","logis"], relatedJurusan:["teknik elektro","teknik telekomunikasi","teknik informatika"] },

  // ===== DATA & AI =====
  { id:"data-scientist", title:"Data Scientist", category:"Data & AI", skills:["Python","Machine Learning","SQL"], salary:"Rp 15-30 Jt", demand:85, desc:"Menganalisis jutaan data untuk menemukan pola tersembunyi.", relatedRoles:["Data Scientist","Data Analyst","AI/ML Engineer"], relatedArchetypes:["data","logis","inovator"], relatedJurusan:["statistika","matematika","teknik informatika","ilmu komputer"] },
  { id:"ai-engineer", title:"AI/ML Engineer", category:"Data & AI", skills:["PyTorch","LLM","TensorFlow"], salary:"Rp 20-40 Jt", demand:100, desc:"Melatih model kecerdasan buatan untuk menyelesaikan masalah kompleks.", relatedRoles:["AI/ML Engineer","Data Scientist"], relatedArchetypes:["logis","inovator","data"], relatedJurusan:["teknik informatika","ilmu komputer","matematika"] },
  { id:"data-engineer", title:"Data Engineer", category:"Data & AI", skills:["Apache Spark","Hadoop","ETL"], salary:"Rp 12-25 Jt", demand:90, desc:"Membangun pipa aliran data raksasa agar selalu bersih dan siap pakai.", relatedRoles:["Data Analyst","Data Scientist","Backend Developer"], relatedArchetypes:["data","builder","logis"], relatedJurusan:["teknik informatika","ilmu komputer","sistem informasi"] },
  { id:"data-analyst", title:"Data Analyst", category:"Data & AI", skills:["Excel","Tableau","SQL"], salary:"Rp 8-18 Jt", demand:88, desc:"Mengolah dan memvisualisasikan data untuk mendukung keputusan bisnis.", relatedRoles:["Data Analyst","Data Scientist","Product Manager"], relatedArchetypes:["data","logis","komunikator"], relatedJurusan:["statistika","matematika","teknik informatika","manajemen","ekonomi"] },
  { id:"nlp-engineer", title:"NLP Engineer", category:"Data & AI", skills:["BERT","Hugging Face","spaCy"], salary:"Rp 18-35 Jt", demand:90, desc:"Membangun sistem yang bisa memahami dan menghasilkan bahasa manusia.", relatedRoles:["AI/ML Engineer","Data Scientist"], relatedArchetypes:["logis","inovator"], relatedJurusan:["teknik informatika","ilmu komputer","linguistik","matematika"] },
  { id:"computer-vision", title:"Computer Vision Engineer", category:"Data & AI", skills:["OpenCV","YOLO","Image Processing"], salary:"Rp 18-35 Jt", demand:85, desc:"Membangun sistem AI yang bisa \"melihat\" dan memahami gambar/video.", relatedRoles:["AI/ML Engineer","Data Scientist"], relatedArchetypes:["logis","inovator"], relatedJurusan:["teknik informatika","ilmu komputer","teknik elektro","matematika"] },
  { id:"bi-analyst", title:"Business Intelligence Analyst", category:"Data & AI", skills:["Power BI","Looker","Data Warehouse"], salary:"Rp 10-22 Jt", demand:82, desc:"Membangun dashboard dan laporan untuk membantu eksekutif mengambil keputusan.", relatedRoles:["Data Analyst","Product Manager","Data Scientist"], relatedArchetypes:["data","komunikator","logis"], relatedJurusan:["manajemen","ekonomi","statistika","teknik informatika","sistem informasi"] },
  { id:"mlops-engineer", title:"MLOps Engineer", category:"Data & AI", skills:["MLflow","Kubeflow","Docker"], salary:"Rp 18-35 Jt", demand:88, desc:"Mendeploy dan memelihara model ML di lingkungan produksi.", relatedRoles:["AI/ML Engineer","DevOps Engineer","Data Scientist"], relatedArchetypes:["logis","builder"], relatedJurusan:["teknik informatika","ilmu komputer","matematika"] },

  // ===== CYBER SECURITY =====
  { id:"cyber-security", title:"Cyber Security Analyst", category:"Cyber Security", skills:["Penetration Testing","Network Security","Linux"], salary:"Rp 18-30 Jt", demand:85, desc:"Melindungi jaringan dan sistem dari ancaman siber dan hacker.", relatedRoles:["Cyber Security","Cloud Engineer","DevOps Engineer"], relatedArchetypes:["protector","logis","builder"], relatedJurusan:["teknik informatika","sistem informasi","ilmu komputer"] },
  { id:"penetration-tester", title:"Penetration Tester", category:"Cyber Security", skills:["Kali Linux","Burp Suite","Metasploit"], salary:"Rp 15-30 Jt", demand:88, desc:"Menguji keamanan sistem dengan mensimulasikan serangan hacker.", relatedRoles:["Cyber Security"], relatedArchetypes:["protector","logis"], relatedJurusan:["teknik informatika","ilmu komputer","sistem informasi"] },
  { id:"security-architect", title:"Security Architect", category:"Cyber Security", skills:["Zero Trust","IAM","Encryption"], salary:"Rp 25-45 Jt", demand:82, desc:"Merancang arsitektur keamanan untuk melindungi infrastruktur enterprise.", relatedRoles:["Cyber Security","Cloud Engineer"], relatedArchetypes:["protector","logis","pemimpin"], relatedJurusan:["teknik informatika","ilmu komputer","sistem informasi"] },
  { id:"soc-analyst", title:"SOC Analyst", category:"Cyber Security", skills:["SIEM","Incident Response","Forensics"], salary:"Rp 12-25 Jt", demand:80, desc:"Memonitor dan merespons ancaman keamanan siber secara real-time.", relatedRoles:["Cyber Security"], relatedArchetypes:["protector","logis","data"], relatedJurusan:["teknik informatika","ilmu komputer","sistem informasi"] },
  { id:"devsecops", title:"DevSecOps Engineer", category:"Cyber Security", skills:["SAST/DAST","Container Security","CI/CD"], salary:"Rp 18-35 Jt", demand:90, desc:"Mengintegrasikan keamanan ke dalam pipeline pengembangan software.", relatedRoles:["Cyber Security","DevOps Engineer"], relatedArchetypes:["protector","builder","logis"], relatedJurusan:["teknik informatika","ilmu komputer","sistem informasi"] },

  // ===== MOBILE & IoT =====
  { id:"mobile-dev", title:"Mobile App Developer", category:"Mobile & IoT", skills:["Flutter","React Native","Swift"], salary:"Rp 10-25 Jt", demand:90, desc:"Menciptakan aplikasi canggih untuk smartphone Android dan iOS.", relatedRoles:["Mobile Developer","Frontend Developer","Full-Stack Developer"], relatedArchetypes:["logis","kreatif","builder"], relatedJurusan:["teknik informatika","ilmu komputer","sistem informasi"] },
  { id:"android-dev", title:"Android Developer", category:"Mobile & IoT", skills:["Kotlin","Jetpack Compose","Firebase"], salary:"Rp 10-22 Jt", demand:88, desc:"Membuat aplikasi Android native dengan performa optimal.", relatedRoles:["Mobile Developer","Full-Stack Developer"], relatedArchetypes:["logis","builder"], relatedJurusan:["teknik informatika","ilmu komputer","sistem informasi"] },
  { id:"ios-dev", title:"iOS Developer", category:"Mobile & IoT", skills:["Swift","SwiftUI","Xcode"], salary:"Rp 12-25 Jt", demand:82, desc:"Membangun aplikasi premium untuk ekosistem Apple.", relatedRoles:["Mobile Developer","Full-Stack Developer"], relatedArchetypes:["logis","builder","kreatif"], relatedJurusan:["teknik informatika","ilmu komputer"] },
  { id:"iot-engineer", title:"IoT Engineer", category:"Mobile & IoT", skills:["Arduino","MQTT","Raspberry Pi"], salary:"Rp 10-22 Jt", demand:78, desc:"Menghubungkan perangkat fisik ke internet untuk monitoring dan otomasi.", relatedRoles:["Mobile Developer","Cloud Engineer"], relatedArchetypes:["builder","logis","inovator"], relatedJurusan:["teknik elektro","teknik informatika","mekatronika"] },
  { id:"wearable-dev", title:"Wearable Tech Developer", category:"Mobile & IoT", skills:["WatchOS","Sensor API","BLE"], salary:"Rp 12-25 Jt", demand:68, desc:"Mengembangkan aplikasi untuk smartwatch dan perangkat wearable.", relatedRoles:["Mobile Developer","IoT Engineer"], relatedArchetypes:["builder","inovator"], relatedJurusan:["teknik informatika","teknik elektro","desain produk"] },

  // ===== GAME DEVELOPMENT =====
  { id:"game-developer", title:"Game Developer", category:"Game Development", skills:["Unity","C#","3D Math"], salary:"Rp 8-20 Jt", demand:75, desc:"Membuat mekanika permainan, AI musuh, dan sistem skor video game.", relatedRoles:["Game Developer","Frontend Developer","Mobile Developer"], relatedArchetypes:["kreatif","logis","inovator"], relatedJurusan:["teknik informatika","dkv","multimedia","ilmu komputer"] },
  { id:"game-designer", title:"Game Designer", category:"Game Development", skills:["Level Design","GDD","Balancing"], salary:"Rp 8-18 Jt", demand:70, desc:"Merancang alur cerita, level, dan mekanika game yang seru.", relatedRoles:["Game Developer","UI/UX Designer","Content Creator"], relatedArchetypes:["kreatif","inovator","komunikator"], relatedJurusan:["dkv","multimedia","teknik informatika","desain"] },
  { id:"unreal-dev", title:"Unreal Engine Developer", category:"Game Development", skills:["Unreal Engine","C++","Blueprints"], salary:"Rp 12-25 Jt", demand:78, desc:"Menggunakan Unreal Engine untuk membuat game AAA dan simulasi.", relatedRoles:["Game Developer"], relatedArchetypes:["logis","kreatif","builder"], relatedJurusan:["teknik informatika","ilmu komputer","multimedia"] },
  { id:"technical-artist", title:"Technical Artist", category:"Game Development", skills:["Shader","VFX","Houdini"], salary:"Rp 12-25 Jt", demand:72, desc:"Menjembatani seni dan pemrograman dalam pipeline game.", relatedRoles:["Game Developer","UI/UX Designer"], relatedArchetypes:["kreatif","logis","builder"], relatedJurusan:["dkv","teknik informatika","animasi","multimedia"] },

  // ===== PRODUCT & MANAGEMENT =====
  { id:"product-manager", title:"Product Manager", category:"Product & Management", skills:["Roadmapping","User Story","Analytics"], salary:"Rp 15-30 Jt", demand:90, desc:"Memimpin pengembangan produk digital dari ide hingga peluncuran.", relatedRoles:["Product Manager","UI/UX Designer","Data Analyst"], relatedArchetypes:["pemimpin","komunikator","inovator"], relatedJurusan:["teknik informatika","manajemen","sistem informasi","ilmu komunikasi"] },
  { id:"scrum-master", title:"Scrum Master", category:"Product & Management", skills:["Agile","Jira","Sprint Planning"], salary:"Rp 12-25 Jt", demand:78, desc:"Memfasilitasi tim pengembangan agar bekerja efisien dengan metode Agile.", relatedRoles:["Product Manager"], relatedArchetypes:["pemimpin","komunikator"], relatedJurusan:["teknik informatika","manajemen","sistem informasi"] },
  { id:"tech-lead", title:"Technical Lead", category:"Product & Management", skills:["Code Review","Architecture","Mentoring"], salary:"Rp 20-40 Jt", demand:85, desc:"Memimpin tim teknis dan membuat keputusan arsitektur kritis.", relatedRoles:["Full-Stack Developer","Backend Developer","Product Manager"], relatedArchetypes:["pemimpin","logis","builder"], relatedJurusan:["teknik informatika","ilmu komputer","sistem informasi"] },
  { id:"it-project-manager", title:"IT Project Manager", category:"Product & Management", skills:["PMP","Risk Management","Budgeting"], salary:"Rp 15-30 Jt", demand:80, desc:"Mengelola proyek IT dari perencanaan hingga delivery tepat waktu.", relatedRoles:["Product Manager"], relatedArchetypes:["pemimpin","komunikator","logis"], relatedJurusan:["teknik informatika","manajemen","sistem informasi"] },
  { id:"business-analyst", title:"Business Analyst (IT)", category:"Product & Management", skills:["Requirements","BPMN","Stakeholder Mgmt"], salary:"Rp 10-22 Jt", demand:82, desc:"Menjembatani kebutuhan bisnis dengan solusi teknologi.", relatedRoles:["Product Manager","Data Analyst"], relatedArchetypes:["komunikator","logis","data"], relatedJurusan:["sistem informasi","manajemen","teknik informatika","ekonomi"] },

  // ===== DIGITAL MARKETING =====
  { id:"digital-marketer", title:"Digital Marketing Specialist", category:"Digital Marketing", skills:["Google Ads","Meta Ads","Analytics"], salary:"Rp 6-15 Jt", demand:88, desc:"Memasarkan produk digital melalui iklan online dan strategi kampanye.", relatedRoles:["Digital Marketing","Content Creator","Product Manager"], relatedArchetypes:["komunikator","kreatif","inovator"], relatedJurusan:["ilmu komunikasi","manajemen","dkv","marketing","multimedia"] },
  { id:"seo-specialist", title:"SEO Specialist", category:"Digital Marketing", skills:["SEMrush","Ahrefs","Content Strategy"], salary:"Rp 6-15 Jt", demand:82, desc:"Mengoptimalkan website agar muncul di halaman pertama Google.", relatedRoles:["Digital Marketing","Content Creator","Frontend Developer"], relatedArchetypes:["data","komunikator","logis"], relatedJurusan:["ilmu komunikasi","teknik informatika","manajemen","marketing"] },
  { id:"social-media-manager", title:"Social Media Manager", category:"Digital Marketing", skills:["Hootsuite","Canva","Community Mgmt"], salary:"Rp 5-12 Jt", demand:85, desc:"Mengelola akun media sosial brand dan membangun komunitas online.", relatedRoles:["Digital Marketing","Content Creator"], relatedArchetypes:["komunikator","kreatif"], relatedJurusan:["ilmu komunikasi","manajemen","dkv","marketing","jurnalistik"] },
  { id:"content-creator", title:"Content Creator / Strategist", category:"Digital Marketing", skills:["Copywriting","Video Production","Storytelling"], salary:"Rp 5-15 Jt", demand:90, desc:"Membuat konten kreatif yang menarik audiens dan meningkatkan brand awareness.", relatedRoles:["Content Creator","Digital Marketing","Video Editor"], relatedArchetypes:["kreatif","komunikator","inovator"], relatedJurusan:["ilmu komunikasi","dkv","jurnalistik","multimedia","sastra"] },
  { id:"growth-hacker", title:"Growth Hacker", category:"Digital Marketing", skills:["A/B Testing","Funnel Optimization","Automation"], salary:"Rp 10-22 Jt", demand:82, desc:"Menggunakan eksperimen data-driven untuk pertumbuhan bisnis cepat.", relatedRoles:["Digital Marketing","Product Manager","Data Analyst"], relatedArchetypes:["inovator","data","komunikator"], relatedJurusan:["manajemen","teknik informatika","ekonomi","marketing"] },
  { id:"email-marketer", title:"Email Marketing Specialist", category:"Digital Marketing", skills:["Mailchimp","Segmentation","Automation"], salary:"Rp 5-12 Jt", demand:72, desc:"Merancang kampanye email yang personal dan meningkatkan konversi.", relatedRoles:["Digital Marketing","Content Creator"], relatedArchetypes:["komunikator","data"], relatedJurusan:["ilmu komunikasi","manajemen","marketing"] },
  { id:"video-editor", title:"Video Editor", category:"Digital Marketing", skills:["Premiere Pro","DaVinci","Color Grading"], salary:"Rp 5-15 Jt", demand:85, desc:"Mengedit dan memproduksi konten video berkualitas tinggi untuk berbagai platform.", relatedRoles:["Video Editor","Content Creator","Digital Marketing"], relatedArchetypes:["kreatif","komunikator"], relatedJurusan:["dkv","multimedia","film","ilmu komunikasi","broadcasting"] },

  // ===== CLOUD & DEVOPS =====
  { id:"devops-engineer", title:"DevOps Engineer", category:"Cloud & DevOps", skills:["Docker","CI/CD","Linux"], salary:"Rp 15-35 Jt", demand:98, desc:"Menjembatani tim programmer dan tim server agar rilis fitur berjalan otomatis.", relatedRoles:["DevOps Engineer","Cloud Engineer","Backend Developer"], relatedArchetypes:["builder","logis","protector"], relatedJurusan:["teknik informatika","ilmu komputer","sistem informasi"] },
  { id:"platform-engineer", title:"Platform Engineer", category:"Cloud & DevOps", skills:["Internal Dev Platform","Backstage","GitOps"], salary:"Rp 18-35 Jt", demand:90, desc:"Membangun platform internal agar developer bisa deploy lebih mudah.", relatedRoles:["DevOps Engineer","Cloud Engineer","Backend Developer"], relatedArchetypes:["builder","logis"], relatedJurusan:["teknik informatika","ilmu komputer","sistem informasi"] },
  { id:"cloud-solutions", title:"Cloud Solutions Architect", category:"Cloud & DevOps", skills:["AWS Solutions","Azure","Cost Optimization"], salary:"Rp 20-45 Jt", demand:92, desc:"Merancang solusi cloud end-to-end untuk kebutuhan enterprise.", relatedRoles:["Cloud Engineer","DevOps Engineer"], relatedArchetypes:["logis","builder","pemimpin"], relatedJurusan:["teknik informatika","ilmu komputer","sistem informasi"] },

  // ===== BLOCKCHAIN & FINTECH =====
  { id:"blockchain-dev", title:"Blockchain Developer", category:"Blockchain & Fintech", skills:["Solidity","Web3.js","Smart Contracts"], salary:"Rp 15-40 Jt", demand:75, desc:"Membangun aplikasi terdesentralisasi (dApps) dan smart contract.", relatedRoles:["Backend Developer","Full-Stack Developer"], relatedArchetypes:["inovator","logis","builder"], relatedJurusan:["teknik informatika","ilmu komputer","matematika"] },
  { id:"fintech-dev", title:"Fintech Developer", category:"Blockchain & Fintech", skills:["Payment Gateway","Banking API","Compliance"], salary:"Rp 15-30 Jt", demand:88, desc:"Membangun sistem pembayaran digital dan layanan keuangan.", relatedRoles:["Backend Developer","Full-Stack Developer"], relatedArchetypes:["logis","builder","protector"], relatedJurusan:["teknik informatika","ilmu komputer","ekonomi","akuntansi"] },
  { id:"defi-specialist", title:"DeFi Specialist", category:"Blockchain & Fintech", skills:["DeFi Protocols","Yield Farming","Tokenomics"], salary:"Rp 18-40 Jt", demand:65, desc:"Membangun dan mengaudit protokol keuangan terdesentralisasi.", relatedRoles:["Backend Developer"], relatedArchetypes:["inovator","logis","data"], relatedJurusan:["teknik informatika","ilmu komputer","ekonomi","matematika"] },

  // ===== HEALTHCARE IT =====
  { id:"health-informatics", title:"Health Informatics Specialist", category:"Healthcare IT", skills:["HL7","FHIR","EHR Systems"], salary:"Rp 12-25 Jt", demand:78, desc:"Mengelola sistem informasi kesehatan dan data medis elektronik.", relatedRoles:["Data Analyst","Backend Developer"], relatedArchetypes:["data","logis","protector"], relatedJurusan:["teknik informatika","sistem informasi","kedokteran","keperawatan"] },
  { id:"biomedical-engineer", title:"Biomedical Software Engineer", category:"Healthcare IT", skills:["Medical Devices","FDA Compliance","Signal Processing"], salary:"Rp 15-30 Jt", demand:72, desc:"Mengembangkan software untuk peralatan medis dan diagnostik.", relatedRoles:["Backend Developer","Data Scientist"], relatedArchetypes:["logis","builder","protector"], relatedJurusan:["teknik biomedis","teknik informatika","teknik elektro"] },
  { id:"telemedicine-dev", title:"Telemedicine Developer", category:"Healthcare IT", skills:["WebRTC","Video Streaming","HIPAA"], salary:"Rp 12-25 Jt", demand:80, desc:"Membangun platform konsultasi kesehatan jarak jauh.", relatedRoles:["Full-Stack Developer","Mobile Developer"], relatedArchetypes:["builder","logis"], relatedJurusan:["teknik informatika","ilmu komputer","sistem informasi"] },

  // ===== EDUCATION TECH =====
  { id:"edtech-dev", title:"EdTech Developer", category:"Education Tech", skills:["LMS","Gamification","Canvas API"], salary:"Rp 10-20 Jt", demand:78, desc:"Membangun platform pembelajaran online yang interaktif dan engaging.", relatedRoles:["Full-Stack Developer","Frontend Developer"], relatedArchetypes:["inovator","builder","komunikator"], relatedJurusan:["teknik informatika","pendidikan","sistem informasi","multimedia"] },
  { id:"instructional-designer", title:"Instructional Designer", category:"Education Tech", skills:["Articulate","Learning Design","Assessment"], salary:"Rp 8-16 Jt", demand:72, desc:"Merancang kurikulum dan materi pembelajaran digital yang efektif.", relatedRoles:["UI/UX Designer","Content Creator","Product Manager"], relatedArchetypes:["komunikator","kreatif","inovator"], relatedJurusan:["pendidikan","psikologi","ilmu komunikasi","dkv","multimedia"] },

  // ===== E-COMMERCE =====
  { id:"ecommerce-dev", title:"E-Commerce Developer", category:"E-Commerce", skills:["Shopify","Magento","WooCommerce"], salary:"Rp 8-18 Jt", demand:85, desc:"Membangun dan mengelola toko online dan marketplace.", relatedRoles:["Full-Stack Developer","Frontend Developer"], relatedArchetypes:["builder","logis","komunikator"], relatedJurusan:["teknik informatika","sistem informasi","manajemen"] },
  { id:"marketplace-pm", title:"Marketplace Product Manager", category:"E-Commerce", skills:["Conversion Rate","User Journey","A/B Testing"], salary:"Rp 15-30 Jt", demand:82, desc:"Mengelola dan mengoptimalkan pengalaman jual-beli di marketplace.", relatedRoles:["Product Manager","Data Analyst","Digital Marketing"], relatedArchetypes:["pemimpin","data","komunikator"], relatedJurusan:["manajemen","teknik informatika","ekonomi","marketing"] },

  // ===== MEDIA & CONTENT =====
  { id:"podcast-producer", title:"Podcast Producer", category:"Media & Content", skills:["Audio Editing","Storytelling","Distribution"], salary:"Rp 5-12 Jt", demand:68, desc:"Memproduksi konten podcast dari konsep hingga distribusi.", relatedRoles:["Content Creator","Video Editor","Digital Marketing"], relatedArchetypes:["kreatif","komunikator"], relatedJurusan:["ilmu komunikasi","broadcasting","multimedia","jurnalistik"] },
  { id:"vr-ar-dev", title:"VR/AR Developer", category:"Media & Content", skills:["ARKit","Unity XR","Spatial Computing"], salary:"Rp 15-30 Jt", demand:75, desc:"Membangun pengalaman virtual & augmented reality yang imersif.", relatedRoles:["Game Developer","Mobile Developer","Frontend Developer"], relatedArchetypes:["inovator","kreatif","builder"], relatedJurusan:["teknik informatika","dkv","multimedia","ilmu komputer"] },
  { id:"tech-writer", title:"Technical Writer", category:"Media & Content", skills:["Documentation","Markdown","API Docs"], salary:"Rp 6-14 Jt", demand:72, desc:"Menulis dokumentasi teknis yang jelas untuk developer dan pengguna.", relatedRoles:["Content Creator","Product Manager"], relatedArchetypes:["komunikator","logis"], relatedJurusan:["teknik informatika","sastra","ilmu komunikasi","jurnalistik"] },
];

// Helper: get all unique categories from the data
export function getCategories(): string[] {
  return CATEGORIES;
}

// Helper: search careers
export function searchCareers(query: string, category?: string): Career[] {
  let results = CAREERS;
  
  if (category && category !== "Semua") {
    results = results.filter(c => c.category === category);
  }
  
  if (query.trim()) {
    const q = query.toLowerCase();
    results = results.filter(c =>
      c.title.toLowerCase().includes(q) ||
      c.skills.some(s => s.toLowerCase().includes(q)) ||
      c.category.toLowerCase().includes(q) ||
      c.desc.toLowerCase().includes(q)
    );
  }
  
  return results;
}

// Helper for fuzzy match
function normalizeStr(s: string) {
  return s.toLowerCase().replace(/[^a-z0-9]/g, '');
}

// Dynamic matching algorithm
export function computeMatchScore(
  career: Career,
  userProfile: { roleInterests?: string[]; archetype?: string; jurusan?: string; pendidikan?: string } | null
): number {
  if (!userProfile) return 0;

  let score = 0;

  const userRoles = (userProfile.roleInterests || []);
  if (userRoles.length > 0) {
    let roleMatched = false;
    for (const ur of userRoles) {
      const normUser = normalizeStr(ur);
      const normTitle = normalizeStr(career.title);
      const normCat = normalizeStr(career.category);
      
      // Direct substring match
      if (normUser.includes(normTitle) || normTitle.includes(normUser) || 
          normUser.includes(normCat) || normCat.includes(normUser)) {
        roleMatched = true;
        break;
      }
      
      // Check related roles
      for (const r of career.relatedRoles) {
        const normR = normalizeStr(r);
        if (normUser.includes(normR) || normR.includes(normUser)) {
           roleMatched = true;
           break;
        }
      }
      if (roleMatched) break;
    }
    
    // Token matching for partials like "A.I" vs "AI/ML"
    if (!roleMatched) {
      for (const ur of userRoles) {
        const tokens = ur.toLowerCase().replace(/[^a-z0-9\s]/g, ' ').split(/\s+/).filter(w => w.length > 1 && !['dan', 'and', 'or'].includes(w));
        const careerTokens = [career.title, career.category, ...career.relatedRoles]
          .join(' ')
          .toLowerCase()
          .replace(/[^a-z0-9\s]/g, ' ')
          .split(/\s+/);
          
        if (tokens.some(t => careerTokens.includes(t))) {
          roleMatched = true;
          break;
        }
      }
    }

    if (roleMatched) {
      score += 50; 
    }
  }

  if (userProfile.archetype) {
    const idx = career.relatedArchetypes.indexOf(userProfile.archetype.toLowerCase());
    if (idx !== -1) score += idx === 0 ? 25 : idx === 1 ? 18 : 12;
  }

  const userJurusan = (userProfile.jurusan || userProfile.pendidikan || '');
  if (userJurusan) {
    const normJurusan = normalizeStr(userJurusan);
    if (career.relatedJurusan.some(j => normJurusan.includes(normalizeStr(j)) || normalizeStr(j).includes(normJurusan))) {
      score += 25;
    }
  }

  // Boost matched role to minimum 75 if it hits the core interest
  if (score >= 50 && score < 75) {
    score = 75 + (career.title.length % 15);
  }

  // Base random fuzziness for non-matched
  if (score === 0) {
     score = 15 + ((career.title.length + career.category.length) % 20); 
  }

  return Math.min(99, Math.max(15, Math.round(score)));
}
