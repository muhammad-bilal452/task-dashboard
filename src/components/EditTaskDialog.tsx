'use client';

import { Task } from '@/types/api';
import { TaskDialog } from './TaskDialog';

interface EditTaskDialogProps {
  task: Task;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function EditTaskDialog({ task, open, onOpenChange }: EditTaskDialogProps) {
  return (
    <TaskDialog 
      mode="edit"
      open={open}
      onOpenChange={onOpenChange}
      task={task}
    />
  );
}
