import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { InputTask } from './dto/tasks.input';
import { Task } from './models/tasks.model';
import { TasksService } from './tasks.service';

@Resolver('Tasks')
export class TasksResolver {
  constructor(private readonly tasksService: TasksService) {}

  // @Query(() => Task)
  // getTask(): Task {
  //   const result: Task = {
  //     taskId: 1,
  //     title: 'title',
  //     list: ['1', '2'],
  //     idDone: 0,
  //   };
  //   return result;
  // }

  // @Mutation(() => Task)
  // createTask(@Args('input') input: InputTask): Task {
  //   const result: Task = {
  //     taskId: 2,
  //     ...input,
  //   };
  //   return result;
  // }

  @Query(() => [Task])
  async getAllTask(): Promise<Task[]> {
    const result: Task[] = (await this.tasksService.getAll()).map((x) => {
      return {
        id: x.id,
        title: x.title,
        isCompleted: x.isCompleted,
      };
    });
    return result;
  }
}
