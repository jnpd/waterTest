import React, { useState, useEffect, useRef } from 'react';
import { 
  Package, 
  Plus, 
  Scan, 
  Printer, 
  CheckCircle2, 
  Box, 
  Search,
  MoreHorizontal,
  Trash2,
  Clock as HistoryIcon,
  AlertCircle,
  ArrowRight,
  Loader2,
  X,
  ChevronRight,
  Zap
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { PackagingTask } from '../types';

const mockTasks: PackagingTask[] = [
  { id: '1', taskNo: 'PACK-20240317-001', boxNo: 'BOX-001', productName: 'NB-IoT 智能水表', batchNo: 'BATCH-20240317-001', count: 12, maxCount: 20, status: 'packing', createdAt: '2024-03-17 14:00:00' },
  { id: '2', taskNo: 'PACK-20240317-002', boxNo: 'BOX-002', productName: 'NB-IoT 智能水表', batchNo: 'BATCH-20240317-001', count: 20, maxCount: 20, status: 'finished', createdAt: '2024-03-17 13:30:00' },
];

import { 
  SearchInput, 
  TableContainer, 
  TableHead, 
  TableHeader, 
  TableRow, 
  TableCell, 
  StatusBadge, 
  ActionButton 
} from '../components/UIComponents';

const mockPackagingRecords = [
  { id: '1', orderNo: 'ORD-20240317-001', boxNo: 'BOX-001', barcode: '6901234567890', productName: '智能水表', meterType: 'NB-IoT', meterNo: '202403170001', testBatch: 'BATCH-001', inspector: '张三', packingTime: '2024-03-17 14:00:00', remark: '无' },
  { id: '2', orderNo: 'ORD-20240317-001', boxNo: 'BOX-001', barcode: '6901234567891', productName: '智能水表', meterType: 'NB-IoT', meterNo: '202403170002', testBatch: 'BATCH-001', inspector: '张三', packingTime: '2024-03-17 14:05:00', remark: '无' },
];

export const PackagingView: React.FC = () => {
  const [scanValue, setScanValue] = useState('');
  const [currentBoxItems, setCurrentBoxItems] = useState<string[]>(['20240317001', '20240317002', '20240317003']);
  const [isPrinting, setIsPrinting] = useState(false);
  const [lastScanned, setLastScanned] = useState<string | null>(null);
  const [showSuccessToast, setShowSuccessToast] = useState(false);
  const maxCount = 10;
  const inputRef = useRef<HTMLInputElement>(null);

  const handleScan = (e: React.FormEvent) => {
    e.preventDefault();
    if (!scanValue.trim()) return;
    
    if (currentBoxItems.includes(scanValue)) {
      alert('该表号已在当前包装箱中！');
      setScanValue('');
      return;
    }

    if (currentBoxItems.length >= maxCount) {
      alert('当前包装箱已满，请先完成装箱！');
      setScanValue('');
      return;
    }

    // Simulate scanning process
    const newItem = scanValue;
    setCurrentBoxItems(prev => [newItem, ...prev]);
    setLastScanned(newItem);
    setScanValue('');
    setShowSuccessToast(true);
    setTimeout(() => setShowSuccessToast(false), 2000);
    
    // Simulate auto-printing
    setIsPrinting(true);
    setTimeout(() => setIsPrinting(false), 1200);
  };

  const removeItem = (item: string) => {
    setCurrentBoxItems(prev => prev.filter(i => i !== item));
  };

  const finishBox = () => {
    if (currentBoxItems.length === 0) return;
    setIsPrinting(true);
    setTimeout(() => {
      alert(`包装箱 BOX-003 已完成装箱，共计 ${currentBoxItems.length} 台设备。标签已打印。`);
      setCurrentBoxItems([]);
      setIsPrinting(false);
      setLastScanned(null);
    }, 2000);
  };

  return (
    <div className="p-6 space-y-6 bg-gray-50/50 min-h-screen relative">
      {/* Success Toast */}
      <AnimatePresence>
        {showSuccessToast && (
          <motion.div 
            initial={{ opacity: 0, y: -50, x: '-50%' }}
            animate={{ opacity: 1, y: 20, x: '-50%' }}
            exit={{ opacity: 0, y: -50, x: '-50%' }}
            className="fixed top-0 left-1/2 z-50 bg-emerald-600 text-white px-6 py-3 rounded-2xl shadow-2xl flex items-center gap-3 border border-emerald-400/30 backdrop-blur-md"
          >
            <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center">
              <CheckCircle2 size={18} />
            </div>
            <div>
              <p className="text-sm font-black">扫描成功</p>
              <p className="text-[10px] font-mono opacity-80">{lastScanned} 已绑定至当前箱</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Header Controls */}
      <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm flex flex-wrap items-center justify-between gap-6">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 bg-blue-50 rounded-xl flex items-center justify-center text-blue-600">
            <Package size={24} />
          </div>
          <div className="space-y-0.5">
            <h3 className="text-xl font-black text-gray-900 tracking-tight">包装作业中心</h3>
            <p className="text-sm text-gray-500 font-medium">智能水表数字化装箱与标签关联系统</p>
          </div>
        </div>
        <div className="flex gap-3">
          <button className="px-5 py-2.5 bg-blue-600 text-white rounded-xl text-sm font-bold hover:bg-blue-700 transition-all flex items-center gap-2 shadow-lg shadow-blue-200">
            <Plus size={18} /> 新建装箱单
          </button>
          <button className="px-5 py-2.5 border border-gray-200 bg-white rounded-xl text-sm font-bold text-gray-700 hover:bg-gray-50 transition-all flex items-center gap-2">
            <Printer size={18} /> 打印机设置
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Active Task & Scan Area */}
        <div className="lg:col-span-2 space-y-6">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className={`bg-white p-8 rounded-3xl border shadow-sm relative overflow-hidden transition-colors duration-500 ${
              currentBoxItems.length === maxCount ? 'border-emerald-200' : 'border-gray-200'
            }`}
          >
            {/* Background Decoration */}
            <div className={`absolute top-0 right-0 w-64 h-64 rounded-full -mr-32 -mt-32 opacity-50 blur-3xl transition-colors duration-500 ${
              currentBoxItems.length === maxCount ? 'bg-emerald-100' : 'bg-blue-50'
            }`} />
            
            <div className="relative z-10">
              <div className="flex items-start justify-between mb-8">
                <div className="flex items-center gap-5">
                  <div className={`w-20 h-20 rounded-[2rem] flex items-center justify-center text-white shadow-2xl transition-all duration-500 ${
                    currentBoxItems.length === maxCount ? 'bg-emerald-500 shadow-emerald-200' : 'bg-blue-600 shadow-blue-200'
                  } relative`}>
                    <Box size={40} />
                    <motion.div 
                      animate={{ scale: [1, 1.2, 1] }}
                      transition={{ duration: 2, repeat: Infinity }}
                      className="absolute -top-1 -right-1 w-6 h-6 bg-white rounded-full border-4 border-white flex items-center justify-center"
                    >
                      <div className={`w-1.5 h-1.5 rounded-full ${currentBoxItems.length === maxCount ? 'bg-emerald-500' : 'bg-blue-600'}`} />
                    </motion.div>
                  </div>
                  <div>
                    <div className="flex items-center gap-3 mb-1">
                      <h4 className="text-2xl font-black text-gray-900">BOX-003</h4>
                      <span className={`px-3 py-1 text-[10px] font-black rounded-full uppercase tracking-widest ${
                        currentBoxItems.length === maxCount ? 'bg-emerald-100 text-emerald-700' : 'bg-blue-100 text-blue-700'
                      }`}>
                        {currentBoxItems.length === maxCount ? '装箱已满' : '正在装箱'}
                      </span>
                    </div>
                    <p className="text-sm text-gray-500 font-medium">
                      批次: <span className="text-gray-900 font-bold">BATCH-20240317-001</span> | 
                      产品: <span className="text-gray-900 font-bold">NB-IoT 智能水表</span>
                    </p>
                  </div>
                </div>
                <div className="text-right">
                  <div className={`text-3xl font-black mb-1 transition-colors ${
                    currentBoxItems.length === maxCount ? 'text-emerald-600' : 'text-blue-600'
                  }`}>
                    {currentBoxItems.length} <span className="text-sm text-gray-400 font-bold">/ {maxCount}</span>
                  </div>
                  <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">当前装箱进度</p>
                </div>
              </div>

              <div className="space-y-3 mb-10">
                <div className="w-full h-4 bg-gray-100 rounded-full overflow-hidden p-1 border border-gray-200">
                  <motion.div 
                    initial={{ width: 0 }}
                    animate={{ width: `${(currentBoxItems.length / maxCount) * 100}%` }}
                    className={`h-full rounded-full transition-all duration-500 ${
                      currentBoxItems.length === maxCount ? 'bg-emerald-500' : 'bg-blue-600'
                    }`}
                  />
                </div>
                <div className="flex justify-between text-[10px] font-black text-gray-400 uppercase tracking-widest">
                  <span>空箱</span>
                  <span className={currentBoxItems.length === maxCount ? 'text-emerald-600' : ''}>满箱 (10台)</span>
                </div>
              </div>

              <form onSubmit={handleScan} className="relative group">
                <div className={`absolute inset-0 rounded-2xl blur-xl transition-all duration-500 ${
                  scanValue ? 'opacity-100 bg-blue-500/10' : 'opacity-0'
                }`} />
                <input 
                  ref={inputRef}
                  type="text"
                  value={scanValue}
                  onChange={(e) => setScanValue(e.target.value)}
                  disabled={currentBoxItems.length >= maxCount}
                  placeholder={currentBoxItems.length >= maxCount ? "包装箱已满，请封箱" : "扫描或输入表号条码..."}
                  className={`w-full pl-14 pr-32 py-5 bg-gray-50 border-2 rounded-2xl focus:bg-white outline-none transition-all text-xl font-mono font-bold relative z-10 ${
                    currentBoxItems.length >= maxCount 
                      ? 'border-gray-100 cursor-not-allowed text-gray-300' 
                      : 'border-gray-100 focus:border-blue-500 text-gray-800'
                  }`}
                />
                <Scan className={`absolute left-5 top-1/2 -translate-y-1/2 z-20 transition-colors ${
                  currentBoxItems.length >= maxCount ? 'text-gray-300' : 'text-blue-500'
                }`} size={28} />
                <div className="absolute right-3 top-1/2 -translate-y-1/2 z-20 flex gap-2">
                  {scanValue && (
                    <button 
                      type="submit"
                      className="px-6 py-2.5 bg-blue-600 text-white rounded-xl text-sm font-black hover:bg-blue-700 transition-all shadow-lg shadow-blue-200"
                    >
                      确认绑定
                    </button>
                  )}
                </div>
              </form>

              <div className="mt-4 flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-2 text-xs text-emerald-600 font-bold">
                    <CheckCircle2 size={16} />
                    <span>自动打印已开启</span>
                  </div>
                  <AnimatePresence mode="wait">
                    {lastScanned && (
                      <motion.div 
                        key={lastScanned}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: 10 }}
                        className="flex items-center gap-2 text-xs text-blue-600 font-bold"
                      >
                        <Zap size={16} className="fill-blue-600" />
                        <span>最近扫描: {lastScanned}</span>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
                <button 
                  onClick={finishBox}
                  disabled={currentBoxItems.length === 0 || isPrinting}
                  className={`flex items-center gap-2 text-sm font-black transition-all group ${
                    currentBoxItems.length === maxCount ? 'text-emerald-600 hover:text-emerald-700' : 'text-blue-600 hover:text-blue-700'
                  } disabled:opacity-30`}
                >
                  完成本箱并封箱 <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                </button>
              </div>
            </div>
          </motion.div>

          {/* Current Box Items Grid */}
          <div className="bg-white rounded-3xl border border-gray-200 shadow-sm overflow-hidden">
            <div className="px-8 py-5 border-b border-gray-100 flex items-center justify-between bg-gray-50/50">
              <div className="flex items-center gap-3">
                <h3 className="font-black text-gray-900">箱内设备明细</h3>
                <span className="px-2 py-0.5 bg-gray-200 text-gray-600 text-[10px] font-black rounded-md">{currentBoxItems.length} 台</span>
              </div>
              <button 
                onClick={() => setCurrentBoxItems([])}
                className="text-xs text-red-500 font-black hover:underline flex items-center gap-1"
              >
                <X size={14} /> 清空当前箱
              </button>
            </div>
            <div className="p-8">
              {currentBoxItems.length === 0 ? (
                <div className="py-12 text-center space-y-3">
                  <div className="w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center mx-auto text-gray-300">
                    <Box size={32} />
                  </div>
                  <p className="text-sm text-gray-400 font-medium">当前箱内暂无设备，请开始扫描</p>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-3 xl:grid-cols-4 gap-4">
                  <AnimatePresence mode="popLayout">
                    {currentBoxItems.map((item, index) => (
                      <motion.div 
                        key={item}
                        layout
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.8 }}
                        className={`p-4 rounded-2xl border flex items-center justify-between group transition-all ${
                          index === 0 ? 'bg-blue-50 border-blue-100 ring-2 ring-blue-500/20' : 'bg-emerald-50 border-emerald-100'
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${
                            index === 0 ? 'bg-blue-600 text-white' : 'bg-emerald-500 text-white'
                          }`}>
                            <span className="text-[10px] font-black">{currentBoxItems.length - index}</span>
                          </div>
                          <div>
                            <span className="text-xs font-mono font-black text-gray-800 block">{item}</span>
                            <span className="text-[8px] text-gray-400 font-bold uppercase tracking-tighter">已校验合格</span>
                          </div>
                        </div>
                        <button 
                          onClick={() => removeItem(item)}
                          className="text-gray-300 hover:text-red-500 opacity-0 group-hover:opacity-100 transition-all"
                        >
                          <Trash2 size={14} />
                        </button>
                      </motion.div>
                    ))}
                  </AnimatePresence>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Printing Status Card */}
          <div className="bg-slate-900 text-white p-8 rounded-[2rem] shadow-2xl relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/10 rounded-full -mr-16 -mt-16 blur-2xl group-hover:bg-blue-500/20 transition-all" />
            
            <div className="relative z-10">
              <div className="flex items-center justify-between mb-8">
                <h3 className="font-black text-lg flex items-center gap-3">
                  <Printer size={22} className="text-blue-400" />
                  打印终端
                </h3>
                <div className="flex items-center gap-2">
                  <div className={`w-2 h-2 rounded-full ${isPrinting ? 'bg-blue-400 animate-ping' : 'bg-emerald-500'}`} />
                  <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">
                    {isPrinting ? '正在打印' : '就绪'}
                  </span>
                </div>
              </div>

              <div className="space-y-6">
                <div className="p-4 bg-white/5 rounded-2xl border border-white/10">
                  <p className="text-[10px] text-slate-500 font-black uppercase tracking-widest mb-2">当前设备</p>
                  <p className="text-sm font-bold flex items-center justify-between">
                    Zebra ZT411 <span className="text-[10px] px-2 py-0.5 bg-emerald-500/20 text-emerald-400 rounded">在线</span>
                  </p>
                </div>

                <div className="space-y-3">
                  <div className="flex justify-between text-[10px] font-black text-slate-500 uppercase tracking-widest">
                    <span>色带消耗</span>
                    <span>85% 剩余</span>
                  </div>
                  <div className="w-full h-1.5 bg-white/5 rounded-full overflow-hidden">
                    <div className="h-full bg-blue-500 w-[85%]" />
                  </div>
                </div>

                <div className="pt-4 border-t border-white/5 grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-[10px] text-slate-500 font-black uppercase tracking-widest mb-1">今日打印</p>
                    <p className="text-lg font-black">1,284 <span className="text-[10px] text-slate-600">张</span></p>
                  </div>
                  <div>
                    <p className="text-[10px] text-slate-500 font-black uppercase tracking-widest mb-1">累计打印</p>
                    <p className="text-lg font-black">42.8 <span className="text-[10px] text-slate-600">K</span></p>
                  </div>
                </div>
              </div>
            </div>
            
            {isPrinting && (
              <motion.div 
                initial={{ y: 50, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                className="absolute inset-0 bg-blue-600/90 backdrop-blur-sm flex flex-col items-center justify-center z-20"
              >
                <Loader2 className="animate-spin mb-4" size={40} />
                <p className="font-black tracking-widest uppercase text-sm">正在生成标签...</p>
                <p className="text-[10px] text-white/60 mt-2 font-mono">{lastScanned}</p>
              </motion.div>
            )}
          </div>

          {/* Recent Tasks */}
          <div className="bg-white p-6 rounded-[2rem] border border-gray-200 shadow-sm">
            <h3 className="font-black text-gray-900 mb-6 flex items-center gap-3">
              <HistoryIcon size={20} className="text-blue-600" />
              最近装箱记录
            </h3>
            <div className="space-y-4">
              {mockTasks.map(task => (
                <motion.div 
                  key={task.id} 
                  whileHover={{ x: 4 }}
                  className="p-4 bg-gray-50 rounded-2xl border border-gray-100 hover:border-blue-200 transition-all group cursor-pointer"
                >
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-[10px] font-mono font-black text-gray-400 tracking-tighter">{task.boxNo}</span>
                    <span className={`px-2 py-0.5 rounded-md text-[9px] font-black uppercase tracking-widest ${
                      task.status === 'finished' ? 'bg-emerald-100 text-emerald-700' : 'bg-blue-100 text-blue-700'
                    }`}>
                      {task.status === 'finished' ? '已封箱' : '作业中'}
                    </span>
                  </div>
                  <h5 className="text-sm font-black text-gray-800 truncate mb-3">{task.productName}</h5>
                  <div className="flex items-center justify-between">
                    <div className="flex -space-x-2">
                      {[1, 2, 3].map(i => (
                        <div key={i} className="w-7 h-7 rounded-full bg-white border-2 border-gray-50 flex items-center justify-center overflow-hidden shadow-sm">
                          <div className="w-full h-full bg-blue-50 flex items-center justify-center text-[8px] font-black text-blue-600">
                            M
                          </div>
                        </div>
                      ))}
                      <div className="w-7 h-7 rounded-full bg-gray-100 border-2 border-white flex items-center justify-center text-[8px] font-black text-gray-500 shadow-sm">
                        +{task.count - 3}
                      </div>
                    </div>
                    <div className="text-right">
                      <span className="text-xs font-black text-gray-900">{task.count}</span>
                      <span className="text-[10px] text-gray-400 font-bold"> / {task.maxCount}</span>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
            <button className="w-full mt-6 py-3 text-xs font-black text-blue-600 hover:bg-blue-50 rounded-xl transition-all border border-transparent hover:border-blue-100">
              查看历史作业看板
            </button>
          </div>
        </div>
      </div>
      {/* Packaging Records Table */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-blue-50 rounded-xl text-blue-600">
              <HistoryIcon size={20} />
            </div>
            <h3 className="text-lg font-black text-slate-900">包装历史记录</h3>
          </div>
          <SearchInput placeholder="搜索订单、箱号、表号..." className="w-64" />
        </div>

        <TableContainer>
          <TableHead>
            <tr>
              <TableHeader>订单编号</TableHeader>
              <TableHeader>箱号</TableHeader>
              <TableHeader>条码</TableHeader>
              <TableHeader>产品名称</TableHeader>
              <TableHeader>表具类型</TableHeader>
              <TableHeader>表号</TableHeader>
              <TableHeader>测试批次</TableHeader>
              <TableHeader>检验员</TableHeader>
              <TableHeader>包装时间</TableHeader>
              <TableHeader>备注</TableHeader>
            </tr>
          </TableHead>
          <tbody>
            {mockPackagingRecords.map((record) => (
              <TableRow key={record.id}>
                <TableCell className="font-mono text-slate-500">{record.orderNo}</TableCell>
                <TableCell className="font-mono font-bold text-slate-900">{record.boxNo}</TableCell>
                <TableCell className="font-mono text-slate-400 text-[10px]">{record.barcode}</TableCell>
                <TableCell className="text-slate-600 font-bold">{record.productName}</TableCell>
                <TableCell className="text-slate-600">{record.meterType}</TableCell>
                <TableCell className="font-mono font-black text-slate-900">{record.meterNo}</TableCell>
                <TableCell className="font-mono text-slate-500">{record.testBatch}</TableCell>
                <TableCell className="text-slate-600 font-medium">{record.inspector}</TableCell>
                <TableCell className="text-slate-500 text-xs">{record.packingTime}</TableCell>
                <TableCell className="text-slate-400 text-xs">{record.remark}</TableCell>
              </TableRow>
            ))}
          </tbody>
        </TableContainer>
      </div>
    </div>
  );
};
