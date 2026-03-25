
export type QuestionCategory = 'infrastructure' | 'software' | 'data' | 'creative' | 'leadership';

export interface AssessmentQuestion {
  id: string;
  text: string;
  category: QuestionCategory;
}

export const DISCOVER_QUESTIONS: AssessmentQuestion[] = [
  { id: 'q_inf_1', category: 'infrastructure', text: 'Saya lebih suka memecahkan masalah sistem yang rumit daripada mendesain tampilan depan website.' },
  { id: 'q_inf_2', category: 'infrastructure', text: 'Saya selalu tertarik memahami bagaimana internet bekerja di balik layar (server, routing, dll).' },
  { id: 'q_inf_3', category: 'infrastructure', text: 'Saya merasa tertantang saat harus mengamankan sistem komputer dari serangan siber.' },
  { id: 'q_inf_4', category: 'infrastructure', text: 'Mengotomatisasi proses instalasi server terasa lebih memuaskan daripada membuat fitur aplikasi baru.' },
  { id: 'q_inf_5', category: 'infrastructure', text: 'Saya lebih suka bekerja untuk memastikan sebuah platform tidak pernah down (mati) saat diakses jutaan pengguna.' },
  
  { id: 'q_sft_1', category: 'software', text: 'Saya sangat puas ketika berhasil menemukan dan memperbaiki bug (error) pada sebuah program.' },
  { id: 'q_sft_2', category: 'software', text: 'Membangun aplikasi mobile adalah impian saya sejak lama.' },
  { id: 'q_sft_3', category: 'software', text: 'Saya bisa menghabiskan waktu berjam-jam mencoba memikirkan logika algoritma yang lebih efisien.' },
  { id: 'q_sft_4', category: 'software', text: 'Saya menikmati proses menulis kode untuk membuat sesuatu dari nol.' },
  { id: 'q_sft_5', category: 'software', text: 'Pengalaman pengguna (User Experience) saat menggunakan aplikasi adalah prioritas utama saya saat coding.' },
  
  { id: 'q_dat_1', category: 'data', text: 'Bekerja dengan data angka dan logika statistik lebih seru daripada membuat konten visual.' },
  { id: 'q_dat_2', category: 'data', text: 'Saya penasaran bagaimana Artificial Intelligence (AI) bisa memprediksi kebiasaan manusia.' },
  { id: 'q_dat_3', category: 'data', text: 'Saya sangat teliti dan jeli dalam mencari pola tersembunyi dari sekumpulan informasi acak.' },
  { id: 'q_dat_4', category: 'data', text: 'Melatih AI model untuk mengenali gambar atau teks terdengar seperti pekerjaan impian saya.' },
  { id: 'q_dat_5', category: 'data', text: 'Saya percaya bahwa keputusan bisnis terbaik harus selalu didasarkan pada data faktual.' },
  
  { id: 'q_cre_1', category: 'creative', text: 'Hal pertama yang saya perhatikan saat membuka website baru adalah keindahan tata letak dan warnanya.' },
  { id: 'q_cre_2', category: 'creative', text: 'Saya sering membayangkan bagaimana membuat sebuah aplikasi lebih mudah ditebak penggunaannya.' },
  { id: 'q_cre_3', category: 'creative', text: 'Membuat sketsa kasar dari sebuah ide produk sangat menyenangkan bagi saya.' },
  { id: 'q_cre_4', category: 'creative', text: 'Saya sangat peduli pada detail terkecil seperti ketepatan jarak antar tombol di layar (pixel-perfect).' },
  { id: 'q_cre_5', category: 'creative', text: 'Saya pandai menggabungkan sisi artistik dengan kebutuhan teknis fungsional.' },
  
  { id: 'q_ldr_1', category: 'leadership', text: 'Saya lebih suka menjadi orang yang mengatur strategi dan memimpin jalannya proyek.' },
  { id: 'q_ldr_2', category: 'leadership', text: 'Saya pandai menjelaskan konsep teknis yang sulit kepada orang awam yang tidak paham IT.' },
  { id: 'q_ldr_3', category: 'leadership', text: 'Membaca kebutuhan pasar/klien lebih penting dari sekadar membangun fitur keren tapi tidak terpakai.' },
  { id: 'q_ldr_4', category: 'leadership', text: 'Saya bisa menjadi penengah yang baik ketika ada perdebatan teknis dalam sebuah tim.' },
  { id: 'q_ldr_5', category: 'leadership', text: 'Memastikan sebuah proyek IT selesai tepat waktu dengan dana yang efisien adalah tantangan yang saya sukai.' },
];
