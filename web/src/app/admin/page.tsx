import { getAdminAnalysis } from '@/actions/admin.action';
import AdminDashboardClient from './AdminDashboardClient';


export default async function AdminDashboardPage() {
  const res = await getAdminAnalysis();

  console.log(res);
  

  return <AdminDashboardClient />
} 