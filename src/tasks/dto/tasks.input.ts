import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class InputTask {
  @Field((type) => String, { nullable: true })
  title: string;

  @Field((type) => [String], { nullable: true })
  list?: string[];

  @Field((type) => Number)
  idDone: number;
}
