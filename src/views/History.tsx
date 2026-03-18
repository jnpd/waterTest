import React, { useState } from 'react';
import { 
  ChevronRight, 
  ArrowLeft, 
  CheckCircle2, 
  XCircle, 
  Clock, 
  FileDown,
  Calendar,
  User,
  Activity,
  BarChart3
} from 'lucide-react';
import { TestBatch, Meter } from '../types';
import { motion, AnimatePresence } from 'motion/react';
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

const mockBatches: TestBatch[] = [
  { id: '1', batchNo: 'BATCH-20240317-001', startTime: '2024-03-17 08:30:00', endTime: '2024-03-17 10:45:00', totalCount: 100, passedCount: 98, failedCount: 2, operator: '张三', status: 'completed' },
  { id: '2', batchNo: 'BATCH-20240316-005', startTime: '2024-03-16 14:00:00', endTime: '2024-03-16 16:30:00', totalCount: 200, passedCount: 195, failedCount: 5, operator: '李四', status: 'completed' },
  { id: '3', batchNo: 'BATCH-20240316-004', startTime: '2024-03-16 09:00:00', endTime: '2024-03-16 11:30:00', totalCount: 150, passedCount: 148, failedCount: 2, operator: '王五', status: 'completed' },
];

const mockMeters: any[] = [
  { 
    id: 'm1', 
    taskNo: 'TEST-20240317-01',
    meterNo: '202403170001', 
    imei: '861234567890121',
    simNo: '89860123456789012341',
    timestamp: '2024-03-17 11:00:00',
    result: '全功能通过',
    status: 'passed',
    tester: '李四',
    benchData: 'P:1.2MPa, F:0.5m³/h',
    remark: '无'
  },
  { 
    id: 'm2', 
    taskNo: 'TEST-20240317-02',
    meterNo: '202403170002', 
    imei: '861234567890122',
    simNo: '89860123456789012342',
    timestamp: '2024-03-17 11:05:00',
    result: '全功能通过',
    status: 'passed',
    tester: '李四',
    benchData: 'P:1.1MPa, F:0.4m³/h',
    remark: '无'
  },
];

export const HistoryView: React.FC = () => {
  const [selectedBatch, setSelectedBatch] = useState<TestBatch | null>(null);

  if (selectedBatch) {
    return (
      <div className="p-6 space-y-6 bg-slate-50/50 min-h-full">
        <div className="flex items-center justify-between">
          <ActionButton 
            variant="ghost"
            onClick={() => setSelectedBatch(null)}
            icon={ArrowLeft}
            className="font-black text-slate-600"
          >
            返回批次列表
          </ActionButton>
          <ActionButton icon={FileDown}>
            导出详情
          </ActionButton>
        </div>

        <div className="bg-white p-8 rounded-[2rem] border border-slate-200 shadow-sm grid grid-cols-1 md:grid-cols-4 gap-8 relative overflow-hidden group">
          <div className="absolute top-0 right-0 w-64 h-64 bg-blue-50 rounded-full -mr-32 -mt-32 blur-3xl group-hover:scale-150 transition-transform duration-1000" />
          
          <div className="relative z-10">
            <p className="text-[10px] text-slate-400 uppercase font-black tracking-[0.2em] mb-2">批次编号</p>
            <p className="font-mono font-black text-xl text-slate-900">{selectedBatch.batchNo}</p>
          </div>
          <div className="relative z-10">
            <p className="text-[10px] text-slate-400 uppercase font-black tracking-[0.2em] mb-2">测试时间</p>
            <p className="font-black text-slate-700">{selectedBatch.startTime}</p>
          </div>
          <div className="relative z-10">
            <p className="text-[10px] text-slate-400 uppercase font-black tracking-[0.2em] mb-2">操作员</p>
            <p className="font-black text-slate-700">{selectedBatch.operator}</p>
          </div>
          <div className="relative z-10">
            <p className="text-[10px] text-slate-400 uppercase font-black tracking-[0.2em] mb-2">合格率</p>
            <div className="flex items-center gap-2">
              <p className="text-2xl font-black text-emerald-600">
                {((selectedBatch.passedCount / selectedBatch.totalCount) * 100).toFixed(1)}%
              </p>
              <BarChart3 className="text-emerald-500" size={20} />
            </div>
          </div>
        </div>

        <TableContainer>
          <TableHead>
            <tr>
              <TableHeader>测试任务号</TableHeader>
              <TableHeader>表号</TableHeader>
              <TableHeader>IMEI</TableHeader>
              <TableHeader>卡号</TableHeader>
              <TableHeader>测试时间</TableHeader>
              <TableHeader>测试结果</TableHeader>
              <TableHeader>合格状态</TableHeader>
              <TableHeader>测试人员</TableHeader>
              <TableHeader>检测台数据</TableHeader>
              <TableHeader>备注</TableHeader>
            </tr>
          </TableHead>
          <tbody>
            {mockMeters.map((meter) => (
              <TableRow key={meter.id}>
                <TableCell className="font-mono text-slate-500">{meter.taskNo}</TableCell>
                <TableCell className="font-mono font-black text-slate-900">{meter.meterNo}</TableCell>
                <TableCell className="font-mono text-slate-400 text-[10px]">{meter.imei}</TableCell>
                <TableCell className="font-mono text-slate-400 text-[10px]">{meter.simNo}</TableCell>
                <TableCell className="text-slate-500 text-xs">{meter.timestamp}</TableCell>
                <TableCell className="text-slate-600 font-bold">{meter.result}</TableCell>
                <TableCell>
                  <StatusBadge variant={meter.status === 'passed' ? 'success' : 'error'}>
                    {meter.status === 'passed' ? '合格' : '异常'}
                  </StatusBadge>
                </TableCell>
                <TableCell className="text-slate-600 font-medium">{meter.tester}</TableCell>
                <TableCell className="text-slate-500 font-mono text-[10px]">{meter.benchData}</TableCell>
                <TableCell className="text-slate-400 text-xs">{meter.remark}</TableCell>
              </TableRow>
            ))}
          </tbody>
        </TableContainer>
      </div>
    );
  }

  return (
    <div className="p-6 space-y-6 bg-slate-50/50 min-h-full">
      <div className="flex items-center justify-between gap-4 bg-white p-4 rounded-2xl border border-slate-200 shadow-sm">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-blue-50 rounded-xl text-blue-600">
            <Activity size={20} />
          </div>
          <h3 className="text-lg font-black text-slate-900">测试历史批次</h3>
        </div>
        
        <div className="flex items-center gap-3">
          <SearchInput placeholder="搜索批次号..." className="w-64" />
          <ActionButton variant="outline" icon={Calendar}>时间筛选</ActionButton>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4">
        <AnimatePresence>
          {mockBatches.map((batch) => (
            <motion.div 
              key={batch.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              whileHover={{ scale: 1.01, x: 4 }}
              onClick={() => setSelectedBatch(batch)}
              className="bg-white p-6 rounded-[2rem] border border-slate-200 shadow-sm hover:border-blue-400 hover:shadow-xl hover:shadow-blue-100 transition-all cursor-pointer flex items-center justify-between group relative overflow-hidden"
            >
              <div className="absolute top-0 left-0 w-1 h-full bg-blue-600 opacity-0 group-hover:opacity-100 transition-opacity" />
              
              <div className="flex items-center gap-6 relative z-10">
                <div className="w-14 h-14 bg-slate-50 rounded-2xl flex items-center justify-center text-slate-400 group-hover:bg-blue-600 group-hover:text-white transition-all duration-500">
                  <Clock size={28} />
                </div>
                <div>
                  <div className="flex items-center gap-3">
                    <h4 className="font-black text-lg text-slate-900">{batch.batchNo}</h4>
                    <StatusBadge variant="success">已完成</StatusBadge>
                  </div>
                  <div className="flex items-center gap-6 mt-2 text-xs font-black text-slate-400 uppercase tracking-widest">
                    <span className="flex items-center gap-1.5"><User size={14} className="text-blue-500" /> {batch.operator}</span>
                    <span className="flex items-center gap-1.5"><Calendar size={14} className="text-blue-500" /> {batch.startTime}</span>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-12 relative z-10">
                <div className="text-center">
                  <p className="text-[10px] text-slate-400 font-black uppercase tracking-widest mb-1">测试总数</p>
                  <p className="text-2xl font-black text-slate-900">{batch.totalCount}</p>
                </div>
                <div className="text-center">
                  <p className="text-[10px] text-emerald-500 font-black uppercase tracking-widest mb-1">合格</p>
                  <p className="text-2xl font-black text-emerald-600">{batch.passedCount}</p>
                </div>
                <div className="text-center">
                  <p className="text-[10px] text-rose-500 font-black uppercase tracking-widest mb-1">异常</p>
                  <p className="text-2xl font-black text-rose-600">{batch.failedCount}</p>
                </div>
                <div className="w-10 h-10 rounded-full bg-slate-50 flex items-center justify-center text-slate-300 group-hover:bg-blue-50 group-hover:text-blue-600 transition-all">
                  <ChevronRight size={24} />
                </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </div>
  );
};
