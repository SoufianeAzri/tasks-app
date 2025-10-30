import { IsBoolean } from 'class-validator';

export class ChangeSubtaskStatusDto {
  @IsBoolean()
  status: boolean;
}