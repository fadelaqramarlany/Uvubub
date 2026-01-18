import React, { useState, useEffect } from 'react';
import { Lock, Plus, Trash2, Image as ImageIcon, Upload, LogOut, RefreshCw } from 'lucide-react';
import { getGalleryImages, addGalleryImage, removeGalleryImage, resetGallery } from '../utils/storage';
import { GalleryItem } from '../types';

const AdminPage: React.FC = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState('');
  const [images, setImages] = useState<GalleryItem[]>([]);
  const [newImageUrl, setNewImageUrl] = useState('');
  const [error, setError] = useState('');
  const [isUploading, setIsUploading] = useState(false);

  useEffect(() => {
    // Check session
    const session = sessionStorage.getItem('mabac_admin_session');
    if (session === 'true') {
      setIsAuthenticated(true);
      setImages(getGalleryImages());
    }
  }, []);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === 'admin123') {
      setIsAuthenticated(true);
      sessionStorage.setItem('mabac_admin_session', 'true');
      setImages(getGalleryImages());
      setError('');
    } else {
      setError('Password salah!');
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    sessionStorage.removeItem('mabac_admin_session');
    setPassword('');
  };

  const handleAddUrl = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newImageUrl.trim()) return;

    const updated = addGalleryImage(newImageUrl);
    setImages(updated);
    setNewImageUrl('');
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Limit file size to ~500KB for localStorage safety
    if (file.size > 500 * 1024) {
      alert("File terlalu besar! Maksimal 500KB untuk penyimpanan browser.");
      return;
    }

    setIsUploading(true);
    const reader = new FileReader();
    reader.onloadend = () => {
      const base64String = reader.result as string;
      const updated = addGalleryImage(base64String, "Uploaded Photo");
      setImages(updated);
      setIsUploading(false);
    };
    reader.readAsDataURL(file);
  };

  const handleDelete = (id: string) => {
    if (window.confirm('Yakin ingin menghapus foto ini?')) {
      const updated = removeGalleryImage(id);
      setImages(updated);
    }
  };

  const handleReset = () => {
    if (window.confirm('Reset galeri ke default? Semua foto yang diupload akan hilang.')) {
      const updated = resetGallery();
      setImages(updated);
    }
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center px-4 pt-20">
        <div className="bg-neutral-900 p-8 rounded-2xl border border-white/10 max-w-md w-full shadow-2xl">
          <div className="flex justify-center mb-6">
            <div className="bg-mabac-red p-4 rounded-full">
              <Lock className="w-8 h-8 text-white" />
            </div>
          </div>
          <h2 className="text-2xl font-bold text-white text-center mb-6">Admin Login</h2>
          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Masukkan Password (admin123)"
                className="w-full bg-black border border-white/20 rounded-lg px-4 py-3 text-white focus:border-mabac-red focus:outline-none transition"
              />
            </div>
            {error && <p className="text-red-500 text-sm text-center">{error}</p>}
            <button
              type="submit"
              className="w-full bg-mabac-red hover:bg-red-800 text-white font-bold py-3 rounded-lg transition"
            >
              Masuk
            </button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black pt-24 pb-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-white">Dashboard Admin</h1>
          <button onClick={handleLogout} className="flex items-center text-gray-400 hover:text-white transition">
            <LogOut className="w-5 h-5 mr-2" /> Logout
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
          {/* Upload Section */}
          <div className="lg:col-span-1 space-y-6">
            <div className="bg-neutral-900 p-6 rounded-xl border border-white/10">
              <h3 className="text-xl font-bold text-white mb-4 flex items-center">
                <Plus className="w-5 h-5 mr-2 text-mabac-red" /> Tambah Foto
              </h3>
              
              {/* URL Input */}
              <form onSubmit={handleAddUrl} className="mb-6">
                <label className="block text-sm text-gray-400 mb-2">Via URL</label>
                <div className="flex gap-2">
                  <input
                    type="url"
                    value={newImageUrl}
                    onChange={(e) => setNewImageUrl(e.target.value)}
                    placeholder="https://example.com/image.jpg"
                    className="flex-1 bg-black border border-white/20 rounded-lg px-3 py-2 text-sm text-white focus:border-mabac-red focus:outline-none"
                  />
                  <button type="submit" className="bg-white/10 hover:bg-white/20 text-white p-2 rounded-lg transition">
                    <Plus className="w-5 h-5" />
                  </button>
                </div>
              </form>

              <div className="relative my-6">
                <div className="absolute inset-0 flex items-center">
                  <span className="w-full border-t border-white/10" />
                </div>
                <div className="relative flex justify-center text-xs uppercase">
                  <span className="bg-neutral-900 px-2 text-gray-500">Atau</span>
                </div>
              </div>

              {/* File Upload */}
              <div>
                <label className="block text-sm text-gray-400 mb-2">Upload File (Max 500KB)</label>
                <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed border-white/20 rounded-lg cursor-pointer hover:border-mabac-red hover:bg-white/5 transition">
                  <div className="flex flex-col items-center justify-center pt-5 pb-6">
                    {isUploading ? (
                       <RefreshCw className="w-8 h-8 text-gray-400 animate-spin" />
                    ) : (
                       <Upload className="w-8 h-8 text-gray-400 mb-2" />
                    )}
                    <p className="text-xs text-gray-400">Klik untuk upload gambar</p>
                  </div>
                  <input type="file" accept="image/*" className="hidden" onChange={handleFileUpload} disabled={isUploading} />
                </label>
              </div>
            </div>

            <div className="bg-neutral-900 p-6 rounded-xl border border-white/10">
               <h3 className="text-lg font-bold text-white mb-4">Aksi Cepat</h3>
               <button 
                onClick={handleReset}
                className="w-full flex items-center justify-center space-x-2 bg-red-900/30 hover:bg-red-900/50 text-red-500 border border-red-900/50 py-3 rounded-lg transition text-sm font-bold"
              >
                <RefreshCw className="w-4 h-4" />
                <span>Reset Galeri ke Default</span>
              </button>
            </div>
          </div>

          {/* Gallery Grid */}
          <div className="lg:col-span-2">
            <div className="bg-neutral-900 p-6 rounded-xl border border-white/10 min-h-[500px]">
              <h3 className="text-xl font-bold text-white mb-6 flex items-center">
                <ImageIcon className="w-5 h-5 mr-2 text-mabac-red" /> Galeri Aktif ({images.length})
              </h3>
              
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                {images.map((img) => (
                  <div key={img.id} className="relative group aspect-square rounded-lg overflow-hidden bg-black border border-white/10">
                    <img 
                      src={img.url} 
                      alt="Gallery Item" 
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-black/80 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                      <button 
                        onClick={() => handleDelete(img.id)}
                        className="bg-red-600 hover:bg-red-700 text-white p-2 rounded-full transform hover:scale-110 transition"
                      >
                        <Trash2 className="w-5 h-5" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
              {images.length === 0 && (
                <div className="flex flex-col items-center justify-center h-64 text-gray-500">
                  <ImageIcon className="w-12 h-12 mb-2 opacity-50" />
                  <p>Belum ada foto.</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminPage;