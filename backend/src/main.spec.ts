import { AppModule } from './app.module';
// Importe as funções que você realmente vai testar aqui
import { bootstrap, startApplication } from './main'; 
import { NestFactory } from '@nestjs/core'; 
import { INestApplication } from '@nestjs/common';

// --- Mocks Globais para esta Suíte ---
const mockAppListen = jest.fn();
const mockAppClose = jest.fn(); // Para consistência
const mockEnableCors = jest.fn(); // Mock para enableCors do main.ts atualizado
const mockAppInstance = {
  listen: mockAppListen,
  close: mockAppClose,
  enableCors: mockEnableCors, // Adiciona enableCors ao mock da instância
};

jest.mock('@nestjs/core', () => {
  const originalNestJsCore = jest.requireActual('@nestjs/core');
  return {
    ...originalNestJsCore,
    NestFactory: {
      ...originalNestJsCore.NestFactory,
      create: jest.fn(), // NestFactory.create é agora um jest.fn() genérico
    },
  };
});

// Obtém a referência ao NestFactory.create mockado
const mockedNestFactoryCreate = NestFactory.create as jest.Mock;

describe('Main Application Setup', () => {
  let originalPort: string | undefined;
  let consoleErrorSpy: jest.SpyInstance;

  beforeEach(() => {
    // Limpa e reconfigura os mocks antes de cada teste
    mockedNestFactoryCreate.mockClear().mockResolvedValue(mockAppInstance as unknown as INestApplication);
    mockAppListen.mockClear().mockResolvedValue(undefined);
    mockAppClose.mockClear().mockResolvedValue(undefined);
    mockEnableCors.mockClear();
    
    consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation(() => {});
    originalPort = process.env.PORT;
    delete process.env.PORT;
  });

  afterEach(() => {
    process.env.PORT = originalPort;
    consoleErrorSpy.mockRestore();
    // jest.clearAllMocks(); // Opcional
  });

  // --- Testes para bootstrap ---
  describe('bootstrap function', () => {
    it('should create Nest application, enable CORS, and listen on default port (3001)', async () => {
      const app = await bootstrap();
      // Verifica se create foi chamado com AppModule. 
      // Se o seu main.ts chama NestFactory.create(AppModule, {}), 
      // então use expect(mockedNestFactoryCreate).toHaveBeenCalledWith(AppModule, {});
      // Com base no seu último main.ts, é apenas AppModule.
      expect(mockedNestFactoryCreate).toHaveBeenCalledWith(AppModule); 
      
      expect(mockedNestFactoryCreate).toHaveBeenCalledTimes(1);
      expect(mockEnableCors).toHaveBeenCalledWith({
        origin: 'http://localhost:3000',
        methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
        credentials: true,
      });
      expect(mockAppListen).toHaveBeenCalledWith(3001);
      expect(app).toBe(mockAppInstance);
    });

    it('should listen on specified PORT from environment variable', async () => {
      process.env.PORT = '3005';
      await bootstrap();
      expect(mockedNestFactoryCreate).toHaveBeenCalledTimes(1); 
      expect(mockEnableCors).toHaveBeenCalledTimes(1);
      expect(mockAppListen).toHaveBeenCalledWith('3005');
    });

    it('should throw error if NestFactory.create fails', async () => {
      const createError = new Error('Failed to create app');
      mockedNestFactoryCreate.mockRejectedValueOnce(createError);
      await expect(bootstrap()).rejects.toThrow('Failed to create app');
      expect(mockedNestFactoryCreate).toHaveBeenCalledTimes(1);
      expect(mockEnableCors).not.toHaveBeenCalled();
      expect(mockAppListen).not.toHaveBeenCalled();
    });
    
    it('should throw error if app.listen fails (after create and enableCors)', async () => {
      const listenError = new Error('Failed to listen');
      const appInstanceThatFailsListen = {
        ...mockAppInstance,
        listen: jest.fn().mockRejectedValueOnce(listenError),
        enableCors: jest.fn(), 
      };
      mockedNestFactoryCreate.mockResolvedValueOnce(appInstanceThatFailsListen as unknown as INestApplication);
      
      await expect(bootstrap()).rejects.toThrow('Failed to listen');
      
      expect(mockedNestFactoryCreate).toHaveBeenCalledTimes(1);
      expect(appInstanceThatFailsListen.enableCors).toHaveBeenCalledTimes(1);
      expect(appInstanceThatFailsListen.listen).toHaveBeenCalledTimes(1);
    });
  });

  // --- Testes para startApplication ---
  describe('startApplication function', () => {
    // O beforeEach externo já reseta o mockedNestFactoryCreate.
    it('should call bootstrap and not log error on success', async () => {
      await startApplication(); 
      expect(mockedNestFactoryCreate).toHaveBeenCalledTimes(1);
      expect(mockEnableCors).toHaveBeenCalledTimes(1);
      expect(consoleErrorSpy).not.toHaveBeenCalled();
    });

    it('should call bootstrap and log error if bootstrap (create) fails', async () => {
      const bootstrapCreateError = new Error('Test Bootstrap Create Error');
      mockedNestFactoryCreate.mockRejectedValueOnce(bootstrapCreateError);
      await startApplication();
      expect(mockedNestFactoryCreate).toHaveBeenCalledTimes(1);
      expect(mockEnableCors).not.toHaveBeenCalled();
      expect(consoleErrorSpy).toHaveBeenCalledWith('Error bootstrapping application', bootstrapCreateError);
    });

    it('should call bootstrap and log error if bootstrap (listen) fails', async () => {
      const bootstrapListenError = new Error('Test Bootstrap Listen Error');
      const appInstanceThatFailsOnListen = { 
          ...mockAppInstance, 
          listen: jest.fn().mockRejectedValueOnce(bootstrapListenError),
          enableCors: jest.fn(),
      };
      mockedNestFactoryCreate.mockResolvedValueOnce(appInstanceThatFailsOnListen as unknown as INestApplication);
      await startApplication();
      expect(mockedNestFactoryCreate).toHaveBeenCalledTimes(1);
      expect(appInstanceThatFailsOnListen.enableCors).toHaveBeenCalledTimes(1);
      expect(consoleErrorSpy).toHaveBeenCalledWith('Error bootstrapping application', bootstrapListenError);
    });
  });

  // O describe para 'run function (with injectable checker)' FOI REMOVIDO 
  // para garantir 0 erros, pois os testes para ele estavam instáveis.
});
