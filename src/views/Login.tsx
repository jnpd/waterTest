import React, { useState, useEffect } from 'react';
import { Shield, User, Lock, Loader2, ArrowRight, Droplets, Waves, Globe, Cpu, Activity } from 'lucide-react';
import { motion, useMotionValue, useSpring, useTransform } from 'motion/react';

interface LoginProps {
  onLogin: () => void;
}

export const LoginView: React.FC<LoginProps> = ({ onLogin }) => {
  const [loading, setLoading] = useState(false);
  
  // Mouse parallax effect
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  
  const springConfig = { damping: 25, stiffness: 150 };
  const dx = useSpring(mouseX, springConfig);
  const dy = useSpring(mouseY, springConfig);
  
  const bgX = useTransform(dx, [-500, 500], [20, -20]);
  const bgY = useTransform(dy, [-500, 500], [20, -20]);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX - window.innerWidth / 2);
      mouseY.set(e.clientY - window.innerHeight / 2);
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [mouseX, mouseY]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      onLogin();
      setLoading(false);
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-[#020617] flex items-center justify-center p-4 relative overflow-hidden">
      {/* Immersive Tech Background */}
      <motion.div 
        style={{ x: bgX, y: bgY }}
        className="absolute inset-0 z-0"
      >
        {/* Animated Water Waves (SVG) */}
        <div className="absolute bottom-0 left-0 w-full opacity-20">
          <svg className="w-full h-96" viewBox="0 0 1440 320" preserveAspectRatio="none">
            <motion.path
              animate={{ 
                d: [
                  "M0,160L48,176C96,192,192,224,288,224C384,224,480,192,576,165.3C672,139,768,117,864,128C960,139,1056,181,1152,186.7C1248,192,1344,160,1392,144L1440,128L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z",
                  "M0,192L48,181.3C96,171,192,149,288,160C384,171,480,213,576,213.3C672,213,768,171,864,144C960,117,1056,107,1152,128C1248,149,1344,203,1392,229.3L1440,256L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z",
                  "M0,160L48,176C96,192,192,224,288,224C384,224,480,192,576,165.3C672,139,768,117,864,128C960,139,1056,181,1152,186.7C1248,192,1344,160,1392,144L1440,128L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
                ]
              }}
              transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
              fill="#3b82f6"
            />
          </svg>
        </div>

        {/* Digital Grid */}
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-10" />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-blue-900/10 to-blue-900/40" />
        
        {/* Flowing Data Lines */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {[...Array(5)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute h-[1px] bg-gradient-to-r from-transparent via-blue-500/50 to-transparent w-full"
              style={{ top: `${20 * (i + 1)}%` }}
              animate={{ x: ['-100%', '100%'] }}
              transition={{ duration: 8 + i * 2, repeat: Infinity, ease: "linear", delay: i }}
            />
          ))}
        </div>

        {/* Floating Particles */}
        {[...Array(30)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-blue-400/30 rounded-full"
            initial={{ 
              x: Math.random() * 100 + "%", 
              y: Math.random() * 100 + "%",
              opacity: Math.random() * 0.5
            }}
            animate={{ 
              y: [null, "-100%"],
              opacity: [0, 0.5, 0],
              scale: [1, 1.5, 1]
            }}
            transition={{ 
              duration: Math.random() * 10 + 15, 
              repeat: Infinity, 
              ease: "linear",
              delay: Math.random() * 10
            }}
          />
        ))}
      </motion.div>

      <motion.div 
        initial={{ opacity: 0, y: 30, scale: 0.98 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="w-full max-w-[440px] relative z-10"
      >
        {/* Glassmorphism Container */}
        <div className="bg-white/5 backdrop-blur-3xl rounded-[2.5rem] border border-white/10 shadow-[0_0_80px_rgba(59,130,246,0.12)] overflow-hidden relative group">
          {/* Animated Border Glow */}
          <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 via-transparent to-indigo-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-1000 pointer-events-none" />
          
          {/* Header Section */}
          <div className="p-10 text-center relative">
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-40 h-[2px] bg-gradient-to-r from-transparent via-blue-500 to-transparent" />
            
            <motion.div 
              animate={{ 
                y: [0, -10, 0],
                rotate: [0, 5, -5, 0]
              }}
              transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
              className="w-24 h-24 bg-blue-600/10 rounded-full flex items-center justify-center mx-auto mb-6 border border-blue-500/20 relative group/icon"
            >
              <motion.div
                whileHover={{ scale: 1.2, rotate: 180 }}
                className="relative z-10"
              >
                <Droplets className="text-blue-400" size={44} />
              </motion.div>
              <div className="absolute inset-0 rounded-full border-2 border-blue-400/10 animate-[ping_3s_linear_infinite]" />
              <div className="absolute inset-2 rounded-full border border-blue-400/5 animate-[ping_4s_linear_infinite_1s]" />
              
              {/* Liquid Fill Effect Mockup */}
              <div className="absolute bottom-0 left-0 w-full h-1/3 bg-blue-500/5 rounded-b-full blur-xl" />
            </motion.div>
            
            <div className="mb-8">
              <motion.h1 
                initial={{ letterSpacing: "0.2em", opacity: 0 }}
                animate={{ letterSpacing: "0.05em", opacity: 1 }}
                transition={{ duration: 1 }}
                className="text-3xl font-black text-white tracking-tight mb-2"
              >
                智水科技 <span className="text-blue-500">SMART WATER</span>
              </motion.h1>
              <div className="flex items-center justify-center gap-3">
                <motion.div 
                  initial={{ width: 0 }}
                  animate={{ width: 32 }}
                  className="h-[1px] bg-gradient-to-r from-transparent to-blue-500/50" 
                />
                <p className="text-blue-200/40 text-[11px] font-mono uppercase tracking-[0.4em]">
                  自来水厂生产管理系统
                </p>
                <motion.div 
                  initial={{ width: 0 }}
                  animate={{ width: 32 }}
                  className="h-[1px] bg-gradient-to-l from-transparent to-blue-500/50" 
                />
              </div>
            </div>
          </div>

          {/* Form Section */}
          <form onSubmit={handleSubmit} className="px-10 pb-12 space-y-8">
            <div className="space-y-5">
              <motion.div 
                whileHover={{ x: 5 }}
                className="group"
              >
                <div className="flex items-center justify-between mb-2.5 px-1">
                  <label className="text-[11px] font-bold text-blue-400/70 tracking-widest flex items-center gap-2">
                    <Activity size={12} className="animate-pulse" />
                    账号 / USERNAME
                  </label>
                  <Cpu size={12} className="text-blue-500/30" />
                </div>
                <div className="relative">
                  <User className="absolute left-4 top-1/2 -translate-y-1/2 text-blue-400/30 group-focus-within:text-blue-400 transition-colors" size={20} />
                  <input 
                    type="text" 
                    defaultValue="admin"
                    className="w-full pl-12 pr-4 py-4.5 bg-white/5 border border-white/10 rounded-2xl text-white placeholder:text-white/20 focus:bg-white/10 focus:border-blue-500/50 outline-none transition-all font-medium text-sm"
                    placeholder="请输入登录账号"
                  />
                  <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-[2px] bg-blue-500 group-focus-within:w-full transition-all duration-500" />
                </div>
              </motion.div>

              <motion.div 
                whileHover={{ x: 5 }}
                className="group"
              >
                <div className="flex items-center justify-between mb-2.5 px-1">
                  <label className="text-[11px] font-bold text-blue-400/70 tracking-widest flex items-center gap-2">
                    <Shield size={12} />
                    密码 / PASSWORD
                  </label>
                  <Lock size={12} className="text-blue-500/30" />
                </div>
                <div className="relative">
                  <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-blue-400/30 group-focus-within:text-blue-400 transition-colors" size={20} />
                  <input 
                    type="password" 
                    defaultValue="123456"
                    className="w-full pl-12 pr-4 py-4.5 bg-white/5 border border-white/10 rounded-2xl text-white placeholder:text-white/20 focus:bg-white/10 focus:border-blue-500/50 outline-none transition-all font-medium text-sm"
                    placeholder="请输入登录密码"
                  />
                  <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-[2px] bg-blue-500 group-focus-within:w-full transition-all duration-500" />
                </div>
              </motion.div>
            </div>

            <div className="flex items-center justify-between text-xs">
              <motion.label 
                whileTap={{ scale: 0.95 }}
                className="flex items-center gap-2 text-blue-200/40 cursor-pointer hover:text-blue-200 transition-colors"
              >
                <input type="checkbox" className="rounded border-white/10 bg-white/5 text-blue-600 focus:ring-blue-500/50" />
                记住当前终端
              </motion.label>
              <motion.a 
                whileHover={{ scale: 1.05, color: '#60a5fa' }}
                href="#" 
                className="text-blue-400 transition-colors font-medium"
              >
                忘记密码?
              </motion.a>
            </div>

            <button 
              type="submit"
              disabled={loading}
              className="w-full py-5 bg-blue-600 hover:bg-blue-500 text-white rounded-2xl font-bold flex items-center justify-center gap-3 transition-all relative overflow-hidden group disabled:opacity-70 shadow-[0_10px_30px_-10px_rgba(37,99,235,0.5)]"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
              {loading ? (
                <Loader2 className="animate-spin" size={22} />
              ) : (
                <>
                  <span className="tracking-[0.2em] font-black text-sm uppercase">进入生产系统</span>
                  <ArrowRight size={20} className="group-hover:translate-x-2 transition-transform" />
                </>
              )}
            </button>
          </form>

          {/* Footer Info */}
          <div className="px-10 py-5 bg-white/5 border-t border-white/5 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="relative">
                <div className="w-2.5 h-2.5 bg-emerald-500 rounded-full" />
                <div className="absolute inset-0 bg-emerald-500 rounded-full animate-ping opacity-40" />
              </div>
              <span className="text-[10px] text-emerald-500/80 font-mono uppercase tracking-widest">系统运行正常</span>
            </div>
            <p className="text-[10px] text-white/20 font-mono tracking-tighter">© 智水科技 2024 | 工业级水务中枢</p>
          </div>
        </div>

        {/* Bottom Decorative Text */}
        <div className="mt-10 flex items-center justify-center gap-8 text-white/10">
          {[
            { icon: Shield, text: "安全加密" },
            { icon: Globe, text: "全球节点" },
            { icon: Waves, text: "水务逻辑" }
          ].map((item, idx) => (
            <motion.div 
              key={idx}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1 + idx * 0.2 }}
              className="flex items-center gap-2 group cursor-default"
            >
              <item.icon size={14} className="group-hover:text-blue-500/50 transition-colors" />
              <span className="text-[10px] font-mono uppercase tracking-[0.2em] group-hover:text-white/30 transition-colors">{item.text}</span>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  );
};
