import React, { useState } from 'react';
import { 
  Plus, 
  FileUp, 
  FileDown, 
  Filter,
  Edit2,
  Trash2,
  MoreHorizontal
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
  Modal,
  ColumnSettings
} from '../components/UIComponents';

export const ArchiveView: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<any>(null);

  // Column visibility state
  const [columns, setColumns] = useState([
    { id: 'model', label: '型号', visible: true },
    { id: 'caliber', label: '口径', visible: true },
    { id: 'protocol', label: '协议', visible: true },
    { id: 'entryTime', label: '入库时间', visible: true },
    { id: 'reportTime', label: '上报时间', visible: true },
    { id: 'taskNo', label: '生产任务号', visible: true },
    { id: 'remark', label: '备注', visible: true },
  ]);

  const toggleColumn = (id: string) => {
    setColumns(prev => prev.map(col => col.id === id ? { ...col, visible: !col.visible } : col));
  };

  // Sorting state
  const [sortConfig, setSortConfig] = useState<{ key: string; direction: 'asc' | 'desc' | null }>({
    key: '',
    direction: null
  });

  const handleSort = (key: string) => {
    let direction: 'asc' | 'desc' | null = 'asc';
    if (sortConfig.key === key && sortConfig.direction === 'asc') {
      direction = 'desc';
    } else if (sortConfig.key === key && sortConfig.direction === 'desc') {
      direction = null;
    }
    setSortConfig({ key, direction });
  };

  const isVisible = (id: string) => columns.find(c => c.id === id)?.visible;

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
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {[
          { label: '设备总数', value: '12,482', sub: '较上月 +12%', color: 'text-primary', bg: 'bg-primary/5' },
          { label: 'LXSG-20 型号', value: '8,231', sub: '占比 65.9%', color: 'text-emerald-600', bg: 'bg-emerald-50' },
          { label: 'NB-IoT 协议', value: '11,024', sub: '占比 88.3%', color: 'text-violet-600', bg: 'bg-violet-50' },
        ].map((stat) => (
          <div key={stat.label} className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm relative overflow-hidden group hover:shadow-md transition-all">
            <div className={`absolute top-0 right-0 w-24 h-24 ${stat.bg} rounded-full -mr-12 -mt-12 opacity-50 blur-2xl group-hover:scale-150 transition-transform duration-700`} />
            <p className="text-[10px] text-slate-400 font-black uppercase tracking-widest relative z-10">{stat.label}</p>
            <div className="mt-4 flex items-baseline gap-3 relative z-10">
              <span className="text-3xl font-black text-slate-900 tracking-tight">{stat.value}</span>
              <span className={`text-[10px] font-black px-2 py-0.5 rounded-full ${stat.color} ${stat.bg}`}>{stat.sub}</span>
            </div>
          </div>
        ))}
      </div>

      {/* Toolbar */}
      <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-3 flex-1 min-w-[300px]">
          <SearchInput placeholder="搜索表号、IMEI、生产任务号..." />
          <ActionButton variant="outline" icon={Filter}>筛选</ActionButton>
        </div>
        <div className="flex items-center gap-2">
          <ColumnSettings columns={columns} onToggle={toggleColumn} />
          <ActionButton icon={Plus} onClick={handleAdd}>新增档案</ActionButton>
          <div className="w-px h-6 bg-slate-200 mx-1" />
          <ActionButton variant="outline" icon={FileUp} size="sm">导入</ActionButton>
          <ActionButton variant="outline" icon={FileDown} size="sm">导出</ActionButton>
        </div>
      </div>

      {/* Table */}
      <TableContainer>
        <TableHead>
          <tr>
            {isVisible('model') && (
              <TableHeader 
                sortable 
                sortDirection={sortConfig.key === 'model' ? sortConfig.direction : null}
                onSort={() => handleSort('model')}
              >
                型号
              </TableHeader>
            )}
            {isVisible('caliber') && (
              <TableHeader 
                sortable 
                sortDirection={sortConfig.key === 'caliber' ? sortConfig.direction : null}
                onSort={() => handleSort('caliber')}
              >
                口径
              </TableHeader>
            )}
            {isVisible('protocol') && (
              <TableHeader 
                sortable 
                sortDirection={sortConfig.key === 'protocol' ? sortConfig.direction : null}
                onSort={() => handleSort('protocol')}
              >
                协议
              </TableHeader>
            )}
            {isVisible('entryTime') && (
              <TableHeader 
                sortable 
                sortDirection={sortConfig.key === 'entryTime' ? sortConfig.direction : null}
                onSort={() => handleSort('entryTime')}
              >
                入库时间
              </TableHeader>
            )}
            {isVisible('reportTime') && (
              <TableHeader 
                sortable 
                sortDirection={sortConfig.key === 'reportTime' ? sortConfig.direction : null}
                onSort={() => handleSort('reportTime')}
              >
                上报时间
              </TableHeader>
            )}
            {isVisible('taskNo') && (
              <TableHeader 
                sortable 
                sortDirection={sortConfig.key === 'taskNo' ? sortConfig.direction : null}
                onSort={() => handleSort('taskNo')}
              >
                生产任务号
              </TableHeader>
            )}
            {isVisible('remark') && (
              <TableHeader 
                sortable 
                sortDirection={sortConfig.key === 'remark' ? sortConfig.direction : null}
                onSort={() => handleSort('remark')}
              >
                备注
              </TableHeader>
            )}
            <TableHeader className="text-right">操作</TableHeader>
          </tr>
        </TableHead>
        <tbody>
          {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => {
            const item = {
              id: i.toString(),
              model: 'LXSG-20',
              caliber: 'DN20',
              protocol: 'NB-IoT CJ/T 188',
              entryTime: `2024-03-17 10:24:3${i}`,
              reportTime: `2024-03-17 11:00:0${i}`,
              taskNo: 'TASK-20240317',
              remark: '无'
            };
            return (
              <TableRow key={i}>
                {isVisible('model') && <TableCell className="text-slate-900 font-bold">{item.model}</TableCell>}
                {isVisible('caliber') && <TableCell className="text-slate-600 font-medium">{item.caliber}</TableCell>}
                {isVisible('protocol') && (
                  <TableCell>
                    <StatusBadge variant="info">{item.protocol}</StatusBadge>
                  </TableCell>
                )}
                {isVisible('entryTime') && <TableCell className="text-slate-500 font-medium">{item.entryTime}</TableCell>}
                {isVisible('reportTime') && <TableCell className="text-slate-500 font-medium">{item.reportTime}</TableCell>}
                {isVisible('taskNo') && <TableCell className="text-slate-600 font-mono font-bold">{item.taskNo}</TableCell>}
                {isVisible('remark') && <TableCell className="text-slate-400 text-xs">{item.remark}</TableCell>}
                <TableCell className="text-right">
                  <div className="flex items-center justify-end gap-1 transition-opacity">
                    <ActionButton variant="ghost" size="sm" icon={Edit2} onClick={() => handleEdit(item)} className="text-slate-400 hover:text-primary" />
                    <ActionButton variant="ghost" size="sm" icon={Trash2} className="text-slate-400 hover:text-rose-600" />
                    <ActionButton variant="ghost" size="sm" icon={MoreHorizontal} className="text-slate-400 hover:text-slate-900" />
                  </div>
                </TableCell>
              </TableRow>
            );
          })}
        </tbody>
      </TableContainer>

      {/* Pagination */}
      <div className="flex items-center justify-between px-2">
        <p className="text-xs text-slate-400 font-bold uppercase tracking-widest">显示 1 到 8 条，共 12,482 条记录</p>
        <div className="flex gap-2">
          <ActionButton variant="outline" size="sm" disabled>上一页</ActionButton>
          <ActionButton size="sm">1</ActionButton>
          <ActionButton variant="outline" size="sm">2</ActionButton>
          <ActionButton variant="outline" size="sm">3</ActionButton>
          <ActionButton variant="outline" size="sm">下一页</ActionButton>
        </div>
      </div>

      {/* Add/Edit Modal */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={editingItem ? '编辑档案' : '新增档案'}
        footer={
          <>
            <ActionButton variant="outline" onClick={() => setIsModalOpen(false)}>取消</ActionButton>
            <ActionButton onClick={() => setIsModalOpen(false)}>确定保存</ActionButton>
          </>
        }
      >
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label className="text-xs font-black text-slate-400 uppercase tracking-widest">型号</label>
              <input 
                type="text" 
                defaultValue={editingItem?.model}
                placeholder="请输入型号"
                className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm font-bold focus:outline-none focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 transition-all"
              />
            </div>
            <div className="space-y-1.5">
              <label className="text-xs font-black text-slate-400 uppercase tracking-widest">口径</label>
              <input 
                type="text" 
                defaultValue={editingItem?.caliber}
                placeholder="请输入口径"
                className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm font-bold focus:outline-none focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 transition-all"
              />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label className="text-xs font-black text-slate-400 uppercase tracking-widest">协议</label>
              <select 
                defaultValue={editingItem?.protocol}
                className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm font-bold focus:outline-none focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 transition-all"
              >
                <option>NB-IoT CJ/T 188</option>
                <option>LoRaWAN</option>
                <option>M-Bus</option>
              </select>
            </div>
            <div className="space-y-1.5">
              <label className="text-xs font-black text-slate-400 uppercase tracking-widest">生产任务号</label>
              <input 
                type="text" 
                defaultValue={editingItem?.taskNo}
                placeholder="请输入生产任务号"
                className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm font-bold focus:outline-none focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 transition-all"
              />
            </div>
          </div>
          <div className="space-y-1.5">
            <label className="text-xs font-black text-slate-400 uppercase tracking-widest">备注</label>
            <textarea 
              defaultValue={editingItem?.remark}
              placeholder="请输入备注"
              className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm font-bold focus:outline-none focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 transition-all resize-none"
              rows={3}
            />
          </div>
        </div>
      </Modal>
    </div>
  );
};
