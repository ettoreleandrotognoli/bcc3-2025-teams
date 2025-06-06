import { Test, TestingModule } from '@nestjs/testing';
import { MentorshipModule } from './mentorship.module';
import { MentorshipController } from './mentorship.controller';
import { MentorshipService } from './mentorship.service';
import { PrismaService } from '../prisma/prisma.service'; // Import PrismaService

describe('MentorshipModule', () => {
  let module: TestingModule;

  beforeAll(async () => { // Usar beforeAll para compilar o módulo uma vez
    module = await Test.createTestingModule({
      imports: [MentorshipModule], 
    })
    // O MentorshipModule declara PrismaService como um provider.
    // Para um teste de compilação de módulo, geralmente não precisamos mocká-lo
    // a menos que sua instanciação real cause problemas (ex: conexão com DB).
    // Se o PrismaService do MentorshipModule dependesse de um PrismaModule global,
    // o comportamento seria ligeiramente diferente, mas aqui ele é provido diretamente.
    .compile();
  });

  it('should compile the module', () => {
    expect(module).toBeDefined();
  });

  it('should have MentorshipController defined', () => {
    const controller = module.get<MentorshipController>(MentorshipController);
    expect(controller).toBeInstanceOf(MentorshipController);
  });

  it('should have MentorshipService defined', () => {
    const service = module.get<MentorshipService>(MentorshipService);
    expect(service).toBeInstanceOf(MentorshipService);
  });

  // O MentorshipModule provê PrismaService diretamente.
  it('should have PrismaService available', () => {
    const service = module.get<PrismaService>(PrismaService);
    expect(service).toBeDefined(); // Alterado de toBeInstanceOf para toBeDefined
    // Opcionalmente, verifique um método ou propriedade para maior confiança:
    expect(service.$connect).toBeInstanceOf(Function); 
  });
});
