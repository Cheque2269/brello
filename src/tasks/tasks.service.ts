import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import {
  InputTask,
  IsCompletedInput,
  RepositionTaskInput,
} from './dto/tasks.input';
import { Task } from './models/tasks.model';

@Injectable()
export class TasksService {
  constructor(private readonly prismaService: PrismaService) {}

  getAll() {
    return this.prismaService.tasks.findMany({
      orderBy: {
        position: 'asc',
      },
    });
  }

  async createTask(input: InputTask): Promise<Task> {
    const count = await this.prismaService
      .$queryRaw`SELECT "public".new_position_in_list(uuid(${input.listId}));`;

    return this.prismaService.tasks.create({
      data: {
        title: input.title,
        position: count[0].new_position_in_list,
        lists: {
          connect: {
            id: input.listId,
          },
        },
      },
    });
  }

  async isCompleted(input: IsCompletedInput) {
    const task = await this.prismaService.tasks.findUnique({
      where: {
        id: input.id,
      },
    });

    task.isCompleted = task.isCompleted !== true;

    return await this.prismaService.tasks.update({
      data: {
        isCompleted: task.isCompleted,
      },
      where: {
        id: input.id,
      },
      select: {
        id: true,
        title: true,
        isCompleted: true,
        createdAt: true,
        updatedAt: true,
        position: true,
        listId: true,
      },
    });
  }

  async repositionTask(input: RepositionTaskInput) {
    const task = await this.prismaService.tasks.findUnique({
      where: {
        id: input.id,
      },
    });

    const tasks = await this.prismaService.tasks.findMany({
      where: {
        listId: task.listId,
      },
      orderBy: {
        position: 'asc',
      },
    });

    if (input.newPosition > tasks.length || input.newPosition <= 0) {
      throw 'Invalid new position';
    }
    console.log('tasks', tasks);

    let newPosition;

    const before = tasks[input.newPosition - 1];
    const after = tasks[input.newPosition];

    newPosition =
      ((before?.position ?? 0) + (after?.position ?? tasks.length + 1)) / 2;

    if (input.newPosition < tasks[0].position && after !== undefined)
      newPosition = after.position - before.position;

    return await this.prismaService.tasks.update({
      data: {
        position: newPosition,
      },
      where: {
        id: input.id,
      },
      select: {
        id: true,
        title: true,
        isCompleted: true,
        createdAt: true,
        updatedAt: true,
        position: true,
        listId: true,
      },
    });
  }
}
