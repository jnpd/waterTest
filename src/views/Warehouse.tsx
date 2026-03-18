import React, { useState } from 'react';
import { 
  Plus, 
  FileUp, 
  Scan,
  ArrowUpRight,
  ArrowDownLeft,
  Package,
  Clock as HistoryIcon,
  AlertCircle,
  Edit2,
  Trash2
} from 'lucide-react';
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

export const WarehouseView: React.FC = () => {
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

  return (
    <div className="p-6 space-y-6 bg-slate-50/50 min-h-full">
      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {[
          { label: '库存总数', value: '45,281', icon: Package, color: 'text-blue-600', bg: 'bg-blue-50' },
          { label: '今日入库', value: '1,200', icon: ArrowDownLeft, color: 'text-emerald-600', bg: 'bg-emerald-50' },
          { label: '今日出库', value: '850', icon: ArrowUpRight, color: 'text-amber-600', bg: 'bg-amber-50' },
          { label: '库存预警', value: '3', icon: AlertCircle, color: 'text-rose-600', bg: 'bg-rose-50' },
        ].map((stat) => (
          <div key={stat.label} className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm flex items-center gap-4 group hover:border-blue-200 transition-all">
            <div className={`p-3 rounded-xl ${stat.bg} group-hover:scale-110 transition-transform`}>
              <stat.icon className={stat.color} size={24} />
            </div>
            <div>
              <p className="text-[10px] text-slate-500 font-black uppercase tracking-widest">{stat.label}</p>
              <p className="text-xl font-black text-slate-900">{stat.value}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Main Content */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="p-4 border-b border-slate-100 flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-3 flex-1 min-w-[300px]">
            <SearchInput placeholder="扫描或输入表号/物料编码..." />
            <ActionButton variant="secondary" icon={Scan}>扫码入库</ActionButton>
          </div>
          <div className="flex items-center gap-2">
            <ActionButton icon={Plus} onClick={handleAdd}>手动新增</ActionButton>
            <ActionButton variant="outline" icon={FileUp}>批量导入</ActionButton>
            <ActionButton variant="outline" icon={HistoryIcon} className="text-slate-600">出入库记录</ActionButton>
          </div>
        </div>

        <TableContainer className="border-0 rounded-none shadow-none">
          <TableHead>
            <tr>
              <TableHeader>表号</TableHeader>
              <TableHeader>IMEI</TableHeader>
              <TableHeader>卡号</TableHeader>
              <TableHeader>型号</TableHeader>
              <TableHeader>生产任务号</TableHeader>
              <TableHeader>入库时间</TableHeader>
              <TableHeader>出库时间</TableHeader>
              <TableHeader>上报时间</TableHeader>
              <TableHeader>备注</TableHeader>
              <TableHeader className="text-right">操作</TableHeader>
            </tr>
          </TableHead>
          <tbody>
            {[
              { meterNo: '202403170001', imei: '861234567890121', simNo: '89860123456789012341', model: 'LXSG-20', taskNo: 'TASK-20240317', entryTime: '2024-03-17 10:00:00', exitTime: '-', reportTime: '2024-03-17 11:00:00', remark: '新入库' },
              { meterNo: '202403170002', imei: '861234567890122', simNo: '89860123456789012342', model: 'LXSG-15', taskNo: 'TASK-20240317', entryTime: '2024-03-17 10:05:00', exitTime: '2024-03-17 15:00:00', reportTime: '2024-03-17 11:05:00', remark: '已出库' },
            ].map((item, i) => (
              <TableRow key={i}>
                <TableCell className="font-mono font-black text-slate-900">{item.meterNo}</TableCell>
                <TableCell className="font-mono text-slate-500">{item.imei}</TableCell>
                <TableCell className="font-mono text-slate-500">{item.simNo}</TableCell>
                <TableCell className="text-slate-600 font-bold">{item.model}</TableCell>
                <TableCell className="text-slate-600 font-mono">{item.taskNo}</TableCell>
                <TableCell className="text-slate-500 text-xs">{item.entryTime}</TableCell>
                <TableCell className="text-slate-500 text-xs">{item.exitTime}</TableCell>
                <TableCell className="text-slate-500 text-xs">{item.reportTime}</TableCell>
                <TableCell className="text-slate-400 text-xs">{item.remark}</TableCell>
                <TableCell className="text-right">
                  <div className="flex items-center justify-end gap-1">
                    <ActionButton variant="ghost" size="sm" icon={Edit2} onClick={() => handleEdit(item)} />
                    <ActionButton variant="ghost" size="sm" icon={Trash2} className="text-rose-400 hover:text-rose-600" />
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </tbody>
        </TableContainer>
      </div>

      {/* Add/Edit Modal */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={editingItem ? '编辑物料' : '新增物料'}
        footer={
          <>
            <ActionButton variant="outline" onClick={() => setIsModalOpen(false)}>取消</ActionButton>
            <ActionButton onClick={() => setIsModalOpen(false)}>确定保存</ActionButton>
          </>
        }
      >
        <div className="space-y-4">
          <div className="space-y-1.5">
            <label className="text-xs font-black text-slate-400 uppercase tracking-widest">物料名称</label>
            <input 
              type="text" 
              defaultValue={editingItem?.name}
              placeholder="请输入物料名称"
              className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm font-bold focus:outline-none focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 transition-all"
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label className="text-xs font-black text-slate-400 uppercase tracking-widest">物料编码</label>
              <input 
                type="text" 
                defaultValue={editingItem?.code}
                placeholder="请输入物料编码"
                className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm font-bold focus:outline-none focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 transition-all"
              />
            </div>
            <div className="space-y-1.5">
              <label className="text-xs font-black text-slate-400 uppercase tracking-widest">规格型号</label>
              <input 
                type="text" 
                defaultValue={editingItem?.spec}
                placeholder="请输入规格型号"
                className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm font-bold focus:outline-none focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 transition-all"
              />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label className="text-xs font-black text-slate-400 uppercase tracking-widest">初始库存</label>
              <input 
                type="number" 
                defaultValue={editingItem?.stock || 0}
                className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm font-bold focus:outline-none focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 transition-all"
              />
            </div>
            <div className="space-y-1.5">
              <label className="text-xs font-black text-slate-400 uppercase tracking-widest">库位</label>
              <input 
                type="text" 
                defaultValue={editingItem?.loc}
                placeholder="请输入库位"
                className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm font-bold focus:outline-none focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 transition-all"
              />
            </div>
          </div>
        </div>
      </Modal>
    </div>
  );
};
