// src/app.module.ts
import { Module } from '@nestjs/common';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { PrismaService } from './prisma/prisma.service';
import { PrismaModule } from './prisma/prisma.module';
import { MentorshipModule } from './mentorship/mentorship.module';

@Module({
  imports: [
    AuthModule,
    UserModule,
    MentorshipModule,
  ],
})
export class AppModule {}
