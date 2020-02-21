import {
  IsMobilePhone,
  IsNotEmpty,
  IsNumberString,
  IsString,
  MaxLength,
} from 'class-validator';

export class EmployeeDto {
  @IsNotEmpty()
  @IsString()
  @MaxLength(200)
  name: string;

  @IsNotEmpty()
  @IsNumberString()
  age: number;

  @IsNotEmpty()
  @IsString()
  @MaxLength(20)
  @IsMobilePhone('any')
  phone: string;

  @IsNotEmpty()
  @IsNumberString()
  officeId: number;
}
