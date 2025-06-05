// Mentorize/api-project/src/auth/auth.controller.spec.ts
import { Test, TestingModule } from '@nestjs/testing';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { JwtAuthGuard } from './jwt-auth.guard';
import { JwtService } from '@nestjs/jwt'; // Importado para prover um mock, se necessário isoladamente

describe('AuthController', () => {
  let controller: AuthController;
  let authService: AuthService;

  const mockAuthService = {
    validateUser: jest.fn(),
    login: jest.fn(),
    register: jest.fn(),
  };

  const mockJwtAuthGuard = {
    canActivate: jest.fn(() => true), // Mock para sempre permitir acesso para testes de logout
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AuthController],
      providers: [
        { provide: AuthService, useValue: mockAuthService },
        // Se JwtService for usado diretamente no controller (não é o caso aqui),
        // precisaria ser mockado também.
        // { provide: JwtService, useValue: { sign: jest.fn() } }
      ],
    })
    // Sobrescreve o guard globalmente para este módulo de teste se necessário
    // ou use .overrideGuard(JwtAuthGuard).useValue(mockJwtAuthGuard) no controller específico.
    .overrideGuard(JwtAuthGuard)
    .useValue(mockJwtAuthGuard)
    .compile();

    controller = module.get<AuthController>(AuthController);
    authService = module.get<AuthService>(AuthService);
  });

   afterEach(() => {
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('login', () => {
    it('should return a token if user is validated', async () => {
      const user = { id: 1, email: 'test@example.com', name: 'Test' };
      const loginPayload = { email: 'test@example.com', password: 'password' };
      const token = { access_token: 'fake-token' };

      mockAuthService.validateUser.mockResolvedValue(user);
      mockAuthService.login.mockResolvedValue(token);

      const result = await controller.login(loginPayload);
      expect(result).toEqual(token);
      expect(mockAuthService.validateUser).toHaveBeenCalledWith(loginPayload.email, loginPayload.password);
      expect(mockAuthService.login).toHaveBeenCalledWith(user);
    });

    it('should return error if validation fails', async () => {
      const loginPayload = { email: 'test@example.com', password: 'wrongpassword' };
      mockAuthService.validateUser.mockResolvedValue(null);

      const result = await controller.login(loginPayload);
      expect(result).toEqual({ error: 'Invalid credentials' });
      expect(mockAuthService.login).not.toHaveBeenCalled();
    });
  });

  describe('register', () => {
    it('should register a new user', async () => {
      const registerPayload = { name: 'New User', email: 'new@example.com', password: 'password123' };
      const registeredUser = { id: 1, ...registerPayload };
      mockAuthService.register.mockResolvedValue(registeredUser);

      const result = await controller.register(registerPayload);
      expect(result).toEqual(registeredUser);
      expect(mockAuthService.register).toHaveBeenCalledWith(registerPayload);
    });
  });

  describe('logout', () => {
    it('should return a logout message', async () => {
      // O mockJwtAuthGuard já está configurado para permitir
      const req = {}; // Mock simples do objeto Request
      const result = controller.logout(req);
      expect(result).toEqual({ message: 'Logged out (frontend removes token)' });
    });
  });
});