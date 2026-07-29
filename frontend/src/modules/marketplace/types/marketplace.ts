export interface CommercialAssetItem {
  id: string;
  name: string;
  type: string;
  priceUsd: number;
  publisherId: string;
  publisherName: string;
  rating: number;
  downloadsCount: number;
  status: string;
  description: string;
  createdAt: string;
}

export interface CommercialSubscriptionItem {
  id: string;
  workspaceId: string;
  tier: string;
  seats: number;
  status: string;
  createdAt: string;
}

export interface LicenseItem {
  id: string;
  workspaceId: string;
  assetId: string;
  licenseKey: string;
  seatsAllocated: number;
  status: string;
}

export interface ReviewItem {
  id: string;
  assetId: string;
  userName: string;
  rating: number;
  comment: string;
  isVerifiedPurchase: boolean;
  createdAt: string;
}
