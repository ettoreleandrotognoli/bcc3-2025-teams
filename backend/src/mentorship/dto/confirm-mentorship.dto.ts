import { IsBoolean } from 'class-validator';

export class ConfirmMentorshipDto {
  @IsBoolean()
  isConfirmed: boolean;
}