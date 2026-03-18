import React, { useState } from 'react';
import { 
  Building2, 
  Users, 
  ShieldCheck, 
  Plus, 
  Edit2, 
  Trash2,
  Globe
} from 'lucide-react';
import { Enterprise, UserAccount, Role } from '../types';
import { 
  SearchInput, 
  TableContainer, 
  TableHead, 
  TableHeader, 
  TableRow, 
  TableCell, 
  StatusBadge, 
  ActionButton,
  Modal
} from '../components/UIComponents';

const mockEnterprises: Enterprise[] = [
  { id: '1', name: '智慧水务有限公司', code: 'ENT-001', adminName: '张总', status: 'active', createdAt: '2024-01-01' },
  { id: '2', name: '工业仪表制造厂', code: 'ENT-002', adminName: '李厂长', status: 'active', createdAt: '2024-02-15' },
];

const mockUsers: UserAccount[] = [
  { id: '1', username: 'admin_zhsw', realName: '张三', role: '企业管理员', enterpriseId: '1', status: 'active', lastLogin: '2024-03-17 10:00' },
  { id: '2', username: 'op_zhsw_01', realName: '李四', role: '生产操作员', enterpriseId: '1', status: 'active', lastLogin: '2024-03-17 09:30' },
];

const mockRoles: Role[] = [
  { id: '1', name: '企业管理员', description: '拥有企业内所有数据管理权限', permissions: ['all'] },
  { id: '2', name: '生产操作员', description: '仅可进行生产测试与包装作业', permissions: ['testing', 'packaging'] },
];

interface PermissionsViewProps {
  initialTab?: 'enterprise' | 'user' | 'role';
  hideTabs?: boolean;
}

export const PermissionsView: React.FC<PermissionsViewProps> = ({ initialTab = 'enterprise', hideTabs = false }) => {
  const [activeTab, setActiveTab] = useState<'enterprise' | 'user' | 'role'>(initialTab);
  
  // Use useEffect to update activeTab when initialTab changes from parent
  React.useEffect(() => {
    setActiveTab(initialTab);
  }, [initialTab]);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<any>(null);

  const handleAdd = () => {
    setEditingItem(null);
    setIsModalOpen(true);
  };

  const handleEdit = (item: any) => {
    setEditingItem(item);
    setIsModalOpen(true);
  };

  const getModalTitle = () => {
    const action = editingItem ? '编辑' : '新增';
    const type = activeTab === 'enterprise' ? '企业' : activeTab === 'user' ? '账号' : '角色';
    return `${action}${type}`;
  };

  return (
    <div className="p-6 space-y-6 bg-slate-50/50 min-h-full">
      {/* Tabs */}
      {!hideTabs && (
        <div className="flex items-center gap-1 p-1 bg-slate-100 rounded-xl w-fit border border-slate-200">
          {[
            { id: 'enterprise', label: '企业管理', icon: Building2 },
            { id: 'user', label: '子账号管理', icon: Users },
            { id: 'role', label: '角色管理', icon: ShieldCheck },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`flex items-center gap-2 px-6 py-2 rounded-lg text-sm font-black transition-all ${
                activeTab === tab.id
                  ? 'bg-white text-primary shadow-sm'
                  : 'text-slate-500 hover:text-slate-700'
              }`}
            >
              <tab.icon size={16} />
              {tab.label}
            </button>
          ))}
        </div>
      )}

      {/* Toolbar */}
      <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm flex items-center justify-between gap-4">
        <SearchInput 
          placeholder={`搜索${activeTab === 'enterprise' ? '企业' : activeTab === 'user' ? '账号' : '角色'}...`} 
        />
        <ActionButton icon={Plus} onClick={handleAdd}>
          新增{activeTab === 'enterprise' ? '企业' : activeTab === 'user' ? '账号' : '角色'}
        </ActionButton>
      </div>

      {/* Content */}
      <TableContainer>
        {activeTab === 'enterprise' && (
          <>
            <TableHead>
              <tr>
                <TableHeader>企业名称</TableHeader>
                <TableHeader>企业编码</TableHeader>
                <TableHeader>管理员</TableHeader>
                <TableHeader>创建时间</TableHeader>
                <TableHeader>状态</TableHeader>
                <TableHeader className="text-right">操作</TableHeader>
              </tr>
            </TableHead>
            <tbody>
              {mockEnterprises.map(ent => (
                <TableRow key={ent.id}>
                  <TableCell className="font-black text-slate-900">{ent.name}</TableCell>
                  <TableCell className="font-mono text-slate-500 font-bold">{ent.code}</TableCell>
                  <TableCell className="text-slate-600 font-medium">{ent.adminName}</TableCell>
                  <TableCell className="text-slate-500 font-medium">{ent.createdAt}</TableCell>
                  <TableCell>
                    <StatusBadge variant="success">正常</StatusBadge>
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex items-center justify-end gap-1">
                      <ActionButton variant="ghost" size="sm" icon={Edit2} onClick={() => handleEdit(ent)} className="text-slate-400 hover:text-primary" />
                      <ActionButton variant="ghost" size="sm" icon={Trash2} className="text-slate-400 hover:text-rose-600" />
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </tbody>
          </>
        )}

        {activeTab === 'user' && (
          <>
            <TableHead>
              <tr>
                <TableHeader>账号名称</TableHeader>
                <TableHeader>真实姓名</TableHeader>
                <TableHeader>所属角色</TableHeader>
                <TableHeader>最后登录</TableHeader>
                <TableHeader>状态</TableHeader>
                <TableHeader className="text-right">操作</TableHeader>
              </tr>
            </TableHead>
            <tbody>
              {mockUsers.map(user => (
                <TableRow key={user.id}>
                  <TableCell className="font-black text-slate-900">{user.username}</TableCell>
                  <TableCell className="text-slate-600 font-bold">{user.realName}</TableCell>
                  <TableCell>
                    <StatusBadge variant="info">{user.role}</StatusBadge>
                  </TableCell>
                  <TableCell className="text-slate-500 font-medium">{user.lastLogin}</TableCell>
                  <TableCell>
                    <StatusBadge variant="success">正常</StatusBadge>
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex items-center justify-end gap-1">
                      <ActionButton variant="ghost" size="sm" icon={Edit2} onClick={() => handleEdit(user)} className="text-slate-400 hover:text-primary" />
                      <ActionButton variant="ghost" size="sm" icon={Trash2} className="text-slate-400 hover:text-rose-600" />
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </tbody>
          </>
        )}

        {activeTab === 'role' && (
          <>
            <TableHead>
              <tr>
                <TableHeader>角色名称</TableHeader>
                <TableHeader>描述</TableHeader>
                <TableHeader>权限范围</TableHeader>
                <TableHeader className="text-right">操作</TableHeader>
              </tr>
            </TableHead>
            <tbody>
              {mockRoles.map(role => (
                <TableRow key={role.id}>
                  <TableCell className="font-black text-slate-900">{role.name}</TableCell>
                  <TableCell className="text-slate-600 font-medium">{role.description}</TableCell>
                  <TableCell>
                    <div className="flex flex-wrap gap-1">
                      {role.permissions.map(p => (
                        <StatusBadge key={p}>{p}</StatusBadge>
                      ))}
                    </div>
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex items-center justify-end gap-1">
                      <ActionButton variant="ghost" size="sm" icon={Edit2} onClick={() => handleEdit(role)} className="text-slate-400 hover:text-primary" />
                      <ActionButton variant="ghost" size="sm" icon={Trash2} className="text-slate-400 hover:text-rose-600" />
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </tbody>
          </>
        )}
      </TableContainer>

      {/* Tenant Isolation Info */}
      <div className="p-8 bg-primary text-white rounded-xl shadow-2xl shadow-primary/20 relative overflow-hidden group">
        <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -mr-32 -mt-32 blur-3xl group-hover:scale-150 transition-transform duration-1000" />
        <div className="relative z-10 flex items-start gap-8">
          <div className="p-5 bg-white/20 rounded-2xl backdrop-blur-md border border-white/20 shadow-xl">
            <Globe size={40} className="animate-pulse" />
          </div>
          <div>
            <h4 className="text-2xl font-black tracking-tight">租户级数据隔离已开启</h4>
            <p className="text-sm text-white/80 mt-3 leading-relaxed font-medium max-w-3xl">
              系统当前运行在多租户模式下。企业管理功能仅超级管理员可见，各企业账号登录后仅能访问所属企业范围内的表具档案、测试记录及仓库数据。
              所有敏感操作均已记录审计日志。
            </p>
            <div className="mt-6 flex items-center gap-4">
              <div className="px-3 py-1 bg-white/10 rounded-full border border-white/10 text-[10px] font-black uppercase tracking-widest">
                Security Level: High
              </div>
              <div className="px-3 py-1 bg-white/10 rounded-full border border-white/10 text-[10px] font-black uppercase tracking-widest">
                Encryption: AES-256
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Add/Edit Modal */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={getModalTitle()}
        footer={
          <>
            <ActionButton variant="outline" onClick={() => setIsModalOpen(false)}>取消</ActionButton>
            <ActionButton onClick={() => setIsModalOpen(false)}>确定保存</ActionButton>
          </>
        }
      >
        <div className="space-y-4">
          {activeTab === 'enterprise' && (
            <>
              <div className="space-y-1.5">
                <label className="text-xs font-black text-slate-400 uppercase tracking-widest">企业名称</label>
                <input 
                  type="text" 
                  defaultValue={editingItem?.name}
                  placeholder="请输入企业名称"
                  className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm font-bold focus:outline-none focus:ring-4 focus:ring-primary/10 focus:border-primary transition-all"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-xs font-black text-slate-400 uppercase tracking-widest">企业编码</label>
                  <input 
                    type="text" 
                    defaultValue={editingItem?.code}
                    placeholder="请输入企业编码"
                    className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm font-bold focus:outline-none focus:ring-4 focus:ring-primary/10 focus:border-primary transition-all"
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="text-xs font-black text-slate-400 uppercase tracking-widest">管理员姓名</label>
                  <input 
                    type="text" 
                    defaultValue={editingItem?.adminName}
                    placeholder="请输入管理员姓名"
                    className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm font-bold focus:outline-none focus:ring-4 focus:ring-primary/10 focus:border-primary transition-all"
                  />
                </div>
              </div>
            </>
          )}

          {activeTab === 'user' && (
            <>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-xs font-black text-slate-400 uppercase tracking-widest">账号名称</label>
                  <input 
                    type="text" 
                    defaultValue={editingItem?.username}
                    placeholder="请输入账号名称"
                    className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm font-bold focus:outline-none focus:ring-4 focus:ring-primary/10 focus:border-primary transition-all"
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="text-xs font-black text-slate-400 uppercase tracking-widest">真实姓名</label>
                  <input 
                    type="text" 
                    defaultValue={editingItem?.realName}
                    placeholder="请输入真实姓名"
                    className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm font-bold focus:outline-none focus:ring-4 focus:ring-primary/10 focus:border-primary transition-all"
                  />
                </div>
              </div>
              <div className="space-y-1.5">
                <label className="text-xs font-black text-slate-400 uppercase tracking-widest">所属角色</label>
                <select 
                  defaultValue={editingItem?.role}
                  className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm font-bold focus:outline-none focus:ring-4 focus:ring-primary/10 focus:border-primary transition-all"
                >
                  {mockRoles.map(role => (
                    <option key={role.id} value={role.name}>{role.name}</option>
                  ))}
                </select>
              </div>
            </>
          )}

          {activeTab === 'role' && (
            <>
              <div className="space-y-1.5">
                <label className="text-xs font-black text-slate-400 uppercase tracking-widest">角色名称</label>
                <input 
                  type="text" 
                  defaultValue={editingItem?.name}
                  placeholder="请输入角色名称"
                  className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm font-bold focus:outline-none focus:ring-4 focus:ring-primary/10 focus:border-primary transition-all"
                />
              </div>
              <div className="space-y-1.5">
                <label className="text-xs font-black text-slate-400 uppercase tracking-widest">角色描述</label>
                <textarea 
                  rows={3}
                  defaultValue={editingItem?.description}
                  placeholder="请输入角色描述..."
                  className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm font-bold focus:outline-none focus:ring-4 focus:ring-primary/10 focus:border-primary transition-all resize-none"
                />
              </div>
            </>
          )}
        </div>
      </Modal>
    </div>
  );
};
