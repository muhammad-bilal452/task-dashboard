import { TaskStats } from '@/types/api';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { CheckCircle, Circle, TrendingUp, Calendar } from 'lucide-react';

interface StatsCardsProps {
  stats: TaskStats | null;
}

export function StatsCards({ stats }: StatsCardsProps) {
  if (!stats) return null;

  const statsItems = [
    {
      title: 'Total Tasks',
      value: stats.total,
      description: 'All tasks in system',
      icon: Circle,
      color: 'text-blue-600',
    },
    {
      title: 'Completed',
      value: stats.completed,
      description: 'Tasks finished',
      icon: CheckCircle,
      color: 'text-green-600',
    },
    {
      title: 'Completion Rate',
      value: `${stats.completionRate}%`,
      description: 'Progress overview',
      icon: TrendingUp,
      color: 'text-purple-600',
    },
    {
      title: 'Recent Activity',
      value: stats.recentActivity.tasksCreatedLast7Days,
      description: 'Tasks added this week',
      icon: Calendar,
      color: 'text-orange-600',
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      {statsItems.map((item) => {
        const Icon = item.icon;
        return (
          <Card key={item.title}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">{item.title}</CardTitle>
              <Icon className={`h-4 w-4 ${item.color}`} />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{item.value}</div>
              <CardDescription className="text-xs text-muted-foreground">
                {item.description}
              </CardDescription>
            </CardContent>
          </Card>
        );
      })}
      

        <div className="md:col-span-2 lg:col-span-4">
          <div className="flex gap-4 flex-wrap">
            <div className="flex items-center gap-2">
              <Badge className="bg-red-100 text-red-800">High</Badge>
              <span className="text-sm">{stats.byPriority.high} tasks</span>
            </div>
            <div className="flex items-center gap-2">
              <Badge className="bg-yellow-100 text-yellow-800">Medium</Badge>
              <span className="text-sm">{stats.byPriority.medium} tasks</span>
            </div>
            <div className="flex items-center gap-2">
              <Badge className="bg-green-100 text-green-800">Low</Badge>
              <span className="text-sm">{stats.byPriority.low} tasks</span>
            </div>
          </div>
          </div>
    </div>
  );
}
