// auth.module.spec.ts
import { Test, TestingModule } from '@nestjs/testing';
import { AuthModule } from './auth.module';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { JwtStrategy } from './jwt.strategy';
import { PrismaService } from '../prisma/prisma.service'; // Importe o PrismaService real
import { JwtService } from '@nestjs/jwt'; // JwtService é geralmente parte do JwtModule
import { UserService } from '../user/user.service';

// Crie um mock para o PrismaService
const mockPrismaService = {
  // Mocke os métodos do prisma que poderiam ser chamados indiretamente
  // durante a inicialização do módulo ou resolução de dependências.
  // Frequentemente, para testes de módulo, um objeto vazio ou com poucas
  // funções mockadas é suficiente se você não estiver testando a lógica do DB.
  user: {
    findUnique: jest.fn(),
    create: jest.fn(),
    // ... outros métodos que UserModule/UserService possa usar
  },
  // ... outros modelos do Prisma se necessário
};

describe('AuthModule', () => {
  let module: TestingModule;

  beforeEach(async () => {
    module = await Test.createTestingModule({
      imports: [AuthModule], // Importe o AuthModule que você quer testar
    })
    .overrideProvider(PrismaService) // Sobrescreva o PrismaService real
    .useValue(mockPrismaService)    // Com o seu mock
    .overrideProvider(UserService) // Você também pode precisar mockar outros serviços
    .useValue({
        findByEmail: jest.fn(),
        create: jest.fn(),
    })
    .overrideProvider(JwtService) // Se JwtService não for mockado pelo JwtModule importado
    .useValue({
        sign: jest.fn(),
    })
    .compile();
  });

  it('should compile the module', () => {
    expect(module).toBeDefined();
  });

  it('should have AuthController defined', () => {
    expect(module.get<AuthController>(AuthController)).toBeDefined();
  });

  it('should have AuthService defined', () => {
    expect(module.get<AuthService>(AuthService)).toBeDefined();
  });

  it('should have JwtStrategy defined', () => {
    expect(module.get<JwtStrategy>(JwtStrategy)).toBeDefined();
  });
});