import { Field, ID, ObjectType } from '@nestjs/graphql';
import { Task } from 'src/tasks/models/tasks.model';

@ObjectType()
export class List {
  @Field((type) => ID)
  id: string;

  @Field((type) => String, { nullable: true })
  name: string;

  @Field((type) => Date)
  createdAt: Date;

  @Field((type) => Date)
  updatedAt: Date;

  @Field((type) => [Task])
  tasks: Task[];
}
