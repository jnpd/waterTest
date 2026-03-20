export interface Meter {
  id: string;
  meterNo: string;
  imei: string;
  iccid: string;
  model: string;
  caliber: string;
  protocol: string;
  taskId: string;
  status: 'idle' | 'testing' | 'passed' | 'failed';
  reading?: number;
  valveStatus?: 'open' | 'closed';
  voltage?: number;
  signal?: number;
  progress?: number;
  timestamp: string;
  assetNo?: string;
}

export interface TestBatch {
  id: string;
  batchNo: string;
  /** 备货单号（与批次管理口径一致） */
  productionOrderNo: string;
  /** 表具名称 */
  meterName: string;
  remark: string;
  startTime: string;
  endTime: string;
  totalCount: number;
  passedCount: number;
  failedCount: number;
  operator: string;
  status: 'completed' | 'running';
}

/** 检验台单条记录（常来自线下 Excel） */
export interface BenchRecord {
  id: string;
  meterNo: string;
  setFlow: number;
  actualFlow: number;
  temperature: number;
  density: number;
  standardValue: number;
  relativeErrorPct: number;
}

/** 平台采集的单表测试记录 */
export interface PlatformTestRecord {
  id: string;
  taskNo: string;
  meterNo: string;
  imei: string;
  simNo: string;
  timestamp: string;
  result: string;
  status: 'passed' | 'failed';
  tester: string;
  remark: string;
  /** 手动绑定后的检验台记录 id */
  boundBenchId?: string | null;
}

export interface PackagingTask {
  id: string;
  taskNo: string;
  boxNo: string;
  productName: string;
  batchNo: string;
  count: number;
  maxCount: number;
  status: 'packing' | 'finished';
  createdAt: string;
}

export interface Enterprise {
  id: string;
  name: string;
  code: string;
  adminName: string;
  /** 企业管理员登录账号 */
  adminUsername?: string;
  /** 密码（列表仅脱敏展示；编辑时留空表示不修改） */
  adminPassword?: string;
  status: 'active' | 'disabled';
  createdAt: string;
}

export interface Role {
  id: string;
  name: string;
  description: string;
  permissions: string[];
}

export interface UserAccount {
  id: string;
  username: string;
  realName: string;
  role: string;
  enterpriseId: string;
  status: 'active' | 'disabled';
  lastLogin: string;
}

/** 测试合格标准配套的现场条件佐证图（存档留痕，如仪表读数、环境、参数屏拍等） */
export interface TestConditionImageArchive {
  id: string;
  fileName: string;
  /** 演示环境使用 data URL；正式环境宜改为对象存储 URL */
  dataUrl: string;
  uploadedAt: string;
}

/** 批量测试页「测试合格标准参数」完整快照（含条件图片存档） */
export interface TestStandards {
  batteryMin: string;
  batteryMax: string;
  mainIp: string;
  backupIp: string;
  readingPrecision: string;
  valveRule: string;
  conditionImageArchives: TestConditionImageArchive[];
}

export type ViewType =
  | 'archive'
  | 'warehouse'
  | 'batch-management'
  | 'testing'
  | 'history'
  | 'packaging'
  | 'announcement'
  | 'permissions'
  | 'enterprise'
  | 'user-account'
  | 'role-management';
