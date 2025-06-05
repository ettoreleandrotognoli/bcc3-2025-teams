import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateMentorshipDto } from './dto/create-mentorship.dto';

@Injectable()
export class MentorshipService {
  constructor(private prisma: PrismaService) {}

  create(dto: CreateMentorshipDto, studentId: number) {
    return this.prisma.mentorshipRequest.create({
      data: {
        description: dto.description,
        duration: dto.duration,
        mentorId: dto.mentorId,
        studentId,
      },
    });
  }

  findAll() {
    return this.prisma.mentorshipRequest.findMany({
      include: {
        mentor: {
          select: { id: true, email: true },
        },
        student: {
          select: { id: true, email: true },
        },
      },
    });
  }

  remove(id: number, userId: number) {
    return this.prisma.mentorshipRequest.deleteMany({
      where: {
        id,
        studentId: userId, // apenas o dono pode deletar
      },
    });
  }

  async confirm(id: number, mentorId: number, isConfirmed: boolean) {
    const mentorship = await this.prisma.mentorshipRequest.findUnique({
      where: { id },
    });

    if (!mentorship || mentorship.mentorId !== mentorId) {
      throw new Error('Mentorship not found or unauthorized');
    }

    return this.prisma.mentorshipRequest.update({
      where: { id },
      data: {
        isConfirmed,
      },
    });
  }

}
