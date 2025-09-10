'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';
import { TaskDialog } from './TaskDialog';

export function AddTaskDialog() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <Button className="gap-2" onClick={() => setOpen(true)}>
        <Plus className="h-4 w-4" />
        Add Task
      </Button>
      
      <TaskDialog 
        mode="create"
        open={open}
        onOpenChange={setOpen}
      />
    </>
  );
}
