import { Module } from '@nestjs/common';
import { RepresentantService } from './representant.service';
import { RepresentantController } from './representant.controller';
import { PrismaService } from 'src/database/prisma.service';

@Module({
  controllers: [RepresentantController],
  providers: [RepresentantService, PrismaService],
})
export class RepresentantModule {}
