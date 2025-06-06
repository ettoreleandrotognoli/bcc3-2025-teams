import { Test, TestingModule } from '@nestjs/testing';
import { JwtStrategy } from './jwt.strategy';
import { ExtractJwt } from 'passport-jwt';
import { UnauthorizedException } from '@nestjs/common'; // Importe se for usar

// Mock do ExtractJwt.fromAuthHeaderAsBearerToken() para o construtor
jest.mock('passport-jwt', () => {
  const originalModule = jest.requireActual('passport-jwt');
  return {
    ...originalModule,
    ExtractJwt: {
      ...originalModule.ExtractJwt,
      fromAuthHeaderAsBearerToken: jest.fn(() => 'mockedTokenExtractor'), // Mocka o retorno
    },
  };
});


describe('JwtStrategy', () => {
  let strategy: JwtStrategy;

  beforeEach(async () => {
    // Nota: Como não há dependências injetáveis no construtor do JwtStrategy,
    // podemos instanciá-lo diretamente ou usar o Test.createTestingModule.
    // Usar o TestingModule é mais consistente com outros testes NestJS.
    const module: TestingModule = await Test.createTestingModule({
      providers: [JwtStrategy],
    }).compile();

    strategy = module.get<JwtStrategy>(JwtStrategy);
  });

  it('should be defined', () => {
    expect(strategy).toBeDefined();
  });

  describe('constructor', () => {
    it('should call super with correct options', () => {
      // A forma como o jest.mock foi feita acima já testa implicitamente
      // que fromAuthHeaderAsBearerToken é chamado.
      // Para verificar os parâmetros exatos passados para super(),
      // precisaríamos de uma forma de espionar o construtor da classe pai (Strategy),
      // o que é complexo. A verificação de que 'mockedTokenExtractor' foi usado
      // pode ser feita se o PassportStrategy permitir acesso a essas opções,
      // ou se confiarmos que o construtor do NestJS o chamou corretamente.
      // Neste caso, como o construtor do JwtStrategy apenas chama super(),
      // a cobertura será obtida pela simples instanciação.
      expect(ExtractJwt.fromAuthHeaderAsBearerToken).toHaveBeenCalled();
    });
  });

  describe('validate', () => {
    it('should return user id and email from payload', async () => {
      const payload = { sub: '123', email: 'test@example.com', other: 'data' };
      const expected = { userId: '123', email: 'test@example.com' };

      const result = await strategy.validate(payload);
      expect(result).toEqual(expected);
    });

    it('should handle payload without sub or email (if applicable, though current impl. assumes they exist)', async () => {
      const payload = { other: 'data' }; // Payload sem sub e email
      // A implementação atual retornaria { userId: undefined, email: undefined }
      const expected = { userId: undefined, email: undefined };
      const result = await strategy.validate(payload);
      expect(result).toEqual(expected);
    });

    // Você poderia adicionar um teste para o caso de payload nulo ou inválido,
    // dependendo de como o Passport lida com isso antes de chamar o validate,
    // ou como você quer que sua estratégia se comporte (ex: lançar UnauthorizedException).
    // Ex:
    // it('should throw an UnauthorizedException if payload is invalid', async () => {
    //   await expect(strategy.validate(null)).rejects.toThrow(UnauthorizedException);
    // });
  });
});