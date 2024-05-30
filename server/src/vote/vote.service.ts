import { Injectable } from "@nestjs/common";
import { CreateVoteDto } from "./dto/create-vote.dto";
import { PrismaService } from "src/database/prisma.service";
import { Vote } from "./entities/vote.entity";

@Injectable()
export class VoteService {
	constructor(private readonly prisma: PrismaService) {}

	async create(createVoteDto: CreateVoteDto): Promise<Vote | string> {
		const representant = await this.prisma.representant.findUnique({
			where: { name: createVoteDto.representant },
		});

		if (!representant)
			return "Esse aluno não se candidatou para representante";

		const union = await this.prisma.union.findUnique({
			where: { name: createVoteDto.union },
		});

		if (!union) return "Essa chapa não existe";

		return await this.prisma.vote.create({ data: { ...createVoteDto } });
	}

	async findAllRepresentants() {
		return await this.prisma.representant.findMany();
	}

	async findAllUnions() {
		return await this.prisma.union.findMany();
	}

	async findCourse(name: string) {
		return await this.prisma.course.findUnique({
			where: { name },
		});
	}

	async findRepresentantsByCourse(course: string) {
		return await this.prisma.representant.findMany({
			where: { course },
		});
	}

	async findVotesByRepresentant(representant: string) {
		return await this.prisma.vote.findMany({
			where: { representant },
		});
	}
}
