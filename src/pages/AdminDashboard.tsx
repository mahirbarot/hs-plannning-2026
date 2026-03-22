import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  LayoutDashboard, 
  Image as ImageIcon, 
  Briefcase, 
  Star, 
  Settings, 
  Plus, 
  Trash2, 
  LogOut,
  Save,
  Upload,
  X
} from 'lucide-react';
import { firebaseService } from '../services/firebaseService';
import { useAuth } from '../context/AuthContext';
import { auth } from '../firebase';
import { signOut } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import { HeroSlide, Service, Project, Review, ContactInfo } from '../types';
import { cn } from '../utils';

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState('hero');
  const { isAdmin } = useAuth();
  const navigate = useNavigate();

  // Data States
  const [heroSlides, setHeroSlides] = useState<HeroSlide[]>([]);
  const [services, setServices] = useState<Service[]>([]);
  const [projects, setProjects] = useState<Project[]>([]);
  const [reviews, setReviews] = useState<Review[]>([]);
  const [contactInfo, setContactInfo] = useState<ContactInfo[]>([]);

  // Form States
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<any>(null);
  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    if (!isAdmin) return;

    const unsubHero = firebaseService.subscribeToCollection('hero', setHeroSlides);
    const unsubServices = firebaseService.subscribeToCollection('services', setServices);
    const unsubProjects = firebaseService.subscribeToCollection('projects', setProjects, 'title');
    const unsubReviews = firebaseService.subscribeToCollection('reviews', setReviews, 'name');
    const unsubContact = firebaseService.subscribeToCollection('contactInfo', setContactInfo, 'name');

    return () => {
      unsubHero();
      unsubServices();
      unsubProjects();
      unsubReviews();
      unsubContact();
    };
  }, [isAdmin]);

  const handleLogout = async () => {
    await signOut(auth);
    navigate('/admin');
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>, folder: string) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploading(true);
    try {
      const url = await firebaseService.uploadImage(file, folder);
      setEditingItem({ ...editingItem, imageUrl: url });
    } catch (err) {
      console.error(err);
    } finally {
      setUploading(false);
    }
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (editingItem.id) {
      await firebaseService.updateItem(activeTab, editingItem.id, editingItem);
    } else {
      await firebaseService.addItem(activeTab, editingItem);
    }
    setIsModalOpen(false);
    setEditingItem(null);
  };

  const handleDelete = async (id: string, imageUrl?: string) => {
    if (window.confirm('Are you sure you want to delete this item?')) {
      await firebaseService.deleteItem(activeTab, id);
      if (imageUrl) await firebaseService.deleteImage(imageUrl);
    }
  };

  const tabs = [
    { id: 'hero', label: 'Hero Slides', icon: ImageIcon },
    { id: 'services', label: 'Services', icon: Settings },
    { id: 'projects', label: 'Projects', icon: Briefcase },
    { id: 'reviews', label: 'Reviews', icon: Star },
    { id: 'contactInfo', label: 'Contact Info', icon: LayoutDashboard },
  ];

  return (
    <div className="min-h-screen bg-[#F5F5F0] flex">
      {/* Sidebar */}
      <aside className="w-64 bg-black text-white p-8 flex flex-col">
        <div className="flex items-center gap-2 mb-12">
          <div className="w-8 h-8 bg-white flex items-center justify-center text-black font-bold text-lg">HS</div>
          <span className="font-bold tracking-tighter text-lg">ADMIN</span>
        </div>

        <nav className="flex-1 space-y-2">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={cn(
                "w-full flex items-center gap-4 px-4 py-3 rounded-xl text-xs font-bold uppercase tracking-widest transition-all",
                activeTab === tab.id ? "bg-white text-black" : "text-white/40 hover:text-white hover:bg-white/5"
              )}
            >
              <tab.icon size={18} />
              {tab.label}
            </button>
          ))}
        </nav>

        <button
          onClick={handleLogout}
          className="flex items-center gap-4 px-4 py-3 rounded-xl text-xs font-bold uppercase tracking-widest text-red-500 hover:bg-red-500/10 transition-all"
        >
          <LogOut size={18} />
          Logout
        </button>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-12 overflow-y-auto">
        <div className="flex justify-between items-center mb-12">
          <div>
            <h1 className="text-4xl font-serif text-black mb-2">
              {tabs.find(t => t.id === activeTab)?.label}
            </h1>
            <p className="text-black/40 text-sm">Manage your website content dynamically.</p>
          </div>
          <button
            onClick={() => {
              setEditingItem({});
              setIsModalOpen(true);
            }}
            className="bg-black text-white flex items-center gap-2 px-6 py-3 rounded-xl text-xs font-bold uppercase tracking-widest hover:bg-orange-500 transition-all"
          >
            <Plus size={18} />
            Add New
          </button>
        </div>

        {/* Content Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {activeTab === 'hero' && heroSlides.map(slide => (
            <div key={slide.id} className="bg-white p-6 rounded-2xl shadow-sm border border-black/5 group">
              <div className="aspect-video rounded-xl overflow-hidden mb-4 relative">
                <img src={slide.imageUrl} className="w-full h-full object-cover" />
                <div className="absolute top-2 right-2 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                  <button onClick={() => { setEditingItem(slide); setIsModalOpen(true); }} className="p-2 bg-white rounded-lg shadow-md text-black hover:text-orange-500"><Settings size={16} /></button>
                  <button onClick={() => handleDelete(slide.id, slide.imageUrl)} className="p-2 bg-white rounded-lg shadow-md text-red-500 hover:bg-red-50"><Trash2 size={16} /></button>
                </div>
              </div>
              <div className="text-xs font-bold uppercase tracking-widest text-black/40 mb-1">Order: {slide.order}</div>
              <div className="font-serif text-lg truncate">{slide.tagline}</div>
            </div>
          ))}

          {activeTab === 'services' && services.map(service => (
            <div key={service.id} className="bg-white p-8 rounded-2xl shadow-sm border border-black/5 group flex flex-col justify-between">
              <div>
                <h3 className="font-serif text-2xl mb-4">{service.title}</h3>
                <p className="text-sm text-black/40 line-clamp-3 mb-6">{service.description}</p>
              </div>
              <div className="flex justify-end gap-2">
                <button onClick={() => { setEditingItem(service); setIsModalOpen(true); }} className="p-3 bg-[#F5F5F0] rounded-xl text-black hover:bg-black hover:text-white transition-all"><Settings size={18} /></button>
                <button onClick={() => handleDelete(service.id)} className="p-3 bg-red-50 rounded-xl text-red-500 hover:bg-red-500 hover:text-white transition-all"><Trash2 size={18} /></button>
              </div>
            </div>
          ))}

          {activeTab === 'projects' && projects.map(project => (
            <div key={project.id} className="bg-white p-6 rounded-2xl shadow-sm border border-black/5 group">
              <div className="aspect-[4/5] rounded-xl overflow-hidden mb-4 relative">
                <img src={project.imageUrl} className="w-full h-full object-cover" />
                <div className="absolute top-2 right-2 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                  <button onClick={() => { setEditingItem(project); setIsModalOpen(true); }} className="p-2 bg-white rounded-lg shadow-md text-black hover:text-orange-500"><Settings size={16} /></button>
                  <button onClick={() => handleDelete(project.id, project.imageUrl)} className="p-2 bg-white rounded-lg shadow-md text-red-500 hover:bg-red-50"><Trash2 size={16} /></button>
                </div>
                <div className="absolute bottom-2 left-2 bg-black text-white text-[8px] uppercase tracking-widest px-2 py-1 rounded">
                  {project.category}
                </div>
              </div>
              <h3 className="font-serif text-lg mb-1">{project.title}</h3>
              <div className="text-[10px] text-black/40 uppercase tracking-widest">{project.location}</div>
            </div>
          ))}

          {activeTab === 'reviews' && reviews.map(review => (
            <div key={review.id} className="bg-white p-8 rounded-2xl shadow-sm border border-black/5 group flex flex-col justify-between">
              <div>
                <div className="flex gap-1 mb-4">
                  {[...Array(review.rating)].map((_, i) => <Star key={i} size={12} className="fill-orange-400 text-orange-400" />)}
                </div>
                <p className="text-sm text-black/60 italic mb-6">"{review.review}"</p>
                <div className="font-bold text-xs uppercase tracking-widest">{review.name}</div>
              </div>
              <div className="flex justify-end gap-2 mt-6">
                <button onClick={() => { setEditingItem(review); setIsModalOpen(true); }} className="p-3 bg-[#F5F5F0] rounded-xl text-black hover:bg-black hover:text-white transition-all"><Settings size={18} /></button>
                <button onClick={() => handleDelete(review.id)} className="p-3 bg-red-50 rounded-xl text-red-500 hover:bg-red-500 hover:text-white transition-all"><Trash2 size={18} /></button>
              </div>
            </div>
          ))}

          {activeTab === 'contactInfo' && contactInfo.map(info => (
            <div key={info.id} className="bg-white p-8 rounded-2xl shadow-sm border border-black/5 group flex flex-col justify-between">
              <div>
                <h3 className="font-serif text-2xl mb-4">{info.name}</h3>
                <div className="space-y-2 text-sm text-black/40">
                  <p>Email: {info.email}</p>
                  <p>WhatsApp: {info.whatsapp}</p>
                </div>
              </div>
              <div className="flex justify-end gap-2 mt-6">
                <button onClick={() => { setEditingItem(info); setIsModalOpen(true); }} className="p-3 bg-[#F5F5F0] rounded-xl text-black hover:bg-black hover:text-white transition-all"><Settings size={18} /></button>
                <button onClick={() => handleDelete(info.id)} className="p-3 bg-red-50 rounded-xl text-red-500 hover:bg-red-500 hover:text-white transition-all"><Trash2 size={18} /></button>
              </div>
            </div>
          ))}
        </div>
      </main>

      {/* Modal */}
      <AnimatePresence>
        {isModalOpen && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-6">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsModalOpen(false)}
              className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="relative bg-white w-full max-w-2xl rounded-3xl shadow-2xl overflow-hidden"
            >
              <div className="p-8 border-b border-black/5 flex justify-between items-center">
                <h2 className="text-2xl font-serif">
                  {editingItem?.id ? 'Edit Item' : 'Add New Item'}
                </h2>
                <button onClick={() => setIsModalOpen(false)} className="text-black/20 hover:text-black"><X size={24} /></button>
              </div>

              <form onSubmit={handleSave} className="p-8 space-y-6 max-h-[70vh] overflow-y-auto">
                {/* Dynamic Fields based on activeTab */}
                {activeTab === 'hero' && (
                  <>
                    <div className="space-y-2">
                      <label className="text-[10px] uppercase tracking-widest font-bold text-black/40">Tagline</label>
                      <input required value={editingItem.tagline || ''} onChange={e => setEditingItem({...editingItem, tagline: e.target.value})} className="w-full bg-[#F5F5F0] p-4 rounded-xl outline-none" />
                    </div>
                    <div className="space-y-2">
                      <label className="text-[10px] uppercase tracking-widest font-bold text-black/40">Order</label>
                      <input type="number" required value={editingItem.order || 0} onChange={e => setEditingItem({...editingItem, order: parseInt(e.target.value)})} className="w-full bg-[#F5F5F0] p-4 rounded-xl outline-none" />
                    </div>
                  </>
                )}

                {activeTab === 'services' && (
                  <>
                    <div className="space-y-2">
                      <label className="text-[10px] uppercase tracking-widest font-bold text-black/40">Title</label>
                      <input required value={editingItem.title || ''} onChange={e => setEditingItem({...editingItem, title: e.target.value})} className="w-full bg-[#F5F5F0] p-4 rounded-xl outline-none" />
                    </div>
                    <div className="space-y-2">
                      <label className="text-[10px] uppercase tracking-widest font-bold text-black/40">Description</label>
                      <textarea required rows={4} value={editingItem.description || ''} onChange={e => setEditingItem({...editingItem, description: e.target.value})} className="w-full bg-[#F5F5F0] p-4 rounded-xl outline-none resize-none" />
                    </div>
                    <div className="space-y-2">
                      <label className="text-[10px] uppercase tracking-widest font-bold text-black/40">Order</label>
                      <input type="number" required value={editingItem.order || 0} onChange={e => setEditingItem({...editingItem, order: parseInt(e.target.value)})} className="w-full bg-[#F5F5F0] p-4 rounded-xl outline-none" />
                    </div>
                  </>
                )}

                {activeTab === 'projects' && (
                  <>
                    <div className="space-y-2">
                      <label className="text-[10px] uppercase tracking-widest font-bold text-black/40">Title</label>
                      <input required value={editingItem.title || ''} onChange={e => setEditingItem({...editingItem, title: e.target.value})} className="w-full bg-[#F5F5F0] p-4 rounded-xl outline-none" />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <label className="text-[10px] uppercase tracking-widest font-bold text-black/40">Location</label>
                        <input required value={editingItem.location || ''} onChange={e => setEditingItem({...editingItem, location: e.target.value})} className="w-full bg-[#F5F5F0] p-4 rounded-xl outline-none" />
                      </div>
                      <div className="space-y-2">
                        <label className="text-[10px] uppercase tracking-widest font-bold text-black/40">Date</label>
                        <input required value={editingItem.date || ''} onChange={e => setEditingItem({...editingItem, date: e.target.value})} className="w-full bg-[#F5F5F0] p-4 rounded-xl outline-none" />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <label className="text-[10px] uppercase tracking-widest font-bold text-black/40">Category</label>
                      <select value={editingItem.category || 'success'} onChange={e => setEditingItem({...editingItem, category: e.target.value})} className="w-full bg-[#F5F5F0] p-4 rounded-xl outline-none">
                        <option value="success">Success</option>
                        <option value="progressing">Progressing</option>
                        <option value="upcoming">Upcoming</option>
                      </select>
                    </div>
                    <div className="space-y-2">
                      <label className="text-[10px] uppercase tracking-widest font-bold text-black/40">Description</label>
                      <textarea required rows={3} value={editingItem.description || ''} onChange={e => setEditingItem({...editingItem, description: e.target.value})} className="w-full bg-[#F5F5F0] p-4 rounded-xl outline-none resize-none" />
                    </div>
                  </>
                )}

                {activeTab === 'reviews' && (
                  <>
                    <div className="space-y-2">
                      <label className="text-[10px] uppercase tracking-widest font-bold text-black/40">Client Name</label>
                      <input required value={editingItem.name || ''} onChange={e => setEditingItem({...editingItem, name: e.target.value})} className="w-full bg-[#F5F5F0] p-4 rounded-xl outline-none" />
                    </div>
                    <div className="space-y-2">
                      <label className="text-[10px] uppercase tracking-widest font-bold text-black/40">Rating (1-5)</label>
                      <input type="number" min="1" max="5" required value={editingItem.rating || 5} onChange={e => setEditingItem({...editingItem, rating: parseInt(e.target.value)})} className="w-full bg-[#F5F5F0] p-4 rounded-xl outline-none" />
                    </div>
                    <div className="space-y-2">
                      <label className="text-[10px] uppercase tracking-widest font-bold text-black/40">Review</label>
                      <textarea required rows={4} value={editingItem.review || ''} onChange={e => setEditingItem({...editingItem, review: e.target.value})} className="w-full bg-[#F5F5F0] p-4 rounded-xl outline-none resize-none" />
                    </div>
                  </>
                )}

                {activeTab === 'contactInfo' && (
                  <>
                    <div className="space-y-2">
                      <label className="text-[10px] uppercase tracking-widest font-bold text-black/40">Consultant Name</label>
                      <input required value={editingItem.name || ''} onChange={e => setEditingItem({...editingItem, name: e.target.value})} className="w-full bg-[#F5F5F0] p-4 rounded-xl outline-none" />
                    </div>
                    <div className="space-y-2">
                      <label className="text-[10px] uppercase tracking-widest font-bold text-black/40">Email</label>
                      <input required type="email" value={editingItem.email || ''} onChange={e => setEditingItem({...editingItem, email: e.target.value})} className="w-full bg-[#F5F5F0] p-4 rounded-xl outline-none" />
                    </div>
                    <div className="space-y-2">
                      <label className="text-[10px] uppercase tracking-widest font-bold text-black/40">WhatsApp</label>
                      <input required value={editingItem.whatsapp || ''} onChange={e => setEditingItem({...editingItem, whatsapp: e.target.value})} className="w-full bg-[#F5F5F0] p-4 rounded-xl outline-none" />
                    </div>
                  </>
                )}

                {/* Image Upload for Hero and Projects */}
                {(activeTab === 'hero' || activeTab === 'projects') && (
                  <div className="space-y-2">
                    <label className="text-[10px] uppercase tracking-widest font-bold text-black/40">Image</label>
                    <div className="flex items-center gap-4">
                      {editingItem.imageUrl && (
                        <img src={editingItem.imageUrl} className="w-20 h-20 object-cover rounded-xl" />
                      )}
                      <label className="flex-1 border-2 border-dashed border-black/10 rounded-xl p-8 flex flex-col items-center justify-center cursor-pointer hover:bg-[#F5F5F0] transition-colors">
                        <Upload className="text-black/20 mb-2" />
                        <span className="text-[10px] uppercase font-bold tracking-widest text-black/40">
                          {uploading ? 'Uploading...' : 'Click to Upload'}
                        </span>
                        <input type="file" accept="image/*" className="hidden" onChange={e => handleImageUpload(e, activeTab)} />
                      </label>
                    </div>
                  </div>
                )}

                <button
                  disabled={uploading}
                  type="submit"
                  className="w-full bg-black text-white py-5 rounded-xl text-[10px] uppercase tracking-[0.3em] font-bold hover:bg-orange-500 transition-all duration-500 disabled:opacity-50"
                >
                  <Save size={18} className="inline mr-2" />
                  Save Changes
                </button>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default AdminDashboard;
