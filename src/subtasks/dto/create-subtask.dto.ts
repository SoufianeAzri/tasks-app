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

  @IsInt()
  taskId: string;

  @IsInt()
  managerId: string;

  @IsOptional()
  @IsArray()
  @ArrayUnique()
  teamMembersIds?: string[];
}