// Mentorize/api-project/src/user/user.service.spec.ts
import { Test, TestingModule } from '@nestjs/testing';
import { UserService } from './user.service';
import { PrismaService } from '../prisma/prisma.service';

// Mock do PrismaClient para os métodos usados pelo UserService
const db = {
  user: {
    create: jest.fn(),
    findMany: jest.fn(),
    findUnique: jest.fn(),
    update: jest.fn(),
    delete: jest.fn(),
  },
  // Adicione outros modelos se o UserService os utilizar
};

describe('UserService', () => {
  let service: UserService;
  let prisma: PrismaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UserService,
        {
          provide: PrismaService,
          useValue: db, // Usa o mock
        },
      ],
    }).compile();

    service = module.get<UserService>(UserService);
    prisma = module.get<PrismaService>(PrismaService);
  });

  afterEach(() => {
    jest.clearAllMocks(); // Limpa os mocks após cada teste
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('create', () => {
    it('should create a user', async () => {
      const userData = { email: 'test@example.com', name: 'Test User', password: 'password' };
      const expectedUser = { id: 1, ...userData };
      db.user.create.mockResolvedValue(expectedUser);

      const result = await service.create(userData);
      expect(result).toEqual(expectedUser);
      expect(db.user.create).toHaveBeenCalledWith({ data: userData });
    });
  });

  describe('findAll', () => {
    it('should return an array of users', async () => {
      const usersArray = [{ id: 1, email: 'test1@example.com', name: 'Test1', password: 'p1' }];
      db.user.findMany.mockResolvedValue(usersArray);

      const result = await service.findAll();
      expect(result).toEqual(usersArray);
      expect(db.user.findMany).toHaveBeenCalled();
    });
  });

  describe('update', () => {
    it('should update a user', async () => {
      const userId = 1;
      const updateData = { name: 'Updated Name' };
      const updatedUser = { id: userId, email: 'test@example.com', name: 'Updated Name', password: 'password' };
      db.user.update.mockResolvedValue(updatedUser);

      const result = await service.update(userId, updateData);
      expect(result).toEqual(updatedUser);
      expect(db.user.update).toHaveBeenCalledWith({ where: { id: userId }, data: updateData });
    });
  });

  describe('delete', () => {
    it('should delete a user', async () => {
      const userId = 1;
      const deletedUser = { id: userId, email: 'test@example.com', name: 'Test', password: 'p' };
      db.user.delete.mockResolvedValue(deletedUser);

      const result = await service.delete(userId);
      expect(result).toEqual(deletedUser);
      expect(db.user.delete).toHaveBeenCalledWith({ where: { id: userId } });
    });
  });

  describe('findByEmail', () => {
    it('should find a user by email', async () => {
      const email = 'test@example.com';
      const user = { id: 1, email, name: 'Test User', password: 'password' };
      db.user.findUnique.mockResolvedValue(user);

      const result = await service.findByEmail(email);
      expect(result).toEqual(user);
      expect(db.user.findUnique).toHaveBeenCalledWith({ where: { email } });
    });

    it('should return null if user not found by email', async () => {
      db.user.findUnique.mockResolvedValue(null);
      const result = await service.findByEmail('unknown@example.com');
      expect(result).toBeNull();
    });
  });
});