import { ApiProperty } from "@nestjs/swagger";
import { Transform } from "class-transformer";
import { IsEmail, IsString, MinLength } from "class-validator";

export class RegisterDto {
  @IsString()
  @ApiProperty({
    type: String,
    description: 'User name: this is not optional property',
  })
  name: string;

  @IsEmail()
  @ApiProperty({
    type: String,
    description: 'Email: this is not optional property',
  })
  email: string;

  @IsString()
  @MinLength(8)
  @Transform(({ value }) => value.trim())
  @ApiProperty({
    type: String,
    description: 'Password: this is not optional property',
  })
  password: string;
}