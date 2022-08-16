import {
  Args,
  Mutation,
  Parent,
  Query,
  ResolveField,
  Resolver,
} from '@nestjs/graphql';
import { Task } from 'src/tasks/models/tasks.model';
import { InputList } from './dto/lists.input';
import { ListsService } from './lists.service';
import { List } from './models/lists.model';

@Resolver(() => List)
export class ListsResolver {
  constructor(private readonly listsService: ListsService) {}

  @Query(() => [List])
  async getList(): Promise<List[]> {
    const result: List[] = (await this.listsService.getAllLists()).map((x) => {
      return {
        id: x.id,
        name: x.name,
        createdAt: x.createdAt,
        updatedAt: x.updatedAt,
        tasks: [],
      };
    });
    return result;
  }

  @ResolveField('tasks', () => [Task])
  async getTasks(@Parent() list: List): Promise<Task[]> {
    return (await this.listsService.getTasksByListId(list.id)).map((x) => {
      return {
        id: x.id,
        title: x.title,
        createdAt: x.createdAt,
        updatedAt: x.updatedAt,
        isCompleted: x.isCompleted,
        position: x.position,
        listId: x.listId,
      };
    });
  }

  @Mutation(() => List)
  async createList(@Args('input') input: InputList): Promise<List> {
    const result = await this.listsService.createList(input);
    return result;
  }
}
