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
  startTime: string;
  endTime: string;
  totalCount: number;
  passedCount: number;
  failedCount: number;
  operator: string;
  status: 'completed' | 'running';
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

export type ViewType = 'archive' | 'warehouse' | 'testing' | 'history' | 'packaging' | 'announcement' | 'permissions' | 'enterprise' | 'user-account' | 'role-management';
