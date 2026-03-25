import { GENERATED_PROJECTS } from "./generated_projects";

export interface LabProject {
  id: string;
  title: string;
  description: string;
  difficulty: "Pemula" | "Menengah" | "Ahli";
  category: string;
  skills: string[];
  imageUrl: string;
  targetCareer: string;
  checklist: Array<{ title: string; detail: string; code?: string }>;
  resources?: Array<{ title: string; url: string }>;
}

export const LAB_PROJECTS: LabProject[] = [
  {
    "id": "proj-ui-design",
    "title": "Desain Aplikasi Mobile untuk Pencarian Kerja",
    "description": "Membuat aplikasi mobile yang memudahkan pengguna mencari pekerjaan dengan antarmuka yang intuitif dan mudah digunakan. Aplikasi ini harus memiliki fitur pencarian kerja, profil perusahaan, dan fitur notifikasi lowongan kerja.",
    "difficulty": "Menengah",
    "category": "Design",
    "skills": [
      "Figma",
      "Adobe XD",
      "User Research"
    ],
    "imageUrl": "https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?auto=format&fit=crop&q=80&w=800",
    "targetCareer": "UI/UX Product Designer",
    "checklist": [
      {
        "title": "Riset Pengguna",
        "detail": "Melakukan riset pengguna untuk memahami kebutuhan dan preferensi pengguna dalam mencari pekerjaan",
        "code": ""
      },
      {
        "title": "Membuat Wireframe",
        "detail": "Membuat wireframe aplikasi mobile untuk memvisualisasikan struktur dan layout",
        "code": ""
      },
      {
        "title": "Desain Antarmuka",
        "detail": "Membuat desain antarmuka yang intuitif dan mudah digunakan dengan menggunakan Figma atau Adobe XD",
        "code": ""
      },
      {
        "title": "Menguji Desain",
        "detail": "Menguji desain aplikasi mobile dengan pengguna untuk memastikan bahwa desain memenuhi kebutuhan pengguna",
        "code": ""
      }
    ],
    "resources": [
      {
        "title": "Figma Tutorial",
        "url": "https://www.figma.com/tutorial"
      }
    ]
  },
  {
    "id": "proj-ui-landing",
    "title": "Desain Landing Page untuk Produk Baru",
    "description": "Membuat landing page yang efektif untuk mempromosikan produk baru dengan desain yang menarik dan mudah digunakan. Landing page harus memiliki fitur-fitur seperti deskripsi produk, testimonial, dan tombol aksi.",
    "difficulty": "Pemula",
    "category": "Design",
    "skills": [
      "HTML",
      "CSS",
      "Figma"
    ],
    "imageUrl": "https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?auto=format&fit=crop&q=80&w=800",
    "targetCareer": "UI/UX Product Designer",
    "checklist": [
      {
        "title": "Membuat Konsep Desain",
        "detail": "Membuat konsep desain landing page yang sesuai dengan tujuan produk",
        "code": ""
      },
      {
        "title": "Membuat Desain",
        "detail": "Membuat desain landing page yang menarik dan mudah digunakan dengan menggunakan Figma",
        "code": ""
      },
      {
        "title": "Membuat Prototipe",
        "detail": "Membuat prototipe landing page untuk memvisualisasikan desain",
        "code": ""
      },
      {
        "title": "Menguji Desain",
        "detail": "Menguji desain landing page dengan pengguna untuk memastikan bahwa desain memenuhi kebutuhan pengguna",
        "code": ""
      }
    ],
    "resources": [
      {
        "title": "Figma Tutorial",
        "url": "https://www.figma.com/tutorial"
      }
    ]
  },
  {
    "id": "proj-frontend-blog",
    "title": "Membangun Blog dengan React",
    "description": "Membangun blog dengan menggunakan React yang memiliki fitur-fitur seperti posting, komentar, dan pencarian. Blog harus memiliki antarmuka yang responsif dan mudah digunakan.",
    "difficulty": "Menengah",
    "category": "Frontend",
    "skills": [
      "React",
      "JavaScript",
      "CSS"
    ],
    "imageUrl": "https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&q=80&w=800",
    "targetCareer": "Frontend Web Engineer",
    "checklist": [
      {
        "title": "Membuat Struktur Proyek",
        "detail": "Membuat struktur proyek dengan menggunakan create-react-app",
        "code": "npx create-react-app my-blog"
      },
      {
        "title": "Membuat Komponen",
        "detail": "Membuat komponen-komponen seperti posting, komentar, dan pencarian",
        "code": "// kode komponen"
      },
      {
        "title": "Membuat Routing",
        "detail": "Membuat routing untuk memungkinkan navigasi antar halaman",
        "code": "// kode routing"
      },
      {
        "title": "Menguji Aplikasi",
        "detail": "Menguji aplikasi untuk memastikan bahwa aplikasi berjalan dengan baik",
        "code": "npm start"
      }
    ],
    "resources": [
      {
        "title": "React Tutorial",
        "url": "https://reactjs.org/tutorial/tutorial.html"
      }
    ]
  },
  {
    "id": "proj-frontend-ecommerce",
    "title": "Membangun Toko Online dengan Angular",
    "description": "Membangun toko online dengan menggunakan Angular yang memiliki fitur-fitur seperti produk, keranjang, dan checkout. Toko online harus memiliki antarmuka yang responsif dan mudah digunakan.",
    "difficulty": "Ahli",
    "category": "Frontend",
    "skills": [
      "Angular",
      "JavaScript",
      "CSS"
    ],
    "imageUrl": "https://images.unsplash.com/photo-1555099962-4199c345e5dd?auto=format&fit=crop&q=80&w=800",
    "targetCareer": "Frontend Web Engineer",
    "checklist": [
      {
        "title": "Membuat Struktur Proyek",
        "detail": "Membuat struktur proyek dengan menggunakan Angular CLI",
        "code": "ng new my-ecommerce"
      },
      {
        "title": "Membuat Komponen",
        "detail": "Membuat komponen-komponen seperti produk, keranjang, dan checkout",
        "code": "// kode komponen"
      },
      {
        "title": "Membuat Routing",
        "detail": "Membuat routing untuk memungkinkan navigasi antar halaman",
        "code": "// kode routing"
      },
      {
        "title": "Menguji Aplikasi",
        "detail": "Menguji aplikasi untuk memastikan bahwa aplikasi berjalan dengan baik",
        "code": "ng serve"
      }
    ],
    "resources": [
      {
        "title": "Angular Tutorial",
        "url": "https://angular.io/tutorial"
      }
    ]
  },
  {
    "id": "proj-graphic-design",
    "title": "Membuat Desain Poster untuk Acara Musik",
    "description": "Membuat desain poster yang menarik dan efektif untuk mempromosikan acara musik. Poster harus memiliki informasi tentang acara, seperti tanggal, waktu, dan lokasi.",
    "difficulty": "Pemula",
    "category": "Design",
    "skills": [
      "Adobe Photoshop",
      "Adobe Illustrator",
      "Desain Grafis"
    ],
    "imageUrl": "https://images.unsplash.com/photo-1581291518857-4e27b48ff24e?auto=format&fit=crop&q=80&w=800",
    "targetCareer": "Graphic Designer",
    "checklist": [
      {
        "title": "Membuat Konsep Desain",
        "detail": "Membuat konsep desain poster yang sesuai dengan tema acara musik",
        "code": ""
      },
      {
        "title": "Membuat Desain",
        "detail": "Membuat desain poster yang menarik dan efektif dengan menggunakan Adobe Photoshop atau Adobe Illustrator",
        "code": ""
      },
      {
        "title": "Membuat Komposisi",
        "detail": "Membuat komposisi poster yang seimbang dan estetis",
        "code": ""
      },
      {
        "title": "Menguji Desain",
        "detail": "Menguji desain poster untuk memastikan bahwa desain memenuhi kebutuhan acara musik",
        "code": ""
      }
    ],
    "resources": [
      {
        "title": "Adobe Photoshop Tutorial",
        "url": "https://www.adobe.com/id_id/support/photoshop.html"
      }
    ]
  },
  {
    "id": "proj-graphic-design-2",
    "title": "Membuat Desain Brosur untuk Perusahaan",
    "description": "Membuat desain brosur yang profesional dan efektif untuk mempromosikan perusahaan. Brosur harus memiliki informasi tentang perusahaan, seperti visi, misi, dan produk atau jasa.",
    "difficulty": "Menengah",
    "category": "Design",
    "skills": [
      "Adobe InDesign",
      "Adobe Illustrator",
      "Desain Grafis"
    ],
    "imageUrl": "https://images.unsplash.com/photo-1587440871875-191322ee64b0?auto=format&fit=crop&q=80&w=800",
    "targetCareer": "Graphic Designer",
    "checklist": [
      {
        "title": "Membuat Konsep Desain",
        "detail": "Membuat konsep desain brosur yang sesuai dengan tema perusahaan",
        "code": ""
      },
      {
        "title": "Membuat Desain",
        "detail": "Membuat desain brosur yang profesional dan efektif dengan menggunakan Adobe InDesign atau Adobe Illustrator",
        "code": ""
      },
      {
        "title": "Membuat Komposisi",
        "detail": "Membuat komposisi brosur yang seimbang dan estetis",
        "code": ""
      },
      {
        "title": "Menguji Desain",
        "detail": "Menguji desain brosur untuk memastikan bahwa desain memenuhi kebutuhan perusahaan",
        "code": ""
      }
    ],
    "resources": [
      {
        "title": "Adobe InDesign Tutorial",
        "url": "https://www.adobe.com/id_id/support/indesign.html"
      }
    ]
  },
  {
    "id": "proj-motion-graphics",
    "title": "Membuat Animasi Logo untuk Perusahaan",
    "description": "Membuat animasi logo yang menarik dan profesional untuk mempromosikan perusahaan. Animasi logo harus memiliki efek yang kreatif dan sesuai dengan tema perusahaan.",
    "difficulty": "Menengah",
    "category": "Design",
    "skills": [
      "Adobe After Effects",
      "Adobe Premiere Pro",
      "Animasi"
    ],
    "imageUrl": "https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?auto=format&fit=crop&q=80&w=800",
    "targetCareer": "Motion Graphics Designer",
    "checklist": [
      {
        "title": "Membuat Konsep Desain",
        "detail": "Membuat konsep desain animasi logo yang sesuai dengan tema perusahaan",
        "code": ""
      },
      {
        "title": "Membuat Desain",
        "detail": "Membuat desain animasi logo yang menarik dan profesional dengan menggunakan Adobe After Effects atau Adobe Premiere Pro",
        "code": ""
      },
      {
        "title": "Membuat Komposisi",
        "detail": "Membuat komposisi animasi logo yang seimbang dan estetis",
        "code": ""
      },
      {
        "title": "Menguji Desain",
        "detail": "Menguji desain animasi logo untuk memastikan bahwa desain memenuhi kebutuhan perusahaan",
        "code": ""
      }
    ],
    "resources": [
      {
        "title": "Adobe After Effects Tutorial",
        "url": "https://www.adobe.com/id_id/support/aftereffects.html"
      }
    ]
  },
  {
    "id": "proj-motion-graphics-2",
    "title": "Membuat Animasi Explainer untuk Produk",
    "description": "Membuat animasi explainer yang menarik dan efektif untuk mempromosikan produk. Animasi explainer harus memiliki informasi tentang produk, seperti fitur dan manfaat.",
    "difficulty": "Ahli",
    "category": "Design",
    "skills": [
      "Adobe After Effects",
      "Adobe Premiere Pro",
      "Animasi"
    ],
    "imageUrl": "https://images.unsplash.com/photo-1581291518857-4e27b48ff24e?auto=format&fit=crop&q=80&w=800",
    "targetCareer": "Motion Graphics Designer",
    "checklist": [
      {
        "title": "Membuat Konsep Desain",
        "detail": "Membuat konsep desain animasi explainer yang sesuai dengan tema produk",
        "code": ""
      },
      {
        "title": "Membuat Desain",
        "detail": "Membuat desain animasi explainer yang menarik dan efektif dengan menggunakan Adobe After Effects atau Adobe Premiere Pro",
        "code": ""
      },
      {
        "title": "Membuat Komposisi",
        "detail": "Membuat komposisi animasi explainer yang seimbang dan estetis",
        "code": ""
      },
      {
        "title": "Menguji Desain",
        "detail": "Menguji desain animasi explainer untuk memastikan bahwa desain memenuhi kebutuhan produk",
        "code": ""
      }
    ],
    "resources": [
      {
        "title": "Adobe After Effects Tutorial",
        "url": "https://www.adobe.com/id_id/support/aftereffects.html"
      }
    ]
  },
  {
    "id": "proj-ux-research",
    "title": "Mengadakan Riset Pengguna untuk Aplikasi Mobile",
    "description": "Mengadakan riset pengguna untuk memahami kebutuhan dan perilaku pengguna dalam menggunakan aplikasi mobile. Riset pengguna harus memiliki metode yang sistematis dan efektif.",
    "difficulty": "Menengah",
    "category": "UX Research",
    "skills": [
      "Riset Pengguna",
      "Analisis Data",
      "Desain UX"
    ],
    "imageUrl": "https://images.unsplash.com/photo-1684369175833-8b77a161c28b?auto=format&fit=crop&q=80&w=800",
    "targetCareer": "UX Researcher",
    "checklist": [
      {
        "title": "Membuat Rencana Riset",
        "detail": "Membuat rencana riset yang sistematis dan efektif untuk memahami kebutuhan pengguna",
        "code": ""
      },
      {
        "title": "Mengumpulkan Data",
        "detail": "Mengumpulkan data pengguna dengan menggunakan metode seperti wawancara, survei, dan pengamatan",
        "code": ""
      },
      {
        "title": "Menganalisis Data",
        "detail": "Menganalisis data pengguna untuk memahami kebutuhan dan perilaku pengguna",
        "code": ""
      },
      {
        "title": "Membuat Rekomendasi",
        "detail": "Membuat rekomendasi desain berdasarkan hasil riset pengguna",
        "code": ""
      }
    ],
    "resources": [
      {
        "title": "Riset Pengguna Tutorial",
        "url": "https://www.usability.gov/what-and-why/user-research.html"
      }
    ]
  },
  {
    "id": "proj-ux-research-2",
    "title": "Mengadakan Riset Pengguna untuk Situs Web",
    "description": "Mengadakan riset pengguna untuk memahami kebutuhan dan perilaku pengguna dalam menggunakan situs web. Riset pengguna harus memiliki metode yang sistematis dan efektif.",
    "difficulty": "Ahli",
    "category": "UX Research",
    "skills": [
      "Riset Pengguna",
      "Analisis Data",
      "Desain UX"
    ],
    "imageUrl": "https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&q=80&w=800",
    "targetCareer": "UX Researcher",
    "checklist": [
      {
        "title": "Membuat Rencana Riset",
        "detail": "Membuat rencana riset yang sistematis dan efektif untuk memahami kebutuhan pengguna",
        "code": ""
      },
      {
        "title": "Mengumpulkan Data",
        "detail": "Mengumpulkan data pengguna dengan menggunakan metode seperti wawancara, survei, dan pengamatan",
        "code": ""
      },
      {
        "title": "Menganalisis Data",
        "detail": "Menganalisis data pengguna untuk memahami kebutuhan dan perilaku pengguna",
        "code": ""
      },
      {
        "title": "Membuat Rekomendasi",
        "detail": "Membuat rekomendasi desain berdasarkan hasil riset pengguna",
        "code": ""
      }
    ],
    "resources": [
      {
        "title": "Riset Pengguna Tutorial",
        "url": "https://www.usability.gov/what-and-why/user-research.html"
      }
    ]
  },
  {
    "id": "proj-brand-identity",
    "title": "Membangun Identitas Merek untuk Perusahaan Rintisan",
    "description": "Proyek ini bertujuan untuk menciptakan identitas merek yang kuat dan konsisten untuk perusahaan rintisan. Dengan menggunakan prinsip-prinsip desain yang baik, Anda akan membuat logo, palet warna, dan gaya tipografi yang unik untuk perusahaan.",
    "difficulty": "Menengah",
    "category": "Design",
    "skills": [
      "Desain Grafis",
      "Teori Warna",
      "Tipografi"
    ],
    "imageUrl": "https://images.unsplash.com/photo-1561070791-2526d30994b5?auto=format&fit=crop&q=80&w=800",
    "targetCareer": "Brand Identity Designer",
    "checklist": [
      {
        "title": "Riset Merek",
        "detail": "Lakukan riset tentang perusahaan dan industri yang terkait untuk memahami kebutuhan dan tujuan merek.",
        "code": ""
      },
      {
        "title": "Membuat Konsep Desain",
        "detail": "Buat konsep desain yang mencakup logo, palet warna, dan gaya tipografi.",
        "code": ""
      },
      {
        "title": "Membuat Prototipe",
        "detail": "Buat prototipe dari desain yang telah dibuat untuk memvisualisasikan identitas merek.",
        "code": ""
      },
      {
        "title": "Menguji dan Merevisi",
        "detail": "Lakukan pengujian dan revisi terhadap desain untuk memastikan bahwa identitas merek yang dibuat sesuai dengan kebutuhan perusahaan.",
        "code": ""
      }
    ],
    "resources": [
      {
        "title": "Canva Design School",
        "url": "https://designschool.canva.com/"
      }
    ]
  },
  {
    "id": "proj-brand-guideline",
    "title": "Membuat Pedoman Identitas Merek",
    "description": "Proyek ini bertujuan untuk menciptakan pedoman identitas merek yang jelas dan konsisten untuk perusahaan. Dengan menggunakan prinsip-prinsip desain yang baik, Anda akan membuat pedoman yang mencakup penggunaan logo, warna, dan tipografi.",
    "difficulty": "Ahli",
    "category": "Design",
    "skills": [
      "Desain Grafis",
      "Teori Warna",
      "Tipografi"
    ],
    "imageUrl": "https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?auto=format&fit=crop&q=80&w=800",
    "targetCareer": "Brand Identity Designer",
    "checklist": [
      {
        "title": "Mengumpulkan Referensi",
        "detail": "Kumpulkan referensi dari perusahaan lain yang memiliki pedoman identitas merek yang baik.",
        "code": ""
      },
      {
        "title": "Membuat Struktur Pedoman",
        "detail": "Buat struktur pedoman yang mencakup penggunaan logo, warna, dan tipografi.",
        "code": ""
      },
      {
        "title": "Membuat Konten Pedoman",
        "detail": "Buat konten pedoman yang jelas dan konsisten untuk memastikan bahwa identitas merek yang dibuat sesuai dengan kebutuhan perusahaan.",
        "code": ""
      },
      {
        "title": "Menguji dan Merevisi",
        "detail": "Lakukan pengujian dan revisi terhadap pedoman untuk memastikan bahwa pedoman yang dibuat sesuai dengan kebutuhan perusahaan.",
        "code": ""
      }
    ],
    "resources": [
      {
        "title": "Brand Guidelines Template",
        "url": "https://www.brandguidelines.co/"
      }
    ]
  },
  {
    "id": "proj-3d-artist",
    "title": "Membuat Model 3D untuk Game",
    "description": "Proyek ini bertujuan untuk menciptakan model 3D yang realistis dan detail untuk game. Dengan menggunakan perangkat lunak 3D modeling, Anda akan membuat model 3D yang mencakup tekstur, warna, dan animasi.",
    "difficulty": "Ahli",
    "category": "3D Modeling",
    "skills": [
      "3D Modeling",
      "Tekstur",
      "Animasi"
    ],
    "imageUrl": "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?auto=format&fit=crop&q=80&w=800",
    "targetCareer": "3D Artist & Modeler",
    "checklist": [
      {
        "title": "Mengumpulkan Referensi",
        "detail": "Kumpulkan referensi dari game lain yang memiliki model 3D yang baik.",
        "code": ""
      },
      {
        "title": "Membuat Konsep Desain",
        "detail": "Buat konsep desain yang mencakup model 3D, tekstur, dan animasi.",
        "code": ""
      },
      {
        "title": "Membuat Model 3D",
        "detail": "Buat model 3D yang realistis dan detail menggunakan perangkat lunak 3D modeling.",
        "code": ""
      },
      {
        "title": "Menguji dan Merevisi",
        "detail": "Lakukan pengujian dan revisi terhadap model 3D untuk memastikan bahwa model 3D yang dibuat sesuai dengan kebutuhan game.",
        "code": ""
      }
    ],
    "resources": [
      {
        "title": "Blender 3D",
        "url": "https://www.blender.org/"
      }
    ]
  },
  {
    "id": "proj-3d-animation",
    "title": "Membuat Animasi 3D untuk Film",
    "description": "Proyek ini bertujuan untuk menciptakan animasi 3D yang realistis dan detail untuk film. Dengan menggunakan perangkat lunak 3D modeling dan animasi, Anda akan membuat animasi 3D yang mencakup karakter, lingkungan, dan efek.",
    "difficulty": "Ahli",
    "category": "3D Modeling",
    "skills": [
      "3D Modeling",
      "Animasi",
      "Efek"
    ],
    "imageUrl": "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&q=80&w=800",
    "targetCareer": "3D Artist & Modeler",
    "checklist": [
      {
        "title": "Mengumpulkan Referensi",
        "detail": "Kumpulkan referensi dari film lain yang memiliki animasi 3D yang baik.",
        "code": ""
      },
      {
        "title": "Membuat Konsep Desain",
        "detail": "Buat konsep desain yang mencakup animasi 3D, karakter, lingkungan, dan efek.",
        "code": ""
      },
      {
        "title": "Membuat Model 3D",
        "detail": "Buat model 3D yang realistis dan detail menggunakan perangkat lunak 3D modeling.",
        "code": ""
      },
      {
        "title": "Menguji dan Merevisi",
        "detail": "Lakukan pengujian dan revisi terhadap animasi 3D untuk memastikan bahwa animasi 3D yang dibuat sesuai dengan kebutuhan film.",
        "code": ""
      }
    ],
    "resources": [
      {
        "title": "Autodesk Maya",
        "url": "https://www.autodesk.com/products/maya"
      }
    ]
  },
  {
    "id": "proj-digital-illustrator",
    "title": "Membuat Ilustrasi Digital untuk Buku Anak",
    "description": "Proyek ini bertujuan untuk menciptakan ilustrasi digital yang menarik dan edukatif untuk buku anak. Dengan menggunakan perangkat lunak ilustrasi digital, Anda akan membuat ilustrasi yang mencakup karakter, latar belakang, dan efek.",
    "difficulty": "Menengah",
    "category": "Digital Illustration",
    "skills": [
      "Ilustrasi Digital",
      "Desain Karakter",
      "Efek"
    ],
    "imageUrl": "https://images.unsplash.com/photo-1684369175833-8b77a161c28b?auto=format&fit=crop&q=80&w=800",
    "targetCareer": "Digital Illustrator",
    "checklist": [
      {
        "title": "Mengumpulkan Referensi",
        "detail": "Kumpulkan referensi dari buku anak lain yang memiliki ilustrasi yang baik.",
        "code": ""
      },
      {
        "title": "Membuat Konsep Desain",
        "detail": "Buat konsep desain yang mencakup ilustrasi, karakter, latar belakang, dan efek.",
        "code": ""
      },
      {
        "title": "Membuat Ilustrasi",
        "detail": "Buat ilustrasi yang menarik dan edukatif menggunakan perangkat lunak ilustrasi digital.",
        "code": ""
      },
      {
        "title": "Menguji dan Merevisi",
        "detail": "Lakukan pengujian dan revisi terhadap ilustrasi untuk memastikan bahwa ilustrasi yang dibuat sesuai dengan kebutuhan buku anak.",
        "code": ""
      }
    ],
    "resources": [
      {
        "title": "Adobe Illustrator",
        "url": "https://www.adobe.com/products/illustrator.html"
      }
    ]
  },
  {
    "id": "proj-digital-illustrator-2",
    "title": "Membuat Ilustrasi Digital untuk Iklan",
    "description": "Proyek ini bertujuan untuk menciptakan ilustrasi digital yang menarik dan efektif untuk iklan. Dengan menggunakan perangkat lunak ilustrasi digital, Anda akan membuat ilustrasi yang mencakup karakter, latar belakang, dan efek.",
    "difficulty": "Menengah",
    "category": "Digital Illustration",
    "skills": [
      "Ilustrasi Digital",
      "Desain Karakter",
      "Efek"
    ],
    "imageUrl": "https://images.unsplash.com/photo-1620712948343-0008ece88852?auto=format&fit=crop&q=80&w=800",
    "targetCareer": "Digital Illustrator",
    "checklist": [
      {
        "title": "Mengumpulkan Referensi",
        "detail": "Kumpulkan referensi dari iklan lain yang memiliki ilustrasi yang baik.",
        "code": ""
      },
      {
        "title": "Membuat Konsep Desain",
        "detail": "Buat konsep desain yang mencakup ilustrasi, karakter, latar belakang, dan efek.",
        "code": ""
      },
      {
        "title": "Membuat Ilustrasi",
        "detail": "Buat ilustrasi yang menarik dan efektif menggunakan perangkat lunak ilustrasi digital.",
        "code": ""
      },
      {
        "title": "Menguji dan Merevisi",
        "detail": "Lakukan pengujian dan revisi terhadap ilustrasi untuk memastikan bahwa ilustrasi yang dibuat sesuai dengan kebutuhan iklan.",
        "code": ""
      }
    ],
    "resources": [
      {
        "title": "Procreate",
        "url": "https://www.procreate.art/"
      }
    ]
  },
  {
    "id": "proj-interaction-designer",
    "title": "Membuat Desain Interaksi untuk Aplikasi Mobile",
    "description": "Proyek ini bertujuan untuk menciptakan desain interaksi yang intuitif dan efektif untuk aplikasi mobile. Dengan menggunakan prinsip-prinsip desain interaksi, Anda akan membuat desain yang mencakup antarmuka pengguna, navigasi, dan interaksi.",
    "difficulty": "Menengah",
    "category": "Interaction Design",
    "skills": [
      "Desain Interaksi",
      "Antarmuka Pengguna",
      "Navigasi"
    ],
    "imageUrl": "https://images.unsplash.com/photo-1581291518857-4e27b48ff24e?auto=format&fit=crop&q=80&w=800",
    "targetCareer": "Interaction Designer",
    "checklist": [
      {
        "title": "Mengumpulkan Referensi",
        "detail": "Kumpulkan referensi dari aplikasi mobile lain yang memiliki desain interaksi yang baik.",
        "code": ""
      },
      {
        "title": "Membuat Konsep Desain",
        "detail": "Buat konsep desain yang mencakup antarmuka pengguna, navigasi, dan interaksi.",
        "code": ""
      },
      {
        "title": "Membuat Prototipe",
        "detail": "Buat prototipe yang dapat diuji untuk memastikan bahwa desain interaksi yang dibuat sesuai dengan kebutuhan pengguna.",
        "code": ""
      },
      {
        "title": "Menguji dan Merevisi",
        "detail": "Lakukan pengujian dan revisi terhadap desain interaksi untuk memastikan bahwa desain yang dibuat sesuai dengan kebutuhan pengguna.",
        "code": ""
      }
    ],
    "resources": [
      {
        "title": "Figma",
        "url": "https://www.figma.com/"
      }
    ]
  },
  {
    "id": "proj-interaction-designer-2",
    "title": "Membuat Desain Interaksi untuk Situs Web",
    "description": "Proyek ini bertujuan untuk menciptakan desain interaksi yang intuitif dan efektif untuk situs web. Dengan menggunakan prinsip-prinsip desain interaksi, Anda akan membuat desain yang mencakup antarmuka pengguna, navigasi, dan interaksi.",
    "difficulty": "Menengah",
    "category": "Interaction Design",
    "skills": [
      "Desain Interaksi",
      "Antarmuka Pengguna",
      "Navigasi"
    ],
    "imageUrl": "https://images.unsplash.com/photo-1581291518857-4e27b48ff24e?auto=format&fit=crop&q=80&w=800",
    "targetCareer": "Interaction Designer",
    "checklist": [
      {
        "title": "Mengumpulkan Referensi",
        "detail": "Kumpulkan referensi dari situs web lain yang memiliki desain interaksi yang baik.",
        "code": ""
      },
      {
        "title": "Membuat Konsep Desain",
        "detail": "Buat konsep desain yang mencakup antarmuka pengguna, navigasi, dan interaksi.",
        "code": ""
      },
      {
        "title": "Membuat Prototipe",
        "detail": "Buat prototipe yang dapat diuji untuk memastikan bahwa desain interaksi yang dibuat sesuai dengan kebutuhan pengguna.",
        "code": ""
      },
      {
        "title": "Menguji dan Merevisi",
        "detail": "Lakukan pengujian dan revisi terhadap desain interaksi untuk memastikan bahwa desain yang dibuat sesuai dengan kebutuhan pengguna.",
        "code": ""
      }
    ],
    "resources": [
      {
        "title": "Adobe XD",
        "url": "https://www.adobe.com/products/xd.html"
      }
    ]
  },
  {
    "id": "proj-design-system-lead",
    "title": "Membangun Sistem Desain untuk Perusahaan",
    "description": "Proyek ini bertujuan untuk menciptakan sistem desain yang konsisten dan efektif untuk perusahaan. Dengan menggunakan prinsip-prinsip desain sistem, Anda akan membuat sistem desain yang mencakup komponen, gaya, dan pedoman.",
    "difficulty": "Ahli",
    "category": "Design System",
    "skills": [
      "Desain Sistem",
      "Komponen",
      "Gaya"
    ],
    "imageUrl": "https://images.unsplash.com/photo-1581291518857-4e27b48ff24e?auto=format&fit=crop&q=80&w=800",
    "targetCareer": "Design System Lead",
    "checklist": [
      {
        "title": "Mengumpulkan Referensi",
        "detail": "Kumpulkan referensi dari perusahaan lain yang memiliki sistem desain yang baik.",
        "code": ""
      },
      {
        "title": "Membuat Konsep Desain",
        "detail": "Buat konsep desain yang mencakup komponen, gaya, dan pedoman.",
        "code": ""
      },
      {
        "title": "Membuat Sistem Desain",
        "detail": "Buat sistem desain yang konsisten dan efektif untuk perusahaan.",
        "code": ""
      },
      {
        "title": "Menguji dan Merevisi",
        "detail": "Lakukan pengujian dan revisi terhadap sistem desain untuk memastikan bahwa sistem desain yang dibuat sesuai dengan kebutuhan perusahaan.",
        "code": ""
      }
    ],
    "resources": [
      {
        "title": "Design Systems Handbook",
        "url": "https://www.designsystemshandbook.com/"
      }
    ]
  },
  {
    "id": "proj-full-stack-1",
    "title": "Pembuatan Aplikasi Toko Online",
    "description": "Membuat aplikasi toko online dengan fitur-fitur dasar seperti registrasi, login, dan keranjang belanja. Aplikasi ini juga memiliki fitur pencarian dan filter produk.",
    "difficulty": "Menengah",
    "category": "Full-Stack Development",
    "skills": [
      "HTML",
      "CSS",
      "JavaScript",
      "React",
      "Node.js"
    ],
    "imageUrl": "https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&q=80&w=800",
    "targetCareer": "Full-Stack Developer",
    "checklist": [
      {
        "title": "Membuat Desain UI/UX",
        "detail": "Membuat desain UI/UX yang responsif dan mudah digunakan",
        "code": ""
      },
      {
        "title": "Membuat Backend API",
        "detail": "Membuat backend API dengan Node.js dan Express.js",
        "code": "const express = require('express'); const app = express();"
      },
      {
        "title": "Membuat Frontend",
        "detail": "Membuat frontend dengan React dan Redux",
        "code": "import React from 'react'; import ReactDOM from 'react-dom';"
      },
      {
        "title": "Mengintegrasikan Frontend dan Backend",
        "detail": "Mengintegrasikan frontend dan backend dengan API",
        "code": "fetch('/api/products').then(response => response.json()).then(data => console.log(data));"
      }
    ],
    "resources": [
      {
        "title": "Dokumentasi React",
        "url": "https://reactjs.org/docs/getting-started.html"
      }
    ]
  },
  {
    "id": "proj-full-stack-2",
    "title": "Pembuatan Aplikasi Blog",
    "description": "Membuat aplikasi blog dengan fitur-fitur dasar seperti membuat postingan, mengedit postingan, dan menghapus postingan. Aplikasi ini juga memiliki fitur komentar dan tag.",
    "difficulty": "Pemula",
    "category": "Full-Stack Development",
    "skills": [
      "HTML",
      "CSS",
      "JavaScript",
      "React",
      "Node.js"
    ],
    "imageUrl": "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?auto=format&fit=crop&q=80&w=800",
    "targetCareer": "Full-Stack Developer",
    "checklist": [
      {
        "title": "Membuat Desain UI/UX",
        "detail": "Membuat desain UI/UX yang responsif dan mudah digunakan",
        "code": ""
      },
      {
        "title": "Membuat Backend API",
        "detail": "Membuat backend API dengan Node.js dan Express.js",
        "code": "const express = require('express'); const app = express();"
      },
      {
        "title": "Membuat Frontend",
        "detail": "Membuat frontend dengan React dan Redux",
        "code": "import React from 'react'; import ReactDOM from 'react-dom';"
      },
      {
        "title": "Mengintegrasikan Frontend dan Backend",
        "detail": "Mengintegrasikan frontend dan backend dengan API",
        "code": "fetch('/api/posts').then(response => response.json()).then(data => console.log(data));"
      }
    ],
    "resources": [
      {
        "title": "Dokumentasi React",
        "url": "https://reactjs.org/docs/getting-started.html"
      }
    ]
  },
  {
    "id": "proj-backend-1",
    "title": "Pembuatan API untuk Aplikasi Mobile",
    "description": "Membuat API untuk aplikasi mobile dengan fitur-fitur dasar seperti autentikasi, autorisasi, dan pengelolaan data. API ini juga memiliki fitur caching dan logging.",
    "difficulty": "Menengah",
    "category": "Backend Development",
    "skills": [
      "Java",
      "Spring Boot",
      "MySQL"
    ],
    "imageUrl": "https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&q=80&w=800",
    "targetCareer": "Backend Developer",
    "checklist": [
      {
        "title": "Membuat Desain API",
        "detail": "Membuat desain API yang skalabel dan mudah dipahami",
        "code": ""
      },
      {
        "title": "Membuat Backend API",
        "detail": "Membuat backend API dengan Spring Boot dan MySQL",
        "code": "@SpringBootApplication public class Application { ... }"
      },
      {
        "title": "Mengimplementasikan Autentikasi dan Autorisasi",
        "detail": "Mengimplementasikan autentikasi dan autorisasi dengan Spring Security",
        "code": "@EnableWebSecurity public class SecurityConfig { ... }"
      },
      {
        "title": "Mengintegrasikan dengan Aplikasi Mobile",
        "detail": "Mengintegrasikan API dengan aplikasi mobile dengan menggunakan HTTP",
        "code": "HttpClient client = new HttpClient(); client.get('https://api.example.com/users');"
      }
    ],
    "resources": [
      {
        "title": "Dokumentasi Spring Boot",
        "url": "https://docs.spring.io/spring-boot/docs/current/reference/htmlsingle/"
      }
    ]
  },
  {
    "id": "proj-backend-2",
    "title": "Pembuatan Sistem Pengelolaan Data",
    "description": "Membuat sistem pengelolaan data dengan fitur-fitur dasar seperti CRUD (Create, Read, Update, Delete) dan pengelolaan user. Sistem ini juga memiliki fitur backup dan restore data.",
    "difficulty": "Ahli",
    "category": "Backend Development",
    "skills": [
      "Python",
      "Django",
      "PostgreSQL"
    ],
    "imageUrl": "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&q=80&w=800",
    "targetCareer": "Backend Developer",
    "checklist": [
      {
        "title": "Membuat Desain Sistem",
        "detail": "Membuat desain sistem yang skalabel dan mudah dipahami",
        "code": ""
      },
      {
        "title": "Membuat Backend API",
        "detail": "Membuat backend API dengan Django dan PostgreSQL",
        "code": "from django.db import models class User(models.Model): ... "
      },
      {
        "title": "Mengimplementasikan CRUD",
        "detail": "Mengimplementasikan CRUD dengan Django",
        "code": "from django.views import generic class CreateUserView(generic.CreateView): ... "
      },
      {
        "title": "Mengintegrasikan dengan Sistem Lain",
        "detail": "Mengintegrasikan sistem dengan sistem lain dengan menggunakan API",
        "code": "import requests response = requests.get('https://api.example.com/users')"
      }
    ],
    "resources": [
      {
        "title": "Dokumentasi Django",
        "url": "https://docs.djangoproject.com/en/3.2/"
      }
    ]
  },
  {
    "id": "proj-arch-1",
    "title": "Pembuatan Arsitektur Sistem",
    "description": "Membuat arsitektur sistem dengan fitur-fitur dasar seperti skalabilitas, keamanan, dan kinerja. Arsitektur ini juga memiliki fitur monitoring dan logging.",
    "difficulty": "Ahli",
    "category": "Software Architecture",
    "skills": [
      "UML",
      "TOGAF",
      "AWS"
    ],
    "imageUrl": "https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&q=80&w=800",
    "targetCareer": "Software Architect",
    "checklist": [
      {
        "title": "Membuat Desain Arsitektur",
        "detail": "Membuat desain arsitektur yang skalabel dan mudah dipahami",
        "code": ""
      },
      {
        "title": "Mengidentifikasi Kebutuhan Sistem",
        "detail": "Mengidentifikasi kebutuhan sistem dan membuat spesifikasi teknis",
        "code": ""
      },
      {
        "title": "Mengimplementasikan Arsitektur",
        "detail": "Mengimplementasikan arsitektur dengan menggunakan teknologi yang sesuai",
        "code": "aws ec2 create-instance --instance-type t2.micro"
      },
      {
        "title": "Mengintegrasikan dengan Sistem Lain",
        "detail": "Mengintegrasikan sistem dengan sistem lain dengan menggunakan API",
        "code": "import requests response = requests.get('https://api.example.com/users')"
      }
    ],
    "resources": [
      {
        "title": "Dokumentasi TOGAF",
        "url": "https://www.opengroup.org/togaf"
      }
    ]
  },
  {
    "id": "proj-arch-2",
    "title": "Pembuatan Sistem Microservices",
    "description": "Membuat sistem microservices dengan fitur-fitur dasar seperti skalabilitas, keamanan, dan kinerja. Sistem ini juga memiliki fitur monitoring dan logging.",
    "difficulty": "Ahli",
    "category": "Software Architecture",
    "skills": [
      "Docker",
      "Kubernetes",
      "AWS"
    ],
    "imageUrl": "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&q=80&w=800",
    "targetCareer": "Software Architect",
    "checklist": [
      {
        "title": "Membuat Desain Arsitektur",
        "detail": "Membuat desain arsitektur yang skalabel dan mudah dipahami",
        "code": ""
      },
      {
        "title": "Mengidentifikasi Kebutuhan Sistem",
        "detail": "Mengidentifikasi kebutuhan sistem dan membuat spesifikasi teknis",
        "code": ""
      },
      {
        "title": "Mengimplementasikan Microservices",
        "detail": "Mengimplementasikan microservices dengan menggunakan teknologi yang sesuai",
        "code": "docker run -d -p 8080:8080 my-service"
      },
      {
        "title": "Mengintegrasikan dengan Sistem Lain",
        "detail": "Mengintegrasikan sistem dengan sistem lain dengan menggunakan API",
        "code": "import requests response = requests.get('https://api.example.com/users')"
      }
    ],
    "resources": [
      {
        "title": "Dokumentasi Kubernetes",
        "url": "https://kubernetes.io/docs/home/"
      }
    ]
  },
  {
    "id": "proj-qa-1",
    "title": "Pembuatan Test Plan",
    "description": "Membuat test plan dengan fitur-fitur dasar seperti identifikasi kebutuhan, membuat skenario test, dan mengidentifikasi risiko. Test plan ini juga memiliki fitur monitoring dan pelaporan.",
    "difficulty": "Pemula",
    "category": "QA Engineering",
    "skills": [
      "TestLink",
      "JIRA",
      "Selenium"
    ],
    "imageUrl": "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&q=80&w=800",
    "targetCareer": "QA Engineer",
    "checklist": [
      {
        "title": "Membuat Desain Test Plan",
        "detail": "Membuat desain test plan yang komprehensif dan mudah dipahami",
        "code": ""
      },
      {
        "title": "Mengidentifikasi Kebutuhan Test",
        "detail": "Mengidentifikasi kebutuhan test dan membuat skenario test",
        "code": ""
      },
      {
        "title": "Mengimplementasikan Test",
        "detail": "Mengimplementasikan test dengan menggunakan teknologi yang sesuai",
        "code": "import unittest class TestExample(unittest.TestCase): ... "
      },
      {
        "title": "Mengintegrasikan dengan Sistem Lain",
        "detail": "Mengintegrasikan test dengan sistem lain dengan menggunakan API",
        "code": "import requests response = requests.get('https://api.example.com/users')"
      }
    ],
    "resources": [
      {
        "title": "Dokumentasi TestLink",
        "url": "https://testlink.org/"
      }
    ]
  },
  {
    "id": "proj-qa-2",
    "title": "Pembuatan Test Automation",
    "description": "Membuat test automation dengan fitur-fitur dasar seperti identifikasi kebutuhan, membuat skenario test, dan mengidentifikasi risiko. Test automation ini juga memiliki fitur monitoring dan pelaporan.",
    "difficulty": "Menengah",
    "category": "QA Engineering",
    "skills": [
      "Selenium",
      "Appium",
      "Cucumber"
    ],
    "imageUrl": "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?auto=format&fit=crop&q=80&w=800",
    "targetCareer": "QA Engineer",
    "checklist": [
      {
        "title": "Membuat Desain Test Automation",
        "detail": "Membuat desain test automation yang komprehensif dan mudah dipahami",
        "code": ""
      },
      {
        "title": "Mengidentifikasi Kebutuhan Test",
        "detail": "Mengidentifikasi kebutuhan test dan membuat skenario test",
        "code": ""
      },
      {
        "title": "Mengimplementasikan Test Automation",
        "detail": "Mengimplementasikan test automation dengan menggunakan teknologi yang sesuai",
        "code": "import selenium from selenium import webdriver driver = webdriver.Chrome()"
      },
      {
        "title": "Mengintegrasikan dengan Sistem Lain",
        "detail": "Mengintegrasikan test automation dengan sistem lain dengan menggunakan API",
        "code": "import requests response = requests.get('https://api.example.com/users')"
      }
    ],
    "resources": [
      {
        "title": "Dokumentasi Selenium",
        "url": "https://www.selenium.dev/"
      }
    ]
  },
  {
    "id": "proj-embedded-1",
    "title": "Pembuatan Sistem Embedded",
    "description": "Membuat sistem embedded dengan fitur-fitur dasar seperti pengelolaan data, pengelolaan perangkat, dan pengelolaan energi. Sistem ini juga memiliki fitur keamanan dan kinerja.",
    "difficulty": "Ahli",
    "category": "Embedded Systems Development",
    "skills": [
      "C",
      "C++",
      "Arduino"
    ],
    "imageUrl": "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?auto=format&fit=crop&q=80&w=800",
    "targetCareer": "Embedded Systems Developer",
    "checklist": [
      {
        "title": "Membuat Desain Sistem Embedded",
        "detail": "Membuat desain sistem embedded yang komprehensif dan mudah dipahami",
        "code": ""
      },
      {
        "title": "Mengidentifikasi Kebutuhan Sistem",
        "detail": "Mengidentifikasi kebutuhan sistem dan membuat spesifikasi teknis",
        "code": ""
      },
      {
        "title": "Mengimplementasikan Sistem Embedded",
        "detail": "Mengimplementasikan sistem embedded dengan menggunakan teknologi yang sesuai",
        "code": "int main() { ... }"
      },
      {
        "title": "Mengintegrasikan dengan Sistem Lain",
        "detail": "Mengintegrasikan sistem embedded dengan sistem lain dengan menggunakan API",
        "code": "import requests response = requests.get('https://api.example.com/users')"
      }
    ],
    "resources": [
      {
        "title": "Dokumentasi Arduino",
        "url": "https://www.arduino.cc/"
      }
    ]
  },
  {
    "id": "proj-embedded-2",
    "title": "Pembuatan Sistem IoT",
    "description": "Membuat sistem IoT dengan fitur-fitur dasar seperti pengelolaan data, pengelolaan perangkat, dan pengelolaan energi. Sistem ini juga memiliki fitur keamanan dan kinerja.",
    "difficulty": "Ahli",
    "category": "Embedded Systems Development",
    "skills": [
      "Python",
      "Raspberry Pi",
      "MQTT"
    ],
    "imageUrl": "https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&q=80&w=800",
    "targetCareer": "Embedded Systems Developer",
    "checklist": [
      {
        "title": "Membuat Desain Sistem IoT",
        "detail": "Membuat desain sistem IoT yang komprehensif dan mudah dipahami",
        "code": ""
      },
      {
        "title": "Mengidentifikasi Kebutuhan Sistem",
        "detail": "Mengidentifikasi kebutuhan sistem dan membuat spesifikasi teknis",
        "code": ""
      },
      {
        "title": "Mengimplementasikan Sistem IoT",
        "detail": "Mengimplementasikan sistem IoT dengan menggunakan teknologi yang sesuai",
        "code": "import paho.mqtt.client as mqtt client = mqtt.Client()"
      }
    ]
  },
  {
    "id": "proj-api-1",
    "title": "Membangun API untuk Aplikasi E-commerce",
    "description": "Proyek ini bertujuan untuk membangun API yang dapat digunakan oleh aplikasi e-commerce untuk melakukan operasi CRUD pada data produk. API ini akan dibangun menggunakan Node.js dan Express.js.",
    "difficulty": "Menengah",
    "category": "Backend",
    "skills": [
      "Node.js",
      "Express.js",
      "MongoDB"
    ],
    "imageUrl": "https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&q=80&w=800",
    "targetCareer": "API Developer",
    "checklist": [
      {
        "title": "Menginstal Node.js dan Express.js",
        "detail": "Instal Node.js dan Express.js menggunakan npm",
        "code": "npm install express"
      },
      {
        "title": "Membuat endpoint untuk operasi CRUD",
        "detail": "Buat endpoint untuk melakukan operasi CRUD pada data produk",
        "code": "app.get('/produk', ...)"
      },
      {
        "title": "Mengintegrasikan dengan database",
        "detail": "Integrasikan API dengan database MongoDB",
        "code": "const mongoose = require('mongoose')"
      },
      {
        "title": "Menguji API",
        "detail": "Uji API menggunakan Postman atau cURL",
        "code": "curl -X GET 'http://localhost:3000/produk'"
      }
    ],
    "resources": [
      {
        "title": "Dokumentasi Express.js",
        "url": "https://expressjs.com/en/starter/installing.html"
      }
    ]
  },
  {
    "id": "proj-api-2",
    "title": "Membangun API untuk Aplikasi Cuaca",
    "description": "Proyek ini bertujuan untuk membangun API yang dapat digunakan oleh aplikasi cuaca untuk mendapatkan data cuaca terkini. API ini akan dibangun menggunakan Python dan Flask.",
    "difficulty": "Pemula",
    "category": "Backend",
    "skills": [
      "Python",
      "Flask",
      "API Cuaca"
    ],
    "imageUrl": "https://images.unsplash.com/photo-1618401471353-b98afee0b2eb?auto=format&fit=crop&q=80&w=800",
    "targetCareer": "API Developer",
    "checklist": [
      {
        "title": "Menginstal Python dan Flask",
        "detail": "Instal Python dan Flask menggunakan pip",
        "code": "pip install flask"
      },
      {
        "title": "Membuat endpoint untuk mendapatkan data cuaca",
        "detail": "Buat endpoint untuk mendapatkan data cuaca terkini",
        "code": "app.get('/cuaca', ...)"
      },
      {
        "title": "Mengintegrasikan dengan API cuaca",
        "detail": "Integrasikan API dengan API cuaca OpenWeatherMap",
        "code": "import requests"
      },
      {
        "title": "Menguji API",
        "detail": "Uji API menggunakan Postman atau cURL",
        "code": "curl -X GET 'http://localhost:5000/cuaca'"
      }
    ],
    "resources": [
      {
        "title": "Dokumentasi Flask",
        "url": "https://flask.palletsprojects.com/en/2.0.x/"
      }
    ]
  },
  {
    "id": "proj-lowcode-1",
    "title": "Membangun Aplikasi Web menggunakan Low-Code",
    "description": "Proyek ini bertujuan untuk membangun aplikasi web menggunakan platform low-code seperti Webflow. Aplikasi ini akan memiliki fitur CRUD dan autentikasi.",
    "difficulty": "Pemula",
    "category": "Frontend",
    "skills": [
      "Webflow",
      "HTML",
      "CSS"
    ],
    "imageUrl": "https://images.unsplash.com/photo-1555099962-4199c345e5dd?auto=format&fit=crop&q=80&w=800",
    "targetCareer": "Low-Code Developer",
    "checklist": [
      {
        "title": "Membuat akun Webflow",
        "detail": "Buat akun Webflow dan membuat proyek baru",
        "code": ""
      },
      {
        "title": "Membuat desain UI",
        "detail": "Buat desain UI untuk aplikasi web menggunakan Webflow",
        "code": ""
      },
      {
        "title": "Membuat fitur CRUD",
        "detail": "Buat fitur CRUD menggunakan Webflow",
        "code": ""
      },
      {
        "title": "Mengintegrasikan dengan autentikasi",
        "detail": "Integrasikan aplikasi dengan autentikasi menggunakan Webflow",
        "code": ""
      }
    ],
    "resources": [
      {
        "title": "Dokumentasi Webflow",
        "url": "https://webflow.com/design-system"
      }
    ]
  },
  {
    "id": "proj-lowcode-2",
    "title": "Membangun Aplikasi Mobile menggunakan Low-Code",
    "description": "Proyek ini bertujuan untuk membangun aplikasi mobile menggunakan platform low-code seperti Adalo. Aplikasi ini akan memiliki fitur CRUD dan notifikasi.",
    "difficulty": "Menengah",
    "category": "Mobile",
    "skills": [
      "Adalo",
      "JavaScript",
      "API"
    ],
    "imageUrl": "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?auto=format&fit=crop&q=80&w=800",
    "targetCareer": "Low-Code Developer",
    "checklist": [
      {
        "title": "Membuat akun Adalo",
        "detail": "Buat akun Adalo dan membuat proyek baru",
        "code": ""
      },
      {
        "title": "Membuat desain UI",
        "detail": "Buat desain UI untuk aplikasi mobile menggunakan Adalo",
        "code": ""
      },
      {
        "title": "Membuat fitur CRUD",
        "detail": "Buat fitur CRUD menggunakan Adalo",
        "code": ""
      },
      {
        "title": "Mengintegrasikan dengan notifikasi",
        "detail": "Integrasikan aplikasi dengan notifikasi menggunakan Adalo",
        "code": ""
      }
    ],
    "resources": [
      {
        "title": "Dokumentasi Adalo",
        "url": "https://adalodocs.zendesk.com/hc/en-us"
      }
    ]
  },
  {
    "id": "proj-compiler-1",
    "title": "Membangun Compiler untuk Bahasa Pemrograman",
    "description": "Proyek ini bertujuan untuk membangun compiler untuk bahasa pemrograman seperti Python. Compiler ini akan dapat menerjemahkan kode Python menjadi kode mesin.",
    "difficulty": "Ahli",
    "category": "Compiler",
    "skills": [
      "Python",
      "Compiler",
      "Parsial"
    ],
    "imageUrl": "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&q=80&w=800",
    "targetCareer": "Compiler Engineer",
    "checklist": [
      {
        "title": "Membuat lexer",
        "detail": "Buat lexer untuk memecah kode Python menjadi token",
        "code": "import re"
      },
      {
        "title": "Membuat parser",
        "detail": "Buat parser untuk menerjemahkan token menjadi struktur sintaks",
        "code": "import pyparsing"
      },
      {
        "title": "Membuat generator kode",
        "detail": "Buat generator kode untuk menerjemahkan struktur sintaks menjadi kode mesin",
        "code": "import struct"
      },
      {
        "title": "Mengintegrasikan dengan runtime",
        "detail": "Integrasikan compiler dengan runtime untuk menjalankan kode mesin",
        "code": "import ctypes"
      }
    ],
    "resources": [
      {
        "title": "Dokumentasi Python",
        "url": "https://docs.python.org/3/"
      }
    ]
  },
  {
    "id": "proj-compiler-2",
    "title": "Membangun Interpreter untuk Bahasa Pemrograman",
    "description": "Proyek ini bertujuan untuk membangun interpreter untuk bahasa pemrograman seperti JavaScript. Interpreter ini akan dapat menjalankan kode JavaScript secara langsung.",
    "difficulty": "Ahli",
    "category": "Interpreter",
    "skills": [
      "JavaScript",
      "Interpreter",
      "Parsial"
    ],
    "imageUrl": "https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&q=80&w=800",
    "targetCareer": "Compiler Engineer",
    "checklist": [
      {
        "title": "Membuat lexer",
        "detail": "Buat lexer untuk memecah kode JavaScript menjadi token",
        "code": "import re"
      },
      {
        "title": "Membuat parser",
        "detail": "Buat parser untuk menerjemahkan token menjadi struktur sintaks",
        "code": "import pyparsing"
      },
      {
        "title": "Membuat evaluator",
        "detail": "Buat evaluator untuk menjalankan struktur sintaks",
        "code": "import eval"
      },
      {
        "title": "Mengintegrasikan dengan runtime",
        "detail": "Integrasikan interpreter dengan runtime untuk menjalankan kode JavaScript",
        "code": "import ctypes"
      }
    ],
    "resources": [
      {
        "title": "Dokumentasi JavaScript",
        "url": "https://developer.mozilla.org/en-US/docs/Web/JavaScript"
      }
    ]
  },
  {
    "id": "proj-desktop-1",
    "title": "Membangun Aplikasi Desktop untuk Manajemen Data",
    "description": "Proyek ini bertujuan untuk membangun aplikasi desktop untuk manajemen data menggunakan framework seperti Electron. Aplikasi ini akan memiliki fitur CRUD dan grafik.",
    "difficulty": "Menengah",
    "category": "Desktop",
    "skills": [
      "Electron",
      "JavaScript",
      "HTML"
    ],
    "imageUrl": "https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&q=80&w=800",
    "targetCareer": "Desktop App Developer",
    "checklist": [
      {
        "title": "Membuat proyek Electron",
        "detail": "Buat proyek Electron baru",
        "code": "npm init"
      },
      {
        "title": "Membuat antarmuka pengguna",
        "detail": "Buat antarmuka pengguna untuk aplikasi desktop menggunakan HTML dan CSS",
        "code": "<html>...</html>"
      },
      {
        "title": "Membuat fitur CRUD",
        "detail": "Buat fitur CRUD untuk manajemen data",
        "code": "const fs = require('fs')"
      },
      {
        "title": "Mengintegrasikan dengan grafik",
        "detail": "Integrasikan aplikasi dengan grafik untuk visualisasi data",
        "code": "const chart = require('chart.js')"
      }
    ],
    "resources": [
      {
        "title": "Dokumentasi Electron",
        "url": "https://electronjs.org/docs"
      }
    ]
  },
  {
    "id": "proj-desktop-2",
    "title": "Membangun Aplikasi Desktop untuk Pengeditan Gambar",
    "description": "Proyek ini bertujuan untuk membangun aplikasi desktop untuk pengeditan gambar menggunakan framework seperti Qt. Aplikasi ini akan memiliki fitur pengeditan gambar dan efek.",
    "difficulty": "Ahli",
    "category": "Desktop",
    "skills": [
      "Qt",
      "C++",
      "Pengeditan Gambar"
    ],
    "imageUrl": "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&q=80&w=800",
    "targetCareer": "Desktop App Developer",
    "checklist": [
      {
        "title": "Membuat proyek Qt",
        "detail": "Buat proyek Qt baru",
        "code": "qmake -project"
      },
      {
        "title": "Membuat antarmuka pengguna",
        "detail": "Buat antarmuka pengguna untuk aplikasi desktop menggunakan Qt",
        "code": "#include <QApplication>"
      },
      {
        "title": "Membuat fitur pengeditan gambar",
        "detail": "Buat fitur pengeditan gambar untuk aplikasi",
        "code": "#include <QImage>"
      },
      {
        "title": "Mengintegrasikan dengan efek",
        "detail": "Integrasikan aplikasi dengan efek untuk pengeditan gambar",
        "code": "#include <QGraphicsEffect>"
      }
    ],
    "resources": [
      {
        "title": "Dokumentasi Qt",
        "url": "https://doc.qt.io/"
      }
    ]
  },
  {
    "id": "proj-cloud-1",
    "title": "Membangun Arsitektur Cloud untuk Aplikasi Web",
    "description": "Proyek ini bertujuan untuk membangun arsitektur cloud untuk aplikasi web menggunakan layanan seperti AWS. Arsitektur ini akan memiliki fitur skalabilitas dan keamanan.",
    "difficulty": "Ahli",
    "category": "Cloud",
    "skills": [
      "AWS",
      "CloudFormation",
      "Security"
    ],
    "imageUrl": "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&q=80&w=800",
    "targetCareer": "Cloud Architecture Engineer",
    "checklist": [
      {
        "title": "Membuat akun AWS",
        "detail": "Buat akun AWS dan membuat proyek baru",
        "code": "aws configure"
      },
      {
        "title": "Membuat template CloudFormation",
        "detail": "Buat template CloudFormation untuk membangun arsitektur cloud",
        "code": "aws cloudformation create-stack"
      },
      {
        "title": "Membuat fitur skalabilitas",
        "detail": "Buat fitur skalabilitas untuk aplikasi web",
        "code": "aws autoscaling create-auto-scaling-group"
      },
      {
        "title": "Mengintegrasikan dengan keamanan",
        "detail": "Integrasikan arsitektur cloud dengan keamanan untuk aplikasi web",
        "code": "aws iam create-role"
      }
    ],
    "resources": [
      {
        "title": "Dokumentasi AWS",
        "url": "https://aws.amazon.com/documentation/"
      }
    ]
  },
  {
    "id": "proj-cloud-2",
    "title": "Membangun Arsitektur Cloud untuk Aplikasi Mobile",
    "description": "Proyek ini bertujuan untuk membangun arsitektur cloud untuk aplikasi mobile menggunakan layanan seperti Google Cloud. Arsitektur ini akan memiliki fitur skalabilitas dan keamanan.",
    "difficulty": "Ahli",
    "category": "Cloud",
    "skills": [
      "Google Cloud",
      "Cloud Functions",
      "Security"
    ],
    "imageUrl": "https://images.unsplash.com/photo-1563206767-5b18f218e8de?auto=format&fit=crop&q=80&w=800",
    "targetCareer": "Cloud Architecture Engineer",
    "checklist": [
      {
        "title": "Membuat akun Google Cloud",
        "detail": "Buat akun Google Cloud dan membuat proyek baru",
        "code": "gcloud auth login"
      },
      {
        "title": "Membuat fungsi cloud",
        "detail": "Buat fungsi cloud untuk membangun arsitektur cloud",
        "code": "gcloud functions deploy"
      },
      {
        "title": "Membuat fitur skalabilitas",
        "detail": "Buat fitur skalabilitas untuk aplikasi mobile",
        "code": "gcloud app deploy"
      },
      {
        "title": "Mengintegrasikan dengan keamanan",
        "detail": "Integrasikan arsitektur cloud dengan keamanan untuk aplikasi mobile",
        "code": "gcloud iam roles create"
      }
    ],
    "resources": [
      {
        "title": "Dokumentasi Google Cloud",
        "url": "https://cloud.google.com/docs"
      }
    ]
  },
  {
    "id": "proj-net-sys-eng-1",
    "title": "Desain dan Implementasi Jaringan Komputer",
    "description": "Membuat desain dan implementasi jaringan komputer untuk perusahaan kecil. Proyek ini melibatkan pemilihan perangkat jaringan, konfigurasi IP, dan pengamanan jaringan.",
    "difficulty": "Menengah",
    "category": "Jaringan",
    "skills": [
      "Cisco",
      "Mikrotik",
      "TCP/IP"
    ],
    "imageUrl": "https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&q=80&w=800",
    "targetCareer": "Network System Engineer",
    "checklist": [
      {
        "title": "Perencanaan Jaringan",
        "detail": "Mengidentifikasi kebutuhan jaringan dan membuat desain jaringan",
        "code": ""
      },
      {
        "title": "Pengadaan Perangkat",
        "detail": "Membeli perangkat jaringan yang sesuai dengan desain",
        "code": ""
      },
      {
        "title": "Konfigurasi Jaringan",
        "detail": "Mengkonfigurasi perangkat jaringan dan mengatur IP",
        "code": "ip addr add 192.168.1.1/24 dev eth0"
      },
      {
        "title": "Pengamanan Jaringan",
        "detail": "Mengatur firewall dan membuat kebijakan keamanan",
        "code": "ufw allow 22"
      }
    ],
    "resources": [
      {
        "title": "Cisco Documentation",
        "url": "https://www.cisco.com/c/en/us/support/docs.html"
      }
    ]
  },
  {
    "id": "proj-net-sys-eng-2",
    "title": "Optimasi Kinerja Jaringan",
    "description": "Menganalisis dan mengoptimalkan kinerja jaringan untuk meningkatkan kecepatan dan keandalan. Proyek ini melibatkan penggunaan alat monitoring dan analisis jaringan.",
    "difficulty": "Ahli",
    "category": "Jaringan",
    "skills": [
      "Wireshark",
      "Nagios",
      "TCP/IP"
    ],
    "imageUrl": "https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&q=80&w=800",
    "targetCareer": "Network System Engineer",
    "checklist": [
      {
        "title": "Pengumpulan Data",
        "detail": "Mengumpulkan data kinerja jaringan menggunakan alat monitoring",
        "code": ""
      },
      {
        "title": "Analisis Data",
        "detail": "Menganalisis data kinerja jaringan untuk mengidentifikasi bottleneck",
        "code": ""
      },
      {
        "title": "Optimasi Kinerja",
        "detail": "Mengoptimalkan kinerja jaringan dengan mengatur konfigurasi perangkat",
        "code": "tc qdisc add dev eth0 root handle 1:0 netem delay 10ms"
      },
      {
        "title": "Pengujian Kinerja",
        "detail": "Mengujikan kinerja jaringan setelah optimasi",
        "code": "iperf -c 192.168.1.1 -t 60"
      }
    ],
    "resources": [
      {
        "title": "Wireshark Documentation",
        "url": "https://www.wireshark.org/docs/"
      }
    ]
  },
  {
    "id": "proj-sys-admin-1",
    "title": "Instalasi dan Konfigurasi Server",
    "description": "Menginstal dan mengkonfigurasi server untuk perusahaan kecil. Proyek ini melibatkan pemilihan sistem operasi, konfigurasi jaringan, dan pengamanan server.",
    "difficulty": "Pemula",
    "category": "Sistem",
    "skills": [
      "Linux",
      "Windows",
      "SSH"
    ],
    "imageUrl": "https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&q=80&w=800",
    "targetCareer": "System Administrator",
    "checklist": [
      {
        "title": "Pemilihan Sistem Operasi",
        "detail": "Mengidentifikasi kebutuhan server dan memilih sistem operasi",
        "code": ""
      },
      {
        "title": "Instalasi Server",
        "detail": "Menginstal sistem operasi dan mengkonfigurasi jaringan",
        "code": "apt-get install -y openssh-server"
      },
      {
        "title": "Konfigurasi Jaringan",
        "detail": "Mengkonfigurasi IP dan mengatur firewall",
        "code": "ip addr add 192.168.1.1/24 dev eth0"
      },
      {
        "title": "Pengamanan Server",
        "detail": "Mengatur kebijakan keamanan dan membuat cadangan",
        "code": "ufw allow 22"
      }
    ],
    "resources": [
      {
        "title": "Ubuntu Documentation",
        "url": "https://help.ubuntu.com/"
      }
    ]
  },
  {
    "id": "proj-sys-admin-2",
    "title": "Pengelolaan Pengguna dan Hak Akses",
    "description": "Mengelola pengguna dan hak akses untuk perusahaan kecil. Proyek ini melibatkan membuat kebijakan keamanan dan mengatur hak akses pengguna.",
    "difficulty": "Menengah",
    "category": "Sistem",
    "skills": [
      "LDAP",
      "Active Directory",
      "SSH"
    ],
    "imageUrl": "https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&q=80&w=800",
    "targetCareer": "System Administrator",
    "checklist": [
      {
        "title": "Membuat Kebijakan Keamanan",
        "detail": "Mengidentifikasi kebutuhan keamanan dan membuat kebijakan",
        "code": ""
      },
      {
        "title": "Mengatur Hak Akses",
        "detail": "Mengatur hak akses pengguna dan membuat grup",
        "code": "useradd -m -s /bin/bash user1"
      },
      {
        "title": "Mengelola Pengguna",
        "detail": "Mengelola pengguna dan mengatur password",
        "code": "passwd user1"
      },
      {
        "title": "Pengujian Hak Akses",
        "detail": "Mengujikan hak akses pengguna",
        "code": "su - user1"
      }
    ],
    "resources": [
      {
        "title": "OpenLDAP Documentation",
        "url": "https://www.openldap.org/doc/"
      }
    ]
  },
  {
    "id": "proj-site-rel-eng-1",
    "title": "Mengoptimalkan Kinerja Aplikasi",
    "description": "Mengoptimalkan kinerja aplikasi untuk perusahaan kecil. Proyek ini melibatkan menganalisis kinerja aplikasi dan mengoptimalkan kode.",
    "difficulty": "Ahli",
    "category": "Aplikasi",
    "skills": [
      "Java",
      "Python",
      "Docker"
    ],
    "imageUrl": "https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&q=80&w=800",
    "targetCareer": "Site Reliability Engineer",
    "checklist": [
      {
        "title": "Menganalisis Kinerja",
        "detail": "Menganalisis kinerja aplikasi menggunakan alat monitoring",
        "code": ""
      },
      {
        "title": "Mengidentifikasi Bottleneck",
        "detail": "Mengidentifikasi bottleneck kinerja aplikasi",
        "code": ""
      },
      {
        "title": "Mengoptimalkan Kode",
        "detail": "Mengoptimalkan kode aplikasi untuk meningkatkan kinerja",
        "code": "git checkout -b optimize-code"
      },
      {
        "title": "Mengujikan Kinerja",
        "detail": "Mengujikan kinerja aplikasi setelah optimasi",
        "code": "docker run -it --rm aplikasi"
      }
    ],
    "resources": [
      {
        "title": "Docker Documentation",
        "url": "https://docs.docker.com/"
      }
    ]
  },
  {
    "id": "proj-site-rel-eng-2",
    "title": "Mengelola Infrastruktur Aplikasi",
    "description": "Mengelola infrastruktur aplikasi untuk perusahaan kecil. Proyek ini melibatkan mengelola server, jaringan, dan keamanan.",
    "difficulty": "Menengah",
    "category": "Aplikasi",
    "skills": [
      "AWS",
      "Azure",
      "Google Cloud"
    ],
    "imageUrl": "https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&q=80&w=800",
    "targetCareer": "Site Reliability Engineer",
    "checklist": [
      {
        "title": "Mengelola Server",
        "detail": "Mengelola server aplikasi dan mengatur konfigurasi",
        "code": ""
      },
      {
        "title": "Mengelola Jaringan",
        "detail": "Mengelola jaringan aplikasi dan mengatur keamanan",
        "code": ""
      },
      {
        "title": "Mengelola Keamanan",
        "detail": "Mengelola keamanan aplikasi dan mengatur firewall",
        "code": ""
      },
      {
        "title": "Mengujikan Infrastruktur",
        "detail": "Mengujikan infrastruktur aplikasi",
        "code": ""
      }
    ],
    "resources": [
      {
        "title": "AWS Documentation",
        "url": "https://docs.aws.amazon.com/"
      }
    ]
  },
  {
    "id": "proj-db-admin-1",
    "title": "Mengelola Basis Data",
    "description": "Mengelola basis data untuk perusahaan kecil. Proyek ini melibatkan mengelola struktur basis data, mengatur keamanan, dan mengoptimalkan kinerja.",
    "difficulty": "Menengah",
    "category": "Basis Data",
    "skills": [
      "MySQL",
      "PostgreSQL",
      "MongoDB"
    ],
    "imageUrl": "https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&q=80&w=800",
    "targetCareer": "Database Administrator",
    "checklist": [
      {
        "title": "Mengelola Struktur Basis Data",
        "detail": "Mengelola struktur basis data dan mengatur tabel",
        "code": "CREATE TABLE users (id INT PRIMARY KEY, name VARCHAR(255))"
      },
      {
        "title": "Mengatur Keamanan",
        "detail": "Mengatur keamanan basis data dan mengatur hak akses",
        "code": "GRANT SELECT ON users TO 'user1'@'localhost'"
      },
      {
        "title": "Mengoptimalkan Kinerja",
        "detail": "Mengoptimalkan kinerja basis data dan mengatur indeks",
        "code": "CREATE INDEX idx_name ON users (name)"
      },
      {
        "title": "Mengujikan Basis Data",
        "detail": "Mengujikan basis data dan mengatur cadangan",
        "code": "mysqldump -u user1 -p database > backup.sql"
      }
    ],
    "resources": [
      {
        "title": "MySQL Documentation",
        "url": "https://dev.mysql.com/doc/"
      }
    ]
  },
  {
    "id": "proj-db-admin-2",
    "title": "Mengelola Basis Data NoSQL",
    "description": "Mengelola basis data NoSQL untuk perusahaan kecil. Proyek ini melibatkan mengelola struktur basis data, mengatur keamanan, dan mengoptimalkan kinerja.",
    "difficulty": "Ahli",
    "category": "Basis Data",
    "skills": [
      "MongoDB",
      "Cassandra",
      "Redis"
    ],
    "imageUrl": "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?auto=format&fit=crop&q=80&w=800",
    "targetCareer": "Database Administrator",
    "checklist": [
      {
        "title": "Mengelola Struktur Basis Data",
        "detail": "Mengelola struktur basis data dan mengatur koleksi",
        "code": "db.createCollection('users')"
      },
      {
        "title": "Mengatur Keamanan",
        "detail": "Mengatur keamanan basis data dan mengatur hak akses",
        "code": "db.createUser({ user: 'user1', pwd: 'password', roles: ['readWrite'] })"
      },
      {
        "title": "Mengoptimalkan Kinerja",
        "detail": "Mengoptimalkan kinerja basis data dan mengatur indeks",
        "code": "db.users.createIndex({ name: 1 })"
      },
      {
        "title": "Mengujikan Basis Data",
        "detail": "Mengujikan basis data dan mengatur cadangan",
        "code": "mongodump -u user1 -p database > backup.json"
      }
    ],
    "resources": [
      {
        "title": "MongoDB Documentation",
        "url": "https://docs.mongodb.com/"
      }
    ]
  },
  {
    "id": "proj-tel-eng-1",
    "title": "Mengelola Jaringan Telekomunikasi",
    "description": "Mengelola jaringan telekomunikasi untuk perusahaan kecil. Proyek ini melibatkan mengelola jaringan, mengatur keamanan, dan mengoptimalkan kinerja.",
    "difficulty": "Menengah",
    "category": "Telekomunikasi",
    "skills": [
      "Cisco",
      "Mikrotik",
      "TCP/IP"
    ],
    "imageUrl": "https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&q=80&w=800",
    "targetCareer": "Telecommunications Engineer",
    "checklist": [
      {
        "title": "Mengelola Jaringan",
        "detail": "Mengelola jaringan telekomunikasi dan mengatur konfigurasi",
        "code": ""
      },
      {
        "title": "Mengatur Keamanan",
        "detail": "Mengatur keamanan jaringan dan mengatur firewall",
        "code": ""
      },
      {
        "title": "Mengoptimalkan Kinerja",
        "detail": "Mengoptimalkan kinerja jaringan dan mengatur QoS",
        "code": ""
      },
      {
        "title": "Mengujikan Jaringan",
        "detail": "Mengujikan jaringan dan mengatur cadangan",
        "code": ""
      }
    ],
    "resources": [
      {
        "title": "Cisco Documentation",
        "url": "https://www.cisco.com/c/en/us/support/docs.html"
      }
    ]
  },
  {
    "id": "proj-tel-eng-2",
    "title": "Mengelola Sistem Telekomunikasi",
    "description": "Mengelola sistem telekomunikasi untuk perusahaan kecil. Proyek ini melibatkan mengelola sistem, mengatur keamanan, dan mengoptimalkan kinerja.",
    "difficulty": "Ahli",
    "category": "Telekomunikasi",
    "skills": [
      "VoIP",
      "SIP",
      "H.323"
    ],
    "imageUrl": "https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&q=80&w=800",
    "targetCareer": "Telecommunications Engineer",
    "checklist": [
      {
        "title": "Mengelola Sistem",
        "detail": "Mengelola sistem telekomunikasi dan mengatur konfigurasi",
        "code": ""
      },
      {
        "title": "Mengatur Keamanan",
        "detail": "Mengatur keamanan sistem dan mengatur firewall",
        "code": ""
      },
      {
        "title": "Mengoptimalkan Kinerja",
        "detail": "Mengoptimalkan kinerja sistem dan mengatur QoS",
        "code": ""
      },
      {
        "title": "Mengujikan Sistem",
        "detail": "Mengujikan sistem dan mengatur cadangan",
        "code": ""
      }
    ],
    "resources": [
      {
        "title": "Asterisk Documentation",
        "url": "https://www.asterisk.org/docs/"
      }
    ]
  },
  {
    "id": "proj-ds-1",
    "title": "Analisis Data Penjualan",
    "description": "Membuat model prediksi penjualan berdasarkan data historis penjualan. Proyek ini memerlukan kemampuan analisis data dan penggunaan algoritma machine learning untuk memprediksi tren penjualan.",
    "difficulty": "Menengah",
    "category": "Data & AI",
    "skills": [
      "Python",
      "Pandas",
      "Scikit-learn"
    ],
    "imageUrl": "https://images.unsplash.com/photo-1684369175833-8b77a161c28b?auto=format&fit=crop&q=80&w=800",
    "targetCareer": "Data Scientist",
    "checklist": [
      {
        "title": "Mengumpulkan Data",
        "detail": "Mengumpulkan data penjualan historis dari berbagai sumber",
        "code": "import pandas as pd; df = pd.read_csv('data.csv')"
      },
      {
        "title": "Mengolah Data",
        "detail": "Mengolah data untuk menghilangkan missing value dan melakukan normalisasi",
        "code": "df.fillna(df.mean()); df = df.apply(lambda x: (x - x.min()) / (x.max() - x.min()))"
      },
      {
        "title": "Membuat Model",
        "detail": "Membuat model prediksi penjualan menggunakan algoritma machine learning",
        "code": "from sklearn.ensemble import RandomForestRegressor; model = RandomForestRegressor(); model.fit(X_train, y_train)"
      },
      {
        "title": "Mengevaluasi Model",
        "detail": "Mengevaluasi performa model menggunakan metrik evaluasi",
        "code": "from sklearn.metrics import mean_squared_error; mse = mean_squared_error(y_test, y_pred)"
      }
    ],
    "resources": [
      {
        "title": "Dokumentasi Pandas",
        "url": "https://pandas.pydata.org/docs/"
      }
    ]
  },
  {
    "id": "proj-ds-2",
    "title": "Visualisasi Data Kesehatan",
    "description": "Membuat visualisasi data kesehatan untuk membantu memahami tren dan pola dalam data. Proyek ini memerlukan kemampuan visualisasi data dan penggunaan library seperti Matplotlib dan Seaborn.",
    "difficulty": "Pemula",
    "category": "Data & AI",
    "skills": [
      "Python",
      "Matplotlib",
      "Seaborn"
    ],
    "imageUrl": "https://images.unsplash.com/photo-1620712948343-0008ece88852?auto=format&fit=crop&q=80&w=800",
    "targetCareer": "Data Scientist",
    "checklist": [
      {
        "title": "Mengumpulkan Data",
        "detail": "Mengumpulkan data kesehatan dari berbagai sumber",
        "code": "import pandas as pd; df = pd.read_csv('data.csv')"
      },
      {
        "title": "Mengolah Data",
        "detail": "Mengolah data untuk menghilangkan missing value dan melakukan normalisasi",
        "code": "df.fillna(df.mean()); df = df.apply(lambda x: (x - x.min()) / (x.max() - x.min()))"
      },
      {
        "title": "Membuat Visualisasi",
        "detail": "Membuat visualisasi data menggunakan library Matplotlib dan Seaborn",
        "code": "import matplotlib.pyplot as plt; plt.plot(df['x'], df['y'])"
      },
      {
        "title": "Menginterpretasikan Hasil",
        "detail": "Menginterpretasikan hasil visualisasi data untuk memahami tren dan pola",
        "code": ""
      }
    ],
    "resources": [
      {
        "title": "Dokumentasi Matplotlib",
        "url": "https://matplotlib.org/stable/index.html"
      }
    ]
  },
  {
    "id": "proj-ai-1",
    "title": "Pengenalan Wajah",
    "description": "Membuat sistem pengenalan wajah menggunakan algoritma deep learning. Proyek ini memerlukan kemampuan penggunaan library seperti TensorFlow dan Keras.",
    "difficulty": "Ahli",
    "category": "AI & ML",
    "skills": [
      "Python",
      "TensorFlow",
      "Keras"
    ],
    "imageUrl": "https://images.unsplash.com/photo-1620712948343-0008ece88852?auto=format&fit=crop&q=80&w=800",
    "targetCareer": "AI/ML Engineer",
    "checklist": [
      {
        "title": "Mengumpulkan Data",
        "detail": "Mengumpulkan data wajah dari berbagai sumber",
        "code": "import pandas as pd; df = pd.read_csv('data.csv')"
      },
      {
        "title": "Mengolah Data",
        "detail": "Mengolah data untuk menghilangkan missing value dan melakukan normalisasi",
        "code": "df.fillna(df.mean()); df = df.apply(lambda x: (x - x.min()) / (x.max() - x.min()))"
      },
      {
        "title": "Membuat Model",
        "detail": "Membuat model pengenalan wajah menggunakan algoritma deep learning",
        "code": "from tensorflow.keras.models import Sequential; model = Sequential(); model.add(Conv2D(32, (3, 3), activation='relu', input_shape=(224, 224, 3)))"
      },
      {
        "title": "Mengevaluasi Model",
        "detail": "Mengevaluasi performa model menggunakan metrik evaluasi",
        "code": "from sklearn.metrics import accuracy_score; accuracy = accuracy_score(y_test, y_pred)"
      }
    ],
    "resources": [
      {
        "title": "Dokumentasi TensorFlow",
        "url": "https://www.tensorflow.org/docs"
      }
    ]
  },
  {
    "id": "proj-ai-2",
    "title": "Pengenalan Suara",
    "description": "Membuat sistem pengenalan suara menggunakan algoritma deep learning. Proyek ini memerlukan kemampuan penggunaan library seperti TensorFlow dan Keras.",
    "difficulty": "Ahli",
    "category": "AI & ML",
    "skills": [
      "Python",
      "TensorFlow",
      "Keras"
    ],
    "imageUrl": "https://images.unsplash.com/photo-1684369175833-8b77a161c28b?auto=format&fit=crop&q=80&w=800",
    "targetCareer": "AI/ML Engineer",
    "checklist": [
      {
        "title": "Mengumpulkan Data",
        "detail": "Mengumpulkan data suara dari berbagai sumber",
        "code": "import pandas as pd; df = pd.read_csv('data.csv')"
      },
      {
        "title": "Mengolah Data",
        "detail": "Mengolah data untuk menghilangkan missing value dan melakukan normalisasi",
        "code": "df.fillna(df.mean()); df = df.apply(lambda x: (x - x.min()) / (x.max() - x.min()))"
      },
      {
        "title": "Membuat Model",
        "detail": "Membuat model pengenalan suara menggunakan algoritma deep learning",
        "code": "from tensorflow.keras.models import Sequential; model = Sequential(); model.add(Conv2D(32, (3, 3), activation='relu', input_shape=(224, 224, 3)))"
      },
      {
        "title": "Mengevaluasi Model",
        "detail": "Mengevaluasi performa model menggunakan metrik evaluasi",
        "code": "from sklearn.metrics import accuracy_score; accuracy = accuracy_score(y_test, y_pred)"
      }
    ],
    "resources": [
      {
        "title": "Dokumentasi TensorFlow",
        "url": "https://www.tensorflow.org/docs"
      }
    ]
  },
  {
    "id": "proj-de-1",
    "title": "Membangun Data Warehouse",
    "description": "Membangun data warehouse untuk menyimpan dan mengelola data besar. Proyek ini memerlukan kemampuan penggunaan teknologi seperti Hadoop dan Spark.",
    "difficulty": "Ahli",
    "category": "Data Engineering",
    "skills": [
      "Hadoop",
      "Spark",
      "SQL"
    ],
    "imageUrl": "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&q=80&w=800",
    "targetCareer": "Data Engineer",
    "checklist": [
      {
        "title": "Mengumpulkan Data",
        "detail": "Mengumpulkan data dari berbagai sumber",
        "code": "import pandas as pd; df = pd.read_csv('data.csv')"
      },
      {
        "title": "Mengolah Data",
        "detail": "Mengolah data untuk menghilangkan missing value dan melakukan normalisasi",
        "code": "df.fillna(df.mean()); df = df.apply(lambda x: (x - x.min()) / (x.max() - x.min()))"
      },
      {
        "title": "Membangun Data Warehouse",
        "detail": "Membangun data warehouse menggunakan teknologi seperti Hadoop dan Spark",
        "code": "from pyspark.sql import SparkSession; spark = SparkSession.builder.appName('Data Warehouse').getOrCreate()"
      },
      {
        "title": "Mengelola Data",
        "detail": "Mengelola data dalam data warehouse menggunakan SQL",
        "code": "from pyspark.sql import SQLContext; sqlContext = SQLContext(spark); df = sqlContext.read.format('csv').option('header', 'true').load('data.csv')"
      }
    ],
    "resources": [
      {
        "title": "Dokumentasi Hadoop",
        "url": "https://hadoop.apache.org/docs/"
      }
    ]
  },
  {
    "id": "proj-de-2",
    "title": "Membangun Pipeline Data",
    "description": "Membangun pipeline data untuk mengelola data secara otomatis. Proyek ini memerlukan kemampuan penggunaan teknologi seperti Apache Beam dan Apache Airflow.",
    "difficulty": "Ahli",
    "category": "Data Engineering",
    "skills": [
      "Apache Beam",
      "Apache Airflow",
      "SQL"
    ],
    "imageUrl": "https://images.unsplash.com/photo-1620712948343-0008ece88852?auto=format&fit=crop&q=80&w=800",
    "targetCareer": "Data Engineer",
    "checklist": [
      {
        "title": "Mengumpulkan Data",
        "detail": "Mengumpulkan data dari berbagai sumber",
        "code": "import pandas as pd; df = pd.read_csv('data.csv')"
      },
      {
        "title": "Mengolah Data",
        "detail": "Mengolah data untuk menghilangkan missing value dan melakukan normalisasi",
        "code": "df.fillna(df.mean()); df = df.apply(lambda x: (x - x.min()) / (x.max() - x.min()))"
      },
      {
        "title": "Membangun Pipeline Data",
        "detail": "Membangun pipeline data menggunakan teknologi seperti Apache Beam dan Apache Airflow",
        "code": "from apache_beam.options.pipeline_options import PipelineOptions; options = PipelineOptions(); pipeline = beam.Pipeline(options=options)"
      },
      {
        "title": "Mengelola Data",
        "detail": "Mengelola data dalam pipeline data menggunakan SQL",
        "code": "from apache_beam.options.pipeline_options import PipelineOptions; options = PipelineOptions(); pipeline = beam.Pipeline(options=options); query = 'SELECT * FROM table'"
      }
    ],
    "resources": [
      {
        "title": "Dokumentasi Apache Beam",
        "url": "https://beam.apache.org/documentation/"
      }
    ]
  },
  {
    "id": "proj-da-1",
    "title": "Analisis Data Penjualan",
    "description": "Membuat analisis data penjualan untuk membantu memahami tren dan pola dalam data. Proyek ini memerlukan kemampuan analisis data dan penggunaan library seperti Pandas dan Matplotlib.",
    "difficulty": "Pemula",
    "category": "Data Analysis",
    "skills": [
      "Python",
      "Pandas",
      "Matplotlib"
    ],
    "imageUrl": "https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&q=80&w=800",
    "targetCareer": "Data Analyst",
    "checklist": [
      {
        "title": "Mengumpulkan Data",
        "detail": "Mengumpulkan data penjualan dari berbagai sumber",
        "code": "import pandas as pd; df = pd.read_csv('data.csv')"
      },
      {
        "title": "Mengolah Data",
        "detail": "Mengolah data untuk menghilangkan missing value dan melakukan normalisasi",
        "code": "df.fillna(df.mean()); df = df.apply(lambda x: (x - x.min()) / (x.max() - x.min()))"
      },
      {
        "title": "Membuat Visualisasi",
        "detail": "Membuat visualisasi data menggunakan library Matplotlib",
        "code": "import matplotlib.pyplot as plt; plt.plot(df['x'], df['y'])"
      },
      {
        "title": "Menginterpretasikan Hasil",
        "detail": "Menginterpretasikan hasil analisis data untuk memahami tren dan pola",
        "code": ""
      }
    ],
    "resources": [
      {
        "title": "Dokumentasi Pandas",
        "url": "https://pandas.pydata.org/docs/"
      }
    ]
  },
  {
    "id": "proj-da-2",
    "title": "Membuat Laporan Data",
    "description": "Membuat laporan data untuk membantu memahami tren dan pola dalam data. Proyek ini memerlukan kemampuan analisis data dan penggunaan library seperti Pandas dan Matplotlib.",
    "difficulty": "Pemula",
    "category": "Data Analysis",
    "skills": [
      "Python",
      "Pandas",
      "Matplotlib"
    ],
    "imageUrl": "https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&q=80&w=800",
    "targetCareer": "Data Analyst",
    "checklist": [
      {
        "title": "Mengumpulkan Data",
        "detail": "Mengumpulkan data dari berbagai sumber",
        "code": "import pandas as pd; df = pd.read_csv('data.csv')"
      },
      {
        "title": "Mengolah Data",
        "detail": "Mengolah data untuk menghilangkan missing value dan melakukan normalisasi",
        "code": "df.fillna(df.mean()); df = df.apply(lambda x: (x - x.min()) / (x.max() - x.min()))"
      },
      {
        "title": "Membuat Laporan",
        "detail": "Membuat laporan data menggunakan library Matplotlib",
        "code": "import matplotlib.pyplot as plt; plt.plot(df['x'], df['y'])"
      },
      {
        "title": "Menginterpretasikan Hasil",
        "detail": "Menginterpretasikan hasil analisis data untuk memahami tren dan pola",
        "code": ""
      }
    ],
    "resources": [
      {
        "title": "Dokumentasi Pandas",
        "url": "https://pandas.pydata.org/docs/"
      }
    ]
  },
  {
    "id": "proj-nlp-1",
    "title": "Pengenalan Sentimen",
    "description": "Membuat sistem pengenalan sentimen untuk membantu memahami sentimen dalam teks. Proyek ini memerlukan kemampuan penggunaan library seperti NLTK dan spaCy.",
    "difficulty": "Menengah",
    "category": "NLP",
    "skills": [
      "Python",
      "NLTK",
      "spaCy"
    ],
    "imageUrl": "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&q=80&w=800",
    "targetCareer": "NLP Engineer",
    "checklist": [
      {
        "title": "Mengumpulkan Data",
        "detail": "Mengumpulkan data teks dari berbagai sumber",
        "code": "import pandas as pd; df = pd.read_csv('data.csv')"
      },
      {
        "title": "Mengolah Data",
        "detail": "Mengolah data untuk menghilangkan missing value dan melakukan normalisasi",
        "code": "df.fillna(df.mean()); df = df.apply(lambda x: (x - x.min()) / (x.max() - x.min()))"
      },
      {
        "title": "Membuat Model",
        "detail": "Membuat model pengenalan sentimen menggunakan library NLTK dan spaCy",
        "code": "from nltk.sentiment.vader import SentimentIntensityAnalyzer; sia = SentimentIntensityAnalyzer(); sentiment = sia.polarity_scores(df['text'])"
      },
      {
        "title": "Menginterpretasikan Hasil",
        "detail": "Menginterpretasikan hasil analisis sentimen untuk memahami sentimen dalam teks",
        "code": ""
      }
    ],
    "resources": [
      {
        "title": "Dokumentasi NLTK",
        "url": "https://www.nltk.org/book/"
      }
    ]
  },
  {
    "id": "proj-cv-object-detection",
    "title": "Deteksi Objek pada Gambar",
    "description": "Membuat sistem deteksi objek pada gambar menggunakan teknik Computer Vision untuk mendeteksi objek-objek tertentu. Proyek ini memerlukan kemampuan dalam memproses gambar dan menerapkan algoritma pembelajaran mesin.",
    "difficulty": "Menengah",
    "category": "Data & AI",
    "skills": [
      "Python",
      "OpenCV",
      "TensorFlow"
    ],
    "imageUrl": "https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&q=80&w=800",
    "targetCareer": "Computer Vision Engineer",
    "checklist": [
      {
        "title": "Mempersiapkan Dataset",
        "detail": "Mengumpulkan dan mempersiapkan dataset gambar untuk pelatihan model",
        "code": "import os\nimport cv2"
      },
      {
        "title": "Membuat Model Deteksi Objek",
        "detail": "Membuat model deteksi objek menggunakan TensorFlow dan OpenCV",
        "code": "from tensorflow.keras.models import Sequential\nfrom tensorflow.keras.layers import Conv2D"
      },
      {
        "title": "Melatih Model",
        "detail": "Melatih model dengan dataset yang telah disiapkan",
        "code": "model.fit(X_train, y_train, epochs=10)"
      },
      {
        "title": "Menguji Model",
        "detail": "Menguji model dengan dataset uji untuk mengevaluasi performa",
        "code": "model.evaluate(X_test, y_test)"
      }
    ],
    "resources": [
      {
        "title": "Dokumentasi OpenCV",
        "url": "https://docs.opencv.org/"
      }
    ]
  },
  {
    "id": "proj-cv-image-segmentation",
    "title": "Segmentasi Gambar",
    "description": "Membuat sistem segmentasi gambar untuk memisahkan objek-objek dalam gambar. Proyek ini memerlukan kemampuan dalam memproses gambar dan menerapkan algoritma pembelajaran mesin.",
    "difficulty": "Ahli",
    "category": "Data & AI",
    "skills": [
      "Python",
      "OpenCV",
      "PyTorch"
    ],
    "imageUrl": "https://images.unsplash.com/photo-1620712948343-0008ece88852?auto=format&fit=crop&q=80&w=800",
    "targetCareer": "Computer Vision Engineer",
    "checklist": [
      {
        "title": "Mempersiapkan Dataset",
        "detail": "Mengumpulkan dan mempersiapkan dataset gambar untuk pelatihan model",
        "code": "import os\nimport cv2"
      },
      {
        "title": "Membuat Model Segmentasi",
        "detail": "Membuat model segmentasi menggunakan PyTorch dan OpenCV",
        "code": "from torch.nn import Module\nfrom torch.nn import Conv2d"
      },
      {
        "title": "Melatih Model",
        "detail": "Melatih model dengan dataset yang telah disiapkan",
        "code": "model.fit(X_train, y_train, epochs=10)"
      },
      {
        "title": "Menguji Model",
        "detail": "Menguji model dengan dataset uji untuk mengevaluasi performa",
        "code": "model.evaluate(X_test, y_test)"
      }
    ],
    "resources": [
      {
        "title": "Dokumentasi PyTorch",
        "url": "https://pytorch.org/docs/stable/index.html"
      }
    ]
  },
  {
    "id": "proj-bi-dashboard",
    "title": "Membuat Dashboard Bisnis",
    "description": "Membuat dashboard bisnis untuk memvisualisasikan data dan membantu dalam pengambilan keputusan. Proyek ini memerlukan kemampuan dalam menganalisis data dan membuat visualisasi.",
    "difficulty": "Menengah",
    "category": "Data & AI",
    "skills": [
      "Python",
      "Tableau",
      "Power BI"
    ],
    "imageUrl": "https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&q=80&w=800",
    "targetCareer": "Business Intelligence Analyst",
    "checklist": [
      {
        "title": "Mengumpulkan Data",
        "detail": "Mengumpulkan data dari berbagai sumber untuk dianalisis",
        "code": "import pandas as pd"
      },
      {
        "title": "Membuat Visualisasi",
        "detail": "Membuat visualisasi data menggunakan Tableau atau Power BI",
        "code": "import matplotlib.pyplot as plt"
      },
      {
        "title": "Membuat Dashboard",
        "detail": "Membuat dashboard untuk memvisualisasikan data",
        "code": "import dash\nimport dash_core_components as dcc"
      },
      {
        "title": "Menguji Dashboard",
        "detail": "Menguji dashboard untuk memastikan bahwa semua fungsi berjalan dengan baik",
        "code": "import unittest"
      }
    ],
    "resources": [
      {
        "title": "Dokumentasi Tableau",
        "url": "https://help.tableau.com/current/pro/desktop/en-us/index.html"
      }
    ]
  },
  {
    "id": "proj-bi-report",
    "title": "Membuat Laporan Bisnis",
    "description": "Membuat laporan bisnis untuk memvisualisasikan data dan membantu dalam pengambilan keputusan. Proyek ini memerlukan kemampuan dalam menganalisis data dan membuat visualisasi.",
    "difficulty": "Pemula",
    "category": "Data & AI",
    "skills": [
      "Python",
      "Excel",
      "SQL"
    ],
    "imageUrl": "https://images.unsplash.com/photo-1620712948343-0008ece88852?auto=format&fit=crop&q=80&w=800",
    "targetCareer": "Business Intelligence Analyst",
    "checklist": [
      {
        "title": "Mengumpulkan Data",
        "detail": "Mengumpulkan data dari berbagai sumber untuk dianalisis",
        "code": "import pandas as pd"
      },
      {
        "title": "Membuat Visualisasi",
        "detail": "Membuat visualisasi data menggunakan Excel atau SQL",
        "code": "import matplotlib.pyplot as plt"
      },
      {
        "title": "Membuat Laporan",
        "detail": "Membuat laporan untuk memvisualisasikan data",
        "code": "import docx"
      },
      {
        "title": "Menguji Laporan",
        "detail": "Menguji laporan untuk memastikan bahwa semua fungsi berjalan dengan baik",
        "code": "import unittest"
      }
    ],
    "resources": [
      {
        "title": "Dokumentasi Excel",
        "url": "https://support.microsoft.com/en-us/office/excel-functions-reference-5f91f8e2-7b1a-46d7-a9dc-1f263916c326"
      }
    ]
  },
  {
    "id": "proj-mlops-deployment",
    "title": "Mendeploy Model Machine Learning",
    "description": "Mendeploy model machine learning ke dalam produksi untuk digunakan dalam aplikasi. Proyek ini memerlukan kemampuan dalam mendeploy model dan memantau performa.",
    "difficulty": "Ahli",
    "category": "Data & AI",
    "skills": [
      "Python",
      "TensorFlow",
      "Kubernetes"
    ],
    "imageUrl": "https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&q=80&w=800",
    "targetCareer": "MLOps Engineer",
    "checklist": [
      {
        "title": "Mempersiapkan Model",
        "detail": "Mempersiapkan model machine learning untuk dideskripsikan",
        "code": "import tensorflow as tf"
      },
      {
        "title": "Mendeskripsikan Model",
        "detail": "Mendeskripsikan model menggunakan TensorFlow",
        "code": "tf.keras.models.save_model(model, 'model.h5')"
      },
      {
        "title": "Mendeploy Model",
        "detail": "Mendeploy model ke dalam produksi menggunakan Kubernetes",
        "code": "kubectl apply -f deployment.yaml"
      },
      {
        "title": "Memantau Performa",
        "detail": "Memantau performa model untuk memastikan bahwa model berjalan dengan baik",
        "code": "import prometheus_client"
      }
    ],
    "resources": [
      {
        "title": "Dokumentasi TensorFlow",
        "url": "https://www.tensorflow.org/docs"
      }
    ]
  },
  {
    "id": "proj-mlops-monitoring",
    "title": "Memantau Model Machine Learning",
    "description": "Memantau model machine learning untuk memastikan bahwa model berjalan dengan baik dan melakukan tindakan yang diperlukan jika model tidak berjalan dengan baik. Proyek ini memerlukan kemampuan dalam memantau model dan melakukan tindakan yang diperlukan.",
    "difficulty": "Menengah",
    "category": "Data & AI",
    "skills": [
      "Python",
      "Prometheus",
      "Grafana"
    ],
    "imageUrl": "https://images.unsplash.com/photo-1620712948343-0008ece88852?auto=format&fit=crop&q=80&w=800",
    "targetCareer": "MLOps Engineer",
    "checklist": [
      {
        "title": "Mengkonfigurasi Prometheus",
        "detail": "Mengkonfigurasi Prometheus untuk memantau model",
        "code": "import prometheus_client"
      },
      {
        "title": "Mengkonfigurasi Grafana",
        "detail": "Mengkonfigurasi Grafana untuk memvisualisasikan data",
        "code": "import grafana_client"
      },
      {
        "title": "Memantau Model",
        "detail": "Memantau model untuk memastikan bahwa model berjalan dengan baik",
        "code": "import prometheus_client"
      },
      {
        "title": "Melakukan Tindakan",
        "detail": "Melakukan tindakan yang diperlukan jika model tidak berjalan dengan baik",
        "code": "import warnings"
      }
    ],
    "resources": [
      {
        "title": "Dokumentasi Prometheus",
        "url": "https://prometheus.io/docs/introduction/overview/"
      }
    ]
  },
  {
    "id": "proj-cyber-security-audit",
    "title": "Mengaudit Keamanan Sistem",
    "description": "Mengaudit keamanan sistem untuk memastikan bahwa sistem aman dari serangan. Proyek ini memerlukan kemampuan dalam mengaudit keamanan sistem dan melakukan tindakan yang diperlukan.",
    "difficulty": "Ahli",
    "category": "Cyber Security",
    "skills": [
      "Python",
      "Nmap",
      "Burp Suite"
    ],
    "imageUrl": "https://images.unsplash.com/photo-1555562151-54b9f07fe758?auto=format&fit=crop&q=80&w=800",
    "targetCareer": "Cyber Security Analyst",
    "checklist": [
      {
        "title": "Mengidentifikasi Kerentanan",
        "detail": "Mengidentifikasi kerentanan sistem untuk memastikan bahwa sistem aman",
        "code": "import nmap"
      },
      {
        "title": "Mengaudit Konfigurasi",
        "detail": "Mengaudit konfigurasi sistem untuk memastikan bahwa konfigurasi aman",
        "code": "import paramiko"
      },
      {
        "title": "Menguji Keamanan",
        "detail": "Menguji keamanan sistem untuk memastikan bahwa sistem aman dari serangan",
        "code": "import requests"
      },
      {
        "title": "Melakukan Tindakan",
        "detail": "Melakukan tindakan yang diperlukan jika sistem tidak aman",
        "code": "import warnings"
      }
    ],
    "resources": [
      {
        "title": "Dokumentasi Nmap",
        "url": "https://nmap.org/book/toc.html"
      }
    ]
  },
  {
    "id": "proj-cyber-security-incident-response",
    "title": "Menanggapi Insiden Keamanan",
    "description": "Menanggapi insiden keamanan untuk memastikan bahwa sistem aman dari serangan. Proyek ini memerlukan kemampuan dalam menanggapi insiden keamanan dan melakukan tindakan yang diperlukan.",
    "difficulty": "Menengah",
    "category": "Cyber Security",
    "skills": [
      "Python",
      "Incident Response",
      "Forensik"
    ],
    "imageUrl": "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&q=80&w=800",
    "targetCareer": "Cyber Security Analyst",
    "checklist": [
      {
        "title": "Mengidentifikasi Insiden",
        "detail": "Mengidentifikasi insiden keamanan untuk memastikan bahwa sistem aman",
        "code": "import logging"
      },
      {
        "title": "Mengumpulkan Bukti",
        "detail": "Mengumpulkan bukti insiden keamanan untuk memastikan bahwa sistem aman",
        "code": "import forensic"
      },
      {
        "title": "Menganalisis Bukti",
        "detail": "Menganalisis bukti insiden keamanan untuk memastikan bahwa sistem aman",
        "code": "import analysis"
      },
      {
        "title": "Melakukan Tindakan",
        "detail": "Melakukan tindakan yang diperlukan jika sistem tidak aman",
        "code": "import warnings"
      }
    ],
    "resources": [
      {
        "title": "Dokumentasi Incident Response",
        "url": "https://www.incidentresponse.com/"
      }
    ]
  },
  {
    "id": "proj-penetration-testing-web",
    "title": "Menguji Penetrasi Web",
    "description": "Menguji penetrasi web untuk memastikan bahwa sistem aman dari serangan. Proyek ini memerlukan kemampuan dalam menguji penetrasi web dan melakukan tindakan yang diperlukan.",
    "difficulty": "Ahli",
    "category": "Cyber Security",
    "skills": [
      "Python",
      "Burp Suite",
      "ZAP"
    ],
    "imageUrl": "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&q=80&w=800",
    "targetCareer": "Penetration Tester",
    "checklist": [
      {
        "title": "Mengidentifikasi Kerentanan",
        "detail": "Mengidentifikasi kerentanan web untuk memastikan bahwa sistem aman",
        "code": "import requests"
      },
      {
        "title": "Menguji Keamanan",
        "detail": "Menguji keamanan web untuk memastikan bahwa sistem aman dari serangan",
        "code": "import burp"
      },
      {
        "title": "Menganalisis Hasil",
        "detail": "Menganalisis hasil pengujian untuk memastikan bahwa sistem aman",
        "code": "import analysis"
      },
      {
        "title": "Melakukan Tindakan",
        "detail": "Melakukan tindakan yang diperlukan jika sistem tidak aman",
        "code": "import warnings"
      }
    ],
    "resources": [
      {
        "title": "Dokumentasi Burp Suite",
        "url": "https://portswigger.net/burp/documentation"
      }
    ]
  },
  {
    "id": "proj-penetration-testing-network",
    "title": "Menguji Penetrasi Jaringan",
    "description": "Menguji penetrasi jaringan untuk memastikan bahwa sistem aman dari serangan. Proyek ini memerlukan kemampuan dalam menguji penetrasi jaringan dan melakukan tindakan yang diperlukan.",
    "difficulty": "Menengah",
    "category": "Cyber Security",
    "skills": [
      "Python",
      "Nmap",
      "Metasploit"
    ],
    "imageUrl": "https://images.unsplash.com/photo-1563206767-5b18f218e8de?auto=format&fit=crop&q=80&w=800",
    "targetCareer": "Penetration Tester",
    "checklist": [
      {
        "title": "Mengidentifikasi Kerentanan",
        "detail": "Mengidentifikasi kerentanan jaringan untuk memastikan bahwa sistem aman",
        "code": "import nmap"
      },
      {
        "title": "Menguji Keamanan",
        "detail": "Menguji keamanan jaringan untuk memastikan bahwa sistem aman dari serangan",
        "code": "import metasploit"
      },
      {
        "title": "Menganalisis Hasil",
        "detail": "Menganalisis hasil pengujian untuk memastikan bahwa sistem aman",
        "code": "import analysis"
      },
      {
        "title": "Melakukan Tindakan",
        "detail": "Melakukan tindakan yang diperlukan jika sistem tidak aman",
        "code": "import warnings"
      }
    ]
  },
  {
    "id": "proj-sec-arsitek-1",
    "title": "Desain Arsitektur Keamanan Jaringan",
    "description": "Membuat desain arsitektur keamanan jaringan yang efektif untuk melindungi sistem dan data dari serangan siber. Proyek ini memerlukan analisis kebutuhan keamanan, identifikasi ancaman, dan implementasi kontrol keamanan yang sesuai.",
    "difficulty": "Ahli",
    "category": "Cyber Security",
    "skills": [
      "Keamanan Jaringan",
      "Arsitektur Keamanan",
      "Analisis Ancaman"
    ],
    "imageUrl": "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&q=80&w=800",
    "targetCareer": "Security Architect",
    "checklist": [
      {
        "title": "Analisis Kebutuhan Keamanan",
        "detail": "Identifikasi kebutuhan keamanan sistem dan data",
        "code": ""
      },
      {
        "title": "Identifikasi Ancaman",
        "detail": "Identifikasi ancaman potensial terhadap sistem dan data",
        "code": ""
      },
      {
        "title": "Desain Arsitektur Keamanan",
        "detail": "Membuat desain arsitektur keamanan yang efektif",
        "code": ""
      },
      {
        "title": "Implementasi Kontrol Keamanan",
        "detail": "Mengimplementasikan kontrol keamanan yang sesuai",
        "code": ""
      }
    ],
    "resources": [
      {
        "title": "NIST Cybersecurity Framework",
        "url": "https://www.nist.gov/publications/cybersecurity-framework"
      }
    ]
  },
  {
    "id": "proj-sec-arsitek-2",
    "title": "Implementasi Sistem Keamanan Informasi",
    "description": "Mengimplementasikan sistem keamanan informasi yang efektif untuk melindungi data dan sistem dari serangan siber. Proyek ini memerlukan analisis kebutuhan keamanan, identifikasi ancaman, dan implementasi kontrol keamanan yang sesuai.",
    "difficulty": "Ahli",
    "category": "Cyber Security",
    "skills": [
      "Keamanan Informasi",
      "Sistem Keamanan",
      "Analisis Ancaman"
    ],
    "imageUrl": "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&q=80&w=800",
    "targetCareer": "Security Architect",
    "checklist": [
      {
        "title": "Analisis Kebutuhan Keamanan",
        "detail": "Identifikasi kebutuhan keamanan sistem dan data",
        "code": ""
      },
      {
        "title": "Identifikasi Ancaman",
        "detail": "Identifikasi ancaman potensial terhadap sistem dan data",
        "code": ""
      },
      {
        "title": "Desain Sistem Keamanan",
        "detail": "Membuat desain sistem keamanan yang efektif",
        "code": ""
      },
      {
        "title": "Implementasi Sistem Keamanan",
        "detail": "Mengimplementasikan sistem keamanan yang sesuai",
        "code": ""
      }
    ],
    "resources": [
      {
        "title": "ISO 27001",
        "url": "https://www.iso.org/iso-27001-information-security.html"
      }
    ]
  },
  {
    "id": "proj-soc-analisis-1",
    "title": "Analisis Log Keamanan",
    "description": "Menganalisis log keamanan untuk mendeteksi ancaman potensial terhadap sistem dan data. Proyek ini memerlukan kemampuan analisis log, identifikasi ancaman, dan implementasi kontrol keamanan yang sesuai.",
    "difficulty": "Menengah",
    "category": "Cyber Security",
    "skills": [
      "Analisis Log",
      "Keamanan Jaringan",
      "Identifikasi Ancaman"
    ],
    "imageUrl": "https://images.unsplash.com/photo-1555562151-54b9f07fe758?auto=format&fit=crop&q=80&w=800",
    "targetCareer": "SOC Analyst",
    "checklist": [
      {
        "title": "Mengumpulkan Log",
        "detail": "Mengumpulkan log keamanan dari berbagai sumber",
        "code": ""
      },
      {
        "title": "Menganalisis Log",
        "detail": "Menganalisis log keamanan untuk mendeteksi ancaman potensial",
        "code": ""
      },
      {
        "title": "Identifikasi Ancaman",
        "detail": "Identifikasi ancaman potensial terhadap sistem dan data",
        "code": ""
      },
      {
        "title": "Implementasi Kontrol Keamanan",
        "detail": "Mengimplementasikan kontrol keamanan yang sesuai",
        "code": ""
      }
    ],
    "resources": [
      {
        "title": "Splunk",
        "url": "https://www.splunk.com/"
      }
    ]
  },
  {
    "id": "proj-soc-analisis-2",
    "title": "Mengembangkan Sistem Deteksi Ancaman",
    "description": "Mengembangkan sistem deteksi ancaman yang efektif untuk mendeteksi ancaman potensial terhadap sistem dan data. Proyek ini memerlukan kemampuan analisis log, identifikasi ancaman, dan implementasi kontrol keamanan yang sesuai.",
    "difficulty": "Ahli",
    "category": "Cyber Security",
    "skills": [
      "Sistem Deteksi Ancaman",
      "Analisis Log",
      "Identifikasi Ancaman"
    ],
    "imageUrl": "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&q=80&w=800",
    "targetCareer": "SOC Analyst",
    "checklist": [
      {
        "title": "Mengumpulkan Log",
        "detail": "Mengumpulkan log keamanan dari berbagai sumber",
        "code": ""
      },
      {
        "title": "Menganalisis Log",
        "detail": "Menganalisis log keamanan untuk mendeteksi ancaman potensial",
        "code": ""
      },
      {
        "title": "Mengembangkan Sistem Deteksi Ancaman",
        "detail": "Mengembangkan sistem deteksi ancaman yang efektif",
        "code": ""
      },
      {
        "title": "Implementasi Kontrol Keamanan",
        "detail": "Mengimplementasikan kontrol keamanan yang sesuai",
        "code": ""
      }
    ],
    "resources": [
      {
        "title": "ELK Stack",
        "url": "https://www.elastic.co/products"
      }
    ]
  },
  {
    "id": "proj-devsecops-1",
    "title": "Implementasi Pipa Keamanan",
    "description": "Mengimplementasikan pipa keamanan yang efektif untuk melindungi sistem dan data dari serangan siber. Proyek ini memerlukan kemampuan analisis kebutuhan keamanan, identifikasi ancaman, dan implementasi kontrol keamanan yang sesuai.",
    "difficulty": "Menengah",
    "category": "DevSecOps",
    "skills": [
      "Pipa Keamanan",
      "Keamanan Jaringan",
      "Analisis Ancaman"
    ],
    "imageUrl": "https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&q=80&w=800",
    "targetCareer": "DevSecOps Engineer",
    "checklist": [
      {
        "title": "Analisis Kebutuhan Keamanan",
        "detail": "Identifikasi kebutuhan keamanan sistem dan data",
        "code": ""
      },
      {
        "title": "Identifikasi Ancaman",
        "detail": "Identifikasi ancaman potensial terhadap sistem dan data",
        "code": ""
      },
      {
        "title": "Desain Pipa Keamanan",
        "detail": "Membuat desain pipa keamanan yang efektif",
        "code": ""
      },
      {
        "title": "Implementasi Pipa Keamanan",
        "detail": "Mengimplementasikan pipa keamanan yang sesuai",
        "code": ""
      }
    ],
    "resources": [
      {
        "title": "Jenkins",
        "url": "https://www.jenkins.io/"
      }
    ]
  },
  {
    "id": "proj-devsecops-2",
    "title": "Mengembangkan Sistem Keamanan Otomatis",
    "description": "Mengembangkan sistem keamanan otomatis yang efektif untuk melindungi sistem dan data dari serangan siber. Proyek ini memerlukan kemampuan analisis kebutuhan keamanan, identifikasi ancaman, dan implementasi kontrol keamanan yang sesuai.",
    "difficulty": "Ahli",
    "category": "DevSecOps",
    "skills": [
      "Sistem Keamanan Otomatis",
      "Keamanan Jaringan",
      "Analisis Ancaman"
    ],
    "imageUrl": "https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&q=80&w=800",
    "targetCareer": "DevSecOps Engineer",
    "checklist": [
      {
        "title": "Analisis Kebutuhan Keamanan",
        "detail": "Identifikasi kebutuhan keamanan sistem dan data",
        "code": ""
      },
      {
        "title": "Identifikasi Ancaman",
        "detail": "Identifikasi ancaman potensial terhadap sistem dan data",
        "code": ""
      },
      {
        "title": "Mengembangkan Sistem Keamanan Otomatis",
        "detail": "Mengembangkan sistem keamanan otomatis yang efektif",
        "code": ""
      },
      {
        "title": "Implementasi Kontrol Keamanan",
        "detail": "Mengimplementasikan kontrol keamanan yang sesuai",
        "code": ""
      }
    ],
    "resources": [
      {
        "title": "Ansible",
        "url": "https://www.ansible.com/"
      }
    ]
  },
  {
    "id": "proj-mobile-app-1",
    "title": "Mengembangkan Aplikasi Mobile",
    "description": "Mengembangkan aplikasi mobile yang efektif untuk memenuhi kebutuhan pengguna. Proyek ini memerlukan kemampuan analisis kebutuhan pengguna, desain antarmuka pengguna, dan implementasi fitur yang sesuai.",
    "difficulty": "Menengah",
    "category": "Mobile App Development",
    "skills": [
      "Pengembangan Aplikasi Mobile",
      "Desain Antarmuka Pengguna",
      "Analisis Kebutuhan Pengguna"
    ],
    "imageUrl": "https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&q=80&w=800",
    "targetCareer": "Mobile App Developer",
    "checklist": [
      {
        "title": "Analisis Kebutuhan Pengguna",
        "detail": "Identifikasi kebutuhan pengguna",
        "code": ""
      },
      {
        "title": "Desain Antarmuka Pengguna",
        "detail": "Membuat desain antarmuka pengguna yang efektif",
        "code": ""
      },
      {
        "title": "Mengembangkan Aplikasi Mobile",
        "detail": "Mengembangkan aplikasi mobile yang efektif",
        "code": ""
      },
      {
        "title": "Implementasi Fitur",
        "detail": "Mengimplementasikan fitur yang sesuai",
        "code": ""
      }
    ],
    "resources": [
      {
        "title": "React Native",
        "url": "https://reactnative.dev/"
      }
    ]
  },
  {
    "id": "proj-mobile-app-2",
    "title": "Mengoptimalkan Kinerja Aplikasi Mobile",
    "description": "Mengoptimalkan kinerja aplikasi mobile yang efektif untuk memenuhi kebutuhan pengguna. Proyek ini memerlukan kemampuan analisis kinerja, identifikasi bottleneck, dan implementasi optimasi yang sesuai.",
    "difficulty": "Ahli",
    "category": "Mobile App Development",
    "skills": [
      "Optimalkan Kinerja Aplikasi Mobile",
      "Analisis Kinerja",
      "Identifikasi Bottleneck"
    ],
    "imageUrl": "https://images.unsplash.com/photo-1551650975-87deedd944c3?auto=format&fit=crop&q=80&w=800",
    "targetCareer": "Mobile App Developer",
    "checklist": [
      {
        "title": "Analisis Kinerja",
        "detail": "Identifikasi kinerja aplikasi mobile",
        "code": ""
      },
      {
        "title": "Identifikasi Bottleneck",
        "detail": "Identifikasi bottleneck yang mempengaruhi kinerja",
        "code": ""
      },
      {
        "title": "Mengoptimalkan Kinerja",
        "detail": "Mengoptimalkan kinerja aplikasi mobile yang efektif",
        "code": ""
      },
      {
        "title": "Implementasi Optimasi",
        "detail": "Mengimplementasikan optimasi yang sesuai",
        "code": ""
      }
    ],
    "resources": [
      {
        "title": "Android Studio",
        "url": "https://developer.android.com/studio"
      }
    ]
  },
  {
    "id": "proj-android-dev-1",
    "title": "Mengembangkan Aplikasi Android",
    "description": "Mengembangkan aplikasi Android yang efektif untuk memenuhi kebutuhan pengguna. Proyek ini memerlukan kemampuan analisis kebutuhan pengguna, desain antarmuka pengguna, dan implementasi fitur yang sesuai.",
    "difficulty": "Menengah",
    "category": "Android Development",
    "skills": [
      "Pengembangan Aplikasi Android",
      "Desain Antarmuka Pengguna",
      "Analisis Kebutuhan Pengguna"
    ],
    "imageUrl": "https://images.unsplash.com/photo-1620712948343-0008ece88852?auto=format&fit=crop&q=80&w=800",
    "targetCareer": "Android Developer",
    "checklist": [
      {
        "title": "Analisis Kebutuhan Pengguna",
        "detail": "Identifikasi kebutuhan pengguna",
        "code": ""
      },
      {
        "title": "Desain Antarmuka Pengguna",
        "detail": "Membuat desain antarmuka pengguna yang efektif",
        "code": ""
      },
      {
        "title": "Mengembangkan Aplikasi Android",
        "detail": "Mengembangkan aplikasi Android yang efektif",
        "code": ""
      },
      {
        "title": "Implementasi Fitur",
        "detail": "Mengimplementasikan fitur yang sesuai",
        "code": ""
      }
    ],
    "resources": [
      {
        "title": "Kotlin",
        "url": "https://kotlinlang.org/"
      }
    ]
  },
  {
    "id": "proj-android-dev-2",
    "title": "Mengoptimalkan Kinerja Aplikasi Android",
    "description": "Mengoptimalkan kinerja aplikasi Android yang efektif untuk memenuhi kebutuhan pengguna. Proyek ini memerlukan kemampuan analisis kinerja, identifikasi bottleneck, dan implementasi optimasi yang sesuai.",
    "difficulty": "Ahli",
    "category": "Android Development",
    "skills": [
      "Optimalkan Kinerja Aplikasi Android",
      "Analisis Kinerja",
      "Identifikasi Bottleneck"
    ],
    "imageUrl": "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?auto=format&fit=crop&q=80&w=800",
    "targetCareer": "Android Developer",
    "checklist": [
      {
        "title": "Analisis Kinerja",
        "detail": "Identifikasi kinerja aplikasi Android",
        "code": ""
      },
      {
        "title": "Identifikasi Bottleneck",
        "detail": "Identifikasi bottleneck yang mempengaruhi kinerja",
        "code": ""
      },
      {
        "title": "Mengoptimalkan Kinerja",
        "detail": "Mengoptimalkan kinerja aplikasi Android yang efektif",
        "code": ""
      },
      {
        "title": "Implementasi Optimasi",
        "detail": "Mengimplementasikan optimasi yang sesuai",
        "code": ""
      }
    ],
    "resources": [
      {
        "title": "Android NDK",
        "url": "https://developer.android.com/ndk"
      }
    ]
  },
  {
    "id": "proj-ios-dev-1",
    "title": "Aplikasi Cuaca untuk iOS",
    "description": "Membuat aplikasi cuaca yang dapat menampilkan prakiraan cuaca terkini dan memberikan notifikasi kepada pengguna. Aplikasi ini dapat membantu pengguna untuk merencanakan kegiatan sehari-hari dengan lebih baik.",
    "difficulty": "Menengah",
    "category": "Mobile App Development",
    "skills": [
      "Swift",
      "iOS SDK",
      "API Integration"
    ],
    "imageUrl": "https://images.unsplash.com/photo-1526498460520-4c246339dccb?auto=format&fit=crop&q=80&w=800",
    "targetCareer": "iOS Developer",
    "checklist": [
      {
        "title": "Membuat Desain UI/UX",
        "detail": "Membuat desain antarmuka pengguna yang intuitif dan menarik",
        "code": ""
      },
      {
        "title": "Mengintegrasikan API Cuaca",
        "detail": "Mengintegrasikan API cuaca untuk mendapatkan data cuaca terkini",
        "code": "let apiURL = \"https://api.openweathermap.org/data/2.5/weather\""
      },
      {
        "title": "Membuat Notifikasi",
        "detail": "Membuat notifikasi untuk memberitahu pengguna tentang perubahan cuaca",
        "code": "import UserNotifications"
      },
      {
        "title": "Menguji Aplikasi",
        "detail": "Menguji aplikasi untuk memastikan bahwa aplikasi berfungsi dengan baik",
        "code": ""
      }
    ],
    "resources": [
      {
        "title": "Dokumentasi iOS SDK",
        "url": "https://developer.apple.com/documentation/uikit"
      }
    ]
  },
  {
    "id": "proj-ios-dev-2",
    "title": "Aplikasi Kesehatan untuk iOS",
    "description": "Membuat aplikasi kesehatan yang dapat memantau kesehatan pengguna dan memberikan saran untuk meningkatkan kesehatan. Aplikasi ini dapat membantu pengguna untuk menjaga kesehatan mereka dengan lebih baik.",
    "difficulty": "Ahli",
    "category": "Mobile App Development",
    "skills": [
      "Swift",
      "iOS SDK",
      "Core Data"
    ],
    "imageUrl": "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?auto=format&fit=crop&q=80&w=800",
    "targetCareer": "iOS Developer",
    "checklist": [
      {
        "title": "Membuat Desain UI/UX",
        "detail": "Membuat desain antarmuka pengguna yang intuitif dan menarik",
        "code": ""
      },
      {
        "title": "Mengintegrasikan Core Data",
        "detail": "Mengintegrasikan Core Data untuk memantau kesehatan pengguna",
        "code": "import CoreData"
      },
      {
        "title": "Membuat Analisis Kesehatan",
        "detail": "Membuat analisis kesehatan untuk memberikan saran kepada pengguna",
        "code": "let healthData = [...]"
      },
      {
        "title": "Menguji Aplikasi",
        "detail": "Menguji aplikasi untuk memastikan bahwa aplikasi berfungsi dengan baik",
        "code": ""
      }
    ],
    "resources": [
      {
        "title": "Dokumentasi Core Data",
        "url": "https://developer.apple.com/documentation/coredata"
      }
    ]
  },
  {
    "id": "proj-iot-eng-1",
    "title": "Sistem Pemantauan Lingkungan",
    "description": "Membuat sistem pemantauan lingkungan yang dapat memantau suhu, kelembaban, dan kualitas udara. Sistem ini dapat membantu untuk memantau lingkungan dengan lebih baik.",
    "difficulty": "Menengah",
    "category": "IoT Development",
    "skills": [
      "Python",
      "Arduino",
      "Sensor Integration"
    ],
    "imageUrl": "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&q=80&w=800",
    "targetCareer": "IoT Engineer",
    "checklist": [
      {
        "title": "Membuat Desain Sistem",
        "detail": "Membuat desain sistem pemantauan lingkungan yang efektif",
        "code": ""
      },
      {
        "title": "Mengintegrasikan Sensor",
        "detail": "Mengintegrasikan sensor untuk memantau suhu, kelembaban, dan kualitas udara",
        "code": "import RPi.GPIO as GPIO"
      },
      {
        "title": "Membuat Analisis Data",
        "detail": "Membuat analisis data untuk memberikan informasi tentang lingkungan",
        "code": "import pandas as pd"
      },
      {
        "title": "Menguji Sistem",
        "detail": "Menguji sistem untuk memastikan bahwa sistem berfungsi dengan baik",
        "code": ""
      }
    ],
    "resources": [
      {
        "title": "Dokumentasi Arduino",
        "url": "https://www.arduino.cc/en/Main/Documentation"
      }
    ]
  },
  {
    "id": "proj-iot-eng-2",
    "title": "Sistem Kontrol Otomatis",
    "description": "Membuat sistem kontrol otomatis yang dapat mengontrol peralatan rumah tangga secara otomatis. Sistem ini dapat membantu untuk meningkatkan kenyamanan dan efisiensi.",
    "difficulty": "Ahli",
    "category": "IoT Development",
    "skills": [
      "Python",
      "Arduino",
      "Machine Learning"
    ],
    "imageUrl": "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?auto=format&fit=crop&q=80&w=800",
    "targetCareer": "IoT Engineer",
    "checklist": [
      {
        "title": "Membuat Desain Sistem",
        "detail": "Membuat desain sistem kontrol otomatis yang efektif",
        "code": ""
      },
      {
        "title": "Mengintegrasikan Machine Learning",
        "detail": "Mengintegrasikan machine learning untuk mengontrol peralatan rumah tangga",
        "code": "import tensorflow as tf"
      },
      {
        "title": "Membuat Analisis Data",
        "detail": "Membuat analisis data untuk memberikan informasi tentang kinerja sistem",
        "code": "import pandas as pd"
      },
      {
        "title": "Menguji Sistem",
        "detail": "Menguji sistem untuk memastikan bahwa sistem berfungsi dengan baik",
        "code": ""
      }
    ],
    "resources": [
      {
        "title": "Dokumentasi TensorFlow",
        "url": "https://www.tensorflow.org/docs"
      }
    ]
  },
  {
    "id": "proj-wear-tech-dev-1",
    "title": "Smartwatch untuk Pemantauan Kesehatan",
    "description": "Membuat smartwatch yang dapat memantau kesehatan pengguna dan memberikan saran untuk meningkatkan kesehatan. Smartwatch ini dapat membantu pengguna untuk menjaga kesehatan mereka dengan lebih baik.",
    "difficulty": "Menengah",
    "category": "Wearable Technology",
    "skills": [
      "Java",
      "Android Wear",
      "Sensor Integration"
    ],
    "imageUrl": "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&q=80&w=800",
    "targetCareer": "Wearable Tech Developer",
    "checklist": [
      {
        "title": "Membuat Desain Antarmuka",
        "detail": "Membuat desain antarmuka pengguna yang intuitif dan menarik",
        "code": ""
      },
      {
        "title": "Mengintegrasikan Sensor",
        "detail": "Mengintegrasikan sensor untuk memantau kesehatan pengguna",
        "code": "import android.hardware.SensorManager"
      },
      {
        "title": "Membuat Analisis Data",
        "detail": "Membuat analisis data untuk memberikan informasi tentang kesehatan pengguna",
        "code": "import java.util.ArrayList"
      },
      {
        "title": "Menguji Smartwatch",
        "detail": "Menguji smartwatch untuk memastikan bahwa smartwatch berfungsi dengan baik",
        "code": ""
      }
    ],
    "resources": [
      {
        "title": "Dokumentasi Android Wear",
        "url": "https://developer.android.com/training/wearables"
      }
    ]
  },
  {
    "id": "proj-wear-tech-dev-2",
    "title": "Kacamata Pintar untuk Pembantu Visual",
    "description": "Membuat kacamata pintar yang dapat membantu pengguna dengan gangguan visual. Kacamata pintar ini dapat membantu pengguna untuk melihat dengan lebih baik.",
    "difficulty": "Ahli",
    "category": "Wearable Technology",
    "skills": [
      "C++",
      "OpenCV",
      "Machine Learning"
    ],
    "imageUrl": "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?auto=format&fit=crop&q=80&w=800",
    "targetCareer": "Wearable Tech Developer",
    "checklist": [
      {
        "title": "Membuat Desain Kacamata",
        "detail": "Membuat desain kacamata pintar yang efektif",
        "code": ""
      },
      {
        "title": "Mengintegrasikan OpenCV",
        "detail": "Mengintegrasikan OpenCV untuk mengolah gambar",
        "code": "import cv2"
      },
      {
        "title": "Membuat Analisis Data",
        "detail": "Membuat analisis data untuk memberikan informasi tentang kinerja kacamata",
        "code": "import numpy as np"
      },
      {
        "title": "Menguji Kacamata",
        "detail": "Menguji kacamata untuk memastikan bahwa kacamata berfungsi dengan baik",
        "code": ""
      }
    ],
    "resources": [
      {
        "title": "Dokumentasi OpenCV",
        "url": "https://docs.opencv.org/"
      }
    ]
  },
  {
    "id": "proj-game-dev-1",
    "title": "Permainan 2D untuk Platform Mobile",
    "description": "Membuat permainan 2D yang dapat dimainkan di platform mobile. Permainan ini dapat membantu untuk meningkatkan kreativitas dan hiburan.",
    "difficulty": "Pemula",
    "category": "Game Development",
    "skills": [
      "Java",
      "Android Studio",
      "Game Development"
    ],
    "imageUrl": "https://images.unsplash.com/photo-1511512578047-dfb367046420?auto=format&fit=crop&q=80&w=800",
    "targetCareer": "Game Developer",
    "checklist": [
      {
        "title": "Membuat Desain Permainan",
        "detail": "Membuat desain permainan yang menarik dan menyenangkan",
        "code": ""
      },
      {
        "title": "Mengintegrasikan Game Engine",
        "detail": "Mengintegrasikan game engine untuk membuat permainan",
        "code": "import com.badlogic.gdx.Game"
      },
      {
        "title": "Membuat Grafik dan Suara",
        "detail": "Membuat grafik dan suara untuk permainan",
        "code": "import com.badlogic.gdx.graphics.g2d.SpriteBatch"
      },
      {
        "title": "Menguji Permainan",
        "detail": "Menguji permainan untuk memastikan bahwa permainan berfungsi dengan baik",
        "code": ""
      }
    ],
    "resources": [
      {
        "title": "Dokumentasi Android Studio",
        "url": "https://developer.android.com/studio"
      }
    ]
  },
  {
    "id": "proj-game-dev-2",
    "title": "Permainan 3D untuk Platform PC",
    "description": "Membuat permainan 3D yang dapat dimainkan di platform PC. Permainan ini dapat membantu untuk meningkatkan kreativitas dan hiburan.",
    "difficulty": "Ahli",
    "category": "Game Development",
    "skills": [
      "C++",
      "Unity",
      "Game Development"
    ],
    "imageUrl": "https://images.unsplash.com/photo-1511512578047-dfb367046420?auto=format&fit=crop&q=80&w=800",
    "targetCareer": "Game Developer",
    "checklist": [
      {
        "title": "Membuat Desain Permainan",
        "detail": "Membuat desain permainan yang menarik dan menyenangkan",
        "code": ""
      },
      {
        "title": "Mengintegrasikan Game Engine",
        "detail": "Mengintegrasikan game engine untuk membuat permainan",
        "code": "using UnityEngine;"
      },
      {
        "title": "Membuat Grafik dan Suara",
        "detail": "Membuat grafik dan suara untuk permainan",
        "code": "using UnityEngine.Audio;"
      },
      {
        "title": "Menguji Permainan",
        "detail": "Menguji permainan untuk memastikan bahwa permainan berfungsi dengan baik",
        "code": ""
      }
    ],
    "resources": [
      {
        "title": "Dokumentasi Unity",
        "url": "https://docs.unity3d.com/"
      }
    ]
  },
  {
    "id": "proj-game-des-1",
    "title": "Desain Karakter untuk Permainan",
    "description": "Membuat desain karakter yang menarik dan unik untuk permainan. Desain karakter ini dapat membantu untuk meningkatkan kreativitas dan hiburan.",
    "difficulty": "Pemula",
    "category": "Game Design",
    "skills": [
      "Adobe Photoshop",
      "Ilustrasi",
      "Desain Karakter"
    ],
    "imageUrl": "https://images.unsplash.com/photo-1581291518857-4e27b48ff24e?auto=format&fit=crop&q=80&w=800",
    "targetCareer": "Game Designer",
    "checklist": [
      {
        "title": "Membuat Konsep Karakter",
        "detail": "Membuat konsep karakter yang menarik dan unik",
        "code": ""
      },
      {
        "title": "Menggambar Karakter",
        "detail": "Menggambar karakter menggunakan Adobe Photoshop",
        "code": ""
      },
      {
        "title": "Membuat Desain Karakter",
        "detail": "Membuat desain karakter yang lengkap dan detail",
        "code": ""
      },
      {
        "title": "Menguji Desain Karakter",
        "detail": "Menguji desain karakter untuk memastikan bahwa desain karakter berfungsi dengan baik",
        "code": ""
      }
    ],
    "resources": [
      {
        "title": "Dokumentasi Adobe Photoshop",
        "url": "https://www.adobe.com/id_id/support/photoshop.html"
      }
    ]
  },
  {
    "id": "proj-game-des-2",
    "title": "Desain Level untuk Permainan",
    "description": "Membuat desain level yang menarik dan menyenangkan untuk permainan. Desain level ini dapat membantu untuk meningkatkan kreativitas dan hiburan.",
    "difficulty": "Ahli",
    "category": "Game Design",
    "skills": [
      "Adobe Illustrator",
      "Desain Level",
      "Game Development"
    ],
    "imageUrl": "https://images.unsplash.com/photo-1561070791-2526d30994b5?auto=format&fit=crop&q=80&w=800",
    "targetCareer": "Game Designer",
    "checklist": [
      {
        "title": "Membuat Konsep Level",
        "detail": "Membuat konsep level yang menarik dan unik",
        "code": ""
      },
      {
        "title": "Menggambar Level",
        "detail": "Menggambar level menggunakan Adobe Illustrator",
        "code": ""
      },
      {
        "title": "Membuat Desain Level",
        "detail": "Membuat desain level yang lengkap dan detail",
        "code": ""
      },
      {
        "title": "Menguji Desain Level",
        "detail": "Menguji desain level untuk memastikan bahwa desain level berfungsi dengan baik",
        "code": ""
      }
    ],
    "resources": [
      {
        "title": "Dokumentasi Adobe Illustrator",
        "url": "https://www.adobe.com/id_id/support/illustrator.html"
      }
    ]
  },
  {
    "id": "proj-ue-landing",
    "title": "Pengembangan Game 3D dengan Unreal Engine",
    "description": "Proyek ini bertujuan untuk mengembangkan game 3D menggunakan Unreal Engine, dengan fokus pada pembuatan karakter, lingkungan, dan efek visual. Dalam proyek ini, Anda akan belajar tentang penggunaan Unreal Engine untuk menciptakan pengalaman gaming yang imersif.",
    "difficulty": "Menengah",
    "category": "Game Development",
    "skills": [
      "Unreal Engine",
      "C++",
      "3D Modeling"
    ],
    "imageUrl": "https://images.unsplash.com/photo-1511512578047-dfb367046420?auto=format&fit=crop&q=80&w=800",
    "targetCareer": "Unreal Engine Developer",
    "checklist": [
      {
        "title": "Membuat Proyek Baru",
        "detail": "Buat proyek baru di Unreal Engine dan atur konfigurasi awal",
        "code": ""
      },
      {
        "title": "Membuat Karakter 3D",
        "detail": "Buat karakter 3D menggunakan tool 3D modeling di Unreal Engine",
        "code": ""
      },
      {
        "title": "Membuat Lingkungan 3D",
        "detail": "Buat lingkungan 3D menggunakan tool 3D modeling di Unreal Engine",
        "code": ""
      },
      {
        "title": "Mengimplementasikan Efek Visual",
        "detail": "Implementasikan efek visual seperti pencahayaan, bayangan, dan efek partikel",
        "code": ""
      }
    ],
    "resources": [
      {
        "title": "Dokumentasi Unreal Engine",
        "url": "https://docs.unrealengine.com/en-us/"
      }
    ]
  },
  {
    "id": "proj-ue-vr",
    "title": "Pengembangan Aplikasi VR dengan Unreal Engine",
    "description": "Proyek ini bertujuan untuk mengembangkan aplikasi VR menggunakan Unreal Engine, dengan fokus pada pembuatan pengalaman VR yang imersif. Dalam proyek ini, Anda akan belajar tentang penggunaan Unreal Engine untuk menciptakan pengalaman VR yang realistis.",
    "difficulty": "Ahli",
    "category": "Game Development",
    "skills": [
      "Unreal Engine",
      "C++",
      "VR Development"
    ],
    "imageUrl": "https://images.unsplash.com/photo-1580234811432-841fbcfee218?auto=format&fit=crop&q=80&w=800",
    "targetCareer": "Unreal Engine Developer",
    "checklist": [
      {
        "title": "Membuat Proyek Baru",
        "detail": "Buat proyek baru di Unreal Engine dan atur konfigurasi awal",
        "code": ""
      },
      {
        "title": "Mengatur Konfigurasi VR",
        "detail": "Atur konfigurasi VR di Unreal Engine untuk mendukung perangkat VR",
        "code": ""
      },
      {
        "title": "Membuat Konten VR",
        "detail": "Buat konten VR seperti model 3D, tekstur, dan efek visual",
        "code": ""
      },
      {
        "title": "Mengimplementasikan Interaksi VR",
        "detail": "Implementasikan interaksi VR seperti gerakan tangan dan penglihatan",
        "code": ""
      }
    ],
    "resources": [
      {
        "title": "Dokumentasi Unreal Engine VR",
        "url": "https://docs.unrealengine.com/en-us/WorkingWithVR"
      }
    ]
  },
  {
    "id": "proj-ta-asset",
    "title": "Pembuatan Asset 3D untuk Game",
    "description": "Proyek ini bertujuan untuk membuat asset 3D untuk game, dengan fokus pada pembuatan model 3D, tekstur, dan efek visual. Dalam proyek ini, Anda akan belajar tentang penggunaan tool 3D modeling dan tekstur untuk menciptakan asset 3D yang realistis.",
    "difficulty": "Pemula",
    "category": "Game Development",
    "skills": [
      "3D Modeling",
      "Texturing",
      "Blender"
    ],
    "imageUrl": "https://images.unsplash.com/photo-1552820728-8b83bb6b773f?auto=format&fit=crop&q=80&w=800",
    "targetCareer": "Technical Artist",
    "checklist": [
      {
        "title": "Membuat Model 3D",
        "detail": "Buat model 3D menggunakan tool 3D modeling seperti Blender",
        "code": ""
      },
      {
        "title": "Membuat Tekstur",
        "detail": "Buat tekstur untuk model 3D menggunakan tool tekstur seperti Substance Painter",
        "code": ""
      },
      {
        "title": "Mengatur Pencahayaan",
        "detail": "Atur pencahayaan untuk model 3D menggunakan tool pencahayaan seperti Blender",
        "code": ""
      },
      {
        "title": "Mengexport Asset 3D",
        "detail": "Export asset 3D ke format yang dapat digunakan di game",
        "code": ""
      }
    ],
    "resources": [
      {
        "title": "Dokumentasi Blender",
        "url": "https://docs.blender.org/manual/en/latest/"
      }
    ]
  },
  {
    "id": "proj-ta-vfx",
    "title": "Pembuatan Efek Visual untuk Film",
    "description": "Proyek ini bertujuan untuk membuat efek visual untuk film, dengan fokus pada pembuatan efek visual seperti ledakan, kebakaran, dan efek cuaca. Dalam proyek ini, Anda akan belajar tentang penggunaan tool efek visual seperti Nuke dan After Effects.",
    "difficulty": "Ahli",
    "category": "Film Production",
    "skills": [
      "Nuke",
      "After Effects",
      "Efek Visual"
    ],
    "imageUrl": "https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&q=80&w=800",
    "targetCareer": "Technical Artist",
    "checklist": [
      {
        "title": "Membuat Konsep Efek Visual",
        "detail": "Buat konsep efek visual untuk film",
        "code": ""
      },
      {
        "title": "Mengatur Pipeline Efek Visual",
        "detail": "Atur pipeline efek visual menggunakan tool seperti Nuke",
        "code": ""
      },
      {
        "title": "Membuat Efek Visual",
        "detail": "Buat efek visual seperti ledakan, kebakaran, dan efek cuaca",
        "code": ""
      },
      {
        "title": "Mengintegrasikan Efek Visual ke Film",
        "detail": "Integrasikan efek visual ke film menggunakan tool seperti After Effects",
        "code": ""
      }
    ],
    "resources": [
      {
        "title": "Dokumentasi Nuke",
        "url": "https://docs.thefoundry.co.uk/nuke/13.0/"
      }
    ]
  },
  {
    "id": "proj-pm-product",
    "title": "Pengembangan Produk Baru",
    "description": "Proyek ini bertujuan untuk mengembangkan produk baru, dengan fokus pada pembuatan rencana produk, pengembangan tim, dan peluncuran produk. Dalam proyek ini, Anda akan belajar tentang penggunaan metode agile untuk mengembangkan produk.",
    "difficulty": "Menengah",
    "category": "Product Management",
    "skills": [
      "Product Management",
      "Agile",
      "Leadership"
    ],
    "imageUrl": "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&q=80&w=800",
    "targetCareer": "Product Manager",
    "checklist": [
      {
        "title": "Membuat Rencana Produk",
        "detail": "Buat rencana produk yang jelas dan terstruktur",
        "code": ""
      },
      {
        "title": "Mengembangkan Tim",
        "detail": "Kembangkan tim yang solid dan berpengalaman",
        "code": ""
      },
      {
        "title": "Mengatur Prioritas Fitur",
        "detail": "Atur prioritas fitur produk berdasarkan kebutuhan pelanggan",
        "code": ""
      },
      {
        "title": "Mengelola Peluncuran Produk",
        "detail": "Kelola peluncuran produk yang sukses dan efektif",
        "code": ""
      }
    ],
    "resources": [
      {
        "title": "Dokumentasi Agile",
        "url": "https://agilemanifesto.org/"
      }
    ]
  },
  {
    "id": "proj-pm-market",
    "title": "Pengembangan Strategi Pemasaran",
    "description": "Proyek ini bertujuan untuk mengembangkan strategi pemasaran yang efektif, dengan fokus pada pembuatan rencana pemasaran, pengembangan kampanye, dan analisis hasil. Dalam proyek ini, Anda akan belajar tentang penggunaan tool pemasaran seperti Google Analytics.",
    "difficulty": "Ahli",
    "category": "Marketing",
    "skills": [
      "Marketing",
      "Google Analytics",
      "Data Analysis"
    ],
    "imageUrl": "https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&q=80&w=800",
    "targetCareer": "Product Manager",
    "checklist": [
      {
        "title": "Membuat Rencana Pemasaran",
        "detail": "Buat rencana pemasaran yang jelas dan terstruktur",
        "code": ""
      },
      {
        "title": "Mengembangkan Kampanye Pemasaran",
        "detail": "Kembangkan kampanye pemasaran yang efektif dan berpengaruh",
        "code": ""
      },
      {
        "title": "Mengatur Target Pemasaran",
        "detail": "Atur target pemasaran berdasarkan kebutuhan pelanggan",
        "code": ""
      },
      {
        "title": "Menganalisis Hasil Pemasaran",
        "detail": "Analisis hasil pemasaran menggunakan tool seperti Google Analytics",
        "code": ""
      }
    ],
    "resources": [
      {
        "title": "Dokumentasi Google Analytics",
        "url": "https://support.google.com/analytics/answer/1008015"
      }
    ]
  },
  {
    "id": "proj-sm-scrum",
    "title": "Implementasi Metode Scrum",
    "description": "Proyek ini bertujuan untuk mengimplementasikan metode Scrum dalam tim, dengan fokus pada pembuatan rencana Scrum, pengembangan tim, dan pelaksanaan Scrum. Dalam proyek ini, Anda akan belajar tentang penggunaan metode Scrum untuk mengembangkan produk.",
    "difficulty": "Pemula",
    "category": "Project Management",
    "skills": [
      "Scrum",
      "Agile",
      "Leadership"
    ],
    "imageUrl": "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?auto=format&fit=crop&q=80&w=800",
    "targetCareer": "Scrum Master",
    "checklist": [
      {
        "title": "Membuat Rencana Scrum",
        "detail": "Buat rencana Scrum yang jelas dan terstruktur",
        "code": ""
      },
      {
        "title": "Mengembangkan Tim Scrum",
        "detail": "Kembangkan tim Scrum yang solid dan berpengalaman",
        "code": ""
      },
      {
        "title": "Mengatur Prioritas Backlog",
        "detail": "Atur prioritas backlog berdasarkan kebutuhan pelanggan",
        "code": ""
      },
      {
        "title": "Mengelola Pelaksanaan Scrum",
        "detail": "Kelola pelaksanaan Scrum yang sukses dan efektif",
        "code": ""
      }
    ],
    "resources": [
      {
        "title": "Dokumentasi Scrum",
        "url": "https://scrumguides.org/"
      }
    ]
  },
  {
    "id": "proj-sm-kanban",
    "title": "Implementasi Metode Kanban",
    "description": "Proyek ini bertujuan untuk mengimplementasikan metode Kanban dalam tim, dengan fokus pada pembuatan rencana Kanban, pengembangan tim, dan pelaksanaan Kanban. Dalam proyek ini, Anda akan belajar tentang penggunaan metode Kanban untuk mengembangkan produk.",
    "difficulty": "Ahli",
    "category": "Project Management",
    "skills": [
      "Kanban",
      "Agile",
      "Leadership"
    ],
    "imageUrl": "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&q=80&w=800",
    "targetCareer": "Scrum Master",
    "checklist": [
      {
        "title": "Membuat Rencana Kanban",
        "detail": "Buat rencana Kanban yang jelas dan terstruktur",
        "code": ""
      },
      {
        "title": "Mengembangkan Tim Kanban",
        "detail": "Kembangkan tim Kanban yang solid dan berpengalaman",
        "code": ""
      },
      {
        "title": "Mengatur Prioritas Board",
        "detail": "Atur prioritas board berdasarkan kebutuhan pelanggan",
        "code": ""
      },
      {
        "title": "Mengelola Pelaksanaan Kanban",
        "detail": "Kelola pelaksanaan Kanban yang sukses dan efektif",
        "code": ""
      }
    ],
    "resources": [
      {
        "title": "Dokumentasi Kanban",
        "url": "https://kanban.org/"
      }
    ]
  },
  {
    "id": "proj-tl-architecture",
    "title": "Desain Arsitektur Sistem",
    "description": "Proyek ini bertujuan untuk merancang arsitektur sistem yang efektif, dengan fokus pada pembuatan rencana arsitektur, pengembangan tim, dan pelaksanaan arsitektur. Dalam proyek ini, Anda akan belajar tentang penggunaan metode desain arsitektur untuk mengembangkan sistem.",
    "difficulty": "Ahli",
    "category": "Software Development",
    "skills": [
      "Arsitektur Sistem",
      "Desain Sistem",
      "Leadership"
    ],
    "imageUrl": "https://images.unsplash.com/photo-1620712948343-0008ece88852?auto=format&fit=crop&q=80&w=800",
    "targetCareer": "Technical Lead",
    "checklist": [
      {
        "title": "Membuat Rencana Arsitektur",
        "detail": "Buat rencana arsitektur yang jelas dan terstruktur",
        "code": ""
      },
      {
        "title": "Mengembangkan Tim Arsitektur",
        "detail": "Kembangkan tim arsitektur yang solid dan berpengalaman",
        "code": ""
      },
      {
        "title": "Mengatur Prioritas Komponen",
        "detail": "Atur prioritas komponen berdasarkan kebutuhan pelanggan",
        "code": ""
      },
      {
        "title": "Mengelola Pelaksanaan Arsitektur",
        "detail": "Kelola pelaksanaan arsitektur yang sukses dan efektif",
        "code": ""
      }
    ],
    "resources": [
      {
        "title": "Dokumentasi Arsitektur Sistem",
        "url": "https://www.iso.org/standard/76341.html"
      }
    ]
  },
  {
    "id": "proj-tl-devops",
    "title": "Implementasi DevOps",
    "description": "Proyek ini bertujuan untuk mengimplementasikan DevOps dalam tim, dengan fokus pada pembuatan rencana DevOps, pengembangan tim, dan pelaksanaan DevOps. Dalam proyek ini, Anda akan belajar tentang penggunaan metode DevOps untuk mengembangkan sistem.",
    "difficulty": "Menengah",
    "category": "Software Development",
    "skills": [
      "DevOps",
      "Agile",
      "Leadership"
    ],
    "imageUrl": "https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&q=80&w=800",
    "targetCareer": "Technical Lead",
    "checklist": [
      {
        "title": "Membuat Rencana DevOps",
        "detail": "Buat rencana DevOps yang jelas dan terstruktur",
        "code": ""
      },
      {
        "title": "Mengembangkan Tim DevOps",
        "detail": "Kembangkan tim DevOps yang solid dan berpengalaman",
        "code": ""
      },
      {
        "title": "Mengatur Prioritas Pipeline",
        "detail": "Atur prioritas pipeline berdasarkan kebutuhan pelanggan",
        "code": ""
      },
      {
        "title": "Mengelola Pelaksanaan DevOps",
        "detail": "Kelola pelaksanaan DevOps yang sukses dan efektif",
        "code": ""
      }
    ],
    "resources": [
      {
        "title": "Dokumentasi DevOps",
        "url": "https://devops.com/"
      }
    ]
  },
  {
    "id": "proj-itpm-1",
    "title": "Mengelola Proyek Pengembangan Aplikasi Mobile",
    "description": "Proyek ini bertujuan untuk mengembangkan aplikasi mobile yang dapat membantu meningkatkan efisiensi dan produktivitas perusahaan. Anda akan bertanggung jawab untuk mengelola tim, membuat rencana proyek, dan memantau kemajuan proyek.",
    "difficulty": "Menengah",
    "category": "IT Project Management",
    "skills": [
      "Manajemen Proyek",
      "Komunikasi",
      "Pengembangan Aplikasi"
    ],
    "imageUrl": "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?auto=format&fit=crop&q=80&w=800",
    "targetCareer": "IT Project Manager",
    "checklist": [
      {
        "title": "Membuat Rencana Proyek",
        "detail": "Buat rencana proyek yang jelas dan terperinci, termasuk tujuan, sasaran, dan timeline",
        "code": ""
      },
      {
        "title": "Mengelola Tim",
        "detail": "Pilih dan atur tim yang tepat untuk proyek, termasuk pengembang, desainer, dan tester",
        "code": ""
      },
      {
        "title": "Memantau Kemajuan Proyek",
        "detail": "Lakukan pemantauan kemajuan proyek secara teratur, termasuk memeriksa progress, mengidentifikasi masalah, dan mengambil tindakan korektif",
        "code": ""
      },
      {
        "title": "Mengelola Risiko",
        "detail": "Identifikasi dan kelola risiko proyek, termasuk membuat rencana mitigasi dan mengambil tindakan untuk mengurangi risiko",
        "code": ""
      }
    ],
    "resources": [
      {
        "title": "Buku Manajemen Proyek",
        "url": "https://www.amazon.com/Project-Management-Body-Knowledge-6th/dp/1628254454"
      }
    ]
  },
  {
    "id": "proj-itpm-2",
    "title": "Mengembangkan Sistem Informasi Manajemen",
    "description": "Proyek ini bertujuan untuk mengembangkan sistem informasi manajemen yang dapat membantu perusahaan dalam membuat keputusan yang lebih baik. Anda akan bertanggung jawab untuk menganalisis kebutuhan perusahaan, merancang sistem, dan mengimplementasikan sistem.",
    "difficulty": "Ahli",
    "category": "IT Project Management",
    "skills": [
      "Manajemen Proyek",
      "Analisis Kebutuhan",
      "Pengembangan Sistem"
    ],
    "imageUrl": "https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&q=80&w=800",
    "targetCareer": "IT Project Manager",
    "checklist": [
      {
        "title": "Menganalisis Kebutuhan",
        "detail": "Lakukan analisis kebutuhan perusahaan, termasuk mengidentifikasi kebutuhan, membuat rencana, dan mengembangkan sistem",
        "code": ""
      },
      {
        "title": "Merancang Sistem",
        "detail": "Buat desain sistem yang sesuai dengan kebutuhan perusahaan, termasuk membuat diagram alir, mengidentifikasi komponen, dan mengembangkan antarmuka",
        "code": ""
      },
      {
        "title": "Mengimplementasikan Sistem",
        "detail": "Lakukan implementasi sistem, termasuk menginstal perangkat lunak, mengkonfigurasi sistem, dan melakukan testing",
        "code": ""
      },
      {
        "title": "Mengelola Perubahan",
        "detail": "Kelola perubahan yang terjadi selama implementasi sistem, termasuk mengidentifikasi masalah, mengambil tindakan korektif, dan melakukan evaluasi",
        "code": ""
      }
    ],
    "resources": [
      {
        "title": "Buku Sistem Informasi Manajemen",
        "url": "https://www.amazon.com/Management-Information-Systems-14th/dp/0134639715"
      }
    ]
  },
  {
    "id": "proj-ba-1",
    "title": "Menganalisis Kebutuhan Bisnis",
    "description": "Proyek ini bertujuan untuk menganalisis kebutuhan bisnis perusahaan dan mengembangkan solusi yang sesuai. Anda akan bertanggung jawab untuk mengumpulkan data, menganalisis data, dan membuat rekomendasi.",
    "difficulty": "Pemula",
    "category": "Business Analysis",
    "skills": [
      "Analisis Kebutuhan",
      "Komunikasi",
      "Pengembangan Solusi"
    ],
    "imageUrl": "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?auto=format&fit=crop&q=80&w=800",
    "targetCareer": "Business Analyst (IT)",
    "checklist": [
      {
        "title": "Mengumpulkan Data",
        "detail": "Kumpulkan data yang relevan dengan kebutuhan bisnis, termasuk mengumpulkan informasi dari stakeholders, membuat survei, dan mengumpulkan data dari sistem",
        "code": ""
      },
      {
        "title": "Menganalisis Data",
        "detail": "Lakukan analisis data, termasuk membuat grafik, mengidentifikasi pola, dan mengembangkan kesimpulan",
        "code": ""
      },
      {
        "title": "Membuat Rekomendasi",
        "detail": "Buat rekomendasi yang sesuai dengan kebutuhan bisnis, termasuk membuat proposal, mengembangkan rencana, dan mengidentifikasi sumber daya",
        "code": ""
      },
      {
        "title": "Mengkomunikasikan Hasil",
        "detail": "Komunikasikan hasil analisis dan rekomendasi kepada stakeholders, termasuk membuat presentasi, mengembangkan laporan, dan mengadakan pertemuan",
        "code": ""
      }
    ],
    "resources": [
      {
        "title": "Buku Analisis Kebutuhan",
        "url": "https://www.amazon.com/Business-Analysis-Body-Knowledge-3rd/dp/1634622784"
      }
    ]
  },
  {
    "id": "proj-ba-2",
    "title": "Mengembangkan Sistem Informasi Bisnis",
    "description": "Proyek ini bertujuan untuk mengembangkan sistem informasi bisnis yang dapat membantu perusahaan dalam membuat keputusan yang lebih baik. Anda akan bertanggung jawab untuk menganalisis kebutuhan, merancang sistem, dan mengimplementasikan sistem.",
    "difficulty": "Menengah",
    "category": "Business Analysis",
    "skills": [
      "Analisis Kebutuhan",
      "Pengembangan Sistem",
      "Komunikasi"
    ],
    "imageUrl": "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&q=80&w=800",
    "targetCareer": "Business Analyst (IT)",
    "checklist": [
      {
        "title": "Menganalisis Kebutuhan",
        "detail": "Lakukan analisis kebutuhan bisnis, termasuk mengidentifikasi kebutuhan, membuat rencana, dan mengembangkan sistem",
        "code": ""
      },
      {
        "title": "Merancang Sistem",
        "detail": "Buat desain sistem yang sesuai dengan kebutuhan bisnis, termasuk membuat diagram alir, mengidentifikasi komponen, dan mengembangkan antarmuka",
        "code": ""
      },
      {
        "title": "Mengimplementasikan Sistem",
        "detail": "Lakukan implementasi sistem, termasuk menginstal perangkat lunak, mengkonfigurasi sistem, dan melakukan testing",
        "code": ""
      },
      {
        "title": "Mengelola Perubahan",
        "detail": "Kelola perubahan yang terjadi selama implementasi sistem, termasuk mengidentifikasi masalah, mengambil tindakan korektif, dan melakukan evaluasi",
        "code": ""
      }
    ],
    "resources": [
      {
        "title": "Buku Sistem Informasi Bisnis",
        "url": "https://www.amazon.com/Business-Intelligence-Systems-2nd/dp/1118539274"
      }
    ]
  },
  {
    "id": "proj-dms-1",
    "title": "Mengembangkan Strategi Pemasaran Digital",
    "description": "Proyek ini bertujuan untuk mengembangkan strategi pemasaran digital yang dapat membantu perusahaan meningkatkan penjualan dan meningkatkan kesadaran merek. Anda akan bertanggung jawab untuk menganalisis data, membuat rencana, dan mengimplementasikan strategi.",
    "difficulty": "Pemula",
    "category": "Digital Marketing",
    "skills": [
      "Analisis Data",
      "Pengembangan Strategi",
      "Komunikasi"
    ],
    "imageUrl": "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?auto=format&fit=crop&q=80&w=800",
    "targetCareer": "Digital Marketing Specialist",
    "checklist": [
      {
        "title": "Menganalisis Data",
        "detail": "Lakukan analisis data, termasuk mengumpulkan data, membuat grafik, dan mengidentifikasi pola",
        "code": ""
      },
      {
        "title": "Membuat Rencana",
        "detail": "Buat rencana pemasaran digital, termasuk membuat tujuan, mengidentifikasi target, dan mengembangkan strategi",
        "code": ""
      },
      {
        "title": "Mengimplementasikan Strategi",
        "detail": "Lakukan implementasi strategi, termasuk membuat konten, mengembangkan iklan, dan melakukan promosi",
        "code": ""
      },
      {
        "title": "Mengelola Hasil",
        "detail": "Kelola hasil pemasaran digital, termasuk mengumpulkan data, membuat laporan, dan melakukan evaluasi",
        "code": ""
      }
    ],
    "resources": [
      {
        "title": "Buku Pemasaran Digital",
        "url": "https://www.amazon.com/Digital-Marketing-Handbook-2nd/dp/1138335594"
      }
    ]
  },
  {
    "id": "proj-dms-2",
    "title": "Mengembangkan Kampanye Iklan Online",
    "description": "Proyek ini bertujuan untuk mengembangkan kampanye iklan online yang dapat membantu perusahaan meningkatkan penjualan dan meningkatkan kesadaran merek. Anda akan bertanggung jawab untuk menganalisis data, membuat rencana, dan mengimplementasikan kampanye.",
    "difficulty": "Menengah",
    "category": "Digital Marketing",
    "skills": [
      "Analisis Data",
      "Pengembangan Strategi",
      "Komunikasi"
    ],
    "imageUrl": "https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&q=80&w=800",
    "targetCareer": "Digital Marketing Specialist",
    "checklist": [
      {
        "title": "Menganalisis Data",
        "detail": "Lakukan analisis data, termasuk mengumpulkan data, membuat grafik, dan mengidentifikasi pola",
        "code": ""
      },
      {
        "title": "Membuat Rencana",
        "detail": "Buat rencana kampanye iklan online, termasuk membuat tujuan, mengidentifikasi target, dan mengembangkan strategi",
        "code": ""
      },
      {
        "title": "Mengimplementasikan Kampanye",
        "detail": "Lakukan implementasi kampanye, termasuk membuat konten, mengembangkan iklan, dan melakukan promosi",
        "code": ""
      },
      {
        "title": "Mengelola Hasil",
        "detail": "Kelola hasil kampanye iklan online, termasuk mengumpulkan data, membuat laporan, dan melakukan evaluasi",
        "code": ""
      }
    ],
    "resources": [
      {
        "title": "Buku Iklan Online",
        "url": "https://www.amazon.com/Online-Advertising-Handbook-2nd/dp/1138335594"
      }
    ]
  },
  {
    "id": "proj-seo-1",
    "title": "Mengoptimalkan Situs Web untuk Mesin Pencari",
    "description": "Proyek ini bertujuan untuk mengoptimalkan situs web perusahaan untuk mesin pencari, sehingga dapat meningkatkan peringkat dan meningkatkan trafik. Anda akan bertanggung jawab untuk menganalisis data, membuat rencana, dan mengimplementasikan strategi.",
    "difficulty": "Pemula",
    "category": "SEO",
    "skills": [
      "Analisis Data",
      "Pengembangan Strategi",
      "Komunikasi"
    ],
    "imageUrl": "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?auto=format&fit=crop&q=80&w=800",
    "targetCareer": "SEO Specialist",
    "checklist": [
      {
        "title": "Menganalisis Data",
        "detail": "Lakukan analisis data, termasuk mengumpulkan data, membuat grafik, dan mengidentifikasi pola",
        "code": ""
      },
      {
        "title": "Membuat Rencana",
        "detail": "Buat rencana optimasi situs web, termasuk membuat tujuan, mengidentifikasi target, dan mengembangkan strategi",
        "code": ""
      },
      {
        "title": "Mengimplementasikan Strategi",
        "detail": "Lakukan implementasi strategi, termasuk membuat konten, mengembangkan meta tag, dan melakukan optimasi gambar",
        "code": ""
      },
      {
        "title": "Mengelola Hasil",
        "detail": "Kelola hasil optimasi situs web, termasuk mengumpulkan data, membuat laporan, dan melakukan evaluasi",
        "code": ""
      }
    ],
    "resources": [
      {
        "title": "Buku SEO",
        "url": "https://www.amazon.com/SEO-Handbook-2nd/dp/1138335594"
      }
    ]
  },
  {
    "id": "proj-seo-2",
    "title": "Mengembangkan Konten Berkualitas untuk Mesin Pencari",
    "description": "Proyek ini bertujuan untuk mengembangkan konten berkualitas yang dapat membantu meningkatkan peringkat situs web perusahaan di mesin pencari. Anda akan bertanggung jawab untuk menganalisis data, membuat rencana, dan mengimplementasikan strategi.",
    "difficulty": "Menengah",
    "category": "SEO",
    "skills": [
      "Analisis Data",
      "Pengembangan Strategi",
      "Komunikasi"
    ],
    "imageUrl": "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?auto=format&fit=crop&q=80&w=800",
    "targetCareer": "SEO Specialist",
    "checklist": [
      {
        "title": "Menganalisis Data",
        "detail": "Lakukan analisis data, termasuk mengumpulkan data, membuat grafik, dan mengidentifikasi pola",
        "code": ""
      },
      {
        "title": "Membuat Rencana",
        "detail": "Buat rencana konten, termasuk membuat tujuan, mengidentifikasi target, dan mengembangkan strategi",
        "code": ""
      },
      {
        "title": "Mengimplementasikan Strategi",
        "detail": "Lakukan implementasi strategi, termasuk membuat konten, mengembangkan meta tag, dan melakukan optimasi gambar",
        "code": ""
      },
      {
        "title": "Mengelola Hasil",
        "detail": "Kelola hasil konten, termasuk mengumpulkan data, membuat laporan, dan melakukan evaluasi",
        "code": ""
      }
    ],
    "resources": [
      {
        "title": "Buku Konten Berkualitas",
        "url": "https://www.amazon.com/Content-Marketing-Handbook-2nd/dp/1138335594"
      }
    ]
  },
  {
    "id": "proj-cc-konten",
    "title": "Membuat Konten Viral di Media Sosial",
    "description": "Proyek ini bertujuan untuk menciptakan konten yang menarik dan viral di media sosial, sehingga meningkatkan engagement dan jumlah pengikut. Dengan menganalisis tren terkini dan memahami audiens, kita dapat menciptakan konten yang efektif dan memenuhi kebutuhan mereka.",
    "difficulty": "Menengah",
    "category": "Content Creation",
    "skills": [
      "Kreativitas",
      "Penulisan Konten",
      "Analisis Media Sosial"
    ],
    "imageUrl": "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?auto=format&fit=crop&q=80&w=800",
    "targetCareer": "Content Creator / Strategist",
    "checklist": [
      {
        "title": "Riset Audiens",
        "detail": "Lakukan riset untuk memahami preferensi dan kebutuhan audiens",
        "code": ""
      },
      {
        "title": "Membuat Konten",
        "detail": "Buat konten yang menarik dan relevan dengan audiens",
        "code": ""
      },
      {
        "title": "Optimasi Konten",
        "detail": "Optimalkan konten dengan menggunakan kata kunci dan tag yang tepat",
        "code": ""
      },
      {
        "title": "Analisis Performa",
        "detail": "Lakukan analisis untuk memahami performa konten dan membuat perbaikan",
        "code": ""
      }
    ],
    "resources": [
      {
        "title": "Tutorial Membuat Konten Viral",
        "url": "https://www.example.com/tutorial-konten-viral"
      }
    ]
  },
  {
    "id": "proj-cc-strategi",
    "title": "Mengembangkan Strategi Konten yang Efektif",
    "description": "Proyek ini bertujuan untuk mengembangkan strategi konten yang efektif dan terintegrasi, sehingga meningkatkan kesadaran merek dan konversi. Dengan menganalisis data dan memahami kebutuhan bisnis, kita dapat menciptakan strategi konten yang tepat dan memenuhi tujuan bisnis.",
    "difficulty": "Ahli",
    "category": "Content Strategy",
    "skills": [
      "Analisis Data",
      "Pengembangan Strategi",
      "Kreativitas"
    ],
    "imageUrl": "https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&q=80&w=800",
    "targetCareer": "Content Creator / Strategist",
    "checklist": [
      {
        "title": "Riset Kebutuhan Bisnis",
        "detail": "Lakukan riset untuk memahami kebutuhan bisnis dan tujuan konten",
        "code": ""
      },
      {
        "title": "Mengembangkan Strategi",
        "detail": "Kembangkan strategi konten yang efektif dan terintegrasi",
        "code": ""
      },
      {
        "title": "Mengimplementasikan Strategi",
        "detail": "Implementasikan strategi konten dan memantau performa",
        "code": ""
      },
      {
        "title": "Evaluasi dan Perbaikan",
        "detail": "Lakukan evaluasi dan perbaikan strategi konten untuk meningkatkan efektivitas",
        "code": ""
      }
    ],
    "resources": [
      {
        "title": "Tutorial Mengembangkan Strategi Konten",
        "url": "https://www.example.com/tutorial-strategi-konten"
      }
    ]
  },
  {
    "id": "proj-gh-pertumbuhan",
    "title": "Mengembangkan Strategi Pertumbuhan yang Efektif",
    "description": "Proyek ini bertujuan untuk mengembangkan strategi pertumbuhan yang efektif dan terintegrasi, sehingga meningkatkan kesadaran merek dan konversi. Dengan menganalisis data dan memahami kebutuhan bisnis, kita dapat menciptakan strategi pertumbuhan yang tepat dan memenuhi tujuan bisnis.",
    "difficulty": "Ahli",
    "category": "Growth Hacking",
    "skills": [
      "Analisis Data",
      "Pengembangan Strategi",
      "Kreativitas"
    ],
    "imageUrl": "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&q=80&w=800",
    "targetCareer": "Growth Hacker",
    "checklist": [
      {
        "title": "Riset Kebutuhan Bisnis",
        "detail": "Lakukan riset untuk memahami kebutuhan bisnis dan tujuan pertumbuhan",
        "code": ""
      },
      {
        "title": "Mengembangkan Strategi",
        "detail": "Kembangkan strategi pertumbuhan yang efektif dan terintegrasi",
        "code": ""
      },
      {
        "title": "Mengimplementasikan Strategi",
        "detail": "Implementasikan strategi pertumbuhan dan memantau performa",
        "code": ""
      },
      {
        "title": "Evaluasi dan Perbaikan",
        "detail": "Lakukan evaluasi dan perbaikan strategi pertumbuhan untuk meningkatkan efektivitas",
        "code": ""
      }
    ],
    "resources": [
      {
        "title": "Tutorial Mengembangkan Strategi Pertumbuhan",
        "url": "https://www.example.com/tutorial-strategi-pertumbuhan"
      }
    ]
  },
  {
    "id": "proj-gh-eksperimen",
    "title": "Mengembangkan Eksperimen Pertumbuhan yang Efektif",
    "description": "Proyek ini bertujuan untuk mengembangkan eksperimen pertumbuhan yang efektif dan terintegrasi, sehingga meningkatkan kesadaran merek dan konversi. Dengan menganalisis data dan memahami kebutuhan bisnis, kita dapat menciptakan eksperimen pertumbuhan yang tepat dan memenuhi tujuan bisnis.",
    "difficulty": "Menengah",
    "category": "Growth Hacking",
    "skills": [
      "Analisis Data",
      "Pengembangan Strategi",
      "Kreativitas"
    ],
    "imageUrl": "https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&q=80&w=800",
    "targetCareer": "Growth Hacker",
    "checklist": [
      {
        "title": "Riset Kebutuhan Bisnis",
        "detail": "Lakukan riset untuk memahami kebutuhan bisnis dan tujuan pertumbuhan",
        "code": ""
      },
      {
        "title": "Mengembangkan Eksperimen",
        "detail": "Kembangkan eksperimen pertumbuhan yang efektif dan terintegrasi",
        "code": ""
      },
      {
        "title": "Mengimplementasikan Eksperimen",
        "detail": "Implementasikan eksperimen pertumbuhan dan memantau performa",
        "code": ""
      },
      {
        "title": "Evaluasi dan Perbaikan",
        "detail": "Lakukan evaluasi dan perbaikan eksperimen pertumbuhan untuk meningkatkan efektivitas",
        "code": ""
      }
    ],
    "resources": [
      {
        "title": "Tutorial Mengembangkan Eksperimen Pertumbuhan",
        "url": "https://www.example.com/tutorial-eksperimen-pertumbuhan"
      }
    ]
  },
  {
    "id": "proj-ems-kampanye",
    "title": "Mengembangkan Kampanye Email Marketing yang Efektif",
    "description": "Proyek ini bertujuan untuk mengembangkan kampanye email marketing yang efektif dan terintegrasi, sehingga meningkatkan kesadaran merek dan konversi. Dengan menganalisis data dan memahami kebutuhan bisnis, kita dapat menciptakan kampanye email marketing yang tepat dan memenuhi tujuan bisnis.",
    "difficulty": "Menengah",
    "category": "Email Marketing",
    "skills": [
      "Analisis Data",
      "Pengembangan Strategi",
      "Kreativitas"
    ],
    "imageUrl": "https://images.unsplash.com/photo-1684369175833-8b77a161c28b?auto=format&fit=crop&q=80&w=800",
    "targetCareer": "Email Marketing Specialist",
    "checklist": [
      {
        "title": "Riset Kebutuhan Bisnis",
        "detail": "Lakukan riset untuk memahami kebutuhan bisnis dan tujuan email marketing",
        "code": ""
      },
      {
        "title": "Mengembangkan Kampanye",
        "detail": "Kembangkan kampanye email marketing yang efektif dan terintegrasi",
        "code": ""
      },
      {
        "title": "Mengimplementasikan Kampanye",
        "detail": "Implementasikan kampanye email marketing dan memantau performa",
        "code": ""
      },
      {
        "title": "Evaluasi dan Perbaikan",
        "detail": "Lakukan evaluasi dan perbaikan kampanye email marketing untuk meningkatkan efektivitas",
        "code": ""
      }
    ],
    "resources": [
      {
        "title": "Tutorial Mengembangkan Kampanye Email Marketing",
        "url": "https://www.example.com/tutorial-kampanye-email-marketing"
      }
    ]
  },
  {
    "id": "proj-ems-otomatisasi",
    "title": "Mengembangkan Otomatisasi Email Marketing yang Efektif",
    "description": "Proyek ini bertujuan untuk mengembangkan otomatisasi email marketing yang efektif dan terintegrasi, sehingga meningkatkan kesadaran merek dan konversi. Dengan menganalisis data dan memahami kebutuhan bisnis, kita dapat menciptakan otomatisasi email marketing yang tepat dan memenuhi tujuan bisnis.",
    "difficulty": "Ahli",
    "category": "Email Marketing",
    "skills": [
      "Analisis Data",
      "Pengembangan Strategi",
      "Kreativitas"
    ],
    "imageUrl": "https://images.unsplash.com/photo-1620712948343-0008ece88852?auto=format&fit=crop&q=80&w=800",
    "targetCareer": "Email Marketing Specialist",
    "checklist": [
      {
        "title": "Riset Kebutuhan Bisnis",
        "detail": "Lakukan riset untuk memahami kebutuhan bisnis dan tujuan email marketing",
        "code": ""
      },
      {
        "title": "Mengembangkan Otomatisasi",
        "detail": "Kembangkan otomatisasi email marketing yang efektif dan terintegrasi",
        "code": ""
      },
      {
        "title": "Mengimplementasikan Otomatisasi",
        "detail": "Implementasikan otomatisasi email marketing dan memantau performa",
        "code": ""
      },
      {
        "title": "Evaluasi dan Perbaikan",
        "detail": "Lakukan evaluasi dan perbaikan otomatisasi email marketing untuk meningkatkan efektivitas",
        "code": ""
      }
    ],
    "resources": [
      {
        "title": "Tutorial Mengembangkan Otomatisasi Email Marketing",
        "url": "https://www.example.com/tutorial-otomatisasi-email-marketing"
      }
    ]
  },
  {
    "id": "proj-ve-editing",
    "title": "Mengedit Video yang Menarik dan Efektif",
    "description": "Proyek ini bertujuan untuk mengedit video yang menarik dan efektif, sehingga meningkatkan kesadaran merek dan konversi. Dengan menganalisis data dan memahami kebutuhan bisnis, kita dapat menciptakan video yang tepat dan memenuhi tujuan bisnis.",
    "difficulty": "Menengah",
    "category": "Video Editing",
    "skills": [
      "Kreativitas",
      "Pengeditan Video",
      "Analisis Data"
    ],
    "imageUrl": "https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&q=80&w=800",
    "targetCareer": "Video Editor",
    "checklist": [
      {
        "title": "Riset Kebutuhan Bisnis",
        "detail": "Lakukan riset untuk memahami kebutuhan bisnis dan tujuan video",
        "code": ""
      },
      {
        "title": "Mengedit Video",
        "detail": "Edit video yang menarik dan efektif",
        "code": ""
      },
      {
        "title": "Mengoptimalkan Video",
        "detail": "Optimalkan video untuk meningkatkan performa dan kesadaran merek",
        "code": ""
      },
      {
        "title": "Evaluasi dan Perbaikan",
        "detail": "Lakukan evaluasi dan perbaikan video untuk meningkatkan efektivitas",
        "code": ""
      }
    ],
    "resources": [
      {
        "title": "Tutorial Mengedit Video",
        "url": "https://www.example.com/tutorial-mengedit-video"
      }
    ]
  },
  {
    "id": "proj-ve-visual",
    "title": "Mengembangkan Visual yang Menarik dan Efektif",
    "description": "Proyek ini bertujuan untuk mengembangkan visual yang menarik dan efektif, sehingga meningkatkan kesadaran merek dan konversi. Dengan menganalisis data dan memahami kebutuhan bisnis, kita dapat menciptakan visual yang tepat dan memenuhi tujuan bisnis.",
    "difficulty": "Ahli",
    "category": "Visual Effects",
    "skills": [
      "Kreativitas",
      "Pengembangan Visual",
      "Analisis Data"
    ],
    "imageUrl": "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&q=80&w=800",
    "targetCareer": "Video Editor",
    "checklist": [
      {
        "title": "Riset Kebutuhan Bisnis",
        "detail": "Lakukan riset untuk memahami kebutuhan bisnis dan tujuan visual",
        "code": ""
      },
      {
        "title": "Mengembangkan Visual",
        "detail": "Kembangkan visual yang menarik dan efektif",
        "code": ""
      },
      {
        "title": "Mengoptimalkan Visual",
        "detail": "Optimalkan visual untuk meningkatkan performa dan kesadaran merek",
        "code": ""
      },
      {
        "title": "Evaluasi dan Perbaikan",
        "detail": "Lakukan evaluasi dan perbaikan visual untuk meningkatkan efektivitas",
        "code": ""
      }
    ],
    "resources": [
      {
        "title": "Tutorial Mengembangkan Visual",
        "url": "https://www.example.com/tutorial-mengembangkan-visual"
      }
    ]
  },
  {
    "id": "proj-de-otomatisasi",
    "title": "Mengembangkan Otomatisasi DevOps yang Efektif",
    "description": "Proyek ini bertujuan untuk mengembangkan otomatisasi DevOps yang efektif dan terintegrasi, sehingga meningkatkan kesadaran merek dan konversi. Dengan menganalisis data dan memahami kebutuhan bisnis, kita dapat menciptakan otomatisasi DevOps yang tepat dan memenuhi tujuan bisnis.",
    "difficulty": "Ahli",
    "category": "DevOps",
    "skills": [
      "Analisis Data",
      "Pengembangan Strategi",
      "Kreativitas"
    ],
    "imageUrl": "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?auto=format&fit=crop&q=80&w=800",
    "targetCareer": "DevOps Engineer",
    "checklist": [
      {
        "title": "Riset Kebutuhan Bisnis",
        "detail": "Lakukan riset untuk memahami kebutuhan bisnis dan tujuan DevOps",
        "code": ""
      },
      {
        "title": "Mengembangkan Otomatisasi",
        "detail": "Kembangkan otomatisasi DevOps yang efektif dan terintegrasi",
        "code": ""
      },
      {
        "title": "Mengimplementasikan Otomatisasi",
        "detail": "Implementasikan otomatisasi DevOps dan memantau performa",
        "code": ""
      },
      {
        "title": "Evaluasi dan Perbaikan",
        "detail": "Lakukan evaluasi dan perbaikan otomatisasi DevOps untuk meningkatkan efektivitas",
        "code": ""
      }
    ],
    "resources": [
      {
        "title": "Tutorial Mengembangkan Otomatisasi DevOps",
        "url": "https://www.example.com/tutorial-otomatisasi-devops"
      }
    ]
  },
  {
    "id": "proj-plat-eng-1",
    "title": "Membangun Platform sebagai Layanan (PaaS) dengan Kubernetes",
    "description": "Proyek ini bertujuan untuk membangun platform sebagai layanan (PaaS) menggunakan Kubernetes, yang memungkinkan pengembang untuk mendeploy aplikasi dengan mudah dan efisien. Dalam proyek ini, Anda akan belajar tentang konsep-konsep dasar Kubernetes dan cara menggunakannya untuk membangun PaaS.",
    "difficulty": "Menengah",
    "category": "Platform Engineering",
    "skills": [
      "Kubernetes",
      "Docker",
      "Cloud Computing"
    ],
    "imageUrl": "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&q=80&w=800",
    "targetCareer": "Platform Engineer",
    "checklist": [
      {
        "title": "Menginstal Kubernetes",
        "detail": "Instal Kubernetes di atas mesin virtual atau cloud provider",
        "code": "kubectl init"
      },
      {
        "title": "Membuat Cluster Kubernetes",
        "detail": "Buat cluster Kubernetes dengan beberapa node",
        "code": "kubectl create cluster"
      },
      {
        "title": "Mendeploy Aplikasi",
        "detail": "Deploy aplikasi ke dalam cluster Kubernetes",
        "code": "kubectl apply -f deployment.yaml"
      },
      {
        "title": "Mengelola Sumber Daya",
        "detail": "Kelola sumber daya seperti CPU dan memori di dalam cluster Kubernetes",
        "code": "kubectl get pods -o wide"
      }
    ],
    "resources": [
      {
        "title": "Dokumentasi Kubernetes",
        "url": "https://kubernetes.io/docs/"
      }
    ]
  },
  {
    "id": "proj-plat-eng-2",
    "title": "Mengintegrasikan CI/CD Pipeline dengan Jenkins",
    "description": "Proyek ini bertujuan untuk mengintegrasikan CI/CD pipeline dengan Jenkins, yang memungkinkan pengembang untuk membangun, menguji, dan mendeploy aplikasi dengan otomatis. Dalam proyek ini, Anda akan belajar tentang konsep-konsep dasar Jenkins dan cara menggunakannya untuk mengintegrasikan CI/CD pipeline.",
    "difficulty": "Ahli",
    "category": "DevOps",
    "skills": [
      "Jenkins",
      "CI/CD",
      "Automation"
    ],
    "imageUrl": "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&q=80&w=800",
    "targetCareer": "Platform Engineer",
    "checklist": [
      {
        "title": "Menginstal Jenkins",
        "detail": "Instal Jenkins di atas mesin virtual atau cloud provider",
        "code": "sudo apt-get install jenkins"
      },
      {
        "title": "Membuat Job Jenkins",
        "detail": "Buat job Jenkins untuk membangun, menguji, dan mendeploy aplikasi",
        "code": "jenkins create job"
      },
      {
        "title": "Mengkonfigurasi Pipeline",
        "detail": "Konfigurasi pipeline Jenkins untuk membangun, menguji, dan mendeploy aplikasi",
        "code": "jenkins pipeline configure"
      },
      {
        "title": "Mengelola Hasil Build",
        "detail": "Kelola hasil build dan deployment aplikasi",
        "code": "jenkins build history"
      }
    ],
    "resources": [
      {
        "title": "Dokumentasi Jenkins",
        "url": "https://jenkins.io/doc/"
      }
    ]
  },
  {
    "id": "proj-cloud-sol-arch-1",
    "title": "Membangun Arsitektur Cloud dengan AWS",
    "description": "Proyek ini bertujuan untuk membangun arsitektur cloud dengan AWS, yang memungkinkan pengembang untuk membangun aplikasi yang skalabel dan efisien. Dalam proyek ini, Anda akan belajar tentang konsep-konsep dasar AWS dan cara menggunakannya untuk membangun arsitektur cloud.",
    "difficulty": "Menengah",
    "category": "Cloud Computing",
    "skills": [
      "AWS",
      "Cloud Computing",
      "Architecture"
    ],
    "imageUrl": "https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&q=80&w=800",
    "targetCareer": "Cloud Solutions Architect",
    "checklist": [
      {
        "title": "Menginstal AWS CLI",
        "detail": "Instal AWS CLI di atas mesin virtual atau cloud provider",
        "code": "pip install awscli"
      },
      {
        "title": "Membuat S3 Bucket",
        "detail": "Buat S3 bucket untuk menyimpan data aplikasi",
        "code": "aws s3 mb s3://my-bucket"
      },
      {
        "title": "Mendeploy Aplikasi",
        "detail": "Deploy aplikasi ke dalam EC2 instance",
        "code": "aws ec2 run-instances"
      },
      {
        "title": "Mengelola Keamanan",
        "detail": "Kelola keamanan aplikasi dengan IAM dan security group",
        "code": "aws iam create-user"
      }
    ],
    "resources": [
      {
        "title": "Dokumentasi AWS",
        "url": "https://aws.amazon.com/documentation/"
      }
    ]
  },
  {
    "id": "proj-cloud-sol-arch-2",
    "title": "Mengintegrasikan Microservices dengan API Gateway",
    "description": "Proyek ini bertujuan untuk mengintegrasikan microservices dengan API Gateway, yang memungkinkan pengembang untuk membangun aplikasi yang lebih skalabel dan efisien. Dalam proyek ini, Anda akan belajar tentang konsep-konsep dasar API Gateway dan cara menggunakannya untuk mengintegrasikan microservices.",
    "difficulty": "Ahli",
    "category": "Cloud Computing",
    "skills": [
      "API Gateway",
      "Microservices",
      "Cloud Computing"
    ],
    "imageUrl": "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?auto=format&fit=crop&q=80&w=800",
    "targetCareer": "Cloud Solutions Architect",
    "checklist": [
      {
        "title": "Menginstal API Gateway",
        "detail": "Instal API Gateway di atas mesin virtual atau cloud provider",
        "code": "aws apigateway create-rest-api"
      },
      {
        "title": "Membuat API",
        "detail": "Buat API untuk mengintegrasikan microservices",
        "code": "aws apigateway create-resource"
      },
      {
        "title": "Mengkonfigurasi Integrasi",
        "detail": "Konfigurasi integrasi API dengan microservices",
        "code": "aws apigateway create-integration"
      },
      {
        "title": "Mengelola Keamanan",
        "detail": "Kelola keamanan API dengan IAM dan security group",
        "code": "aws iam create-user"
      }
    ],
    "resources": [
      {
        "title": "Dokumentasi API Gateway",
        "url": "https://docs.aws.amazon.com/apigateway/latest/developerguide/"
      }
    ]
  },
  {
    "id": "proj-block-dev-1",
    "title": "Membangun Smart Contract dengan Solidity",
    "description": "Proyek ini bertujuan untuk membangun smart contract dengan Solidity, yang memungkinkan pengembang untuk membangun aplikasi yang lebih aman dan efisien. Dalam proyek ini, Anda akan belajar tentang konsep-konsep dasar Solidity dan cara menggunakannya untuk membangun smart contract.",
    "difficulty": "Menengah",
    "category": "Blockchain",
    "skills": [
      "Solidity",
      "Smart Contract",
      "Blockchain"
    ],
    "imageUrl": "https://images.unsplash.com/photo-1620712948343-0008ece88852?auto=format&fit=crop&q=80&w=800",
    "targetCareer": "Blockchain Developer",
    "checklist": [
      {
        "title": "Menginstal Solidity",
        "detail": "Instal Solidity di atas mesin virtual atau cloud provider",
        "code": "npm install solidity"
      },
      {
        "title": "Membuat Smart Contract",
        "detail": "Buat smart contract dengan Solidity",
        "code": "pragma solidity ^0.8.0;"
      },
      {
        "title": "Mengkompile Smart Contract",
        "detail": "Kompile smart contract dengan Solidity",
        "code": "solcjs --compile"
      },
      {
        "title": "Mendeploy Smart Contract",
        "detail": "Deploy smart contract ke dalam blockchain",
        "code": "truffle migrate"
      }
    ],
    "resources": [
      {
        "title": "Dokumentasi Solidity",
        "url": "https://solidity.readthedocs.io/en/v0.8.10/"
      }
    ]
  },
  {
    "id": "proj-block-dev-2",
    "title": "Mengintegrasikan Blockchain dengan Frontend",
    "description": "Proyek ini bertujuan untuk mengintegrasikan blockchain dengan frontend, yang memungkinkan pengembang untuk membangun aplikasi yang lebih interaktif dan efisien. Dalam proyek ini, Anda akan belajar tentang konsep-konsep dasar integrasi blockchain dengan frontend dan cara menggunakannya untuk membangun aplikasi.",
    "difficulty": "Ahli",
    "category": "Blockchain",
    "skills": [
      "Blockchain",
      "Frontend",
      "Web3"
    ],
    "imageUrl": "https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&q=80&w=800",
    "targetCareer": "Blockchain Developer",
    "checklist": [
      {
        "title": "Menginstal Web3",
        "detail": "Instal Web3 di atas mesin virtual atau cloud provider",
        "code": "npm install web3"
      },
      {
        "title": "Membuat Frontend",
        "detail": "Buat frontend untuk mengintegrasikan blockchain",
        "code": "npm install react"
      },
      {
        "title": "Mengkonfigurasi Integrasi",
        "detail": "Konfigurasi integrasi blockchain dengan frontend",
        "code": "web3.eth.Contract"
      },
      {
        "title": "Mengelola Keamanan",
        "detail": "Kelola keamanan aplikasi dengan IAM dan security group",
        "code": "web3.eth.accounts"
      }
    ],
    "resources": [
      {
        "title": "Dokumentasi Web3",
        "url": "https://web3js.readthedocs.io/en/v1.3.0/"
      }
    ]
  },
  {
    "id": "proj-fintech-dev-1",
    "title": "Membangun Aplikasi Pembayaran Digital",
    "description": "Proyek ini bertujuan untuk membangun aplikasi pembayaran digital, yang memungkinkan pengembang untuk membangun aplikasi yang lebih efisien dan aman. Dalam proyek ini, Anda akan belajar tentang konsep-konsep dasar pembayaran digital dan cara menggunakannya untuk membangun aplikasi.",
    "difficulty": "Menengah",
    "category": "Fintech",
    "skills": [
      "Pembayaran Digital",
      "Aplikasi Mobile",
      "Keamanan"
    ],
    "imageUrl": "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?auto=format&fit=crop&q=80&w=800",
    "targetCareer": "Fintech Developer",
    "checklist": [
      {
        "title": "Menginstal SDK Pembayaran",
        "detail": "Instal SDK pembayaran di atas mesin virtual atau cloud provider",
        "code": "npm install payment-sdk"
      },
      {
        "title": "Membuat Aplikasi",
        "detail": "Buat aplikasi pembayaran digital dengan SDK pembayaran",
        "code": "npm install react-native"
      },
      {
        "title": "Mengkonfigurasi Pembayaran",
        "detail": "Konfigurasi pembayaran dengan SDK pembayaran",
        "code": "payment-sdk.configure"
      },
      {
        "title": "Mengelola Keamanan",
        "detail": "Kelola keamanan aplikasi dengan IAM dan security group",
        "code": "payment-sdk.secure"
      }
    ],
    "resources": [
      {
        "title": "Dokumentasi SDK Pembayaran",
        "url": "https://payment-sdk.readthedocs.io/en/v1.0/"
      }
    ]
  },
  {
    "id": "proj-fintech-dev-2",
    "title": "Mengintegrasikan Aplikasi dengan Bank",
    "description": "Proyek ini bertujuan untuk mengintegrasikan aplikasi dengan bank, yang memungkinkan pengembang untuk membangun aplikasi yang lebih efisien dan aman. Dalam proyek ini, Anda akan belajar tentang konsep-konsep dasar integrasi aplikasi dengan bank dan cara menggunakannya untuk membangun aplikasi.",
    "difficulty": "Ahli",
    "category": "Fintech",
    "skills": [
      "Integrasi Bank",
      "Aplikasi Mobile",
      "Keamanan"
    ],
    "imageUrl": "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?auto=format&fit=crop&q=80&w=800",
    "targetCareer": "Fintech Developer",
    "checklist": [
      {
        "title": "Menginstal SDK Bank",
        "detail": "Instal SDK bank di atas mesin virtual atau cloud provider",
        "code": "npm install bank-sdk"
      },
      {
        "title": "Membuat Aplikasi",
        "detail": "Buat aplikasi untuk mengintegrasikan dengan bank",
        "code": "npm install react-native"
      },
      {
        "title": "Mengkonfigurasi Integrasi",
        "detail": "Konfigurasi integrasi aplikasi dengan bank",
        "code": "bank-sdk.configure"
      },
      {
        "title": "Mengelola Keamanan",
        "detail": "Kelola keamanan aplikasi dengan IAM dan security group",
        "code": "bank-sdk.secure"
      }
    ],
    "resources": [
      {
        "title": "Dokumentasi SDK Bank",
        "url": "https://bank-sdk.readthedocs.io/en/v1.0/"
      }
    ]
  },
  {
    "id": "proj-defi-spec-1",
    "title": "Membangun Aplikasi DeFi dengan Smart Contract",
    "description": "Proyek ini bertujuan untuk membangun aplikasi DeFi dengan smart contract, yang memungkinkan pengembang untuk membangun aplikasi yang lebih aman dan efisien. Dalam proyek ini, Anda akan belajar tentang konsep-konsep dasar DeFi dan cara menggunakannya untuk membangun aplikasi.",
    "difficulty": "Menengah",
    "category": "DeFi",
    "skills": [
      "DeFi",
      "Smart Contract",
      "Blockchain"
    ],
    "imageUrl": "https://images.unsplash.com/photo-1620712948343-0008ece88852?auto=format&fit=crop&q=80&w=800",
    "targetCareer": "DeFi Specialist",
    "checklist": [
      {
        "title": "Menginstal Solidity",
        "detail": "Instal Solidity di atas mesin virtual atau cloud provider",
        "code": "npm install solidity"
      },
      {
        "title": "Membuat Smart Contract",
        "detail": "Buat smart contract untuk aplikasi DeFi",
        "code": "pragma solidity ^0.8.0;"
      },
      {
        "title": "Mengkompile Smart Contract",
        "detail": "Kompile smart contract dengan Solidity",
        "code": "solcjs --compile"
      },
      {
        "title": "Mendeploy Smart Contract",
        "detail": "Deploy smart contract ke dalam blockchain",
        "code": "truffle migrate"
      }
    ],
    "resources": [
      {
        "title": "Dokumentasi Solidity",
        "url": "https://solidity.readthedocs.io/en/v0.8.10/"
      }
    ]
  },
  {
    "id": "proj-defi-spec-2",
    "title": "Mengintegrasikan Aplikasi DeFi dengan DEX",
    "description": "Proyek ini bertujuan untuk mengintegrasikan aplikasi DeFi dengan DEX, yang memungkinkan pengembang untuk membangun aplikasi yang lebih efisien dan aman. Dalam proyek ini, Anda akan belajar tentang konsep-konsep dasar integrasi aplikasi DeFi dengan DEX dan cara menggunakannya untuk membangun aplikasi.",
    "difficulty": "Ahli",
    "category": "DeFi",
    "skills": [
      "DeFi",
      "DEX",
      "Blockchain"
    ],
    "imageUrl": "https://images.unsplash.com/photo-1684369175833-8b77a161c28b?auto=format&fit=crop&q=80&w=800",
    "targetCareer": "DeFi Specialist",
    "checklist": [
      {
        "title": "Menginstal SDK DEX",
        "detail": "Instal SDK DEX di atas mesin virtual atau cloud provider",
        "code": "npm install dex-sdk"
      },
      {
        "title": "Membuat Aplikasi",
        "detail": "Buat aplikasi untuk mengintegrasikan dengan DEX",
        "code": "npm install react-native"
      },
      {
        "title": "Mengkonfigurasi Integrasi",
        "detail": "Konfigurasi integrasi aplikasi DeFi dengan DEX",
        "code": "dex-sdk.configure"
      },
      {
        "title": "Mengelola Keamanan",
        "detail": "Kelola keamanan aplikasi dengan IAM dan security group",
        "code": "dex-sdk.secure"
      }
    ],
    "resources": [
      {
        "title": "Dokumentasi SDK DEX",
        "url": "https://dex-sdk.readthedocs.io/en/v1.0/"
      }
    ]
  },
  {
    "id": "proj-his-analisis",
    "title": "Sistem Informasi Kesehatan Berbasis Data",
    "description": "Membuat sistem informasi kesehatan yang dapat menganalisis data pasien dan menyediakan informasi yang akurat untuk keputusan medis. Sistem ini dapat membantu meningkatkan kualitas pelayanan kesehatan dan mengurangi biaya.",
    "difficulty": "Menengah",
    "category": "Data & AI",
    "skills": [
      "Python",
      "Pandas",
      "Matplotlib"
    ],
    "imageUrl": "https://images.unsplash.com/photo-1620712948343-0008ece88852?auto=format&fit=crop&q=80&w=800",
    "targetCareer": "Health Informatics Specialist",
    "checklist": [
      {
        "title": "Mengumpulkan Data",
        "detail": "Mengumpulkan data pasien dari berbagai sumber, seperti catatan medis dan hasil laboratorium",
        "code": "import pandas as pd; df = pd.read_csv('data.csv')"
      },
      {
        "title": "Menganalisis Data",
        "detail": "Menganalisis data pasien menggunakan teknik statistik dan visualisasi data",
        "code": "import matplotlib.pyplot as plt; plt.plot(df['umur'])"
      },
      {
        "title": "Membuat Sistem Informasi",
        "detail": "Membuat sistem informasi kesehatan yang dapat menyimpan dan mengolah data pasien",
        "code": "import flask; app = flask.Flask(__name__)"
      },
      {
        "title": "Mengintegrasikan Sistem",
        "detail": "Mengintegrasikan sistem informasi kesehatan dengan sistem lain, seperti sistem manajemen pasien",
        "code": "import requests; response = requests.get('https://api.example.com/pasien')"
      }
    ],
    "resources": [
      {
        "title": "Dokumentasi Pandas",
        "url": "https://pandas.pydata.org/docs/"
      }
    ]
  },
  {
    "id": "proj-his-visualisasi",
    "title": "Visualisasi Data Kesehatan",
    "description": "Membuat visualisasi data kesehatan yang dapat membantu dokter dan pasien memahami data kesehatan dengan lebih baik. Visualisasi ini dapat membantu meningkatkan kualitas pelayanan kesehatan dan mengurangi biaya.",
    "difficulty": "Pemula",
    "category": "Data & AI",
    "skills": [
      "Tableau",
      "Power BI",
      "D3.js"
    ],
    "imageUrl": "https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&q=80&w=800",
    "targetCareer": "Health Informatics Specialist",
    "checklist": [
      {
        "title": "Mengumpulkan Data",
        "detail": "Mengumpulkan data kesehatan dari berbagai sumber, seperti catatan medis dan hasil laboratorium",
        "code": "import pandas as pd; df = pd.read_csv('data.csv')"
      },
      {
        "title": "Membuat Visualisasi",
        "detail": "Membuat visualisasi data kesehatan menggunakan tool seperti Tableau atau Power BI",
        "code": "import tableausdk; tableau.connect('https://example.com')"
      },
      {
        "title": "Mengcustomisasi Visualisasi",
        "detail": "Mengcustomisasi visualisasi data kesehatan untuk memenuhi kebutuhan dokter dan pasien",
        "code": "import d3; d3.select('body').append('svg')"
      },
      {
        "title": "Mengintegrasikan Visualisasi",
        "detail": "Mengintegrasikan visualisasi data kesehatan dengan sistem lain, seperti sistem manajemen pasien",
        "code": "import requests; response = requests.get('https://api.example.com/pasien')"
      }
    ],
    "resources": [
      {
        "title": "Dokumentasi Tableau",
        "url": "https://help.tableau.com/current/pro/desktop/en-us/index.htm"
      }
    ]
  },
  {
    "id": "proj-bse-simulator",
    "title": "Simulator Sistem Kesehatan",
    "description": "Membuat simulator sistem kesehatan yang dapat membantu dokter dan pasien memahami bagaimana sistem kesehatan bekerja. Simulator ini dapat membantu meningkatkan kualitas pelayanan kesehatan dan mengurangi biaya.",
    "difficulty": "Ahli",
    "category": "Biomedical Engineering",
    "skills": [
      "Python",
      "NumPy",
      "SciPy"
    ],
    "imageUrl": "https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&q=80&w=800",
    "targetCareer": "Biomedical Software Engineer",
    "checklist": [
      {
        "title": "Mengumpulkan Data",
        "detail": "Mengumpulkan data kesehatan dari berbagai sumber, seperti catatan medis dan hasil laboratorium",
        "code": "import pandas as pd; df = pd.read_csv('data.csv')"
      },
      {
        "title": "Membuat Model",
        "detail": "Membuat model sistem kesehatan menggunakan teknik simulasi",
        "code": "import numpy as np; model = np.array([1, 2, 3])"
      },
      {
        "title": "Mengcustomisasi Model",
        "detail": "Mengcustomisasi model sistem kesehatan untuk memenuhi kebutuhan dokter dan pasien",
        "code": "import scipy; scipy.optimize.minimize(model)"
      },
      {
        "title": "Mengintegrasikan Model",
        "detail": "Mengintegrasikan model sistem kesehatan dengan sistem lain, seperti sistem manajemen pasien",
        "code": "import requests; response = requests.get('https://api.example.com/pasien')"
      }
    ],
    "resources": [
      {
        "title": "Dokumentasi NumPy",
        "url": "https://numpy.org/doc/"
      }
    ]
  },
  {
    "id": "proj-bse-analisis",
    "title": "Analisis Data Kesehatan",
    "description": "Membuat analisis data kesehatan yang dapat membantu dokter dan pasien memahami data kesehatan dengan lebih baik. Analisis ini dapat membantu meningkatkan kualitas pelayanan kesehatan dan mengurangi biaya.",
    "difficulty": "Menengah",
    "category": "Biomedical Engineering",
    "skills": [
      "R",
      "Matlab",
      "SPSS"
    ],
    "imageUrl": "https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&q=80&w=800",
    "targetCareer": "Biomedical Software Engineer",
    "checklist": [
      {
        "title": "Mengumpulkan Data",
        "detail": "Mengumpulkan data kesehatan dari berbagai sumber, seperti catatan medis dan hasil laboratorium",
        "code": "import pandas as pd; df = pd.read_csv('data.csv')"
      },
      {
        "title": "Membuat Analisis",
        "detail": "Membuat analisis data kesehatan menggunakan teknik statistik",
        "code": "import statsmodels; model = statsmodels.OLS(df['umur'], df['berat_badan'])"
      },
      {
        "title": "Mengcustomisasi Analisis",
        "detail": "Mengcustomisasi analisis data kesehatan untuk memenuhi kebutuhan dokter dan pasien",
        "code": "import matplotlib; matplotlib.pyplot.plot(df['umur'])"
      },
      {
        "title": "Mengintegrasikan Analisis",
        "detail": "Mengintegrasikan analisis data kesehatan dengan sistem lain, seperti sistem manajemen pasien",
        "code": "import requests; response = requests.get('https://api.example.com/pasien')"
      }
    ],
    "resources": [
      {
        "title": "Dokumentasi R",
        "url": "https://www.r-project.org/"
      }
    ]
  },
  {
    "id": "proj-td-telemedicine",
    "title": "Sistem Telemedicine",
    "description": "Membuat sistem telemedicine yang dapat membantu dokter dan pasien berkomunikasi secara online. Sistem ini dapat membantu meningkatkan kualitas pelayanan kesehatan dan mengurangi biaya.",
    "difficulty": "Ahli",
    "category": "Telemedicine",
    "skills": [
      "Python",
      "Flask",
      "WebRTC"
    ],
    "imageUrl": "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&q=80&w=800",
    "targetCareer": "Telemedicine Developer",
    "checklist": [
      {
        "title": "Mengumpulkan Data",
        "detail": "Mengumpulkan data kesehatan dari berbagai sumber, seperti catatan medis dan hasil laboratorium",
        "code": "import pandas as pd; df = pd.read_csv('data.csv')"
      },
      {
        "title": "Membuat Sistem",
        "detail": "Membuat sistem telemedicine menggunakan framework seperti Flask",
        "code": "import flask; app = flask.Flask(__name__)"
      },
      {
        "title": "Mengcustomisasi Sistem",
        "detail": "Mengcustomisasi sistem telemedicine untuk memenuhi kebutuhan dokter dan pasien",
        "code": "import webrtc; webrtc.offerToReceiveAudio()"
      },
      {
        "title": "Mengintegrasikan Sistem",
        "detail": "Mengintegrasikan sistem telemedicine dengan sistem lain, seperti sistem manajemen pasien",
        "code": "import requests; response = requests.get('https://api.example.com/pasien')"
      }
    ],
    "resources": [
      {
        "title": "Dokumentasi Flask",
        "url": "https://flask.palletsprojects.com/en/2.0.x/"
      }
    ]
  },
  {
    "id": "proj-td-video-konferensi",
    "title": "Sistem Video Konferensi",
    "description": "Membuat sistem video konferensi yang dapat membantu dokter dan pasien berkomunikasi secara online. Sistem ini dapat membantu meningkatkan kualitas pelayanan kesehatan dan mengurangi biaya.",
    "difficulty": "Menengah",
    "category": "Telemedicine",
    "skills": [
      "JavaScript",
      "WebRTC",
      "Socket.io"
    ],
    "imageUrl": "https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&q=80&w=800",
    "targetCareer": "Telemedicine Developer",
    "checklist": [
      {
        "title": "Mengumpulkan Data",
        "detail": "Mengumpulkan data kesehatan dari berbagai sumber, seperti catatan medis dan hasil laboratorium",
        "code": "import pandas as pd; df = pd.read_csv('data.csv')"
      },
      {
        "title": "Membuat Sistem",
        "detail": "Membuat sistem video konferensi menggunakan library seperti WebRTC",
        "code": "import webrtc; webrtc.offerToReceiveAudio()"
      },
      {
        "title": "Mengcustomisasi Sistem",
        "detail": "Mengcustomisasi sistem video konferensi untuk memenuhi kebutuhan dokter dan pasien",
        "code": "import socketio; socketio.emit('video', 'data')"
      },
      {
        "title": "Mengintegrasikan Sistem",
        "detail": "Mengintegrasikan sistem video konferensi dengan sistem lain, seperti sistem manajemen pasien",
        "code": "import requests; response = requests.get('https://api.example.com/pasien')"
      }
    ],
    "resources": [
      {
        "title": "Dokumentasi WebRTC",
        "url": "https://webrtc.org/"
      }
    ]
  },
  {
    "id": "proj-ed-learn-management",
    "title": "Sistem Manajemen Pembelajaran",
    "description": "Membuat sistem manajemen pembelajaran yang dapat membantu guru dan siswa mengelola proses pembelajaran. Sistem ini dapat membantu meningkatkan kualitas pembelajaran dan mengurangi biaya.",
    "difficulty": "Ahli",
    "category": "EdTech",
    "skills": [
      "Python",
      "Django",
      "React"
    ],
    "imageUrl": "https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&q=80&w=800",
    "targetCareer": "EdTech Developer",
    "checklist": [
      {
        "title": "Mengumpulkan Data",
        "detail": "Mengumpulkan data pembelajaran dari berbagai sumber, seperti catatan kelas dan hasil ujian",
        "code": "import pandas as pd; df = pd.read_csv('data.csv')"
      },
      {
        "title": "Membuat Sistem",
        "detail": "Membuat sistem manajemen pembelajaran menggunakan framework seperti Django",
        "code": "import django; django.setup()"
      },
      {
        "title": "Mengcustomisasi Sistem",
        "detail": "Mengcustomisasi sistem manajemen pembelajaran untuk memenuhi kebutuhan guru dan siswa",
        "code": "import react; react.render(<App />, document.getElementById('root'))"
      },
      {
        "title": "Mengintegrasikan Sistem",
        "detail": "Mengintegrasikan sistem manajemen pembelajaran dengan sistem lain, seperti sistem informasi sekolah",
        "code": "import requests; response = requests.get('https://api.example.com/sekolah')"
      }
    ],
    "resources": [
      {
        "title": "Dokumentasi Django",
        "url": "https://docs.djangoproject.com/en/4.1/"
      }
    ]
  },
  {
    "id": "proj-ed-elearning-platform",
    "title": "Platform E-Learning",
    "description": "Membuat platform e-learning yang dapat membantu guru dan siswa mengakses materi pembelajaran secara online. Platform ini dapat membantu meningkatkan kualitas pembelajaran dan mengurangi biaya.",
    "difficulty": "Menengah",
    "category": "EdTech",
    "skills": [
      "JavaScript",
      "React",
      "Node.js"
    ],
    "imageUrl": "https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&q=80&w=800",
    "targetCareer": "EdTech Developer",
    "checklist": [
      {
        "title": "Mengumpulkan Data",
        "detail": "Mengumpulkan data pembelajaran dari berbagai sumber, seperti catatan kelas dan hasil ujian",
        "code": "import pandas as pd; df = pd.read_csv('data.csv')"
      },
      {
        "title": "Membuat Platform",
        "detail": "Membuat platform e-learning menggunakan library seperti React",
        "code": "import react; react.render(<App />, document.getElementById('root'))"
      },
      {
        "title": "Mengcustomisasi Platform",
        "detail": "Mengcustomisasi platform e-learning untuk memenuhi kebutuhan guru dan siswa",
        "code": "import nodejs; nodejs.createServer()"
      },
      {
        "title": "Mengintegrasikan Platform",
        "detail": "Mengintegrasikan platform e-learning dengan sistem lain, seperti sistem informasi sekolah",
        "code": "import requests; response = requests.get('https://api.example.com/sekolah')"
      }
    ],
    "resources": [
      {
        "title": "Dokumentasi React",
        "url": "https://reactjs.org/docs/getting-started.html"
      }
    ]
  },
  {
    "id": "proj-id-instruksional-design",
    "title": "Desain Instruksional",
    "description": "Membuat desain instruksional yang dapat membantu guru dan siswa mengelola proses pembelajaran. Desain ini dapat membantu meningkatkan kualitas pembelajaran dan mengurangi biaya.",
    "difficulty": "Ahli",
    "category": "Instructional Design",
    "skills": [
      "Adobe Captivate",
      "Articulate Storyline",
      "Lectora Inspire"
    ],
    "imageUrl": "https://images.unsplash.com/photo-1587440871875-191322ee64b0?auto=format&fit=crop&q=80&w=800",
    "targetCareer": "Instructional Designer",
    "checklist": [
      {
        "title": "Mengumpulkan Data",
        "detail": "Mengumpulkan data pembelajaran dari berbagai sumber, seperti catatan kelas dan hasil ujian",
        "code": "import pandas as pd; df = pd.read_csv('data.csv')"
      },
      {
        "title": "Membuat Desain",
        "detail": "Membuat desain instruksional menggunakan tool seperti Adobe Captivate",
        "code": "import adobecaptivate; adobecaptivate.createProject()"
      },
      {
        "title": "Mengcustomisasi Desain",
        "detail": "Mengcustomisasi desain instruksional untuk memenuhi kebutuhan guru dan siswa",
        "code": "import articulate; articulate.createStoryline()"
      }
    ]
  },
  {
    "id": "proj-ecommerce-1",
    "title": "Pengembangan Toko Online",
    "description": "Proyek ini bertujuan untuk mengembangkan toko online yang dapat menampilkan produk, mengelola keranjang belanja, dan melakukan transaksi pembayaran. Dengan menggunakan teknologi e-commerce, proyek ini dapat membantu meningkatkan penjualan dan memperluas jangkauan bisnis.",
    "difficulty": "Menengah",
    "category": "E-Commerce",
    "skills": [
      "HTML",
      "CSS",
      "JavaScript"
    ],
    "imageUrl": "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?auto=format&fit=crop&q=80&w=800",
    "targetCareer": "E-Commerce Developer",
    "checklist": [
      {
        "title": "Membuat Desain UI/UX",
        "detail": "Buat desain antarmuka pengguna yang menarik dan mudah digunakan",
        "code": ""
      },
      {
        "title": "Mengembangkan Fitur Produk",
        "detail": "Kembangkan fitur untuk menampilkan produk, mengelola stok, dan melakukan transaksi",
        "code": ""
      },
      {
        "title": "Mengintegrasikan Pembayaran",
        "detail": "Integrasikan sistem pembayaran online untuk memudahkan transaksi",
        "code": ""
      },
      {
        "title": "Menguji dan Mengoptimalkan",
        "detail": "Lakukan pengujian dan optimalkan kinerja toko online untuk meningkatkan pengalaman pengguna",
        "code": ""
      }
    ],
    "resources": [
      {
        "title": "Dokumentasi E-Commerce",
        "url": "https://developer.mozilla.org/en-US/docs/Learn/Server-side/First_steps"
      }
    ]
  },
  {
    "id": "proj-ecommerce-2",
    "title": "Pengembangan Aplikasi Mobile E-Commerce",
    "description": "Proyek ini bertujuan untuk mengembangkan aplikasi mobile e-commerce yang dapat membantu meningkatkan penjualan dan memperluas jangkauan bisnis. Dengan menggunakan teknologi mobile, proyek ini dapat membantu meningkatkan pengalaman pengguna dan memperluas akses ke pasar.",
    "difficulty": "Ahli",
    "category": "E-Commerce",
    "skills": [
      "Java",
      "Kotlin",
      "Swift"
    ],
    "imageUrl": "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?auto=format&fit=crop&q=80&w=800",
    "targetCareer": "E-Commerce Developer",
    "checklist": [
      {
        "title": "Membuat Desain UI/UX Mobile",
        "detail": "Buat desain antarmuka pengguna yang menarik dan mudah digunakan pada perangkat mobile",
        "code": ""
      },
      {
        "title": "Mengembangkan Fitur Produk Mobile",
        "detail": "Kembangkan fitur untuk menampilkan produk, mengelola stok, dan melakukan transaksi pada perangkat mobile",
        "code": ""
      },
      {
        "title": "Mengintegrasikan Pembayaran Mobile",
        "detail": "Integrasikan sistem pembayaran online untuk memudahkan transaksi pada perangkat mobile",
        "code": ""
      },
      {
        "title": "Menguji dan Mengoptimalkan Kinerja Mobile",
        "detail": "Lakukan pengujian dan optimalkan kinerja aplikasi mobile e-commerce untuk meningkatkan pengalaman pengguna",
        "code": ""
      }
    ],
    "resources": [
      {
        "title": "Dokumentasi Pengembangan Aplikasi Mobile",
        "url": "https://developer.android.com/training/basics/firstapp"
      }
    ]
  },
  {
    "id": "proj-marketplace-1",
    "title": "Pengembangan Strategi Marketplace",
    "description": "Proyek ini bertujuan untuk mengembangkan strategi marketplace yang dapat membantu meningkatkan penjualan dan memperluas jangkauan bisnis. Dengan menggunakan analisis data dan penelitian pasar, proyek ini dapat membantu meningkatkan efisiensi dan efektifitas operasional.",
    "difficulty": "Menengah",
    "category": "Marketplace",
    "skills": [
      "Analisis Data",
      "Penelitian Pasar",
      "Strategi Bisnis"
    ],
    "imageUrl": "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?auto=format&fit=crop&q=80&w=800",
    "targetCareer": "Marketplace Product Manager",
    "checklist": [
      {
        "title": "Menganalisis Data Pasar",
        "detail": "Lakukan analisis data pasar untuk memahami kebutuhan dan preferensi pengguna",
        "code": ""
      },
      {
        "title": "Mengembangkan Strategi Marketplace",
        "detail": "Kembangkan strategi marketplace yang efektif untuk meningkatkan penjualan dan memperluas jangkauan bisnis",
        "code": ""
      },
      {
        "title": "Mengoptimalkan Operasional",
        "detail": "Optimalkan operasional marketplace untuk meningkatkan efisiensi dan efektifitas",
        "code": ""
      },
      {
        "title": "Mengukur Kinerja",
        "detail": "Lakukan pengukuran kinerja marketplace untuk memahami efektivitas strategi",
        "code": ""
      }
    ],
    "resources": [
      {
        "title": "Dokumentasi Strategi Marketplace",
        "url": "https://www.marketplace.org/topics/business"
      }
    ]
  },
  {
    "id": "proj-marketplace-2",
    "title": "Pengembangan Fitur Marketplace",
    "description": "Proyek ini bertujuan untuk mengembangkan fitur marketplace yang dapat membantu meningkatkan pengalaman pengguna dan memperluas jangkauan bisnis. Dengan menggunakan teknologi terbaru, proyek ini dapat membantu meningkatkan efisiensi dan efektifitas operasional.",
    "difficulty": "Ahli",
    "category": "Marketplace",
    "skills": [
      "HTML",
      "CSS",
      "JavaScript"
    ],
    "imageUrl": "https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&q=80&w=800",
    "targetCareer": "Marketplace Product Manager",
    "checklist": [
      {
        "title": "Membuat Desain UI/UX",
        "detail": "Buat desain antarmuka pengguna yang menarik dan mudah digunakan",
        "code": ""
      },
      {
        "title": "Mengembangkan Fitur Produk",
        "detail": "Kembangkan fitur untuk menampilkan produk, mengelola stok, dan melakukan transaksi",
        "code": ""
      },
      {
        "title": "Mengintegrasikan Pembayaran",
        "detail": "Integrasikan sistem pembayaran online untuk memudahkan transaksi",
        "code": ""
      },
      {
        "title": "Menguji dan Mengoptimalkan Kinerja",
        "detail": "Lakukan pengujian dan optimalkan kinerja marketplace untuk meningkatkan pengalaman pengguna",
        "code": ""
      }
    ],
    "resources": [
      {
        "title": "Dokumentasi Pengembangan Fitur Marketplace",
        "url": "https://developer.mozilla.org/en-US/docs/Learn/Server-side/First_steps"
      }
    ]
  },
  {
    "id": "proj-podcast-1",
    "title": "Pengembangan Konten Podcast",
    "description": "Proyek ini bertujuan untuk mengembangkan konten podcast yang menarik dan informatif. Dengan menggunakan penelitian dan analisis, proyek ini dapat membantu meningkatkan kualitas konten dan memperluas jangkauan audiens.",
    "difficulty": "Pemula",
    "category": "Podcast",
    "skills": [
      "Penelitian",
      "Analisis",
      "Kreativitas"
    ],
    "imageUrl": "https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&q=80&w=800",
    "targetCareer": "Podcast Producer",
    "checklist": [
      {
        "title": "Menganalisis Topik",
        "detail": "Lakukan analisis topik untuk memahami kebutuhan dan preferensi audiens",
        "code": ""
      },
      {
        "title": "Mengembangkan Konsep",
        "detail": "Kembangkan konsep podcast yang menarik dan informatif",
        "code": ""
      },
      {
        "title": "Mengatur Jadwal",
        "detail": "Atur jadwal produksi dan publikasi podcast",
        "code": ""
      },
      {
        "title": "Mengoptimalkan Kualitas",
        "detail": "Optimalkan kualitas suara dan konten podcast",
        "code": ""
      }
    ],
    "resources": [
      {
        "title": "Dokumentasi Pengembangan Konten Podcast",
        "url": "https://www.podcastinsights.com/podcast-production/"
      }
    ]
  },
  {
    "id": "proj-podcast-2",
    "title": "Pengembangan Strategi Pemasaran Podcast",
    "description": "Proyek ini bertujuan untuk mengembangkan strategi pemasaran podcast yang efektif. Dengan menggunakan analisis data dan penelitian pasar, proyek ini dapat membantu meningkatkan jangkauan audiens dan memperluas bisnis.",
    "difficulty": "Menengah",
    "category": "Podcast",
    "skills": [
      "Analisis Data",
      "Penelitian Pasar",
      "Strategi Pemasaran"
    ],
    "imageUrl": "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&q=80&w=800",
    "targetCareer": "Podcast Producer",
    "checklist": [
      {
        "title": "Menganalisis Data Audiens",
        "detail": "Lakukan analisis data audiens untuk memahami kebutuhan dan preferensi",
        "code": ""
      },
      {
        "title": "Mengembangkan Strategi Pemasaran",
        "detail": "Kembangkan strategi pemasaran podcast yang efektif untuk meningkatkan jangkauan audiens",
        "code": ""
      },
      {
        "title": "Mengoptimalkan Konten",
        "detail": "Optimalkan konten podcast untuk meningkatkan kualitas dan memperluas jangkauan",
        "code": ""
      },
      {
        "title": "Mengukur Kinerja",
        "detail": "Lakukan pengukuran kinerja podcast untuk memahami efektivitas strategi",
        "code": ""
      }
    ],
    "resources": [
      {
        "title": "Dokumentasi Strategi Pemasaran Podcast",
        "url": "https://www.podcastmarketing.org/"
      }
    ]
  },
  {
    "id": "proj-vrar-1",
    "title": "Pengembangan Aplikasi VR",
    "description": "Proyek ini bertujuan untuk mengembangkan aplikasi VR yang menarik dan interaktif. Dengan menggunakan teknologi VR, proyek ini dapat membantu meningkatkan pengalaman pengguna dan memperluas jangkauan bisnis.",
    "difficulty": "Ahli",
    "category": "VR/AR",
    "skills": [
      "C++",
      "Java",
      "Unity"
    ],
    "imageUrl": "https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&q=80&w=800",
    "targetCareer": "VR/AR Developer",
    "checklist": [
      {
        "title": "Membuat Desain UI/UX",
        "detail": "Buat desain antarmuka pengguna yang menarik dan mudah digunakan",
        "code": ""
      },
      {
        "title": "Mengembangkan Fitur",
        "detail": "Kembangkan fitur untuk meningkatkan pengalaman pengguna dan memperluas jangkauan",
        "code": ""
      },
      {
        "title": "Mengintegrasikan Teknologi VR",
        "detail": "Integrasikan teknologi VR untuk meningkatkan pengalaman pengguna",
        "code": ""
      },
      {
        "title": "Menguji dan Mengoptimalkan Kinerja",
        "detail": "Lakukan pengujian dan optimalkan kinerja aplikasi VR untuk meningkatkan pengalaman pengguna",
        "code": ""
      }
    ],
    "resources": [
      {
        "title": "Dokumentasi Pengembangan Aplikasi VR",
        "url": "https://developer.oculus.com/documentation/pcsdks/intro/"
      }
    ]
  },
  {
    "id": "proj-vrar-2",
    "title": "Pengembangan Aplikasi AR",
    "description": "Proyek ini bertujuan untuk mengembangkan aplikasi AR yang menarik dan interaktif. Dengan menggunakan teknologi AR, proyek ini dapat membantu meningkatkan pengalaman pengguna dan memperluas jangkauan bisnis.",
    "difficulty": "Ahli",
    "category": "VR/AR",
    "skills": [
      "C++",
      "Java",
      "Unity"
    ],
    "imageUrl": "https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&q=80&w=800",
    "targetCareer": "VR/AR Developer",
    "checklist": [
      {
        "title": "Membuat Desain UI/UX",
        "detail": "Buat desain antarmuka pengguna yang menarik dan mudah digunakan",
        "code": ""
      },
      {
        "title": "Mengembangkan Fitur",
        "detail": "Kembangkan fitur untuk meningkatkan pengalaman pengguna dan memperluas jangkauan",
        "code": ""
      },
      {
        "title": "Mengintegrasikan Teknologi AR",
        "detail": "Integrasikan teknologi AR untuk meningkatkan pengalaman pengguna",
        "code": ""
      },
      {
        "title": "Menguji dan Mengoptimalkan Kinerja",
        "detail": "Lakukan pengujian dan optimalkan kinerja aplikasi AR untuk meningkatkan pengalaman pengguna",
        "code": ""
      }
    ],
    "resources": [
      {
        "title": "Dokumentasi Pengembangan Aplikasi AR",
        "url": "https://developer.apple.com/arkit/"
      }
    ]
  },
  {
    "id": "proj-technicalwriter-1",
    "title": "Pengembangan Dokumentasi Teknis",
    "description": "Proyek ini bertujuan untuk mengembangkan dokumentasi teknis yang jelas dan mudah dipahami. Dengan menggunakan penelitian dan analisis, proyek ini dapat membantu meningkatkan kualitas dokumentasi dan memperluas jangkauan audiens.",
    "difficulty": "Pemula",
    "category": "Technical Writing",
    "skills": [
      "Penelitian",
      "Analisis",
      "Kreativitas"
    ],
    "imageUrl": "https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&q=80&w=800",
    "targetCareer": "Technical Writer",
    "checklist": [
      {
        "title": "Menganalisis Topik",
        "detail": "Lakukan analisis topik untuk memahami kebutuhan dan preferensi audiens",
        "code": ""
      },
      {
        "title": "Mengembangkan Konsep",
        "detail": "Kembangkan konsep dokumentasi teknis yang jelas dan mudah dipahami",
        "code": ""
      },
      {
        "title": "Mengatur Struktur",
        "detail": "Atur struktur dokumentasi teknis untuk meningkatkan kualitas dan memperluas jangkauan",
        "code": ""
      },
      {
        "title": "Mengoptimalkan Kualitas",
        "detail": "Optimalkan kualitas dokumentasi teknis untuk meningkatkan pengalaman pengguna",
        "code": ""
      }
    ],
    "resources": [
      {
        "title": "Dokumentasi Pengembangan Dokumentasi Teknis",
        "url": "https://www.techwhirl.com/technical-writing/"
      }
    ]
  },
  {
    "id": "proj-technicalwriter-2",
    "title": "Pengembangan Konten Teknis",
    "description": "Proyek ini bertujuan untuk mengembangkan konten teknis yang menarik dan informatif. Dengan menggunakan penelitian dan analisis, proyek ini dapat membantu meningkatkan kualitas konten dan memperluas jangkauan audiens.",
    "difficulty": "Menengah",
    "category": "Technical Writing",
    "skills": [
      "Penelitian",
      "Analisis",
      "Kreativitas"
    ],
    "imageUrl": "https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&q=80&w=800",
    "targetCareer": "Technical Writer",
    "checklist": [
      {
        "title": "Menganalisis Topik",
        "detail": "Lakukan analisis topik untuk memahami kebutuhan dan preferensi audiens",
        "code": ""
      },
      {
        "title": "Mengembangkan Konsep",
        "detail": "Kembangkan konsep konten teknis yang menarik dan informatif",
        "code": ""
      },
      {
        "title": "Mengatur Struktur",
        "detail": "Atur struktur konten teknis untuk meningkatkan kualitas dan memperluas jangkauan",
        "code": ""
      }
    ]
  },
  ...(GENERATED_PROJECTS as any)
];
