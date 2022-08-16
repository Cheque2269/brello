import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import {
  InputTask,
  IsCompletedInput,
  RepositionTaskInput,
} from './dto/tasks.input';
import { Task } from './models/tasks.model';
import { TasksService } from './tasks.service';

@Resolver(() => Task)
export class TasksResolver {
  constructor(private readonly tasksService: TasksService) {}

  @Query(() => [Task])
  async getAllTask(): Promise<Task[]> {
    const result: Task[] = (await this.tasksService.getAll()).map((x) => {
      return {
        id: x.id,
        title: x.title,
        isCompleted: x.isCompleted,
        createdAt: x.createdAt,
        updatedAt: x.updatedAt,
        position: x.position,
        listId: x.listId,
      };
    });
    return result;
  }

  @Mutation(() => InputTask)
  createTask(@Args('input') input: InputTask): Promise<Task> {
    const result = this.tasksService.createTask(input);
    return result;
  }

  @Mutation(() => Task)
  repositionTask(@Args('input') input: RepositionTaskInput): Promise<Task> {
    const result = this.tasksService.repositionTask(input);
    return result;
  }

  @Mutation(() => Task)
  isCompletedTask(@Args('input') input: IsCompletedInput): Promise<Task> {
    const result = this.tasksService.isCompleted(input);
    return result;
  }
}
