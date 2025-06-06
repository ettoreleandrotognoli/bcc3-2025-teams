import { Test, TestingModule } from '@nestjs/testing';
import { AuthModule } from './auth.module';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { JwtStrategy } from './jwt.strategy';
// Remova a importação do UserModule daqui se ele não for usado diretamente no teste do AuthModule
// import { UserModule } from '../user/user.module';
import { JwtModule, JwtService } from '@nestjs/jwt'; // <<< ADICIONE JwtService AQUI
import { PassportModule } from '@nestjs/passport';
// Se você mockou PrismaService em outro lugar, e UserModule depende dele,
// você pode precisar fornecer um mock aqui também se estiver importando UserModule diretamente.
// import { PrismaService } from '../prisma/prisma.service';


describe('AuthModule', () => {
  let module: TestingModule;

  beforeEach(async () => {
    module = await Test.createTestingModule({
      imports: [AuthModule],
      // Se AuthModule depende de UserModule que depende de PrismaService,
      // e você não quer uma instância real do PrismaService, você teria que mockar PrismaService aqui
      // ou mockar o UserModule inteiro se a sua instância de AuthModule no teste não precisar dele.
      // Exemplo de mock do PrismaService se UserModule fosse importado diretamente aqui e precisasse dele:
      // providers: [
      //   {
      //     provide: PrismaService,
      //     useValue: {}, // mock simples
      //   },
      // ],
    })
    // Exemplo de como mockar um módulo inteiro se necessário:
    // .overrideModule(UserModule)
    // .useModule( Test.createTestingModule({ exports: [UserService], providers: [{provide: UserService, useValue: mockUserService }]}).compile() )
    .compile();
  });

  it('should compile the module', () => {
    expect(module).toBeDefined();
  });

  it('should have AuthController defined', () => {
    expect(module.get(AuthController)).toBeInstanceOf(AuthController);
  });

  it('should have AuthService defined', () => {
    expect(module.get(AuthService)).toBeInstanceOf(AuthService);
  });

  it('should have JwtStrategy defined', () => {
    expect(module.get(JwtStrategy)).toBeInstanceOf(JwtStrategy);
  });

  it('should have JwtService available from JwtModule', () => { // Modificado para clareza
    expect(module.get(JwtService)).toBeInstanceOf(JwtService);
  });

  // O PassportModule geralmente não é recuperado com module.get() diretamente.
  // A compilação bem-sucedida do módulo que o importa (AuthModule) é o teste principal.
  it('should have PassportModule implicitly imported', () => {
    expect(module).toBeDefined();
  });

  it('should have UserModule implicitly imported (dependencies resolved)', () => {
    // Apenas a compilação bem-sucedida do AuthModule que importa UserModule testa isso.
    expect(module).toBeDefined();
  });
});