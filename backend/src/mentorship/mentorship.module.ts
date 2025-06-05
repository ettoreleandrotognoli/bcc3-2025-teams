import { Module } from '@nestjs/common';
import { MentorshipService } from './mentorship.service';
import { MentorshipController } from './mentorship.controller';
import { PrismaService } from '../prisma/prisma.service';

@Module({
  controllers: [MentorshipController],
  providers: [MentorshipService, PrismaService],
})
export class MentorshipModule {}
