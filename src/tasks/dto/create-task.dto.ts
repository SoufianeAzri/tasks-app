import {
  IsString,
  IsOptional,
  IsDateString,
  IsInt,
  IsArray,
  ArrayNotEmpty,
  ArrayUnique,
} from 'class-validator';

export class CreateTaskDto {
  @IsString()
  title: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsOptional()
  @IsDateString()
  beginDate?: string;

  @IsOptional()
  @IsDateString()
  finishDate?: string;

  @IsOptional()
  @IsInt()
  stateId?: string;

  @IsOptional()
  @IsInt()
  managerId?: string;

  @IsOptional()
  @IsArray()
  @ArrayUnique()
  teamMembersIds?: string[];
}
