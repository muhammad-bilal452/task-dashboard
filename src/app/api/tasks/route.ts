import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient, Prisma } from '@/app/generated/prisma';
import { z } from 'zod';

const prisma = new PrismaClient();

const createTaskSchema = z.object({
  title: z.string().min(1, 'Title is required').max(100, 'Title must be less than 100 characters'),
  description: z.string().min(1, 'Description is required').max(500, 'Description must be less than 500 characters'),
  priority: z.enum(['LOW', 'MEDIUM', 'HIGH']),
  status: z.enum(['PENDING', 'COMPLETED']).optional().default('PENDING'),
});

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const status = searchParams.get('status');
    const priority = searchParams.get('priority');

    const where: Prisma.TaskWhereInput = {};
    if (status && ['PENDING', 'COMPLETED'].includes(status)) {
      where.status = status as 'PENDING' | 'COMPLETED';
    }
    if (priority && ['LOW', 'MEDIUM', 'HIGH'].includes(priority)) {
      where.priority = priority as 'LOW' | 'MEDIUM' | 'HIGH';
    }

    const tasks = await prisma.task.findMany({
      where,
      orderBy: {
        createdAt: 'desc',
      },
    });

    return NextResponse.json({
      success: true,
      data: tasks,
      count: tasks.length,
    });
  } catch (error) {
    console.error('Error fetching tasks:', error);
    return NextResponse.json(
      {
        success: false,
        error: 'Failed to fetch tasks',
      },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    const validatedData = createTaskSchema.parse(body);

    const task = await prisma.task.create({
      data: validatedData,
    });

    return NextResponse.json(
      {
        success: true,
        data: task,
        message: 'Task created successfully',
      },
      { status: 201 }
    );
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        {
          success: false,
          error: 'Validation failed',
          details: error.message
        },
        { status: 400 }
      );
    }

    console.error('Error creating task:', error);
    return NextResponse.json(
      {
        success: false,
        error: 'Failed to create task',
      },
      { status: 500 }
    );
  }
}
