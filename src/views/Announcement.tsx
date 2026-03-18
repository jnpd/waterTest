import React from 'react';
import { 
  Bell, 
  Plus, 
  Search, 
  Calendar, 
  ChevronRight, 
  Megaphone,
  Info,
  AlertTriangle
} from 'lucide-react';

const mockAnnouncements = [
  { id: '1', title: '关于 2024 年清明节期间系统维护的通知', type: 'system', date: '2024-03-17', content: '为了提供更稳定的服务，系统将于 4 月 4 日凌晨进行例行维护...', priority: 'high' },
  { id: '2', title: 'NB-IoT 协议库更新至 v3.2.1', type: 'update', date: '2024-03-15', content: '本次更新优化了弱信号环境下的上报成功率，请各生产线注意...', priority: 'normal' },
  { id: '3', title: '新版包装标签打印插件下载', type: 'notice', date: '2024-03-10', content: '请各车间下载并安装最新的打印插件，以支持二维码扫描...', priority: 'normal' },
];

export const AnnouncementView: React.FC = () => {
  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-bold text-gray-800">公告管理</h3>
        <button className="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700 flex items-center gap-2">
          <Plus size={16} /> 发布新公告
        </button>
      </div>

      <div className="grid grid-cols-1 gap-4">
        {mockAnnouncements.map((item) => (
          <div key={item.id} className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm hover:shadow-md transition-all group cursor-pointer">
            <div className="flex items-start justify-between">
              <div className="flex items-start gap-4">
                <div className={`p-3 rounded-xl ${
                  item.priority === 'high' ? 'bg-red-50 text-red-600' : 'bg-blue-50 text-blue-600'
                }`}>
                  <Megaphone size={24} />
                </div>
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <h4 className="font-bold text-gray-900 group-hover:text-blue-600 transition-colors">{item.title}</h4>
                    {item.priority === 'high' && (
                      <span className="px-2 py-0.5 bg-red-100 text-red-700 text-[10px] rounded font-bold uppercase">重要</span>
                    )}
                  </div>
                  <p className="text-sm text-gray-500 line-clamp-1">{item.content}</p>
                  <div className="flex items-center gap-4 mt-3 text-xs text-gray-400">
                    <span className="flex items-center gap-1"><Calendar size={14} /> {item.date}</span>
                    <span className="flex items-center gap-1"><Info size={14} /> 系统通知</span>
                  </div>
                </div>
              </div>
              <ChevronRight className="text-gray-300 group-hover:text-blue-500 transition-colors" size={24} />
            </div>
          </div>
        ))}
      </div>

      {/* Announcement Preview for Users */}
      <div className="mt-12 p-8 bg-slate-900 rounded-2xl text-white relative overflow-hidden">
        <div className="relative z-10 max-w-lg">
          <div className="flex items-center gap-2 text-amber-400 mb-4">
            <AlertTriangle size={20} />
            <span className="text-xs font-bold uppercase tracking-wider">登录自动弹出预览</span>
          </div>
          <h2 className="text-2xl font-bold mb-4">系统公告弹窗逻辑</h2>
          <p className="text-slate-400 text-sm leading-relaxed mb-6">
            当管理员发布“重要”级别的公告时，所有关联企业的用户在下次登录系统时，系统将自动弹出全屏公告窗口，确保生产指令与维护通知 100% 触达。
          </p>
          <button className="px-6 py-2 bg-blue-600 text-white rounded-lg text-sm font-bold hover:bg-blue-700 transition-colors">
            模拟弹出效果
          </button>
        </div>
        <div className="absolute right-0 top-0 h-full w-1/3 bg-gradient-to-l from-blue-600/20 to-transparent" />
        <Megaphone size={200} className="absolute -right-20 -bottom-20 text-white/5 rotate-12" />
      </div>
    </div>
  );
};
