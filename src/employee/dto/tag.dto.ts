import { IsNotEmpty, IsString, MaxLength } from 'class-validator';

export class TagDto {
  @IsNotEmpty()
  @IsString()
  @MaxLength(100)
  label: string;
}
