import { IsBoolean, IsNotEmpty, IsNumber, IsString, MaxLength, Validate } from "class-validator";
import { NoWhitespaceConstraint } from "../utils/NoWhitespaceConstraint";

export class ProjectDTO {
  @IsString()
  @MaxLength(100)
  @IsNotEmpty()
  @Validate(NoWhitespaceConstraint)
  readonly name: string;

  @IsString()
  @MaxLength(2000)
  @IsNotEmpty()
  @Validate(NoWhitespaceConstraint)
  readonly description: string;

  @IsString()
  @IsNotEmpty()
  readonly imageUrl: string;

  @IsNumber()
  readonly contractTypeId: number;

  @IsNumber()
  @IsNotEmpty()
  readonly budget: number;

  @IsBoolean()
  @IsNotEmpty()
  readonly isActive: boolean;
}