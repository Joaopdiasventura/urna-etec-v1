import { Injectable } from '@nestjs/common';
import { Representant } from './entities/representant.entity';
import { PrismaService } from 'src/database/prisma.service';

@Injectable()
export class RepresentantService {
  constructor(private readonly prisma: PrismaService) {}

  async findRepresentant(name: string): Promise<Representant | void>{
    const representant = await this.prisma.representant.findUnique({where: {name}})

    if (representant) return representant
  }
      
  async create(createRepresentantDto: Representant): Promise<Representant | string> {
    const existingRepresentant = await this.findRepresentant(createRepresentantDto.name);
    if (existingRepresentant) return "Esse representante já está cadastrado";
    const user = await this.prisma.representant.create({ data: { ...createRepresentantDto } });
    return user;
  }

  async findAll(): Promise<Representant[]> {
    return await this.prisma.representant.findMany();
  }

  async findByCourse(course: string): Promise<Representant[]> {
    return await this.prisma.representant.findMany({where: {course}})
  }

  async remove(name: string): Promise<Representant | string> {
    const representant = await this.findRepresentant(name)
    if (!representant) return "Esse representante não está cadastrado"
    return await this.prisma.representant.delete({where: {name}})
  }
}