export type SubscriptionTier = 'free' | 'pro' | 'enterprise';

export interface UserSubscription {
  id: string;
  userId: string;
  tier: SubscriptionTier;
  startDate: string;
  endDate: string;
  isActive: boolean;
}

interface GetUserSubscriptionResponse {
  data?: UserSubscription;
  error?: string;
}

export async function getUserSubscription(): Promise<GetUserSubscriptionResponse> {
  try {
    // TODO: Thay thế bằng API thực tế
    const mockSubscription: UserSubscription = {
      id: "1",
      userId: "1",
      tier: "free",
      startDate: new Date().toISOString(),
      endDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(),
      isActive: true
    };

    return {
      data: mockSubscription
    };
  } catch (error) {
    console.error('Error fetching subscription:', error);
    return {
      error: 'Có lỗi xảy ra khi tải thông tin gói đăng ký'
    };
  }
} 