import { Field, ID, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class Task {
  @Field((type) => ID)
  id: string;

  @Field((type) => String, { nullable: true })
  title: string;

  @Field((type) => Boolean)
  isCompleted: boolean;

  @Field((type) => Date)
  createdAt: Date;

  @Field((type) => Date)
  updatedAt: Date;

  @Field((type) => Number)
  position: number;

  @Field((type) => String)
  listId: string;
}
