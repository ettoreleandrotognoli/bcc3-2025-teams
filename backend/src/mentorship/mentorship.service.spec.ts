import { Test, TestingModule } from '@nestjs/testing';
import { MentorshipService } from './mentorship.service';
import { PrismaService } from '../prisma/prisma.service';
import { CreateMentorshipDto } from './dto/create-mentorship.dto';

// Mock completo para o PrismaService
const mockPrismaService = {
  mentorshipRequest: {
    create: jest.fn(),
    findMany: jest.fn(),
    deleteMany: jest.fn(),
    findUnique: jest.fn(),
    update: jest.fn(),
  },
  // Adicione outros modelos se o MentorshipService os utilizar
};

describe('MentorshipService', () => {
  let service: MentorshipService;
  let prisma: PrismaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        MentorshipService,
        {
          provide: PrismaService,
          useValue: mockPrismaService,
        },
      ],
    }).compile();

    service = module.get<MentorshipService>(MentorshipService);
    prisma = module.get<PrismaService>(PrismaService); // Para acesso aos mocks
  });

  afterEach(() => {
    jest.clearAllMocks(); // Limpa todos os mocks após cada teste
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('create', () => {
    it('should create a mentorship request', async () => {
      const dto: CreateMentorshipDto = { description: 'Need help with NestJS', duration: 60, mentorId: 1 };
      const studentId = 2;
      const expectedRequest = { 
        id: 1, 
        ...dto, 
        studentId, 
        isConfirmed: null, // ou false, dependendo do seu schema default
        createdAt: new Date(), 
        updatedAt: new Date() 
      };
      
      mockPrismaService.mentorshipRequest.create.mockResolvedValue(expectedRequest);

      const result = await service.create(dto, studentId);
      
      expect(result).toEqual(expectedRequest);
      expect(mockPrismaService.mentorshipRequest.create).toHaveBeenCalledWith({
        data: {
          description: dto.description,
          duration: dto.duration,
          mentorId: dto.mentorId,
          studentId,
        },
      });
      expect(mockPrismaService.mentorshipRequest.create).toHaveBeenCalledTimes(1);
    });
  });

  describe('findAll', () => {
    it('should return all mentorship requests with mentor and student details', async () => {
      const mockRequests = [
        { id: 1, description: 'Req 1', mentorId: 1, studentId: 2, mentor: { id: 1, email: 'mentor@test.com'}, student: {id: 2, email: 'student@test.com'} },
        { id: 2, description: 'Req 2', mentorId: 3, studentId: 4, mentor: { id: 3, email: 'mentor2@test.com'}, student: {id: 4, email: 'student2@test.com'} },
      ];
      mockPrismaService.mentorshipRequest.findMany.mockResolvedValue(mockRequests);

      const result = await service.findAll();

      expect(result).toEqual(mockRequests);
      expect(mockPrismaService.mentorshipRequest.findMany).toHaveBeenCalledWith({
        include: {
          mentor: { select: { id: true, email: true } },
          student: { select: { id: true, email: true } },
        },
      });
      expect(mockPrismaService.mentorshipRequest.findMany).toHaveBeenCalledTimes(1);
    });
  });

  describe('remove', () => {
    it('should delete a mentorship request if user is the student', async () => {
      const mentorshipId = 1;
      const studentId = 2;
      const deleteResult = { count: 1 }; // deleteMany retorna um objeto com count
      mockPrismaService.mentorshipRequest.deleteMany.mockResolvedValue(deleteResult);

      const result = await service.remove(mentorshipId, studentId);

      expect(result).toEqual(deleteResult);
      expect(mockPrismaService.mentorshipRequest.deleteMany).toHaveBeenCalledWith({
        where: {
          id: mentorshipId,
          studentId: studentId,
        },
      });
      expect(mockPrismaService.mentorshipRequest.deleteMany).toHaveBeenCalledTimes(1);
    });

    it('should return count 0 if mentorship request not found or user is not the student', async () => {
        const mentorshipId = 1;
        const studentId = 99; // Outro usuário
        const deleteResult = { count: 0 };
        mockPrismaService.mentorshipRequest.deleteMany.mockResolvedValue(deleteResult);
  
        const result = await service.remove(mentorshipId, studentId);
  
        expect(result).toEqual(deleteResult);
        expect(mockPrismaService.mentorshipRequest.deleteMany).toHaveBeenCalledWith({
          where: {
            id: mentorshipId,
            studentId: studentId,
          },
        });
        expect(mockPrismaService.mentorshipRequest.deleteMany).toHaveBeenCalledTimes(1);
      });
  });

  describe('confirm', () => {
    const mentorshipId = 1;
    const mentorId = 2;
    const mockMentorshipRequest = { id: mentorshipId, mentorId: mentorId, description: 'Test' };

    it('should confirm a mentorship request if mentor is authorized', async () => {
      const updatedMentorship = { ...mockMentorshipRequest, isConfirmed: true };
      mockPrismaService.mentorshipRequest.findUnique.mockResolvedValue(mockMentorshipRequest);
      mockPrismaService.mentorshipRequest.update.mockResolvedValue(updatedMentorship);

      const result = await service.confirm(mentorshipId, mentorId, true);

      expect(result).toEqual(updatedMentorship);
      expect(mockPrismaService.mentorshipRequest.findUnique).toHaveBeenCalledWith({ where: { id: mentorshipId } });
      expect(mockPrismaService.mentorshipRequest.update).toHaveBeenCalledWith({
        where: { id: mentorshipId },
        data: { isConfirmed: true },
      });
      expect(mockPrismaService.mentorshipRequest.update).toHaveBeenCalledTimes(1);
    });
    
    it('should unconfirm a mentorship request if mentor is authorized', async () => {
        const updatedMentorship = { ...mockMentorshipRequest, isConfirmed: false };
        mockPrismaService.mentorshipRequest.findUnique.mockResolvedValue(mockMentorshipRequest);
        mockPrismaService.mentorshipRequest.update.mockResolvedValue(updatedMentorship);
  
        const result = await service.confirm(mentorshipId, mentorId, false);
  
        expect(result).toEqual(updatedMentorship);
        expect(mockPrismaService.mentorshipRequest.update).toHaveBeenCalledWith({
          where: { id: mentorshipId },
          data: { isConfirmed: false },
        });
      });

    it('should throw an error if mentorship request not found', async () => {
      mockPrismaService.mentorshipRequest.findUnique.mockResolvedValue(null);

      await expect(service.confirm(mentorshipId, mentorId, true))
        .rejects.toThrow('Mentorship not found or unauthorized');
      expect(mockPrismaService.mentorshipRequest.update).not.toHaveBeenCalled();
    });

    it('should throw an error if mentor is not authorized (different mentorId)', async () => {
      const unauthorizedMentorId = 99;
      mockPrismaService.mentorshipRequest.findUnique.mockResolvedValue(mockMentorshipRequest); // Mentorship existe, mas pertence ao mentorId 2

      await expect(service.confirm(mentorshipId, unauthorizedMentorId, true))
        .rejects.toThrow('Mentorship not found or unauthorized');
      expect(mockPrismaService.mentorshipRequest.update).not.toHaveBeenCalled();
    });
  });
});
