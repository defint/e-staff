import {
  IsNotEmpty,
  IsNumber,
  IsNumberString,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';

export class EmployeeDto {
  @IsNotEmpty()
  @IsString()
  @MaxLength(200)
  name: string;

  @IsNotEmpty()
  @IsNumber()
  age: number;

  @IsNotEmpty()
  @MaxLength(20)
  @MinLength(5)
  @IsNumberString()
  phone: string;

  @IsNotEmpty()
  @IsNumber()
  officeId: number;
}
