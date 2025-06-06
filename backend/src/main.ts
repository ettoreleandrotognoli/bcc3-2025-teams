// mentorize/api-project/src/main.ts
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { INestApplication } from '@nestjs/common';

const DEFAULT_PORT = 3001;

// Exporte para testar a lógica principal de bootstrap
export async function bootstrap(): Promise<INestApplication> { 
  const app = await NestFactory.create(AppModule); // Se você não passa {} como segundo argumento

  app.enableCors({
    origin: 'http://localhost:3000', 
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
    credentials: true, 
  });

  await app.listen(process.env.PORT ?? DEFAULT_PORT);
  return app;
}

// Exporte para testar o tratamento de erro da inicialização
export async function startApplication(): Promise<void> {
  try {
    await bootstrap();
  } catch (err) {
    console.error('Error bootstrapping application', err);
  }
}

// Esta é a parte que não será coberta pelos testes unitários atuais
// se os testes para a função 'run' foram removidos.
// Se você tinha a função 'run' exportada, pode mantê-la ou simplificar para isto:
if (require.main === module) {
  startApplication();
}