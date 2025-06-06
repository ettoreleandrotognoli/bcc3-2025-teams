import { Test, TestingModule } from '@nestjs/testing';
import { MentorshipController } from './mentorship.controller';
import { MentorshipService } from './mentorship.service';
import { CreateMentorshipDto } from './dto/create-mentorship.dto';
import { ConfirmMentorshipDto } from './dto/confirm-mentorship.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard'; // Para mockar/override

// Mock para o MentorshipService
const mockMentorshipService = {
  create: jest.fn(),
  findAll: jest.fn(),
  remove: jest.fn(),
  confirm: jest.fn(),
};

// Mock simples para o JwtAuthGuard
const mockJwtAuthGuard = {
  canActivate: jest.fn(() => true), // Sempre permite acesso nos testes unitários do controller
};

describe('MentorshipController', () => {
  let controller: MentorshipController;
  let service: MentorshipService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [MentorshipController],
      providers: [
        {
          provide: MentorshipService,
          useValue: mockMentorshipService,
        },
      ],
    })
    // Sobrescreve o JwtAuthGuard para não depender da lógica de autenticação real
    .overrideGuard(JwtAuthGuard)
    .useValue(mockJwtAuthGuard)
    .compile();

    controller = module.get<MentorshipController>(MentorshipController);
    service = module.get<MentorshipService>(MentorshipService); // Para acesso aos mocks
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('create', () => {
    it('should create a mentorship request', async () => {
      const dto: CreateMentorshipDto = { description: 'Help with TypeScript', duration: 30, mentorId: 1 };
      const mockUser = { userId: 2 }; // Simula req.user
      const mockRequest = { user: mockUser };
      const expectedResult = { id: 1, ...dto, studentId: mockUser.userId };

      mockMentorshipService.create.mockResolvedValue(expectedResult);

      const result = await controller.create(dto, mockRequest);
      
      expect(result).toEqual(expectedResult);
      expect(mockMentorshipService.create).toHaveBeenCalledWith(dto, mockUser.userId);
      expect(mockMentorshipService.create).toHaveBeenCalledTimes(1);
    });
  });

  describe('findAll', () => {
    it('should return all mentorship requests', async () => {
      const expectedResult = [{ id: 1, description: 'Req 1' }];
      mockMentorshipService.findAll.mockResolvedValue(expectedResult);

      const result = await controller.findAll();

      expect(result).toEqual(expectedResult);
      expect(mockMentorshipService.findAll).toHaveBeenCalledTimes(1);
    });
  });

  describe('remove', () => {
    it('should remove a mentorship request', async () => {
      const mentorshipId = '1';
      const mockUser = { userId: 2 };
      const mockRequest = { user: mockUser };
      const expectedResult = { count: 1 };

      mockMentorshipService.remove.mockResolvedValue(expectedResult);

      const result = await controller.remove(mentorshipId, mockRequest);

      expect(result).toEqual(expectedResult);
      expect(mockMentorshipService.remove).toHaveBeenCalledWith(+mentorshipId, mockUser.userId);
      expect(mockMentorshipService.remove).toHaveBeenCalledTimes(1);
    });
  });

  describe('confirm', () => {
    it('should confirm a mentorship request', async () => {
      const mentorshipId = '1';
      const dto: ConfirmMentorshipDto = { isConfirmed: true };
      const mockUser = { userId: 2 }; // O ID do mentor que está confirmando
      const mockRequest = { user: mockUser };
      const expectedResult = { id: 1, isConfirmed: true };

      mockMentorshipService.confirm.mockResolvedValue(expectedResult);

      const result = await controller.confirm(mentorshipId, dto, mockRequest);

      expect(result).toEqual(expectedResult);
      expect(mockMentorshipService.confirm).toHaveBeenCalledWith(+mentorshipId, mockUser.userId, dto.isConfirmed);
      expect(mockMentorshipService.confirm).toHaveBeenCalledTimes(1);
    });
  });
});
