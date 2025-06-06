// Mentorize/api-project/src/auth/auth.service.spec.ts
import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from './auth.service';
import { UserService } from '../user/user.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

// Mock bcrypt.compare
jest.mock('bcrypt', () => ({
  ...jest.requireActual('bcrypt'), // Importa o módulo real
  compare: jest.fn(), // Mocka apenas a função compare
  hash: jest.fn(),
}));

describe('AuthService', () => {
  let service: AuthService;
  let userService: UserService;
  let jwtService: JwtService;

  const mockUserService = {
    findByEmail: jest.fn(),
    create: jest.fn(),
  };

  const mockJwtService = {
    sign: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        { provide: UserService, useValue: mockUserService },
        { provide: JwtService, useValue: mockJwtService },
      ],
    }).compile();

    service = module.get<AuthService>(AuthService);
    userService = module.get<UserService>(UserService);
    jwtService = module.get<JwtService>(JwtService);
  });

   afterEach(() => {
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('validateUser', () => {
    it('should return user if credentials are valid', async () => {
      const user = { id: 1, email: 'test@example.com', password: 'hashedPassword', name: 'Test' };
      mockUserService.findByEmail.mockResolvedValue(user);
      (bcrypt.compare as jest.Mock).mockResolvedValue(true);

      const { password, ...expectedResult } = user;
      const result = await service.validateUser('test@example.com', 'password');
      expect(result).toEqual(expectedResult);
    });

    it('should return null if user not found', async () => {
      mockUserService.findByEmail.mockResolvedValue(null);
      const result = await service.validateUser('unknown@example.com', 'password');
      expect(result).toBeNull();
    });

    it('should return null if password does not match', async () => {
      const user = { id: 1, email: 'test@example.com', password: 'hashedPassword' };
      mockUserService.findByEmail.mockResolvedValue(user);
      (bcrypt.compare as jest.Mock).mockResolvedValue(false); // Senha não confere

      const result = await service.validateUser('test@example.com', 'wrongpassword');
      expect(result).toBeNull();
    });
  });

  describe('login', () => {
    // Adicione async aqui e await na chamada do service.login
    it('should return an access token', async () => { 
      const user = { email: 'test@example.com', id: 1 };
      const token = 'fake-jwt-token';
      // Se mockJwtService.sign for uma promise, mocke como mockResolvedValue
      // Se for síncrono e você quiser simular um Promise (como parece ser o caso pelo erro),
      // você pode fazer mockJwtService.sign.mockReturnValue(Promise.resolve(token));
      // Mas pelo seu AuthService, o jwtService.sign é chamado diretamente, então o mock deve retornar o valor direto.
      mockJwtService.sign.mockReturnValue(token); // Mantendo como está, mas o método login é async

      // Adicione await aqui
      const result = await service.login(user); 
      expect(result).toEqual({ access_token: token });
      expect(mockJwtService.sign).toHaveBeenCalledWith({ email: user.email, sub: user.id });
    });
  });

  describe('register', () => {
    it('should create and return a new user', async () => {
      const userData = { email: 'new@example.com', password: 'password123', name: 'New User' };
      const hashedPassword = 'hashedNewPassword';
      const createdUser = { id: 2, ...userData, password: hashedPassword };

      (bcrypt.hash as jest.Mock).mockResolvedValue(hashedPassword);
      mockUserService.create.mockResolvedValue(createdUser);

      const result = await service.register(userData);
      expect(bcrypt.hash).toHaveBeenCalledWith('password123', 10);
      expect(mockUserService.create).toHaveBeenCalledWith({ ...userData, password: hashedPassword });
      expect(result).toEqual(createdUser);
    });
  });
});