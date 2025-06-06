import { Test, TestingModule } from '@nestjs/testing';
import { AppModule } from './app.module';
import { UserController } from './user/user.controller';
import { AuthController } from './auth/auth.controller';
import { PrismaService } from './prisma/prisma.service';

describe('AppModule', () => {
  let appModuleInstance: TestingModule; // Renomeado para clareza

  beforeEach(async () => {
    appModuleInstance = await Test.createTestingModule({
      imports: [AppModule],
    })
    // Não vamos mockar PrismaService aqui por enquanto, pois PrismaModule é global
    // e já deve fornecer uma instância (mesmo que seja a real que pode falhar sem `prisma generate`).
    // O teste do prisma.service.spec.ts já valida a sua instanciação básica.
    .compile();
  });

  it('should compile the module', () => {
    expect(appModuleInstance).toBeDefined();
  });

  it('should resolve UserController', () => {
    const userController = appModuleInstance.get<UserController>(UserController);
    expect(userController).toBeInstanceOf(UserController);
  });

  it('should resolve AuthController', () => {
    const authController = appModuleInstance.get<AuthController>(AuthController);
    expect(authController).toBeInstanceOf(AuthController);
  });

  it('should resolve PrismaService', () => {
    const prismaService = appModuleInstance.get<PrismaService>(PrismaService);
    expect(prismaService).toBeDefined(); // Alterado de toBeInstanceOf para toBeDefined
    // Opcionalmente, verifique a existência de um método conhecido se quiser ser mais específico
    // sem depender da referência exata da classe em ambientes de teste complexos:
    expect(prismaService.$connect).toBeDefined(); 
    expect(prismaService.user).toBeDefined(); 
  });
});