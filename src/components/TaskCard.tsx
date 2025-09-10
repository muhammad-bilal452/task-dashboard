'use client';

import { useState } from 'react';
import { Task } from '@/types/api';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { MoreHorizontal, Trash2, Edit } from 'lucide-react';
import { updateTask, deleteTask } from '@/lib/api';
import { useRouter } from 'next/navigation';
import { EditTaskDialog } from './EditTaskDialog';

interface TaskCardProps {
  task: Task;
}

const priorityColors = {
  LOW: 'bg-green-100 text-green-800 hover:bg-green-200',
  MEDIUM: 'bg-yellow-100 text-yellow-800 hover:bg-yellow-200',
  HIGH: 'bg-red-100 text-red-800 hover:bg-red-200',
};

const statusColors = {
  PENDING: 'bg-blue-100 text-blue-800',
  COMPLETED: 'bg-green-100 text-green-800',
};

export function TaskCard({ task }: TaskCardProps) {
  const router = useRouter();
  const [editDialogOpen, setEditDialogOpen] = useState(false);

  const handleStatusChange = async (checked: boolean) => {
    const newStatus = checked ? 'COMPLETED' : 'PENDING';
    await updateTask(task.id, { status: newStatus });
    router.refresh();
  };

  const handleDelete = async () => {
    if (confirm('Are you sure you want to delete this task?')) {
      await deleteTask(task.id);
      router.refresh();
    }
  };

  const handleEdit = () => {
    setEditDialogOpen(true);
  };

  return (
    <Card className="w-full">
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div className="flex items-start gap-3 flex-1">
            <Checkbox
              checked={task.status === 'COMPLETED'}
              onCheckedChange={handleStatusChange}
              className="mt-1"
            />
            <div className="flex-1 min-w-0">
              <CardTitle className={`text-lg ${task.status === 'COMPLETED' ? 'line-through text-muted-foreground' : ''}`}>
                {task.title}
              </CardTitle>
              <CardDescription className="mt-1">
                {task.description}
              </CardDescription>
            </div>
          </div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="h-8 w-8 p-0">
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={handleEdit}>
                <Edit className="h-4 w-4 mr-2" />
                Edit
              </DropdownMenuItem>
              <DropdownMenuItem onClick={handleDelete} className="text-red-600">
                <Trash2 className="h-4 w-4 mr-2" />
                Delete
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </CardHeader>
      <CardContent className="pt-0">
        <div className="flex items-center justify-between">
          <div className="flex gap-2">
            <Badge className={priorityColors[task.priority]}>
              {task.priority.toLowerCase()}
            </Badge>
            <Badge variant="outline" className={statusColors[task.status]}>
              {task.status.toLowerCase()}
            </Badge>
          </div>
          <div className="text-sm text-muted-foreground">
            {new Date(task.createdAt).toLocaleDateString()}
          </div>
        </div>
      </CardContent>

      <EditTaskDialog 
        task={task}
        open={editDialogOpen}
        onOpenChange={setEditDialogOpen}
      />
    </Card>
  );
}
