import {
  IsString,
  IsOptional,
  IsDateString,
  IsInt,
  IsArray,
  ArrayNotEmpty,
  ArrayUnique,
  isString,
  IsEnum,
} from 'class-validator';

export class CreateTaskDto {
  @IsString()
  title: string;

  @IsString()
  description: string;

  @IsEnum(['HAUT', 'MOYENNE', 'BAS'], {
    message: 'Valid role required',
  })
  periorite: 'HAUT' | 'MOYENNE' | 'BAS';

  @IsDateString()
  beginDate: string;

  @IsDateString()
  finishDate: string;

  @IsString()
  stateId: string;

  @IsString()
  managerId?: string;

  @IsOptional()
  @IsArray()
  @ArrayUnique()
  teamMembersIds?: string[];
}
