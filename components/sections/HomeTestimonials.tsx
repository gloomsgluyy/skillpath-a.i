import React from 'react';
import KineticTestimonial from '@/components/ui/kinetic-testimonials';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

const testimonials = [
  {
    name: 'Andi Pratama',
    handle: '@andi_dev',
    review:
      'SkillPath AI benar-benar mengubah cara saya melihat potensi diri. Panduan karirnya sangat akurat dan terstruktur!',
    avatar:
      'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=100&auto=format&fit=crop&ixlib=rb-4.0.3',
  },
  {
    name: 'Siti Nurhaliza',
    handle: '@sitidesign',
    review:
      'Roadmap belajar yang diberikan AI-nya sangat detail. Membantu saya transisi dari graphic design ke UI/UX dengan mulus.',
    avatar:
      'https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=100&auto=format&fit=crop&ixlib=rb-4.0.3',
  },
  {
    name: 'Budi Santoso',
    handle: '@budicodes',
    review:
      "Sebagai anak SMK, saya sempat bingung mau fokus kemana. Hasil analisis tes minatnya spot on dan tugas-tugasnya seru!",
    avatar:
      'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=100&auto=format&fit=crop&ixlib=rb-4.0.3',
  },
  {
    name: 'Rina Wijaya',
    handle: '@rinawjy',
    review:
      'UI-nya luar biasa cantik dan interaktif. Membuat proses tracking belajar jadi tidak membosankan sama sekali.',
    avatar:
      'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=100&auto=format&fit=crop&ixlib=rb-4.0.3',
  },
  {
    name: 'Kevin Jonathan',
    handle: '@kev_jon',
    review:
      "Fitur AI Assistant-nya sangat membantu ketika saya stuck belajar React. Seperti punya mentor 24/7!",
    avatar:
      'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=100&auto=format&fit=crop&ixlib=rb-4.0.3',
  },
  {
    name: 'Nadia Putri',
    handle: '@nadiaputri',
    review:
      'Rekomendasi kursus dan project marketplace-nya sangat sesuai dengan level skill saat ini. Highly recommended!',
    avatar:
      'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=100&auto=format&fit=crop&ixlib=rb-4.0.3',
  },
  {
    name: 'Fajar Hidayat',
    handle: '@fajar_h',
    review:
      'Sistem streak dan badge membuat saya termotivasi untuk terus coding setiap hari. Pendekatan gamifikasi terbaik.',
    avatar:
      'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?q=80&w=100&auto=format&fit=crop&ixlib=rb-4.0.3',
  },
  {
    name: 'Jessica Tanoe',
    handle: '@jesi_t',
    review:
      "Saya suka fitur radar pencocokan skill. Saya jadi tahu gap antara kemampuan saya dan standar industri.",
    avatar:
      'https://images.unsplash.com/photo-1557053910-d9eadeed1c58?q=80&w=100&auto=format&fit=crop&ixlib=rb-4.0.3',
  },
];

export default function HomeTestimonials() {
  return (
    <div className="relative py-20 pb-32 overflow-hidden">
      <div className="text-center mb-12 relative z-10">
        <h2 className="text-4xl font-black font-montserrat text-slate-800 mb-4 tracking-tight">Ribuan Pelajar Telah Menemukan Jalannya</h2>
        <p className="text-slate-500 font-medium text-lg">Lihat bagaimana SkillPath AI membantu mereka meraih karir impian.</p>
      </div>

      <div className="max-w-7xl mx-auto px-4 relative">
        <Carousel
          opts={{
            align: "start",
            loop: true,
          }}
          className="w-full relative z-20"
        >
          <CarouselContent className="-ml-2 md:-ml-4">
            {testimonials.map((t, index) => (
              <CarouselItem key={index} className="pl-2 md:pl-4 md:basis-1/3 lg:basis-1/4">
                <div className="p-1">
                  <div className="glass-effect rounded-3xl p-6 h-full border-white transition-all hover:scale-[1.02] hover:shadow-2xl">
                    <div className="flex items-center gap-3 mb-4">
                      <img 
                        src={t.avatar} 
                        alt={t.name}
                        className="w-12 h-12 rounded-full object-cover ring-2 ring-indigo-100"
                        loading="lazy"
                      />
                      <div className="flex flex-col">
                        <span className="font-bold text-slate-800 leading-tight">{t.name}</span>
                        <span className="text-xs text-slate-500 font-medium">{t.handle}</span>
                      </div>
                    </div>
                    <p className="text-sm text-slate-600 leading-relaxed font-medium">"{t.review}"</p>
                  </div>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <div className="flex justify-center gap-4 mt-8">
            <CarouselPrevious className="static translate-y-0" />
            <CarouselNext className="static translate-y-0" />
          </div>
        </Carousel>

        {/* Decorative background for testimonials */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-indigo-50/30 blur-[100px] rounded-full z-0 pointer-events-none" />
      </div>

      {/* Kinetic version kept below for background texture or optional view */}
      <div className="mt-20 opacity-40 grayscale pointer-events-none skew-y-1 overflow-hidden h-[300px]">
        <KineticTestimonial
          testimonials={testimonials}
          className='bg-transparent py-0'
          desktopColumns={5}
          speed={0.5}
        />
      </div>
    </div>
  );
}
