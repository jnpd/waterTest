import React, { useState } from 'react';
import { 
  LayoutDashboard, 
  Database, 
  Warehouse, 
  Activity, 
  Clock as HistoryIcon, 
  Package, 
  Bell, 
  ShieldCheck,
  ChevronRight,
  ChevronDown,
  Building2,
  Users,
  Shield
} from 'lucide-react';
import { ViewType } from '../types';
import { motion, AnimatePresence } from 'motion/react';

interface SidebarProps {
  currentView: ViewType;
  onViewChange: (view: ViewType) => void;
}

interface MenuItem {
  id: ViewType;
  label: string;
  icon: any;
  subItems?: MenuItem[];
}

interface MenuGroup {
  label: string;
  items: MenuItem[];
}

const menuGroups: MenuGroup[] = [
  {
    label: '生产系统',
    items: [
      { id: 'archive', label: '表具档案管理', icon: Database },
      { id: 'warehouse', label: '仓库管理', icon: Warehouse },
      { id: 'testing', label: '批量测试', icon: Activity },
      { id: 'history', label: '测试历史记录', icon: HistoryIcon },
      { id: 'packaging', label: '包装管理', icon: Package },
    ]
  },
  {
    label: '系统管理',
    items: [
      { id: 'announcement', label: '公告管理', icon: Bell },
      { 
        id: 'permissions', 
        label: '账户与权限', 
        icon: ShieldCheck,
        subItems: [
          { id: 'enterprise', label: '企业管理', icon: Building2 },
          { id: 'user-account', label: '子账号管理', icon: Users },
          { id: 'role-management', label: '角色管理', icon: Shield },
        ]
      },
    ]
  }
];

export const Sidebar: React.FC<SidebarProps> = ({ currentView, onViewChange }) => {
  const [expandedGroups, setExpandedGroups] = useState<string[]>(['生产系统', '系统管理']);
  const [expandedSubMenus, setExpandedSubMenus] = useState<string[]>(['permissions']);

  const toggleGroup = (label: string) => {
    setExpandedGroups(prev => 
      prev.includes(label) ? prev.filter(l => l !== label) : [...prev, label]
    );
  };

  const toggleSubMenu = (id: string) => {
    setExpandedSubMenus(prev => 
      prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]
    );
  };

  const isSubItemActive = (item: MenuItem) => {
    if (currentView === item.id) return true;
    return item.subItems?.some(sub => sub.id === currentView) || false;
  };

  return (
    <div className="w-64 bg-gradient-to-br from-[#001529] via-[#002140] to-[#000d1a] text-white h-screen flex flex-col relative z-20 shadow-[4px_0_24px_rgba(0,0,0,0.3)] border-r border-white/5">
      {/* Background Decorative Layer */}
      <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-5 pointer-events-none" />
      <div className="absolute inset-0 bg-gradient-to-b from-blue-600/10 via-transparent to-black/20 pointer-events-none" />
      
      <div className="p-6 flex items-center gap-3 border-b border-white/5 relative">
        <div className="w-9 h-9 bg-gradient-to-br from-blue-500 to-blue-700 rounded-xl flex items-center justify-center font-black text-xl shadow-xl shadow-blue-500/20 border border-white/20 transform -rotate-2 group-hover:rotate-0 transition-transform duration-500">
          W
        </div>
        <div className="flex flex-col">
          <span className="font-black text-base tracking-tight leading-none">智慧水务</span>
          <span className="text-[10px] font-bold text-blue-400/80 uppercase tracking-[0.15em] mt-1.5">Smart Water OS</span>
        </div>
      </div>
      
      <nav className="flex-1 overflow-y-auto py-4 scrollbar-hide relative">
        {menuGroups.map(group => (
          <div key={group.label} className="mb-4">
            <button 
              onClick={() => toggleGroup(group.label)}
              className="w-full px-6 py-3 flex items-center justify-between text-[11px] font-black text-slate-400 uppercase tracking-[0.15em] hover:text-blue-400 transition-colors group/header"
            >
              <div className="flex items-center gap-2">
                <div className="w-1 h-1 rounded-full bg-blue-500/50 group-hover/header:bg-blue-400 transition-colors" />
                {group.label}
              </div>
              <div className="p-1 rounded bg-white/5 group-hover/header:bg-white/10 transition-colors">
                {expandedGroups.includes(group.label) ? <ChevronDown size={10} /> : <ChevronRight size={10} />}
              </div>
            </button>
            
            <AnimatePresence initial={false}>
              {expandedGroups.includes(group.label) && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
                  className="overflow-hidden mt-1"
                >
                  {group.items.map(item => {
                    const hasSubItems = item.subItems && item.subItems.length > 0;
                    const isActive = isSubItemActive(item);
                    const isExpanded = expandedSubMenus.includes(item.id);

                    return (
                      <div key={item.id} className="px-3">
                        <button
                          onClick={() => {
                            if (hasSubItems) {
                              toggleSubMenu(item.id);
                            } else {
                              onViewChange(item.id);
                            }
                          }}
                          className={`w-full px-4 py-2 flex items-center gap-3 transition-all duration-300 rounded-xl group relative mb-0.5 ${
                            isActive && !hasSubItems
                              ? 'bg-gradient-to-r from-blue-600 to-blue-500 text-white shadow-lg shadow-blue-600/20' 
                              : 'text-gray-400 hover:bg-white/5 hover:text-white'
                          }`}
                        >
                          <div className={`p-1.5 rounded-lg transition-colors ${
                            isActive && !hasSubItems ? 'bg-white/20' : 'bg-white/5 group-hover:bg-white/10'
                          }`}>
                            <item.icon size={16} className={isActive ? 'text-white' : 'text-gray-400 group-hover:text-white'} />
                          </div>
                          <span className="flex-1 text-left text-[13px] font-bold tracking-tight">{item.label}</span>
                          {hasSubItems && (
                            <div className={`transition-transform duration-300 ${isExpanded ? 'rotate-90' : ''}`}>
                              <ChevronRight size={12} className="text-gray-600" />
                            </div>
                          )}
                        </button>

                        {hasSubItems && (
                          <AnimatePresence initial={false}>
                            {isExpanded && (
                              <motion.div
                                initial={{ height: 0, opacity: 0 }}
                                animate={{ height: 'auto', opacity: 1 }}
                                exit={{ height: 0, opacity: 0 }}
                                transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
                                className="overflow-hidden ml-4 border-l border-white/5 mb-1"
                              >
                                {item.subItems?.map(sub => (
                                  <button
                                    key={sub.id}
                                    onClick={() => onViewChange(sub.id)}
                                    className={`w-full pl-8 pr-4 py-1.5 flex items-center gap-3 transition-all duration-200 group relative ${
                                      currentView === sub.id 
                                        ? 'text-white' 
                                        : 'text-slate-400 hover:text-white'
                                    }`}
                                  >
                                    <div className={`absolute left-0 w-1 h-1 rounded-full transition-all ${
                                      currentView === sub.id ? 'bg-blue-500 scale-100' : 'bg-gray-700 scale-50 group-hover:scale-100 group-hover:bg-gray-500'
                                    }`} />
                                    <span className="text-xs font-bold tracking-tight">{sub.label}</span>
                                  </button>
                                ))}
                              </motion.div>
                            )}
                          </AnimatePresence>
                        )}
                      </div>
                    );
                  })}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        ))}
      </nav>
      
    </div>
  );
};
