
export interface ApiResponse<T = any> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
  details?: any;
}

export interface Task {
  id: string;
  title: string;
  description: string;
  priority: 'LOW' | 'MEDIUM' | 'HIGH';
  status: 'PENDING' | 'COMPLETED';
  createdAt: string;
  updatedAt: string;
}

export interface CreateTaskRequest {
  title: string;
  description: string;
  priority: 'LOW' | 'MEDIUM' | 'HIGH';
  status?: 'PENDING' | 'COMPLETED';
}

export interface UpdateTaskRequest {
  title?: string;
  description?: string;
  priority?: 'LOW' | 'MEDIUM' | 'HIGH';
  status?: 'PENDING' | 'COMPLETED';
}

export interface TaskStats {
  total: number;
  completed: number;
  pending: number;
  completionRate: number;
  byPriority: {
    low: number;
    medium: number;
    high: number;
  };
  recentActivity: {
    tasksCreatedLast7Days: number;
  };
}

export type TasksResponse = ApiResponse<Task[]> & { count?: number };
export type TaskResponse = ApiResponse<Task>;
export type TaskStatsResponse = ApiResponse<TaskStats>;
