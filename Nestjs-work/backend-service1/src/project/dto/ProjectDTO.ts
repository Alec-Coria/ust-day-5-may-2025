import { IsBoolean, IsDate, IsNotEmpty, IsNumber, IsString, MaxLength } from "class-validator";

export class ProjectDTO {
  @IsString()
  @MaxLength(100)
  @IsNotEmpty()
  readonly name: string;

  @IsString()
  @MaxLength(2000)
  @IsNotEmpty()
  readonly description: string;

  @IsString()
  @IsNotEmpty()
  readonly imageUrl: string;

  @IsNumber()
  readonly contractTypeId: number;

  @IsDate()
  readonly contractSignedOn: Date;

  @IsNumber()
  @IsNotEmpty()
  readonly budget: number;

  @IsBoolean()
  @IsNotEmpty()
  readonly isActive: boolean;
}