import { Test, TestingModule } from '@nestjs/testing';
import { UserController } from './user.controller';
import { UserService } from './user.service'; // Importe o UserService

// Crie um mock para o UserService
const mockUserService = {
  create: jest.fn(),
  findAll: jest.fn(),
  update: jest.fn(),
  delete: jest.fn(),
  // Adicione outros métodos que seu UserController usa, se houver
};

describe('UserController', () => {
  let controller: UserController;
  let userService: UserService; // Opcional, se você quiser espiar chamadas

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UserController],
      providers: [
        {
          provide: UserService,
          useValue: mockUserService, // Use o mock aqui
        },
      ],
    }).compile();

    controller = module.get<UserController>(UserController);
    userService = module.get<UserService>(UserService); // Opcional
  });

  afterEach(() => {
    jest.clearAllMocks(); // Limpa os mocks após cada teste
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  // Exemplo de teste para o método create
  describe('create', () => {
    it('should create a user', async () => {
      const userData = { name: 'Test User', email: 'test@example.com', password: 'password' };
      const expectedUser = { id: 1, ...userData };
      
      mockUserService.create.mockResolvedValue(expectedUser); // Configure o mock para retornar o usuário esperado

      const result = await controller.create(userData);
      expect(result).toEqual(expectedUser);
      expect(mockUserService.create).toHaveBeenCalledWith(userData);
    });
  });

  // Exemplo de teste para o método findAll
  describe('findAll', () => {
    it('should return an array of users', async () => {
      const usersArray = [{ id: 1, name: 'Test User', email: 'test@example.com' }];
      mockUserService.findAll.mockResolvedValue(usersArray);

      const result = await controller.findAll();
      expect(result).toEqual(usersArray);
      expect(mockUserService.findAll).toHaveBeenCalled();
    });
  });

  // Exemplo de teste para o método update
  describe('update', () => {
    it('should update a user', async () => {
      const userId = '1';
      const updateData = { name: 'Updated Name' };
      const updatedUser = { id: 1, name: 'Updated Name', email: 'test@example.com' };
      mockUserService.update.mockResolvedValue(updatedUser);

      const result = await controller.update(userId, updateData);
      expect(result).toEqual(updatedUser);
      expect(mockUserService.update).toHaveBeenCalledWith(+userId, updateData);
    });
  });

  // Exemplo de teste para o método delete
  describe('delete', () => {
    it('should delete a user', async () => {
      const userId = '1';
      const deletedUserResponse = { id: 1, message: 'Deleted successfully' }; // Exemplo de resposta
      mockUserService.delete.mockResolvedValue(deletedUserResponse);

      const result = await controller.delete(userId);
      expect(result).toEqual(deletedUserResponse);
      expect(mockUserService.delete).toHaveBeenCalledWith(+userId);
    });
  });
});