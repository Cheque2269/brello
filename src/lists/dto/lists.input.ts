import { Field, InputType, ObjectType } from '@nestjs/graphql';

@ObjectType()
@InputType('ListInputScheme')
export class InputList {
  @Field((type) => String, { nullable: true })
  name: string;

  @Field((type) => [InputTaskInList])
  tasks: InputTaskInList[];
}

@ObjectType()
@InputType('InputTaskInListScheme')
export class InputTaskInList {
  @Field((type) => String, { nullable: true })
  title: string;
}
