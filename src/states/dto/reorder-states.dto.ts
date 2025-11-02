import { IsArray, IsString } from 'class-validator';

export class ReorderStatesDto {
  @IsArray()
  @IsString({ each: true })
  statesIds: string[];
}