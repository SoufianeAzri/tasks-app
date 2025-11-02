import { IsString, IsNotEmpty, Matches } from 'class-validator';

export class CreateStateDto {
  @IsString()
  @IsNotEmpty({ message: 'State name is required' })
  name: string;

  @IsString()
  @IsNotEmpty({ message: 'State color is required' })
  // Optional: validate HEX color format (#RRGGBB)
  @Matches(/^#([0-9A-Fa-f]{6})$/, {
    message: 'Color must be a valid HEX code (e.g., #FF5733)',
  })
  color: string;
}