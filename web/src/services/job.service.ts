import { Job } from "@/types/job";

interface GetJobsParams {
  page: number;
  limit: number;
}

interface GetJobsResponse {
  data?: {
    rows: Job[];
    count: number;
  };
  error?: string;
}

export async function getJobs({ page, limit }: GetJobsParams): Promise<GetJobsResponse> {
  try {
    // TODO: Thay thế bằng API thực tế
    const mockJobs: Job[] = [
      {
        id: "1",
        position: "Frontend Developer",
        description: "Phỏng vấn vị trí Frontend Developer",
        status: "completed",
        averageScore: 8.5,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      }
    ];

    return {
      data: {
        rows: [],
        count: 0
      }
    };
  } catch (error) {
    console.error('Error fetching jobs:', error);
    return {
      error: 'Có lỗi xảy ra khi tải danh sách phỏng vấn'
    };
  }
} 