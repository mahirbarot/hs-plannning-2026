import React, { useState } from 'react';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import { auth } from '../firebase';
import { Lock, Mail, AlertCircle } from 'lucide-react';
import { motion } from 'motion/react';

const AdminLogin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigate('/admin/dashboard');
    } catch (err: any) {
      setError('Invalid credentials. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#F5F5F0] flex items-center justify-center p-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-md w-full bg-white p-12 shadow-2xl rounded-2xl"
      >
        <div className="text-center mb-12">
          <div className="w-16 h-16 bg-black text-white flex items-center justify-center text-3xl font-bold mx-auto mb-6 rounded-xl">HS</div>
          <h1 className="text-3xl font-serif text-black mb-2">Admin Portal</h1>
          <p className="text-black/40 text-sm">Secure access for HS Planning Ltd.</p>
        </div>

        {error && (
          <div className="bg-red-50 text-red-600 p-4 rounded-lg flex items-center gap-3 mb-8 text-sm">
            <AlertCircle size={18} />
            {error}
          </div>
        )}

        <form onSubmit={handleLogin} className="space-y-6">
          <div className="space-y-2">
            <label className="text-[10px] uppercase tracking-widest font-bold text-black/40">Email Address</label>
            <div className="relative">
              <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-black/20" size={18} />
              <input
                required
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-[#F5F5F0] border-none py-4 pl-12 pr-4 rounded-xl focus:ring-2 focus:ring-black outline-none transition-all"
                placeholder="admin@hsplanningltd.com"
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-[10px] uppercase tracking-widest font-bold text-black/40">Password</label>
            <div className="relative">
              <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-black/20" size={18} />
              <input
                required
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-[#F5F5F0] border-none py-4 pl-12 pr-4 rounded-xl focus:ring-2 focus:ring-black outline-none transition-all"
                placeholder="••••••••"
              />
            </div>
          </div>

          <button
            disabled={loading}
            type="submit"
            className="w-full bg-black text-white py-5 rounded-xl text-[10px] uppercase tracking-[0.3em] font-bold hover:bg-orange-500 transition-all duration-500 disabled:opacity-50"
          >
            {loading ? 'Authenticating...' : 'Sign In'}
          </button>
        </form>

        <div className="mt-12 text-center">
          <a href="/" className="text-[10px] uppercase tracking-widest font-bold text-black/20 hover:text-black transition-colors">
            Back to Website
          </a>
        </div>
      </motion.div>
    </div>
  );
};

export default AdminLogin;
