"use client"
import Container from '@/components/common/Container';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { BarChart, LineChart, PieChart, TrendingUp, Award, Target, Clock } from 'lucide-react';

const mockData = {
  overallScore: 85,
  completedInterviews: 12,
  totalTime: 360, // minutes
  skillProgress: [
    { name: 'React', score: 90 },
    { name: 'TypeScript', score: 85 },
    { name: 'Node.js', score: 80 },
    { name: 'System Design', score: 75 },
  ],
  recentScores: [
    { date: '2024-03-01', score: 82 },
    { date: '2024-03-08', score: 85 },
    { date: '2024-03-15', score: 88 },
    { date: '2024-03-22', score: 90 },
  ],
  skillDistribution: [
    { name: 'Frontend', value: 40 },
    { name: 'Backend', value: 30 },
    { name: 'System Design', value: 20 },
    { name: 'Soft Skills', value: 10 },
  ],
};

export default function AnalyticsPage() {
  return (
    <div className="py-6 sm:px-6 lg:px-8 pt-20 md:pt-6">
      <Container className="max-w-7xl mx-auto px-4 sm:px-0">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600 dark:from-blue-400 dark:to-indigo-400 mb-2">
            Phân tích tiến trình
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-300">
            Theo dõi và phân tích hiệu suất phỏng vấn của bạn
          </p>
        </div>

        {/* Overview Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center gap-4">
                <div className="p-2 bg-blue-100 dark:bg-blue-900 rounded-lg">
                  <TrendingUp className="h-6 w-6 text-blue-600 dark:text-blue-400" />
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
                    Điểm trung bình
                  </p>
                  <h3 className="text-2xl font-bold">{mockData.overallScore}/100</h3>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center gap-4">
                <div className="p-2 bg-green-100 dark:bg-green-900 rounded-lg">
                  <Award className="h-6 w-6 text-green-600 dark:text-green-400" />
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
                    Buổi phỏng vấn
                  </p>
                  <h3 className="text-2xl font-bold">{mockData.completedInterviews}</h3>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center gap-4">
                <div className="p-2 bg-purple-100 dark:bg-purple-900 rounded-lg">
                  <Clock className="h-6 w-6 text-purple-600 dark:text-purple-400" />
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
                    Tổng thời gian
                  </p>
                  <h3 className="text-2xl font-bold">{mockData.totalTime} phút</h3>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center gap-4">
                <div className="p-2 bg-orange-100 dark:bg-orange-900 rounded-lg">
                  <Target className="h-6 w-6 text-orange-600 dark:text-orange-400" />
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
                    Mục tiêu
                  </p>
                  <h3 className="text-2xl font-bold">90/100</h3>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="skills" className="space-y-6">
          <TabsList>
            <TabsTrigger value="skills">Kỹ năng</TabsTrigger>
            <TabsTrigger value="progress">Tiến trình</TabsTrigger>
            <TabsTrigger value="distribution">Phân bố</TabsTrigger>
          </TabsList>

          <TabsContent value="skills">
            <Card>
              <CardHeader>
                <CardTitle>Phân tích kỹ năng</CardTitle>
                <CardDescription>
                  Theo dõi tiến độ của từng kỹ năng
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {mockData.skillProgress.map((skill) => (
                  <div key={skill.name} className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="font-medium">{skill.name}</span>
                      <span className="text-sm text-gray-500 dark:text-gray-400">
                        {skill.score}%
                      </span>
                    </div>
                    <Progress value={skill.score} className="h-2" />
                  </div>
                ))}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="progress">
            <Card>
              <CardHeader>
                <CardTitle>Tiến trình theo thời gian</CardTitle>
                <CardDescription>
                  Theo dõi điểm số qua các buổi phỏng vấn
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[300px] flex items-center justify-center">
                  <LineChart className="h-8 w-8 text-gray-400" />
                  <p className="text-gray-500 dark:text-gray-400 ml-2">
                    Biểu đồ tiến trình sẽ được hiển thị ở đây
                  </p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="distribution">
            <Card>
              <CardHeader>
                <CardTitle>Phân bố kỹ năng</CardTitle>
                <CardDescription>
                  Tỷ lệ các kỹ năng trong buổi phỏng vấn
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[300px] flex items-center justify-center">
                  <PieChart className="h-8 w-8 text-gray-400" />
                  <p className="text-gray-500 dark:text-gray-400 ml-2">
                    Biểu đồ phân bố sẽ được hiển thị ở đây
                  </p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </Container>
    </div>
  );
} 