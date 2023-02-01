import { Field, Int, ObjectType } from "type-graphql";
import Wilder from "../../models/Wilder/Wilder.entity";

@ObjectType()
class PageOfWilders {
  @Field(() => Int)
  totalCount: number;

  @Field(() => Int, { nullable: true })
  nextPageNumber: number | null;

  @Field(() => [Wilder])
  wilders: Wilder[];
}

export default PageOfWilders;
