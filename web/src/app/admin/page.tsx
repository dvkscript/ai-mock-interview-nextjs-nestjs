import { getAdminAnalysis } from '@/actions/admin.action';
import AdminDashboardClient from './AdminDashboardClient';
export const dynamic = 'force-dynamic';

export default async function AdminDashboardPage() {
  const res = await getAdminAnalysis("5");

  if (!res.ok || !res.data) {
    throw new Error(res.status.toString());
  }

  return <AdminDashboardClient data={res.data} />
} 