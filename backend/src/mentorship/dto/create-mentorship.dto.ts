import { IsInt, IsNotEmpty, IsString } from 'class-validator';

export class CreateMentorshipDto {
  @IsString()
  @IsNotEmpty()
  description: string;

  @IsInt()
  duration: number;

  @IsInt()
  mentorId: number;
}
