export interface MobileDeviceItem {
  id: string;
  userId: string;
  deviceName: string;
  platform: string;
  osVersion: string;
  status: string;
  lastSyncAt: string;
}

export interface PushNotificationItem {
  id: string;
  deviceId: string;
  title: string;
  body: string;
  type: string;
  isRead: boolean;
  createdAt: string;
}

export interface ApprovalTaskItem {
  id: string;
  title: string;
  requester: string;
  riskLevel: string;
  status: string;
  createdAt: string;
}

export interface EdgeModelItem {
  id: string;
  modelName: string;
  sizeMb: number;
  quantization: string;
  isDownloaded: boolean;
}
