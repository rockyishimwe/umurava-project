import { useQuery } from '@tanstack/react-query';
import { getDashboardStats } from '@/lib/api';

export function useDashboardStats() {
  return useQuery({
    queryKey: ['dashboardStats'],
    queryFn: getDashboardStats,
    retry: 1,
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
}