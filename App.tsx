import React from 'react';
import { HashRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import AiChef from './components/AiChef';
import AdminPage from './pages/AdminPage';
import { getGalleryImages } from './utils/storage';
import { MENU_ITEMS, TESTIMONIALS, CONTACT_INFO } from './constants';
import { ArrowRight, Star, Clock, MapPin, Users, CalendarCheck, CheckCircle, ChevronRight, Image as ImageIcon } from 'lucide-react';
import { MenuItem, ReservationData, GalleryItem } from './types';

// --- Page Components Defined Inside App.tsx for simplicity in this XML structure ---
// Ideally these would be in separate files in a 'pages/' directory

const HomePage = () => {
  const bestSellers = MENU_ITEMS.filter(item => item.isBestSeller).slice(0, 3);

  return (
    <>
      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        {/* Background Image with Overlay */}
        <div className="absolute inset-0 z-0">
          <img 
            src="https://picsum.photos/1920/1080?random=10" 
            alt="Korean BBQ Feast" 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/70 to-black/40"></div>
        </div>

        <div className="relative z-10 text-center px-4 max-w-4xl mx-auto space-y-6">
          <span className="inline-block py-1 px-3 border border-mabac-red text-mabac-red rounded-full text-sm font-bold tracking-widest uppercase mb-2 animate-fade-in-up">
            Authentic Taste in Medan
          </span>
          <h1 className="text-5xl md:text-7xl font-extrabold text-white leading-tight">
            Rasakan Kelezatan <br />
            <span className="text-mabac-red">Korean BBQ</span> Sejati
          </h1>
          <p className="text-lg md:text-xl text-gray-300 max-w-2xl mx-auto">
            Daging premium, bumbu otentik, dan suasana modern. Tempat terbaik untuk berkumpul bersama teman dan keluarga di Medan.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-8">
            <Link to="/reservation" className="bg-mabac-red hover:bg-red-800 text-white px-8 py-4 rounded-full font-bold text-lg transition-all transform hover:scale-105 flex items-center">
              Reservasi Sekarang <ArrowRight className="ml-2 w-5 h-5" />
            </Link>
            <Link to="/menu" className="bg-white/10 hover:bg-white/20 backdrop-blur-md text-white border border-white/30 px-8 py-4 rounded-full font-bold text-lg transition-all">
              Lihat Menu
            </Link>
          </div>
        </div>
      </section>

      {/* Best Sellers Preview */}
      <section className="py-20 bg-mabac-darkgray">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Menu Terfavorit</h2>
            <div className="w-24 h-1 bg-mabac-red mx-auto"></div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {bestSellers.map(item => (
              <div key={item.id} className="group relative overflow-hidden rounded-xl bg-neutral-900 border border-white/5 hover:border-mabac-red/50 transition-all duration-300">
                <div className="aspect-video overflow-hidden">
                  <img src={item.imageUrl} alt={item.name} className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500" />
                </div>
                <div className="p-6">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="text-xl font-bold text-white group-hover:text-mabac-red transition-colors">{item.name}</h3>
                    <span className="bg-mabac-red/20 text-mabac-red text-xs px-2 py-1 rounded">Best Seller</span>
                  </div>
                  <p className="text-gray-400 text-sm mb-4 line-clamp-2">{item.description}</p>
                  <p className="text-lg font-bold text-white">Rp {item.price.toLocaleString('id-ID')}</p>
                </div>
              </div>
            ))}
          </div>
          <div className="text-center mt-12">
            <Link to="/menu" className="inline-flex items-center text-mabac-red hover:text-white font-bold transition-colors">
              Lihat Semua Menu <ChevronRight className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 bg-black">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
           <h2 className="text-3xl font-bold text-white text-center mb-12">Kata Mereka</h2>
           <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
             {TESTIMONIALS.map(testi => (
               <div key={testi.id} className="bg-neutral-900 p-8 rounded-2xl relative">
                 <div className="absolute -top-4 left-8 text-6xl text-mabac-red opacity-20">"</div>
                 <div className="flex text-yellow-500 mb-4">
                   {[...Array(testi.rating)].map((_, i) => <Star key={i} fill="currentColor" className="w-4 h-4" />)}
                 </div>
                 <p className="text-gray-300 italic mb-6">"{testi.comment}"</p>
                 <p className="text-white font-bold">{testi.name}</p>
               </div>
             ))}
           </div>
        </div>
      </section>
    </>
  );
};

const AboutPage = () => (
  <div className="pt-20">
    <div className="relative py-24 bg-neutral-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div className="order-2 lg:order-1 relative">
            <img src="https://picsum.photos/600/800?random=11" alt="Interior Ma-Bac" className="rounded-2xl shadow-2xl grayscale hover:grayscale-0 transition-all duration-500" />
            <div className="absolute -bottom-6 -right-6 bg-mabac-red p-8 rounded-2xl hidden md:block">
              <p className="text-4xl font-bold text-white">5+</p>
              <p className="text-white/80 text-sm">Tahun Melayani</p>
            </div>
          </div>
          <div className="order-1 lg:order-2 space-y-6">
            <h2 className="text-4xl font-bold text-white">Cerita <span className="text-mabac-red">Ma-Bac</span></h2>
            <p className="text-gray-300 leading-relaxed">
              Ma-Bac Korean BBQ bermula dari kecintaan kami terhadap kuliner Korea yang menghangatkan suasana. 
              Berdiri di Medan sejak 2018, kami berkomitmen membawa pengalaman makan BBQ yang tidak hanya lezat, 
              tetapi juga menyenangkan.
            </p>
            <p className="text-gray-300 leading-relaxed">
              Nama "Ma-Bac" sendiri diambil dari filosofi "Makan-Bakar", yang merepresentasikan keseruan 
              memanggang daging sendiri di meja bersama orang-orang terkasih.
            </p>
            <div className="space-y-4 mt-6">
              <div className="flex items-center space-x-3">
                <CheckCircle className="text-mabac-red w-6 h-6" />
                <span className="text-white">Daging Import Berkualitas Premium</span>
              </div>
              <div className="flex items-center space-x-3">
                <CheckCircle className="text-mabac-red w-6 h-6" />
                <span className="text-white">Saus Marinasi Resep Rahasia</span>
              </div>
              <div className="flex items-center space-x-3">
                <CheckCircle className="text-mabac-red w-6 h-6" />
                <span className="text-white">Sayuran Segar Setiap Hari</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
);

const MenuPage = () => {
  const [activeCategory, setActiveCategory] = React.useState<MenuItem['category'] | 'all'>('all');

  const filteredItems = activeCategory === 'all' 
    ? MENU_ITEMS 
    : MENU_ITEMS.filter(item => item.category === activeCategory);

  const categories = [
    { id: 'all', label: 'Semua' },
    { id: 'bbq', label: 'Korean BBQ' },
    { id: 'ramen', label: 'Ramen & Noodles' },
    { id: 'sides', label: 'Side Dishes' },
    { id: 'drinks', label: 'Minuman' },
  ];

  return (
    <div className="pt-24 pb-20 min-h-screen bg-black">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">Menu Kami</h1>
          <p className="text-gray-400">Pilihan hidangan terbaik untuk selera Anda</p>
        </div>

        {/* Category Filter */}
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {categories.map(cat => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id as any)}
              className={`px-6 py-2 rounded-full border transition-all ${
                activeCategory === cat.id
                  ? 'bg-mabac-red border-mabac-red text-white font-bold shadow-lg shadow-red-900/50'
                  : 'bg-transparent border-white/20 text-gray-400 hover:border-white hover:text-white'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Menu Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {filteredItems.map(item => (
            <div key={item.id} className="bg-neutral-900 rounded-xl overflow-hidden hover:shadow-xl hover:shadow-red-900/10 transition-all group">
              <div className="h-48 overflow-hidden relative">
                <img src={item.imageUrl} alt={item.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                {item.isBestSeller && (
                  <span className="absolute top-2 right-2 bg-mabac-red text-white text-xs font-bold px-2 py-1 rounded">
                    Popular
                  </span>
                )}
              </div>
              <div className="p-5">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="font-bold text-lg text-white">{item.name}</h3>
                </div>
                <p className="text-gray-400 text-sm mb-4 h-10 line-clamp-2">{item.description}</p>
                <div className="flex justify-between items-center mt-4 pt-4 border-t border-white/5">
                  <span className="text-white font-bold">Rp {item.price.toLocaleString('id-ID')}</span>
                  <button className="text-mabac-red text-sm font-semibold hover:text-white transition">Order</button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

const GalleryPage = () => {
  const [images, setImages] = React.useState<GalleryItem[]>([]);

  React.useEffect(() => {
    // Load images from our storage service which handles both default and added images
    setImages(getGalleryImages());
  }, []);

  return (
    <div className="pt-24 pb-20 bg-black min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-4xl font-bold text-white mb-12 text-center">Galeri <span className="text-mabac-red">Ma-Bac</span></h1>
        
        {images.length > 0 ? (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {images.map((item, idx) => (
              <div key={item.id} className={`rounded-xl overflow-hidden relative group ${idx % 5 === 0 ? 'md:col-span-2 md:row-span-2' : ''}`}>
                <img src={item.url} alt="Gallery" className="w-full h-full object-cover min-h-[200px] hover:scale-105 transition-transform duration-700" />
                <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  <span className="text-white font-bold tracking-widest uppercase text-sm md:text-base px-2 text-center">{item.caption || 'Ma-Bac Vibe'}</span>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-20">
            <ImageIcon className="w-16 h-16 text-gray-600 mx-auto mb-4" />
            <p className="text-gray-400">Belum ada foto di galeri.</p>
          </div>
        )}
      </div>
    </div>
  );
};

const ReservationPage = () => {
  const [formData, setFormData] = React.useState<ReservationData>({
    name: '', phone: '', date: '', time: '', pax: 2, notes: ''
  });
  const [submitted, setSubmitted] = React.useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, send to backend. Here we just mock it.
    console.log(formData);
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center px-4">
        <div className="bg-neutral-900 p-8 rounded-2xl border border-mabac-red/30 text-center max-w-md w-full">
          <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-6" />
          <h2 className="text-2xl font-bold text-white mb-4">Reservasi Terkirim!</h2>
          <p className="text-gray-300 mb-8">Terima kasih {formData.name}. Kami akan segera menghubungi WhatsApp Anda ({formData.phone}) untuk konfirmasi.</p>
          <Link to="/" className="bg-mabac-red text-white px-6 py-3 rounded-full font-bold">Kembali ke Home</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="pt-24 pb-20 bg-black min-h-screen">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-white">Reservasi Meja</h1>
          <p className="text-gray-400 mt-2">Amankan tempat Anda untuk pengalaman BBQ terbaik</p>
        </div>

        <div className="bg-neutral-900 rounded-2xl p-8 md:p-12 shadow-2xl border border-white/5">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-sm font-bold text-gray-300">Nama Lengkap</label>
                <input required type="text" name="name" value={formData.name} onChange={handleChange} className="w-full bg-black border border-white/20 rounded-lg px-4 py-3 text-white focus:border-mabac-red focus:ring-1 focus:ring-mabac-red outline-none transition" placeholder="John Doe" />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-bold text-gray-300">Nomor WhatsApp</label>
                <input required type="tel" name="phone" value={formData.phone} onChange={handleChange} className="w-full bg-black border border-white/20 rounded-lg px-4 py-3 text-white focus:border-mabac-red focus:ring-1 focus:ring-mabac-red outline-none transition" placeholder="0812..." />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="space-y-2">
                <label className="text-sm font-bold text-gray-300">Tanggal</label>
                <input required type="date" name="date" value={formData.date} onChange={handleChange} className="w-full bg-black border border-white/20 rounded-lg px-4 py-3 text-white focus:border-mabac-red outline-none" />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-bold text-gray-300">Jam</label>
                <input required type="time" name="time" value={formData.time} onChange={handleChange} className="w-full bg-black border border-white/20 rounded-lg px-4 py-3 text-white focus:border-mabac-red outline-none" />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-bold text-gray-300">Jumlah Tamu</label>
                <select name="pax" value={formData.pax} onChange={handleChange} className="w-full bg-black border border-white/20 rounded-lg px-4 py-3 text-white focus:border-mabac-red outline-none">
                  {[1, 2, 3, 4, 5, 6, 7, 8, "More"].map(n => (
                    <option key={n} value={n}>{n} Orang</option>
                  ))}
                </select>
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-bold text-gray-300">Catatan Tambahan (Opsional)</label>
              <textarea name="notes" value={formData.notes} onChange={handleChange} rows={3} className="w-full bg-black border border-white/20 rounded-lg px-4 py-3 text-white focus:border-mabac-red outline-none" placeholder="Request baby chair, ulang tahun, dll..."></textarea>
            </div>

            <button type="submit" className="w-full bg-mabac-red hover:bg-red-800 text-white font-bold py-4 rounded-lg text-lg transition-colors shadow-lg shadow-red-900/50">
              Konfirmasi Reservasi
            </button>
            <p className="text-xs text-center text-gray-500 mt-4">*Tim kami akan menghubungi Anda untuk konfirmasi akhir.</p>
          </form>
        </div>
      </div>
    </div>
  );
};

const ContactPage = () => {
  return (
    <div className="pt-24 pb-20 bg-black min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-4xl font-bold text-white mb-12 text-center">Lokasi & Kontak</h1>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Info Side */}
          <div className="space-y-8">
            <div className="bg-neutral-900 p-8 rounded-2xl border border-white/5">
              <h3 className="text-2xl font-bold text-white mb-6">Kunjungi Kami</h3>
              <div className="space-y-6">
                <div className="flex items-start">
                  <div className="bg-mabac-red/20 p-3 rounded-lg mr-4">
                    <MapPin className="text-mabac-red w-6 h-6" />
                  </div>
                  <div>
                    <h4 className="text-white font-bold">Alamat</h4>
                    <p className="text-gray-400">{CONTACT_INFO.address}</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="bg-mabac-red/20 p-3 rounded-lg mr-4">
                    <Clock className="text-mabac-red w-6 h-6" />
                  </div>
                  <div>
                    <h4 className="text-white font-bold">Jam Buka</h4>
                    <p className="text-gray-400">Senin - Jumat: 11:00 - 22:00</p>
                    <p className="text-gray-400">Sabtu - Minggu: 11:00 - 23:00</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="bg-mabac-red/20 p-3 rounded-lg mr-4">
                    <Users className="text-mabac-red w-6 h-6" />
                  </div>
                  <div>
                    <h4 className="text-white font-bold">Kontak</h4>
                    <p className="text-gray-400">{CONTACT_INFO.phone}</p>
                    <a href={`https://wa.me/${CONTACT_INFO.whatsapp}`} target="_blank" rel="noreferrer" className="text-mabac-red hover:underline block mt-1">Chat via WhatsApp</a>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Map Side */}
          <div className="h-[400px] lg:h-auto rounded-2xl overflow-hidden border border-white/10 shadow-xl">
             <iframe 
               src={CONTACT_INFO.mapsUrl} 
               width="100%" 
               height="100%" 
               style={{ border: 0 }} 
               allowFullScreen 
               loading="lazy" 
               referrerPolicy="no-referrer-when-downgrade"
               title="Ma-Bac Location"
               className="grayscale hover:grayscale-0 transition-all duration-500"
             ></iframe>
          </div>
        </div>
      </div>
    </div>
  );
};

const App: React.FC = () => {
  return (
    <Router>
      <div className="bg-black min-h-screen text-white font-sans selection:bg-mabac-red selection:text-white">
        <Navbar />
        
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/menu" element={<MenuPage />} />
          <Route path="/gallery" element={<GalleryPage />} />
          <Route path="/reservation" element={<ReservationPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/admin" element={<AdminPage />} />
        </Routes>

        <Footer />
        <AiChef />
      </div>
    </Router>
  );
};

export default App;