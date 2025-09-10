import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@/app/generated/prisma';

const prisma = new PrismaClient();

export async function GET(_: NextRequest) {
  try {
    const totalTasks = await prisma.task.count();

    const [completedTasks, pendingTasks] = await Promise.all([
      prisma.task.count({
        where: {
          status: 'COMPLETED',
        },
      }),
      prisma.task.count({
        where: {
          status: 'PENDING',
        },
      }),
    ]);

    const [lowPriorityTasks, mediumPriorityTasks, highPriorityTasks] = await Promise.all([
      prisma.task.count({
        where: {
          priority: 'LOW',
        },
      }),
      prisma.task.count({
        where: {
          priority: 'MEDIUM',
        },
      }),
      prisma.task.count({
        where: {
          priority: 'HIGH',
        },
      }),
    ]);

    const completionRate = totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0;

    const sevenDaysAgo = new Date();
    sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);

    const recentTasksCount = await prisma.task.count({
      where: {
        createdAt: {
          gte: sevenDaysAgo,
        },
      },
    });

    const stats = {
      total: totalTasks,
      completed: completedTasks,
      pending: pendingTasks,
      completionRate,
      byPriority: {
        low: lowPriorityTasks,
        medium: mediumPriorityTasks,
        high: highPriorityTasks,
      },
      recentActivity: {
        tasksCreatedLast7Days: recentTasksCount,
      },
    };

    return NextResponse.json({
      success: true,
      data: stats,
    });
  } catch (error) {
    console.error('Error fetching task statistics:', error);
    return NextResponse.json(
      {
        success: false,
        error: 'Failed to fetch task statistics',
      },
      { status: 500 }
    );
  }
}
