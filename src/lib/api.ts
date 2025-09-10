import { Task, TaskStats, CreateTaskRequest, UpdateTaskRequest } from '@/types/api';

const BASE_URL = process.env.NODE_ENV === 'production' 
  ? process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'
  : 'http://localhost:3000';

export async function getTasks(filters?: { status?: string; priority?: string }): Promise<Task[]> {
  try {
    const searchParams = new URLSearchParams();
    if (filters?.status) searchParams.set('status', filters.status);
    if (filters?.priority) searchParams.set('priority', filters.priority);
    
    const url = `${BASE_URL}/api/tasks${searchParams.toString() ? `?${searchParams.toString()}` : ''}`;
    const response = await fetch(url, { cache: 'no-store' });
    
    if (!response.ok) {
      throw new Error('Failed to fetch tasks');
    }
    
    const result = await response.json();
    return result.success ? result.data : [];
  } catch (error) {
    console.error('Error fetching tasks:', error);
    return [];
  }
}

export async function getTaskStats(): Promise<TaskStats | null> {
  try {
    const response = await fetch(`${BASE_URL}/api/tasks/stats`, { cache: 'no-store' });
    
    if (!response.ok) {
      throw new Error('Failed to fetch task stats');
    }
    
    const result = await response.json();
    return result.success ? result.data : null;
  } catch (error) {
    console.error('Error fetching task stats:', error);
    return null;
  }
}

export async function createTask(task: CreateTaskRequest): Promise<Task | null> {
  try {
    const response = await fetch(`${BASE_URL}/api/tasks`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(task),
    });
    
    if (!response.ok) {
      throw new Error('Failed to create task');
    }
    
    const result = await response.json();
    return result.success ? result.data : null;
  } catch (error) {
    console.error('Error creating task:', error);
    return null;
  }
}

export async function updateTask(id: string, updates: UpdateTaskRequest): Promise<Task | null> {
  try {
    const response = await fetch(`${BASE_URL}/api/tasks/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(updates),
    });
    
    if (!response.ok) {
      throw new Error('Failed to update task');
    }
    
    const result = await response.json();
    return result.success ? result.data : null;
  } catch (error) {
    console.error('Error updating task:', error);
    return null;
  }
}

export async function deleteTask(id: string): Promise<boolean> {
  try {
    const response = await fetch(`${BASE_URL}/api/tasks/${id}`, {
      method: 'DELETE',
    });
    
    if (!response.ok) {
      throw new Error('Failed to delete task');
    }
    
    const result = await response.json();
    return result.success;
  } catch (error) {
    console.error('Error deleting task:', error);
    return false;
  }
}
