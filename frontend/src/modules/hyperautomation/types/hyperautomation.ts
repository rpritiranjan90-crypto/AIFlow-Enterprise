export interface RPARecord {
  id: string;
  name: string;
  type: string;
  status: string;
  createdAt: string;
}

export interface OCRJobItem {
  id: string;
  documentName: string;
  extractedText: string;
  confidenceScore: number;
  status: string;
  createdAt: string;
}

export interface VisionDetectionItem {
  id: string;
  imageName: string;
  detectedObjectsCount: number;
  qrCodeDetected?: string;
  status: string;
  createdAt: string;
}

export interface VoiceSessionItem {
  id: string;
  audioUrl: string;
  transcriptionText: string;
  summaryText?: string;
  createdAt: string;
}
