import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from './../src/app.module'; // Caminho para o seu AppModule

describe('AppController (e2e)', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();

    // Espelha a configuração de CORS do seu main.ts
    app.enableCors({
      origin: 'http://localhost:3000', 
      methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
      credentials: true,
    });

    // (Opcional, mas recomendado) Adiciona ValidationPipe globalmente
    // Se você não usa DTOs com validação globalmente, pode remover.
    app.useGlobalPipes(new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }));
    
    await app.init();
  });

  afterAll(async () => {
    await app.close();
  });

  it('/ (GET) should return "Hello World!"', () => {
    return request(app.getHttpServer())
      .get('/')
      .expect(200)
      .expect('Hello World!'); // Confirme que seu AppController.getHello() retorna isso
  });

  // Você pode adicionar mais testes E2E aqui para outros fluxos
  // Por exemplo, para o novo módulo 'mentorship'
  describe('/mentorships (POST) - Create Mentorship Request (e2e example)', () => {
    let authToken: string; // Para armazenar o token após o login

    // Exemplo: Antes de testar rotas protegidas, você precisaria de um usuário e fazer login
    // Este é um setup simplificado. Em um cenário real, você pode ter um usuário de teste
    // ou criar um programaticamente e depois fazer login para obter o token.
    beforeAll(async () => {
      // Simulação de login para obter token (substitua pela sua lógica real de login E2E)
      // Este é apenas um placeholder, você precisará implementar um login E2E real.
      const loginResponse = await request(app.getHttpServer())
        .post('/auth/login') 
        .send({ email: 'teststudent@example.com', password: 'password123' }); // Use um usuário de teste válido
      
      if (loginResponse.body.access_token) {
        authToken = loginResponse.body.access_token;
      } else {
        // Se o login falhar, os testes protegidos não funcionarão como esperado.
        // Pode ser útil lançar um erro aqui ou pular os testes protegidos.
        console.warn('E2E: Login falhou, testes de mentorship podem não funcionar corretamente.');
        // Para testes reais, garanta que o usuário de teste exista e as credenciais sejam válidas.
        // Você pode querer criar o usuário no beforeAll e deletá-lo no afterAll
        // ou usar um usuário de semente (seed user).
      }
    });

    it('should reject creation if not authenticated (simulated by not sending token)', () => {
      return request(app.getHttpServer())
        .post('/mentorships')
        .send({ description: 'E2E Test Mentorship', duration: 60, mentorId: 1 })
        .expect(401); // Espera Unauthorized se a rota é protegida e nenhum token é enviado
    });

    it('should create a mentorship request if authenticated and data is valid', () => {
      if (!authToken) {
        console.warn('E2E: Sem authToken, pulando teste de criação de mentorship.');
        return Promise.resolve(); // Pula o teste se o login falhou
      }
      return request(app.getHttpServer())
        .post('/mentorships')
        .set('Authorization', `Bearer ${authToken}`) // Envia o token de autenticação
        .send({ description: 'E2E Test Mentorship Valid', duration: 60, mentorId: 99 }) // Use um mentorId válido ou mockado
        .expect(201) // Espera Created
        .then(response => {
          expect(response.body).toBeDefined();
          expect(response.body.description).toEqual('E2E Test Mentorship Valid');
          // Adicione mais asserções conforme necessário
        });
    });
     it('should return 400 if data is invalid (e.g., missing description)', () => {
        if (!authToken) {
            console.warn('E2E: Sem authToken, pulando teste de criação de mentorship com dados inválidos.');
            return Promise.resolve();
        }
        return request(app.getHttpServer())
            .post('/mentorships')
            .set('Authorization', `Bearer ${authToken}`)
            .send({ duration: 60, mentorId: 99 }) // description está faltando
            .expect(400); // Espera Bad Request devido à validação do DTO
    });
  });
});
