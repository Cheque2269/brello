import { Field, ID, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class Task {
  @Field((type) => ID)
  id: string;

  @Field((type) => String, { nullable: true })
  title: string;

  @Field((type) => Boolean)
  isCompleted: boolean;
}
