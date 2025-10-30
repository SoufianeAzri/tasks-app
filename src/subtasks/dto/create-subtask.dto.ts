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
  taskId: number;

  @IsInt()
  managerId: number;

  @IsOptional()
  @IsArray()
  @ArrayUnique()
  teamMembersIds?: number[];
}