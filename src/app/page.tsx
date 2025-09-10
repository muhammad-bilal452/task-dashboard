import { Suspense } from 'react';
import { getTasks, getTaskStats } from '@/lib/api';
import { TaskCard } from '@/components/TaskCard';
import { AddTaskDialog } from '@/components/AddTaskDialog';
import { TaskFilters } from '@/components/TaskFilters';
import { StatsCards } from '@/components/StatsCards';
import { Card, CardContent } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { FileText } from 'lucide-react';

export default async function Home(props: {
  searchParams?: Promise<{
    status?: string;
    priority?: string;
  }>;
}) {
  const searchParams = await props.searchParams;
  const status = searchParams?.status;
  const priority = searchParams?.priority;

  const [tasks, stats] = await Promise.all([
    getTasks({ status, priority }),
    getTaskStats(),
  ]);

  const filteredTasksCount = tasks.length;
  const hasFilters = status || priority;

  return (
    <div className="min-h-screen bg-gray-50/30">
      <div className="container mx-auto px-4 py-8 max-w-7xl">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Task Dashboard</h1>
            <p className="text-muted-foreground mt-1">
              Manage your tasks and track your progress
            </p>
          </div>
          <AddTaskDialog />
        </div>

        <div className="mb-8">
          <StatsCards stats={stats} />
        </div>
        <div className="mb-6">
          <Suspense fallback={<Skeleton className="h-20 w-full" />}>
            <TaskFilters />
          </Suspense>
        </div>

        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold">
              {hasFilters ? 'Filtered Tasks' : 'All Tasks'}
              <span className="ml-2 text-sm font-normal text-muted-foreground">
                ({filteredTasksCount} {filteredTasksCount === 1 ? 'task' : 'tasks'})
              </span>
            </h2>
          </div>

          {tasks.length === 0 ? (
            <Card>
              <CardContent className="p-12 text-center">
                <div className="mx-auto w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mb-4">
                  <FileText className="w-12 h-12 text-gray-400" />
                </div>
                <h3 className="text-lg font-medium text-gray-900 mb-2">
                  {hasFilters ? 'No tasks match your filters' : 'No tasks yet'}
                </h3>
                <p className="text-gray-500 max-w-sm mx-auto">
                  {hasFilters 
                    ? 'Try adjusting your filters or create a new task to get started.' 
                    : 'Create your first task to get started with organizing your work.'
                  }
                </p>
              </CardContent>
            </Card>
          ) : (
            <div className="grid gap-4">
              {tasks.map((task) => (
                <TaskCard key={task.id} task={task} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}