import {
  IsNotEmpty,
  IsOptional,
  IsString,
  IsInt,
  IsArray,
  ArrayNotEmpty,
  ArrayUnique,
} from 'class-validator';

export class CreateSubtaskDto {
  @IsString()
  @IsNotEmpty()
  title: string;

  @IsString()
  taskId: string;

  @IsString()
  managerId: string;

  @IsOptional()
  @IsArray()
  @ArrayUnique()
  teamMembersIds?: string[];
}