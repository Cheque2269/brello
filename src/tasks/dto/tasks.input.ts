import { InputType, Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
@InputType('TaskInput')
export class InputTask {
  @Field((type) => String, { nullable: true })
  title: string;

  @Field((type) => String)
  listId: string;
}

@ObjectType()
@InputType('RepositionTaskInputScheme')
export class RepositionTaskInput {
  @Field((type) => String)
  id: string;

  @Field((type) => Number)
  newPosition: number;
}

@ObjectType()
@InputType('IsCompletedInputScheme')
export class IsCompletedInput {
  @Field((type) => String)
  id: string;
}
