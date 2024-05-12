import { Injectable } from "@nestjs/common";
import { PrismaService } from "src/database/prisma.service";
import { Union } from "./entities/union.entity";

@Injectable()
export class UnionService {
	constructor(private readonly prisma: PrismaService) {}

	async findUnion(name: string): Promise<Union | void> {
		const union = await this.prisma.union.findUnique({ where: { name } });
		if (union) return union;
	}

	async create(createUnionDto: Union): Promise<Union | string> {
		const existUnion = await this.findUnion(createUnionDto.name);
		if (existUnion) return "Essa chapa já está cadastrada";

		return await this.prisma.union.create({ data: { ...createUnionDto } });
	}

	async findAll(): Promise<Union[]> {
		return await this.prisma.union.findMany();
	}

	async remove(name: string): Promise<Union | string> {
		const union = await this.findUnion(name);

		if (union) return "Essa chapa não está cadastrada";

		return await this.prisma.union.delete({ where: { name } });
	}
}
