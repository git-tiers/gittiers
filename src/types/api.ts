import { NextApiRequest, NextApiResponse } from 'next';

export interface ImageSettings {
  isCard: string;
  isText: string;
  isMode: string;
  contributeCount: number;
}

export interface UserData {
  tierImageBase64?: string;
  lastUpdated?: string;
  imageSettings?: ImageSettings;
  access_token?: string;
  loginId?: string;
  first_login?: string;
  last_login?: string;
  [key: string]: any;
}

export interface TierApiResponse {
  success: boolean;
  message?: string;
  data?: any;
}

export interface ErrorResponse {
  message: string;
  code?: string;
}

// App Router 타입
export interface RouteParams {
  params: {
    userId: string;
  };
}

// Pages Router 타입
export interface TierApiRequest extends NextApiRequest {
  query: {
    userId: string;
  };
}

export interface TierApiNextResponse extends NextApiResponse<ErrorResponse | Buffer> {
  // 필요시 추가 메서드 정의
}
