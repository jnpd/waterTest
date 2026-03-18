import React, { useState } from 'react';
import { 
  Scan, 
  CheckCircle2, 
  XCircle, 
  Settings2, 
  Plus, 
  FileUp, 
  FileDown, 
  ChevronDown, 
  CloudUpload, 
  Info,
  Filter,
  Search,
  Edit2,
  Trash2,
  Check
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

export const BatchTestingView: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<any>(null);

  const [mockData, setMockData] = useState<any[]>([
    { 
      id: '1', 
      taskNo: 'TEST-20240317-01',
      meterNo: '202403170001', 
      imei: '861234567890121',
      simNo: '89860123456789012341',
      reportTime: '2024-03-17 11:00:00',
      reading: '0.00',
      valveStatus: 'open',
      voltage: '3.6',
      presetReading: '0.00',
      progress: 100,
      status: 'passed',
      model: 'LXSG-20',
      caliber: 'DN20',
      protocol: 'NB-IoT',
      meterName: '智能水表',
      entryStaff: '张三',
      tester: '李四',
      remark: '无'
    },
    { 
      id: '2', 
      taskNo: 'TEST-20240317-02',
      meterNo: '202403170002', 
      imei: '861234567890122',
      simNo: '89860123456789012342',
      reportTime: '2024-03-17 11:05:00',
      reading: '0.00',
      valveStatus: 'open',
      voltage: '3.6',
      presetReading: '0.00',
      progress: 45,
      status: 'testing',
      model: 'LXSG-15',
      caliber: 'DN15',
      protocol: 'LoRa',
      meterName: 'LORA水表',
      entryStaff: '王五',
      tester: '赵六',
      remark: '测试中'
    },
  ]);

  const warehouseDevices = [
    { meterNo: '202403170003', imei: '861234567890123', model: 'LXSG-20', status: '在库' },
    { meterNo: '202403170004', imei: '861234567890124', model: 'LXSG-20', status: '在库' },
    { meterNo: '202403170005', imei: '861234567890125', model: 'LXSG-15', status: '在库' },
    { meterNo: '202403170006', imei: '861234567890126', model: 'LXSG-25', status: '在库' },
    { meterNo: '202403170007', imei: '861234567890127', model: 'LXSG-20', status: '在库' },
  ];

  const [batchName, setBatchName] = useState('');
  const [selectedWarehouseDevices, setSelectedWarehouseDevices] = useState<string[]>([]);

  const toggleDeviceSelection = (meterNo: string) => {
    setSelectedWarehouseDevices(prev => 
      prev.includes(meterNo) ? prev.filter(id => id !== meterNo) : [...prev, meterNo]
    );
  };

  const generateBatchData = () => {
    if (!batchName) {
      alert('请输入测试批次名称');
      return;
    }
    if (selectedWarehouseDevices.length === 0) {
      alert('请选择至少一个仓库设备');
      return;
    }

    const newRecords = selectedWarehouseDevices.map((meterNo) => {
      const device = warehouseDevices.find(d => d.meterNo === meterNo);
      return {
        id: Math.random().toString(36).substr(2, 9),
        taskNo: batchName,
        meterNo: device?.meterNo,
        imei: device?.imei,
        simNo: '898601234567890' + Math.floor(Math.random() * 100000),
        reportTime: '-',
        reading: '0.00',
        valveStatus: 'open',
        voltage: '3.6',
        presetReading: '0.00',
        progress: 0,
        status: 'testing',
        model: device?.model,
        caliber: 'DN20',
        protocol: 'NB-IoT',
        meterName: '智能水表',
        entryStaff: '系统生成',
        tester: '待分配',
        remark: '批量生成'
      };
    });

    setMockData(prev => [...newRecords, ...prev]);
    setIsModalOpen(false);
    setBatchName('');
    setSelectedWarehouseDevices([]);
  };

  const stats = [
    { label: '测试总数', value: '128', color: 'text-slate-600', bg: 'bg-slate-50' },
    { label: '测试成功', value: '124', color: 'text-emerald-600', bg: 'bg-emerald-50' },
    { label: '测试失败', value: '4', color: 'text-rose-600', bg: 'bg-rose-50' },
    { label: '正在测试', value: '12', color: 'text-blue-600', bg: 'bg-blue-50' },
    { label: '等待测试', value: '45', color: 'text-indigo-600', bg: 'bg-indigo-50' },
    { label: '电池欠压', value: '2', color: 'text-rose-500', bg: 'bg-rose-50' },
    { label: '电压异常', value: '1', color: 'text-amber-500', bg: 'bg-amber-50', hasSettings: true },
    { label: '阀门异常', value: '1', color: 'text-rose-600', bg: 'bg-rose-50' },
    { label: '已写入表号', value: '128', color: 'text-emerald-500', bg: 'bg-emerald-50' },
    { label: '未写入表号', value: '0', color: 'text-rose-500', bg: 'bg-rose-50' },
  ];

  const [selectedMainItems, setSelectedMainItems] = useState<string[]>([]);

  const toggleMainItemSelection = (id: string) => {
    setSelectedMainItems(prev => 
      prev.includes(id) ? prev.filter(item => item !== id) : [...prev, id]
    );
  };

  const toggleAllMainItems = () => {
    if (selectedMainItems.length === mockData.length) {
      setSelectedMainItems([]);
    } else {
      setSelectedMainItems(mockData.map(item => item.id));
    }
  };

  const handleBatchDelete = () => {
    if (selectedMainItems.length === 0) {
      alert('请选择要删除的记录');
      return;
    }
    if (confirm(`确定要删除选中的 ${selectedMainItems.length} 条记录吗？`)) {
      setMockData(prev => prev.filter(item => !selectedMainItems.includes(item.id)));
      setSelectedMainItems([]);
    }
  };

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
      {/* Filter Row */}
      <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm flex flex-wrap items-center gap-4">
        <div className="flex items-center gap-2">
          <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">测试批次</span>
          <div className="relative">
            <select className="appearance-none pl-4 pr-10 py-2 bg-slate-50 border border-slate-200 rounded-xl text-sm font-bold focus:outline-none focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 transition-all min-w-[200px]">
              <option>BATCH-20240317-001</option>
              <option>BATCH-20240316-005</option>
            </select>
            <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" size={16} />
          </div>
        </div>
        
        <div className="flex items-center gap-3 flex-1">
          <SearchInput placeholder="搜索表号、资产号、IMEI..." />
          <ActionButton variant="outline" icon={Filter}>高级筛选</ActionButton>
        </div>

        <div className="flex items-center gap-2">
          <ActionButton icon={Search}>查询</ActionButton>
          <ActionButton variant="outline">清除</ActionButton>
        </div>
      </div>

      {/* Stats Row */}
      <div className="grid grid-cols-2 md:grid-cols-5 lg:grid-cols-10 gap-3">
        {stats.map((stat) => (
          <div key={stat.label} className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm text-center relative group hover:border-blue-200 transition-all">
            <div className={`text-2xl font-black ${stat.color}`}>{stat.value}</div>
            <div className="text-[10px] text-slate-400 font-black uppercase tracking-widest mt-1">{stat.label}</div>
            {stat.hasSettings && (
              <Settings2 size={12} className="absolute top-2 right-2 text-slate-300 cursor-pointer opacity-0 group-hover:opacity-100 transition-opacity hover:text-blue-500" />
            )}
          </div>
        ))}
      </div>

      {/* Action Buttons Row */}
      <div className="bg-white p-3 rounded-2xl border border-slate-200 shadow-sm flex flex-wrap items-center gap-2">
        <div className="flex items-center gap-2">
          <ActionButton variant="secondary" size="sm" icon={Scan}>表号绑定</ActionButton>
          <div className="h-6 w-px bg-slate-200 mx-1" />
          <ActionButton variant="outline" size="sm" icon={FileUp}>批量导入</ActionButton>
          <ActionButton variant="outline" size="sm" icon={FileDown}>导出Excel</ActionButton>
        </div>

        <div className="h-6 w-px bg-slate-200 mx-1" />

        <div className="flex items-center gap-2">
          <ActionButton 
            variant="outline" 
            size="sm" 
            icon={CheckCircle2} 
            className="text-emerald-600 border-emerald-100 hover:bg-emerald-50"
          >
            批量标记成功
          </ActionButton>
          <ActionButton 
            variant="danger" 
            size="sm" 
            icon={Trash2} 
            onClick={handleBatchDelete}
            disabled={selectedMainItems.length === 0}
          >
            批量删除 {selectedMainItems.length > 0 && `(${selectedMainItems.length})`}
          </ActionButton>
        </div>
        
        <div className="h-6 w-px bg-slate-200 mx-1" />
        
        <div className="flex items-center gap-2">
          <ActionButton variant="outline" size="sm" icon={CloudUpload} className="text-violet-600 border-violet-100 hover:bg-violet-50">预置产测</ActionButton>
          <ActionButton variant="outline" size="sm" icon={CloudUpload} className="text-blue-600 border-blue-100 hover:bg-blue-50">预置表底</ActionButton>
        </div>
        
        <div className="ml-auto flex items-center gap-4">
          <label className="flex items-center gap-2 text-xs text-slate-500 font-bold cursor-pointer group">
            <input type="checkbox" className="w-4 h-4 rounded border-slate-300 text-blue-600 focus:ring-blue-500 transition-all" />
            <span className="group-hover:text-slate-900">下发所有水表</span>
          </label>
          <div className="h-6 w-px bg-slate-200" />
          <ActionButton 
            variant="primary" 
            size="md" 
            icon={Plus} 
            onClick={handleAdd}
            className="px-8 shadow-xl shadow-primary/30 hover:scale-105 active:scale-95 transition-all"
          >
            批量新增测试
          </ActionButton>
        </div>
      </div>

      {/* Table Area */}
      <TableContainer>
        <TableHead>
          <tr>
            <TableHeader className="w-10">
              <div 
                onClick={toggleAllMainItems}
                className={`w-4 h-4 rounded border flex items-center justify-center cursor-pointer transition-all ${
                  selectedMainItems.length === mockData.length && mockData.length > 0
                    ? 'bg-blue-600 border-blue-600 text-white' 
                    : 'border-slate-300 bg-white hover:border-blue-400'
                }`}
              >
                {selectedMainItems.length === mockData.length && mockData.length > 0 && <Check size={10} strokeWidth={4} />}
              </div>
            </TableHeader>
            <TableHeader className="whitespace-nowrap">测试任务号</TableHeader>
            <TableHeader className="whitespace-nowrap">表号</TableHeader>
            <TableHeader className="whitespace-nowrap">IMEI</TableHeader>
            <TableHeader className="whitespace-nowrap">卡号</TableHeader>
            <TableHeader className="whitespace-nowrap">上报时间</TableHeader>
            <TableHeader className="whitespace-nowrap">表读数</TableHeader>
            <TableHeader className="whitespace-nowrap">阀门状态</TableHeader>
            <TableHeader className="whitespace-nowrap">电池电压</TableHeader>
            <TableHeader className="whitespace-nowrap">预置表底</TableHeader>
            <TableHeader className="whitespace-nowrap">测试进度</TableHeader>
            <TableHeader className="whitespace-nowrap">合格状态</TableHeader>
            <TableHeader className="whitespace-nowrap">型号</TableHeader>
            <TableHeader className="whitespace-nowrap">口径</TableHeader>
            <TableHeader className="whitespace-nowrap">协议</TableHeader>
            <TableHeader className="whitespace-nowrap">表具名称</TableHeader>
            <TableHeader className="whitespace-nowrap">入库人员</TableHeader>
            <TableHeader className="whitespace-nowrap">测试人员</TableHeader>
            <TableHeader className="whitespace-nowrap">备注</TableHeader>
            <TableHeader className="text-right whitespace-nowrap">操作</TableHeader>
          </tr>
        </TableHead>
        <tbody>
          {mockData.map((item) => (
            <TableRow 
              key={item.id}
              className={selectedMainItems.includes(item.id) ? 'bg-blue-50/30' : ''}
            >
              <TableCell>
                <div 
                  onClick={() => toggleMainItemSelection(item.id)}
                  className={`w-4 h-4 rounded border flex items-center justify-center cursor-pointer transition-all ${
                    selectedMainItems.includes(item.id) 
                      ? 'bg-blue-600 border-blue-600 text-white' 
                      : 'border-slate-300 bg-white hover:border-blue-400'
                  }`}
                >
                  {selectedMainItems.includes(item.id) && <Check size={10} strokeWidth={4} />}
                </div>
              </TableCell>
              <TableCell className="font-mono text-slate-500 whitespace-nowrap">{item.taskNo}</TableCell>
              <TableCell className="font-mono font-black text-slate-900 whitespace-nowrap">{item.meterNo}</TableCell>
              <TableCell className="font-mono text-slate-400 text-[10px] whitespace-nowrap">{item.imei}</TableCell>
              <TableCell className="font-mono text-slate-400 text-[10px] whitespace-nowrap">{item.simNo}</TableCell>
              <TableCell className="text-slate-500 text-xs whitespace-nowrap">{item.reportTime}</TableCell>
              <TableCell className="font-bold text-slate-900 whitespace-nowrap">{item.reading} m³</TableCell>
              <TableCell className="whitespace-nowrap">
                <StatusBadge variant={item.valveStatus === 'open' ? 'success' : 'error'}>
                  {item.valveStatus === 'open' ? '开启' : '关闭'}
                </StatusBadge>
              </TableCell>
              <TableCell className="text-slate-600 whitespace-nowrap">{item.voltage}V</TableCell>
              <TableCell className="text-slate-600 whitespace-nowrap">{item.presetReading}</TableCell>
              <TableCell className="whitespace-nowrap">
                <div className="w-16 h-1.5 bg-slate-100 rounded-full overflow-hidden">
                  <div className="h-full bg-blue-500" style={{ width: `${item.progress}%` }} />
                </div>
              </TableCell>
              <TableCell className="whitespace-nowrap">
                <StatusBadge variant={item.status === 'passed' ? 'success' : item.status === 'testing' ? 'info' : 'error'}>
                  {item.status === 'passed' ? '合格' : item.status === 'testing' ? '测试中' : '不合格'}
                </StatusBadge>
              </TableCell>
              <TableCell className="text-slate-600 whitespace-nowrap">{item.model}</TableCell>
              <TableCell className="text-slate-600 whitespace-nowrap">{item.caliber}</TableCell>
              <TableCell className="text-slate-600 whitespace-nowrap">{item.protocol}</TableCell>
              <TableCell className="text-slate-600 whitespace-nowrap">{item.meterName}</TableCell>
              <TableCell className="text-slate-600 whitespace-nowrap">{item.entryStaff}</TableCell>
              <TableCell className="text-slate-600 whitespace-nowrap">{item.tester}</TableCell>
              <TableCell className="text-slate-400 text-xs whitespace-nowrap">{item.remark}</TableCell>
              <TableCell className="text-right whitespace-nowrap">
                <div className="flex items-center justify-end gap-1">
                  <ActionButton variant="ghost" size="sm" icon={Edit2} onClick={() => handleEdit(item)} />
                  <ActionButton variant="ghost" size="sm" icon={Trash2} className="text-rose-400 hover:text-rose-600" />
                </div>
              </TableCell>
            </TableRow>
          ))}
        </tbody>
      </TableContainer>
      
      {/* Pagination */}
      <div className="flex items-center justify-between px-2">
        <div className="flex items-center gap-6">
          <p className="text-[10px] text-slate-400 font-black uppercase tracking-widest">显示 1 到 2 条，共 128 条记录</p>
          <div className="flex items-center gap-3 text-xs font-bold text-slate-500">
            每页显示
            <select className="bg-white border border-slate-200 rounded-lg px-2 py-1 outline-none focus:border-blue-500 transition-all">
              <option>50</option>
              <option>100</option>
            </select>
            条记录
          </div>
        </div>
        <div className="flex gap-2">
          <ActionButton variant="outline" size="sm" disabled>上一页</ActionButton>
          <ActionButton variant="outline" size="sm">下一页</ActionButton>
        </div>
      </div>

      {/* Add/Edit Modal */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={editingItem ? '编辑测试记录' : '批量新增测试'}
        size="lg"
        footer={
          <>
            <ActionButton variant="outline" onClick={() => setIsModalOpen(false)}>取消</ActionButton>
            <ActionButton onClick={editingItem ? () => setIsModalOpen(false) : generateBatchData}>
              {editingItem ? '确定保存' : '生成批次数据'}
            </ActionButton>
          </>
        }
      >
        {editingItem ? (
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="text-xs font-black text-slate-400 uppercase tracking-widest">任务号</label>
                <input 
                  type="text" 
                  defaultValue={editingItem?.taskNo}
                  className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm font-bold focus:outline-none focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 transition-all"
                />
              </div>
              <div className="space-y-1.5">
                <label className="text-xs font-black text-slate-400 uppercase tracking-widest">表号</label>
                <input 
                  type="text" 
                  defaultValue={editingItem?.meterNo}
                  className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm font-bold focus:outline-none focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 transition-all"
                />
              </div>
            </div>
            <div className="space-y-1.5">
              <label className="text-xs font-black text-slate-400 uppercase tracking-widest">备注信息</label>
              <textarea 
                rows={3}
                placeholder="请输入备注信息..."
                className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm font-bold focus:outline-none focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 transition-all resize-none"
              />
            </div>
          </div>
        ) : (
          <div className="space-y-6">
            <div className="space-y-1.5">
              <label className="text-xs font-black text-slate-400 uppercase tracking-widest">批量测试任务名称</label>
              <input 
                type="text" 
                value={batchName}
                onChange={(e) => setBatchName(e.target.value)}
                placeholder="例如: BATCH-20240317-001"
                className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm font-bold focus:outline-none focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 transition-all"
              />
            </div>

            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <label className="text-xs font-black text-slate-400 uppercase tracking-widest">选择仓库设备 ({selectedWarehouseDevices.length})</label>
                <button 
                  onClick={() => setSelectedWarehouseDevices(warehouseDevices.map(d => d.meterNo))}
                  className="text-[10px] font-black text-blue-600 uppercase tracking-widest hover:underline"
                >
                  全选
                </button>
              </div>
              
              <div className="border border-slate-100 rounded-2xl overflow-hidden">
                <div className="max-h-[300px] overflow-y-auto">
                  <table className="w-full text-left text-xs border-collapse">
                    <thead className="bg-slate-50 sticky top-0 z-10">
                      <tr>
                        <th className="px-4 py-3 w-10">
                          <Check size={14} className="text-slate-300" />
                        </th>
                        <th className="px-4 py-3 font-black text-slate-400 uppercase tracking-widest">表号</th>
                        <th className="px-4 py-3 font-black text-slate-400 uppercase tracking-widest">IMEI</th>
                        <th className="px-4 py-3 font-black text-slate-400 uppercase tracking-widest">型号</th>
                      </tr>
                    </thead>
                    <tbody>
                      {warehouseDevices.map((device) => (
                        <tr 
                          key={device.meterNo}
                          onClick={() => toggleDeviceSelection(device.meterNo)}
                          className={`border-t border-slate-50 cursor-pointer transition-colors ${
                            selectedWarehouseDevices.includes(device.meterNo) ? 'bg-blue-50/50' : 'hover:bg-slate-50'
                          }`}
                        >
                          <td className="px-4 py-3">
                            <div className={`w-4 h-4 rounded border flex items-center justify-center transition-all ${
                              selectedWarehouseDevices.includes(device.meterNo) ? 'bg-blue-600 border-blue-600 text-white' : 'border-slate-300 bg-white'
                            }`}>
                              {selectedWarehouseDevices.includes(device.meterNo) && <Check size={10} strokeWidth={4} />}
                            </div>
                          </td>
                          <td className="px-4 py-3 font-mono font-bold text-slate-900">{device.meterNo}</td>
                          <td className="px-4 py-3 font-mono text-slate-500">{device.imei}</td>
                          <td className="px-4 py-3 text-slate-600">{device.model}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
};

