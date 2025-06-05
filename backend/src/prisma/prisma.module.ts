import { Global, Module } from '@nestjs/common';
import { PrismaService } from './prisma.service';

@Global() // Torna acessível globalmente (opcional, mas ajuda)
@Module({
  providers: [PrismaService],
  exports: [PrismaService],
})
export class PrismaModule {}